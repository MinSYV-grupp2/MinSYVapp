
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import TreeDiagram from '@/components/TreeDiagram';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { Heart } from 'lucide-react';

// Program and career path data
const programData = [
  {
    id: 'tech',
    name: 'Teknikprogrammet',
    description: 'Fokuserar på matematik, fysik, kemi och teknologi. Förbereder för ingenjörsstudier och tekniska yrken.',
    careers: ['Civilingenjör', 'Programmerare', 'Arkitekt', 'Produktutvecklare'],
    universities: ['KTH', 'Chalmers', 'Linköpings Universitet'],
    subjects: ['Matematik', 'Fysik', 'Programmering', 'Teknik']
  },
  {
    id: 'science',
    name: 'Naturvetenskapsprogrammet',
    description: 'Fokuserar på biologi, fysik, kemi och matematik. Förbereder för vidare studier inom naturvetenskap och medicin.',
    careers: ['Läkare', 'Veterinär', 'Forskare', 'Apotekare'],
    universities: ['Karolinska Institutet', 'Uppsala Universitet', 'Lunds Universitet'],
    subjects: ['Biologi', 'Kemi', 'Fysik', 'Matematik']
  },
  {
    id: 'social',
    name: 'Samhällsvetenskapsprogrammet',
    description: 'Fokuserar på samhällskunskap, historia, psykologi och språk. Förbereder för studier inom samhällsvetenskap och humaniora.',
    careers: ['Jurist', 'Psykolog', 'Socionom', 'Journalist'],
    universities: ['Stockholms Universitet', 'Göteborgs Universitet', 'Lunds Universitet'],
    subjects: ['Samhällskunskap', 'Historia', 'Psykologi', 'Svenska']
  },
  {
    id: 'business',
    name: 'Ekonomiprogrammet',
    description: 'Fokuserar på företagsekonomi, juridik och matematik. Förbereder för studier inom ekonomi och handel.',
    careers: ['Ekonom', 'Marknadsförare', 'Revisor', 'Entreprenör'],
    universities: ['Handelshögskolan', 'Lunds Universitet', 'Uppsala Universitet'],
    subjects: ['Företagsekonomi', 'Juridik', 'Matematik', 'Entreprenörskap']
  },
  {
    id: 'arts',
    name: 'Estetiska programmet',
    description: 'Fokuserar på kreativa ämnen som bild, musik, teater och design. Förbereder för konstnärliga utbildningar.',
    careers: ['Konstnär', 'Musiker', 'Skådespelare', 'Designer'],
    universities: ['Konstfack', 'Musikhögskolan', 'Teaterhögskolan'],
    subjects: ['Konst', 'Musik', 'Teater', 'Design']
  }
];

// Schools in Göteborg
const schools = [
  "Angeredsgymnasiet",
  "Burgårdens gymnasium",
  "Donnergymnasiet",
  "Hvitfeldtska gymnasiet",
  "International High School of the Gothenburg Region",
  "Katrinelundsgymnasiet",
  "Lindholmens tekniska gymnasium",
  "Polhemsgymnasiet",
  "Schillerska gymnasiet"
];

