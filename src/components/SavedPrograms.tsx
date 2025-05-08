
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { X } from 'lucide-react';

const SavedPrograms = () => {
  const { profile, removeSavedProgram } = useUser();

  const handleRemoveProgram = (id: string) => {
    removeSavedProgram(id);
    toast({
      title: "Program borttaget",
      description: "Programmet har tagits bort från dina sparade program.",
    });
  };

  return (
    <Card className="shadow">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-guidance-blue">Sparade program</h3>
        
        {profile.savedPrograms.length > 0 ? (
          <div className="space-y-3">
            {profile.savedPrograms.map((program) => (
              <Card key={program.id} className="relative">
                <CardContent className="p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-slate-100"
                    onClick={() => handleRemoveProgram(program.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <h4 className="font-medium text-guidance-blue">{program.programName}</h4>
                  <p className="text-sm text-gray-600">{program.schoolName}</p>
                  {program.specialization && (
                    <p className="text-sm text-gray-500 mt-1">
                      Inriktning: {program.specialization}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center italic">
            Du har inte sparat några program ännu. 
            Besök <a href="/career-map" className="text-guidance-blue hover:underline">karriärkartan</a> för att utforska och spara program.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedPrograms;
