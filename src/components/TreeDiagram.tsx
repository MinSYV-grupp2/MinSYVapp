import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, School, GraduationCap, Briefcase, Book, Layers } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Career path data structure
interface PathNode {
  id: string;
  name: string;
  type: 'school' | 'program' | 'specialization' | 'individual_choice' | 'education' | 'job';
  description?: string;
  children?: PathNode[];
}

// Mock data for the career paths with all Gothenburg high schools
const careerPathData: PathNode[] = [
  {
    id: 'school-1',
    name: 'Hvitfeldtska gymnasiet',
    type: 'school',
    description: 'Centralt belägen skola i Göteborg med flera högskoleförberedande program',
    children: [
      {
        id: 'program-1',
        name: 'Ekonomiprogrammet',
        type: 'program',
        description: 'Programmet förbereder för högre studier inom ekonomi och juridik',
        children: [
          {
            id: 'spec-1',
            name: 'Ekonomi',
            type: 'specialization',
            description: 'Fördjupning inom redovisning, kalkylering och företagande',
            children: [
              {
                id: 'choice-1',
                name: 'Företagsekonomi 2',
                type: 'individual_choice',
                description: 'Ger fördjupade kunskaper i ekonomistyrning och redovisning',
                children: [
                  {
                    id: 'edu-1',
                    name: 'Civilekonomprogrammet',
                    type: 'education',
                    description: '4-årig utbildning som leder till civilekonomexamen',
                    children: [
                      { 
                        id: 'job-1', 
                        name: 'Ekonomichef', 
                        type: 'job',
                        description: 'Ansvarar för ett företags ekonomiska planering och uppföljning' 
                      },
                      { 
                        id: 'job-2', 
                        name: 'Revisor', 
                        type: 'job',
                        description: 'Granskar företags redovisning och ekonomiska rapporter' 
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'program-2',
        name: 'Naturvetenskapsprogrammet',
        type: 'program',
        description: 'Förbereder för medicin och naturvetenskapliga studier',
        children: [
          {
            id: 'spec-2',
            name: 'Naturvetenskap',
            type: 'specialization',
            description: 'Fördjupning inom biologi, kemi och fysik',
            children: [
              {
                id: 'choice-2',
                name: 'Matematik 5',
                type: 'individual_choice',
                description: 'Ger avancerade kunskaper i matematik',
                children: [
                  {
                    id: 'edu-2',
                    name: 'Läkarprogrammet',
                    type: 'education',
                    description: '5.5-årig utbildning som leder till läkarexamen',
                    children: [
                      { 
                        id: 'job-3', 
                        name: 'Läkare', 
                        type: 'job',
                        description: 'Diagnostiserar och behandlar sjukdomar' 
                      },
                      { 
                        id: 'job-4', 
                        name: 'Kirurg', 
                        type: 'job',
                        description: 'Utför operationer för att behandla sjukdomar och skador' 
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'program-3',
        name: 'Estetiska programmet',
        type: 'program',
        description: 'Fokus på kreativa och konstnärliga uttryck',
        children: [
          {
            id: 'spec-3',
            name: 'Musik',
            type: 'specialization',
            description: 'Fördjupning inom sång, instrument och musikproduktion',
            children: [
              {
                id: 'choice-3',
                name: 'Musikproduktion',
                type: 'individual_choice',
                description: 'Ger kunskaper i inspelning, mixning och mastering',
                children: [
                  {
                    id: 'edu-3',
                    name: 'Musikproducentprogrammet',
                    type: 'education',
                    description: '2-3 årig utbildning inom musikproduktion',
                    children: [
                      { 
                        id: 'job-5', 
                        name: 'Musikproducent', 
                        type: 'job',
                        description: 'Skapar och producerar musik för artister och band' 
                      },
                      { 
                        id: 'job-6', 
                        name: 'Ljudtekniker', 
                        type: 'job',
                        description: 'Arbetar med ljudinspelning och mixning i studio och live' 
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-2',
    name: 'Polhemsgymnasiet',
    type: 'school',
    description: 'Teknisk och naturvetenskaplig profil i centrala Göteborg',
    children: [
      {
        id: 'program-4',
        name: 'Ekonomiprogrammet',
        type: 'program',
        description: 'Förbereder för ekonomiska och juridiska studier',
        children: [
          {
            id: 'spec-4',
            name: 'Juridik',
            type: 'specialization',
            description: 'Fördjupning inom rättssystemet och juridiska processer',
            children: [
              {
                id: 'choice-4',
                name: 'Rätten och samhället',
                type: 'individual_choice',
                description: 'Ger insikt i juridikens roll i samhället',
                children: [
                  {
                    id: 'edu-4',
                    name: 'Juristprogrammet',
                    type: 'education',
                    description: '4.5-årig utbildning som leder till juristexamen',
                    children: [
                      { 
                        id: 'job-7', 
                        name: 'Advokat', 
                        type: 'job',
                        description: 'Företräder klienter i rättsliga frågor' 
                      },
                      { 
                        id: 'job-8', 
                        name: 'Domare', 
                        type: 'job',
                        description: 'Dömer i rättstvister och brottmål' 
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'program-5',
        name: 'Teknikprogrammet',
        type: 'program',
        description: 'Fokus på teknik, design och innovation',
        children: [
          {
            id: 'spec-5',
            name: 'Design och produktutveckling',
            type: 'specialization',
            description: 'Fördjupning inom produktutveckling och designprocesser',
            children: [
              {
                id: 'choice-5',
                name: 'CAD-teknik',
                type: 'individual_choice',
                description: 'Ger kunskaper i datorstödd design',
                children: [
                  {
                    id: 'edu-5',
                    name: 'Civilingenjör Design',
                    type: 'education',
                    description: '4-årig utbildning inom design och produktutveckling',
                    children: [
                      { 
                        id: 'job-9', 
                        name: 'Produktutvecklare', 
                        type: 'job',
                        description: 'Utvecklar nya produkter och förbättrar befintliga' 
                      },
                      { 
                        id: 'job-10', 
                        name: 'Designer', 
                        type: 'job',
                        description: 'Skapar estetiskt tilltalande och funktionella produkter' 
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-3',
    name: 'Katrinelundsgymnasiet',
    type: 'school',
    description: 'Idrottsgymnasium med brett utbud av program',
    children: [
      {
        id: 'program-6',
        name: 'Naturvetenskapsprogrammet',
        type: 'program',
        description: 'Förbereder för studier inom naturvetenskap och medicin',
        children: [
          {
            id: 'spec-6',
            name: 'Naturvetenskap och samhälle',
            type: 'specialization',
            description: 'Kombinerar naturvetenskap med samhällsfrågor',
            children: [
              {
                id: 'choice-6',
                name: 'Miljö och hållbarhet',
                type: 'individual_choice',
                description: 'Ger kunskaper om miljöfrågor och hållbar utveckling',
                children: [
                  {
                    id: 'edu-6',
                    name: 'Miljövetenskapligt program',
                    type: 'education',
                    description: '3-årig utbildning inom miljövetenskap',
                    children: [
                      { 
                        id: 'job-11', 
                        name: 'Miljökonsult', 
                        type: 'job',
                        description: 'Ger råd om miljöfrågor till företag och organisationer' 
                      },
                      { 
                        id: 'job-12', 
                        name: 'Hållbarhetsanalytiker', 
                        type: 'job',
                        description: 'Analyserar och utvärderar hållbarhetsstrategier' 
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-4',
    name: 'Angeredsgymnasiet',
    type: 'school',
    children: [
      {
        id: 'program-7',
        name: 'Samhällsvetenskapsprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-7',
            name: 'Beteendevetenskap',
            type: 'specialization',
            children: [
              {
                id: 'choice-7',
                name: 'Psykologi 2',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-7',
                    name: 'Psykologprogrammet',
                    type: 'education',
                    children: [
                      { id: 'job-13', name: 'Psykolog', type: 'job' },
                      { id: 'job-14', name: 'HR-specialist', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'program-8',
        name: 'Vård- och omsorgsprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-8',
            name: 'Vård och omsorg',
            type: 'specialization',
            children: [
              {
                id: 'choice-8',
                name: 'Medicin 2',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-8',
                    name: 'Sjuksköterskeprogrammet',
                    type: 'education',
                    children: [
                      { id: 'job-15', name: 'Sjuksköterska', type: 'job' },
                      { id: 'job-16', name: 'Barnmorska', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-5',
    name: 'Schillerska gymnasiet',
    type: 'school',
    children: [
      {
        id: 'program-9',
        name: 'Humanistiska programmet',
        type: 'program',
        children: [
          {
            id: 'spec-9',
            name: 'Kultur',
            type: 'specialization',
            children: [
              {
                id: 'choice-9',
                name: 'Litteratur',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-9',
                    name: 'Litteraturvetenskapligt program',
                    type: 'education',
                    children: [
                      { id: 'job-17', name: 'Redaktör', type: 'job' },
                      { id: 'job-18', name: 'Författare', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-6',
    name: 'Burgårdens gymnasium',
    type: 'school',
    children: [
      {
        id: 'program-10',
        name: 'Barn- och fritidsprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-10',
            name: 'Pedagogiskt och socialt arbete',
            type: 'specialization',
            children: [
              {
                id: 'choice-10',
                name: 'Socialt arbete',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-10',
                    name: 'Socionomprogram',
                    type: 'education',
                    children: [
                      { id: 'job-19', name: 'Socionom', type: 'job' },
                      { id: 'job-20', name: 'Kurator', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-7',
    name: 'L M Engström gymnasium',
    type: 'school',
    children: [
      {
        id: 'program-11',
        name: 'Samhällsvetenskapsprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-11',
            name: 'Samhällsvetenskap',
            type: 'specialization',
            children: [
              {
                id: 'choice-11',
                name: 'Internationella relationer',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-11',
                    name: 'Internationella relationer',
                    type: 'education',
                    children: [
                      { id: 'job-21', name: 'Diplomat', type: 'job' },
                      { id: 'job-22', name: 'Biståndsarbetare', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-8',
    name: 'Kitas Gymnasium',
    type: 'school',
    children: [
      {
        id: 'program-12',
        name: 'Ekonomiprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-12',
            name: 'Ekonomi',
            type: 'specialization',
            children: [
              {
                id: 'choice-12',
                name: 'Internationell ekonomi',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-12',
                    name: 'Internationell ekonomi',
                    type: 'education',
                    children: [
                      { id: 'job-23', name: 'Nationalekonom', type: 'job' },
                      { id: 'job-24', name: 'Finansanalytiker', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-9',
    name: 'Göteborgs Högre Samskola',
    type: 'school',
    children: [
      {
        id: 'program-13',
        name: 'Naturvetenskapsprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-13',
            name: 'Naturvetenskap',
            type: 'specialization',
            children: [
              {
                id: 'choice-13',
                name: 'Kemi fördjupning',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-13',
                    name: 'Kemiingenjörsprogram',
                    type: 'education',
                    children: [
                      { id: 'job-25', name: 'Kemiingenjör', type: 'job' },
                      { id: 'job-26', name: 'Läkemedelsutvecklare', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-10',
    name: 'Bräckegymnasiet',
    type: 'school',
    children: [
      {
        id: 'program-14',
        name: 'Bygg- och anläggningsprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-14',
            name: 'Husbyggnad',
            type: 'specialization',
            children: [
              {
                id: 'choice-14',
                name: 'Betong',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-14',
                    name: 'Byggingenjörsprogrammet',
                    type: 'education',
                    children: [
                      { id: 'job-27', name: 'Byggnadsingenjör', type: 'job' },
                      { id: 'job-28', name: 'Projektledare bygg', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-11',
    name: 'NTI Gymnasiet',
    type: 'school',
    children: [
      {
        id: 'program-15',
        name: 'Teknikprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-15',
            name: 'Informations- och medieteknik',
            type: 'specialization',
            children: [
              {
                id: 'choice-15',
                name: 'Webbutveckling',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-15',
                    name: 'Datavetenskap',
                    type: 'education',
                    children: [
                      { id: 'job-29', name: 'Webbutvecklare', type: 'job' },
                      { id: 'job-30', name: 'UX-designer', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-12',
    name: 'Donnergymnasiet',
    type: 'school',
    children: [
      {
        id: 'program-16',
        name: 'Estetiska programmet',
        type: 'program',
        children: [
          {
            id: 'spec-16',
            name: 'Musik',
            type: 'specialization',
            children: [
              {
                id: 'choice-16',
                name: 'Ensemble',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-16',
                    name: 'Musikhögskolan',
                    type: 'education',
                    children: [
                      { id: 'job-31', name: 'Musiker', type: 'job' },
                      { id: 'job-32', name: 'Musiklärare', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-13',
    name: 'Drottning Blankas Gymnasieskola',
    type: 'school',
    children: [
      {
        id: 'program-17',
        name: 'Frisör- och stylistprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-17',
            name: 'Frisör',
            type: 'specialization',
            children: [
              {
                id: 'choice-17',
                name: 'Färgning',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-17',
                    name: 'Frisörmästare',
                    type: 'education',
                    children: [
                      { id: 'job-33', name: 'Frisör', type: 'job' },
                      { id: 'job-34', name: 'Frisörsalongsägare', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-14',
    name: 'Jensen Gymnasium',
    type: 'school',
    children: [
      {
        id: 'program-18',
        name: 'Ekonomiprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-18',
            name: 'Juridik',
            type: 'specialization',
            children: [
              {
                id: 'choice-18',
                name: 'Affärsjuridik',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-18',
                    name: 'Juristprogrammet',
                    type: 'education',
                    children: [
                      { id: 'job-35', name: 'Företagsjurist', type: 'job' },
                      { id: 'job-36', name: 'Förhandlare', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school-15',
    name: 'Sjölins gymnasium',
    type: 'school',
    children: [
      {
        id: 'program-19',
        name: 'Samhällsvetenskapsprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-19',
            name: 'Samhällsvetenskap',
            type: 'specialization',
            children: [
              {
                id: 'choice-19',
                name: 'Geografi',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-19',
                    name: 'Samhällsplaneringsprogram',
                    type: 'education',
                    children: [
                      { id: 'job-37', name: 'Stadsplanerare', type: 'job' },
                      { id: 'job-38', name: 'GIS-specialist', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

interface TreeNodeProps {
  node: PathNode;
  level: number;
  path: string[];
  onSelect: (node: PathNode, path: string[]) => void;
  selectedPath: string[];
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level, path, onSelect, selectedPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = [...path, node.id];
  const isSelected = selectedPath.includes(node.id);
  const isActive = isSelected || selectedPath.some(id => currentPath.includes(id));
  const hasChildren = node.children && node.children.length > 0;
  
  // Get icon and color based on node type
  const getNodeStyle = () => {
    switch(node.type) {
      case 'school': 
        return { 
          icon: <School className="mr-2" size={16} />, 
          color: 'border-guidance-purple bg-guidance-lightPurple',
          selectedColor: 'border-guidance-purple' 
        };
      case 'program': 
        return { 
          icon: <Book className="mr-2" size={16} />, 
          color: 'border-guidance-blue bg-guidance-lightBlue',
          selectedColor: 'border-guidance-blue'
        };
      case 'specialization': 
        return { 
          icon: <Layers className="mr-2" size={16} />, 
          color: 'border-guidance-green bg-guidance-lightGreen',
          selectedColor: 'border-guidance-green' 
        };
      case 'individual_choice': 
        return { 
          icon: <Book className="mr-2" size={16} />, 
          color: 'border-amber-300 bg-amber-50',
          selectedColor: 'border-amber-500'
        };
      case 'education': 
        return { 
          icon: <GraduationCap className="mr-2" size={16} />, 
          color: 'border-indigo-300 bg-indigo-50',
          selectedColor: 'border-indigo-500'
        };
      case 'job': 
        return { 
          icon: <Briefcase className="mr-2" size={16} />, 
          color: 'border-gray-300 bg-gray-50',
          selectedColor: 'border-gray-500'
        };
      default: 
        return { 
          icon: <ChevronRight className="mr-2" size={16} />, 
          color: 'border-gray-300 bg-white',
          selectedColor: 'border-guidance-blue'
        };
    }
  };

  const { icon, color, selectedColor } = getNodeStyle();

  // Define classes based on node state
  const nodeClasses = `
    flex items-center justify-center w-12 h-12 rounded-full 
    ${isSelected ? `bg-white border-4 ${selectedColor}` : `border-2 ${color}`} 
    ${isActive ? 'cursor-pointer hover:border-guidance-blue' : 'cursor-pointer opacity-60 hover:opacity-100'}
    transition-all duration-300 shadow-md
  `;

  const labelClasses = `
    ml-2 text-sm font-medium
    ${isSelected ? 'text-guidance-blue font-semibold' : 'text-gray-700'}
    ${isActive ? '' : 'opacity-60'}
  `;

  const handleClick = () => {
    onSelect(node, currentPath);
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`ml-${level > 0 ? level * 4 : 0}`}>
      <div className="flex items-center mb-2">
        <div className="flex flex-col items-center">
          <div 
            className={nodeClasses}
            onClick={handleClick}
          >
            {icon}
          </div>
          {hasChildren && isOpen && (
            <div className="h-8 w-0.5 bg-gray-300 my-1"></div>
          )}
        </div>
        <div className="flex items-center">
          <div className={labelClasses}>{node.name}</div>
          
          {node.description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 h-6 w-6 ml-1">
                    <ChevronRight size={12} className="text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p className="text-sm">{node.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {hasChildren && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 p-0 h-6 w-6"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Button>
        )}
      </div>
      
      {isOpen && hasChildren && (
        <div className="pl-8 border-l-2 border-dashed border-gray-300 ml-6">
          {node.children?.map((childNode) => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              level={level + 1}
              path={currentPath}
              onSelect={onSelect}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeDiagram: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [startWithProgram, setStartWithProgram] = useState(false);

  const handleNodeSelect = (node: PathNode, path: string[]) => {
    setSelectedPath(path);
  };

  // Get all programs across all schools
  const getAllPrograms = () => {
    const programs: PathNode[] = [];
    careerPathData.forEach(school => {
      school.children?.forEach(program => {
        programs.push({
          ...program,
          name: `${program.name} (${school.name})`
        });
      });
    });
    return programs;
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <Button 
              variant={startWithProgram ? "outline" : "default"}
              onClick={() => setStartWithProgram(false)}
              className={!startWithProgram ? "bg-guidance-blue hover:bg-guidance-blue/90 mr-2" : "mr-2"}
            >
              Börja med skola
            </Button>
            <Button 
              variant={startWithProgram ? "default" : "outline"}
              onClick={() => setStartWithProgram(true)}
              className={startWithProgram ? "bg-guidance-blue hover:bg-guidance-blue/90" : ""}
            >
              Börja med program
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-guidance-lightPurple border-2 border-guidance-purple mr-1"></div>
              <span>Skola</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-guidance-lightBlue border-2 border-guidance-blue mr-1"></div>
              <span>Program</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-guidance-lightGreen border-2 border-guidance-green mr-1"></div>
              <span>Inriktning</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-50 border-2 border-amber-300 mr-1"></div>
              <span>Kurser</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-50 border-2 border-indigo-300 mr-1"></div>
              <span>Utbildning</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-50 border-2 border-gray-300 mr-1"></div>
              <span>Yrke</span>
            </div>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <div className="p-2">
          <h3 className="text-xl font-bold mb-4 text-guidance-green">
            {startWithProgram ? "Välj program" : "Välj utbildningsväg"}
          </h3>
          
          <div className="tree-container overflow-y-auto max-h-[600px] pr-4">
            {!startWithProgram && careerPathData.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                level={0}
                path={[]}
                onSelect={handleNodeSelect}
                selectedPath={selectedPath}
              />
            ))}
            
            {startWithProgram && getAllPrograms().map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                level
