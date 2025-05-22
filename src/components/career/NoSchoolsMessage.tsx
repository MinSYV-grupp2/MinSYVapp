
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { School as SchoolIcon, Loader } from 'lucide-react';

interface NoSchoolsMessageProps {
  selectedProgramName: string;
  selectedProgramId?: string;
}

const NoSchoolsMessage = ({ selectedProgramName, selectedProgramId }: NoSchoolsMessageProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-guidance-blue flex items-center">
            <SchoolIcon className="h-5 w-5 mr-2" />
            Skolor som erbjuder {selectedProgramName}
          </h3>
        </div>
        
        <div className="p-8 text-center border border-dashed border-gray-300 rounded-lg">
          <Loader className="h-10 w-10 text-guidance-blue mx-auto animate-spin mb-4" />
          <p className="text-lg text-gray-700 font-medium">Letar efter skolor...</p>
          <p className="text-gray-500 mt-2">Vi använder fallbackdata om inga skolor hittas i databasen.</p>
          {selectedProgramId && (
            <p className="text-gray-500 mt-1 text-sm">Program ID: {selectedProgramId}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NoSchoolsMessage;
