
import { School, Program } from '../types';

// Get school by id
export const getSchoolById = (schoolsData: School[] | undefined, id: string): School | undefined => {
  return schoolsData?.find(school => school.id === id);
};

// Get program by id
export const getProgramById = (programData: Program[], id: string): Program | undefined => {
  return programData.find(program => program.id === id);
};
