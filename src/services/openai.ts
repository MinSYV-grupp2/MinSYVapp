
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

// Azure OpenAI Configuration - Detta skulle hanteras mer säkert i en produktionsmiljö
const AZURE_API_KEY = "O0Ab3KvNpRLHlusupPmB5qR5lpZER6UjjnhISU916OakyVXqNbzEJQQJ99BEACHYHv6XJ3w3AAAAACOGAowq"; // Skulle hanteras via en säker miljövariabel
const AZURE_ENDPOINT = "https://minsyv.openai.azure.com/"; // t.ex. "https://your-resource-name.openai.azure.com"
const AZURE_DEPLOYMENT_NAME = "gpt-4o"; // Namn på din Azure GPT-4o deployment
const AZURE_API_VERSION = "2024-11-20-preview";

// OpenAI API service
export const openaiService = {
  // Generate a chat completion from the OpenAI API
  async generateChatCompletion(messages: ChatMessage[]): Promise<string> {
    try {
      // Om Azure-konfiguration finns, använd Azure OpenAI API
      if (AZURE_API_KEY && AZURE_ENDPOINT) {
        return await this.generateAzureChatCompletion(messages);
      } else {
        throw new Error("Azure OpenAI API-konfiguration saknas. Vänligen konfigurera API-nyckeln och endpoint.");
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      toast({
        title: "AI förbindelse misslyckades",
        description: "Kunde inte ansluta till AI-tjänsten. Kontrollera API-nyckeln och försök igen.",
        variant: "destructive"
      });
      throw error; // Re-throw to handle in the component
    }
  },

  // Azure OpenAI API implementation
  async generateAzureChatCompletion(messages: ChatMessage[]): Promise<string> {
    const azureUrl = `${AZURE_ENDPOINT}/openai/deployments/${AZURE_DEPLOYMENT_NAME}/chat/completions?api-version=${AZURE_API_VERSION}`;
    
    const response = await fetch(azureUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_API_KEY
      },
      body: JSON.stringify({
        messages,
        max_tokens: 800,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from Azure OpenAI');
    }

    const data: OpenAICompletionResponse = await response.json();
    return data.choices[0].message.content;
  },

  // Extract insights from a conversation
  async extractInsightsFromConversation(messages: ChatMessage[]): Promise<AIInsight[]> {
    try {
      if (AZURE_API_KEY && AZURE_ENDPOINT) {
        // Skapa en prompt specifikt för insiktsextrahering
        const systemPrompt: ChatMessage = {
          role: 'system',
          content: `Analysera följande konversation mellan en studie- och yrkesvägledare och en elev.
          
          Extrahera relevanta insikter om elevens:
          - Intressen och hobbies (t.ex. teknik, konst, sport, musik, natur)
          - Styrkor och färdigheter (t.ex. problemlösning, kreativitet, samarbete)
          - Värderingar och drivkrafter (t.ex. hjälpa andra, karriär, kreativ frihet)
          - Utbildningsmål och preferenser (t.ex. program, ämnen, inlärningsstil)
          - Karriärmål och drömmar (t.ex. specifika yrken eller branscher)
          - Reflektioner och funderingar (t.ex. viktiga insikter om sig själv)
          
          Fokusera endast på tydliga, konkreta och relevanta insikter för studie- och yrkesvägledning.
          Undvik att extrahera känslig personlig information.
          Formulera varje insikt som en kort, tydlig mening.
          
          Formatera varje insikt som ett JSON-objekt med följande struktur:
          {
            "type": "[interest/strength/value/education/career/reflection]",
            "content": "[insikten formulerad som en tydlig mening]", 
            "confidence": [0-1 värde baserat på hur tydligt insikten framgår i konversationen]
          }
          
          Returnera alla insikter som en JSON-array.`
        };
        
        // Skapa en prompt som innehåller konversationen
        const userPrompt: ChatMessage = {
          role: 'user',
          content: `Här är konversationen att analysera:\n${messages.map(m => `${m.role}: ${m.content}`).join('\n')}`
        };
        
        // Anropa Azure API för analys
        const azureUrl = `${AZURE_ENDPOINT}/openai/deployments/${AZURE_DEPLOYMENT_NAME}/chat/completions?api-version=${AZURE_API_VERSION}`;
        
        const response = await fetch(azureUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': AZURE_API_KEY
          },
          body: JSON.stringify({
            messages: [systemPrompt, userPrompt],
            max_tokens: 1000,
            temperature: 0.3, // Lägre temperatur för mer konsekvent output
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to extract insights');
        }

        const data: OpenAICompletionResponse = await response.json();
        const insightsText = data.choices[0].message.content;
        
        // Försök parsa insikterna från text
        try {
          // Leta efter JSON-objekt i texten
          const jsonRegex = /\{[\s\S]*?\}/g;
          const matches = insightsText.match(jsonRegex);
          
          if (matches && matches.length > 0) {
            const insights: AIInsight[] = matches.map((match, index) => {
              try {
                const parsedInsight = JSON.parse(match);
                return {
                  id: (Date.now() + index).toString(),
                  type: parsedInsight.type || 'interest',
                  content: parsedInsight.content,
                  confidence: parsedInsight.confidence || 0.7,
                  source: messages[messages.length - 1]?.content || '',
                  extracted: new Date(),
                  approved: false
                };
              } catch (e) {
                console.error('Failed to parse insight:', match);
                return null;
              }
            }).filter(Boolean) as AIInsight[];
            
            return insights;
          }
        } catch (error) {
          console.error('Error parsing insights:', error);
        }
      }
      
      // Return empty array if no insights could be extracted
      return [];
    } catch (error) {
      console.error('Error extracting insights:', error);
      return [];
    }
  }
};
