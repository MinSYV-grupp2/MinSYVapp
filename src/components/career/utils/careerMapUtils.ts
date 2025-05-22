
import { School, Program } from '../types';
import { programData } from '@/data/programData';

/**
 * Finds a school by ID in the provided schools array
 * @param schools Array of schools to search in
 * @param id ID of the school to find
 * @returns The found school or null if not found
 */
export const getSchoolById = (schools: School[], id: string): School | null => {
  if (!schools || !Array.isArray(schools)) {
    console.error('Invalid schools data passed to getSchoolById:', schools);
    return null;
  }
  
  const school = schools.find(school => school.id === id);
  
  if (!school) {
    console.warn(`School with ID ${id} not found in schools data`);
    return null;
  }
  
  return school;
};

/**
 * Finds a program by ID in the provided programs array
 * @param id ID of the program to find
 * @param fallbackPrograms Fallback program data if program not found
 * @returns The found program or null if not found
 */
export const getProgramById = (id: string, fallbackPrograms: Program[] = []): Program | null => {
  // First look in the fallback programs
  const program = fallbackPrograms.find(p => p.id === id);
  
  if (!program) {
    console.warn(`Program with ID ${id} not found in programs data`);
    return null;
  }
  
  return program;
};

/**
 * Gets schools that offer a specific program by checking program ID or name matches
 * @param schools All schools from database or fallback
 * @param programId ID of the program to check
 * @param programName Name of the program to check
 * @returns Array of schools that offer the program
 */
export const getSchoolsForProgram = (schools: School[], programId: string, programName: string): School[] => {
  if (!schools || !Array.isArray(schools) || schools.length === 0) {
    console.warn('No schools data available for filtering');
    return [];
  }

  // First try to match by programId in the programs array
  let matchingSchools = schools.filter(school => 
    school.programs.some(program => 
      program.toLowerCase().includes(programId.toLowerCase())
    )
  );

  // If no matches by ID, try matching by program name
  if (matchingSchools.length === 0) {
    matchingSchools = schools.filter(school => 
      school.programs.some(program => 
        program.toLowerCase().includes(programName.toLowerCase())
      )
    );
  }

  console.log(`Found ${matchingSchools.length} schools offering program ${programName} (${programId})`);
  return matchingSchools;
};
