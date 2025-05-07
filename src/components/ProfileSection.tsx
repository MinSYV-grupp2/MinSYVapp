
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';

const ProfileSection = () => {
  const { profile, updateProfile } = useUser();
  const [name, setName] = useState(profile.name || '');

  const handleSaveName = () => {
    if (name.trim()) {
      updateProfile({ name: name.trim() });
      toast({
        title: "Namn sparat",
        description: "Ditt namn har sparats i din profil.",
      });
    } else {
      toast({
        title: "Ange ditt namn",
        description: "Du behöver ange ditt namn för att fortsätta.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-guidance-lightGreen py-12" id="profile">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Min profil</h2>
        
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="text-6xl mb-6 flex justify-center">👤</div>
          
          <div className="mb-6">
            <Label htmlFor="name" className="text-gray-700">Mitt namn</Label>
            <div className="flex mt-2">
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Ange ditt namn"
                className="mr-2"
              />
              <Button onClick={handleSaveName} className="bg-guidance-blue hover:bg-guidance-blue/90">
                Spara
              </Button>
            </div>
          </div>
          
          <div>
            <p className="text-gray-600 mb-4">
              När du svarar på quizet om vad du gillar och funderar på frågorna 
              kommer din profil att byggas upp. Detta hjälper dig att få en bättre 
              bild av dina intressen och styrkor.
            </p>
            
            <div className="flex justify-center">
              <Button 
                asChild
                className="bg-guidance-green hover:bg-guidance-green/90 text-white"
              >
                <a href="#quiz">Gör quizet nu</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
