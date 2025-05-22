
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

// Helper function to determine the color based on admission score
const getScoreColor = (score: number): string => {
  if (score >= 300) return 'text-red-600';
  if (score >= 250) return 'text-orange-500';
  if (score >= 200) return 'text-yellow-500';
  return 'text-green-600';
};

// Helper function to find the admission score for a program
const findAdmissionScore = (school: School, programName: string): number | null => {
  // Look for exact match first
  if (school.admissionScores[programName] !== undefined) {
    return school.admissionScores[programName];
  }
  
  // If no exact match, try to find a program that includes the search term
  const matchingKey = Object.keys(school.admissionScores).find(
    key => key.toLowerCase().includes(programName.toLowerCase())
  );
  
  return matchingKey ? school.admissionScores[matchingKey] : null;
};

const SchoolList = ({ schools, toggleCompareSchool, handleSaveProgram, selectedProgramName }: SchoolListProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-guidance-blue mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><path d="M3 10h18"></path><path d="M6 6h12"></path><path d="M10 14h4"></path><circle cx="12" cy="18" r="2"></circle></svg>
          Skolor som erbjuder {selectedProgramName}
        </h3>
        
        {schools.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-gray-500">Inga skolor hittades som erbjuder detta program.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((school) => {
              const admissionScore = findAdmissionScore(school, selectedProgramName);
              const scoreColorClass = admissionScore ? getScoreColor(admissionScore) : '';
              
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
                    
                    {admissionScore ? (
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-medium">Antagningspoäng:</span>
                        <span className={`text-sm font-bold ${scoreColorClass}`}>
                          {admissionScore}
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500 mb-2">Antagningspoäng saknas</div>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      {school.location.commute}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SchoolList;
