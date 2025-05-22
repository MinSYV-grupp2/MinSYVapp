
import React from 'react';
import ProgramCard from '../ProgramCard';
import { Program } from '../types';

interface ProgramsGridProps {
  programData: Program[];
  onProgramSelect: (program: Program) => void;
}

const ProgramsGrid = ({ programData, onProgramSelect }: ProgramsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {programData.map((program) => (
        <ProgramCard 
          key={program.id}
          program={program}
          onProgramSelect={onProgramSelect}
        />
      ))}
    </div>
  );
};

export default ProgramsGrid;
