
import { School } from '../types';

// Helper function to determine the color based on admission score
export const getScoreColor = (score: number): string => {
  if (score >= 300) return 'text-red-600';
  if (score >= 250) return 'text-orange-500';
  if (score >= 200) return 'text-yellow-500';
  return 'text-green-600';
};

// Extract program code if present
export const extractProgramCode = (programName: string): string | null => {
  const match = programName.match(/([A-Z]{2}\d{2})/);
  return match ? match[1] : null;
};

// Function to check if a school is in Gothenburg
export const isGothenburgSchool = (school: School): boolean => {
  return school.location.address.toLowerCase().includes('göteborg') || 
         (school.name.toLowerCase().includes('göteborg') || 
          school.name.includes('polhem') || 
          school.name.includes('hvitfeldtska') || 
          school.name.includes('angered') || 
          school.name.includes('katrinelund') || 
          school.name.includes('burgård') || 
          school.name.includes('donner') || 
          school.name.includes('ihgr') || 
          school.name.includes('bernadotte') || 
          school.name.includes('lindholmen'));
};
