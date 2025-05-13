
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface ProgramCardProps {
  program: any;
  onProgramSelect: (program: any) => void;
}

const ProgramCard = ({ program, onProgramSelect }: ProgramCardProps) => {
  return (
    <Card 
      key={program.id} 
      className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-guidance-blue"
      onClick={() => onProgramSelect(program)}
    >
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-guidance-blue">{program.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-2">{program.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="bg-guidance-lightBlue text-guidance-blue text-xs px-2 py-1 rounded-full">
            Meritpoäng: {program.merit}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-guidance-blue hover:text-guidance-purple"
            onClick={(e) => {
              e.stopPropagation();
              onProgramSelect(program);
            }}
          >
            <Info className="h-4 w-4 mr-1" />
            <span className="text-xs">Mer info</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramCard;
