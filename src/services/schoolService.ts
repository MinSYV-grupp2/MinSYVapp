
import { supabase } from '@/integrations/supabase/client';
import { School } from '@/components/career/types';

// Helper function to normalize program names for better matching
const normalizeForComparison = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, ' ').trim();
};

// Check if two program names match (exact match or one contains the other)
const isProgramMatch = (programName1: string, programName2: string): boolean => {
  const normalized1 = normalizeForComparison(programName1);
  const normalized2 = normalizeForComparison(programName2);
  
  return normalized1 === normalized2 || 
         normalized1.includes(normalized2) || 
         normalized2.includes(normalized1);
};

export async function getSchools(): Promise<School[]> {
  const { data, error } = await supabase
    .from('schools')
    .select(`
      *,
      schools_programs(program_name, admission_score, inriktningskod)
    `);

  if (error) {
    console.error('Error fetching schools:', error);
    throw error;
  }

  console.log('Schools data from supabase:', data);

  // Transform the Supabase data to match our School interface
  return (data || []).map(schoolData => {
    // Map the programs and admission scores from the joined data
    const programsMap: Record<string, number> = {};
    if (schoolData.schools_programs && Array.isArray(schoolData.schools_programs)) {
      schoolData.schools_programs.forEach((prog: any) => {
        if (prog.program_name && prog.admission_score !== null) {
          programsMap[prog.program_name] = Number(prog.admission_score);
        }
      });
    }

    return {
      id: schoolData.id,
      name: schoolData.name,
      programs: schoolData.schools_programs ? 
        schoolData.schools_programs.map((p: any) => p.program_name).filter(Boolean) : [],
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
      schools_programs(program_name, admission_score, inriktningskod)
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
  if (data.schools_programs && Array.isArray(data.schools_programs)) {
    data.schools_programs.forEach((prog: any) => {
      if (prog.program_name && prog.admission_score !== null) {
        programsMap[prog.program_name] = Number(prog.admission_score);
      }
    });
  }

  // Transform the Supabase data to match our School interface
  return {
    id: data.id,
    name: data.name,
    programs: data.schools_programs ? 
      data.schools_programs.map((p: any) => p.program_name).filter(Boolean) : [],
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
