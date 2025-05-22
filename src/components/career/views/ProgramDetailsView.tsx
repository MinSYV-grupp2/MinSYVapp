
import React from 'react';
import { Program, School, Specialization } from '../types';
import ProgramDetail from '../ProgramDetail';
import SchoolsList from '../SchoolsList';
import NoSchoolsMessage from '../NoSchoolsMessage';

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
  return (
    <div id="program-detail">
      <ProgramDetail 
        selectedProgram={selectedProgram}
        programSpecializations={programSpecializations}
        handleViewCareerTree={handleViewCareerTree}
        toggleCompareProgram={toggleCompareProgram}
        handleSaveProgram={handleSaveProgram}
      />
      
      {isLoadingSchoolsByProgram ? (
        <NoSchoolsMessage 
          selectedProgramName={selectedProgram.name} 
          selectedProgramId={selectedProgram.id} 
        />
      ) : schoolsByProgram ? (
        <SchoolsList 
          schools={schoolsByProgram}
          toggleCompareSchool={toggleCompareSchool}
          handleSaveProgram={handleSaveProgram}
          selectedProgramName={selectedProgram.name}
        />
      ) : (
        <NoSchoolsMessage 
          selectedProgramName={selectedProgram.name}
          selectedProgramId={selectedProgram.id}
        />
      )}
    </div>
  );
};

const toggleCompareSchool = (schoolId: string) => {};

export default ProgramDetailsView;
