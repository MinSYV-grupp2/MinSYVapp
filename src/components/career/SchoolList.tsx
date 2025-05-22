
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, SplitSquareVertical, MapPin, School as SchoolIcon, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { School } from './types';
import { findAdmissionScore, isProgramMatch } from '@/services/schoolService';
import { Badge } from '@/components/ui/badge';

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

// Function to check if a school is in Gothenburg
const isGothenburgSchool = (school: School): boolean => {
  return school.location.address.toLowerCase().includes('göteborg') || 
         (school.name.toLowerCase().includes('göteborg') || 
          school.name.includes('polhem') || 
          school.name.includes('hvitfeldtska') || 
          school.name.includes('angered') || 
          school.name.includes('katrinelund') || 
          school.name.includes('burgård') || 
          school.name.includes('donner') || 
          school.name.includes('ihgr') || 
          school.name.includes('bernadotte') || 
          school.name.includes('lindholmen'));
};

const SchoolList = ({ schools, toggleCompareSchool, handleSaveProgram, selectedProgramName }: SchoolListProps) => {
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);
  
  // Filter schools that offer the selected program
  const schoolsWithProgram = schools.filter(school => 
    school.programs.some(program => 
      isProgramMatch(program, selectedProgramName)
    )
  );
  
  // Separate Gothenburg schools from others
  const gothenburgSchools = schoolsWithProgram.filter(isGothenburgSchool);
  const otherSchools = schoolsWithProgram.filter(school => !isGothenburgSchool(school));
  
  // Toggle expanded school detail
  const toggleSchoolDetail = (schoolId: string) => {
    if (expandedSchool === schoolId) {
      setExpandedSchool(null);
    } else {
      setExpandedSchool(schoolId);
    }
  };

  // Helper to extract program code if present
  const extractProgramCode = (programName: string): string | null => {
    const match = programName.match(/([A-Z]{2}\d{2})/);
    return match ? match[1] : null;
  };
  
  if (schoolsWithProgram.length === 0) {
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
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-guidance-blue flex items-center">
            <SchoolIcon className="h-5 w-5 mr-2" />
            Skolor som erbjuder {selectedProgramName}
          </h3>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">
          Visar skolor som erbjuder {selectedProgramName}.
          <span className="ml-2">
            ({schoolsWithProgram.length} {schoolsWithProgram.length === 1 ? 'skola' : 'skolor'} totalt, 
            {gothenburgSchools.length} i Göteborg)
          </span>
        </p>
        
        {gothenburgSchools.length > 0 && (
          <>
            <h4 className="text-lg font-semibold text-guidance-green mb-3 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Gymnasieskolor i Göteborg
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({gothenburgSchools.length} {gothenburgSchools.length === 1 ? 'skola' : 'skolor'})
              </span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {gothenburgSchools.map((school) => {
                // Find admission score specifically for the selected program
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
                          <span className="text-xs font-medium">Antagningspoäng för {selectedProgramName}:</span>
                          <span className={`text-sm font-bold ${scoreColorClass}`}>
                            {admissionScore}
                          </span>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500 mb-2">Antagningspoäng saknas för detta program</div>
                      )}
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-xs text-gray-500">
                          {school.location.commute}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleSchoolDetail(school.id)}
                          className="text-guidance-blue hover:bg-guidance-lightBlue p-1 h-auto"
                        >
                          {expandedSchool === school.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                          <span className="ml-1 text-xs">
                            {expandedSchool === school.id ? "Visa mindre" : "Visa alla program"}
                          </span>
                        </Button>
                      </div>

                      {expandedSchool === school.id && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <h5 className="text-sm font-medium text-guidance-blue mb-2 flex items-center">
                            <GraduationCap className="h-4 w-4 mr-1" />
                            Alla program på {school.name}:
                          </h5>
                          
                          <div className="grid grid-cols-1 gap-2">
                            {school.programs && school.programs.length > 0 ? (
                              school.programs.map((program, index) => {
                                const programScore = school.admissionScores[program];
                                const programScoreClass = programScore ? getScoreColor(programScore) : '';
                                const programCode = extractProgramCode(program);
                                
                                return (
                                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                    <div className="flex flex-col">
                                      <span className="text-xs font-medium">{program}</span>
                                      {programCode && (
                                        <span className="text-xs text-gray-500">Kod: {programCode}</span>
                                      )}
                                    </div>
                                    {programScore ? (
                                      <span className={`text-xs font-bold ${programScoreClass}`}>
                                        {programScore} poäng
                                      </span>
                                    ) : (
                                      <span className="text-xs text-gray-400">Poäng saknas</span>
                                    )}
                                  </div>
                                );
                              })
                            ) : (
                              <p className="text-xs text-gray-500">Ingen programinformation tillgänglig</p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
        
        {otherSchools.length > 0 && (
          <>
            <h4 className="text-lg font-semibold text-guidance-blue mb-3">
              Övriga skolor
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({otherSchools.length} {otherSchools.length === 1 ? 'skola' : 'skolor'})
              </span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherSchools.map((school) => {
                const admissionScore = findAdmissionScore(school, selectedProgramName);
                const scoreColorClass = admissionScore ? getScoreColor(admissionScore) : '';
                
                return (
                  <Card key={school.id} className="hover:shadow-md transition-shadow border-l-4 border-gray-300">
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
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-xs text-gray-500">
                          {school.location.commute}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleSchoolDetail(school.id)}
                          className="text-guidance-blue hover:bg-guidance-lightBlue p-1 h-auto"
                        >
                          {expandedSchool === school.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                          <span className="ml-1 text-xs">
                            {expandedSchool === school.id ? "Visa mindre" : "Visa alla program"}
                          </span>
                        </Button>
                      </div>

                      {expandedSchool === school.id && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <h5 className="text-sm font-medium text-guidance-blue mb-2 flex items-center">
                            <GraduationCap className="h-4 w-4 mr-1" />
                            Alla program på {school.name}:
                          </h5>
                          
                          <div className="grid grid-cols-1 gap-2">
                            {school.programs && school.programs.length > 0 ? (
                              school.programs.map((program, index) => {
                                const programScore = school.admissionScores[program];
                                const programScoreClass = programScore ? getScoreColor(programScore) : '';
                                const programCode = extractProgramCode(program);
                                
                                return (
                                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                    <div className="flex flex-col">
                                      <span className="text-xs font-medium">{program}</span>
                                      {programCode && (
                                        <span className="text-xs text-gray-500">Kod: {programCode}</span>
                                      )}
                                    </div>
                                    {programScore ? (
                                      <span className={`text-xs font-bold ${programScoreClass}`}>
                                        {programScore} poäng
                                      </span>
                                    ) : (
                                      <span className="text-xs text-gray-400">Poäng saknas</span>
                                    )}
                                  </div>
                                );
                              })
                            ) : (
                              <p className="text-xs text-gray-500">Ingen programinformation tillgänglig</p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SchoolList;
