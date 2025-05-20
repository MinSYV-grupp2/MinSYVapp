import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PlayCircle, MapPin, ExternalLink } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';

interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

interface QuizOption {
  id: string;
  text: string;
  value: string;
}

interface SchoolProgram {
  school: string;
  program: string;
  points?: string;
  category: string[];
  profiles: string[];
}

// Schools data from the provided list
const schoolsData: SchoolProgram[] = [
  { 
    school: "Amerikanska Gymnasiet", 
    program: "Ekonomiprogrammet", 
    points: "205,50 - 238,33",
    category: ["ekonomi", "business", "företagande", "samhälle"],
    profiles: ["G", "D", "H"]
  },
  { 
    school: "Amerikanska Gymnasiet", 
    program: "Naturvetenskapsprogrammet", 
    points: "245,00 - 280,16",
    category: ["natur", "matematik", "vetenskap", "forskning"],
    profiles: ["A", "E", "H"]
  },
  { 
    school: "Amerikanska Gymnasiet", 
    program: "Samhällsvetenskapsprogrammet", 
    points: "208,00 - 235,80",
    category: ["samhälle", "språk", "historia", "politik"],
    profiles: ["D", "F", "H"]
  },
  { 
    school: "Amerikanska Gymnasiet", 
    program: "Teknikprogrammet", 
    points: "220,50 - 248,25",
    category: ["teknik", "programmering", "design", "innovation"],
    profiles: ["A", "E", "B"]
  },
  { 
    school: "Angeredsgymnasiet", 
    program: "Ekonomiprogrammet",
    category: ["ekonomi", "business", "företagande", "samhälle"],
    profiles: ["G", "D", "H"]
  },
  { 
    school: "Angeredsgymnasiet", 
    program: "Vård- och omsorgsprogrammet", 
    category: ["vård", "omsorg", "människor", "hjälpa"],
    profiles: ["F", "D", "H"]
  },
  { 
    school: "Burgårdens gymnasium", 
    program: "Barn- och fritidsprogrammet", 
    category: ["barn", "pedagogik", "rörelse", "ledarskap"],
    profiles: ["F", "H", "D"]
  },
  { 
    school: "Burgårdens gymnasium", 
    program: "Naturbruksprogrammet - Djurvård", 
    category: ["djur", "natur", "biologi", "friluftsliv"],
    profiles: ["A", "F", "H"]
  },
  { 
    school: "Drottning Blankas Gymnasieskola", 
    program: "Frisör- och stylistprogrammet", 
    category: ["estetik", "design", "mode", "kreativitet"],
    profiles: ["B", "C", "H"]
  },
  { 
    school: "Ester Mosessons gymnasium", 
    program: "Restaurang- och livsmedelsprogrammet", 
    category: ["mat", "livsmedel", "kreativitet", "service"],
    profiles: ["C", "B", "G"]
  },
  { 
    school: "GTG", 
    program: "Teknikprogrammet", 
    points: "225,50 - 258,55",
    category: ["teknik", "programmering", "design", "innovation"],
    profiles: ["E", "A", "C"]
  },
  { 
    school: "Hvitfeldtska gymnasiet", 
    program: "Estetiska programmet - Musik", 
    category: ["musik", "estetik", "konst", "kreativitet"],
    profiles: ["B", "D", "H"]
  },
  { 
    school: "L M Engström gymnasium", 
    program: "Naturvetenskapsprogrammet", 
    points: "308,00 - 323,75",
    category: ["natur", "matematik", "vetenskap", "forskning"],
    profiles: ["A", "E", "D"]
  },
  { 
    school: "Praktiska Gymnasiet Göteborg", 
    program: "Bygg- och anläggningsprogrammet", 
    category: ["bygg", "hantverk", "praktisk", "konstruktion"],
    profiles: ["C", "H", "G"]
  },
  { 
    school: "Realgymnasiet Göteborg", 
    program: "Naturbruksprogrammet - Hästhållning", 
    points: "233,00 - 259,60",
    category: ["djur", "häst", "natur", "friluftsliv"],
    profiles: ["H", "F", "C"]
  },
  { 
    school: "Rytmus Göteborg", 
    program: "Estetiska programmet - Musik", 
    category: ["musik", "estetik", "konst", "kreativitet"],
    profiles: ["B", "H", "D"]
  },
  { 
    school: "Schillerska gymnasiet", 
    program: "Estetiska programmet - Bild och formgivning", 
    category: ["konst", "design", "estetik", "kreativitet"],
    profiles: ["B", "A", "D"]
  },
  { 
    school: "Yrkesgymnasiet", 
    program: "Fordons- och transportprogrammet", 
    category: ["fordon", "teknik", "praktisk", "mekanik"],
    profiles: ["C", "E", "G"]
  },
  { 
    school: "Katrinelundsgymnasiet", 
    program: "Teknikprogrammet", 
    category: ["teknik", "programmering", "innovation"],
    profiles: ["E", "A", "G"]
  },
  { 
    school: "Polhemsgymnasiet", 
    program: "Samhällsvetenskapsprogrammet", 
    points: "220,50 - 241,16",
    category: ["samhälle", "politik", "historia"],
    profiles: ["D", "A", "G"]
  },
  { 
    school: "Jensen Gymnasium", 
    program: "Ekonomiprogrammet", 
    points: "203,00 - 223,09",
    category: ["ekonomi", "business", "företagande"],
    profiles: ["G", "D", "E"]
  },
  { 
    school: "Donnergymnasiet", 
    program: "Estetiska programmet - Musik", 
    points: "495,00 - 289,37",
    category: ["musik", "estetik", "kreativitet"],
    profiles: ["B", "D", "H"]
  },
  { 
    school: "NTI Gymnasiet", 
    program: "Teknikprogrammet", 
    points: "205,50 - 259,74",
    category: ["teknik", "programmering", "it"],
    profiles: ["E", "A", "G"]
  }
];

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Vilken plats trivs du bäst på?",
    options: [
      { id: "1a", text: "I ett labb", value: "A" },
      { id: "1b", text: "På en scen", value: "B" },
      { id: "1c", text: "På en byggarbetsplats", value: "C" },
      { id: "1d", text: "I en gruppdiskussion", value: "D" },
      { id: "1e", text: "Framför en dator", value: "E" },
      { id: "1f", text: "Bland små barn", value: "F" },
      { id: "1g", text: "I en butik", value: "G" },
      { id: "1h", text: "På ett gym eller i en idrottshall", value: "H" }
    ]
  },
  {
    id: 2,
    question: "Vad gör du när något går sönder hemma?",
    options: [
      { id: "2a", text: "Tar reda på varför det gick sönder", value: "A" },
      { id: "2b", text: "Försöker laga det själv", value: "B" },
      { id: "2c", text: "Skissar upp en idé på hur det kunde förbättras", value: "C" },
      { id: "2d", text: "Frågar någon och diskuterar olika lösningar", value: "D" },
      { id: "2e", text: "Testar om jag kan googla och hitta en lösning", value: "E" },
      { id: "2f", text: "Erbjuder mig att hjälpa till med något annat i stället", value: "F" },
      { id: "2g", text: "Kollar om man kan köpa nytt och vad det kostar", value: "G" },
      { id: "2h", text: "Rör på mig, jag får myror i benen", value: "H" }
    ]
  },
  {
    id: 3,
    question: "Vilken skoluppgift känns mest motiverande?",
    options: [
      { id: "3a", text: "Göra ett experiment och skriva rapport", value: "A" },
      { id: "3b", text: "Skapa en kortfilm eller ett musikstycke", value: "B" },
      { id: "3c", text: "Bygga något som fungerar på riktigt", value: "C" },
      { id: "3d", text: "Argumentera i ett debattämne", value: "D" },
      { id: "3e", text: "Koda ett spel eller lösa en teknisk uppgift", value: "E" },
      { id: "3f", text: "Planera en lek för barn", value: "F" },
      { id: "3g", text: "Göra en budget eller affärsplan", value: "G" },
      { id: "3h", text: "Hålla i en idrottslektion", value: "H" }
    ]
  },
  {
    id: 4,
    question: "Hur hanterar du en stressig situation?",
    options: [
      { id: "4a", text: "Analyserar läget noga", value: "A" },
      { id: "4b", text: "Andas djupt och tänker kreativt", value: "B" },
      { id: "4c", text: "Gör något praktiskt direkt", value: "C" },
      { id: "4d", text: "Pratar med någon om det", value: "D" },
      { id: "4e", text: "Sorterar tankarna genom att fokusera på teknik eller logik", value: "E" },
      { id: "4f", text: "Försöker hjälpa andra som också är stressade", value: "F" },
      { id: "4g", text: "Tar ansvar och organiserar", value: "G" },
      { id: "4h", text: "Tar en löptur eller gör något fysiskt", value: "H" }
    ]
  },
  {
    id: 5,
    question: "Vad ser du mest fram emot efter studenten?",
    options: [
      { id: "5a", text: "Studera vidare på universitet", value: "A" },
      { id: "5b", text: "Få uttrycka mig fritt i mitt yrke", value: "B" },
      { id: "5c", text: "Börja jobba direkt", value: "C" },
      { id: "5d", text: "Resa och lära mig om världen", value: "D" },
      { id: "5e", text: "Jobba inom teknik eller IT", value: "E" },
      { id: "5f", text: "Arbeta med människor i behov", value: "F" },
      { id: "5g", text: "Starta något eget", value: "G" },
      { id: "5h", text: "Jobba med barn eller idrott", value: "H" }
    ]
  },
  {
    id: 6,
    question: "Hur tänker du när du ser ett problem?",
    options: [
      { id: "6a", text: "Vad orsakar det här egentligen?", value: "A" },
      { id: "6b", text: "Hur kan jag visa det här på ett nytt sätt?", value: "B" },
      { id: "6c", text: "Vad kan jag bygga eller göra åt det?", value: "C" },
      { id: "6d", text: "Vad tycker andra om det här?", value: "D" },
      { id: "6e", text: "Kan teknik lösa detta?", value: "E" },
      { id: "6f", text: "Hur påverkar det människorna i situationen?", value: "F" },
      { id: "6g", text: "Hur kan det bli effektivare och billigare?", value: "G" },
      { id: "6h", text: "Hur kan vi få folk att samarbeta bättre?", value: "H" }
    ]
  },
  {
    id: 7,
    question: "Vilket ord tilltalar dig mest?",
    options: [
      { id: "7a", text: "Upptäckt", value: "A" },
      { id: "7b", text: "Kreativitet", value: "B" },
      { id: "7c", text: "Verktyg", value: "C" },
      { id: "7d", text: "Samhälle", value: "D" },
      { id: "7e", text: "Innovation", value: "E" },
      { id: "7f", text: "Omtanke", value: "F" },
      { id: "7g", text: "Affär", value: "G" },
      { id: "7h", text: "Energi", value: "H" }
    ]
  },
  {
    id: 8,
    question: "Vilket scenario gillar du bäst?",
    options: [
      { id: "8a", text: "Ställa frågor om universum", value: "A" },
      { id: "8b", text: "Skriva en låt med känsla", value: "B" },
      { id: "8c", text: "Bygga en bänk från grunden", value: "C" },
      { id: "8d", text: "Ha en het diskussion om rättvisa", value: "D" },
      { id: "8e", text: "Hitta ett fel i en kod och lösa det", value: "E" },
      { id: "8f", text: "Hålla ett barn i handen på utflykt", value: "F" },
      { id: "8g", text: "Planera ett event och räkna på vinsten", value: "G" },
      { id: "8h", text: "Organisera en turnering", value: "H" }
    ]
  },
  {
    id: 9,
    question: "Vad gillar du mest på YouTube eller TikTok?",
    options: [
      { id: "9a", text: "Vetenskap & fakta", value: "A" },
      { id: "9b", text: "Konst, musik eller dans", value: "B" },
      { id: "9c", text: "DIY & verktygsprojekt", value: "C" },
      { id: "9d", text: "Samhällsfrågor eller debatter", value: "D" },
      { id: "9e", text: "Tech & gaming", value: "E" },
      { id: "9f", text: "Vloggar med vardagsliv och människor", value: "F" },
      { id: "9g", text: "Entreprenörskap eller livshacks", value: "G" },
      { id: "9h", text: "Träning och idrottsutmaningar", value: "H" }
    ]
  },
  {
    id: 10,
    question: "Vad beskriver dig bäst?",
    options: [
      { id: "10a", text: "Nyfiken och logisk", value: "A" },
      { id: "10b", text: "Idérik och uttrycksfull", value: "B" },
      { id: "10c", text: "Praktisk och lösningsfokuserad", value: "C" },
      { id: "10d", text: "Reflekterande och engagerad", value: "D" },
      { id: "10e", text: "Teknisk och analytisk", value: "E" },
      { id: "10f", text: "Varm och hjälpsam", value: "F" },
      { id: "10g", text: "Målmedveten och driven", value: "G" },
      { id: "10h", text: "Aktiv och social", value: "H" }
    ]
  }
];

const GuidanceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [matchedSchools, setMatchedSchools] = useState<SchoolProgram[]>([]);
  const [error, setError] = useState("");
  const [profileScores, setProfileScores] = useState<Record<string, number>>({
    A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0
  });

  const handleOptionSelect = (questionId: number, optionValue: string) => {
    setAnswers({
      ...answers,
      [questionId]: optionValue
    });
  };

  const isOptionSelected = (questionId: number, optionValue: string) => {
    return answers[questionId] === optionValue;
  };

  const handleNextQuestion = () => {
    if (!answers[quizQuestions[currentQuestion].id]) {
      setError("Välj ett alternativ för att fortsätta");
      return;
    }
    
    setError("");
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Last question completed - calculate results directly without requiring name/merit
      calculateResults();
      setShowResults(true);
      
      toast.success("Quiz slutfört! Här är dina matchande gymnasieskolor.", {
        duration: 5000
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setError("");
    }
  };

  const calculateResults = () => {
    // Calculate profile scores based on answers
    const scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0 };
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      // Add 1 to the profile score for each answer
      scores[answer as keyof typeof scores] += 1;
    });
    
    setProfileScores(scores);
    
    // Find top 3 profiles
    const sortedProfiles = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
    
    // Match schools based on profile
    let matches = schoolsData.filter(school => {
      const matchingProfiles = school.profiles.filter(profile => 
        sortedProfiles.includes(profile)
      );
      return matchingProfiles.length > 0;
    });
    
    // Sort by match strength (number of matching profiles)
    matches.sort((a, b) => {
      const aMatches = a.profiles.filter(profile => sortedProfiles.includes(profile)).length;
      const bMatches = b.profiles.filter(profile => sortedProfiles.includes(profile)).length;
      return bMatches - aMatches;
    });
    
    setMatchedSchools(matches.slice(0, 5));
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setMatchedSchools([]);
    setError("");
    setProfileScores({ A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0 });
  };

  const getProfileDescription = (profile: string) => {
    const descriptions: Record<string, string> = {
      A: "Vetenskaplig och analytisk",
      B: "Kreativ och konstnärlig",
      C: "Praktisk och handlingskraftig",
      D: "Kommunikativ och samhällsengagerad",
      E: "Teknisk och problemlösande",
      F: "Omvårdande och människoorienterad",
      G: "Entreprenöriell och affärsdriven",
      H: "Aktiv och fysisk"
    };
    
    return descriptions[profile] || profile;
  };

  const calculateMatchPercentage = (school: SchoolProgram) => {
    // Find top 3 profiles
    const sortedProfiles = Object.entries(profileScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
    
    const matchingProfiles = school.profiles.filter(profile => 
      sortedProfiles.includes(profile)
    );
    
    // Calculate percentage based on matching profiles (up to 3)
    return Math.round((matchingProfiles.length / 3) * 100);
  };

  return (
    <div className="max-w-3xl mx-auto p-4" id="quiz">
      {!showResults ? (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6 flex items-center gap-3">
            <PlayCircle size={28} className="text-guidance-blue" />
            <h2 className="text-2xl font-bold text-guidance-blue">
              Gymnasievägledningsquiz
            </h2>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">
                Fråga {currentQuestion + 1}/{quizQuestions.length}
              </h3>
              <span className="text-sm text-guidance-blue font-medium">
                Välj ett alternativ
              </span>
            </div>
            
            <p className="text-lg mb-4">
              {quizQuestions[currentQuestion].question}
            </p>
            
            <RadioGroup
              value={answers[quizQuestions[currentQuestion].id] || ""}
              onValueChange={(value) => handleOptionSelect(quizQuestions[currentQuestion].id, value)}
              className="space-y-2"
            >
              {quizQuestions[currentQuestion].options.map(option => (
                <Card 
                  key={option.id} 
                  className={`cursor-pointer transition-all ${
                    isOptionSelected(quizQuestions[currentQuestion].id, option.value)
                      ? 'border-2 border-guidance-blue bg-guidance-blue/5'
                      : 'hover:border-guidance-blue/50'
                  }`}
                  onClick={() => handleOptionSelect(quizQuestions[currentQuestion].id, option.value)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <RadioGroupItem 
                      value={option.value} 
                      id={option.id}
                      checked={isOptionSelected(quizQuestions[currentQuestion].id, option.value)}
                    />
                    <Label 
                      htmlFor={option.id} 
                      className="cursor-pointer flex-1"
                    >
                      {option.text}
                    </Label>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
            
            {error && (
              <p className="text-red-500 mt-3">{error}</p>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Föregående
            </Button>
            <Button
              className="bg-guidance-green hover:bg-guidance-green/90"
              onClick={handleNextQuestion}
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Visa resultat' : 'Nästa'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-guidance-blue mb-2">
              Dina rekommenderade gymnasieskolor
            </h2>
            <p className="text-gray-600">
              Baserat på dina svar, här är gymnasieprogrammen som passar dig bäst:
            </p>
          </div>

          <div className="mb-6 p-4 bg-guidance-blue/10 rounded-lg">
            <h3 className="font-semibold mb-2">Din personlighetsprofil:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(profileScores)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([profile, score], index) => (
                  <div 
                    key={profile} 
                    className={`p-2 rounded-md text-center ${
                      index === 0 
                        ? 'bg-guidance-green/20 border border-guidance-green' 
                        : 'bg-guidance-blue/10'
                    }`}
                  >
                    <span className="font-bold block">{getProfileDescription(profile)}</span>
                    <span className="text-sm">{score} poäng</span>
                  </div>
                ))
              }
            </div>
          </div>
          
          {matchedSchools.length > 0 ? (
            <div className="space-y-4 mb-8">
              {matchedSchools.map((school, index) => {
                const matchPercentage = calculateMatchPercentage(school);
                return (
                  <Collapsible key={index}>
                    <Card className="border-guidance-blue/20 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <CollapsibleTrigger className="w-full text-left flex justify-between items-center">
                          <div>
                            <h3 className="font-bold text-lg">{index + 1}. {school.school}</h3>
                            <p className="text-guidance-blue">{school.program}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="bg-guidance-blue/10 px-2 py-1 rounded-full text-guidance-blue font-medium">
                              {matchPercentage}% match
                            </span>
                            <span className="text-gray-400 text-sm">Mer info</span>
                          </div>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent className="mt-4 pt-4 border-t">
                          {school.points && (
                            <p className="mb-2">
                              <span className="font-medium">Antagningspoäng:</span> {school.points}
                            </p>
                          )}
                          <p className="mb-2">
                            <span className="font-medium">Inriktning:</span> {school.category.join(', ')}
                          </p>
                          <p className="mb-2">
                            <span className="font-medium">Passar dig som är:</span> {
                              school.profiles.slice(0, 3).map(p => getProfileDescription(p)).join(', ')
                            }
                          </p>
                          
                          <div className="mt-3">
                            <p className="mb-1 font-medium">Match med din profil:</p>
                            <div className="flex items-center gap-2">
                              <Progress value={matchPercentage} className="h-2 flex-1" />
                              <span className="text-sm font-medium">{matchPercentage}%</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button 
                              asChild
                              variant="outline" 
                              className="flex items-center gap-1 text-guidance-blue"
                            >
                              <Link to="/career-map">
                                <MapPin className="h-4 w-4" />
                                Se mer information
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </CollapsibleContent>
                      </CardContent>
                    </Card>
                  </Collapsible>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Vi hittade inga perfekta matchningar baserat på dina svar.
                Försök gärna igen med andra val eller kontakta en studie- och yrkesvägledare.
              </p>
            </div>
          )}
          
          <div className="flex justify-between">
            <Button 
              variant="outline"
              onClick={restartQuiz}
            >
              Gör om quizet
            </Button>
            <div className="flex gap-3">
              <Button 
                asChild
                className="bg-guidance-blue hover:bg-guidance-blue/90"
              >
                <Link to="/career-map" className="flex items-center gap-2">
                  Utforska karriärkartan
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                className="bg-guidance-purple hover:bg-guidance-purple/90"
                onClick={() => {
                  window.location.href = "/booking";
                }}
              >
                Boka samtal med SYV
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidanceQuiz;
