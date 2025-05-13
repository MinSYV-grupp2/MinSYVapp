
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import TreeDiagram from '@/components/TreeDiagram';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { 
  Heart, 
  Info, 
  GraduationCap, 
  School, 
  BookOpen, 
  Map, 
  Star, 
  Calendar,
  FileText,
  Search,
  SplitSquareVertical
} from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Extended program data with more detailed information
const programData = [
  {
    id: 'tech',
    name: 'Teknikprogrammet',
    description: 'Fokuserar på matematik, fysik, kemi och teknologi. Förbereder för ingenjörsstudier och tekniska yrken.',
    meritDescription: 'Ger särskild behörighet till tekniska utbildningar på högskola/universitet. Meriten ligger på 1.0 för relevanta tekniska utbildningar.',
    educationDescription: 'Programmet omfattar 2500 gymnasiepoäng med fokus på tekniska och naturvetenskapliga ämnen.',
    specializations: [
      'Informations- och medieteknik', 
      'Produktionsteknik', 
      'Design och produktutveckling', 
      'Samhällsbyggande och miljö',
      'Teknikvetenskap'
    ],
    requiredCourses: [
      'Matematik 1c, 2c, 3c',
      'Fysik 1a',
      'Kemi 1',
      'Teknik 1',
      'Programmering 1'
    ],
    recommendedCourses: [
      'Matematik 4',
      'Fysik 2',
      'CAD 1, 2',
      'Programmering 2'
    ],
    furtherEducation: [
      {
        name: 'Civilingenjörsutbildning',
        meritRequirements: 'Matematik 4, Fysik 2',
        description: '5-årig utbildning, 300 hp'
      },
      {
        name: 'Högskoleingenjörsutbildning',
        meritRequirements: 'Matematik 3c, Fysik 2',
        description: '3-årig utbildning, 180 hp'
      },
      {
        name: 'Arkitektutbildning',
        meritRequirements: 'Matematik 3c, antagningsprov',
        description: '5-årig utbildning, 300 hp'
      }
    ],
    careers: ['Civilingenjör', 'Programmerare', 'Arkitekt', 'Produktutvecklare', 'Systemutvecklare', 'IT-konsult'],
    universities: ['KTH', 'Chalmers', 'Linköpings Universitet', 'Lunds Universitet', 'Uppsala Universitet'],
    subjects: ['Matematik', 'Fysik', 'Programmering', 'Teknik', 'CAD', 'Kemi'],
    merit: '1.0'
  },
  {
    id: 'science',
    name: 'Naturvetenskapsprogrammet',
    description: 'Fokuserar på biologi, fysik, kemi och matematik. Förbereder för vidare studier inom naturvetenskap och medicin.',
    meritDescription: 'Ger särskild behörighet till medicin- och naturvetenskapliga utbildningar. Meriten ligger på 1.0 för medicinska och naturvetenskapliga utbildningar.',
    educationDescription: 'Programmet omfattar 2500 gymnasiepoäng med fokus på biologi, kemi, fysik och matematik.',
    specializations: [
      'Naturvetenskap', 
      'Naturvetenskap och samhälle'
    ],
    requiredCourses: [
      'Matematik 1c, 2c, 3c',
      'Fysik 1a, 2',
      'Kemi 1, 2',
      'Biologi 1, 2'
    ],
    recommendedCourses: [
      'Matematik 4',
      'Matematik 5',
      'Bioteknik'
    ],
    furtherEducation: [
      {
        name: 'Läkarutbildning',
        meritRequirements: 'Matematik 4, Kemi 2, Biologi 2',
        description: '5,5-årig utbildning, 330 hp'
      },
      {
        name: 'Biomedicinsk analytiker',
        meritRequirements: 'Matematik 3c, Kemi 2, Biologi 2',
        description: '3-årig utbildning, 180 hp'
      },
      {
        name: 'Civilingenjör Bioteknik',
        meritRequirements: 'Matematik 4, Kemi 2, Biologi 1',
        description: '5-årig utbildning, 300 hp'
      }
    ],
    careers: ['Läkare', 'Veterinär', 'Forskare', 'Apotekare', 'Biomedicinsk analytiker', 'Tandläkare', 'Sjuksköterska'],
    universities: ['Karolinska Institutet', 'Uppsala Universitet', 'Lunds Universitet', 'Göteborgs Universitet', 'Umeå Universitet'],
    subjects: ['Biologi', 'Kemi', 'Fysik', 'Matematik'],
    merit: '1.0'
  },
  {
    id: 'social',
    name: 'Samhällsvetenskapsprogrammet',
    description: 'Fokuserar på samhällskunskap, historia, psykologi och språk. Förbereder för studier inom samhällsvetenskap och humaniora.',
    meritDescription: 'Ger behörighet till de flesta samhällsvetenskapliga och humanistiska utbildningar. Meriten kan ligga på 0.5 för vissa specialutbildningar.',
    educationDescription: 'Programmet omfattar 2500 gymnasiepoäng med fokus på samhälle, beteende och språk.',
    specializations: [
      'Beteendevetenskap',
      'Samhällsvetenskap',
      'Medier, information och kommunikation'
    ],
    requiredCourses: [
      'Matematik 1b, 2b',
      'Samhällskunskap 1b, 2',
      'Historia 1b, 2a',
      'Psykologi 1'
    ],
    recommendedCourses: [
      'Matematik 3b',
      'Filosofi 1',
      'Psykologi 2a',
      'Moderna språk'
    ],
    furtherEducation: [
      {
        name: 'Juristprogrammet',
        meritRequirements: 'Historia 1b, Samhällskunskap 1b',
        description: '4,5-årig utbildning, 270 hp'
      },
      {
        name: 'Psykologprogrammet',
        meritRequirements: 'Matematik 2b, Samhällskunskap 1b',
        description: '5-årig utbildning, 300 hp'
      },
      {
        name: 'Socionomprogrammet',
        meritRequirements: 'Matematik 2b, Samhällskunskap 1b',
        description: '3,5-årig utbildning, 210 hp'
      }
    ],
    careers: ['Jurist', 'Psykolog', 'Socionom', 'Journalist', 'Statsvetare', 'HR-specialist', 'Polis'],
    universities: ['Stockholms Universitet', 'Göteborgs Universitet', 'Lunds Universitet', 'Uppsala Universitet'],
    subjects: ['Samhällskunskap', 'Historia', 'Psykologi', 'Svenska', 'Moderna språk'],
    merit: '0.5'
  },
  {
    id: 'business',
    name: 'Ekonomiprogrammet',
    description: 'Fokuserar på företagsekonomi, juridik och matematik. Förbereder för studier inom ekonomi och handel.',
    meritDescription: 'Ger särskild behörighet till ekonomiska utbildningar. Meriten kan vara upp till 0.5 för vissa ekonomiutbildningar.',
    educationDescription: 'Programmet omfattar 2500 gymnasiepoäng med fokus på företagsekonomi, nationalekonomi och juridik.',
    specializations: [
      'Ekonomi',
      'Juridik'
    ],
    requiredCourses: [
      'Matematik 1b, 2b',
      'Företagsekonomi 1, 2',
      'Privatjuridik',
      'Samhällskunskap 1b, 2'
    ],
    recommendedCourses: [
      'Matematik 3b',
      'Marknadsföring',
      'Affärsjuridik',
      'Moderna språk'
    ],
    furtherEducation: [
      {
        name: 'Civilekonomprogram',
        meritRequirements: 'Matematik 3b, Företagsekonomi 1',
        description: '4-årig utbildning, 240 hp'
      },
      {
        name: 'Ekonomikandidat',
        meritRequirements: 'Matematik 3b',
        description: '3-årig utbildning, 180 hp'
      },
      {
        name: 'Internationella relationer',
        meritRequirements: 'Moderna språk steg 3, Samhällskunskap 2',
        description: '3-årig utbildning, 180 hp'
      }
    ],
    careers: ['Ekonom', 'Marknadsförare', 'Revisor', 'Entreprenör', 'Säljare', 'Finansanalytiker', 'Controller'],
    universities: ['Handelshögskolan', 'Lunds Universitet', 'Uppsala Universitet', 'Stockholms Universitet'],
    subjects: ['Företagsekonomi', 'Juridik', 'Matematik', 'Entreprenörskap', 'Samhällskunskap'],
    merit: '0.5'
  },
  {
    id: 'arts',
    name: 'Estetiska programmet',
    description: 'Fokuserar på kreativa ämnen som bild, musik, teater och design. Förbereder för konstnärliga utbildningar.',
    meritDescription: 'Ger grundläggande behörighet för högre studier. För konstnärliga utbildningar kan arbetsprover vara avgörande utöver betyg.',
    educationDescription: 'Programmet omfattar 2500 gymnasiepoäng med fokus på estetiska uttrycksformer.',
    specializations: [
      'Bild och formgivning',
      'Dans',
      'Musik',
      'Teater'
    ],
    requiredCourses: [
      'Matematik 1b',
      'Estetisk kommunikation 1',
      'Konstarterna och samhället'
    ],
    recommendedCourses: [
      'Matematik 2b (för vidare studier)',
      'Engelska 7 (för vidare studier)',
      'Individuella estetiska kurser'
    ],
    furtherEducation: [
      {
        name: 'Konsthögskola',
        meritRequirements: 'Arbetsprover, antagningsprov',
        description: '3–5-årig utbildning'
      },
      {
        name: 'Musikhögskola',
        meritRequirements: 'Antagningsprov',
        description: '3–5-årig utbildning'
      },
      {
        name: 'Designutbildning',
        meritRequirements: 'Arbetsprover',
        description: '3-årig utbildning, 180 hp'
      }
    ],
    careers: ['Konstnär', 'Musiker', 'Skådespelare', 'Designer', 'Art Director', 'Fotograf', 'Speldesigner'],
    universities: ['Konstfack', 'Musikhögskolan', 'Teaterhögskolan', 'Beckmans designhögskola'],
    subjects: ['Konst', 'Musik', 'Teater', 'Design', 'Estetisk kommunikation'],
    merit: '0.0'
  },
  {
    id: 'el',
    name: 'El- och energiprogrammet',
    description: 'Fokuserar på elteknik, automation och energiteknik. Förbereder för arbete inom el-, energi- och automationsbranschen.',
    meritDescription: 'Ger grundläggande behörighet för yrkeshögskola och högskola med relevanta kompletteringskurser.',
    educationDescription: 'Programmet omfattar 2500 gymnasiepoäng med fokus på praktiska och teoretiska kurser inom el och energi.',
    specializations: [
      'Automation',
      'Dator- och kommunikationsteknik',
      'Elteknik',
      'Energiteknik'
    ],
    requiredCourses: [
      'Matematik 1a',
      'Elektroteknik',
      'Energiteknik 1',
      'Mekatronik 1'
    ],
    recommendedCourses: [
      'Matematik 2a (för vidare studier)',
      'Engelska 6 (för vidare studier)',
      'Programmerbara styrsystem'
    ],
    furtherEducation: [
      {
        name: 'Elkraftsingenjör (YH)',
        meritRequirements: 'Relevanta kurser inom elteknik',
        description: '2-årig utbildning, 400 YH-poäng'
      },
      {
        name: 'Automationsingenjör (YH)',
        meritRequirements: 'Relevanta kurser inom automation',
        description: '2-årig utbildning, 400 YH-poäng'
      },
      {
        name: 'Högskoleingenjör Elektroteknik',
        meritRequirements: 'Matematik 3c, Fysik 2',
        description: '3-årig utbildning, 180 hp (kräver komplettering)'
      }
    ],
    careers: ['Elektriker', 'Automationstekniker', 'Servicetekniker', 'Nätverkstekniker', 'Drifttekniker'],
    universities: ['Diverse YH-utbildningar', 'Tekniska högskolor (med komplettering)'],
    subjects: ['Elteknik', 'Automation', 'Energiteknik', 'Elektronik', 'Installationsteknik'],
    merit: '0.0'
  },
  {
    id: 'vard',
    name: 'Vård- och omsorgsprogrammet',
    description: 'Fokuserar på hälso- och sjukvård, äldreomsorg och funktionshinderomsorg. Förbereder för arbete inom vård och omsorg.',
    meritDescription: 'Ger grundläggande behörighet för yrkeshögskola och högskola med relevanta kompletteringskurser.',
    educationDescription: 'Programmet omfattar 2500 gymnasiepoäng med fokus på teori och praktik inom vård och omsorg.',
    specializations: [
      'Hälso- och sjukvård',
      'Psykiatri',
      'Äldreomsorg',
      'Funktionshinderomsorg'
    ],
    requiredCourses: [
      'Matematik 1a',
      'Medicin 1',
      'Hälsopedagogik',
      'Omvårdnad 1, 2',
      'Psykiatri 1'
    ],
    recommendedCourses: [
      'Matematik 2a (för vidare studier)',
      'Naturkunskap 2 (för sjuksköterskeutbildning)',
      'Svenska 3/Svenska som andraspråk 3'
    ],
    furtherEducation: [
      {
        name: 'Sjuksköterskeprogrammet',
        meritRequirements: 'Matematik 2a, Naturkunskap 2',
        description: '3-årig utbildning, 180 hp (kräver komplettering)'
      },
      {
        name: 'Socionomprogram',
        meritRequirements: 'Matematik 2a, Samhällskunskap 1b',
        description: '3,5-årig utbildning, 210 hp (kräver komplettering)'
      },
      {
        name: 'Specialistundersköterska (YH)',
        meritRequirements: 'Fullständigt vård- och omsorgsprogram',
        description: '1–2-årig utbildning, 200–400 YH-poäng'
      }
    ],
    careers: ['Undersköterska', 'Personlig assistent', 'Skötare', 'Boendestödjare', 'Vårdbiträde'],
    universities: ['Diverse YH-utbildningar', 'Sjuksköterskeprogrammet (med komplettering)'],
    subjects: ['Omvårdnad', 'Medicin', 'Psykiatri', 'Hälsopedagogik', 'Etik'],
    merit: '0.0'
  }
];

