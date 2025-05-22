
import React, { useState, useEffect } from 'react';
import { Program, School, Specialization } from '../types';
import ProgramDetail from '../ProgramDetail';
import SchoolsList from '../SchoolsList';
import NoSchoolsMessage from '../NoSchoolsMessage';
import { getProgramById } from '@/services/schoolService';
import { Skeleton } from '@/components/ui/skeleton';

interface ProgramDetailsViewProps {
  selectedProgram: Program;
  schoolsByProgram: School[] | null;
  programSpecializations?: Specialization[];
  isLoadingSchoolsByProgram?: boolean;
  handleViewCareerTree: () => void;
  toggleCompareProgram: (programId: string) => void;
  handleSaveProgram: (schoolName?: string) => void;
}

const ProgramDetailsView = ({
  selectedProgram,
  schoolsByProgram,
  programSpecializations,
  isLoadingSchoolsByProgram,
  handleViewCareerTree,
  toggleCompareProgram,
  handleSaveProgram
}: ProgramDetailsViewProps) => {
  const [enhancedProgram, setEnhancedProgram] = useState<Program | null>(null);
  const [isLoadingEnhancement, setIsLoadingEnhancement] = useState<boolean>(false);

  // Fetch enhanced program details when component mounts or selectedProgram changes
  useEffect(() => {
    const fetchEnhancedProgram = async () => {
      setIsLoadingEnhancement(true);
      try {
        // Get enhanced program data with AI-generated content
        const enhanced = await getProgramById(selectedProgram.id);
        if (enhanced) {
          setEnhancedProgram(enhanced);
        } else {
          setEnhancedProgram(selectedProgram); // Fallback to original
        }
      } catch (error) {
        console.error('Error fetching enhanced program:', error);
        setEnhancedProgram(selectedProgram); // Fallback to original on error
      } finally {
        setIsLoadingEnhancement(false);
      }
    };

    fetchEnhancedProgram();
  }, [selectedProgram.id]);

  // This function is needed for the SchoolsList component
  const toggleCompareSchool = (schoolId: string) => {
    // This function is a prop stub - the actual implementation is in CareerMap.tsx
    console.log("toggleCompareSchool called with:", schoolId);
  };

  // Display program data either from enhancement or fallback to the original
  const displayProgram = enhancedProgram || selectedProgram;

  return (
    <div id="program-detail">
      {isLoadingEnhancement ? (
        <div className="space-y-4 p-6 border rounded-lg mb-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ) : (
        <ProgramDetail 
          selectedProgram={displayProgram}
          programSpecializations={programSpecializations}
          handleViewCareerTree={handleViewCareerTree}
          toggleCompareProgram={toggleCompareProgram}
          handleSaveProgram={handleSaveProgram}
        />
      )}
      
      {isLoadingSchoolsByProgram ? (
        <NoSchoolsMessage 
          selectedProgramName={displayProgram.name} 
          selectedProgramId={displayProgram.id} 
        />
      ) : schoolsByProgram ? (
        <SchoolsList 
          schools={schoolsByProgram}
          toggleCompareSchool={toggleCompareSchool}
          handleSaveProgram={handleSaveProgram}
          selectedProgramName={displayProgram.name}
        />
      ) : (
        <NoSchoolsMessage 
          selectedProgramName={displayProgram.name}
          selectedProgramId={displayProgram.id}
        />
      )}
    </div>
  );
};

export default ProgramDetailsView;
