
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
  const [viewMode, setViewMode] = useState<'programs' | 'schools' | 'compare' | 'tree'>('programs');
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
              variant={viewMode === 'schools' ? "default" : "outline"} 
              onClick={() => setViewMode('schools')}
              className={viewMode === 'schools' ? "bg-guidance-blue hover:bg-guidance-blue/90" : ""}
            >
              <School className="mr-2 h-4 w-4" />
              Skolor
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
          {viewMode === 'schools' && "Se information om skolor som erbjuder det valda programmet, inklusive antagningspoäng, recensioner och faciliteter."}
          {viewMode === 'compare' && "Jämför olika program och skolor sida vid sida för att hitta det som passar dig bäst."}
          {viewMode === 'tree' && "Utforska hur olika utbildningsvägar hänger ihop med olika karriärval genom ett interaktivt träd."}
        </p>
      </div>

      {/* Fixed the closing tags for the divs below */}
      {viewMode === 'programs' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Program cards */}
            <div className="md:col-span-1">
              <div className="space-y-4">
                {programData.map(program => (
                  <Card 
                    key={program.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${program.id === selectedProgram.id ? 'border-guidance-blue border-2' : ''}`}
                    onClick={() => setSelectedProgram(program)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{program.name}</h3>
                        <div className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCompareProgram(program.id);
                                  }} 
                                  className={`p-1 rounded-full ${compareItems.programs.includes(program.id) ? 'bg-guidance-purple text-white' : 'bg-gray-100'}`}
                                >
                                  <SplitSquareVertical className="h-4 w-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{compareItems.programs.includes(program.id) ? 'Ta bort från jämförelse' : 'Lägg till i jämförelse'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveProgram();
                                  }} 
                                  className="p-1 rounded-full bg-gray-100 hover:bg-red-50"
                                >
                                  <Heart className="h-4 w-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Spara till favoriter</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="bg-guidance-lightBlue text-guidance-blue text-xs px-2 py-0.5 rounded">Merit: {program.merit}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Program details */}
            <div className="md:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-guidance-blue">{selectedProgram.name}</h2>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setViewMode('schools')}
                        className="flex items-center gap-1 text-sm"
                      >
                        <School className="h-4 w-4" />
                        Skolor ({schoolsWithSelectedProgram.length})
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleSaveProgram()}
                        className="bg-guidance-purple hover:bg-guidance-purple/90 flex items-center gap-1 text-sm"
                      >
                        <Heart className="h-4 w-4" />
                        Spara till favoriter
                      </Button>
                    </div>
                  </div>

                  <Tabs defaultValue="overview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="overview">Översikt</TabsTrigger>
                      <TabsTrigger value="education">Utbildningar</TabsTrigger>
                      <TabsTrigger value="courses">Kurser</TabsTrigger>
                      <TabsTrigger value="specializations">Inriktningar</TabsTrigger>
                      <TabsTrigger value="careers">Yrken</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-guidance-blue mb-2 flex items-center">
                          <Info className="mr-2 h-4 w-4" />
                          Om programmet
                        </h3>
                        <p className="text-gray-700">{selectedProgram.description}</p>
                      </div>

                      <div className="bg-guidance-lightPurple/20 p-4 rounded-lg">
                        <h3 className="font-semibold text-guidance-purple mb-2 flex items-center">
                          <Star className="mr-2 h-4 w-4" />
                          Meritinformation
                        </h3>
                        <p className="text-gray-700">{selectedProgram.meritDescription}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-guidance-blue mb-2">Ämnen i fokus</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProgram.subjects.map((subject, index) => (
                            <span key={index} className="bg-guidance-lightBlue text-guidance-blue px-2 py-1 text-sm rounded-md">{subject}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-guidance-blue mb-2">Skolor som erbjuder programmet</h3>
                        <div className="space-y-2">
                          {schoolsWithSelectedProgram.length > 0 ? (
                            schoolsWithSelectedProgram.map(school => (
                              <div key={school.id} className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100">
                                <span>{school.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500">Antagningspoäng: {school.admissionScores[selectedProgram.id as keyof typeof school.admissionScores]}</span>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedSchool(school.id)}>
                                    Mer info
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500">Ingen information om skolor tillgänglig för detta program.</p>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="education">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-guidance-blue mb-3 flex items-center">
                            <GraduationCap className="mr-2 h-5 w-5" />
                            Vidare utbildningsvägar
                          </h3>
                          <p className="text-gray-700 mb-4">
                            Efter {selectedProgram.name.toLowerCase()} har du behörighet att söka till följande utbildningar:
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedProgram.furtherEducation.map((edu, index) => (
                            <Card key={index} className="border-l-4 border-guidance-purple">
                              <CardContent className="p-4">
                                <h4 className="font-semibold">{edu.name}</h4>
                                <p className="text-sm text-gray-600">{edu.description}</p>
                                <div className="mt-2">
                                  <h5 className="text-sm font-medium text-guidance-purple">Meritkurser för särskild behörighet:</h5>
                                  <p className="text-sm">{edu.meritRequirements}</p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <div className="bg-guidance-lightBlue/20 p-4 rounded-lg">
                          <h3 className="font-semibold text-guidance-blue mb-2">Populära universitet för detta program</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProgram.universities.map((uni, index) => (
                              <span key={index} className="bg-white border border-guidance-blue/30 px-3 py-1 rounded-full text-sm">{uni}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="courses">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-guidance-blue mb-2">Obligatoriska kurser</h3>
                          <div className="space-y-1">
                            {selectedProgram.requiredCourses.map((course, index) => (
                              <div key={index} className="p-2 bg-gray-50 rounded">
                                {course}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-guidance-blue mb-2">Rekommenderade kurser</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Dessa kurser kan ge dig extra meritpoäng eller särskild behörighet till vissa utbildningar.
                          </p>
                          <div className="space-y-1">
                            {selectedProgram.recommendedCourses.map((course, index) => (
                              <div key={index} className="p-2 bg-guidance-lightBlue/20 rounded">
                                {course}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="specializations">
                      <div>
                        <h3 className="font-semibold text-guidance-blue mb-3">Inriktningar inom {selectedProgram.name}</h3>
                        <p className="text-gray-700 mb-4">
                          Efter år 1 kan du oftast välja en av följande inriktningar:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedProgram.specializations.map((spec, index) => (
                            <Card key={index}>
                              <CardContent className="p-4">
                                <h4 className="font-semibold">{spec}</h4>
                                <Button variant="link" className="p-0 h-auto text-guidance-blue">
                                  Läs mer om inriktningen
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="careers">
                      <div>
                        <h3 className="font-semibold text-guidance-blue mb-3 flex items-center">
                          <Map className="mr-2 h-5 w-5" />
                          Möjliga karriärvägar
                        </h3>
                        <p className="text-gray-700 mb-4">
                          {selectedProgram.name} kan leda till många olika yrken och karriärmöjligheter:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {selectedProgram.careers.map((career, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                              {career}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
      
      {viewMode === 'schools' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Schools sidebar */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setViewMode('programs')}
                >
                  <BookOpen className="mr-2 h-4 w-4" /> Tillbaka till program
                </Button>
              </div>
              <h3 className="font-semibold mb-3">Skolor med {selectedProgram.name}</h3>
              <div className="space-y-3">
                {schoolsWithSelectedProgram.map(school => (
                  <Card 
                    key={school.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${selectedSchool === school.id ? 'border-guidance-blue border-2' : ''}`}
                    onClick={() => setSelectedSchool(school.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{school.name}</h4>
                        <div className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCompareSchool(school.id);
                                  }} 
                                  className={`p-1 rounded-full ${compareItems.schools.includes(school.id) ? 'bg-guidance-purple text-white' : 'bg-gray-100'}`}
                                >
                                  <SplitSquareVertical className="h-4 w-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{compareItems.schools.includes(school.id) ? 'Ta bort från jämförelse' : 'Lägg till i jämförelse'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      {school.admissionScores[selectedProgram.id as keyof typeof school.admissionScores] && (
                        <div className="mt-1 flex items-center">
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            Antagningspoäng: {school.admissionScores[selectedProgram.id as keyof typeof school.admissionScores]}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* School details */}
            <div className="md:col-span-3">
              {selectedSchool ? (
                <Card>
                  <CardContent className="p-6">
                    {(() => {
                      const school = getSchoolById(selectedSchool);
                      if (!school) return <div>Ingen information tillgänglig</div>;

                      return (
                        <div>
                          <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-guidance-blue">{school.name}</h2>
                            <div className="flex gap-2">
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handleSaveProgram(school.name)}
                                className="bg-guidance-purple hover:bg-guidance-purple/90 flex items-center gap-1"
                              >
                                <Heart className="h-4 w-4" /> 
                                Spara program på denna skola
                              </Button>
                            </div>
                          </div>

                          <Tabs defaultValue="info">
                            <TabsList className="mb-4">
                              <TabsTrigger value="info">Information</TabsTrigger>
                              <TabsTrigger value="stats">Statistik</TabsTrigger>
                              <TabsTrigger value="reviews">Recensioner</TabsTrigger>
                              <TabsTrigger value="facilities">Faciliteter</TabsTrigger>
                              <TabsTrigger value="location">Plats & Resor</TabsTrigger>
                            </TabsList>

                            <TabsContent value="info">
                              <div className="space-y-6">
                                <div>
                                  <h3 className="font-semibold text-guidance-blue mb-3">Om skolan</h3>
                                  <p className="text-gray-700 mb-4">
                                    {school.name} erbjuder flera program med olika inriktningar.
                                  </p>

                                  <h4 className="font-medium mb-2">Program som erbjuds:</h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                                    {school.programs.map(progId => {
                                      const prog = getProgramById(progId);
                                      return prog ? (
                                        <div key={progId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                          <span>{prog.name}</span>
                                          <span className="text-xs bg-guidance-lightBlue text-guidance-blue px-2 py-0.5 rounded">
                                            Antagning: {school.admissionScores[progId as keyof typeof school.admissionScores] || "N/A"}
                                          </span>
                                        </div>
                                      ) : null;
                                    })}
                                  </div>

                                  <h4 className="font-medium mb-2">Kommande evenemang:</h4>
                                  <div className="space-y-2">
                                    {school.events.map((event, idx) => (
                                      <div key={idx} className="flex items-center p-3 bg-guidance-lightGreen/20 rounded-lg">
                                        <Calendar className="h-5 w-5 text-guidance-green mr-3" />
                                        <div>
                                          <h5 className="font-medium">{event.name}</h5>
                                          <p className="text-sm text-gray-600">{event.date}, {event.time}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h3 className="font-semibold text-guidance-blue mb-2">Extracurricular aktiviteter</h3>
                                  <div className="space-y-1">
                                    {school.extracurricular.map((activity, idx) => (
                                      <div key={idx} className="p-2 bg-gray-50 rounded">{activity}</div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="stats">
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Genomsnittligt meritvärde</h4>
                                    <div className="text-2xl font-bold">{school.statistics.averageGrade}</div>
                                  </div>
                                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Andel elever som tar examen</h4>
                                    <div className="text-2xl font-bold">{school.statistics.completionRate}%</div>
                                  </div>
                                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Behöriga lärare</h4>
                                    <div className="text-2xl font-bold">{school.statistics.qualifiedTeachers}%</div>
                                  </div>
                                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Elevnöjdhet</h4>
                                    <div className="text-2xl font-bold">{school.statistics.satisfactionRate}%</div>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="font-semibold text-guidance-blue mb-3">Antagningsstatistik för {selectedProgram.name}</h3>
                                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-500 mb-1">Antagningspoäng senaste året</h4>
                                    <div className="text-2xl font-bold">
                                      {school.admissionScores[selectedProgram.id as keyof typeof school.admissionScores] || "Ingen data"}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                      Baserat på sista antagna elev föregående år
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="reviews">
                              <div>
                                <h3 className="font-semibold text-guidance-blue mb-3">Vad säger eleverna om {school.name}?</h3>
                                <div className="space-y-4">
                                  {school.reviews.map((review, idx) => (
                                    <Card key={idx}>
                                      <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <div className="mb-1 flex">
                                              {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                              ))}
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                          </div>
                                          <span className="bg-guidance-lightPurple text-guidance-purple text-xs px-2 py-0.5 rounded-full">
                                            {review.aspect}
                                          </span>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="facilities">
                              <div className="space-y-6">
                                {Object.entries(school.facilities).map(([key, value]) => (
                                  <div key={key}>
                                    <h3 className="font-semibold text-guidance-blue mb-2 capitalize">{key}</h3>
                                    <p className="text-gray-700">{value}</p>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>

                            <TabsContent value="location">
                              <div className="space-y-6">
                                <div>
                                  <h3 className="font-semibold text-guidance-blue mb-2">Adress</h3>
                                  <p className="text-gray-700">{school.location.address}</p>
                                </div>

                                <div>
                                  <h3 className="font-semibold text-guidance-blue mb-2">Kollektivtrafik</h3>
                                  <p className="text-gray-700">{school.location.commute}</p>
                                </div>

                                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                  <p className="text-gray-500">Karta över skolans placering skulle visas här</p>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <School className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">Välj en skola</h3>
                  <p className="text-gray-500 text-center">
                    Välj en skola från listan till vänster för att se detaljerad information
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'compare' && (
        <div>
          <div className="mb-6">
            <h3 className="font-semibold text-guidance-blue mb-4">Jämför program</h3>
            {compareItems.programs.length === 0 ? (
              <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 text-center">
                <p className="text-gray-500">
                  Du har inte valt några program att jämföra än. Klicka på jämförelseikonen på programkorten för att lägga till dem här.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setViewMode('programs')}
                >
                  <BookOpen className="mr-2 h-4 w-4" /> Gå till program
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-left font-semibold border-b">Information</th>
                      {compareItems.programs.map(progId => {
                        const prog = getProgramById(progId);
                        return prog ? (
                          <th key={progId} className="p-3 text-left font-semibold border-b">
                            {prog.name}
                          </th>
                        ) : null;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-b font-medium">Beskrivning</td>
                      {compareItems.programs.map(progId => {
                        const prog = getProgramById(progId);
                        return prog ? (
                          <td key={progId} className="p-3 border-b">{prog.description}</td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium">Meritpoäng</td>
                      {compareItems.programs.map(progId => {
                        const prog = getProgramById(progId);
                        return prog ? (
                          <td key={progId} className="p-3 border-b">{prog.merit}</td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium">Inriktningar</td>
                      {compareItems.programs.map(progId => {
                        const prog = getProgramById(progId);
                        return prog ? (
                          <td key={progId} className="p-3 border-b">
                            <ul className="list-disc pl-5">
                              {prog.specializations.map((spec, idx) => (
                                <li key={idx}>{spec}</li>
                              ))}
                            </ul>
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium">Karriärmöjligheter</td>
                      {compareItems.programs.map(progId => {
                        const prog = getProgramById(progId);
                        return prog ? (
                          <td key={progId} className="p-3 border-b">
                            <div className="flex flex-wrap gap-1">
                              {prog.careers.map((career, idx) => (
                                <span key={idx} className="bg-gray-100 px-2 py-0.5 text-sm rounded">{career}</span>
                              ))}
                            </div>
                          </td>
                        ) : null;
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-guidance-blue mb-4">Jämför skolor</h3>
            {compareItems.schools.length === 0 ? (
              <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 text-center">
                <p className="text-gray-500">
                  Du har inte valt några skolor att jämföra än. Klicka på jämförelseikonen på skolkorten för att lägga till dem här.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setViewMode('schools')}
                >
                  <School className="mr-2 h-4 w-4" /> Gå till skolor
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-left font-semibold border-b">Information</th>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <th key={schoolId} className="p-3 text-left font-semibold border-b">
                            {school.name}
                          </th>
                        ) : null;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-b font-medium">Antagningspoäng ({selectedProgram.name})</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="p-3 border-b">
                            {school.admissionScores[selectedProgram.id as keyof typeof school.admissionScores] || "N/A"}
                          </td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium">Genomsnittligt meritvärde</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="p-3 border-b">{school.statistics.averageGrade}</td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium">Andel elever som tar examen</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="p-3 border-b">{school.statistics.completionRate}%</td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium">Behöriga lärare</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="p-3 border-b">{school.statistics.qualifiedTeachers}%</td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium">Elevnöjdhet</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="p-3 border-b">{school.statistics.satisfactionRate}%</td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium">Adress</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="p-3 border-b">{school.location.address}</td>
                        ) : null;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 border-b font-medium">Kollektivtrafik</td>
                      {compareItems.schools.map(schoolId => {
                        const school = getSchoolById(schoolId);
                        return school ? (
                          <td key={schoolId} className="p-3 border-b">{school.location.commute}</td>
                        ) : null;
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'tree' && (
        <div>
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold text-guidance-blue mb-4">Karriärträd för {selectedProgram.name}</h3>
            <TreeDiagram 
              program={selectedProgram.name}
              specializations={selectedProgram.specializations}
              educationPaths={selectedProgram.furtherEducation.map(edu => edu.name)}
              careers={selectedProgram.careers}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerMap;
