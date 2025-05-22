
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { School } from './types';
import { getScoreColor, extractProgramCode } from './utils/schoolUtils';

interface SchoolProgramListProps {
  school: School;
  expanded: boolean;
}

const SchoolProgramList = ({ school, expanded }: SchoolProgramListProps) => {
  if (!expanded) return null;

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <h5 className="text-sm font-medium text-guidance-blue mb-2 flex items-center">
        <GraduationCap className="h-4 w-4 mr-1" />
        Alla program på {school.name}:
      </h5>
      
      <div className="grid grid-cols-1 gap-2">
        {school.programs && school.programs.length > 0 ? (
          school.programs.map((program, index) => {
            const programScore = school.admissionScores[program];
            const programScoreClass = programScore ? getScoreColor(programScore) : '';
            const programCode = extractProgramCode(program);
            
            return (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                <div className="flex flex-col">
                  <span className="text-xs font-medium">{program}</span>
                  {programCode && (
                    <span className="text-xs text-gray-500">Kod: {programCode}</span>
                  )}
                </div>
                {programScore ? (
                  <span className={`text-xs font-bold ${programScoreClass}`}>
                    {programScore} poäng
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">Poäng saknas</span>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-xs text-gray-500">Ingen programinformation tillgänglig</p>
        )}
      </div>
    </div>
  );
};

export default SchoolProgramList;
