import { supabase } from '@/integrations/supabase/client';
import { School, Program, Specialization } from '@/components/career/types';

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

// New function to fetch all programs from the database
export async function getPrograms(): Promise<Program[]> {
  console.log('Fetching programs data from Supabase...');
  
  const { data: programsData, error: programsError } = await supabase
    .from('educational_programs')
    .select('*')
    .order('program_namn');

  if (programsError) {
    console.error('Error fetching programs:', programsError);
    throw programsError;
  }

  console.log(`Fetched ${programsData?.length || 0} programs from database`);

  // Get specializations for each program
  const programs: Program[] = await Promise.all((programsData || []).map(async (program) => {
    const specializations = await getProgramSpecializations(program.program_id);
    
    return {
      id: program.program_id,
      name: program.program_namn,
      description: `Program inom ${program.kategori || 'okänd kategori'}`,
      specializations: specializations.map(spec => spec.inriktning),
      meritDescription: "Se skolans webbsida för information om meritpoäng",
      educationDescription: "Se skolans webbsida för information om utbildningen",
      requiredCourses: [],
      recommendedCourses: [],
      furtherEducation: [],
      careers: [],
      universities: [],
      subjects: [],
      merit: "",
      category: program.kategori || ""
    };
  }));

  return programs;
}

// New function to fetch specializations (inriktningar) for a program
export async function getProgramSpecializations(programId: string): Promise<Specialization[]> {
  console.log(`Fetching specializations for program ID: ${programId}`);
  
  const { data, error } = await supabase
    .from('program_inriktningar')
    .select('*')
    .eq('program_id', programId);

  if (error) {
    console.error('Error fetching specializations:', error);
    return [];
  }

  console.log(`Found ${data?.length || 0} specializations for program ID: ${programId}`);
  
  return (data || []).map(item => ({
    id: item.inriktningskod,
    name: item.inriktning || 'Ingen specifik inriktning',
    programId: item.program_id
  }));
}

// Add the missing function for fetching unique programs
export async function getUniquePrograms() {
  console.log('Fetching unique programs data from schools_programs table...');
  
  const { data, error } = await supabase
    .from('schools_programs')
    .select('program_id, program_name')
    .order('program_name');

  if (error) {
    console.error('Error fetching unique programs:', error);
    throw error;
  }

  // Remove duplicate program names
  const uniquePrograms = [];
  const programMap = new Map();
  
  if (data) {
    data.forEach(program => {
      if (program.program_name && !programMap.has(program.program_id)) {
        programMap.set(program.program_id, true);
        uniquePrograms.push({
          id: program.program_id,
          name: program.program_name
        });
      }
    });
  }
  
  console.log(`Found ${uniquePrograms.length} unique programs`);
  return uniquePrograms;
}

// Function to get schools that offer a specific program
export async function getSchoolsByProgram(programId: string): Promise<School[]> {
  console.log(`Fetching schools for program ID: ${programId}`);
  
  // Fetch data from database
  if (!programId) {
    console.error('No program ID provided');
    return [];
  }
  
  // First try fetching directly from schools_programs table
  const { data, error } = await supabase
    .from('schools_programs')
    .select(`
      program_id,
      program_name,
      admission_score,
      inriktningskod,
      schools (
        id,
        name,
        address
      )
    `)
    .eq('program_id', programId);

  if (error) {
    console.error('Error fetching schools by program:', error);
    throw error;
  }

  // If data is empty, try fetching all schools as a fallback
  if (!data || data.length === 0) {
    console.log(`No schools found for program ID: ${programId}, fetching all schools as fallback`);
    return await getAllSchoolsWithFallbackProgram(programId);
  }

  console.log(`Found ${data?.length || 0} entries for program ID: ${programId}`);
  
  // Transform the data to match our School interface
  const schools: School[] = [];
  const schoolsMap = new Map<string, School>();

  data?.forEach(entry => {
    if (!entry.schools) return;
    
    const schoolId = entry.schools.id;
    
    if (!schoolsMap.has(schoolId)) {
      schoolsMap.set(schoolId, {
        id: schoolId,
        name: entry.schools.name,
        programs: [entry.program_name],
        specializations: entry.inriktningskod ? [entry.inriktningskod] : [],
        location: {
          address: entry.schools.address || 'Adress saknas',
          coordinates: { lat: 0, lng: 0 },
          commute: 'Information saknas'
        },
        admissionScores: {
          [entry.program_name]: entry.admission_score
        },
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
      });
    } else {
      // Add the program to the existing school
      const school = schoolsMap.get(schoolId)!;
      if (!school.programs.includes(entry.program_name)) {
        school.programs.push(entry.program_name);
      }
      if (entry.inriktningskod && !school.specializations?.includes(entry.inriktningskod)) {
        school.specializations?.push(entry.inriktningskod);
      }
      school.admissionScores[entry.program_name] = entry.admission_score;
    }
  });

  return Array.from(schoolsMap.values());
}

