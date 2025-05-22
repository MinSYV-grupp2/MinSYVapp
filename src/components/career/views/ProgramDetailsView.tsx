
import React from 'react';
import { Program } from '../types';
import ProgramDetail from '../ProgramDetail';
import SchoolList from '../SchoolList';
import { School } from '../types';

interface ProgramDetailsViewProps {
  selectedProgram: Program;
  schoolsByProgram: School[] | undefined;
  handleViewCareerTree: () => void;
  toggleCompareProgram: (programId: string) => void;
  handleSaveProgram: (schoolName?: string) => void;
}

const ProgramDetailsView = ({
  selectedProgram,
  schoolsByProgram,
  handleViewCareerTree,
  toggleCompareProgram,
  handleSaveProgram
}: ProgramDetailsViewProps) => {
  return (
    <div id="program-detail">
      <ProgramDetail 
        selectedProgram={selectedProgram}
        handleViewCareerTree={handleViewCareerTree}
        toggleCompareProgram={toggleCompareProgram}
        handleSaveProgram={handleSaveProgram}
      />
      
      {schoolsByProgram && (
        <SchoolList 
          schools={schoolsByProgram}
          toggleCompareSchool={toggleCompareSchool}
          handleSaveProgram={handleSaveProgram}
          selectedProgramName={selectedProgram.name}
        />
      )}
    </div>
  );
};

const toggleCompareSchool = (schoolId: string) => {};

export default ProgramDetailsView;
