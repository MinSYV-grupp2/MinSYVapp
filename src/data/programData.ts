
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
  },
  {
    id: "samhall",
    name: "Samhällsvetenskapsprogrammet",
    description: "Ett högskoleförberedande program med fokus på samhällsfrågor, människors beteende och medier. Passar dig som är intresserad av samhälle och politik.",
    meritDescription: "Ger dig 1.0-1.5 extra meritpoäng för högskoleutbildningar inom samhällsvetenskap och humaniora.",
    educationDescription: "Utbildningen ger dig fördjupad kunskap om samhällsstrukturer, mänskligt beteende och internationella relationer.",
    specializations: [
      "Beteendevetenskap", 
      "Samhällsvetenskap", 
      "Medier, information och kommunikation"
    ],
    requiredCourses: [
      "Samhällskunskap 1b", 
      "Matematik 1b, 2b", 
      "Historia 1b", 
      "Psykologi 1"
    ],
    recommendedCourses: [
      "Samhällskunskap 2", 
      "Internationella relationer", 
      "Sociologi",
      "Moderna språk"
    ],
    furtherEducation: [
      {
        name: "Socionom",
        meritRequirements: "Samhällskunskap 1b, Matematik 2a",
        description: "3,5 år (210 hp)"
      },
      {
        name: "Psykolog",
        meritRequirements: "Samhällskunskap 2, Matematik 2a",
        description: "5 år (300 hp)"
      },
      {
        name: "Statsvetenskap",
        meritRequirements: "Samhällskunskap 2",
        description: "3 år (180 hp)"
      }
    ],
    careers: [
      "Socionom", 
      "Psykolog", 
      "Lärare", 
      "Journalist", 
      "Kommunikatör", 
      "Samhällsplanerare", 
      "HR-specialist", 
      "Polis", 
      "Statsvetare"
    ],
    universities: ["Stockholms Universitet", "Göteborgs Universitet", "Lunds Universitet", "Uppsala Universitet"],
    subjects: ["Samhällskunskap", "Historia", "Psykologi", "Geografi"],
    merit: "1.5"
  },
  {
    id: "estet",
    name: "Estetiska programmet",
    description: "Ett högskoleförberedande program med fokus på kreativa och konstnärliga uttryck. Passar dig som är intresserad av musik, konst, teater eller dans.",
    meritDescription: "Ger dig 0.5-1.0 extra meritpoäng för högskoleutbildningar inom kreativa ämnen.",
    educationDescription: "Utbildningen kombinerar konstnärliga kurser med teoretiska studier för att ge en bred grund för vidare studier.",
    specializations: [
      "Musik", 
      "Bild och formgivning", 
      "Teater", 
      "Dans",
      "Estetik och media"
    ],
    requiredCourses: [
      "Estetisk kommunikation", 
      "Konstarterna och samhället", 
      "Matematik 1b", 
      "Historia 1b"
    ],
    recommendedCourses: [
      "Digitalt skapande", 
      "Formgivning", 
      "Scenisk gestaltning",
      "Kulturhistoria"
    ],
    furtherEducation: [
      {
        name: "Konsthögskola",
        meritRequirements: "Arbetsprover",
        description: "3-5 år (180-300 hp)"
      },
      {
        name: "Musikhögskola",
        meritRequirements: "Antagningsprov",
        description: "3-5 år (180-300 hp)"
      },
      {
        name: "Designutbildning",
        meritRequirements: "Portfolio",
        description: "3 år (180 hp)"
      }
    ],
    careers: [
      "Konstnär", 
      "Musiker", 
      "Skådespelare", 
      "Designer", 
      "Fotograf", 
      "Grafiker", 
      "Dansare", 
      "Lärare", 
      "Art Director"
    ],
    universities: ["Konstfack", "Kungliga Musikhögskolan", "Stockholms Konstnärliga Högskola", "HDK Valand"],
    subjects: ["Estetik", "Konst", "Musik", "Teater", "Dans"],
    merit: "0.5"
  },
  {
    id: "humaniora",
    name: "Humanistiska programmet",
    description: "Ett högskoleförberedande program med fokus på språk, kultur och historia. Passar dig som är intresserad av språk, litteratur och kulturanalys.",
    meritDescription: "Ger dig 1.0-1.5 extra meritpoäng för högskoleutbildningar inom humaniora.",
    educationDescription: "Utbildningen ger dig fördjupad kunskap inom språk, kultur och mänskliga uttrycksformer genom historien.",
    specializations: [
      "Språk", 
      "Kultur"
    ],
    requiredCourses: [
      "Filosofi 1", 
      "Moderna språk", 
      "Människans språk 1", 
      "Historia 1b"
    ],
    recommendedCourses: [
      "Latin", 
      "Litteratur", 
      "Språk (fördjupning)",
      "Klassisk grekiska"
    ],
    furtherEducation: [
      {
        name: "Språkvetenskap",
        meritRequirements: "Moderna språk steg 3",
        description: "3 år (180 hp)"
      },
      {
        name: "Litteraturvetenskap",
        meritRequirements: "Historia 2a",
        description: "3 år (180 hp)"
      },
      {
        name: "Arkeologi",
        meritRequirements: "Historia 2a",
        description: "3 år (180 hp)"
      }
    ],
    careers: [
      "Översättare", 
      "Lärare", 
      "Litteraturvetare", 
      "Bibliotekarie", 
      "Redaktör", 
      "Arkeolog", 
      "Kulturvetare", 
      "Kommunikatör"
    ],
    universities: ["Stockholms Universitet", "Uppsala Universitet", "Göteborgs Universitet", "Lunds Universitet"],
    subjects: ["Språk", "Historia", "Filosofi", "Kulturvetenskap"],
    merit: "1.0"
  },
  {
    id: "el-energi",
    name: "El- och energiprogrammet",
    description: "Ett yrkesprogram som förbereder dig för arbete inom el, automation, dator och energiteknik. Direkt yrkesinriktad utbildning med praktik.",
    meritDescription: "Ger yrkesexamen, men kan kompletteras med högskolebehörighet genom val av kurser.",
    educationDescription: "Utbildningen ger dig praktiska och teoretiska kunskaper inom el, energi och automation.",
    specializations: [
      "Automation", 
      "Elteknik", 
      "Energiteknik", 
      "Dator- och kommunikationsteknik"
    ],
    requiredCourses: [
      "Elektromekanik", 
      "Elkraftteknik", 
      "Mekatronik 1", 
      "Ellära"
    ],
    recommendedCourses: [
      "Programmerbara styrsystem", 
      "Engelska 6", 
      "Matematik 2a",
      "Servicekunskap"
    ],
    furtherEducation: [
      {
        name: "Högskoleingenjör Elkraft",
        meritRequirements: "Matematik 3c, Fysik 2 (tillval)",
        description: "3 år (180 hp)"
      },
      {
        name: "YH-utbildning Automationstekniker",
        meritRequirements: "Yrkesexamen",
        description: "2 år"
      }
    ],
    careers: [
      "Elektriker", 
      "Automationstekniker", 
      "Nätverkstekniker", 
      "Servicetekniker", 
      "Installationselektriker", 
      "Energitekniker", 
      "Drifttekniker"
    ],
    universities: ["Yrkeshögskolor", "Chalmers (med komplettering)", "KTH (med komplettering)"],
    subjects: ["Elkraft", "Automation", "Elektronik", "Energiteknik"],
    merit: "0.0"
  },
  {
    id: "vard-omsorg",
    name: "Vård- och omsorgsprogrammet",
    description: "Ett yrkesprogram som förbereder dig för arbete inom hälso- och sjukvård samt äldreomsorg. Fokus på människors hälsa och välbefinnande.",
    meritDescription: "Ger yrkesexamen, men kan kompletteras med högskolebehörighet genom val av kurser.",
    educationDescription: "Utbildningen ger dig praktiska och teoretiska kunskaper inom vård, omsorg och medicin.",
    specializations: [
      "Akutsjukvård", 
      "Äldreomsorg", 
      "Psykiatri", 
      "Funktionshinderområdet"
    ],
    requiredCourses: [
      "Hälsopedagogik", 
      "Medicin 1", 
      "Etik och människans livsvillkor", 
      "Psykiatri 1"
    ],
    recommendedCourses: [
      "Engelska 6", 
      "Matematik 2a", 
      "Specialpedagogik",
      "Palliativ vård"
    ],
    furtherEducation: [
      {
        name: "Sjuksköterska",
        meritRequirements: "Naturkunskap 2, Matematik 2a (tillval)",
        description: "3 år (180 hp)"
      },
      {
        name: "Socionom",
        meritRequirements: "Samhällskunskap 1b (tillval)",
        description: "3,5 år (210 hp)"
      }
    ],
    careers: [
      "Undersköterska", 
      "Personlig assistent", 
      "Stödassistent", 
      "Vårdbiträde", 
      "Sjuksköterska (med vidare studier)", 
      "Vårdadministratör", 
      "Hemtjänstpersonal"
    ],
    universities: ["Yrkeshögskolor", "Vårdhögskolor (med komplettering)"],
    subjects: ["Vård", "Omsorg", "Medicin", "Psykologi"],
    merit: "0.0"
  },
  {
    id: "fordon-transport",
    name: "Fordon- och transportprogrammet",
    description: "Ett yrkesprogram som ger dig kunskaper för arbete med transport, diagnostik, reparation och service av fordon och transportmedel.",
    meritDescription: "Ger yrkesexamen, men kan kompletteras med högskolebehörighet genom val av kurser.",
    educationDescription: "Praktisk utbildning kombinerad med teoretiska studier om fordon, transporter och logistik.",
    specializations: [
      "Personbilsteknik", 
      "Lastbil och mobila maskiner", 
      "Karosseri och lackering", 
      "Transport",
      "Godshantering"
    ],
    requiredCourses: [
      "Fordonsteknik", 
      "Fordons- och transportbranschens villkor", 
      "Verkstadsteknik", 
      "Fordonskunskap"
    ],
    recommendedCourses: [
      "Engelska 6", 
      "Matematik 2a", 
      "Logistik",
      "Chassi och bromsar"
    ],
    furtherEducation: [
      {
        name: "YH-utbildning Diagnostekniker",
        meritRequirements: "Yrkesexamen",
        description: "2 år"
      },
      {
        name: "Maskiningenjör",
        meritRequirements: "Matematik 3c, Fysik 2 (tillval)",
        description: "3 år (180 hp)"
      }
    ],
    careers: [
      "Bilmekaniker", 
      "Lastbilsmekaniker", 
      "Yrkesförare", 
      "Billackerare", 
      "Logistiker", 
      "Servicetekniker", 
      "Reservdelsspecialist", 
      "Transportledare"
    ],
    universities: ["Yrkeshögskolor", "Tekniska högskolor (med komplettering)"],
    subjects: ["Fordonsteknik", "Transport", "Mekanik", "Logistik"],
    merit: "0.0"
  },
  {
    id: "bygg-anlaggning",
    name: "Bygg- och anläggningsprogrammet",
    description: "Ett yrkesprogram som ger kunskaper för arbete inom husbyggnad, anläggning, måleri och plåtslageri. Praktiskt arbete med byggprojekt.",
    meritDescription: "Ger yrkesexamen, men kan kompletteras med högskolebehörighet genom val av kurser.",
    educationDescription: "Utbildningen ger dig praktiska och teoretiska kunskaper inom byggbranschen och anläggningsbranschen.",
    specializations: [
      "Husbyggnad", 
      "Anläggningsfordon", 
      "Måleri", 
      "Plåtslageri",
      "Mark och anläggning"
    ],
    requiredCourses: [
      "Husbyggnadsprocessen", 
      "Husbyggnad 1", 
      "Byggnadsmaterial", 
      "Bygg och anläggning 1"
    ],
    recommendedCourses: [
      "Engelska 6", 
      "Matematik 2a", 
      "CAD",
      "Betongkonstruktioner"
    ],
    furtherEducation: [
      {
        name: "YH-utbildning Byggproduktionsledare",
        meritRequirements: "Yrkesexamen",
        description: "2 år"
      },
      {
        name: "Högskoleingenjör Bygg",
        meritRequirements: "Matematik 3c, Fysik 2 (tillval)",
        description: "3 år (180 hp)"
      }
    ],
    careers: [
      "Snickare", 
      "Anläggningsarbetare", 
      "Målare", 
      "Murare", 
      "Betongarbetare", 
      "Plåtslagare", 
      "Anläggningsmaskinförare", 
      "Golvläggare"
    ],
    universities: ["Yrkeshögskolor", "Tekniska högskolor (med komplettering)"],
    subjects: ["Byggkunskap", "Anläggning", "Materiallära", "Konstruktion"],
    merit: "0.0"
  },
  {
    id: "industritekniska",
    name: "Industritekniska programmet",
    description: "Ett yrkesprogram för dig som vill arbeta med produktion och tillverkning inom industrin. Fokus på modern tillverkningsteknik.",
    meritDescription: "Ger yrkesexamen, men kan kompletteras med högskolebehörighet genom val av kurser.",
    educationDescription: "Utbildningen ger dig praktiska och teoretiska kunskaper inom industriell produktion och teknik.",
    specializations: [
      "Processteknik", 
      "Produkt och maskinteknik", 
      "Svetsteknik", 
      "Driftsäkerhet och underhållsteknik"
    ],
    requiredCourses: [
      "Industritekniska processer 1", 
      "Produktionskunskap 1", 
      "Människan i industrin", 
      "Produktionsutrustning 1"
    ],
    recommendedCourses: [
      "Engelska 6", 
      "Matematik 2a", 
      "Robotteknik",
      "CNC-teknik"
    ],
    furtherEducation: [
      {
        name: "YH-utbildning Produktionstekniker",
        meritRequirements: "Yrkesexamen",
        description: "2 år"
      },
      {
        name: "Högskoleingenjör Maskinteknik",
        meritRequirements: "Matematik 3c, Fysik 2 (tillval)",
        description: "3 år (180 hp)"
      }
    ],
    careers: [
      "CNC-operatör", 
      "Processoperatör", 
      "Svetsare", 
      "Underhållstekniker", 
      "Industritekniker", 
      "Verktygsmakare", 
      "Produktionstekniker", 
      "Maskinoperatör"
    ],
    universities: ["Yrkeshögskolor", "Tekniska högskolor (med komplettering)"],
    subjects: ["Processteknik", "CNC", "Automation", "Svets"],
    merit: "0.0"
  }
];
