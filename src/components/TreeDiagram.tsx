
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, School, GraduationCap, Briefcase, Book } from 'lucide-react';

// Career path data structure
interface PathNode {
  id: string;
  name: string;
  type: 'school' | 'program' | 'specialization' | 'individual_choice' | 'education' | 'job';
  children?: PathNode[];
}

// Mock data for the career paths with all Gothenburg high schools
const careerPathData: PathNode[] = [
  {
    id: 'school-1',
    name: 'Hvitfeldtska gymnasiet',
    type: 'school',
    children: [
      {
        id: 'program-1',
        name: 'Ekonomiprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-1',
            name: 'Ekonomi',
            type: 'specialization',
            children: [
              {
                id: 'choice-1',
                name: 'Företagsekonomi 2',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-1',
                    name: 'Civilekonomprogrammet',
                    type: 'education',
                    children: [
                      { id: 'job-1', name: 'Ekonomichef', type: 'job' },
                      { id: 'job-2', name: 'Revisor', type: 'job' }
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
        children: [
          {
            id: 'spec-2',
            name: 'Naturvetenskap',
            type: 'specialization',
            children: [
              {
                id: 'choice-2',
                name: 'Matematik 5',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-2',
                    name: 'Läkarprogrammet',
                    type: 'education',
                    children: [
                      { id: 'job-3', name: 'Läkare', type: 'job' },
                      { id: 'job-4', name: 'Kirurg', type: 'job' }
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
        children: [
          {
            id: 'spec-3',
            name: 'Musik',
            type: 'specialization',
            children: [
              {
                id: 'choice-3',
                name: 'Musikproduktion',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-3',
                    name: 'Musikproducentprogrammet',
                    type: 'education',
                    children: [
                      { id: 'job-5', name: 'Musikproducent', type: 'job' },
                      { id: 'job-6', name: 'Ljudtekniker', type: 'job' }
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
    children: [
      {
        id: 'program-4',
        name: 'Ekonomiprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-4',
            name: 'Juridik',
            type: 'specialization',
            children: [
              {
                id: 'choice-4',
                name: 'Rätten och samhället',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-4',
                    name: 'Juristprogrammet',
                    type: 'education',
                    children: [
                      { id: 'job-7', name: 'Advokat', type: 'job' },
                      { id: 'job-8', name: 'Domare', type: 'job' }
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
        children: [
          {
            id: 'spec-5',
            name: 'Design och produktutveckling',
            type: 'specialization',
            children: [
              {
                id: 'choice-5',
                name: 'CAD-teknik',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-5',
                    name: 'Civilingenjör Design',
                    type: 'education',
                    children: [
                      { id: 'job-9', name: 'Produktutvecklare', type: 'job' },
                      { id: 'job-10', name: 'Designer', type: 'job' }
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
    children: [
      {
        id: 'program-6',
        name: 'Naturvetenskapsprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-6',
            name: 'Naturvetenskap och samhälle',
            type: 'specialization',
            children: [
              {
                id: 'choice-6',
                name: 'Miljö och hållbarhet',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-6',
                    name: 'Miljövetenskapligt program',
                    type: 'education',
                    children: [
                      { id: 'job-11', name: 'Miljökonsult', type: 'job' },
                      { id: 'job-12', name: 'Hållbarhetsanalytiker', type: 'job' }
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
  
  // Get icon based on node type
  const getIcon = () => {
    switch(node.type) {
      case 'school': return <School className="mr-2" size={16} />;
      case 'program': return <Book className="mr-2" size={16} />;
      case 'education': return <GraduationCap className="mr-2" size={16} />;
      case 'job': return <Briefcase className="mr-2" size={16} />;
      default: return <ChevronRight className="mr-2" size={16} />;
    }
  };

  // Define classes based on node state
  const nodeClasses = `
    flex items-center justify-center w-12 h-12 rounded-full 
    ${isSelected ? 'bg-white border-4 border-guidance-blue' : 'bg-white border-2 border-gray-300'} 
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
            {getIcon()}
          </div>
          {hasChildren && isOpen && (
            <div className="h-8 w-0.5 bg-gray-300 my-1"></div>
          )}
        </div>
        <div className={labelClasses}>{node.name}</div>
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
        <Button 
          variant={startWithProgram ? "outline" : "default"}
          onClick={() => setStartWithProgram(false)}
          className="mr-2"
        >
          Börja med skola
        </Button>
        <Button 
          variant={startWithProgram ? "default" : "outline"}
          onClick={() => setStartWithProgram(true)}
        >
          Börja med program
        </Button>
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
                level={0}
                path={[]}
                onSelect={handleNodeSelect}
                selectedPath={selectedPath}
              />
            ))}
          </div>
        </div>
      </Card>

      {selectedPath.length > 0 && (
        <div className="mt-6">
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Din valda väg:</h4>
            <div className="text-sm text-gray-600">
              {selectedPath.map((nodeId, index) => {
                // Find the node in the data
                let currentNodes = careerPathData;
                let currentNode = null;
                let pathSegment = [...selectedPath].slice(0, index + 1);
                
                for (const id of pathSegment) {
                  currentNode = currentNodes.find(n => n.id === id);
                  if (currentNode) {
                    currentNodes = currentNode.children || [];
                  } else {
                    // Try to find in all programs if we're in program-first mode
                    if (startWithProgram) {
                      for (const school of careerPathData) {
                        for (const program of school.children || []) {
                          if (program.id === id) {
                            currentNode = program;
                            currentNodes = program.children || [];
                            break;
                          }
                        }
                        if (currentNode) break;
                      }
                    }
                  }
                }
                
                return currentNode ? (
                  <span key={nodeId} className="inline-flex items-center">
                    {index > 0 && <span className="mx-2">→</span>}
                    <span className={index === selectedPath.length - 1 ? 'font-semibold text-guidance-blue' : ''}>
                      {currentNode.name}
                    </span>
                  </span>
                ) : null;
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TreeDiagram;
