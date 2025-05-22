
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, School as SchoolIcon } from 'lucide-react';
import { School } from './types';
import { isGothenburgSchool } from './utils/schoolUtils';
import SchoolCard from './SchoolCard';
import NoSchoolsMessage from './NoSchoolsMessage';
import { getSpecializationNameByCode } from '@/services/schoolService';

interface SchoolListProps {
  schools: School[] | null;
  toggleCompareSchool: (schoolId: string) => void;
  handleSaveProgram: (school: string) => void;
  selectedProgramName: string;
}

const SchoolsList = ({ schools, toggleCompareSchool, handleSaveProgram, selectedProgramName }: SchoolListProps) => {
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);
  const [specializationNames, setSpecializationNames] = useState<Record<string, string>>({});
  
  // Load specialization names
  useEffect(() => {
    let isMounted = true;
    
    async function loadSpecializationNames() {
      const specializations: Record<string, string> = {};
      
      if (schools) {
        for (const school of schools) {
          if (school.specializations?.length) {
            for (const code of school.specializations) {
              if (!specializationNames[code]) {
                try {
                  const name = await getSpecializationNameByCode(code);
                  if (isMounted) {
                    specializations[code] = name;
                  }
                } catch (error) {
                  console.error(`Error fetching specialization name for code ${code}:`, error);
                  if (isMounted) {
                    specializations[code] = "Okänd inriktning";
                  }
                }
              }
            }
          }
        }
        
        if (isMounted) {
          setSpecializationNames(prev => ({...prev, ...specializations}));
        }
      }
    }
    
    loadSpecializationNames();
    
    return () => {
      isMounted = false;
    };
  }, [schools, specializationNames]);
  
  // Handle null or empty schools
  if (!schools || schools.length === 0) {
    return <NoSchoolsMessage selectedProgramName={selectedProgramName} />;
  }
  
  // Log schools data for debugging
  console.log(`Displaying ${schools.length} schools for program: ${selectedProgramName}`);
  
  // Separate Gothenburg schools from others
  const gothenburgSchools = schools.filter(isGothenburgSchool);
  const otherSchools = schools.filter(school => !isGothenburgSchool(school));
  
  // Toggle expanded school detail
  const toggleSchoolDetail = (schoolId: string) => {
    if (expandedSchool === schoolId) {
      setExpandedSchool(null);
    } else {
      setExpandedSchool(schoolId);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-guidance-blue flex items-center">
            <SchoolIcon className="h-5 w-5 mr-2" />
            Skolor som erbjuder {selectedProgramName}
          </h3>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">
          Visar skolor som erbjuder {selectedProgramName}.
          <span className="ml-2">
            ({schools.length} {schools.length === 1 ? 'skola' : 'skolor'} totalt, 
            {gothenburgSchools.length} i Göteborg)
          </span>
        </p>
        
        {gothenburgSchools.length > 0 && (
          <>
            <h4 className="text-lg font-semibold text-guidance-green mb-3 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Gymnasieskolor i Göteborg
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({gothenburgSchools.length} {gothenburgSchools.length === 1 ? 'skola' : 'skolor'})
              </span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {gothenburgSchools.map((school) => (
                <SchoolCard 
                  key={school.id}
                  school={school}
                  selectedProgramName={selectedProgramName}
                  expandedSchool={expandedSchool}
                  toggleCompareSchool={toggleCompareSchool}
                  handleSaveProgram={handleSaveProgram}
                  toggleSchoolDetail={toggleSchoolDetail}
                  isGothenburg={true}
                  specializationNames={specializationNames}
                />
              ))}
            </div>
          </>
        )}
        
        {otherSchools.length > 0 && (
          <>
            <h4 className="text-lg font-semibold text-guidance-blue mb-3">
              Övriga skolor
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({otherSchools.length} {otherSchools.length === 1 ? 'skola' : 'skolor'})
              </span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherSchools.map((school) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  selectedProgramName={selectedProgramName}
                  expandedSchool={expandedSchool}
                  toggleCompareSchool={toggleCompareSchool}
                  handleSaveProgram={handleSaveProgram}
                  toggleSchoolDetail={toggleSchoolDetail}
                  isGothenburg={false}
                  specializationNames={specializationNames}
                />
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SchoolsList;
