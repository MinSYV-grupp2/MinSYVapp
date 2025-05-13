
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TreeDeciduous, ArrowLeft, Heart } from 'lucide-react';
import TreeDiagram from '@/components/TreeDiagram';

interface CareerTreeProps {
  selectedProgram: any;
  handleSaveProgram: () => void;
  setViewMode: (mode: 'programDetail' | 'programs' | 'compare' | 'tree') => void;
}

const CareerTree = ({ selectedProgram, handleSaveProgram, setViewMode }: CareerTreeProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-guidance-blue mb-2 flex items-center">
            <TreeDeciduous className="h-6 w-6 mr-2 text-guidance-green" />
            Karriärträd för {selectedProgram.name}
          </h2>
          <p className="text-gray-600">
            Utforska olika vägar från gymnasiet till karriär genom detta interaktiva karriärträd.
            Klicka på rubrikerna för att visa mer information om varje steg.
          </p>
        </div>
        
        <TreeDiagram
          program={selectedProgram.name}
          specializations={selectedProgram.specializations || []}
          educationPaths={selectedProgram.furtherEducation?.map((edu: any) => edu.name) || []}
          careers={selectedProgram.careers || []}
          selectedProgram={selectedProgram.id}
          programData={selectedProgram}
        />
        
        <div className="mt-6 flex justify-between">
          <Button 
            variant="outline"
            onClick={() => setViewMode('programDetail')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Tillbaka till programinformation
          </Button>
          
          <Button 
            className="bg-guidance-purple hover:bg-guidance-purple/90 text-white flex gap-2"
            onClick={() => handleSaveProgram()}
          >
            <Heart className="h-4 w-4" />
            <span>Spara detta program</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerTree;
