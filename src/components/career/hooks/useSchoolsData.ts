
import { useQuery } from '@tanstack/react-query';
import { getSchools, getUniquePrograms } from '@/services/schoolService';

export function useSchoolsData() {
  // Fetch all schools from Supabase
  const { 
    data: schoolsData, 
    isLoading: isLoadingSchools, 
    error: schoolsError 
  } = useQuery({
    queryKey: ['schools'],
    queryFn: getSchools
  });
  
  // Fetch unique programs from schools_programs table
  const { 
    data: uniqueProgramsData, 
    isLoading: isLoadingPrograms, 
    error: programsError 
  } = useQuery({
    queryKey: ['uniquePrograms'],
    queryFn: getUniquePrograms
  });

  return {
    schoolsData,
    uniqueProgramsData,
    isLoadingSchools,
    isLoadingPrograms,
    schoolsError,
    programsError
  };
}
