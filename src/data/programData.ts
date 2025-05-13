
import { Program } from '@/components/career/types';

export const programData: Program[] = [
  {
    id: "naturvet",
    name: "Naturvetenskapsprogrammet",
    description: "Ett högskoleförberedande program med fokus på naturvetenskap, matematik och teknik. Passar dig som är intresserad av vetenskap och logiskt tänkande.",
    meritDescription: "Ger dig 2.5 extra meritpoäng för de flesta högskoleutbildningar, särskilt tekniska och naturvetenskapliga utbildningar.",
    educationDescription: "Utbildningen ger dig djup kunskap inom matematik, fysik, kemi och biologi.",
    specializations: [
      "Naturvetenskap", 
      "Naturvetenskap och samhälle", 
      "Matematik och datavetenskap"
    ],
    requiredCourses: [
      "Matematik 1c, 2c, 3c", 
      "Fysik 1a", 
      "Kemi 1", 
      "Biologi 1"
    ],
    recommendedCourses: [
      "Matematik 4", 
      "Matematik 5", 
      "Fysik 2", 
      "Programmering 1"
    ],
    furtherEducation: [
      {
        name: "Civilingenjör",
        meritRequirements: "Matematik 4, Fysik 2 och Kemi 1",
        description: "5 år (300 hp)"
      },
      {
        name: "Läkare",
        meritRequirements: "Biologi 2, Kemi 2, Matematik 4",
        description: "5,5 år (330 hp)"
      },
      {
        name: "Apotekare",
        meritRequirements: "Kemi 2, Matematik 4",
        description: "5 år (300 hp)"
      }
    ],
    careers: [
      "Läkare", 
      "Civilingenjör", 
      "Forskare", 
      "Biomedicinare", 
      "Systemutvecklare", 
      "Matematiker", 
      "Fysiker", 
      "Meteorolog", 
      "Apotekare"
    ],
    universities: ["KTH", "Chalmers", "Uppsala Universitet", "Karolinska Institutet"],
    subjects: ["Matematik", "Fysik", "Kemi", "Biologi"],
    merit: "2.5"
  },
  {
    id: "teknik",
    name: "Teknikprogrammet",
    description: "Ett högskoleförberedande program med fokus på teknik, innovation och problemlösning. Passar dig som är intresserad av teknik och ingenjörsvetenskap.",
    meritDescription: "Ger dig 1.5-2.5 extra meritpoäng för de flesta högskoleutbildningar, särskilt tekniska utbildningar.",
    educationDescription: "Utbildningen ger dig gedigen kunskap inom teknik, fysik och matematik.",
    specializations: [
      "Informations- och medieteknik", 
      "Design och produktutveckling", 
      "Produktionsteknik", 
      "Samhällsbyggande och miljö",
      "Teknikvetenskap"
    ],
    requiredCourses: [
      "Matematik 1c, 2c, 3c", 
      "Fysik 1a", 
      "Kemi 1", 
      "Teknik 1"
    ],
    recommendedCourses: [
      "Matematik 4", 
      "Programmering 1", 
      "Webbutveckling 1", 
      "CAD 1"
    ],
    furtherEducation: [
      {
        name: "Civilingenjör",
        meritRequirements: "Matematik 4, Fysik 2",
        description: "5 år (300 hp)"
      },
      {
        name: "Högskoleingenjör",
        meritRequirements: "Matematik 3c, Fysik 2",
        description: "3 år (180 hp)"
      }
    ],
    careers: [
      "Civilingenjör", 
      "Mjukvaruutvecklare", 
      "Systemarkitekt", 
      "Produktutvecklare", 
      "Projektledare", 
      "IT-konsult", 
      "Nätverkstekniker", 
      "Webbdesigner"
    ],
    universities: ["KTH", "Chalmers", "Linköpings Universitet", "Luleå Tekniska Universitet"],
    subjects: ["Matematik", "Fysik", "Teknik", "Programmering"],
    merit: "2.0"
  },
  {
    id: "ekonomi",
    name: "Ekonomiprogrammet",
    description: "Ett högskoleförberedande program med fokus på företagsekonomi, juridik och samhällsekonomi. Passar dig som är intresserad av företagande och ekonomi.",
    meritDescription: "Ger dig 1.0-1.5 extra meritpoäng för de flesta högskoleutbildningar, särskilt ekonomiska utbildningar.",
    educationDescription: "Utbildningen ger dig kunskap om hur företag och organisationer fungerar, juridik och marknadsföring.",
    specializations: [
      "Ekonomi", 
      "Juridik"
    ],
    requiredCourses: [
      "Företagsekonomi 1", 
      "Matematik 1b, 2b", 
      "Privatjuridik", 
      "Psykologi 1"
    ],
    recommendedCourses: [
      "Företagsekonomi 2", 
      "Matematik 3b", 
      "Marknadsföring",
      "Redovisning 2"
    ],
    furtherEducation: [
      {
        name: "Civilekonom",
        meritRequirements: "Matematik 3b",
        description: "4 år (240 hp)"
      },
      {
        name: "Jurist",
        meritRequirements: "Samhällskunskap 1b, Historia 1b",
        description: "4,5 år (270 hp)"
      }
    ],
    careers: [
      "Ekonom", 
      "Redovisningskonsult", 
      "Marknadsförare", 
      "Fastighetsmäklare", 
      "Bankrådgivare", 
      "Jurist", 
      "Företagare", 
      "Controller", 
      "HR-specialist"
    ],
    universities: ["Handelshögskolan", "Stockholms Universitet", "Lunds Universitet", "Uppsala Universitet"],
    subjects: ["Företagsekonomi", "Juridik", "Samhällsekonomi", "Entreprenörskap"],
    merit: "1.5"
  }
];