const CareerMap = () => {
  const { addSavedProgram } = useUser();
  const [selectedProgram, setSelectedProgram] = useState(programData[0]);
  const [viewMode, setViewMode] = useState<'list' | 'tree'>('list');
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  
  const handleSaveProgram = (school?: string) => {
    const schoolName = school || selectedSchool || "Valfri skola";
    const programId = `${Date.now().toString()}-${selectedProgram.id}`;
    
    addSavedProgram({
      id: programId,
      programName: selectedProgram.name,
      schoolName: schoolName,
      specialization: undefined
    });
    
    toast({
      title: "Program sparat",
      description: `${selectedProgram.name} på ${schoolName} har lagts till i din profil.`,
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-guidance-blue">Utforska gymnasieprogram och framtidsvägar</h2>
          <div className="space-x-2">
            <Button 
              variant={viewMode === 'list' ? "default" : "outline"} 
              onClick={() => setViewMode('list')}
              className="bg-guidance-blue hover:bg-guidance-blue/90"
            >
              Lista
            </Button>
            <Button 
              variant={viewMode === 'tree' ? "default" : "outline"} 
              onClick={() => setViewMode('tree')}
              className={viewMode === 'tree' ? "bg-guidance-blue hover:bg-guidance-blue/90" : ""}
            >
              Karriärträd
            </Button>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          Välj ett gymnasieprogram nedan för att se vilka framtida möjligheter det kan leda till, 
          både inom högre studier och yrkesliv, eller utforska karriärträdet för att se hela vägen från skola till yrke.
        </p>
        
        {viewMode === 'list' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {programData.map((program) => (
                <Button
                  key={program.id}
                  variant={selectedProgram.id === program.id ? "default" : "outline"}
                  className={selectedProgram.id === program.id 
                    ? "bg-guidance-blue hover:bg-guidance-blue/90" 
                    : "border-guidance-blue text-guidance-blue hover:bg-guidance-lightBlue/50"}
                  onClick={() => setSelectedProgram(program)}
                >
                  {program.name}
                </Button>
              ))}
            </div>
            
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-guidance-green">{selectedProgram.name}</h3>
                    <p className="text-gray-600">{selectedProgram.description}</p>
                  </div>
                  <Button
                    onClick={() => handleSaveProgram()}
                    variant="outline"
                    className="border-guidance-green text-guidance-green hover:bg-guidance-lightGreen/50"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Spara program
                  </Button>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Välj skola</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                    {schools.map((school) => (
                      <Button
                        key={school}
                        variant={selectedSchool === school ? "default" : "outline"}
                        className={selectedSchool === school
                          ? "bg-guidance-purple hover:bg-guidance-purple/90"
                          : ""}
                        onClick={() => setSelectedSchool(school)}
                      >
                        {school}
                      </Button>
                    ))}
                  </div>
                  
                  {selectedSchool && (
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSaveProgram(selectedSchool)}
                        className="bg-guidance-green hover:bg-guidance-green/90"
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Spara {selectedProgram.name} på {selectedSchool}
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="mt-8">
                  <Tabs defaultValue="careers">
                    <TabsList className="mb-4">
                      <TabsTrigger value="careers">Möjliga yrken</TabsTrigger>
                      <TabsTrigger value="education">Vidare studier</TabsTrigger>
                      <TabsTrigger value="subjects">Viktiga ämnen</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="careers" className="space-y-4">
                      <h4 className="font-semibold">Yrken detta program kan leda till:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        {selectedProgram.careers.map((career, index) => (
                          <div key={index} className="bg-guidance-lightGreen p-3 rounded-lg text-center">
                            {career}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="education" className="space-y-4">
                      <h4 className="font-semibold">Vanliga universitet och högskolor:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {selectedProgram.universities.map((university, index) => (
                          <div key={index} className="bg-guidance-lightBlue p-3 rounded-lg text-center">
                            {university}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="subjects" className="space-y-4">
                      <h4 className="font-semibold">Viktiga ämnen i programmet:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        {selectedProgram.subjects.map((subject, index) => (
                          <div key={index} className="bg-guidance-lightPurple p-3 rounded-lg text-center">
                            {subject}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        {viewMode === 'tree' && (
          <div className="mb-8">
            <TreeDiagram />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-guidance-blue">Videointervjuer</h3>
            <p className="text-gray-600 mb-4">
              Lyssna på gymnasieelever och yrkesverksamma berätta om sina erfarenheter
              och vad som är viktigt att tänka på.
            </p>
            <Button asChild>
              <Link to="/interviews">Se alla intervjuer</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-guidance-blue">AI-chatt för vägledning</h3>
            <p className="text-gray-600 mb-4">
              Har du frågor om utbildningar, yrken eller framtida vägval? 
              Prata med vår AI-assistent för snabb hjälp.
            </p>
            <Button asChild>
              <Link to="/ai-chat">Öppna AI-chatt</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerMap;
