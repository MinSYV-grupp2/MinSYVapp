
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, FileText, SplitSquareVertical } from 'lucide-react';

interface ProgramDetailsProps {
  program: string;
  specializations: string[];
  educationPaths: string[];
  careers: string[];
  onSave?: () => void;
  onCompare?: () => void;
  onViewTree?: () => void;
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ 
  program, 
  specializations, 
  educationPaths, 
  careers,
  onSave,
  onCompare,
  onViewTree
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-guidance-blue">{program}</h3>
          <div className="flex gap-2">
            {onViewTree && (
              <Button 
                variant="outline" 
                size="sm"
                className="border-guidance-purple text-guidance-purple hover:bg-guidance-lightPurple flex gap-1 text-xs"
                onClick={onViewTree}
              >
                <FileText className="h-3.5 w-3.5" />
                Karriärträd
              </Button>
            )}
            {onCompare && (
              <Button 
                variant="outline" 
                size="sm"
                className="border-guidance-blue text-guidance-blue hover:bg-guidance-lightBlue flex gap-1 text-xs"
                onClick={onCompare}
              >
                <SplitSquareVertical className="h-3.5 w-3.5" />
                Jämför
              </Button>
            )}
            {onSave && (
              <Button 
                variant="outline" 
                size="sm"
                className="border-guidance-green text-guidance-green hover:bg-guidance-lightGreen flex gap-1 text-xs"
                onClick={onSave}
              >
                <Heart className="h-3.5 w-3.5" />
                Spara
              </Button>
            )}
          </div>
        </div>
        
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
