
import React from 'react';

interface TreeDiagramProps {
  program: string;
  specializations: string[];
  educationPaths: string[];
  careers: string[];
  selectedProgram?: string; // Added this optional prop
}

const TreeDiagram: React.FC<TreeDiagramProps> = ({ 
  program, 
  specializations, 
  educationPaths, 
  careers,
  selectedProgram // Make it available in component
}) => {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <div className="bg-guidance-blue text-white p-3 rounded-lg mb-2 w-64 text-center font-medium">
          {program}
        </div>
        
        <div className="w-1 h-8 bg-gray-300"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div>
            <div className="text-center mb-2">
              <div className="bg-guidance-green text-white p-2 rounded-lg inline-block mb-2">
                Inriktningar
              </div>
            </div>
            
            <div className="space-y-2">
              {specializations.map((spec, index) => (
                <div key={index} className="border border-guidance-green rounded-lg p-2 bg-guidance-lightGreen/20 text-center">
                  {spec}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="text-center mb-2">
              <div className="bg-indigo-500 text-white p-2 rounded-lg inline-block mb-2">
                Utbildningar
              </div>
            </div>
            
            <div className="space-y-2">
              {educationPaths.map((edu, index) => (
                <div key={index} className="border border-indigo-400 rounded-lg p-2 bg-indigo-50 text-center">
                  {edu}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="text-center mb-2">
              <div className="bg-gray-600 text-white p-2 rounded-lg inline-block mb-2">
                Karriärer
              </div>
            </div>
            
            <div className="space-y-2">
              {careers.slice(0, 8).map((career, index) => (
                <div key={index} className="border border-gray-400 rounded-lg p-2 bg-gray-50 text-center">
                  {career}
                </div>
              ))}
              {careers.length > 8 && (
                <div className="text-center text-gray-500 text-sm">
                  + {careers.length - 8} fler yrken
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeDiagram;
