
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const interestEmojis: Record<string, string> = {
  tech: '💻',
  nature: '🌳',
  art: '🎨',
  social: '👥',
  physical: '🏃',
  analytical: '🧩',
};

const interestLabels: Record<string, string> = {
  tech: 'Teknik',
  nature: 'Natur',
  art: 'Kreativitet',
  social: 'Socialt',
  physical: 'Fysiskt',
  analytical: 'Analytiskt',
};

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
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Card className="bg-white p-6 rounded-lg shadow-md">
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
                
                <div className="mt-4">
                  <Button 
                    asChild
                    className="w-full bg-guidance-green hover:bg-guidance-green/90 text-white"
                  >
                    <Link to="/profile">Min fullständiga profil</Link>
                  </Button>
                </div>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="bg-white p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold mb-4 text-guidance-blue">Mina intressen</h3>
                
                {profile.quizCompleted ? (
                  <>
                    <div className="mb-4 bg-guidance-lightGreen text-guidance-green p-3 rounded-md text-sm font-medium flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Quizet har slutförts! Här är dina intressen:</span>
                    </div>
                    
                    {profile.interests.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {profile.interests.map((interest) => (
                          <div 
                            key={interest}
                            className="bg-guidance-lightBlue text-guidance-blue px-3 py-2 rounded-full 
                                    flex items-center gap-2"
                          >
                            <span>{interestEmojis[interest]}</span>
                            <span>{interestLabels[interest]}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Du har inte lagt till några intressen än.</p>
                    )}
                    
                    <div className="mt-6">
                      <p className="text-gray-600 mb-4">
                        Baserat på dina intressen rekommenderar vi att du utforskar:
                      </p>
                      
                      <div className="flex justify-between gap-4 flex-wrap">
                        <Button 
                          asChild
                          className="bg-guidance-purple hover:bg-guidance-purple/90 flex-grow"
                        >
                          <Link to="/career-map">Karriärkartan</Link>
                        </Button>
                        
                        <Button 
                          asChild
                          variant="outline"
                          className="border-guidance-blue text-guidance-blue hover:bg-guidance-lightBlue/50 flex-grow"
                        >
                          <Link to="/booking">Boka tid med SYV</Link>
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">
                      När du svarar på quizet om vad du gillar kommer din profil att byggas upp. 
                      Detta hjälper dig att få en bättre bild av dina intressen och styrkor.
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
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