// Fallback function to get all schools with the program added
async function getAllSchoolsWithFallbackProgram(programId: string): Promise<School[]> {
  console.log('Fetching all schools as fallback...');
  
  // Get program name from programId
  const { data: programData, error: programError } = await supabase
    .from('schools_programs')
    .select('program_name')
    .eq('program_id', programId)
    .limit(1);
    
  if (programError) {
    console.error('Error fetching program name:', programError);
  }
  
  const programName = programData && programData.length > 0 
    ? programData[0].program_name 
    : `Program ${programId}`;
    
  // Fetch all schools
  const { data: schoolsData, error: schoolsError } = await supabase
    .from('schools')
    .select('id, name, address');
    
  if (schoolsError) {
    console.error('Error fetching all schools:', schoolsError);
    throw schoolsError;
  }
  
  // Transform to School objects with the program added
  return (schoolsData || []).map(school => ({
    id: school.id,
    name: school.name,
    programs: [programName],
    specializations: [],
    location: {
      address: school.address || 'Adress saknas',
      coordinates: { lat: 0, lng: 0 },
      commute: 'Information saknas'
    },
    admissionScores: {
      [programName]: null
    },
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
  }));
}

export async function getSchools(): Promise<School[]> {
  console.log('Fetching schools data from Supabase...');
  
  // Improved query to get all schools with their programs
  const { data, error } = await supabase
    .from('schools')
    .select(`
      id,
      name, 
      address,
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

  // If no schools found, create some dummy data for testing
  if (!data || data.length === 0) {
    console.log('No schools found, creating fallback data');
    return createFallbackSchoolData();
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
      specializations: [],
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

// Create fallback school data for testing when database has no schools
function createFallbackSchoolData(): School[] {
  console.log('Creating fallback school data');
  return [
    {
      id: 'fake-id-1',
      name: 'Polhemsgymnasiet',
      programs: ['Naturvetenskapsprogrammet', 'Teknikprogrammet'],
      specializations: [],
      location: {
        address: 'Decembergatan 5, Göteborg',
        coordinates: { lat: 57.7, lng: 11.9 },
        commute: '15 min till Brunnsparken'
      },
      admissionScores: {
        'Naturvetenskapsprogrammet': 290,
        'Teknikprogrammet': 275
      },
      statistics: {
        averageGrade: 16.2,
        completionRate: 92,
        qualifiedTeachers: 98,
        satisfactionRate: 4.2
      },
      reviews: [],
      facilities: {},
      extracurricular: [],
      events: []
    },
    {
      id: 'fake-id-2',
      name: 'Hvitfeldtska gymnasiet',
      programs: ['Naturvetenskapsprogrammet', 'Samhällsvetenskapsprogrammet'],
      specializations: [],
      location: {
        address: 'Rektorsgatan 2, Göteborg',
        coordinates: { lat: 57.7, lng: 11.95 },
        commute: '10 min till Brunnsparken'
      },
      admissionScores: {
        'Naturvetenskapsprogrammet': 285,
        'Samhällsvetenskapsprogrammet': 260
      },
      statistics: {
        averageGrade: 15.8,
        completionRate: 90,
        qualifiedTeachers: 95,
        satisfactionRate: 4.0
      },
      reviews: [],
      facilities: {},
      extracurricular: [],
      events: []
    }
  ];
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
    specializations: [],
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

// New function to get specialization name by code
export async function getSpecializationNameByCode(code: string): Promise<string> {
  if (!code) return "Ingen specifik inriktning";
  
  const { data, error } = await supabase
    .from('program_inriktningar')
    .select('inriktning')
    .eq('inriktningskod', code)
    .maybeSingle();
    
  if (error || !data) {
    console.error('Error fetching specialization name:', error);
    return "Okänd inriktning";
  }
  
  return data.inriktning || "Ingen specifik inriktning";
}
