
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TreeDiagram from '@/components/TreeDiagram';
import { Program } from './types';
import { programData } from '@/data/programData';

interface CareerTreeProps {
  selectedProgram: Program;
  handleSaveProgram: () => void;
  setViewMode: (viewMode: 'programs' | 'compare' | 'tree' | 'programDetail') => void;
}

const CareerTree = ({ selectedProgram, handleSaveProgram, setViewMode }: CareerTreeProps) => {
  return (
    <Card className="mb-8 border-l-4 border-guidance-purple">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-guidance-purple">Karriärvägar för {selectedProgram.name}</h2>
          <Button 
            className="bg-guidance-purple hover:bg-guidance-purple/90 text-white flex gap-2"
            onClick={handleSaveProgram}
          >
            Spara detta program
          </Button>
        </div>
        
        <p className="text-gray-700 mb-6">
          Utforska hur {selectedProgram.name} kan leda till olika inriktningar, universitetsutbildningar och karriärmöjligheter.
          Klicka på de olika rutorna för mer information.
        </p>

        <div className="border rounded-lg p-4 mb-8 bg-gray-50">
          <TreeDiagram
            program={selectedProgram.name}
            specializations={selectedProgram.specializations || []}
            educationPaths={selectedProgram.furtherEducation?.map(edu => edu.name) || []}
            careers={selectedProgram.careers || []}
            programData={selectedProgram}
          />
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-guidance-purple mb-2">Andra program du kan vara intresserad av:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {programData
              .filter(program => program.id !== selectedProgram.id)
              .slice(0, 3)
              .map(program => (
                <div 
                  key={program.id}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => {
                    setViewMode('programDetail');
                  }}
                >
                  <h4 className="font-medium text-guidance-blue">{program.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{program.merit} meritpoäng</p>
                </div>
              ))
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerTree;
