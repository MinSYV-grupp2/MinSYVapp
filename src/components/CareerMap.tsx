import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { programData } from '@/data/programData';
import { findAdmissionScore, getPrograms } from '@/services/schoolService';
import { ViewMode, CompareItems, Program } from '@/components/career/types';
import { useSchoolsData } from '@/components/career/hooks/useSchoolsData';
import { useProgramSchools } from '@/components/career/hooks/useProgramSchools';
import { getSchoolById, getProgramById } from '@/components/career/utils/careerMapUtils';
import { LoadingState, ErrorState } from '@/components/career/LoadingAndErrorStates';
import { ViewActions, getCompareToast } from '@/components/career/ViewActions';
import ProgramsGrid from '@/components/career/views/ProgramsGrid';
import ProgramDetailsView from '@/components/career/views/ProgramDetailsView';
import CareerTreeView from '@/components/career/views/CareerTreeView';
import CompareItemsView from '@/components/career/views/CompareItemsView';
import { SplitSquareVertical } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const CareerMap = () => {
  const { addSavedProgram } = useUser();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('programs');
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [compareItems, setCompareItems] = useState<CompareItems>({
    schools: [],
    programs: []
  });
  
  // Fetch programs from database with stale time for better caching
  const {
    data: dbPrograms,
    isLoading: isLoadingDbPrograms,
    error: dbProgramsError
  } = useQuery({
    queryKey: ['programs'],
    queryFn: getPrograms,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2 // Retry failed requests twice
  });
  
  // Custom hooks for data fetching
  const { 
    schoolsData, 
    isLoadingSchools, 
    isLoadingPrograms, 
    schoolsError, 
    programsError 
  } = useSchoolsData();
  
  // Initialize selectedProgram when dbPrograms load
  useEffect(() => {
    if (dbPrograms && dbPrograms.length > 0 && !selectedProgram) {
      setSelectedProgram(dbPrograms[0]);
    }
  }, [dbPrograms, selectedProgram]);
  
  // Only call useProgramSchools if we have a selectedProgram
  const { 
    schoolsByProgram, 
    programSpecializations,
    isLoadingSchoolsByProgram 
  } = useProgramSchools(selectedProgram, viewMode);

  // Auto-scroll to info section when a program is selected
  useEffect(() => {
    if (viewMode === 'programDetail') {
      const infoElement = document.getElementById('program-detail');
      if (infoElement) {
        infoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [viewMode]);
  
  const handleSaveProgram = (schoolName?: string) => {
    if (!selectedProgram) return;
    
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
          getCompareToast();
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
          getCompareToast();
          return prev;
        }
        return {
          ...prev,
          programs: [...prev.programs, programId]
        };
      }
    });
  };
  
  const handleProgramSelect = (program: Program) => {
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

  const isLoading = isLoadingSchools || isLoadingPrograms || isLoadingDbPrograms || 
                   (viewMode === 'programDetail' && isLoadingSchoolsByProgram && selectedProgram);
  const error = schoolsError || programsError || dbProgramsError;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState error={error} />
      </div>
    );
  }

  // Fallback to hardcoded data if database programs failed to load
  const displayPrograms = dbPrograms && dbPrograms.length > 0 ? dbPrograms : programData;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-guidance-blue">Utforska gymnasieprogram och framtidsvägar</h2>
          <ViewActions 
            viewMode={viewMode} 
            compareItems={compareItems}
            handleBackToPrograms={handleBackToPrograms}
            handleViewCompare={handleViewCompare}
          />
        </div>
        
        <p className="text-gray-600 mb-6">
          {viewMode === 'programs' && "Välj ett gymnasieprogram nedan för att se vad det innehåller, vilka behörigheter det ger och vilka skolor som erbjuder det."}
          {viewMode === 'compare' && "Jämför olika program och skolor sida vid sida för att hitta det som passar dig bäst."}
          {viewMode === 'tree' && "Utforska hur olika utbildningsvägar hänger ihop med olika karriärval genom ett interaktivt träd."}
          {viewMode === 'programDetail' && selectedProgram && `Utforska ${selectedProgram.name} och se vilka möjligheter det öppnar för din framtid.`}
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
        <ProgramsGrid 
          programData={displayPrograms} 
          onProgramSelect={handleProgramSelect} 
        />
      )}

      {viewMode === 'programDetail' && selectedProgram && (
        <ProgramDetailsView
          selectedProgram={selectedProgram}
          schoolsByProgram={schoolsByProgram}
          programSpecializations={programSpecializations}
          isLoadingSchoolsByProgram={isLoadingSchoolsByProgram}
          handleViewCareerTree={handleViewCareerTree}
          toggleCompareProgram={toggleCompareProgram}
          handleSaveProgram={handleSaveProgram}
        />
      )}
      
      {viewMode === 'tree' && selectedProgram && (
        <CareerTreeView
          selectedProgram={selectedProgram}
          handleSaveProgram={handleSaveProgram}
          setViewMode={setViewMode}
        />
      )}

      {viewMode === 'compare' && (
        <CompareItemsView
          compareItems={compareItems}
          handleBackToPrograms={handleBackToPrograms}
          toggleCompareProgram={toggleCompareProgram}
          toggleCompareSchool={toggleCompareSchool}
          getProgramById={async (id) => {
            // For comparison view, try to get enhanced program data
            if (dbPrograms) {
              const programFromDb = dbPrograms.find(p => p.id === id);
              if (programFromDb) {
                try {
                  // Use the school service to get an AI-enhanced program
                  const enhancedProgram = await getProgramById(id);
                  return enhancedProgram || programFromDb;
                } catch (error) {
                  console.error('Error fetching enhanced program for comparison:', error);
                  return programFromDb;
                }
              }
            }
            return getProgramById(id, programData);
          }}
          getSchoolById={(id) => getSchoolById(schoolsData, id)}
        />
      )}
    </div>
  );
};

export default CareerMap;
