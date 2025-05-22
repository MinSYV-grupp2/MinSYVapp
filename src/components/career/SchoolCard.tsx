
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { School } from './types';
import { Button } from '@/components/ui/button';
import { findAdmissionScore } from '@/services/schoolService';
import { Bookmark, FileHeart, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface SchoolCardProps {
  school: School;
  selectedProgramName: string;
  expandedSchool: string | null;
  toggleCompareSchool: (schoolId: string) => void;
  handleSaveProgram: (schoolName: string) => void;
  toggleSchoolDetail: (schoolId: string) => void;
  isGothenburg: boolean;
  specializationNames?: Record<string, string>;
}

const SchoolCard = ({ 
  school, 
  selectedProgramName, 
  expandedSchool,
  toggleCompareSchool,
  handleSaveProgram,
  toggleSchoolDetail,
  isGothenburg,
  specializationNames = {}
}: SchoolCardProps) => {
  const isExpanded = expandedSchool === school.id;
  const admissionScore = findAdmissionScore(school, selectedProgramName);
  
  return (
    <div className={`border rounded-lg overflow-hidden ${isGothenburg ? 'bg-guidance-lightGreen/10' : 'bg-white'}`}>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{school.name}</h3>
        
        {school.location.address && (
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            {school.location.address}
          </p>
        )}
        
        <div className="mt-3">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700">Antagningspoäng:</span>
            <span className="ml-2 text-sm">
              {admissionScore ? admissionScore : 'Uppgift saknas'}
            </span>
          </div>
          
          {school.specializations && school.specializations.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700 mb-1">Inriktningar:</p>
              <div className="flex flex-wrap gap-1">
                {school.specializations.map((code, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {specializationNames[code] || code}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => toggleSchoolDetail(school.id)}
            className="text-xs px-2 py-1 h-auto"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                Mindre info
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                Mer info
              </>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSaveProgram(school.name)}
            className="text-xs px-2 py-1 h-auto text-guidance-purple"
          >
            <FileHeart className="h-3 w-3 mr-1" />
            Spara
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 pt-0 border-t mt-2">
          <div className="text-sm">
            <p className="font-medium mb-1">Program:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {school.programs.map((program, index) => (
                <li key={index}>{program}</li>
              ))}
            </ul>
            
            <Button
              onClick={() => toggleCompareSchool(school.id)}
              variant="outline"
              size="sm"
              className="mt-3 w-full text-xs"
            >
              <Bookmark className="h-3 w-3 mr-1" />
              Jämför denna skola
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolCard;
