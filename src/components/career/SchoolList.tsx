
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, SplitSquareVertical } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { School } from './types';

interface SchoolListProps {
  schools: School[];
  toggleCompareSchool: (schoolId: string) => void;
  handleSaveProgram: (school: string) => void;
  selectedProgramName: string;
}

const SchoolList = ({ schools, toggleCompareSchool, handleSaveProgram, selectedProgramName }: SchoolListProps) => {
  // Find the selected program ID based on the schools data
  const findProgramId = (selectedProgramName: string, school: School): string | undefined => {
    for (const programId of school.programs) {
      if (programId && school.admissionScores && school.admissionScores[programId]) {
        return programId;
      }
    }
    return undefined;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-guidance-blue mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><path d="M3 10h18"></path><path d="M6 6h12"></path><path d="M10 14h4"></path><circle cx="12" cy="18" r="2"></circle></svg>
          Skolor som erbjuder {selectedProgramName}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schools.map((school) => {
            // Find the correct program ID for this school and the selected program
            const selectedProgramId = school.programs[0]; // Default to first program if can't determine
            
            return (
              <Card key={school.id} className="hover:shadow-md transition-shadow border-l-4 border-guidance-green">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-semibold mb-2">{school.name}</h4>
                    <div className="flex gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-guidance-green hover:text-guidance-purple"
                              onClick={() => toggleCompareSchool(school.id)}
                            >
                              <SplitSquareVertical className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Jämför skola</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-guidance-purple hover:text-guidance-blue"
                              onClick={() => handleSaveProgram(school.name)}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Spara som favorit</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">{school.location.address}</div>
                  <div className="text-xs text-gray-500 mb-2">
                    {school.location.commute}
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    {school.admissionScores && selectedProgramId && school.admissionScores[selectedProgramId] ? (
                      <span className="bg-guidance-lightPurple text-guidance-purple text-xs px-2 py-1 rounded-full">
                        Antagning: {school.admissionScores[selectedProgramId]}
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        Antagningspoäng saknas
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {school.statistics.satisfactionRate}% nöjda elever
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolList;
