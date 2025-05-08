
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, School, GraduationCap, Briefcase, Book } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Career path data structure
interface PathNode {
  id: string;
  name: string;
  type: 'school' | 'program' | 'specialization' | 'individual_choice' | 'education' | 'job';
  children?: PathNode[];
}

// Mock data for the career paths
const careerPathData: PathNode[] = [
  {
    id: 'school-1',
    name: 'Hvitfeldtska gymnasiet',
    type: 'school',
    children: [
      {
        id: 'program-1',
        name: 'Naturvetenskapsprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-1',
            name: 'Naturvetenskap',
            type: 'specialization',
            children: [
              {
                id: 'choice-1',
                name: 'Matematik 5',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-1',
                    name: 'Civilingenjör',
                    type: 'education',
                    children: [
                      { id: 'job-1', name: 'Ingenjör', type: 'job' },
                      { id: 'job-2', name: 'Forskare', type: 'job' }
                    ]
                  },
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
              },
              {
                id: 'choice-2',
                name: 'Programmering 1',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-3',
                    name: 'Systemvetenskap',
                    type: 'education',
                    children: [
                      { id: 'job-5', name: 'Systemutvecklare', type: 'job' },
                      { id: 'job-6', name: 'IT-konsult', type: 'job' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'spec-2',
            name: 'Matematik',
            type: 'specialization',
            children: [
              {
                id: 'choice-3',
                name: 'Fysik 2',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-4',
                    name: 'Matematikprogrammet',
                    type: 'education',
                    children: [
                      { id: 'job-7', name: 'Statistiker', type: 'job' },
                      { id: 'job-8', name: 'Aktuarie', type: 'job' }
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
        name: 'Samhällsvetenskapsprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-3',
            name: 'Beteendevetenskap',
            type: 'specialization',
            children: [
              {
                id: 'choice-4',
                name: 'Psykologi 2',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-5',
                    name: 'Psykologprogrammet',
                    type: 'education',
                    children: [
                      { id: 'job-9', name: 'Psykolog', type: 'job' },
                      { id: 'job-10', name: 'HR-specialist', type: 'job' }
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
        id: 'program-3',
        name: 'Teknikprogrammet',
        type: 'program',
        children: [
          {
            id: 'spec-4',
            name: 'Informationsteknik',
            type: 'specialization',
            children: [
              {
                id: 'choice-5',
                name: 'Webbutveckling',
                type: 'individual_choice',
                children: [
                  {
                    id: 'edu-6',
                    name: 'Datavetenskapligt program',
                    type: 'education',
                    children: [
                      { id: 'job-11', name: 'Webbutvecklare', type: 'job' },
                      { id: 'job-12', name: 'UX-designer', type: 'job' }
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
