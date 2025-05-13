
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
  },
  // Lägger till gymnasieskolor i Göteborg
  {
    id: "hvitfeldtska",
    name: "Hvitfeldtska Gymnasiet",
    programs: ["naturvet", "samhall", "ekonomi", "humaniora"],
    location: {
      address: "Rektorsgatan 2, 411 33 Göteborg",
      coordinates: { lat: 57.6982, lng: 11.9697 },
      commute: "Centralt i Göteborg, nära Vasaplatsen"
    },
    admissionScores: {
      "naturvet": 290,
      "samhall": 270,
      "ekonomi": 255,
      "humaniora": 245
    },
    statistics: {
      averageGrade: 16.5,
      completionRate: 91,
      qualifiedTeachers: 97,
      satisfactionRate: 89
    },
    reviews: [
      { rating: 4.5, comment: "Stark akademisk miljö med stora möjligheter", aspect: "Undervisning" },
      { rating: 4.3, comment: "Historisk byggnad med fantastisk atmosfär", aspect: "Miljö" }
    ],
    facilities: {
      library: "Stort bibliotek med historisk samling",
      sportsFacilities: "Idrottshall och gym",
      cafeteria: "Rymlig matsal med bra mat"
    },
    extracurricular: [
      "Elevkår",
      "Körer",
      "Teatergrupp",
      "Debattklubb",
      "Schackförening"
    ],
    events: [
      { name: "Öppet Hus", date: "2023-11-18", time: "10:00-14:00" },
      { name: "Hvitfeldtska-dagen", date: "2023-05-15", time: "09:00-15:00" }
    ]
  },
  {
    id: "polhem",
    name: "Polhemsgymnasiet",
    programs: ["teknik", "naturvet", "industritekniska"],
    location: {
      address: "Diagnosvägen 9, 416 65 Göteborg",
      coordinates: { lat: 57.7225, lng: 12.0495 },
      commute: "Nära Frölunda Torg, goda bussförbindelser"
    },
    admissionScores: {
      "teknik": 245,
      "naturvet": 260,
      "industritekniska": 180
    },
    statistics: {
      averageGrade: 15.7,
      completionRate: 88,
      qualifiedTeachers: 94,
      satisfactionRate: 86
    },
    reviews: [
      { rating: 4.4, comment: "Excellenta tekniska resurser och laboratorium", aspect: "Utrustning" },
      { rating: 4.2, comment: "Bra samarbete med industrin och många studiebesök", aspect: "Arbetslivskoppling" }
    ],
    facilities: {
      library: "Välutrustat med teknisk litteratur",
      sportsFacilities: "Modern idrottshall",
      cafeteria: "Nyligen renoverad cafeteria"
    },
    extracurricular: [
      "Robotik",
      "Programmeringsklubb",
      "Teknikförening",
      "Idrottsföreningar"
    ],
    events: [
      { name: "Öppet Hus", date: "2023-11-20", time: "17:00-20:00" },
      { name: "Ingenjörsdagen", date: "2023-03-15", time: "09:00-15:00" }
    ]
  },
  {
    id: "katrinelund",
    name: "Katrinelundsgymnasiet",
    programs: ["ekonomi", "samhall", "vard-omsorg"],
    location: {
      address: "Skånegatan 6, 411 40 Göteborg",
      coordinates: { lat: 57.7067, lng: 11.9909 },
      commute: "Centralt beläget, nära Ullevi"
    },
    admissionScores: {
      "ekonomi": 240,
      "samhall": 235,
      "vard-omsorg": 190
    },
    statistics: {
      averageGrade: 15.1,
      completionRate: 89,
      qualifiedTeachers: 92,
      satisfactionRate: 88
    },
    reviews: [
      { rating: 4.3, comment: "Bra stämning och engagerade lärare", aspect: "Undervisning" },
      { rating: 4.2, comment: "Mycket praktik och arbetsplatsförlagt lärande", aspect: "Praktik" }
    ],
    facilities: {
      library: "Kompakt men funktionellt",
      sportsFacilities: "Samarbete med närliggande sporthallar",
      cafeteria: "Trevlig atmosfär med fräscha alternativ"
    },
    extracurricular: [
      "UF-företag",
      "Elevkår",
      "Idrottsföreningar",
      "Internationella utbyten"
    ],
    events: [
      { name: "Öppet Hus", date: "2023-11-25", time: "11:00-15:00" },
      { name: "UF-mässa", date: "2023-02-10", time: "10:00-16:00" }
    ]
  },
  {
    id: "angered",
    name: "Angeredsgymnasiet",
    programs: ["samhall", "ekonomi", "vard-omsorg", "el-energi", "fordon-transport"],
    location: {
      address: "Grepgatan 9, 424 65 Göteborg",
      coordinates: { lat: 57.8017, lng: 12.0267 },
      commute: "Nära Angereds Centrum med spårvagn"
    },
    admissionScores: {
      "samhall": 205,
      "ekonomi": 200,
      "vard-omsorg": 170,
      "el-energi": 165,
      "fordon-transport": 160
    },
    statistics: {
      averageGrade: 14.2,
      completionRate: 82,
      qualifiedTeachers: 88,
      satisfactionRate: 84
    },
    reviews: [
      { rating: 4.1, comment: "Bra stöd till elever och mindre klasser", aspect: "Undervisning" },
      { rating: 4.0, comment: "Mångkulturellt med bra språkstöd", aspect: "Studiemiljö" }
    ],
    facilities: {
      library: "Modernt och digitalt orienterat",
      sportsFacilities: "Idrottshall med klättervägg",
      cafeteria: "Kulturellt varierad meny"
    },
    extracurricular: [
      "Språkcafé",
      "Filmklubb",
      "Musikstudio",
      "Mentorprogram"
    ],
    events: [
      { name: "Öppet Hus", date: "2023-11-30", time: "15:00-19:00" },
      { name: "Kulturkväll", date: "2023-04-20", time: "17:00-20:00" }
    ]
  },
  {
    id: "ihgr",
    name: "International High School of the Gothenburg Region",
    programs: ["naturvet", "samhall", "ekonomi"],
    location: {
      address: "Molinsgatan 6, 411 33 Göteborg",
      coordinates: { lat: 57.6994, lng: 11.9757 },
      commute: "Centralt beläget i Göteborg"
    },
    admissionScores: {
      "naturvet": 285,
      "samhall": 260,
      "ekonomi": 250
    },
    statistics: {
      averageGrade: 16.3,
      completionRate: 92,
      qualifiedTeachers: 96,
      satisfactionRate: 91
    },
    reviews: [
      { rating: 4.6, comment: "Internationell miljö med hög akademisk nivå", aspect: "Internationellt" },
      { rating: 4.5, comment: "Mycket goda språkkunskaper i engelska", aspect: "Språk" }
    ],
    facilities: {
      library: "Internationellt bibliotek med böcker på flera språk",
      sportsFacilities: "Tillgång till närliggande sportanläggningar",
      cafeteria: "Internationell meny"
    },
    extracurricular: [
      "Model UN",
      "Internationella utbyten",
      "Språkklubbar",
      "Debattföreningar"
    ],
    events: [
      { name: "International Open House", date: "2023-11-18", time: "12:00-16:00" },
      { name: "Global Week", date: "2023-03-20", time: "Hela veckan" }
    ]
  },
  {
    id: "donner",
    name: "Donnergymnasiet",
    programs: ["naturvet", "teknik", "ekonomi", "samhall", "estet"],
    location: {
      address: "Gustaf Adolfs Torg 1, 411 13 Göteborg",
      coordinates: { lat: 57.7068, lng: 11.9673 },
      commute: "Mitt i centrala Göteborg, nära Brunnsparken"
    },
    admissionScores: {
      "naturvet": 275,
      "teknik": 255,
      "ekonomi": 245,
      "samhall": 240,
      "estet": 220
    },
    statistics: {
      averageGrade: 16.0,
      completionRate: 90,
      qualifiedTeachers: 94,
      satisfactionRate: 89
    },
    reviews: [
      { rating: 4.4, comment: "Välstrukturerad undervisning med tydliga mål", aspect: "Undervisning" },
      { rating: 4.3, comment: "Goda kontakter med näringsliv och universitet", aspect: "Framtid" }
    ],
    facilities: {
      library: "Nytt bibliotek med studieplatser",
      sportsFacilities: "Samarbete med lokala sportanläggningar",
      cafeteria: "Modern cafeteria med hälsoinriktad meny"
    },
    extracurricular: [
      "UF-företag",
      "Elevkår",
      "Musikförening",
      "Studiehjälpsgrupper"
    ],
    events: [
      { name: "Öppet Hus", date: "2023-11-26", time: "11:00-15:00" },
      { name: "Framtidsmässa", date: "2023-02-15", time: "09:00-16:00" }
    ]
  },
  {
    id: "burgarden",
    name: "Burgårdens Gymnasium",
    programs: ["bygg-anlaggning", "fordon-transport", "vard-omsorg", "estet"],
    location: {
      address: "Skånegatan 20, 412 51 Göteborg",
      coordinates: { lat: 57.7003, lng: 11.9953 },
      commute: "Centralt, nära Scandinavium"
    },
    admissionScores: {
      "bygg-anlaggning": 185,
      "fordon-transport": 175,
      "vard-omsorg": 180,
      "estet": 210
    },
    statistics: {
      averageGrade: 14.5,
      completionRate: 85,
      qualifiedTeachers: 90,
      satisfactionRate: 86
    },
    reviews: [
      { rating: 4.2, comment: "Mycket bra yrkesförberedande utbildningar", aspect: "Praktiskt" },
      { rating: 4.1, comment: "Goda kontakter med branschen", aspect: "Arbetslivskoppling" }
    ],
    facilities: {
      library: "Fackbibliotek med yrkesinriktad litteratur",
      sportsFacilities: "Modern idrottshall",
      cafeteria: "Stor matsal med varierad meny"
    },
    extracurricular: [
      "Branschkontakter",
      "Yrkesevent",
      "Idrottsföreningar",
      "Kreativa workshoppar"
    ],
    events: [
      { name: "Öppet Hus", date: "2023-12-01", time: "15:00-19:00" },
      { name: "Branschdag", date: "2023-04-15", time: "09:00-15:00" }
    ]
  },
  {
    id: "lindholmen",
    name: "Lindholmens Tekniska Gymnasium",
    programs: ["teknik", "el-energi", "industritekniska"],
    location: {
      address: "Anders Carlssons gata 2, 417 55 Göteborg",
      coordinates: { lat: 57.7082, lng: 11.9376 },
      commute: "På Lindholmen, tillgängligt med färja och buss"
    },
    admissionScores: {
      "teknik": 260,
      "el-energi": 195,
      "industritekniska": 190
    },
    statistics: {
      averageGrade: 15.8,
      completionRate: 88,
      qualifiedTeachers: 95,
      satisfactionRate: 87
    },
    reviews: [
      { rating: 4.5, comment: "Toppmodern utrustning och tekniklabb", aspect: "Utrustning" },
      { rating: 4.4, comment: "Nära samarbete med industrin på Lindholmen", aspect: "Innovation" }
    ],
    facilities: {
      library: "Tekniskt specialbibliotek",
      sportsFacilities: "Modern träningsanläggning",
      cafeteria: "Teknologiskt tema med god mat"
    },
    extracurricular: [
      "Teknikklubbar",
      "Robotics Challenge",
      "Innovationstävlingar",
      "Dataförening"
    ],
    events: [
      { name: "Öppet Hus", date: "2023-11-19", time: "10:00-15:00" },
      { name: "Tech Week", date: "2023-05-02", time: "Hela veckan" }
    ]
  },
  {
    id: "bernadotte",
    name: "Bernadottegymnasiet",
    programs: ["samhall", "ekonomi", "estet"],
    location: {
      address: "Skeppsbroplatsen 1, 411 18 Göteborg",
      coordinates: { lat: 57.7056, lng: 11.9625 },
      commute: "Centralt i Göteborg, vid Stenpiren"
    },
    admissionScores: {
      "samhall": 250,
      "ekonomi": 240,
      "estet": 230
    },
    statistics: {
      averageGrade: 15.9,
      completionRate: 91,
      qualifiedTeachers: 93,
      satisfactionRate: 90
    },
    reviews: [
      { rating: 4.4, comment: "Kreativ miljö med stort fokus på personlig utveckling", aspect: "Kreativitet" },
      { rating: 4.3, comment: "Bra balans mellan teori och praktiska projekt", aspect: "Balans" }
    ],
    facilities: {
      library: "Ljust och inspirerande bibliotek",
      sportsFacilities: "Dansstudio och träningshall",
      cafeteria: "Hemtrevlig cafeteria med ekologiska alternativ"
    },
    extracurricular: [
      "Kreativ verkstad",
      "Media-studio",
      "Kör",
      "Teater",
      "Debattklubb"
    ],
    events: [
      { name: "Öppet Hus", date: "2023-11-28", time: "16:00-20:00" },
      { name: "Kulturafton", date: "2023-05-25", time: "18:00-21:00" }
    ]
  }
];
