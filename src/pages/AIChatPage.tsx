
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const predefinedAnswers: Record<string, string> = {
  'Vilka gymnasieprogram finns?': 'Det finns många olika gymnasieprogram i Sverige. De delas in i högskoleförberedande program (som Naturvetenskap, Samhällsvetenskap, Teknik, Ekonomi) och yrkesprogram (som Barn och fritid, Bygg och anläggning, El och energi). Varje program har olika inriktningar.',
  'Vad krävs för att komma in på universitet?': 'För att komma in på universitet i Sverige behöver du grundläggande behörighet, vilket du får genom att gå ett högskoleförberedande program eller ett yrkesprogram med extra kurser. Dessutom kan specifika program kräva särskild behörighet med vissa kurser.',
  'Hur vet jag vilket program som passar mig?': 'Det bästa sättet är att utgå från dina intressen och styrkor. Tänk på vad du tycker om att göra och vilka ämnen du är bra på. Gör gärna vår quiz, prata med vänner, familj och lärare, och besök öppet hus på skolor du är intresserad av.',
  'Vad gör en studie- och yrkesvägledare?': 'En studie- och yrkesvägledare (SYV) hjälper dig att utforska olika utbildnings- och yrkesvägar. De kan ge information om olika program och skolor, hjälpa dig förstå dina intressen och styrkor, och stödja dig i ditt beslutsfattande.',
  'Kan jag byta program om jag ångrar mig?': 'Ja, det går att byta program under gymnasietiden, särskilt under första året. Kontakta din SYV så snart du känner att du vill byta för att diskutera möjligheterna. Tänk på att det kan innebära att du behöver läsa ikapp vissa kurser.',
};

const commonQuestions = [
  'Vilka gymnasieprogram finns?',
  'Vad krävs för att komma in på universitet?',
  'Hur vet jag vilket program som passar mig?',
  'Vad gör en studie- och yrkesvägledare?',
  'Kan jag byta program om jag ångrar mig?',
];

const AIChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Hej! Jag är din digitala studievägledare. Vad vill du veta om utbildningar och framtida yrken?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Find a predefined answer or use a generic response
    setTimeout(() => {
      let response: string;
      
      // Check if there's a predefined answer
      const lowerCaseInput = inputValue.toLowerCase();
      const matchingQuestion = Object.keys(predefinedAnswers).find(q => 
        lowerCaseInput.includes(q.toLowerCase()) || 
        q.toLowerCase().includes(lowerCaseInput)
      );
      
      if (matchingQuestion) {
        response = predefinedAnswers[matchingQuestion];
      } else {
        response = 'Det var en intressant fråga! För att få ett mer detaljerat svar, rekommenderar jag att du bokar ett samtal med en av våra studie- och yrkesvägledare som kan ge dig personlig vägledning baserad på din specifika situation.';
      }
      
      const aiMessage: Message = {
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow container mx-auto p-4">
        <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-10 mb-6 rounded-lg">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-chatt för vägledning</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Få snabba svar på vanliga frågor om utbildning och yrken
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Chat Section */}
          <div className="md:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardContent className="flex-grow p-4 overflow-hidden flex flex-col">
                <div className="flex-grow overflow-y-auto mb-4 p-2">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                    >
                      <div 
                        className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                          message.sender === 'user' 
                            ? 'bg-guidance-blue text-white' 
                            : 'bg-gray-100'
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Skriv din fråga här..."
                    className="flex-grow resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
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
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4 text-guidance-blue">Vanliga frågor</h2>
                <div className="space-y-2">
                  {commonQuestions.map((question, index) => (
                    <Button 
                      key={index} 
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2 border-guidance-green text-guidance-green hover:bg-guidance-lightGreen/50"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="font-semibold mb-2">Behöver du mer hjälp?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    För mer personlig vägledning, boka ett möte med en studie- och yrkesvägledare.
                  </p>
                  <Button asChild className="w-full bg-guidance-green hover:bg-guidance-green/90">
                    <Link to="/booking">Boka vägledningssamtal</Link>
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
