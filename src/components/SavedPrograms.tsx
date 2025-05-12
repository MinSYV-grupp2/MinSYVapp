
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { X, FileHeart } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-guidance-blue">Sparade program</h3>
          {profile.savedPrograms.length > 0 && (
            <span className="bg-guidance-lightPurple text-guidance-purple text-xs font-medium px-2.5 py-1 rounded-full">
              {profile.savedPrograms.length}
            </span>
          )}
        </div>
        
        {profile.savedPrograms.length > 0 ? (
          <div className="space-y-3">
            {profile.savedPrograms.map((program) => (
              <Card key={program.id} className="relative border-l-4 border-guidance-purple">
                <CardContent className="p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-slate-100"
                    onClick={() => handleRemoveProgram(program.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="bg-guidance-lightPurple p-2 rounded-full">
                        <FileHeart className="h-4 w-4 text-guidance-purple" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-guidance-blue">{program.programName}</h4>
                      <p className="text-sm text-gray-600">{program.schoolName}</p>
                      {program.specialization && (
                        <p className="text-sm text-gray-500 mt-1">
                          Inriktning: {program.specialization}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="flex justify-center">
              <div className="bg-gray-100 p-4 rounded-full">
                <FileHeart className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <p className="text-gray-500 italic">
              Du har inte sparat några program ännu.
            </p>
            <Button 
              asChild
              className="bg-guidance-purple hover:bg-guidance-purple/90"
            >
              <Link to="/career-map">Utforska karriärkartan</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedPrograms;
