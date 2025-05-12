
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
  Compare
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
    requiredCourser: [
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
            description: "Du kan jämföra max 3 program samtidigt. Ta bort något först.",
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
              <Compare className="mr-2 h-4 w-4" />
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
          {viewMode === 'schools' && "Utforska skolor som erbjuder ditt valda program och deras faciliteter, recensioner och antagningspoäng."}
          {viewMode === 'compare' && "Jämför olika program och skolor sida vid sida för att hitta det som passar dig bäst."}
          {viewMode === 'tree' && "Utforska karriärträdet för att se hela vägen från skola till yrke."}
        </p>
        
        {/* PROGRAM VIEW */}
        {viewMode === 'programs' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {programData.map((program) => (
                <Button
                  key={program.id}
                  variant={selectedProgram.id === program.id ? "default" : "outline"}
                  className={`h-auto py-3 justify-start ${selectedProgram.id === program.id 
                    ? "bg-guidance-blue hover:bg-guidance-blue/90" 
                    : "border-guidance-blue text-guidance-blue hover:bg-guidance-lightBlue/50"}`}
                  onClick={() => setSelectedProgram(program)}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{program.name}</span>
                    <div className="flex items-center mt-1">
                      <GraduationCap className="h-4 w-4 mr-1 text-guidance-purple" />
                      <span className="bg-guidance-lightPurple text-guidance-purple text-xs px-1.5 py-0.5 rounded">
                        Merit: {program.merit}
                      </span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-guidance-green">{selectedProgram.name}</h3>
                      <span className="bg-guidance-purple text-white text-sm px-2 py-0.5 rounded-md">
                        Merit: {selectedProgram.merit}
                      </span>
                    </div>
                    <p className="text-gray-600">{selectedProgram.description}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => toggleCompareProgram(selectedProgram.id)}
                      variant="outline"
                      className="border-guidance-purple text-guidance-purple hover:bg-guidance-lightPurple/50"
                    >
                      <Compare className="mr-2 h-4 w-4" />
                      {compareItems.programs.includes(selectedProgram.id) 
                        ? "Ta bort från jämförelse" 
                        : "Lägg till i jämförelse"}
                    </Button>
                    
                    <Button
                      onClick={() => handleSaveProgram()}
                      variant="outline"
                      className="border-guidance-green text-guidance-green hover:bg-guidance-lightGreen/50"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Spara program
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
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
                      <p className="text-sm text-gray-700 mb-3">{selectedProgram.educationDescription}</p>
                      
                      <h5 className="font-medium text-guidance-blue mb-1">Inriktningar</h5>
                      <ul className="list-disc list-inside mb-3 text-sm text-gray-700">
                        {selectedProgram.specializations.map((specialization, index) => (
                          <li key={index}>{specialization}</li>
                        ))}
                      </ul>
                      
                      <h5 className="font-medium text-guidance-blue mb-1">Obligatoriska kurser</h5>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {selectedProgram.requiredCourses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-guidance-lightPurple/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-guidance-purple mb-2">Vidare studier</h4>
                      <div className="space-y-3">
                        {selectedProgram.furtherEducation.map((education, index) => (
                          <div key={index} className="border-b border-guidance-purple/20 pb-2 last:border-0">
                            <h5 className="font-medium">{education.name}</h5>
                            <p className="text-xs">
                              <span className="font-semibold">Krav: </span>
                              {education.meritRequirements}
                            </p>
                            <p className="text-xs text-gray-600">{education.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-700 mb-2">Rekommenderade tillval</h4>
                      <p className="text-xs text-gray-600 mb-2">Dessa kurser rekommenderas för att öka dina möjligheter för vidare studier:</p>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {selectedProgram.recommendedCourses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Skolor som erbjuder programmet */}
                <div className="mt-8">
                  <h4 className="font-semibold text-lg text-guidance-blue mb-4">Skolor som erbjuder {selectedProgram.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {schoolsWithSelectedProgram.map((school) => (
                      <div 
                        key={school.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium">{school.name}</h5>
                          <div className="bg-guidance-lightPurple text-guidance-purple text-xs px-2 py-1 rounded">
                            Antagning: {school.admissionScores[selectedProgram.id as keyof typeof school.admissionScores]}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{school.location.address}</p>
                        <div className="mt-3 flex justify-between">
                          <Button
                            onClick={() => setSelectedSchool(school.id)}
                            variant="outline"
                            size="sm"
                            className="text-guidance-blue border-guidance-blue hover:bg-guidance-lightBlue/50"
                          >
                            <Search className="h-3 w-3 mr-1" />
                            Mer info
                          </Button>
                          
                          <Button 
                            onClick={() => handleSaveProgram(school.name)}
                            variant="outline"
                            size="sm"
                            className="text-guidance-green border-guidance-green hover:bg-guidance-lightGreen/50"
                          >
                            <Heart className="h-3 w-3 mr-1" />
                            Spara
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <Tabs defaultValue="careers">
                    <TabsList className="mb-4">
                      <TabsTrigger value="careers">Möjliga yrken</TabsTrigger>
                      <TabsTrigger value="education">Högskoleprogram</TabsTrigger>
                      <TabsTrigger value="subjects">Viktiga ämnen</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="careers" className="space-y-4">
                      <h4 className="font-semibold">Yrken detta program kan leda till:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {selectedProgram.careers.map((career, index) => (
                          <div key={index} className="bg-guidance-lightGreen p-3 rounded-lg text-center">
                            {career}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="education" className="space-y-4">
                      <h4 className="font-semibold">Vanliga universitet och högskolor:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedProgram.universities.map((university, index) => (
                          <div key={index} className="bg-guidance-lightBlue p-3 rounded-lg text-center">
                            {university}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="subjects" className="space-y-4">
                      <h4 className="font-semibold">Viktiga ämnen i programmet:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
        
        {/* SCHOOL DETAILS VIEW */}
        {viewMode === 'schools' && selectedSchool && (
          <Card className="mb-8">
            <CardContent className="p-6">
              {(() => {
                const school = getSchoolById(selectedSchool);
                if (!school) return <p>Skolan hittades inte</p>;
                
                return (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-guidance-purple">{school.name}</h3>
                        <p className="text-gray-600">{school.location.address}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => toggleCompareSchool(school.id)}
                          variant="outline"
                          className="border-guidance-purple text-guidance-purple hover:bg-guidance-lightPurple/50"
                        >
                          <Compare className="mr-2 h-4 w-4" />
                          {compareItems.schools.includes(school.id) 
                            ? "Ta bort från jämförelse" 
                            : "Lägg till i jämförelse"}
                        </Button>
                        
                        <Button
                          onClick={() => setSelectedSchool(null)}
                          variant="outline"
                        >
                          Tillbaka
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left column */}
                      <div className="space-y-4">
                        <div className="bg-guidance-lightPurple/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-guidance-purple mb-2">Program och antagningspoäng</h4>
                          <div className="space-y-2">
                            {school.programs.map((programId) => {
                              const program = getProgramById(programId);
                              if (!program) return null;
                              
                              return (
                                <div key={programId} className="flex justify-between items-center border-b border-guidance-purple/20 pb-2 last:border-0">
                                  <span>{program.name}</span>
                                  <div className="flex items-center">
                                    <span className="text-xs bg-white px-2 py-1 rounded mr-2">
                                      Antagning: {school.admissionScores[programId as keyof typeof school.admissionScores]}
                                    </span>
                                    
                                    <Button
                                      onClick={() => handleSaveProgram(school.name)}
                                      variant="ghost"
                                      size="sm"
                                      className="p-1 h-6 text-guidance-green hover:bg-guidance-lightGreen/50"
                                    >
                                      <Heart className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-700 mb-2">Kommande evenemang</h4>
                          {school.events.map((event, index) => (
                            <div key={index} className="mb-2 last:mb-0">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-guidance-blue" />
                                <span className="font-medium">{event.name}</span>
                              </div>
                              <p className="text-sm text-gray-600 ml-6">{event.date}, kl {event.time}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-guidance-lightBlue/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-guidance-blue mb-2">Restid & kommunikationer</h4>
                          <div className="flex items-start">
                            <Map className="h-4 w-4 mr-2 mt-0.5 text-guidance-blue" />
                            <div>
                              <p className="text-sm text-gray-700 mb-1">Kollektivtrafik</p>
                              <p className="text-sm">{school.location.commute}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Middle column */}
                      <div className="space-y-4">
                        <div className="bg-guidance-lightGreen/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-guidance-green mb-3">Skolstatistik</h4>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Snittbetyg</span>
                                <span className="text-sm font-medium">{school.statistics.averageGrade}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className="bg-guidance-green h-1.5 rounded-full" style={{ width: `${(school.statistics.averageGrade / 20) * 100}%` }}></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Genomströmning</span>
                                <span className="text-sm font-medium">{school.statistics.completionRate}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className="bg-guidance-blue h-1.5 rounded-full" style={{ width: `${school.statistics.completionRate}%` }}></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Behöriga lärare</span>
                                <span className="text-sm font-medium">{school.statistics.qualifiedTeachers}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className="bg-guidance-purple h-1.5 rounded-full" style={{ width: `${school.statistics.qualifiedTeachers}%` }}></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Nöjdhet</span>
                                <span className="text-sm font-medium">{school.statistics.satisfactionRate}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${school.statistics.satisfactionRate}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                          <h4 className="font-semibold text-amber-700 mb-2">Recensioner från elever</h4>
                          {school.reviews.map((review, index) => (
                            <div key={index} className="mb-3 last:mb-0">
                              <div className="flex items-center mb-1">
                                <div className="flex mr-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                                  {review.aspect}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Right column */}
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <h4 className="font-semibold text-guidance-blue mb-2">Faciliteter</h4>
                          
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-sm font-medium mb-1">Matsal</h5>
                              <p className="text-sm text-gray-600">{school.facilities.canteen}</p>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-medium mb-1">Bibliotek</h5>
                              <p className="text-sm text-gray-600">{school.facilities.library}</p>
                            </div>
                            
                            {school.facilities.sports && (
                              <div>
                                <h5 className="text-sm font-medium mb-1">Idrottsanläggningar</h5>
                                <p className="text-sm text-gray-600">{school.facilities.sports}</p>
                              </div>
                            )}
                            
                            {school.facilities.labs && (
                              <div>
                                <h5 className="text-sm font-medium mb-1">Laboratorier</h5>
                                <p className="text-sm text-gray-600">{school.facilities.labs}</p>
                              </div>
                            )}
                            
                            {school.facilities.studios && (
                              <div>
                                <h5 className="text-sm font-medium mb-1">Studios</h5>
                                <p className="text-sm text-gray-600">{school.facilities.studios}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                          <h4 className="font-semibold text-indigo-700 mb-2">Extramöjligheter</h4>
                          <ul className="space-y-1">
                            {school.extracurricular.map((activity, index) => (
                              <li key={index} className="text-sm flex items-center">
                                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </CardContent>
          </Card>
        )}
        
        {/* COMPARE VIEW */}
        {viewMode === 'compare' && (
          <div className="mb-8">
            <Tabs defaultValue="programs">
              <TabsList className="mb-4">
                <TabsTrigger value="programs">Jämför program</TabsTrigger>
                <TabsTrigger value="schools">Jämför skolor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="programs">
                <div className="mb-4">
                  <h4 className="font-semibold text-guidance-blue mb-2">Välj program att jämföra (max 3)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {programData.map((program) => (
                      <Button
                        key={program.id}
                        variant={compareItems.programs.includes(program.id) ? "default" : "outline"}
                        className={compareItems.programs.includes(program.id) ? "bg-guidance-purple hover:bg-guidance-purple/90" : ""}
                        onClick={() => toggleCompareProgram(program.id)}
                      >
                        {program.name}
                        <span className="ml-2 text-xs bg-white text-guidance-purple px-1.5 py-0.5 rounded">
                          Merit: {program.merit}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {compareItems.programs.length > 0 ? (
                  <Card>
                    <CardContent className="p-6 overflow-x-auto">
                      <table className="w-full min-w-[800px]">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left p-2 bg-gray-50"></th>
                            {compareItems.programs.map(programId => {
                              const program = getProgramById(programId);
                              if (!program) return null;
                              
                              return (
                                <th key={programId} className="p-2 bg-guidance-lightBlue/30">
                                  <div className="font-semibold text-guidance-blue">{program.name}</div>
                                  <div className="text-xs mt-1 inline-block bg-guidance-purple text-white px-2 py-0.5 rounded">
                                    Merit: {program.merit}
                                  </div>
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="font-medium p-2 bg-gray-50">Beskrivning</td>
                            {compareItems.programs.map(programId => {
                              const program = getProgramById(programId);
                              if (!program) return null;
                              
                              return (
                                <td key={programId} className="p-2 text-sm">
                                  {program.description}
                                </td>
                              );
                            })}
                          </tr>
                          
                          <tr className="border-b border-gray-200">
                            <td className="font-medium p-2 bg-gray-50">Inriktningar</td>
                            {compareItems.programs.map(programId => {
                              const program = getProgramById(programId);
                              if (!program) return null;
                              
                              return (
                                <td key={programId} className="p-2">
                                  <ul className="list-disc list-inside text-sm">
                                    {program.specializations.map((spec, i) => (
                                      <li key={i}>{spec}</li>
                                    ))}
                                  </ul>
                                </td>
                              );
                            })}
                          </tr>
                          
                          <tr className="border-b border-gray-200">
                            <td className="font-medium p-2 bg-gray-50">Behörighet</td>
                            {compareItems.programs.map(programId => {
                              const program = getProgramById(programId);
                              if (!program) return null;
                              
                              return (
                                <td key={programId} className="p-2 text-sm">
                                  {program.meritDescription}
                                </td>
                              );
                            })}
                          </tr>
                          
                          <tr className="border-b border-gray-200">
                            <td className="font-medium p-2 bg-gray-50">Viktiga ämnen</td>
                            {compareItems.programs.map(programId => {
                              const program = getProgramById(programId);
                              if (!program) return null;
                              
                              return (
                                <td key={programId} className="p-2">
                                  <div className="flex flex-wrap gap-1">
                                    {program.subjects.map((subject, i) => (
                                      <span key={i} className="text-xs bg-guidance-lightPurple text-guidance-purple px-2 py-0.5 rounded">
                                        {subject}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          
                          <tr>
                            <td className="font-medium p-2 bg-gray-50">Möjliga yrken</td>
                            {compareItems.programs.map(programId => {
                              const program = getProgramById(programId);
                              if (!program) return null;
                              
                              return (
                                <td key={programId} className="p-2">
                                  <div className="flex flex-wrap gap-1">
                                    {program.careers.slice(0, 3).map((career, i) => (
                                      <span key={i} className="text-xs bg-guidance-lightGreen text-guidance-green px-2 py-0.5 rounded">
                                        {career}
                                      </span>
                                    ))}
                                    {program.careers.length > 3 && (
                                      <span className="text-xs text-gray-500">
                                        +{program.careers.length - 3} fler
                                      </span>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Välj minst ett program för att jämföra</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="schools">
                <div className="mb-4">
                  <h4 className="font-semibold text-guidance-blue mb-2">Välj skolor att jämföra (max 3)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    {schoolsData.map((school) => (
                      <Button
                        key={school.id}
                        variant={compareItems.schools.includes(school.id) ? "default" : "outline"}
                        className={compareItems.schools.includes(school.id) ? "bg-guidance-purple hover:bg-guidance-purple/90" : ""}
                        onClick={() => toggleCompareSchool(school.id)}
                      >
                        {school.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {compareItems.schools.length > 0 ? (
                  <Card>
                    <CardContent className="p-6 overflow-x-auto">
                      <table className="w-full min-w-[800px]">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left p-2 bg-gray-50"></th>
                            {compareItems.schools.map(schoolId => {
                              const school = getSchoolById(schoolId);
                              if (!school) return null;
                              
                              return (
                                <th key={schoolId} className="p-2 bg-guidance-lightBlue/30">
                                  <div className="font-semibold text-guidance-blue">{school.name}</div>
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="font-medium p-2 bg-gray-50">Program</td>
                            {compareItems.schools.map(schoolId => {
                              const school = getSchoolById(schoolId);
                              if (!school) return null;
                              
                              return (
                                <td key={schoolId} className="p-2">
                                  <div className="space-y-1">
                                    {school.programs.map(programId => {
                                      const program = getProgramById(programId);
                                      if (!program) return null;
                                      
                                      return (
                                        <div key={programId} className="flex justify-between text-sm">
                                          <span>{program.name}</span>
                                          <span className="text-xs bg-guidance-lightPurple text-guidance-purple px-1.5 py-0.5 rounded">
                                            Antagning: {school.admissionScores[programId as keyof typeof school.admissionScores]}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          
                          <tr className="border-b border-gray-200">
                            <td className="font-medium p-2 bg-gray-50">Adress</td>
                            {compareItems.schools.map(schoolId => {
                              const school = getSchoolById(schoolId);
                              if (!school) return null;
                              
                              return (
                                <td key={schoolId} className="p-2 text-sm">
                                  {school.location.address}
                                </td>
                              );
                            })}
                          </tr>
                          
                          <tr className="border-b border-gray-200">
                            <td className="font-medium p-2 bg-gray-50">Kommunikationer</td>
                            {compareItems.schools.map(schoolId => {
                              const school = getSchoolById(schoolId);
                              if (!school) return null;
                              
                              return (
                                <td key={schoolId} className="p-2 text-sm">
                                  {school.location.commute}
                                </td>
                              );
                            })}
                          </tr>
                          
                          <tr className="border-b border-gray-200">
                            <td className="font-medium p-2 bg-gray-50">Statistik</td>
                            {compareItems.schools.map(schoolId => {
                              const school = getSchoolById(schoolId);
                              if (!school) return null;
                              
                              return (
                                <td key={schoolId} className="p-2">
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <div className="flex justify-between">
                                        <span>Snittbetyg:</span>
                                        <span className="font-medium">{school.statistics.averageGrade}</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                        <div className="bg-guidance-green h-1.5 rounded-full" style={{ width: `${(school.statistics.averageGrade / 20) * 100}%` }}></div>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <div className="flex justify-between">
                                        <span>Genomströmning:</span>
                                        <span className="font-medium">{school.statistics.completionRate}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                        <div className="bg-guidance-blue h-1.5 rounded-full" style={{ width: `${school.statistics.completionRate}%` }}></div>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <div className="flex justify-between">
                                        <span>Nöjdhet:</span>
                                        <span className="font-medium">{school.statistics.satisfactionRate}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${school.statistics.satisfactionRate}%` }}></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          
                          <tr>
                            <td className="font-medium p-2 bg-gray-50">Extramöjligheter</td>
                            {compareItems.schools.map(schoolId => {
                              const school = getSchoolById(schoolId);
                              if (!school) return null;
                              
                              return (
                                <td key={schoolId} className="p-2">
                                  <ul className="list-disc list-inside text-sm">
                                    {school.extracurricular.slice(0, 3).map((activity, i) => (
                                      <li key={i}>{activity}</li>
                                    ))}
                                    {school.extracurricular.length > 3 && (
                                      <li className="text-gray-500">
                                        +{school.extracurricular.length - 3} fler
                                      </li>
                                    )}
                                  </ul>
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Välj minst en skola för att jämföra</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {/* TREE VIEW */}
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
