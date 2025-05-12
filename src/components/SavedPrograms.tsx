
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { FileHeart, Trash2, GraduationCap } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SavedPrograms = () => {
  const { profile, removeSavedProgram } = useUser();
  
  const handleRemoveProgram = (programId: string, programName: string) => {
    removeSavedProgram(programId);
    toast({
      title: "Program borttaget",
      description: `${programName} har tagits bort från dina sparade program.`,
    });
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileHeart className="h-5 w-5 text-guidance-green mr-2" />
            <h2 className="text-xl font-semibold text-guidance-blue">Mina sparade program</h2>
          </div>
          <Button 
            asChild
            variant="outline" 
            size="sm"
            className="border-guidance-blue text-guidance-blue hover:bg-guidance-lightBlue/50"
          >
            <Link to="/career-map">Utforska fler program</Link>
          </Button>
        </div>
        
        {profile.savedPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.savedPrograms.map((program) => (
              <div 
                key={program.id} 
                className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-guidance-green">{program.programName}</h3>
                    <p className="text-gray-600 text-sm">{program.schoolName}</p>
                    {program.specialization && (
                      <p className="text-gray-500 text-xs mt-1">Inriktning: {program.specialization}</p>
                    )}
                    {program.merit && (
                      <div className="mt-2 flex items-center">
                        <GraduationCap className="h-4 w-4 text-guidance-purple mr-1" />
                        <span className="bg-guidance-lightPurple text-guidance-purple text-xs px-2 py-1 rounded inline-block">
                          Meritpoäng: {program.merit}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500 p-1 h-auto">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Ta bort program</AlertDialogTitle>
                        <AlertDialogDescription>
                          Är du säker på att du vill ta bort {program.programName} från dina sparade program?
                          Detta går inte att ångra.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Avbryt</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleRemoveProgram(program.id, program.programName)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Ta bort
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-2">📚</div>
            <p className="text-gray-500 mb-4">Du har inga sparade program ännu</p>
            <Button 
              asChild
              className="bg-guidance-green hover:bg-guidance-green/90"
            >
              <Link to="/career-map">
                <FileHeart className="mr-2 h-4 w-4" />
                Utforska gymnasieprogram
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedPrograms;
