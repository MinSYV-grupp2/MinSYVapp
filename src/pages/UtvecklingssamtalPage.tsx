
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import DiscussionQuestions from '@/components/DiscussionQuestions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { Calendar, Clock, BookText, CheckSquare, ArrowRight } from 'lucide-react';
import SYlVester from '@/components/SYlVester';
import { useSYlVester } from '@/context/SYlVesterContext';

const UtvecklingssamtalPage = () => {
  const { profile } = useUser();
  const { setMood } = useSYlVester();
  const [notes, setNotes] = useState('');
  const [meetingDate, setMeetingDate] = useState('');

  const handleSaveNotes = () => {
    if (notes.trim()) {
      toast({
        title: "Anteckningar sparade",
        description: "Dina anteckningar inför utvecklingssamtalet har sparats.",
      });
      setMood('happy');
    }
  };

  const handleSYlVesterTip = (tip: string) => {
    let message = "";
    switch(tip) {
      case "Tips för förberedelse":
        message = "Skriv ner specifika frågor du vill ta upp under samtalet, och gå igenom dem med en förälder innan mötet.";
        break;
      case "Under samtalet":
        message = "Ta anteckningar under samtalet så att du kommer ihåg vad som diskuterades och vilka överenskommelser som gjordes.";
        break;
      case "Efter samtalet":
        message = "Följ upp målen ni satt tillsammans under samtalet. Kom ihåg att du kan boka tid med SYV för mer stöd.";
        break;
      default:
        message = "Förberedelser är nyckeln till ett bra utvecklingssamtal!";
    }
    toast({
      title: "SYlVester säger:",
      description: message,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-16">
          <div className="container mx-auto px-4 relative">
            <div className="absolute top-0 right-0 transform -translate-y-1/2">
              <SYlVester 
                size="md" 
                mood="thinking" 
                greeting="Förbered dig inför ditt utvecklingssamtal!"
                tips={["Tips för förberedelse", "Under samtalet", "Efter samtalet"]}
                onTipClick={handleSYlVesterTip}
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">Utvecklingssamtal</h1>
            <p className="text-xl max-w-2xl">
              Förbered dig för att få ut så mycket som möjligt av ditt utvecklingssamtal. 
              Här kan du skriva ner frågor, tankar och mål innan samtalet.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Questions Column */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-6 text-guidance-blue">Dina frågor</h2>
              <DiscussionQuestions />
            </div>
            
            {/* Notes & Preparations */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-guidance-blue">Förberedelse och anteckningar</h2>
              
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Calendar className="mr-2 text-guidance-purple" />
                    Nästa utvecklingssamtal
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="meeting-date">Datum</Label>
                      <Input 
                        id="meeting-date" 
                        type="date" 
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="meeting-time">Tid</Label>
                      <div className="flex items-center mt-1">
                        <Input id="meeting-time" type="time" className="flex-grow" />
                        <Clock className="ml-2 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <BookText className="mr-2 text-guidance-green" />
                    Mina anteckningar och tankar
                  </h3>
                  
                  <Textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Skriv ner dina tankar, mål och önskemål inför samtalet här..."
                    className="mb-4"
                    rows={6}
                  />
                  
                  <Button 
                    onClick={handleSaveNotes}
                    className="bg-guidance-green hover:bg-guidance-green/90"
                  >
                    Spara anteckningar
                  </Button>
                </CardContent>
              </Card>
              
              <div className="mt-8 bg-guidance-lightBlue rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-guidance-blue flex items-center">
                  <CheckSquare className="mr-2" />
                  Checklista inför samtalet
                </h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
                      <CheckSquare className="h-4 w-4 text-guidance-blue" />
                    </div>
                    <span>Skriv ner specifika frågor du vill ta upp</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
                      <CheckSquare className="h-4 w-4 text-guidance-blue" />
                    </div>
                    <span>Fundera över dina styrkor och vad du vill utveckla</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
                      <CheckSquare className="h-4 w-4 text-guidance-blue" />
                    </div>
                    <span>Ta med dina betyg och tidigare överenskommelser</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
                      <CheckSquare className="h-4 w-4 text-guidance-blue" />
                    </div>
                    <span>Prata med dina föräldrar om vad de tycker är viktigt att ta upp</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
                      <CheckSquare className="h-4 w-4 text-guidance-blue" />
                    </div>
                    <span>Ta med anteckningsmaterial för att skriva ner nya mål</span>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <Button variant="outline" className="text-guidance-blue border-guidance-blue hover:bg-guidance-lightBlue">
                    Ladda ned checklistan som PDF <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UtvecklingssamtalPage;
