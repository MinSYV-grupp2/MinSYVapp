
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SYlVester from '@/components/SYlVester';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useSYlVester } from '@/context/SYlVesterContext';
import { useUser } from '@/context/UserContext';
import { openaiService, ChatMessage, AIInsight } from '@/services/openai';
import AIInsightsPreview from '@/components/AIInsightsPreview';

// Common questions that students might ask
const suggestedQuestions = [
  "Vilka gymnasieprogram finns det?",
  "Vad är Naturvetenskapsprogrammet?",
  "Vad är Samhällsvetenskapsprogrammet?",
  "Vad är Ekonomiprogrammet?",
  "Vad är Teknikprogrammet?",
  "Hur viktiga är mina betyg?",
  "Vad kan jag göra efter gymnasiet?",
  "Hur bokar jag ett möte med en SYV?",
];

const AIChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hej! Jag är SYlVester, din digitala studie- och yrkesvägledare. Jag kan svara på frågor om gymnasieprogram, utbildningar och karriärvägar. Vad undrar du över?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pendingInsights, setPendingInsights] = useState<AIInsight[]>([]);
  const { setMood } = useSYlVester();
  const { addChatMessage, addAIInsight } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage: ChatMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    addChatMessage('user', inputMessage);
    setInputMessage("");
    
    // Simulate AI thinking
    setIsTyping(true);
    setMood('thinking');

    try {
      // Prepare context for the AI
      const context: ChatMessage = {
        role: 'system',
        content: "Du är SYlVester, en digital studie- och yrkesvägledare för gymnasieelever i Sverige. " +
                 "Du hjälper elever att utforska olika gymnasieprogram, förstå sina intressen och " +
                 "planera sina framtida utbildnings- och karriärvägar. Du är positiv, uppmuntrande " +
                 "och pedagogisk. Du svarar alltid på svenska."
      };
      
      // Get chat history for context but limit it to last 10 messages
      const recentMessages = [...messages.slice(-10), userMessage];
      
      // Generate AI response
      const aiContent = await openaiService.generateChatCompletion([context, ...recentMessages]);
      
      // Add AI response to chat
      const aiMessage: ChatMessage = { role: 'assistant', content: aiContent };
      setMessages(prev => [...prev, aiMessage]);
      addChatMessage('assistant', aiContent);
      
      // Extract insights from the conversation
      const insights = await openaiService.extractInsightsFromConversation([...recentMessages, aiMessage]);
      
      if (insights.length > 0) {
        setPendingInsights(insights);
      }
    } catch (error) {
      console.error('Error in chat:', error);
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte processa ditt meddelande. Försök igen senare.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
      setMood('happy');
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    // Wait a moment before sending to make it feel more natural
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleSYlVesterTip = (tip: string) => {
    let question = "";
    switch(tip) {
      case "Vad kan jag fråga om?":
        question = "Vad kan du hjälpa mig med?";
        break;
      case "Hur fungerar chatten?":
        question = "Hur fungerar den här chatten?";
        break;
      case "Vilka program finns?":
        question = "Vilka gymnasieprogram finns det?";
        break;
      default:
        question = tip;
    }
    setInputMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleApproveInsight = (insightId: string) => {
    const insight = pendingInsights.find(i => i.id === insightId);
    if (insight) {
      addAIInsight({...insight, approved: true});
      setPendingInsights(prev => prev.filter(i => i.id !== insightId));
      toast({
        title: "Insikt sparad",
        description: `"${insight.content}" har sparats till din profil.`,
      });
    }
  };

  const handleRejectInsight = (insightId: string) => {
    setPendingInsights(prev => prev.filter(i => i.id !== insightId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="bg-gradient-to-r from-guidance-purple to-guidance-blue text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Chatta med SYlVester</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Få svar på dina frågor om gymnasieval, utbildning och framtidsvägar
          </p>
        </div>
      </div>
      
      <div className="flex-grow py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6">
          {/* Chat Container */}
          <div className="flex-grow md:w-2/3">
            <Card className="h-[600px] flex flex-col">
              <CardContent className="p-4 flex flex-col h-full">
                {/* SYlVester at the top of chat */}
                <div className="flex justify-center mb-4">
                  <SYlVester 
                    size="md" 
                    mood="happy" 
                    greeting="Hej! Jag är SYlVester! Ställ dina frågor om gymnasiet och olika program här!"
                    tips={["Vad kan jag fråga om?", "Hur fungerar chatten?", "Vilka program finns?"]}
                    onTipClick={handleSYlVesterTip}
                  />
                </div>
                
                {/* Chat Messages */}
                <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
                  {/* AI Insights Preview */}
                  {pendingInsights.length > 0 && (
                    <AIInsightsPreview 
                      insights={pendingInsights}
                      onApprove={handleApproveInsight}
                      onReject={handleRejectInsight}
                    />
                  )}
                
                  {messages.map((message, index) => (
                    <div 
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="mr-2 flex-shrink-0">
                          <div className="w-8 h-8 bg-guidance-lightPurple rounded-full flex items-center justify-center">
                            <SYlVester size="sm" className="m-0 p-0" />
                          </div>
                        </div>
                      )}
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === 'user' 
                            ? 'bg-guidance-blue text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.content.split("\n\n").map((paragraph, i) => (
                          <p key={i} className={i > 0 ? 'mt-2' : ''}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="mr-2 flex-shrink-0">
                        <div className="w-8 h-8 bg-guidance-lightPurple rounded-full flex items-center justify-center">
                          <SYlVester size="sm" className="m-0 p-0" mood="thinking" />
                        </div>
                      </div>
                      <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-800">
                        <p>Skriver...</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Chat Input */}
                <div className="flex gap-2">
                  <Input 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Skriv din fråga här..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-grow"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-guidance-purple hover:bg-guidance-purple/90"
                  >
                    Skicka
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/3">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-4">Vanliga frågor</h3>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-bold text-lg mb-4">Behöver du mer hjälp?</h3>
                  <p className="text-gray-600 mb-4">
                    Våra studie- och yrkesvägledare finns här för att hjälpa dig med mer specifika frågor och personlig vägledning.
                  </p>
                  <Button 
                    asChild
                    className="w-full bg-guidance-green hover:bg-guidance-green/90"
                  >
                    <Link to="/booking">Boka tid med SYV</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AIChatPage;
