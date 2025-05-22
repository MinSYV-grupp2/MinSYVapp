
import { supabase } from '@/integrations/supabase/client';
import { School } from '@/components/career/types';

export async function getSchools(): Promise<School[]> {
  const { data, error } = await supabase
    .from('schools')
    .select(`
      *,
      schools_programs(program_name, admission_score, inriktningskod)
    `);

  if (error) {
    console.error('Error fetching schools:', error);
    throw error;
  }

  // Transform the Supabase data to match our School interface
  return (data || []).map(schoolData => {
    // Map the programs and admission scores from the joined data
    const programsMap: Record<string, number> = {};
    if (schoolData.schools_programs && Array.isArray(schoolData.schools_programs)) {
      schoolData.schools_programs.forEach((prog: any) => {
        if (prog.program_name && prog.admission_score) {
          programsMap[prog.program_name] = prog.admission_score;
        }
      });
    }

    return {
      id: schoolData.id,
      name: schoolData.name,
      programs: schoolData.schools_programs ? 
        schoolData.schools_programs.map((p: any) => p.program_name).filter(Boolean) : [],
      location: {
        address: schoolData.address || 'Adress saknas',
        coordinates: { lat: 0, lng: 0 },
        commute: 'Information saknas'
      },
      admissionScores: programsMap,
      statistics: {
        averageGrade: 0,
        completionRate: 0,
        qualifiedTeachers: 0,
        satisfactionRate: 0
      },
      reviews: [],
      facilities: {},
      extracurricular: [],
      events: []
    };
  });
}

export async function getSchoolById(id: string): Promise<School | null> {
  const { data, error } = await supabase
    .from('schools')
    .select(`
      *,
      schools_programs(program_name, admission_score, inriktningskod)
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // No school found with this ID
    }
    console.error('Error fetching school by ID:', error);
    throw error;
  }

  if (!data) return null;

  // Map the programs and admission scores from the joined data
  const programsMap: Record<string, number> = {};
  if (data.schools_programs && Array.isArray(data.schools_programs)) {
    data.schools_programs.forEach((prog: any) => {
      if (prog.program_name && prog.admission_score) {
        programsMap[prog.program_name] = prog.admission_score;
      }
    });
  }

  // Transform the Supabase data to match our School interface
  return {
    id: data.id,
    name: data.name,
    programs: data.schools_programs ? 
      data.schools_programs.map((p: any) => p.program_name).filter(Boolean) : [],
    location: {
      address: data.address || 'Adress saknas',
      coordinates: { lat: 0, lng: 0 },
      commute: 'Information saknas'
    },
    admissionScores: programsMap,
    statistics: {
      averageGrade: 0,
      completionRate: 0,
      qualifiedTeachers: 0,
      satisfactionRate: 0
    },
    reviews: [],
    facilities: {},
    extracurricular: [],
    events: []
  };
}