// Extended school data with detailed information
const schoolsData = [
  {
    id: "angergymnasiet",
    name: "Angeredsgymnasiet",
    programs: ["tech", "science", "social"],
    location: {
      address: "Grepgatan 9, 424 65 Angered",
      coordinates: { lat: 57.7693, lng: 12.0165 },
      commute: "Spårvagn 4, 8, 9. Busslinje 141, 172"
    },
    admissionScores: {
      "tech": 240,
      "science": 255,
      "social": 220
    },
    statistics: {
      averageGrade: 14.2,
      completionRate: 86,
      qualifiedTeachers: 92,
      satisfactionRate: 83
    },
    reviews: [
      { rating: 4, comment: "Bra lärare som verkligen bryr sig om eleverna", aspect: "Lärare" },
      { rating: 3, comment: "Okej studiemiljö, kunde vara bättre", aspect: "Studiemiljö" },
      { rating: 5, comment: "Väldigt bra stöd för elever som behöver extra hjälp", aspect: "Elevstöd" }
    ],
    facilities: {
      canteen: "Nyligen renoverad matsal med bra mat",
      library: "Välutrustat bibliotek med studieplatser",
      sports: "Egen idrottshall och gym",
      labs: "Moderna labb för naturvetenskapliga ämnen"
    },
    extracurricular: [
      "Internationella utbyten med skolor i Tyskland och Spanien",
      "Robotics Club",
      "Debattklubb",
      "Skolband"
    ],
    events: [
      { name: "Öppet Hus", date: "2025-11-25", time: "17:00-19:00" },
      { name: "Informationskväll", date: "2026-01-15", time: "18:00-20:00" }
    ]
  },
  {
    id: "burgarden",
    name: "Burgårdens gymnasium",
    programs: ["business", "social", "arts", "vard"],
    location: {
      address: "Skånegatan 20, 412 51 Göteborg",
      coordinates: { lat: 57.6991, lng: 11.9865 },
      commute: "Spårvagn 2, 6, 8. Buss 60"
    },
    admissionScores: {
      "business": 235,
      "social": 220,
      "arts": 190,
      "vard": 185
    },
    statistics: {
      averageGrade: 14.8,
      completionRate: 89,
      qualifiedTeachers: 94,
      satisfactionRate: 86
    },
    reviews: [
      { rating: 4, comment: "Kreativ miljö med bra resurser för estetiska programmet", aspect: "Resurser" },
      { rating: 5, comment: "Engagerade lärare, särskilt inom ekonomiämnen", aspect: "Lärare" },
      { rating: 3, comment: "Maten kunde vara bättre", aspect: "Mat" }
    ],
    facilities: {
      canteen: "Stor matsal med varierad meny",
      library: "Välsorterat bibliotek",
      sports: "Tillgång till närliggande idrottsanläggningar",
      studios: "Moderna musikstudios och konstsalar för estetiska program"
    },
    extracurricular: [
      "UF-företag (Ung Företagsamhet)",
      "Teatergrupp",
      "Konstutställningar",
      "Mentorsprogram med lokala företag"
    ],
    events: [
      { name: "Öppet Hus", date: "2025-11-18", time: "17:00-19:00" },
      { name: "UF-mässa", date: "2026-02-10", time: "09:00-15:00" }
    ]
  },
  {
    id: "donner",
    name: "Donnergymnasiet",
    programs: ["tech", "science", "business"],
    location: {
      address: "Styrmansgatan 21, 417 65 Göteborg",
      coordinates: { lat: 57.7083, lng: 11.9399 },
      commute: "Buss 16, 58, 60"
    },
    admissionScores: {
      "tech": 250,
      "science": 270,
      "business": 245
    },
    statistics: {
      averageGrade: 15.8,
      completionRate: 92,
      qualifiedTeachers: 97,
      satisfactionRate: 91
    },
    reviews: [
      { rating: 5, comment: "Högkvalitativ undervisning i naturvetenskapliga ämnen", aspect: "Undervisningskvalitet" },
      { rating: 4, comment: "Bra gemenskap och trivsam stämning", aspect: "Skolmiljö" },
      { rating: 5, comment: "Utmärkta labb-resurser", aspect: "Resurser" }
    ],
    facilities: {
      canteen: "Högkvalitativ mat med många alternativ",
      library: "Stort bibliotek med många studieplatser",
      labs: "Toppmoderna labb för naturvetenskap och teknik",
      study: "Gott om grupprum och tysta läsplatser"
    },
    extracurricular: [
      "Vetenskapsklubb",
      "Programmeringsförening",
      "Mattecoaching",
      "Debattklubb"
    ],
    events: [
      { name: "Öppet Hus", date: "2025-11-22", time: "10:00-14:00" },
      { name: "Vetenskapsmässa", date: "2026-03-15", time: "13:00-17:00" }
    ]
  },
  {
    id: "hvitfeldtska",
    name: "Hvitfeldtska gymnasiet",
    programs: ["science", "social", "arts"],
    location: {
      address: "Rektorsgatan, 411 33 Göteborg",
      coordinates: { lat: 57.6992, lng: 11.9675 },
      commute: "Spårvagn 1, 2, 7. Buss 16, 19"
    },
    admissionScores: {
      "science": 280,
      "social": 255,
      "arts": 230
    },
    statistics: {
      averageGrade: 16.2,
      completionRate: 94,
      qualifiedTeachers: 98,
      satisfactionRate: 90
    },
    reviews: [
      { rating: 5, comment: "Anrik skola med hög nivå på undervisningen", aspect: "Undervisningskvalitet" },
      { rating: 4, comment: "Bra men krävande lärare", aspect: "Lärare" },
      { rating: 4, comment: "Fina lokaler i historisk byggnad", aspect: "Lokaler" }
    ],
    facilities: {
      canteen: "Stor ljus matsal med god mat",
      library: "Historiskt bibliotek med stort utbud",
      sports: "Välutrustad idrottshall och gym",
      aula: "Vacker aula för föreställningar"
    },
    extracurricular: [
      "Internationella utbyten",
      "Körer och orkestrar",
      "Filosofiska sällskapet",
      "Litteraturklubb"
    ],
    events: [
      { name: "Öppet Hus", date: "2025-11-15", time: "11:00-15:00" },
      { name: "Kulturkväll", date: "2026-02-25", time: "18:00-21:00" }
    ]
  },
  {
    id: "polhem",
    name: "Polhemsgymnasiet",
    programs: ["tech", "el", "business"],
    location: {
      address: "Gibraltargatan 68, 412 79 Göteborg",
      coordinates: { lat: 57.6881, lng: 11.9773 },
      commute: "Spårvagn 7, 10. Buss 58, 19"
    },
    admissionScores: {
      "tech": 255,
      "el": 210,
      "business": 240
    },
    statistics: {
      averageGrade: 15.3,
      completionRate: 90,
      qualifiedTeachers: 95,
      satisfactionRate: 88
    },
    reviews: [
      { rating: 5, comment: "Utmärkt teknisk utbildning med moderna resurser", aspect: "Utbildningskvalitet" },
      { rating: 4, comment: "Bra samarbete med näringslivet", aspect: "Arbetslivskontakt" },
      { rating: 4, comment: "Engagerade lärare med branscherfarenhet", aspect: "Lärare" }
    ],
    facilities: {
      canteen: "Nyligen uppdaterad matsal",
      labs: "Toppmoderna teknik- och ellabb",
      makerspace: "Innovationsverkstad med 3D-skrivare och annan modern utrustning",
      study: "Många grupprum för projektarbeten"
    },
    extracurricular: [
      "Robotics-förening",
      "IT-klubb",
      "Innovationstävlingar",
      "Företagssponsrade projekt"
    ],
    events: [
      { name: "Öppet Hus", date: "2025-11-29", time: "10:00-15:00" },
      { name: "Tech Demo Day", date: "2026-03-20", time: "13:00-17:00" }
    ]
  }
];

