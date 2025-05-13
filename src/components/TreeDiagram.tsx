
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

interface TreeDiagramProps {
  program: string;
  specializations: string[];
  educationPaths: string[];
  careers: string[];
  selectedProgram?: string;
  programData?: any; // For accessing additional program details
}

const TreeDiagram: React.FC<TreeDiagramProps> = ({ 
  program, 
  specializations, 
  educationPaths, 
  careers,
  selectedProgram,
  programData
}) => {
  // Education path details
  const educationDetails = programData?.furtherEducation || [];
  
  // Get career details (mock data for now)
  const careerDetails: Record<string, { salary: string, outlook: string, description: string }> = {
    "Civilingenjör": { 
      salary: "45 000 - 65 000 kr/mån",
      outlook: "Mycket god arbetsmarknad",
      description: "5-årig utbildning (300 hp) som ger en bred teknisk kompetens och möjlighet till specialisering."
    },
    "Programmerare": { 
      salary: "38 000 - 55 000 kr/mån", 
      outlook: "Mycket god arbetsmarknad",
      description: "Arbetar med att utveckla och underhålla programvara för olika typer av system och plattformar."
    },
    "Läkare": { 
      salary: "48 000 - 85 000 kr/mån", 
      outlook: "Mycket god arbetsmarknad",
      description: "5,5-årig utbildning (330 hp) följt av AT-tjänstgöring. Kräver naturvetenskaplig behörighet."
    },
    "Ekonom": { 
      salary: "35 000 - 55 000 kr/mån", 
      outlook: "God arbetsmarknad",
      description: "3-4 års utbildning inom ekonomi, finans, marknadsföring eller liknande områden."
    }
  };
  
  // Function to get salary range for a career (with fallback)
  const getCareerDetail = (career: string, field: keyof (typeof careerDetails)["Civilingenjör"]) => {
    for (const key in careerDetails) {
      if (career.toLowerCase().includes(key.toLowerCase())) {
        return careerDetails[key][field];
      }
    }
    return field === 'salary' ? "35 000 - 45 000 kr/mån" : 
           field === 'outlook' ? "God arbetsmarknad" : 
           "Arbetar inom ett specialiserat område med relevanta arbetsuppgifter.";
  };

  return (
    <div className="p-4 relative">
      <div className="flex flex-col items-center">
        <div className="bg-guidance-blue text-white p-3 rounded-lg mb-2 w-64 text-center font-medium">
          {program}
        </div>
        
        <div className="w-1 h-8 bg-gray-300"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative">
          {/* Connecting lines container - positioned behind the content */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full flex justify-between px-16">
              <div className="border-t border-gray-200 w-full mt-12"></div>
            </div>
          </div>
          
          <div>
            <div className="text-center mb-2">
              <div className="bg-guidance-green text-white p-2 rounded-lg inline-block mb-2">
                Inriktningar
              </div>
            </div>
            
            <div className="space-y-2">
              {specializations.map((spec, index) => (
                <Accordion type="single" collapsible className="w-full" key={index}>
                  <AccordionItem value={`spec-${index}`} className="border-none">
                    <AccordionTrigger className={cn(
                      "border border-guidance-green rounded-lg p-2 bg-guidance-lightGreen/20 text-center hover:no-underline",
                      "hover:bg-guidance-lightGreen/30 transition-colors"
                    )}>
                      {spec}
                    </AccordionTrigger>
                    <AccordionContent className="bg-white border border-t-0 border-guidance-green/30 rounded-b-lg p-3 text-sm">
                      <p>En inriktning inom {program} som fördjupar kunskaper inom {spec.toLowerCase()}. 
                      Denna inriktning ger särskild kompetens för vidare studier eller arbete inom relaterade områden.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
                <Accordion type="single" collapsible className="w-full" key={index}>
                  <AccordionItem value={`edu-${index}`} className="border-none">
                    <AccordionTrigger className={cn(
                      "border border-indigo-400 rounded-lg p-2 bg-indigo-50 text-center hover:no-underline",
                      "hover:bg-indigo-100 transition-colors"
                    )}>
                      {edu}
                    </AccordionTrigger>
                    <AccordionContent className="bg-white border border-t-0 border-indigo-300/30 rounded-b-lg p-3 text-sm">
                      {educationDetails[index] ? (
                        <div className="space-y-1">
                          <p><span className="font-medium">Längd:</span> {educationDetails[index].description}</p>
                          <p><span className="font-medium">Krav:</span> {educationDetails[index].meritRequirements}</p>
                        </div>
                      ) : (
                        <p>Högre utbildning inom {edu.toLowerCase()} som förbereder för en karriär inom området.</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
                <Accordion type="single" collapsible className="w-full" key={index}>
                  <AccordionItem value={`career-${index}`} className="border-none">
                    <AccordionTrigger className={cn(
                      "border border-gray-400 rounded-lg p-2 bg-gray-50 text-center hover:no-underline",
                      "hover:bg-gray-100 transition-colors"
                    )}>
                      {career}
                    </AccordionTrigger>
                    <AccordionContent className="bg-white border border-t-0 border-gray-300/30 rounded-b-lg p-3 text-sm">
                      <div className="space-y-1">
                        <p><span className="font-medium">Lön:</span> {getCareerDetail(career, 'salary')}</p>
                        <p><span className="font-medium">Arbetsmarknad:</span> {getCareerDetail(career, 'outlook')}</p>
                        <p className="pt-1">{getCareerDetail(career, 'description')}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
