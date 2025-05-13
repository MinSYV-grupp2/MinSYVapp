
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProgramDetailsProps {
  program: string;
  specializations: string[];
  educationPaths: string[];
  careers: string[];
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ 
  program, 
  specializations, 
  educationPaths, 
  careers 
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-3 text-guidance-blue">{program}</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-guidance-green mb-1">Inriktningar:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {specializations.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-indigo-600 mb-1">Möjliga utbildningar:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {educationPaths.map((path, index) => (
                <li key={index}>{path}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-1">Yrken det kan leda till:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {careers.map((career, index) => (
                <li key={index}>{career}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramDetails;
