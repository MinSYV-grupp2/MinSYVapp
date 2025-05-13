
import { toast } from "@/components/ui/use-toast";

// Types for OpenAI API requests and responses
export interface ChatMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

interface OpenAICompletionRequest {
  model: string;
  messages: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}

interface OpenAIChoice {
  message: ChatMessage;
  finish_reason: string;
  index: number;
}

interface OpenAICompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenAIChoice[];
}

// Insight types for AI-extracted information
export interface AIInsight {
  id: string;
  type: 'interest' | 'strength' | 'value' | 'education' | 'career' | 'reflection';
  content: string;
  confidence: number; // 0-1 score of how confident the AI is
  source: string; // The message or conversation that generated this insight
  extracted: Date;
  approved: boolean; // Whether the user has approved this insight
}

// API Key handling - in a real app this would be server-side
// For this prototype, we'll use a placeholder approach
const API_KEY = ""; // This should be handled securely via environment variables

// OpenAI API service
export const openaiService = {
  // Generate a chat completion from the OpenAI API
  async generateChatCompletion(messages: ChatMessage[]): Promise<string> {
    try {
      if (!API_KEY || API_KEY === "") {
        // For demo purposes, return a simulated response
        return simulateGPTResponse(messages);
      }
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages,
          max_tokens: 500,
          temperature: 0.7,
        } as OpenAICompletionRequest)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to get response from OpenAI');
      }

      const data: OpenAICompletionResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      toast({
        title: "AI förbindelse misslyckades",
        description: "Kunde inte ansluta till AI-tjänsten. Använder lokala svar istället.",
        variant: "destructive"
      });
      return simulateGPTResponse(messages);
    }
  },

  // Extract insights from a conversation
  extractInsightsFromConversation(messages: ChatMessage[]): Promise<AIInsight[]> {
    // For demo purposes, this uses a simplified approach
    // In a production app, this would be a more sophisticated algorithm
    return new Promise((resolve) => {
      setTimeout(() => {
        const insights: AIInsight[] = [];
        const lastUserMessage = messages.filter(m => m.role === 'user').pop();
        
        if (lastUserMessage) {
          const text = lastUserMessage.content.toLowerCase();
          
          // Simple keyword-based extraction - this would be much more sophisticated with real GPT
          if (text.includes('teknik') || text.includes('programmering') || text.includes('datorer')) {
            insights.push({
              id: Date.now().toString(),
              type: 'interest',
              content: 'Teknik',
              confidence: 0.85,
              source: lastUserMessage.content,
              extracted: new Date(),
              approved: false
            });
          }
          
          if (text.includes('kreativ') || text.includes('skapa') || text.includes('design')) {
            insights.push({
              id: (Date.now()+1).toString(),
              type: 'interest',
              content: 'Kreativitet',
              confidence: 0.82,
              source: lastUserMessage.content,
              extracted: new Date(),
              approved: false
            });
          }
          
          if (text.includes('hjälpa') || text.includes('andra') || text.includes('människor')) {
            insights.push({
              id: (Date.now()+2).toString(),
              type: 'value',
              content: 'Hjälpa andra människor',
              confidence: 0.9,
              source: lastUserMessage.content,
              extracted: new Date(),
              approved: false
            });
          }
        }
        
        resolve(insights);
      }, 500);
    });
  }
};

// Simulated GPT response for demo purposes when no API key is available
function simulateGPTResponse(messages: ChatMessage[]): string {
  const lastMessage = messages[messages.length - 1];
  const query = lastMessage.content.toLowerCase();
  
  // Sample logic to generate relevant responses based on keywords
  if (query.includes('program') || query.includes('gymnasie')) {
    return "Det finns flera olika gymnasieprogram att välja mellan som passar olika intressen och framtidsplaner. Högskoleförberedande program som Naturvetenskap, Samhällsvetenskap och Teknik ger behörighet till universitetet, medan yrkesprogram som Vård och Omsorg, El och Energi, eller Fordon och Transport förbereder dig för att börja jobba direkt. Utifrån dina intressen kan jag hjälpa dig hitta rätt program. Vad tycker du är roligt att göra?";
  } 
  else if (query.includes('naturvetenskap')) {
    return "Naturvetenskapsprogrammet är ett högskoleförberedande program med fokus på biologi, fysik, kemi och matematik. Det passar dig som är intresserad av naturvetenskap, forskning eller vill studera till t.ex. läkare, veterinär, civilingenjör eller biolog. Programmet har hög studietakt och kräver att du gillar att fördjupa dig i naturvetenskap. Förutom de naturvetenskapliga ämnena läser du också svenska, engelska, historia och andra gymnasiegemensamma ämnen.";
  }
  else if (query.includes('samhällsvetenskap')) {
    return "Samhällsvetenskapsprogrammet ger dig kunskap om samhällsförhållanden, mänskligt beteende och internationella relationer. Du läser ämnen som samhällskunskap, historia, psykologi, och moderna språk. Det passar dig som är intresserad av hur samhället fungerar och vill arbeta med människor. Efter examen kan du studera vidare inom områden som juridik, psykologi, statsvetenskap, journalistik, socialt arbete eller ekonomi.";
  }
  else if (query.includes('intressen') || query.includes('gillar')) {
    return "Dina intressen är viktiga för att hitta rätt gymnasieprogram! Om du gillar naturvetenskap och matematik kan Naturvetenskapsprogrammet eller Teknikprogrammet passa dig. Är du mer intresserad av samhälle och människor kanske Samhällsvetenskapsprogrammet eller Ekonomiprogrammet är bättre. Tycker du om praktiskt arbete finns det yrkesprogram som Fordon, Bygg, El, Vård eller Restaurang. Vill du berätta mer om vad du tycker är roligt att göra eller lära dig om? Då kan jag ge dig mer specifika förslag.";
  }
  else if (query.includes('svårt') || query.includes('osäker')) {
    return "Det är helt normalt att känna sig osäker när man ska välja gymnasieprogram! De flesta känner så. Ett tips är att utgå från vad du tycker är intressant och roligt - vad du skulle vilja lära dig mer om. Du kan också tänka på hur du lär dig bäst - genom praktiskt arbete eller teoretiska studier? Att prata med en studie- och yrkesvägledare är också jättebra, de kan hjälpa dig att sortera dina tankar. Öppet hus på olika gymnasieskolor kan också ge dig en känsla för programmen och skolmiljön.";
  }
  else if (query.includes('ekonomi')) {
    return "Ekonomiprogrammet är ett högskoleförberedande program med fokus på företagsekonomi, entreprenörskap och juridik. Du får lära dig om ekonomiska teorier, redovisning, marknadsföring och juridiska grunder. Det passar dig som är intresserad av affärsvärlden, hur företag fungerar eller samhällsekonomi. Efter examen kan du läsa vidare till t.ex. ekonom, jurist, marknadsförare eller starta eget företag.";
  }
  else {
    return "Tack för din fråga! Som din digitala studievägledare kan jag hjälpa dig med information om olika gymnasieprogram, utbildningsvägar och karriärmöjligheter. Jag kan också ge råd om hur du kan tänka kring ditt gymnasieval baserat på dina intressen och mål. Är det något särskilt du funderar på gällande din utbildning eller framtid?";
  }
}
