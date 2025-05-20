
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import DiscussionQuestions from '@/components/DiscussionQuestions';
import HeroSection from '@/components/utvecklingssamtal/HeroSection';
import MeetingSchedule from '@/components/utvecklingssamtal/MeetingSchedule';
import NotesSection from '@/components/utvecklingssamtal/NotesSection';
import ChecklistSection from '@/components/utvecklingssamtal/ChecklistSection';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
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
        <HeroSection onTipClick={handleSYlVesterTip} />
        
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
              
              <MeetingSchedule 
                meetingDate={meetingDate}
                onDateChange={setMeetingDate}
              />
              
              <NotesSection 
                notes={notes}
                onNotesChange={setNotes}
                onSaveNotes={handleSaveNotes}
              />
              
              <ChecklistSection />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UtvecklingssamtalPage;
