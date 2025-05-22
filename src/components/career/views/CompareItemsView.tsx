
import React from 'react';
import CompareView from '../CompareView';
import { CompareItems } from '../types';

interface CompareItemsViewProps {
  compareItems: CompareItems;
  handleBackToPrograms: () => void;
  toggleCompareProgram: (programId: string) => void;
  toggleCompareSchool: (schoolId: string) => void;
  getProgramById: (id: string) => any;
  getSchoolById: (id: string) => any;
}

const CompareItemsView = ({
  compareItems,
  handleBackToPrograms,
  toggleCompareProgram,
  toggleCompareSchool,
  getProgramById,
  getSchoolById
}: CompareItemsViewProps) => {
  return (
    <CompareView 
      compareItems={compareItems}
      handleBackToPrograms={handleBackToPrograms}
      toggleCompareProgram={toggleCompareProgram}
      toggleCompareSchool={toggleCompareSchool}
      getProgramById={getProgramById}
      getSchoolById={getSchoolById}
    />
  );
};

export default CompareItemsView;
