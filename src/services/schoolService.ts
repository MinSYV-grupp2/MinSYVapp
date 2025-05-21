
import { supabase } from '@/integrations/supabase/client';
import { School } from '@/components/career/types';

export async function getSchools(): Promise<School[]> {
  const { data, error } = await supabase
    .from('schools')
    .select('*');

  if (error) {
    console.error('Error fetching schools:', error);
    throw error;
  }

  // Transform the Supabase data to match our School interface
  return (data || []).map(schoolData => ({
    id: schoolData.id,
    name: schoolData.name,
    programs: [], // This will need to be populated or handled differently
    location: {
      address: schoolData.address || 'Adress saknas',
      coordinates: { lat: 0, lng: 0 }, // Default coordinates as they're not in the DB yet
      commute: 'Information saknas'
    },
    admissionScores: {},
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
  }));
}

export async function getSchoolById(id: string): Promise<School | null> {
  const { data, error } = await supabase
    .from('schools')
    .select('*')
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

  // Transform the Supabase data to match our School interface
  return {
    id: data.id,
    name: data.name,
    programs: [], // This will need to be populated or handled differently
    location: {
      address: data.address || 'Adress saknas',
      coordinates: { lat: 0, lng: 0 }, // Default coordinates as they're not in the DB yet
      commute: 'Information saknas'
    },
    admissionScores: {},
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
