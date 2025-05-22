
import React from 'react';
import CareerTree from '../CareerTree';
import { Program, ViewMode } from '../types';

interface CareerTreeViewProps {
  selectedProgram: Program;
  handleSaveProgram: () => void;
  setViewMode: (viewMode: ViewMode) => void;
}

const CareerTreeView = ({ selectedProgram, handleSaveProgram, setViewMode }: CareerTreeViewProps) => {
  return (
    <CareerTree 
      selectedProgram={selectedProgram}
      handleSaveProgram={handleSaveProgram}
      setViewMode={setViewMode}
    />
  );
};

export default CareerTreeView;
