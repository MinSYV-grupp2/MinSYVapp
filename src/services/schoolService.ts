
import { supabase } from '@/integrations/supabase/client';
import { School } from '@/components/career/types';

// Helper function to normalize program names for better matching
const normalizeForComparison = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, ' ').trim();
};

// Check if two program names match (exact match, one contains the other, or contains program code)
export const isProgramMatch = (programName1: string, programName2: string): boolean => {
  const normalized1 = normalizeForComparison(programName1);
  const normalized2 = normalizeForComparison(programName2);
  
  // Check for exact match
  if (normalized1 === normalized2) return true;
  
  // Check if one contains the other
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) return true;
  
  // Check for program code pattern (e.g. "BA25 - Bygg och anläggning")
  const codePattern = /^([A-Z]{2}\d{2})\s*-?\s*/i;
  const match1 = normalized1.match(codePattern);
  const match2 = normalized2.match(codePattern);
  
  // If both have codes and they match
  if (match1 && match2 && match1[1].toLowerCase() === match2[1].toLowerCase()) return true;
  
  // If one has a code, check if it's in the other string
  if (match1 && normalized2.includes(match1[1].toLowerCase())) return true;
  if (match2 && normalized1.includes(match2[1].toLowerCase())) return true;
  
  return false;
};

export async function getSchools(): Promise<School[]> {
  console.log('Fetching schools data from Supabase...');
  
  const { data, error } = await supabase
    .from('schools')
    .select(`
      *,
      schools_programs(program_id, program_name, admission_score, inriktningskod)
    `);

  if (error) {
    console.error('Error fetching schools:', error);
    throw error;
  }

  console.log('Schools data from supabase:', data);
  console.log('Number of schools returned:', data?.length || 0);
  
  if (data && data.length > 0 && data[0].schools_programs) {
    console.log('Example school programs:', data[0].schools_programs);
  }

  // Transform the Supabase data to match our School interface
  return (data || []).map(schoolData => {
    // Map the programs and admission scores from the joined data
    const programsMap: Record<string, number> = {};
    const programs: string[] = [];
    
    if (schoolData.schools_programs && Array.isArray(schoolData.schools_programs)) {
      schoolData.schools_programs.forEach((prog: any) => {
        if (prog.program_name && prog.admission_score !== null) {
          programsMap[prog.program_name] = Number(prog.admission_score);
          programs.push(prog.program_name);
        } else if (prog.program_id && prog.admission_score !== null) {
          // If we only have program_id but no name, use the ID as a fallback
          const programKey = `Program ${prog.program_id}`;
          programsMap[programKey] = Number(prog.admission_score);
          programs.push(programKey);
        }
      });
    }

    return {
      id: schoolData.id,
      name: schoolData.name,
      programs: programs.length > 0 ? programs : [],
      location: {
        address: schoolData.address || 'Adress saknas',
        coordinates: { lat: 0, lng: 0 },
        commute: 'Information saknas'
      },
      admissionScores: programsMap,
      statistics: {
        averageGrade: 0,
        completionRate: 0,
        qualifiedTeachers: 0,
        satisfactionRate: 0
      },
      reviews: [],
      facilities: {},
      extracurricular: [],
      events: []
    };
  });
}

export async function getSchoolById(id: string): Promise<School | null> {
  const { data, error } = await supabase
    .from('schools')
    .select(`
      *,
      schools_programs(program_id, program_name, admission_score, inriktningskod)
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // No school found with this ID
    }
    console.error('Error fetching school by ID:', error);
    throw error;
  }

  if (!data) return null;

  // Map the programs and admission scores from the joined data
  const programsMap: Record<string, number> = {};
  const programs: string[] = [];
  
  if (data.schools_programs && Array.isArray(data.schools_programs)) {
    data.schools_programs.forEach((prog: any) => {
      if (prog.program_name && prog.admission_score !== null) {
        programsMap[prog.program_name] = Number(prog.admission_score);
        programs.push(prog.program_name);
      } else if (prog.program_id && prog.admission_score !== null) {
        // If we only have program_id but no name, use the ID as a fallback
        const programKey = `Program ${prog.program_id}`;
        programsMap[programKey] = Number(prog.admission_score);
        programs.push(programKey);
      }
    });
  }

  // Transform the Supabase data to match our School interface
  return {
    id: data.id,
    name: data.name,
    programs: programs,
    location: {
      address: data.address || 'Adress saknas',
      coordinates: { lat: 0, lng: 0 },
      commute: 'Information saknas'
    },
    admissionScores: programsMap,
    statistics: {
      averageGrade: 0,
      completionRate: 0,
      qualifiedTeachers: 0,
      satisfactionRate: 0
    },
    reviews: [],
    facilities: {},
    extracurricular: [],
    events: []
  };
}

// Helper function to find admission score for a program
export const findAdmissionScore = (school: School, programName: string): number | null => {
  // Look for exact match first
  if (school.admissionScores[programName] !== undefined) {
    return school.admissionScores[programName];
  }
  
  // If no exact match, try to find a program that matches using our helper function
  const matchingKey = Object.keys(school.admissionScores).find(
    key => isProgramMatch(key, programName)
  );
  
  return matchingKey ? school.admissionScores[matchingKey] : null;
};
