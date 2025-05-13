
export interface Program {
  id: string;
  name: string;
  description: string;
  meritDescription: string;
  educationDescription: string;
  specializations: string[];
  requiredCourses: string[];
  recommendedCourses: string[];
  furtherEducation: FurtherEducation[];
  careers: string[];
  universities: string[];
  subjects: string[];
  merit: string;
}

export interface FurtherEducation {
  name: string;
  meritRequirements: string;
  description: string;
}

export interface School {
  id: string;
  name: string;
  programs: string[];
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
    commute: string;
  };
  admissionScores: Record<string, number>;
  statistics: {
    averageGrade: number;
    completionRate: number;
    qualifiedTeachers: number;
    satisfactionRate: number;
  };
  reviews: Array<{
    rating: number;
    comment: string;
    aspect: string;
  }>;
  facilities: Record<string, string>;
  extracurricular: string[];
  events: Array<{
    name: string;
    date: string;
    time: string;
  }>;
}

export interface CompareItems {
  schools: string[];
  programs: string[];
}

export type ViewMode = 'programs' | 'compare' | 'tree' | 'programDetail';
