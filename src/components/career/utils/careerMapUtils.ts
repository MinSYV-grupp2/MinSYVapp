
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
