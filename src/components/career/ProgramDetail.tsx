
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, TreeDeciduous, SplitSquareVertical, GraduationCap, School, BookOpen, Map, Star } from 'lucide-react';

interface ProgramDetailProps {
  selectedProgram: any;
  handleViewCareerTree: () => void;
  toggleCompareProgram: (programId: string) => void;
  handleSaveProgram: (school?: string) => void;
}

const ProgramDetail = ({ selectedProgram, handleViewCareerTree, toggleCompareProgram, handleSaveProgram }: ProgramDetailProps) => {
  return (
    <Card className="mb-8 border-l-4 border-guidance-blue">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-guidance-blue">{selectedProgram.name}</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-guidance-green text-guidance-green hover:bg-guidance-lightGreen flex gap-2 h-10"
              onClick={() => toggleCompareProgram(selectedProgram.id)}
            >
              <SplitSquareVertical className="h-4 w-4" />
              <span>Jämför</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-guidance-purple text-guidance-purple hover:bg-guidance-lightPurple flex gap-2 h-10"
              onClick={handleViewCareerTree}
            >
              <TreeDeciduous className="h-4 w-4" />
              <span>Karriärträd</span>
            </Button>
            <Button 
              className="bg-guidance-purple hover:bg-guidance-purple/90 text-white flex gap-2 h-10"
              onClick={() => handleSaveProgram()}
            >
              <Heart className="h-4 w-4" />
              <span>Spara</span>
            </Button>
          </div>
        </div>
        
        <p className="text-gray-700 mb-6">{selectedProgram.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-guidance-blue mb-3 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Programinformation
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-guidance-lightBlue p-1 rounded-full mr-2 mt-1">
                  <School className="h-3 w-3 text-guidance-blue" />
                </span>
                <div>
                  <span className="font-medium">Programpoäng:</span> 2500 poäng
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-guidance-lightBlue p-1 rounded-full mr-2 mt-1">
                  <Star className="h-3 w-3 text-guidance-blue" />
                </span>
                <div>
                  <span className="font-medium">Meritpoäng:</span> {selectedProgram.merit} extra poäng vid högskolestudier
                </div>
              </li>
            </ul>
            
            <h4 className="text-md font-medium text-guidance-blue mt-4 mb-2">Obligatoriska kurser:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
              {selectedProgram.requiredCourses?.map((course: string, index: number) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-guidance-blue mb-3 flex items-center">
              <Map className="h-5 w-5 mr-2" />
              Inriktningar
            </h3>
            <ul className="space-y-2">
              {selectedProgram.specializations?.map((specialization: string, index: number) => (
                <li key={index} className="bg-guidance-lightGreen/30 p-2 rounded text-sm">
                  {specialization}
                </li>
              ))}
            </ul>
            
            <h4 className="text-md font-medium text-guidance-blue mt-4 mb-2">Rekommenderade kurser:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
              {selectedProgram.recommendedCourses?.map((course: string, index: number) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-5">
          <h3 className="text-lg font-semibold text-guidance-purple mb-3 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2" />
            Vidare studier och karriärvägar
          </h3>
          <p className="text-gray-700 mb-4">{selectedProgram.meritDescription}</p>
          
          <h4 className="text-md font-medium text-guidance-blue mt-4 mb-2">Utbildningar detta program kan leda till:</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
            {selectedProgram.furtherEducation?.map((education: any, index: number) => (
              <li key={index}><span className="font-medium">{education.name}</span> - {education.description}</li>
            ))}
          </ul>
          
          <h4 className="text-md font-medium text-guidance-blue mt-4 mb-2">Möjliga yrken:</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedProgram.careers?.map((career: string, index: number) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {career}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramDetail;
