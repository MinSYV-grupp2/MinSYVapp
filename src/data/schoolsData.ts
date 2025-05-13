
import { School } from '@/components/career/types';

export const schoolsData: School[] = [
  {
    id: "kungsholmen",
    name: "Kungsholmens Gymnasium",
    programs: ["naturvet", "teknik"],
    location: {
      address: "Hantverkargatan 67-69, 112 31 Stockholm",
      coordinates: { lat: 59.3315, lng: 18.0390 },
      commute: "10 min från T-Centralen"
    },
    admissionScores: {
      "naturvet": 315,
      "teknik": 280
    },
    statistics: {
      averageGrade: 17.4,
      completionRate: 94,
      qualifiedTeachers: 98,
      satisfactionRate: 92
    },
    reviews: [
      { rating: 4.7, comment: "Bra lärare och stimulerande miljö", aspect: "Undervisning" },
      { rating: 4.2, comment: "Högt tempo men bra stöd", aspect: "Svårighetsgrad" }
    ],
    facilities: {
      library: "Stort och välutrustat",
      sportsFacilities: "Idrottshall och gym",
      cafeteria: "Prisbelönt matsal"
    },
    extracurricular: [
      "Debattklubb",
      "Robotik",
      "Körer",
      "Schacklag"
    ],
    events: [
      { name: "Öppet Hus", date: "2023-11-15", time: "18:00-20:00" },
      { name: "Kungsholmen Science Fair", date: "2023-12-05", time: "13:00-16:00" }
    ]
  },
  {
    id: "norra-real",
    name: "Norra Real",
    programs: ["naturvet", "ekonomi"],
    location: {
      address: "Roslagsgatan 1, 113 55 Stockholm",
      coordinates: { lat: 59.3462, lng: 18.0573 },
      commute: "5 min från Odenplan"
    },
    admissionScores: {
      "naturvet": 305,
      "ekonomi": 290
    },
    statistics: {
      averageGrade: 16.8,
      completionRate: 92,
      qualifiedTeachers: 96,
      satisfactionRate: 90
    },
    reviews: [
      { rating: 4.6, comment: "Engagerade lärare och bra stämning", aspect: "Undervisning" },
      { rating: 4.5, comment: "Bra gemenskap och skolanda", aspect: "Trivsel" }
    ],
    facilities: {
      library: "Nytt och modernt",
      sportsFacilities: "Gym och idrottshall",
      cafeteria: "God mat och trevligt café"
    },
    extracurricular: [
      "Musikförening",
      "Debattklubb",
      "Idrottsföreningar",
      "Elevkår med många aktiviteter"
    ],
    events: [
      { name: "Öppet Hus", date: "2023-11-22", time: "17:00-19:00" },
      { name: "Julkonsert", date: "2023-12-12", time: "18:00-20:00" }
    ]
  },
  {
    id: "thorildsplan",
    name: "Thorildsplans Gymnasium",
    programs: ["teknik", "ekonomi"],
    location: {
      address: "Thorildsplan 7, 112 58 Stockholm",
      coordinates: { lat: 59.3308, lng: 18.0196 },
      commute: "Precis vid Thorildsplan T-bana"
    },
    admissionScores: {
      "teknik": 260,
      "ekonomi": 240
    },
    statistics: {
      averageGrade: 15.2,
      completionRate: 89,
      qualifiedTeachers: 95,
      satisfactionRate: 87
    },
    reviews: [
      { rating: 4.4, comment: "Stort fokus på modern teknik", aspect: "Undervisning" },
      { rating: 4.1, comment: "Bra IT-infrastruktur", aspect: "Utrustning" }
    ],
    facilities: {
      library: "Digitalt fokuserat",
      sportsFacilities: "Tillgång till närliggande idrottshall",
      cafeteria: "Cafeteria med varierat utbud"
    },
    extracurricular: [
      "E-sportförening",
      "Programmeringsklubb",
      "Entreprenörskapsprojekt"
    ],
    events: [
      { name: "Öppet Hus", date: "2023-11-25", time: "10:00-13:00" },
      { name: "Tech Demo Day", date: "2023-12-08", time: "14:00-17:00" }
    ]
  }
];
