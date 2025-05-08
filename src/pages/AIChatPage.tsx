
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

// Sample AI responses for different education-related queries
const aiResponseDatabase = {
  programs: [
    "Det finns många olika gymnasieprogram att välja mellan. De huvudsakliga kategorierna är högskoleförberedande program (som Naturvetenskapsprogrammet, Samhällsvetenskapsprogrammet, Ekonomiprogrammet) och yrkesprogram (som Bygg- och anläggningsprogrammet, Vård- och omsorgsprogrammet).",
    "Högskoleförberedande program ger grundläggande behörighet till högskola/universitet, medan yrkesprogram förbereder dig för att börja jobba direkt efter gymnasiet.",
  ],
  naturvetenskap: [
    "Naturvetenskapsprogrammet är ett högskoleförberedande program med fokus på matematik, fysik, kemi och biologi.",
    "Det passar dig som är intresserad av vetenskap, forskning, medicin eller ingenjörsyrken.",
    "Efter programmet kan du studera vidare inom områden som medicin, ingenjörsvetenskap, naturvetenskap m.m."
  ],
  samhällsvetenskap: [
    "Samhällsvetenskapsprogrammet ger dig kunskaper om samhällsförhållanden i Sverige och världen.",
    "Det passar dig som är intresserad av människor, samhälle, historia, och kultur.",
    "Efter programmet kan du studera vidare inom områden som juridik, psykologi, media, lärare, polis m.m."
  ],
  ekonomi: [
    "Ekonomiprogrammet ger dig kunskaper inom företagsekonomi, entreprenörskap och juridik.",
    "Det passar dig som är intresserad av ekonomi, företagande och samhällsfrågor.",
    "Efter programmet kan du studera vidare inom områden som ekonomi, marknadsföring, juridik m.m."
  ],
  teknik: [
    "Teknikprogrammet ger dig kunskap om teknikutveckling och tekniska processer.",
    "Det passar dig som är intresserad av datorer, programmering, design eller ingenjörsyrken.",
    "Efter programmet kan du studera vidare inom områden som ingenjörsvetenskap, arkitektur, datavetenskap m.m."
  ],
  betyg: [
    "Betygen från grundskolan är viktiga för att komma in på önskat gymnasieprogram.",
    "Det är dina 17 bästa betyg från grundskolan som räknas och ger ditt meritvärde.",
    "Olika gymnasieprogram och skolor har olika antagningspoäng beroende på hur många som söker."
  ],
  after_gymnasium: [
    "Efter gymnasiet har du flera alternativ: studera vidare på högskola/universitet, börja jobba, starta eget företag, eller ta ett sabbatsår för att fundera på vad du vill göra.",
    "Om du gått ett högskoleförberedande program har du grundläggande behörighet till högskola/universitet.",
    "Om du gått ett yrkesprogram kan du börja jobba direkt, eller komplettera med kurser för högskolebehörighet."
  ],
  default: [
    "Jag är här för att hjälpa dig med frågor om gymnasieval, utbildning och framtida karriärvägar.",
    "Du kan fråga mig om olika gymnasieprogram, behörighetskrav, eller vad olika utbildningar kan leda till.",
    "Om du vill ha mer personlig vägledning rekommenderar jag att du bokar ett möte med en studie- och yrkesvägledare."
  ]
};

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
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hej! Jag är din digitala studie- och yrkesvägledare. Jag kan svara på frågor om gymnasieprogram, utbildningar och karriärvägar. Vad undrar du över?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const newUserMessage = { text: inputMessage, isUser: true };
    setMessages([...messages, newUserMessage]);
    setInputMessage("");
    
    // Simulate AI thinking
    setIsTyping(true);
    
    setTimeout(() => {
      // Find appropriate response based on keywords in the user's message
      const userMessageLower = inputMessage.toLowerCase();
      let responseText: string[] = [];
      
      if (userMessageLower.includes("program") || userMessageLower.includes("gymnasie")) {
        responseText = aiResponseDatabase.programs;
      } else if (userMessageLower.includes("naturvetenskap") || userMessageLower.includes("natur")) {
        responseText = aiResponseDatabase.naturvetenskap;
      } else if (userMessageLower.includes("samhällsvetenskap") || userMessageLower.includes("samhäll")) {
        responseText = aiResponseDatabase.samhällsvetenskap;
      } else if (userMessageLower.includes("ekonomi")) {
        responseText = aiResponseDatabase.ekonomi;
      } else if (userMessageLower.includes("teknik")) {
        responseText = aiResponseDatabase.teknik;
      } else if (userMessageLower.includes("betyg") || userMessageLower.includes("poäng")) {
        responseText = aiResponseDatabase.betyg;
      } else if (userMessageLower.includes("efter gymnasiet") || userMessageLower.includes("universitet") || 
                userMessageLower.includes("högskola") || userMessageLower.includes("jobb")) {
        responseText = aiResponseDatabase.after_gymnasium;
      } else if (userMessageLower.includes("boka") || userMessageLower.includes("träffa") || 
                userMessageLower.includes("syv") || userMessageLower.includes("vägledare")) {
        responseText = ["Du kan boka tid med en studie- och yrkesvägledare under fliken 'Boka SYV' i menyn, eller genom att klicka på knappen nedan."];
      } else {
        responseText = aiResponseDatabase.default;
      }
      
      // Join response paragraphs with line breaks
      const aiResponse = { text: responseText.join("\n\n"), isUser: false };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    // Wait a moment before sending to make it feel more natural
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="bg-gradient-to-r from-guidance-purple to-guidance-blue text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-chatt</h1>
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
                {/* Chat Messages */}
                <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
                  {messages.map((message, index) => (
                    <div 
                      key={index}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.isUser 
                            ? 'bg-guidance-blue text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.text.split("\n\n").map((paragraph, i) => (
                          <p key={i} className={i > 0 ? 'mt-2' : ''}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-800">
                        <p>Skriver...</p>
                      </div>
                    </div>
                  )}
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
