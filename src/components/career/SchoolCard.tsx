
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, SplitSquareVertical, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { School } from './types';
import { findAdmissionScore } from '@/services/schoolService';
import { getScoreColor } from './utils/schoolUtils';
import SchoolProgramList from './SchoolProgramList';

interface SchoolCardProps {
  school: School;
  selectedProgramName: string;
  expandedSchool: string | null;
  toggleCompareSchool: (schoolId: string) => void;
  handleSaveProgram: (school: string) => void;
  toggleSchoolDetail: (schoolId: string) => void;
  isGothenburg?: boolean;
}

const SchoolCard = ({
  school,
  selectedProgramName,
  expandedSchool,
  toggleCompareSchool,
  handleSaveProgram,
  toggleSchoolDetail,
  isGothenburg = false,
}: SchoolCardProps) => {
  // Find admission score specifically for the selected program
  const admissionScore = findAdmissionScore(school, selectedProgramName);
  const scoreColorClass = admissionScore ? getScoreColor(admissionScore) : '';
  const borderClass = isGothenburg ? 'border-guidance-green' : 'border-gray-300';

  return (
    <Card className={`hover:shadow-md transition-shadow border-l-4 ${borderClass}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-semibold mb-2">{school.name}</h4>
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-guidance-green hover:text-guidance-purple"
                    onClick={() => toggleCompareSchool(school.id)}
                  >
                    <SplitSquareVertical className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Jämför skola</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-guidance-purple hover:text-guidance-blue"
                    onClick={() => handleSaveProgram(school.name)}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Spara som favorit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-2">{school.location.address}</div>
        
        {admissionScore ? (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs font-medium">Antagningspoäng för {selectedProgramName}:</span>
            <span className={`text-sm font-bold ${scoreColorClass}`}>
              {admissionScore}
            </span>
          </div>
        ) : (
          <div className="text-xs text-gray-500 mb-2">Antagningspoäng saknas för detta program</div>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <div className="text-xs text-gray-500">
            {school.location.commute}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => toggleSchoolDetail(school.id)}
            className="text-guidance-blue hover:bg-guidance-lightBlue p-1 h-auto"
          >
            {expandedSchool === school.id ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="ml-1 text-xs">
              {expandedSchool === school.id ? "Visa mindre" : "Visa alla program"}
            </span>
          </Button>
        </div>

        <SchoolProgramList 
          school={school}
          expanded={expandedSchool === school.id}
        />
      </CardContent>
    </Card>
  );
};

export default SchoolCard;
