
import { Program } from '@/components/career/types';
import { openaiService } from '@/services/openai';
import { toast } from '@/components/ui/use-toast';

// In-memory cache to store AI-generated program information
const programInfoCache: Record<string, {
  description?: string;
  educationDescription?: string;
  furtherEducation?: {name: string; description: string}[];
  careers?: string[];
  requiredCourses?: string[];
  recommendedCourses?: string[];
  timestamp: number;
}> = {};

// Cache expiration time (24 hours in milliseconds)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

/**
 * Enhances a program with AI-generated information for missing fields
 */
export async function enhanceProgramWithAI(program: Program): Promise<Program> {
  try {
    // Check if we have valid cached data
    if (programInfoCache[program.id] && 
        (Date.now() - programInfoCache[program.id].timestamp) < CACHE_EXPIRATION) {
      console.log(`Using cached AI data for program: ${program.name}`);
      return {
        ...program,
        description: programInfoCache[program.id].description || program.description,
        educationDescription: programInfoCache[program.id].educationDescription || program.educationDescription,
        furtherEducation: programInfoCache[program.id].furtherEducation || program.furtherEducation,
        careers: programInfoCache[program.id].careers || program.careers,
        requiredCourses: programInfoCache[program.id].requiredCourses || program.requiredCourses,
        recommendedCourses: programInfoCache[program.id].recommendedCourses || program.recommendedCourses,
      };
    }

    // Determine which fields are missing and need to be enhanced
    const needsDescription = !program.description || program.description.includes("Program inom");
    const needsEducationDesc = !program.educationDescription || program.educationDescription.includes("Se skolans webbsida");
    const needsFurtherEducation = !program.furtherEducation || program.furtherEducation.length === 0;
    const needsCareers = !program.careers || program.careers.length === 0;
    const needsCourses = (!program.requiredCourses || program.requiredCourses.length === 0) && 
                         (!program.recommendedCourses || program.recommendedCourses.length === 0);
    
    // If no enhancement is needed, return the original program
    if (!needsDescription && !needsEducationDesc && !needsFurtherEducation && 
        !needsCareers && !needsCourses) {
      return program;
    }

    // Construct the prompt for the AI
    const prompt = constructAIPrompt(program, {
      needsDescription,
      needsEducationDesc,
      needsFurtherEducation,
      needsCareers,
      needsCourses
    });

    // Get AI response
    console.log(`Requesting AI enhancement for program: ${program.name}`);
    const aiResponse = await requestAIEnhancement(prompt);
    
    // Parse AI response
    const enhancedInfo = parseAIResponse(aiResponse);
    
    // Update cache
    programInfoCache[program.id] = {
      ...enhancedInfo,
      timestamp: Date.now()
    };

    // Return enhanced program
    return {
      ...program,
      description: enhancedInfo.description || program.description,
      educationDescription: enhancedInfo.educationDescription || program.educationDescription,
      furtherEducation: enhancedInfo.furtherEducation || program.furtherEducation,
      careers: enhancedInfo.careers || program.careers,
      requiredCourses: enhancedInfo.requiredCourses || program.requiredCourses,
      recommendedCourses: enhancedInfo.recommendedCourses || program.recommendedCourses,
    };
  } catch (error) {
    console.error('Error enhancing program with AI:', error);
    // Return the original program if there's an error
    return program;
  }
}

/**
 * Constructs a prompt for the AI based on which fields need enhancement
 */
function constructAIPrompt(program: Program, needs: {
  needsDescription: boolean;
  needsEducationDesc: boolean;
  needsFurtherEducation: boolean;
  needsCareers: boolean;
  needsCourses: boolean;
}): string {
  let prompt = `Du är en expert på svenska gymnasieprogram. Jag behöver information om gymnasieprogrammet "${program.name}"`;
  
  if (program.specializations && program.specializations.length > 0) {
    prompt += ` med inriktningar: ${program.specializations.join(", ")}`;
  }
  
  prompt += `. Ge mig följande information i JSON-format:\n`;
  
  if (needs.needsDescription) {
    prompt += `- "description": En detaljerad beskrivning av programmet (cirka 2-3 meningar)\n`;
  }
  
  if (needs.needsEducationDesc) {
    prompt += `- "educationDescription": Information om vad utbildningen innehåller (cirka 2-3 meningar)\n`;
  }
  
  if (needs.needsFurtherEducation) {
    prompt += `- "furtherEducation": En array med objekt som innehåller "name" och "description" för 3-5 möjliga vidareutbildningar efter gymnasiet\n`;
  }
  
  if (needs.needsCareers) {
    prompt += `- "careers": En array med 5-8 möjliga yrken efter programmet\n`;
  }
  
  if (needs.needsCourses) {
    prompt += `- "requiredCourses": En array med 3-5 viktiga kurser som ingår i programmet\n`;
    prompt += `- "recommendedCourses": En array med 2-3 valbara kurser som rekommenderas för programmet\n`;
  }
  
  prompt += `\nSvara ENDAST med JSON-data utan någon inledning eller avslutning. Inkludera bara de fält jag har bett om.`;
  
  return prompt;
}

/**
 * Sends a request to the AI service and gets the response
 */
async function requestAIEnhancement(prompt: string): Promise<string> {
  try {
    // Use the existing openaiService to get AI-generated content
    const systemPrompt = "Du är en expert på svenska gymnasieprogram och svarar med korrekt och relevant information i det format som efterfrågas.";
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ];
    
    const response = await openaiService.generateChatCompletion(messages);
    return response;
  } catch (error) {
    console.error('Error requesting AI enhancement:', error);
    toast({
      title: "Kunde inte hämta programinformation",
      description: "Det gick inte att generera detaljerad programinformation just nu. Visar tillgänglig information.",
      variant: "destructive"
    });
    throw error;
  }
}

/**
 * Parses the AI response to extract structured information
 */
function parseAIResponse(response: string): {
  description?: string;
  educationDescription?: string;
  furtherEducation?: {name: string; description: string}[];
  careers?: string[];
  requiredCourses?: string[];
  recommendedCourses?: string[];
} {
  try {
    // Try to extract JSON from the response
    const jsonRegex = /{[\s\S]*}/;
    const match = response.match(jsonRegex);
    
    if (match && match[0]) {
      const jsonData = JSON.parse(match[0]);
      return {
        description: jsonData.description,
        educationDescription: jsonData.educationDescription,
        furtherEducation: jsonData.furtherEducation,
        careers: jsonData.careers,
        requiredCourses: jsonData.requiredCourses,
        recommendedCourses: jsonData.recommendedCourses,
      };
    }
    
    throw new Error('Could not extract JSON from AI response');
  } catch (error) {
    console.error('Error parsing AI response:', error, response);
    return {}; // Return empty object if parsing fails
  }
}

/**
 * Enhance a list of programs with AI-generated information
 * This is optimized to only enhance programs that are viewed in detail
 */
export async function enhanceProgramListWithAI(programs: Program[]): Promise<Program[]> {
  // For a list view, we don't enhance all programs to save API calls
  // Just return the original list
  return programs;
}

/**
 * Clears the program info cache
 */
export function clearProgramInfoCache(): void {
  Object.keys(programInfoCache).forEach(key => {
    delete programInfoCache[key];
  });
  console.log('Program info cache cleared');
}
