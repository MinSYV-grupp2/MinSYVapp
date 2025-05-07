
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { X } from 'lucide-react';

const FavoriteSchools = () => {
  const { profile, addFavoriteSchool, removeFavoriteSchool } = useUser();
  const [schoolName, setSchoolName] = useState('');
  const [programName, setProgramName] = useState('');

  const handleAddSchool = () => {
    if (!schoolName.trim()) {
      toast({
        title: "Ange skolans namn",
        description: "Du behöver ange skolans namn för att lägga till den.",
        variant: "destructive"
      });
      return;
    }

    addFavoriteSchool({
      id: Date.now().toString(),
      name: schoolName.trim(),
      program: programName.trim() || undefined
    });

    setSchoolName('');
    setProgramName('');
    
    toast({
      title: "Skola tillagd",
      description: "Skolan har lagts till i dina favoriter.",
    });
  };

  const handleRemoveSchool = (id: string) => {
    removeFavoriteSchool(id);
    toast({
      title: "Skola borttagen",
      description: "Skolan har tagits bort från dina favoriter.",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-guidance-blue">Mina favoriter</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <Input
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="Skolans namn"
            className="mb-2"
          />
          <Input
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            placeholder="Program (valfritt)"
            className="mb-2"
          />
          <Button 
            onClick={handleAddSchool}
            className="w-full bg-guidance-green hover:bg-guidance-green/90"
          >
            Lägg till i favoriter
          </Button>
        </div>
      </div>

      {profile.favoriteSchools.length > 0 ? (
        <div className="space-y-3">
          {profile.favoriteSchools.map((school) => (
            <Card key={school.id} className="relative">
              <CardContent className="p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-slate-100"
                  onClick={() => handleRemoveSchool(school.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <h4 className="font-medium">{school.name}</h4>
                {school.program && <p className="text-sm text-gray-600">{school.program}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center italic">Du har inte lagt till några skolor eller program ännu</p>
      )}
    </div>
  );
};

export default FavoriteSchools;
