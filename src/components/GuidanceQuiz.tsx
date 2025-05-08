
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PlayCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  type: 'single' | 'multiple';
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
}

// Schools data from the provided list
const schoolsData: SchoolProgram[] = [
  { 
    school: "Amerikanska Gymnasiet", 
    program: "Ekonomiprogrammet", 
    points: "205,50 - 238,33",
    category: ["ekonomi", "business", "företagande", "samhälle"]
  },
  { 
    school: "Amerikanska Gymnasiet", 
    program: "Naturvetenskapsprogrammet", 
    points: "245,00 - 280,16",
    category: ["natur", "matematik", "vetenskap", "forskning"]
  },
  { 
    school: "Amerikanska Gymnasiet", 
    program: "Samhällsvetenskapsprogrammet", 
    points: "208,00 - 235,80",
    category: ["samhälle", "språk", "historia", "politik"]
  },
  { 
    school: "Amerikanska Gymnasiet", 
    program: "Teknikprogrammet", 
    points: "220,50 - 248,25",
    category: ["teknik", "programmering", "design", "innovation"]
  },
  { 
    school: "Angeredsgymnasiet", 
    program: "Ekonomiprogrammet", 
    category: ["ekonomi", "business", "företagande", "samhälle"]
  },
  { 
    school: "Angeredsgymnasiet", 
    program: "Vård- och omsorgsprogrammet", 
    category: ["vård", "omsorg", "människor", "hjälpa"]
  },
  { 
    school: "Burgårdens gymnasium", 
    program: "Barn- och fritidsprogrammet", 
    category: ["barn", "pedagogik", "rörelse", "ledarskap"]
  },
  { 
    school: "Burgårdens gymnasium", 
    program: "Naturbruksprogrammet - Djurvård", 
    category: ["djur", "natur", "biologi", "friluftsliv"]
  },
  { 
    school: "Drottning Blankas Gymnasieskola", 
    program: "Frisör- och stylistprogrammet", 
    category: ["estetik", "design", "mode", "kreativitet"]
  },
  { 
    school: "Ester Mosessons gymnasium", 
    program: "Restaurang- och livsmedelsprogrammet", 
    category: ["mat", "livsmedel", "kreativitet", "service"]
  },
  { 
    school: "GTG", 
    program: "Teknikprogrammet", 
    points: "225,50 - 258,55",
    category: ["teknik", "programmering", "design", "innovation"]
  },
  { 
    school: "Hvitfeldtska gymnasiet", 
    program: "Estetiska programmet - Musik", 
    category: ["musik", "estetik", "konst", "kreativitet"]
  },
  { 
    school: "L M Engström gymnasium", 
    program: "Naturvetenskapsprogrammet", 
    points: "308,00 - 323,75",
    category: ["natur", "matematik", "vetenskap", "forskning"]
  },
  { 
    school: "Praktiska Gymnasiet Göteborg", 
    program: "Bygg- och anläggningsprogrammet", 
    category: ["bygg", "hantverk", "praktisk", "konstruktion"]
  },
  { 
    school: "Realgymnasiet Göteborg", 
    program: "Naturbruksprogrammet - Hästhållning", 
    points: "233,00 - 259,60",
    category: ["djur", "häst", "natur", "friluftsliv"]
  },
  { 
    school: "Rytmus Göteborg", 
    program: "Estetiska programmet - Musik", 
    category: ["musik", "estetik", "konst", "kreativitet"]
  },
  { 
    school: "Schillerska gymnasiet", 
    program: "Estetiska programmet - Bild och formgivning", 
    category: ["konst", "design", "estetik", "kreativitet"]
  },
  { 
    school: "Yrkesgymnasiet", 
    program: "Fordons- och transportprogrammet", 
    category: ["fordon", "teknik", "praktisk", "mekanik"]
  }
];

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Vad är du mest intresserad av?",
    type: 'multiple',
    options: [
      { id: "1a", text: "Teknik och programmering", value: "teknik" },
      { id: "1b", text: "Ekonomi och företagande", value: "ekonomi" },
      { id: "1c", text: "Konst, musik eller design", value: "estetik" },
      { id: "1d", text: "Människor och samhälle", value: "samhälle" },
      { id: "1e", text: "Natur och djur", value: "natur" },
      { id: "1f", text: "Praktiskt arbete och hantverk", value: "praktisk" }
    ]
  },
  {
    id: 2,
    question: "Hur vill du helst lära dig saker?",
    type: 'single',
    options: [
      { id: "2a", text: "Genom att läsa och skriva", value: "teoretisk" },
      { id: "2b", text: "Genom att göra praktiska övningar", value: "praktisk" },
      { id: "2c", text: "Genom diskussioner och grupparbeten", value: "samarbete" },
      { id: "2d", text: "Genom att experimentera och testa", value: "utforskande" }
    ]
  },
  {
    id: 3,
    question: "Vad ser du dig själv göra efter gymnasiet?",
    type: 'single',
    options: [
      { id: "3a", text: "Studera på universitet eller högskola", value: "högskolestudier" },
      { id: "3b", text: "Börja jobba direkt", value: "jobb" },
      { id: "3c", text: "Starta eget företag", value: "företag" },
      { id: "3d", text: "Jag är osäker, vill hålla många dörrar öppna", value: "flexibel" }
    ]
  },
  {
    id: 4,
    question: "Vilka skolämnen tycker du bäst om?",
    type: 'multiple',
    options: [
      { id: "4a", text: "Matematik och naturvetenskap", value: "matte" },
      { id: "4b", text: "Språk och humaniora", value: "språk" },
      { id: "4c", text: "Idrott och hälsa", value: "idrott" },
      { id: "4d", text: "Estetiska ämnen (bild, musik, slöjd)", value: "estetik" },
      { id: "4e", text: "Samhällskunskap och historia", value: "samhälle" },
      { id: "4f", text: "Teknik och programmering", value: "teknik" }
    ]
  },
  {
    id: 5,
    question: "Hur viktigt är det för dig med höga betyg?",
    type: 'single',
    options: [
      { id: "5a", text: "Mycket viktigt", value: "höga" },
      { id: "5b", text: "Ganska viktigt", value: "medel" },
      { id: "5c", text: "Inte så viktigt", value: "låga" },
      { id: "5d", text: "Jag vill bara klara kurserna", value: "godkänt" }
    ]
  }
];

const GuidanceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [matchedSchools, setMatchedSchools] = useState<SchoolProgram[]>([]);
  const [userName, setUserName] = useState("");
  const [grades, setGrades] = useState("");
  const [error, setError] = useState("");

  const handleOptionSelect = (questionId: number, optionValue: string) => {
    const currentAnswers = answers[questionId] || [];
    
    if (quizQuestions[currentQuestion].type === 'single') {
      setAnswers({
        ...answers,
        [questionId]: [optionValue]
      });
    } else {
      // Multiple selection
      if (currentAnswers.includes(optionValue)) {
        setAnswers({
          ...answers,
          [questionId]: currentAnswers.filter(value => value !== optionValue)
        });
      } else {
        setAnswers({
          ...answers,
          [questionId]: [...currentAnswers, optionValue]
        });
      }
    }
  };

  const isOptionSelected = (questionId: number, optionValue: string) => {
    return (answers[questionId] || []).includes(optionValue);
  };

  const handleNextQuestion = () => {
    if (!answers[quizQuestions[currentQuestion].id] || 
        answers[quizQuestions[currentQuestion].id].length === 0) {
      setError("Välj minst ett alternativ för att fortsätta");
      return;
    }
    
    setError("");
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Last question completed
      if (!userName.trim()) {
        setError("Ange ditt namn innan du fortsätter");
        return;
      }
      
      // Calculate results
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
    // Get all selected interest values
    const interests: string[] = [];
    Object.values(answers).forEach(answerArray => {
      answerArray.forEach(answer => {
        if (!interests.includes(answer)) {
          interests.push(answer);
        }
      });
    });
    
    // Match interests to schools
    let matches = schoolsData.filter(school => {
      return school.category.some(cat => interests.includes(cat));
    });
    
    // If we have grade information, filter further
    if (grades) {
      const numericGrade = parseFloat(grades.replace(',', '.'));
      
      matches = matches.filter(school => {
        if (!school.points) return true;
        
        // Extract the lower limit from the points range
        const lowerLimit = parseFloat(school.points.split(' - ')[0].replace(',', '.'));
        
        // If student's grade is higher than the school's lower limit, include it
        return !lowerLimit || numericGrade >= lowerLimit;
      });
    }
    
    // Sort by match strength (number of matching categories)
    matches.sort((a, b) => {
      const aMatches = a.category.filter(cat => interests.includes(cat)).length;
      const bMatches = b.category.filter(cat => interests.includes(cat)).length;
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
          
          {currentQuestion === quizQuestions.length - 1 && (
            <div className="mb-6">
              <Label htmlFor="userName" className="block mb-2">Ditt namn</Label>
              <Input 
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Ange ditt namn"
                className="w-full"
              />
              
              <Label htmlFor="grades" className="block mt-4 mb-2">Ditt meritvärde (valfritt)</Label>
              <Input 
                id="grades"
                value={grades}
                onChange={(e) => setGrades(e.target.value)}
                placeholder="T.ex. 250,5"
                className="w-full"
              />
            </div>
          )}
          
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">
              Fråga {currentQuestion + 1}/{quizQuestions.length}: {quizQuestions[currentQuestion].question}
            </h3>
            
            <div className="space-y-3">
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
                  <CardContent className="p-4 flex items-start gap-3">
                    <Checkbox 
                      checked={isOptionSelected(quizQuestions[currentQuestion].id, option.value)}
                      onCheckedChange={() => handleOptionSelect(quizQuestions[currentQuestion].id, option.value)}
                    />
                    <span className="text-base">{option.text}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            
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
              Baserat på dina svar, {userName}, här är gymnasieprogrammen som passar dig bäst:
            </p>
          </div>
          
          {matchedSchools.length > 0 ? (
            <div className="space-y-4 mb-8">
              {matchedSchools.map((school, index) => (
                <Collapsible key={index}>
                  <Card className="border-guidance-blue/20 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <CollapsibleTrigger className="w-full text-left flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-lg">{index + 1}. {school.school}</h3>
                          <p className="text-guidance-blue">{school.program}</p>
                        </div>
                        <span className="text-gray-400 text-sm">Mer info</span>
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
                        <p className="text-sm text-gray-600 mt-4">
                          Kontakta skolan för mer information om programmet och antagningskrav.
                        </p>
                      </CollapsibleContent>
                    </CardContent>
                  </Card>
                </Collapsible>
              ))}
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
      )}
    </div>
  );
};

export default GuidanceQuiz;
