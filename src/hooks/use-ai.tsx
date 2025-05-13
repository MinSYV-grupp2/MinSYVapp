
import { useState, useCallback } from 'react';
import { ChatMessage, AIInsight, openaiService } from '@/services/openai';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addChatMessage } = useUser();

  const sendMessage = useCallback(async (
    userMessage: string,
    systemPrompt: string = "Du är SYlVester, en digital studie- och yrkesvägledare för gymnasieelever i Sverige som svarar på svenska.",
    previousMessages: ChatMessage[] = []
  ): Promise<{ response: string, insights: AIInsight[] }> => {
    setLoading(true);
    setError(null);
    
    try {
      // Create system message
      const systemMessage: ChatMessage = {
        role: 'system',
        content: systemPrompt
      };
      
      // Create user message
      const newUserMessage: ChatMessage = {
        role: 'user',
        content: userMessage
      };
      
      // Store the user message
      addChatMessage('user', userMessage);
      
      // Create the messages array for the API call
      const messages = [systemMessage, ...previousMessages, newUserMessage];
      
      // Get AI response
      const aiResponse = await openaiService.generateChatCompletion(messages);
      
      // Store the AI response
      addChatMessage('assistant', aiResponse);
      
      // Extract insights
      const insights = await openaiService.extractInsightsFromConversation([
        ...previousMessages,
        newUserMessage,
        { role: 'assistant', content: aiResponse }
      ]);
      
      return {
        response: aiResponse,
        insights
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte processa ditt meddelande",
        variant: "destructive"
      });
      return {
        response: "Jag kunde tyvärr inte bearbeta ditt meddelande just nu. Försök gärna igen senare.",
        insights: []
      };
    } finally {
      setLoading(false);
    }
  }, [addChatMessage]);

  return {
    sendMessage,
    loading,
    error
  };
};
