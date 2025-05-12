
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import TreeDiagram from '@/components/TreeDiagram';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { Heart, Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Program and career path data with expanded information
const programData = [
  {
    id: 'tech',
    name: 'Teknikprogrammet',
    description: 'Fokuserar på matematik, fysik, kemi och teknologi. Förbereder för ingenjörsstudier och tekniska yrken.',
    meritDescription: 'Ger särskild behörighet till tekniska utbildningar på högskola/universitet. Meriten ligger på 1.0 för relevanta tekniska utbildningar.',
    educationDescription: 'Programmet omfattar 2500 gymnasiepoäng med fokus på tekniska och naturvetenskapliga ämnen. Programmet har flera inriktningar som informations- och medieteknik, produktionsteknik och samhällsbyggande.',
    careers: ['Civilingenjör', 'Programmerare', 'Arkitekt', 'Produktutvecklare'],
    universities: ['KTH', 'Chalmers', 'Linköpings Universitet'],
    subjects: ['Matematik', 'Fysik', 'Programmering', 'Teknik']
  },
  {
    id: 'science',
    name: 'Naturvetenskapsprogrammet',
    description: 'Fokuserar på biologi, fysik, kemi och matematik. Förbereder för vidare studier inom naturvetenskap och medicin.',
    meritDescription: 'Ger särskild behörighet till medicin- och naturvetenskapliga utbildningar. Meriten ligger på 1.0 för medicinska och naturvetenskapliga utbildningar.',
    educationDescription: 'Programmet omfattar 2500 gymnasiepoäng med fokus på biologi, kemi, fysik och matematik. Två inriktningar finns tillgängliga: naturvetenskap och naturvetenskap och samhälle.',
    careers: ['Läkare', 'Veterinär', 'Forskare', 'Apotekare'],
    universities: ['Karolinska Institutet', 'Uppsala Universitet', 'Lunds Universitet'],
    subjects: ['Biologi', 'Kemi', 'Fysik', 'Matematik']
  },
  {
    id: 'social',
    name: 'Samhällsvetenskapsprogrammet',
    description: 'Fokuserar på samhällskunskap, historia, psykologi och språk. Förbereder för studier inom samhällsvetenskap och humaniora.',
    meritDescription: 'Ger behörighet till de flesta samhällsvetenskapliga och humanistiska utbildningar. Meriten kan ligga på 0.5 för vissa specialutbildningar.',
    educationDescription: 'Programmet omfattar 2500 gymnasiepoäng med fokus på samhälle, beteende och språk. Det har flera inriktningar som beteendevetenskap, samhällsvetenskap och medier.',
    careers: ['Jurist', 'Psykolog', 'Socionom', 'Journalist'],
    universities: ['Stockholms Universitet', 'Göteborgs Universitet', 'Lunds Universitet'],
    subjects: ['Samhällskunskap', 'Historia', 'Psykologi', 'Svenska']
  },
  {
    id: 'business',
    name: 'Ekonomiprogrammet',
    description: 'Fokuserar på företagsekonomi, juridik och matematik. Förbereder för studier inom ekonomi och handel.',
    meritDescription: 'Ger särskild behörighet till ekonomiska utbildningar. Meriten kan vara upp till 0.5 för vissa ekonomiutbildningar.',
    educationDescription: 'Programmet omfattar 2500 gymnasiepoäng med fokus på företagsekonomi, nationalekonomi och juridik. Två inriktningar finns: ekonomi och juridik.',
    careers: ['Ekonom', 'Marknadsförare', 'Revisor', 'Entreprenör'],
    universities: ['Handelshögskolan', 'Lunds Universitet', 'Uppsala Universitet'],
    subjects: ['Företagsekonomi', 'Juridik', 'Matematik', 'Entreprenörskap']
  },
  {
    id: 'arts',
    name: 'Estetiska programmet',
    description: 'Fokuserar på kreativa ämnen som bild, musik, teater och design. Förbereder för konstnärliga utbildningar.',
    meritDescription: 'Ger grundläggande behörighet för högre studier. För konstnärliga utbildningar kan arbetsprover vara avgörande utöver betyg.',
    educationDescription: 'Programmet omfattar 2500 gymnasiepoäng med fokus på estetiska uttrycksformer. Det har flera inriktningar som bild och formgivning, dans, musik och teater.',
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
                    
                    <div className="mt-4 space-y-3">
                      <div className="bg-guidance-lightGreen/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <h4 className="font-semibold text-guidance-green">Merit och behörighet</h4>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="p-0 h-6 w-6 ml-1">
                                  <Info className="h-4 w-4 text-guidance-green" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>Merit anger hur mycket extra poäng du kan få vid ansökan till olika utbildningar.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p className="text-sm text-gray-700">{selectedProgram.meritDescription}</p>
                      </div>
                      
                      <div className="bg-guidance-lightBlue/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-guidance-blue mb-2">Om utbildningen</h4>
                        <p className="text-sm text-gray-700">{selectedProgram.educationDescription}</p>
                      </div>
                    </div>
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
