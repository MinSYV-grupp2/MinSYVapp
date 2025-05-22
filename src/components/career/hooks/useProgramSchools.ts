
import { useQuery } from '@tanstack/react-query';
import { getSchoolsByProgram, getProgramSpecializations } from '@/services/schoolService';
import { Program, ViewMode, Specialization } from '../types';

export function useProgramSchools(selectedProgram: Program | null, viewMode: ViewMode) {
  const programId = selectedProgram?.id;
  
  // Fetch schools for the selected program
  const { 
    data: schoolsByProgram, 
    isLoading: isLoadingSchoolsByProgram 
  } = useQuery({
    queryKey: ['schoolsByProgram', programId],
    queryFn: () => programId ? getSchoolsByProgram(programId) : null,
    enabled: viewMode === 'programDetail' && !!programId, // Only run when a program is selected and has an ID
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 3, // Retry up to 3 times if fetch fails
  });
  
  // Fetch specializations for the selected program
  const {
    data: programSpecializations,
    isLoading: isLoadingSpecializations
  } = useQuery({
    queryKey: ['programSpecializations', programId],
    queryFn: () => programId ? getProgramSpecializations(programId) : null,
    enabled: viewMode === 'programDetail' && !!programId,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  return { 
    schoolsByProgram: schoolsByProgram?.length ? schoolsByProgram : null,
    programSpecializations,
    isLoadingSchoolsByProgram: isLoadingSchoolsByProgram || isLoadingSpecializations
  };
}
