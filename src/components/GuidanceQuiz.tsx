import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PlayCircle, MapPin, ExternalLink, School, BookOpen, Award, Users } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

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

// New interface for grouped program results
interface ProgramResult {
  program: string;
  matchPercentage: number;
  description: string;
  schools: {
    name: string;
    points?: string;
  }[];
}

const GuidanceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [matchedSchools, setMatchedSchools] = useState<SchoolProgram[]>([]);
  const [programResults, setProgramResults] = useState<ProgramResult[]>([]);
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
      
      toast.success("Quiz slutfört! Här är dina resultat!", {
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
    // Calculate profile scores based on answers with weighted values
    const scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0 };
    
    // Total number of questions answered to calculate percentages
    const totalQuestions = Object.keys(answers).length;
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      // Add weighted score - questions later in the quiz have slightly higher weight
      const questionIndex = parseInt(questionId);
      const weight = 1 + (questionIndex / 20); // Slight weight increase for later questions
      scores[answer as keyof typeof scores] += weight;
    });
    
    setProfileScores(scores);
    
    // Find top 3 profiles with weighted scoring
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
    
    // Calculate match strength with improved algorithm
    matches.forEach(school => {
      // Count matching profiles and their position in the sorted list
      let matchStrength = 0;
      school.profiles.forEach(profile => {
        const profileIndex = sortedProfiles.indexOf(profile);
        if (profileIndex !== -1) {
          // Give more weight to higher ranked profiles
          matchStrength += (3 - profileIndex) * 2;
        }
      });
      
      // Assign a custom property for sorting
      (school as any).matchStrength = matchStrength;
    });
    
    // Sort by match strength (highest first)
    matches.sort((a, b) => (b as any).matchStrength - (a as any).matchStrength);
    
    setMatchedSchools(matches);
    
    // Group results by program instead of school
    const programMap = new Map<string, ProgramResult>();
    
    matches.forEach(school => {
      if (!programMap.has(school.program)) {
        const matchPercentage = calculateMatchPercentage(school);
        
        programMap.set(school.program, {
          program: school.program,
          matchPercentage,
          description: getProgramDescription(school.program, school.category),
          schools: [{
            name: school.school,
            points: school.points
          }]
        });
      } else {
        const existing = programMap.get(school.program);
        if (existing) {
          existing.schools.push({
            name: school.school,
            points: school.points
          });
        }
      }
    });
    
    // Convert map to array and sort by match percentage
    const results = Array.from(programMap.values())
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    setProgramResults(results.slice(0, 5));  // Top 5 programs
  };
  
  const getProgramDescription = (program: string, categories: string[]): string => {
    const descriptions: Record<string, string> = {
      "Ekonomiprogrammet": "För dig som gillar siffror, affärer och samhällsfrågor! Du får lära dig om företag, ekonomi och hur samhället fungerar.",
      "Naturvetenskapsprogrammet": "För dig som gillar kemi, fysik och matte! Du får göra spännande experiment och lära dig hur världen fungerar.",
      "Samhällsvetenskapsprogrammet": "För dig som är intresserad av människor och samhälle! Du får lära dig om politik, psykologi och världsfrågor.",
      "Teknikprogrammet": "För dig som gillar att bygga, programmera och lösa problem! Du får arbeta med teknik, design och datorer.",
      "Estetiska programmet - Musik": "För dig som älskar musik! Du får spela instrument, sjunga och lära dig om musikskapande.",
      "Estetiska programmet - Bild och formgivning": "För dig som älskar att rita och skapa! Du får utveckla din kreativitet genom konst och design.",
      "Barn- och fritidsprogrammet": "För dig som tycker om att jobba med barn och unga! Du får lära dig om ledarskap och pedagogik.",
      "Vård- och omsorgsprogrammet": "För dig som vill hjälpa människor! Du lär dig ta hand om andra och kan jobba inom vård direkt efter studenten.",
      "Restaurang- och livsmedelsprogrammet": "För dig som gillar mat och matlagning! Du lär dig laga mat, baka och kan jobba i kök eller restaurang.",
      "Bygg- och anläggningsprogrammet": "För dig som vill bygga och skapa med händerna! Du lär dig byggteknik och kommer ut i arbete direkt.",
      "El- och energiprogrammet": "För dig som gillar el och teknik! Du lär dig om elinstallationer och kan börja jobba direkt efter gymnasiet.",
      "Fordons- och transportprogrammet": "För dig som gillar bilar och fordon! Du lär dig att laga och underhålla fordon och kan börja jobba direkt.",
      "Naturbruksprogrammet": "För dig som gillar djur och natur! Du får jobba med djur, växter eller skog och kan få jobb direkt efter gymnasiet."
    };
    
    // If program has a specific description, use it
    if (descriptions[program]) {
      return descriptions[program];
    }
    
    // Otherwise generate based on categories
    const catMap: Record<string, string> = {
      "ekonomi": "handel och ekonomi",
      "business": "företagande",
      "företagande": "ekonomi och affärer",
      "natur": "vetenskap och natur",
      "matematik": "matte och logiskt tänkande",
      "vetenskap": "forskning och upptäckter",
      "teknik": "tekniska lösningar",
      "programmering": "datorer och kodning",
      "design": "skapande och design",
      "musik": "musik och ljudproduktion",
      "estetik": "kreativt skapande",
      "konst": "konst och design",
      "samhälle": "samhällsfrågor",
      "politik": "politik och samhälle",
      "språk": "kommunikation",
      "barn": "arbete med barn och unga",
      "pedagogik": "lärande och undervisning",
      "vård": "att hjälpa andra människor",
      "omsorg": "omvårdnad och omsorg",
      "djur": "arbete med djur",
      "häst": "hästar och hästskötsel"
    };
    
    const catDescriptions = categories.map(cat => catMap[cat] || cat).slice(0, 3);
    let description = `För dig som är intresserad av ${catDescriptions.join(', ')}! `;
    description += "Detta program passar dina intressen och kan leda till spännande jobbmöjligheter.";
    
    return description;
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setMatchedSchools([]);
    setProgramResults([]);
    setError("");
    setProfileScores({ A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0 });
  };

  const getProfileDescription = (profile: string) => {
    const descriptions: Record<string, string> = {
      A: "Nyfiken utforskare",
      B: "Kreativ skapare",
      C: "Praktisk fixare",
      D: "Social kommunikatör",
      E: "Digital problemlösare",
      F: "Hjälpsam lagspelare",
      G: "Driven entreprenör",
      H: "Aktiv organisatör"
    };
    
    const detailDescriptions: Record<string, string> = {
      A: "Du gillar att undersöka hur saker fungerar och lösa kluriga problem.",
      B: "Du älskar att uttrycka dig kreativt och skapa nya saker.",
      C: "Du föredrar att jobba praktiskt och se konkreta resultat.",
      D: "Du är bra på att kommunicera och samarbeta med andra.",
      E: "Du gillar teknik och att hitta smarta lösningar med datorer.",
      F: "Du bryr dig om andra och vill göra skillnad i människors liv.",
      G: "Du har koll på läget och gillar att leda projekt.",
      H: "Du trivs med fysisk aktivitet och att jobba i team."
    };
    
    return {
      title: descriptions[profile] || profile,
      detail: detailDescriptions[profile] || ""
    };
  };

  const calculateMatchPercentage = (school: SchoolProgram) => {
    // Find top 3 profiles
    const sortedProfiles = Object.entries(profileScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
    
    // Calculate match with weighted values for better spread
    let matchScore = 0;
    let maxScore = 0;
    
    sortedProfiles.forEach((profile, index) => {
      // Higher ranked profiles have higher weight
      const weight = 3 - index;
      
      if (school.profiles.includes(profile)) {
        // Add weighted match points
        matchScore += weight * 2;
      }
      
      // Add to max possible score
      maxScore += weight * 2;
    });
    
    // Scale to get better spread between 50-100% instead of 0-100%
    // This makes the results more encouraging
    const rawPercentage = Math.round((matchScore / maxScore) * 100);
    return Math.min(100, Math.max(55, 55 + Math.floor(rawPercentage * 0.45)));
  };

  // New function to get badge color based on match percentage
  const getMatchBadgeColor = (percentage: number) => {
    if (percentage >= 85) return "bg-green-500 hover:bg-green-600";
    if (percentage >= 70) return "bg-blue-500 hover:bg-blue-600";
    return "bg-purple-500 hover:bg-purple-600";
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
          
          {/* Question section - keep existing code */}
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
        <div className="bg-gradient-to-br from-white to-guidance-lightBlue/20 rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-guidance-blue mb-2">
              Dina resultat!
            </h2>
            <p className="text-gray-700">
              Baserat på dina svar har vi hittat gymnasieprogram som verkar passa dig perfekt:
            </p>
          </div>

          {/* Personality Profile - redesigned for teenagers */}
          <div className="mb-8 p-5 bg-gradient-to-br from-guidance-lightBlue/30 to-guidance-lightBlue/10 rounded-lg border border-guidance-lightBlue/30">
            <h3 className="font-bold text-lg mb-3 text-guidance-blue">Din personlighetsprofil:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {Object.entries(profileScores)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([profile, score], index) => {
                  const profileDesc = getProfileDescription(profile);
                  return (
                    <div 
                      key={profile} 
                      className={`p-4 rounded-md text-center ${
                        index === 0 
                          ? 'bg-guidance-green/20 border border-guidance-green' 
                          : 'bg-guidance-blue/10'
                      }`}
                    >
                      <span className="font-bold block text-lg mb-1">{profileDesc.title}</span>
                      <span className="text-sm block mb-2">{profileDesc.detail}</span>
                      <div className="flex items-center justify-center gap-1 text-xs">
                        <Award className="h-4 w-4" />
                        <span>{Math.round((score / quizQuestions.length) * 100)}% matchning</span>
                      </div>
                    </div>
                  );
                })
              }
            </div>
            
            <p className="text-sm text-guidance-blue mt-3">
              Det här är dina främsta styrkor! De hjälper dig att hitta rätt gymnasieprogram.
            </p>
          </div>
          
          {/* Program Results - Now grouped by program first */}
          {programResults.length > 0 ? (
            <div>
              <h3 className="font-bold text-xl mb-4 text-guidance-purple">Rekommenderade program för dig:</h3>
              
              <div className="space-y-6 mb-8">
                {programResults.map((programResult, index) => (
                  <Card key={index} className="border-guidance-blue/20 overflow-hidden">
                    <div className={`h-2 ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row justify-between mb-3">
                        <div className="flex items-center gap-2 mb-2 md:mb-0">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-1 ${
                            index === 0 
                              ? 'bg-green-500 text-white' 
                              : index === 1 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-purple-500 text-white'
                          }`}>
                            <span className="font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{programResult.program}</h3>
                            <Badge 
                              className={`${getMatchBadgeColor(programResult.matchPercentage)} text-white mt-1`}
                            >
                              {programResult.matchPercentage}% matchning med din profil
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Button 
                            asChild
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1 text-guidance-blue"
                          >
                            <Link to="/career-map">
                              <MapPin className="h-4 w-4" />
                              Läs mer
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                      
                      {/* Program description */}
                      <div className="mb-4 text-gray-700">
                        <p>{programResult.description}</p>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Hur väl matchar programmet dig?</span>
                          <span className="font-bold">{programResult.matchPercentage}%</span>
                        </div>
                        <Progress 
                          value={programResult.matchPercentage} 
                          className="h-2"
                        />
                      </div>
                      
                      {/* Schools offering this program */}
                      <Collapsible className="mt-4 border-t pt-3">
                        <CollapsibleTrigger className="flex items-center gap-2 text-guidance-blue font-medium">
                          <School className="h-4 w-4" />
                          <span>Skolor som erbjuder detta program ({programResult.schools.length})</span>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent className="mt-3 pl-6 space-y-2">
                          {programResult.schools.map((school, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 last:border-0">
                              <span className="font-medium">{school.name}</span>
                              {school.points && (
                                <span className="text-sm text-gray-600">
                                  Antagningspoäng: {school.points}
                                </span>
                              )}
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-guidance-lightGreen/30 border border-guidance-green/30 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <BookOpen className="text-guidance-green h-5 w-5 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-guidance-green">Vad betyder detta?</h4>
                    <p className="text-sm mt-1">
                      Matchningen visar hur väl programmet passar dina intressen baserat på 
                      dina svar. Ju högre procent, desto bättre kan programmet passa dig! 
                      Men kom ihåg att detta bara är en vägledning - du väljer själv vad som känns rätt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Vi hittade inga perfekta matchningar baserat på dina svar.
                Försök gärna igen med andra val eller kontakta en studie- och yrkesvägledare.
              </p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <Button 
              variant="outline"
              onClick={restartQuiz}
              className="w-full sm:w-auto"
            >
              Gör om quizet
            </Button>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button 
                asChild
                className="bg-guidance-blue hover:bg-guidance-blue/90 flex-1 sm:flex-auto"
              >
                <Link to="/career-map" className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Utforska kartan
                </Link>
              </Button>
              <Button 
                asChild
                className="bg-guidance-purple hover:bg-guidance-purple/90 flex-1 sm:flex-auto"
              >
                <Link to="/booking" className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  Prata med SYV
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidanceQuiz;
