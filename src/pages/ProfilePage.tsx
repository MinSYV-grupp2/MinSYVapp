import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import FavoriteSchools from '@/components/FavoriteSchools';
import DiscussionQuestions from '@/components/DiscussionQuestions';
import SavedPrograms from '@/components/SavedPrograms';
import ImportantDates from '@/components/ImportantDates';
import AIInsightsSection from '@/components/AIInsightsSection';
import { User, Heart, FileHeart, FileText, Calendar, Brain } from 'lucide-react';

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

const ProfilePage = () => {
  const { profile, updateProfile, addStrength, removeInterest } = useUser();
  const [newStrength, setNewStrength] = useState('');
  const [reflection, setReflection] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  const handleAddStrength = () => {
    if (newStrength.trim()) {
      addStrength(newStrength.trim());
      setNewStrength('');
      toast({
        title: "Styrka tillagd",
        description: "Din styrka har lagts till i din profil.",
      });
    }
  };

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    
    if (nameInput.value.trim()) {
      updateProfile({ name: nameInput.value.trim() });
      toast({
        title: "Profil uppdaterad",
        description: "Ditt namn har uppdaterats i din profil.",
      });
    }
  };

  const handleSaveReflection = () => {
    if (reflection.trim()) {
      updateProfile({ 
        reflections: [...profile.reflections, reflection.trim()]
      });
      setReflection('');
      toast({
        title: "Reflektion sparad",
        description: "Din reflektion har sparats i din profil.",
      });
    }
  };

  const handleRemoveInterest = (interest: "tech" | "nature" | "art" | "social" | "physical" | "analytical") => {
    removeInterest(interest);
    toast({
      title: "Intresse borttaget",
      description: `Intresset "${interestLabels[interest]}" har tagits bort från din profil.`,
    });
  };

  // Mobile tab options
  const tabs = [
    { id: 'profile', label: 'Profil', icon: <User className="h-5 w-5" /> },
    { id: 'interests', label: 'Intressen', icon: <Heart className="h-5 w-5" /> },
    { id: 'programs', label: 'Program', icon: <FileHeart className="h-5 w-5" /> },
    { id: 'notes', label: 'Anteckningar', icon: <FileText className="h-5 w-5" /> },
    { id: 'dates', label: 'Datum', icon: <Calendar className="h-5 w-5" /> },
    { id: 'insights', label: 'AI Insikter', icon: <Brain className="h-5 w-5" /> }, // New tab
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="page-container flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-guidance-blue">Min profil</h1>
          <p className="text-lg text-gray-600 mb-8">
            Här samlas information om dina intressen, styrkor, sparade program och viktiga datum.
          </p>
          
          {/* Mobile Navigation */}
          <div className="md:hidden mb-6 overflow-x-auto">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  className={activeTab === tab.id ? "bg-guidance-blue" : ""}
                  size="sm"
                >
                  <div className="flex items-center">
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Sidebar - Always visible on desktop, conditional on mobile */}
            {(activeTab === 'profile' || window.innerWidth >= 768) && (
              <div className="md:col-span-3 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-guidance-blue">Personlig information</h2>
                    </div>
                    
                    <form onSubmit={handleUpdateName}>
                      <div className="mb-6">
                        <Label htmlFor="name" className="text-gray-700">Mitt namn</Label>
                        <Input 
                          id="name" 
                          name="name"
                          defaultValue={profile.name} 
                          placeholder="Ange ditt namn"
                          className="mt-1"
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-guidance-blue hover:bg-guidance-blue/90">
                        Spara ändringar
                      </Button>
                    </form>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Button 
                        asChild
                        variant="outline" 
                        className="w-full border-guidance-green text-guidance-green hover:bg-guidance-lightGreen hover:text-guidance-green"
                      >
                        <Link to="/">
                          Tillbaka till startsidan
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <FavoriteSchools />
                  
                  <Card className="shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 text-guidance-blue">Snabblänkar</h3>
                      <div className="space-y-2">
                        <Button asChild variant="outline" className="w-full justify-start">
                          <Link to="/career-map">
                            <FileHeart className="mr-2 h-4 w-4" />
                            Karriärkarta
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full justify-start">
                          <Link to="/booking">
                            <Calendar className="mr-2 h-4 w-4" />
                            Boka SYV-möte
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Main Content Area */}
            <div className="md:col-span-9">
              <div className="space-y-6">
                {/* Interests and Strengths - Always visible on desktop, conditional on mobile */}
                {(activeTab === 'interests' || window.innerWidth >= 768) && (
                  <Card>
                    <CardContent className="p-6">
                      {profile.quizCompleted && (
                        <div className="mb-4 bg-guidance-lightGreen text-guidance-green p-3 rounded-md text-sm font-medium flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Quizet har slutförts och resultaten har sparats i din profil</span>
                        </div>
                      )}
                      
                      <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-guidance-blue">Mina intressen</h2>
                        
                        {profile.interests.length > 0 ? (
                          <div className="flex flex-wrap gap-3">
                            {profile.interests.map((interest) => (
                              <div 
                                key={interest}
                                className="bg-guidance-lightBlue text-guidance-blue px-3 py-2 rounded-full 
                                        flex items-center gap-2 group"
                              >
                                <span>{interestEmojis[interest]}</span>
                                <span>{interestLabels[interest]}</span>
                                <button 
                                  onClick={() => handleRemoveInterest(interest)}
                                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 ml-1"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">
                            Du har inte lagt till några intressen än. 
                            <Link to="/" className="text-guidance-blue hover:underline ml-1">
                              Gör quizet på startsidan
                            </Link> för att lägga till intressen.
                          </p>
                        )}
                      </div>
                      
                      <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-guidance-blue">Mina styrkor</h2>
                        
                        <div className="mb-4 flex">
                          <Input 
                            value={newStrength} 
                            onChange={(e) => setNewStrength(e.target.value)}
                            placeholder="Lägg till en styrka"
                            className="mr-2"
                          />
                          <Button onClick={handleAddStrength} className="bg-guidance-green hover:bg-guidance-green/90">
                            Lägg till
                          </Button>
                        </div>
                        
                        {profile.strengths.length > 0 ? (
                          <div className="flex flex-wrap gap-3">
                            {profile.strengths.map((strength, index) => (
                              <div 
                                key={index}
                                className="bg-guidance-lightGreen text-guidance-green px-3 py-2 rounded-full"
                              >
                                {strength}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">Du har inte lagt till några styrkor än.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {/* Saved Programs Section - Always visible on desktop, conditional on mobile */}
                {(activeTab === 'programs' || window.innerWidth >= 768) && (
                  <div className="grid grid-cols-1 gap-6">
                    <SavedPrograms />
                  </div>
                )}
                
                {/* Questions and Notes - Always visible on desktop, conditional on mobile */}
                {(activeTab === 'notes' || window.innerWidth >= 768) && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DiscussionQuestions />
                    
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4 text-guidance-blue">Min reflektion</h2>
                        
                        <div className="mb-4">
                          <Textarea 
                            value={reflection}
                            onChange={(e) => setReflection(e.target.value)}
                            placeholder="Skriv en kort reflektion om dina tankar just nu..."
                            className="mb-2"
                            rows={4}
                          />
                          <Button 
                            onClick={handleSaveReflection} 
                            className="bg-guidance-purple hover:bg-guidance-purple/90"
                          >
                            Spara reflektion
                          </Button>
                        </div>
                        
                        {profile.reflections.length > 0 ? (
                          <div className="space-y-3 mt-4">
                            {profile.reflections.map((item, index) => (
                              <div 
                                key={index} 
                                className="bg-gray-50 p-3 rounded border border-gray-200"
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">Du har inte lagt till några reflektioner än.</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Dates and Appointments - Always visible on desktop, conditional on mobile */}
                {(activeTab === 'dates' || window.innerWidth >= 768) && (
                  <ImportantDates />
                )}
                
                {/* AI Insights - New section */}
                {(activeTab === 'insights' || window.innerWidth >= 768) && (
                  <AIInsightsSection />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
