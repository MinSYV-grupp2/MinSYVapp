
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface CompareViewProps {
  compareItems: {
    schools: string[];
    programs: string[];
  };
  handleBackToPrograms: () => void;
  toggleCompareProgram: (programId: string) => void;
  toggleCompareSchool: (schoolId: string) => void;
  getProgramById: (id: string) => any;
  getSchoolById: (id: string) => any;
}

const CompareView = ({ 
  compareItems, 
  handleBackToPrograms, 
  toggleCompareProgram, 
  toggleCompareSchool,
  getProgramById,
  getSchoolById 
}: CompareViewProps) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-guidance-blue">Jämför program</h2>
            <Button 
              variant="outline" 
              onClick={handleBackToPrograms} 
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Tillbaka
            </Button>
          </div>
          
          {compareItems.programs.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {compareItems.programs.map(programId => {
                  const program = getProgramById(programId);
                  if (!program) return null;
                  
                  return (
                    <Card key={programId} className="border-l-4 border-guidance-purple">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{program.name}</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleCompareProgram(programId)}
                            className="text-red-500 hover:bg-red-50"
                          >
                            <span className="sr-only">Ta bort</span>
                            &times;
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <span className="font-medium text-sm">Meritpoäng: </span>
                            <span className="text-sm">{program.merit}</span>
                          </div>
                          
                          <div>
                            <span className="font-medium text-sm block">Inriktningar: </span>
                            <ul className="list-disc list-inside text-xs">
                              {program.specializations?.slice(0, 3).map((spec: string, i: number) => (
                                <li key={i}>{spec}</li>
                              ))}
                              {program.specializations && program.specializations.length > 3 && (
                                <li>+{program.specializations.length - 3} fler</li>
                              )}
                            </ul>
                          </div>
                          
                          <div>
                            <span className="font-medium text-sm block">Vidare studier: </span>
                            <ul className="list-disc list-inside text-xs">
                              {program.furtherEducation?.slice(0, 2).map((edu: any, i: number) => (
                                <li key={i}>{edu.name}</li>
                              ))}
                              {program.furtherEducation && program.furtherEducation.length > 2 && (
                                <li>+{program.furtherEducation.length - 2} fler</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Inga program valda för jämförelse</p>
              <p className="text-sm">Klicka på "Jämför" knappen på ett program för att lägga till det här</p>
            </div>
          )}
          
          <div className="mt-8">
            <h2 className="text-xl font-bold text-guidance-blue mb-4">Jämför skolor</h2>
            
            {compareItems.schools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {compareItems.schools.map(schoolId => {
                  const school = getSchoolById(schoolId);
                  if (!school) return null;
                  
                  return (
                    <Card key={schoolId} className="border-l-4 border-guidance-green">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{school.name}</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleCompareSchool(schoolId)}
                            className="text-red-500 hover:bg-red-50"
                          >
                            <span className="sr-only">Ta bort</span>
                            &times;
                          </Button>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <p className="text-gray-600">{school.location.address}</p>
                          
                          <div>
                            <span className="font-medium">Program: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {school.programs.map((id: string) => {
                                const program = getProgramById(id);
                                return program && (
                                  <span key={id} className="bg-guidance-lightBlue text-guidance-blue text-xs px-2 py-0.5 rounded">
                                    {program.name}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          
                          <div>
                            <span className="font-medium">Statistik: </span>
                            <ul className="mt-1 space-y-1 text-xs">
                              <li>Genomsnittligt betyg: {school.statistics.averageGrade}</li>
                              <li>Fullföljd utbildning: {school.statistics.completionRate}%</li>
                              <li>Nöjda elever: {school.statistics.satisfactionRate}%</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Inga skolor valda för jämförelse</p>
                <p className="text-sm">Klicka på "Jämför" knappen på en skola för att lägga till den här</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompareView;