const CareerMap = () => {
  const { addSavedProgram } = useUser();
  const [selectedProgram, setSelectedProgram] = useState(programData[0]);
  const [viewMode, setViewMode] = useState<'programs' | 'compare' | 'tree'>('programs');
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [compareItems, setCompareItems] = useState<{
    schools: string[],
    programs: string[]
  }>({
    schools: [],
    programs: []
  });
  
  // Filter schools that offer the selected program
  const schoolsWithSelectedProgram = schoolsData.filter(
    school => school.programs.includes(selectedProgram.id)
  );
  
  // Get school by id
  const getSchoolById = (id: string) => {
    return schoolsData.find(school => school.id === id);
  };
  
  // Get program by id
  const getProgramById = (id: string) => {
    return programData.find(program => program.id === id);
  };
  
  const handleSaveProgram = (school?: string) => {
    const schoolName = school || selectedSchool || "Valfri skola";
    const programId = `${Date.now().toString()}-${selectedProgram.id}`;
    
    addSavedProgram({
      id: programId,
      programName: selectedProgram.name,
      schoolName: schoolName,
      specialization: undefined,
      merit: selectedProgram.merit
    });
    
    toast({
      title: "Program sparat",
      description: `${selectedProgram.name} på ${schoolName} har lagts till i din profil. Meritpoäng: ${selectedProgram.merit}`,
    });
  };
  
  const toggleCompareSchool = (schoolId: string) => {
    setCompareItems(prev => {
      if (prev.schools.includes(schoolId)) {
        return {
          ...prev,
          schools: prev.schools.filter(id => id !== schoolId)
        };
      } else {
        // Limit to max 3 schools for comparison
        if (prev.schools.length >= 3) {
          toast({
            title: "Max antal för jämförelse",
            description: "Du kan jämföra max 3 skolor samtidigt. Ta bort någon först.",
            variant: "destructive"
          });
          return prev;
        }
        return {
          ...prev,
          schools: [...prev.schools, schoolId]
        };
      }
    });
  };
  
  const toggleCompareProgram = (programId: string) => {
    setCompareItems(prev => {
      if (prev.programs.includes(programId)) {
        return {
          ...prev,
          programs: prev.programs.filter(id => id !== programId)
        };
      } else {
        // Limit to max 3 programs for comparison
        if (prev.programs.length >= 3) {
          toast({
            title: "Max antal för jämförelse",
            description: "Du kan jämföra max 3 program samtidigt. Ta bort någon först.",
            variant: "destructive"
          });
          return prev;
        }
        return {
          ...prev,
          programs: [...prev.programs, programId]
        };
      }
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-guidance-blue">Utforska gymnasieprogram och framtidsvägar</h2>
          <div className="space-x-2">
            <Button 
              variant={viewMode === 'programs' ? "default" : "outline"} 
              onClick={() => setViewMode('programs')}
              className={viewMode === 'programs' ? "bg-guidance-blue hover:bg-guidance-blue/90" : ""}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Program
            </Button>
            <Button 
              variant={viewMode === 'compare' ? "default" : "outline"} 
              onClick={() => setViewMode('compare')}
              className={viewMode === 'compare' ? "bg-guidance-blue hover:bg-guidance-blue/90" : ""}
            >
              <SplitSquareVertical className="mr-2 h-4 w-4" />
              Jämför
            </Button>
            <Button 
              variant={viewMode === 'tree' ? "default" : "outline"} 
              onClick={() => setViewMode('tree')}
              className={viewMode === 'tree' ? "bg-guidance-blue hover:bg-guidance-blue/90" : ""}
            >
              <FileText className="mr-2 h-4 w-4" />
              Karriärträd
            </Button>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          {viewMode === 'programs' && "Välj ett gymnasieprogram nedan för att se vad det innehåller, vilka behörigheter det ger och vilka skolor som erbjuder det."}
          {viewMode === 'compare' && "Jämför olika program och skolor sida vid sida för att hitta det som passar dig bäst."}
          {viewMode === 'tree' && "Utforska hur olika utbildningsvägar hänger ihop med olika karriärval genom ett interaktivt träd."}
        </p>
      </div>

      {viewMode === 'programs' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {programData.map((program) => (
              <Card 
                key={program.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${selectedProgram.id === program.id ? 'border-2 border-guidance-blue' : ''}`}
                onClick={() => setSelectedProgram(program)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{program.name}</h3>
                    <Heart 
                      className={`h-5 w-5 cursor-pointer ${selectedProgram.id === program.id ? 'text-guidance-blue' : 'text-gray-300'}`} 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveProgram();
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6 overflow-hidden">
                <Tabs defaultValue="info">
                  <TabsList className="w-full bg-guidance-lightBlue rounded-none">
                    <TabsTrigger value="info" className="flex-1">Programinfo</TabsTrigger>
                    <TabsTrigger value="courses" className="flex-1">Kurser</TabsTrigger>
                    <TabsTrigger value="further" className="flex-1">Vidare studier</TabsTrigger>
                    <TabsTrigger value="schools" className="flex-1">Skolor</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                      <h2 className="text-2xl font-bold text-guidance-blue mb-2 sm:mb-0">{selectedProgram.name}</h2>
                      <div className="flex items-center">
                        <span className="bg-guidance-purple/20 text-guidance-purple text-xs font-semibold px-2.5 py-1 rounded-full">
                          Meritpoäng: {selectedProgram.merit}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{selectedProgram.description}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2 text-guidance-blue">Inriktningar</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedProgram.specializations.map((spec, index) => (
                          <div key={index} className="bg-guidance-lightGreen/30 p-2 rounded flex items-center">
                            <div className="bg-guidance-green rounded-full p-1 mr-2">
                              <GraduationCap className="h-4 w-4 text-white" />
                            </div>
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-guidance-blue">Vanliga yrken</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProgram.careers.slice(0, 8).map((career, index) => (
                          <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {career}
                          </span>
                        ))}
                        {selectedProgram.careers.length > 8 && (
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            +{selectedProgram.careers.length - 8} fler
                          </span>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="courses" className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-guidance-blue">Kurser på programmet</h3>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-guidance-green mb-3 flex items-center">
                        <Star className="mr-2 h-5 w-5" />
                        Obligatoriska kurser
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedProgram.requiredCourses.map((course, index) => (
                          <li key={index} className="bg-guidance-lightGreen/20 p-3 rounded">
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-guidance-purple mb-3 flex items-center">
                        <Info className="mr-2 h-5 w-5" />
                        Rekommenderade kurser
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedProgram.recommendedCourses.map((course, index) => (
                          <li key={index} className="bg-guidance-lightPurple/20 p-3 rounded">
                            {course}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-6 bg-gray-50 p-4 rounded border border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Tips!</strong> Om du vill läsa vidare på högskola eller universitet, 
                          kan du behöva vissa specifika kurser. Prata med din SYV för att planera rätt!
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="further" className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-guidance-blue">
                      Vidare utbildning efter {selectedProgram.name}
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      {selectedProgram.furtherEducation.map((edu, index) => (
                        <Card key={index} className="border-l-4 border-indigo-400">
                          <CardContent className="p-4">
                            <h4 className="font-medium text-lg">{edu.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{edu.description}</p>
                            <div className="bg-indigo-50 p-2 rounded">
                              <p className="text-sm flex items-start">
                                <span className="bg-indigo-200 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <GraduationCap className="h-3 w-3 text-indigo-700" />
                                </span>
                                <span>
                                  <strong>Särskild behörighet:</strong> {edu.meritRequirements}
                                </span>
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="bg-guidance-lightPurple/30 p-4 rounded">
                      <h4 className="font-medium mb-2 text-guidance-purple flex items-center">
                        <School className="mr-2 h-5 w-5" />
                        Universitet och högskolor
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProgram.universities.map((uni, index) => (
                          <span key={index} className="bg-white px-3 py-1 rounded text-sm border border-guidance-purple/20">
                            {uni}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="schools" className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-guidance-blue">
                      Skolor som erbjuder {selectedProgram.name}
                    </h3>
                    
                    {schoolsWithSelectedProgram.length === 0 ? (
                      <p className="text-gray-600">Ingen skola i vår databas erbjuder detta program för tillfället.</p>
                    ) : (
                      <div className="space-y-4">
                        {schoolsWithSelectedProgram.map((school) => (
                          <Card 
                            key={school.id} 
                            className={`transition-all hover:shadow-md ${selectedSchool === school.id ? 'border-2 border-guidance-green' : ''}`}
                            onClick={() => setSelectedSchool(school.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-lg">{school.name}</h4>
                                <div className="space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleCompareSchool(school.id);
                                    }}
                                  >
                                    <SplitSquareVertical className="h-4 w-4 mr-1" />
                                    Jämför
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    className="bg-guidance-green hover:bg-guidance-green/90"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSaveProgram(school.name);
                                    }}
                                  >
                                    <Heart className="h-4 w-4 mr-1" />
                                    Spara
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500 mb-1">Antagningspoäng</p>
                                  <p className="font-medium">{school.admissionScores[selectedProgram.id as keyof typeof school.admissionScores]} meritpoäng</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500 mb-1">Adress</p>
                                  <p className="text-sm">{school.location.address}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500 mb-1">Kommunikationer</p>
                                  <p className="text-sm">{school.location.commute}</p>
                                </div>
                              </div>
                              
                              <div className="mt-3">
                                <p className="text-sm text-gray-500 mb-1">Betyg & omdömen</p>
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center">
                                    <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-guidance-green" 
                                        style={{width: `${school.statistics.satisfactionRate}%`}}
                                      />
                                    </div>
                                    <span className="ml-2 text-sm">{school.statistics.satisfactionRate}% nöjda elever</span>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-guidance-blue" 
                                        style={{width: `${(school.statistics.averageGrade / 20) * 100}%`}}
                                      />
                                    </div>
                                    <span className="ml-2 text-sm">{school.statistics.averageGrade} snittbetyg</span>
                                  </div>
                                </div>
                              </div>
                              
                              {school.events.length > 0 && (
                                <div className="mt-4 bg-guidance-lightBlue/20 p-2 rounded flex items-center">
                                  <Calendar className="h-4 w-4 text-guidance-blue mr-2" />
                                  <span className="text-sm">
                                    <strong>Nästa öppet hus:</strong> {school.events[0].date}, {school.events[0].time}
                                  </span>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-guidance-blue">
                    <Map className="mr-2 h-5 w-5" />
                    Upptäck din väg
                  </h3>
                  
                  <TreeDiagram 
                    program={selectedProgram.name}
                    specializations={selectedProgram.specializations} 
                    educationPaths={selectedProgram.furtherEducation.map(edu => edu.name)}
                    careers={selectedProgram.careers}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-guidance-blue">
                    <Search className="mr-2 h-5 w-5" />
                    Snabbfakta om {selectedProgram.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-guidance-green mb-2">Huvudämnen</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProgram.subjects.map((subject, index) => (
                          <span key={index} className="bg-guidance-lightGreen px-3 py-1 rounded-full text-sm">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-guidance-green mb-2">Meritpoäng för högskola</h4>
                      <p className="text-sm">{selectedProgram.meritDescription}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-guidance-green mb-2">Längd och omfattning</h4>
                      <p className="text-sm">{selectedProgram.educationDescription}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <Button 
                        className="w-full bg-guidance-purple hover:bg-guidance-purple/90" 
                        onClick={() => handleSaveProgram()}
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Spara program till Min profil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'compare' && (
        <div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-guidance-blue">Jämför program</h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {programData.map(program => (
                <button
                  key={program.id}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    compareItems.programs.includes(program.id)
                      ? 'bg-guidance-blue text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleCompareProgram(program.id)}
                >
                  {program.name}
                </button>
              ))}
            </div>
            
            {compareItems.programs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-3 bg-guidance-lightBlue/40">Program</th>
                      {compareItems.programs.map(programId => {
                        const program = getProgramById(programId);
                        return program ? (
                          <th key={programId} className="p-3 bg-guidance-lightBlue/40">
                            {program.name}
                          </th>
                        ) : null;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3 font-medium">Fokusområden</td>
                      {compareItems.programs.map(programId => {
                        const program = getProgramById(programId);
                        return program ? (
                          <td key={programId} className="border p-3">
                            {program.subjects.join(', ')}
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Meritpoäng</td>
                      {compareItems.programs.map(programId => {
                        const program = getProgramById(programId);
                        return program ? (
                          <td key={programId} className="border p-3">
                            {program.merit}
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Inriktningar</td>
                      {compareItems.programs.map(programId => {
                        const program = getProgramById(programId);
                        return program ? (
                          <td key={programId} className="border p-3">
                            <ul className="list-disc pl-4">
                              {program.specializations.map((spec, index) => (
                                <li key={index}>{spec}</li>
                              ))}
                            </ul>
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Obligatoriska kurser</td>
                      {compareItems.programs.map(programId => {
                        const program = getProgramById(programId);
                        return program ? (
                          <td key={programId} className="border p-3">
                            <ul className="list-disc pl-4">
                              {program.requiredCourses.slice(0, 5).map((course, index) => (
                                <li key={index}>{course}</li>
                              ))}
                              {program.requiredCourses.length > 5 && (
                                <li>+ {program.requiredCourses.length - 5} till</li>
                              )}
                            </ul>
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Möjliga yrken</td>
                      {compareItems.programs.map(programId => {
                        const program = getProgramById(programId);
                        return program ? (
                          <td key={programId} className="border p-3">
                            <ul className="list-disc pl-4">
                              {program.careers.slice(0, 5).map((career, index) => (
                                <li key={index}>{career}</li>
                              ))}
                              {program.careers.length > 5 && (
                                <li>+ {program.careers.length - 5} till</li>
                              )}
                            </ul>
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Vidare studier</td>
                      {compareItems.programs.map(programId => {
                        const program = getProgramById(programId);
                        return program ? (
                          <td key={programId} className="border p-3">
                            <ul className="list-disc pl-4">
                              {program.furtherEducation.map((edu, index) => (
                                <li key={index}>{edu.name}</li>
                              ))}
                            </ul>
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Skolor</td>
                      {compareItems.programs.map(programId => {
                        const program = getProgramById(programId);
                        const schoolsWithProgram = schoolsData.filter(
                          school => school.programs.includes(programId)
                        );
                        return program ? (
                          <td key={programId} className="border p-3">
                            <ul className="list-disc pl-4">
                              {schoolsWithProgram.map((school, index) => (
                                <li key={index}>{school.name}</li>
                              ))}
                            </ul>
                          </td>
                        ) : null;
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 text-center rounded-lg border border-gray-200">
                <p className="text-gray-500">Välj minst ett program ovan för att jämföra</p>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-guidance-blue">Jämför skolor</h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {schoolsData.map(school => (
                <button
                  key={school.id}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    compareItems.schools.includes(school.id)
                      ? 'bg-guidance-green text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleCompareSchool(school.id)}
                >
                  {school.name}
                </button>
              ))}
            </div>
            
            {compareItems.schools.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-3 bg-guidance-lightGreen/40">Skola</th>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <th key={schoolId} className="p-3 bg-guidance-lightGreen/40">
                            {school.name}
                          </th>
                        ) : null;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3 font-medium">Program</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="border p-3">
                            <ul className="list-disc pl-4">
                              {school.programs.map((programId) => {
                                const program = getProgramById(programId);
                                return program ? <li key={programId}>{program.name}</li> : null;
                              })}
                            </ul>
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Adress</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="border p-3">
                            {school.location.address}
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Kommunikationer</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="border p-3">
                            {school.location.commute}
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Antagningspoäng</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="border p-3">
                            <ul className="list-disc pl-4">
                              {Object.entries(school.admissionScores).map(([programId, score]) => {
                                const program = getProgramById(programId);
                                return program ? (
                                  <li key={programId}>{program.name}: {score}</li>
                                ) : null;
                              })}
                            </ul>
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Statistik</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="border p-3">
                            <ul className="list-disc pl-4">
                              <li>Snittbetyg: {school.statistics.averageGrade}</li>
                              <li>Fullföljd utbildning: {school.statistics.completionRate}%</li>
                              <li>Behöriga lärare: {school.statistics.qualifiedTeachers}%</li>
                              <li>Nöjda elever: {school.statistics.satisfactionRate}%</li>
                            </ul>
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Faciliteter</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="border p-3">
                            <ul className="list-disc pl-4">
                              {Object.entries(school.facilities).map(([key, value]) => (
                                <li key={key}>{value}</li>
                              ))}
                            </ul>
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Extracurricular</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="border p-3">
                            <ul className="list-disc pl-4">
                              {school.extracurricular.map((activity, index) => (
                                <li key={index}>{activity}</li>
                              ))}
                            </ul>
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium">Kommande event</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="border p-3">
                            <ul className="list-disc pl-4">
                              {school.events.map((event, index) => (
                                <li key={index}>
                                  {event.name}: {event.date}, {event.time}
                                </li>
                              ))}
                            </ul>
                          </td>
                        ) : null;
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 text-center rounded-lg border border-gray-200">
                <p className="text-gray-500">Välj minst en skola ovan för att jämföra</p>
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'tree' && (
        <div>
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
              {programData.map((program) => (
                <Card 
                  key={program.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedProgram.id === program.id ? 'border-2 border-guidance-blue' : ''}`}
                  onClick={() => setSelectedProgram(program)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium">{program.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-guidance-blue">Karriärträd för {selectedProgram.name}</h3>
            
            <Card>
              <CardContent className="p-6">
                <TreeDiagram 
                  program={selectedProgram.name}
                  specializations={selectedProgram.specializations} 
                  educationPaths={selectedProgram.furtherEducation.map(edu => edu.name)}
                  careers={selectedProgram.careers}
                />
                
                <div className="mt-6 p-4 bg-guidance-lightPurple/20 rounded">
                  <h4 className="font-medium mb-3 text-guidance-purple">Visste du?</h4>
                  <p className="text-sm text-gray-700">
                    Efter gymnasiet kan du välja att antingen läsa vidare eller börja jobba direkt. 
                    De flesta yrkesprogram förbereder dig för att jobba direkt efter studenten, 
                    medan högskoleförberedande program ger dig grundläggande behörighet till högskola och universitet.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerMap;

