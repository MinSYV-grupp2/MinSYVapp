
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SchoolIcon } from 'lucide-react';

interface NoSchoolsMessageProps {
  selectedProgramName: string;
}

const NoSchoolsMessage = ({ selectedProgramName }: NoSchoolsMessageProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-guidance-blue flex items-center">
            <SchoolIcon className="h-5 w-5 mr-2" />
            Skolor som erbjuder {selectedProgramName}
          </h3>
        </div>
        
        <div className="p-6 text-center">
          <p className="text-gray-500">Inga skolor hittades som erbjuder detta program.</p>
          <p className="text-gray-500 text-sm mt-2">Försök välja ett annat program.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoSchoolsMessage;
