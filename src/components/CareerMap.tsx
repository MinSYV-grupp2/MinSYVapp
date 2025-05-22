
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { SplitSquareVertical } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// Import the data
import { programData } from '@/data/programData';
// Import the school service
import { getSchools, getUniquePrograms, getSchoolsByProgram } from '@/services/schoolService';

// Import the components
import ProgramCard from '@/components/career/ProgramCard';
import ProgramDetail from '@/components/career/ProgramDetail';
import SchoolList from '@/components/career/SchoolList';
import CareerTree from '@/components/career/CareerTree';
import CompareView from '@/components/career/CompareView';
import { ViewMode, CompareItems, School } from '@/components/career/types';
import { isProgramMatch, findAdmissionScore } from '@/services/schoolService';

const CareerMap = () => {
  const { addSavedProgram } = useUser();
  const [selectedProgram, setSelectedProgram] = useState(programData[0]);
  const [viewMode, setViewMode] = useState<ViewMode>('programs');
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [compareItems, setCompareItems] = useState<CompareItems>({
    schools: [],
    programs: []
  });
  
  // Fetch all schools from Supabase
  const { data: schoolsData, isLoading: isLoadingSchools, error: schoolsError } = useQuery({
    queryKey: ['schools'],
    queryFn: getSchools
  });
  
  // Fetch unique programs from schools_programs table
  const { data: uniqueProgramsData, isLoading: isLoadingPrograms, error: programsError } = useQuery({
    queryKey: ['uniquePrograms'],
    queryFn: getUniquePrograms
  });
  
  // Fetch schools for the selected program
  const { data: schoolsByProgram, isLoading: isLoadingSchoolsByProgram } = useQuery({
    queryKey: ['schoolsByProgram', selectedProgram.id],
    queryFn: () => getSchoolsByProgram(selectedProgram.id),
    enabled: viewMode === 'programDetail' // Only run when a program is selected
  });

  // Auto-scroll to info section when a program is selected
  useEffect(() => {
    if (viewMode === 'programDetail') {
      const infoElement = document.getElementById('program-detail');
      if (infoElement) {
        infoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [viewMode]);
  
  // Get school by id
  const getSchoolById = (id: string) => {
    return schoolsData?.find(school => school.id === id);
  };
  
  // Get program by id
  const getProgramById = (id: string) => {
    return programData.find(program => program.id === id);
  };
  
  const handleSaveProgram = (schoolName?: string) => {
    const schoolToSave = schoolName || selectedSchool || "Valfri skola";
    const programId = `${Date.now().toString()}-${selectedProgram.id}`;
    
    let admissionScore = "Ej tillgänglig";
    
    if (schoolName && schoolsData) {
      // If a specific school was provided
      const school = schoolsData.find(s => s.name === schoolName);
      if (school) {
        const score = findAdmissionScore(school, selectedProgram.name);
        if (score) {
          admissionScore = score.toString();
        }
      }
    }
    
    addSavedProgram({
      id: programId,
      programName: selectedProgram.name,
      schoolName: schoolToSave,
      specialization: undefined,
      merit: admissionScore
    });
    
    toast({
      title: "Program sparat",
      description: `${selectedProgram.name} på ${schoolToSave} har lagts till i din profil. Antagningspoäng: ${admissionScore}`,
    });
  };
  
  const toggleCompareSchool = (schoolId: string) => {
    setCompareItems(prev => {
      if (prev.schools.includes(schoolId)) {
        return {
          ...prev,
          schools: prev.schools.filter(id => id !== schoolId)
        };
      } else {
        // Limit to max 3 schools for comparison
        if (prev.schools.length >= 3) {
          toast({
            title: "Max antal för jämförelse",
            description: "Du kan jämföra max 3 skolor samtidigt. Ta bort någon först.",
            variant: "destructive"
          });
          return prev;
        }
        return {
          ...prev,
          schools: [...prev.schools, schoolId]
        };
      }
    });
  };
  
  const toggleCompareProgram = (programId: string) => {
    setCompareItems(prev => {
      if (prev.programs.includes(programId)) {
        return {
          ...prev,
          programs: prev.programs.filter(id => id !== programId)
        };
      } else {
        // Limit to max 3 programs for comparison
        if (prev.programs.length >= 3) {
          toast({
            title: "Max antal för jämförelse",
            description: "Du kan jämföra max 3 program samtidigt. Ta bort någon först.",
            variant: "destructive"
          });
          return prev;
        }
        return {
          ...prev,
          programs: [...prev.programs, programId]
        };
      }
    });
  };
  
  const handleProgramSelect = (program: any) => {
    setSelectedProgram(program);
    setViewMode('programDetail');
  };
  
  const handleBackToPrograms = () => {
    setViewMode('programs');
  };
  
  const handleViewCareerTree = () => {
    setViewMode('tree');
  };
  
  const handleViewCompare = () => {
    if (compareItems.programs.length === 0 && compareItems.schools.length === 0) {
      toast({
        title: "Inget att jämföra",
        description: "Välj minst ett program eller en skola att jämföra.",
        variant: "destructive"
      });
      return;
    }
    setViewMode('compare');
  };

  const isLoading = isLoadingSchools || isLoadingPrograms || (viewMode === 'programDetail' && isLoadingSchoolsByProgram);
  const error = schoolsError || programsError;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-guidance-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Laddar data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-2">Ett fel uppstod</h3>
          <p>Det gick inte att ladda data. Vänligen försök igen senare.</p>
          <p className="text-sm mt-2">Detalj: {error instanceof Error ? error.message : 'Okänt fel'}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-guidance-blue">Utforska gymnasieprogram och framtidsvägar</h2>
          {viewMode !== 'programs' && (
            <Button 
              variant="outline"
              onClick={handleBackToPrograms}
              className="flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
              Tillbaka till programöversikt
            </Button>
          )}
        </div>
        
        <p className="text-gray-600 mb-6">
          {viewMode === 'programs' && "Välj ett gymnasieprogram nedan för att se vad det innehåller, vilka behörigheter det ger och vilka skolor som erbjuder det."}
          {viewMode === 'compare' && "Jämför olika program och skolor sida vid sida för att hitta det som passar dig bäst."}
          {viewMode === 'tree' && "Utforska hur olika utbildningsvägar hänger ihop med olika karriärval genom ett interaktivt träd."}
          {viewMode === 'programDetail' && `Utforska ${selectedProgram.name} och se vilka möjligheter det öppnar för din framtid.`}
        </p>

        {(compareItems.programs.length > 0 || compareItems.schools.length > 0) && viewMode !== 'compare' && (
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              onClick={handleViewCompare}
              className="flex items-center gap-2"
            >
              <SplitSquareVertical className="h-4 w-4" />
              Jämför valda ({compareItems.programs.length + compareItems.schools.length})
            </Button>
          </div>
        )}
      </div>

      {viewMode === 'programs' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {programData.map((program) => (
              <ProgramCard 
                key={program.id}
                program={program}
                onProgramSelect={handleProgramSelect}
              />
            ))}
          </div>
        </div>
      )}

      {viewMode === 'programDetail' && (
        <div id="program-detail">
          <ProgramDetail 
            selectedProgram={selectedProgram}
            handleViewCareerTree={handleViewCareerTree}
            toggleCompareProgram={toggleCompareProgram}
            handleSaveProgram={handleSaveProgram}
          />
          
          {schoolsByProgram && (
            <SchoolList 
              schools={schoolsByProgram}
              toggleCompareSchool={toggleCompareSchool}
              handleSaveProgram={handleSaveProgram}
              selectedProgramName={selectedProgram.name}
            />
          )}
        </div>
      )}
      
      {viewMode === 'tree' && (
        <CareerTree 
          selectedProgram={selectedProgram}
          handleSaveProgram={handleSaveProgram}
          setViewMode={setViewMode}
        />
      )}

      {viewMode === 'compare' && (
        <CompareView 
          compareItems={compareItems}
          handleBackToPrograms={handleBackToPrograms}
          toggleCompareProgram={toggleCompareProgram}
          toggleCompareSchool={toggleCompareSchool}
          getProgramById={getProgramById}
          getSchoolById={getSchoolById}
        />
      )}
    </div>
  );
};

export default CareerMap;
