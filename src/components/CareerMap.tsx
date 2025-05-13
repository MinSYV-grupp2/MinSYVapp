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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {programData.map(program => (
              <Card 
                key={program.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${selectedProgram.id === program.id ? 'border-2 border-guidance-blue bg-guidance-lightBlue/20' : ''}`}
                onClick={() => setSelectedProgram(program)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-guidance-blue">{program.name}</h3>
                    <div className="bg-guidance-lightPurple text-xs font-medium text-guidance-purple px-2 py-1 rounded">
                      Merit: {program.merit}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{program.description}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {program.subjects.slice(0, 3).map((subject, index) => (
                      <span key={index} className="text-xs bg-guidance-lightBlue/50 text-guidance-blue px-2 py-1 rounded">
                        {subject}
                      </span>
                    ))}
                    {program.subjects.length > 3 && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        +{program.subjects.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedProgram && (
            <div className="mb-8">
              <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <div className="bg-guidance-blue text-white p-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{selectedProgram.name}</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-white text-white hover:bg-white hover:text-guidance-blue"
                      onClick={() => toggleCompareProgram(selectedProgram.id)}
                    >
                      <SplitSquareVertical className="h-4 w-4 mr-1" />
                      Jämför
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-white text-white hover:bg-white hover:text-guidance-blue"
                      onClick={() => handleSaveProgram()}
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      Spara
                    </Button>
                  </div>
                </div>
                
                <Tabs defaultValue="info" className="p-4">
                  <TabsList className="mb-4">
                    <TabsTrigger value="info" className="text-sm">
                      <Info className="h-4 w-4 mr-1" />
                      Information
                    </TabsTrigger>
                    <TabsTrigger value="education" className="text-sm">
                      <BookOpen className="h-4 w-4 mr-1" />
                      Kurser
                    </TabsTrigger>
                    <TabsTrigger value="further" className="text-sm">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      Vidare studier
                    </TabsTrigger>
                    <TabsTrigger value="schools" className="text-sm">
                      <School className="h-4 w-4 mr-1" />
                      Skolor
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-4">
                    <p className="text-gray-700">{selectedProgram.description}</p>
                    <div className="bg-guidance-lightGreen/20 p-4 rounded-md">
                      <h4 className="font-medium text-guidance-green flex items-center">
                        <Star className="h-4 w-4 mr-2" />
                        Meritpoäng
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">{selectedProgram.meritDescription}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Inriktningar</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedProgram.specializations.map((spec, index) => (
                          <div key={index} className="bg-guidance-lightBlue/20 p-2 rounded flex items-start">
                            <div className="bg-guidance-blue text-white p-1 rounded-full mr-2">
                              <Map className="h-3 w-3" />
                            </div>
                            <span className="text-sm">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Möjliga yrken</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProgram.careers.map((career, index) => (
                          <span key={index} className="text-sm bg-guidance-lightPurple/30 text-guidance-purple px-3 py-1 rounded-full">
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="education">
                    <div className="space-y-4">
                      <p className="text-gray-700">{selectedProgram.educationDescription}</p>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Obligatoriska kurser</h4>
                        <div className="space-y-2">
                          {selectedProgram.requiredCourses.map((course, index) => (
                            <div key={index} className="bg-guidance-lightBlue/20 p-2 rounded flex items-center">
                              <div className="bg-guidance-blue text-white p-1 rounded-full mr-2">
                                <BookOpen className="h-3 w-3" />
                              </div>
                              <span className="text-sm">{course}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Rekommenderade kurser</h4>
                        <div className="space-y-2">
                          {selectedProgram.recommendedCourses.map((course, index) => (
                            <div key={index} className="bg-guidance-lightGreen/20 p-2 rounded flex items-center">
                              <div className="bg-guidance-green text-white p-1 rounded-full mr-2">
                                <Star className="h-3 w-3" />
                              </div>
                              <span className="text-sm">{course}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="further">
                    <div className="space-y-4">
                      <p className="text-gray-700 mb-4">
                        Efter {selectedProgram.name} kan du studera vidare på olika utbildningar. Här är några exempel:
                      </p>
                      
                      {selectedProgram.furtherEducation.map((edu, index) => (
                        <Card key={index} className="border-l-4 border-guidance-purple">
                          <CardContent className="p-4">
                            <div className="flex justify-between">
                              <h5 className="font-medium text-guidance-purple">{edu.name}</h5>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-4 w-4 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs">{edu.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            
                            <div className="mt-2 flex items-center text-sm">
                              <GraduationCap className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-gray-600">{edu.meritRequirements}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-800 mb-2">Populära universitet/högskolor</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProgram.universities.map((uni, index) => (
                            <span key={index} className="text-sm bg-guidance-lightBlue/30 text-guidance-blue px-3 py-1 rounded-full">
                              {uni}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="schools">
                    <div className="space-y-4">
                      <p className="text-gray-700 mb-4">
                        Följande skolor erbjuder {selectedProgram.name}:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {schoolsWithSelectedProgram.map(school => (
                          <Card key={school.id} className="overflow-hidden">
                            <div className="bg-gradient-to-r from-guidance-lightBlue to-guidance-lightPurple p-3">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium text-guidance-blue">{school.name}</h4>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="border-guidance-blue bg-white text-guidance-blue h-8 hover:bg-guidance-blue hover:text-white"
                                    onClick={() => toggleCompareSchool(school.id)}
                                  >
                                    <SplitSquareVertical className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="border-guidance-purple bg-white text-guidance-purple h-8 hover:bg-guidance-purple hover:text-white"
                                    onClick={() => handleSaveProgram(school.name)}
                                  >
                                    <Heart className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            
                            <CardContent className="p-3">
                              <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Antagningspoäng: <span className="font-medium">{school.admissionScores[selectedProgram.id]}</span></span>
                                <span>Genomsnittsbetyg: <span className="font-medium">{school.statistics.averageGrade}</span></span>
                              </div>
                              
                              <div className="mt-3 text-sm">
                                <div className="flex items-start mb-2">
                                  <Map className="h-4 w-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600">{school.location.address}</span>
                                </div>
                                
                                <div className="flex items-start">
                                  <Calendar className="h-4 w-4 mr-2 text-guidance-green mt-0.5 flex-shrink-0" />
                                  {school.events[0] ? (
                                    <span className="text-guidance-green">
                                      Öppet hus: {new Date(school.events[0].date).toLocaleDateString('sv-SE')} kl {school.events[0].time}
                                    </span>
                                  ) : (
                                    <span className="text-gray-500">Inga kommande event</span>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      )}
      
      {viewMode === 'compare' && (
        <div>
          <h3 className="text-xl font-semibold text-guidance-blue mb-4">Jämför program och skolor</h3>
          
          {(compareItems.programs.length === 0 && compareItems.schools.length === 0) ? (
            <div className="bg-guidance-lightBlue/20 p-6 rounded-lg text-center">
              <SplitSquareVertical className="h-12 w-12 mx-auto text-guidance-blue mb-3" />
              <h3 className="text-xl font-medium text-guidance-blue mb-2">Inget att jämföra än</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-4">
                Klicka på jämförelseknappen på program eller skolor för att lägga till dem här för jämförelse.
              </p>
              <Button
                onClick={() => setViewMode('programs')}
                className="bg-guidance-blue hover:bg-guidance-blue/90"
              >
                <Search className="mr-2 h-4 w-4" />
                Utforska program
              </Button>
            </div>
          ) : (
            <div>
              {compareItems.programs.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-guidance-blue mb-4">Programjämförelse</h4>
                  <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gray-100 p-4 rounded">
                          <h5 className="font-semibold mb-8 text-gray-700">Egenskaper</h5>
                          <div className="space-y-6">
                            <div className="h-10 flex items-center font-medium">Beskrivning</div>
                            <div className="h-10 flex items-center font-medium">Meritpoäng</div>
                            <div className="h-10 flex items-center font-medium">Inriktningar</div>
                            <div className="h-10 flex items-center font-medium">Obligatoriska kurser</div>
                            <div className="h-10 flex items-center font-medium">Yrken</div>
                          </div>
                        </div>
                        
                        {compareItems.programs.map(programId => {
                          const program = getProgramById(programId);
                          return program ? (
                            <Card key={program.id} className="overflow-hidden">
                              <div className="bg-guidance-blue text-white p-3 flex justify-between items-center">
                                <h5 className="font-semibold">{program.name}</h5>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 hover:bg-guidance-blue/50 text-white p-0 px-2"
                                  onClick={() => toggleCompareProgram(program.id)}
                                >
                                  <span className="sr-only">Ta bort</span>
                                  ✕
                                </Button>
                              </div>
                              <CardContent className="p-3 space-y-4">
                                <div className="text-sm text-gray-700 line-clamp-2 h-10">
                                  {program.description}
                                </div>
                                <div className="h-10 flex items-center">
                                  <span className="bg-guidance-lightPurple text-guidance-purple px-2 py-1 rounded text-sm">
                                    {program.merit}
                                  </span>
                                </div>
                                <div className="h-10 flex items-center">
                                  <span className="text-sm text-gray-700">
                                    {program.specializations.length} inriktningar
                                  </span>
                                </div>
                                <div className="h-10 flex items-center">
                                  <span className="text-sm text-gray-700">
                                    {program.requiredCourses.length} kurser
                                  </span>
                                </div>
                                <div className="h-10 flex items-center">
                                  <div className="flex flex-wrap gap-1">
                                    {program.careers.slice(0, 2).map((career, i) => (
                                      <span key={i} className="text-xs bg-guidance-lightBlue px-2 py-0.5 rounded">
                                        {career}
                                      </span>
                                    ))}
                                    {program.careers.length > 2 && (
                                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                        +{program.careers.length - 2}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {compareItems.schools.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium text-guidance-green mb-4">Skoljämförelse</h4>
                  <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gray-100 p-4 rounded">
                          <h5 className="font-semibold mb-8 text-gray-700">Egenskaper</h5>
                          <div className="space-y-6">
                            <div className="h-10 flex items-center font-medium">Program</div>
                            <div className="h-10 flex items-center font-medium">Adress</div>
                            <div className="h-10 flex items-center font-medium">Antagningspoäng</div>
                            <div className="h-10 flex items-center font-medium">Genomsnittsbetyg</div>
                            <div className="h-10 flex items-center font-medium">Behöriga lärare</div>
                            <div className="h-10 flex items-center font-medium">Nöjdhetsgrad</div>
                            <div className="h-10 flex items-center font-medium">Öppet hus</div>
                          </div>
                        </div>
                        
                        {compareItems.schools.map(schoolId => {
                          const school = getSchoolById(schoolId);
                          return school ? (
                            <Card key={school.id} className="overflow-hidden">
                              <div className="bg-guidance-green text-white p-3 flex justify-between items-center">
                                <h5 className="font-semibold">{school.name}</h5>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 hover:bg-guidance-green/50 text-white p-0 px-2"
                                  onClick={() => toggleCompareSchool(school.id)}
                                >
                                  <span className="sr-only">Ta bort</span>
                                  ✕
                                </Button>
                              </div>
                              <CardContent className="p-3 space-y-4">
                                <div className="h-10 flex items-center">
                                  <div className="flex flex-wrap gap-1">
                                    {school.programs.slice(0, 2).map((programId, i) => {
                                      const program = getProgramById(programId);
                                      return program ? (
                                        <span key={i} className="text-xs bg-guidance-lightBlue px-2 py-0.5 rounded">
                                          {program.name.split(" ")[0]}
                                        </span>
                                      ) : null;
                                    })}
                                    {school.programs.length > 2 && (
                                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                        +{school.programs.length - 2}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="h-10 flex items-center">
                                  <span className="text-sm text-gray-700">{school.location.address}</span>
                                </div>
                                <div className="h-10 flex items-center">
                                  {selectedProgram && school.admissionScores[selectedProgram.id] ? (
                                    <span className="text-sm font-medium text-guidance-blue">
                                      {school.admissionScores[selectedProgram.id]} poäng
                                    </span>
                                  ) : (
                                    <span className="text-sm text-gray-500">Varierar</span>
                                  )}
                                </div>
                                <div className="h-10 flex items-center">
                                  <span className="text-sm font-medium">{school.statistics.averageGrade}</span>
                                </div>
                                <div className="h-10 flex items-center">
                                  <span className="text-sm font-medium">{school.statistics.qualifiedTeachers}%</span>
                                </div>
                                <div className="h-10 flex items-center">
                                  <span className="text-sm font-medium">{school.statistics.satisfactionRate}%</span>
                                </div>
                                <div className="h-10 flex items-center">
                                  {school.events[0] ? (
                                    <span className="text-xs text-guidance-green">
                                      {new Date(school.events[0].date).toLocaleDateString('sv-SE')}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-gray-500">Inga planerade</span>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {viewMode === 'tree' && (
        <div>
          <h3 className="text-xl font-semibold text-guidance-blue mb-4">Utbildningsvägar och karriärmöjligheter</h3>
          <p className="text-gray-600 mb-6">
            Utforska hur gymnasieprogram, högskoleprogram och yrken hänger ihop i ett interaktivt karriärträd.
          </p>
          <TreeDiagram 
            program={selectedProgram.name}
            specializations={selectedProgram.specializations}
            educationPaths={selectedProgram.furtherEducation.map(edu => edu.name)}
            careers={selectedProgram.careers}
            selectedProgram={selectedProgram.id}
          />
        </div>
      )}
    </div>
  );
};

export default CareerMap;
