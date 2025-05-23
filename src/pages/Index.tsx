import React from 'react';
import NavBar from '@/components/NavBar';
import QuizSection from '@/components/QuizSection';
import ReflectionQuestions from '@/components/ReflectionQuestions';
import GuidanceCounselor from '@/components/GuidanceCounselor';
import ProfileSection from '@/components/ProfileSection';
import Footer from '@/components/Footer';
import GuidanceQuiz from '@/components/GuidanceQuiz';
import SYlVester from '@/components/SYlVester';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { BookOpen, MessageSquare, CalendarClock, HelpCircle, UserCircle, Monitor } from 'lucide-react';
import { useSYlVester } from '@/context/SYlVesterContext';
import { toast } from '@/components/ui/use-toast';
import { useUser } from '@/context/UserContext';

const Index = () => {
  const [showGuidanceQuiz, setShowGuidanceQuiz] = useState(false);
  const [showInterestsQuiz, setShowInterestsQuiz] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { mood, setMood } = useSYlVester();
  const { enableDemoMode } = useUser();
  const navigate = useNavigate();

  const handleStartGuidanceQuiz = () => {
    setShowGuidanceQuiz(true);
    setShowInterestsQuiz(false);
    setCurrentStep(2);
    setMood('excited');
    // Smooth scroll to quiz section
    setTimeout(() => {
      document.getElementById('quiz')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleStartInterestsQuiz = () => {
    setShowInterestsQuiz(true);
    setShowGuidanceQuiz(false);
    setCurrentStep(2);
    setMood('excited');
    // Smooth scroll to quiz section
    setTimeout(() => {
      document.getElementById('quiz')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleSYlVesterTip = (tip: string) => {
    let message = "";
    switch(tip) {
      case "Hur fungerar quizen?":
        message = "Quizen hjälper dig att hitta gymnasieprogram baserat på dina intressen. Det tar bara några minuter att göra!";
        break;
      case "Hur sparar jag program?":
        message = "När du hittat ett program du gillar, tryck på 'Spara' knappen. Du hittar alla sparade program i din profil!";
        break;
      case "Vad är en SYV?":
        message = "SYV står för Studie- och Yrkesvägledare. De hjälper dig att välja rätt utbildning. Du kan boka tid med en SYV här på sidan!";
        break;
      default:
        message = "Jag hjälper dig att hitta rätt gymnasieprogram! Gör quizen eller utforska karriärkartan för att komma igång.";
    }
    toast({
      title: "SYlVester säger:",
      description: message,
    });
  };

  const handleDemoSYV = () => {
    enableDemoMode();
    setMood('excited');
    toast({
      title: "Demo-läge aktiverat",
      description: "Du är nu i SYV demo-läge. Utforska SYV-vyn utan att logga in!",
    });
    navigate('/syv-dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section with SYlVester */}
      <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-16 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <SYlVester 
              size="lg" 
              mood="excited" 
              greeting="Hej! Jag är SYlVester och jag kommer att hjälpa dig att hitta rätt gymnasieprogram! Ska vi börja med ett quiz?"
              tips={["Hur fungerar quizen?", "Hur sparar jag program?", "Vad är en SYV?"]}
              onTipClick={handleSYlVesterTip}
              className="mb-4"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-12">Utforska dina intressen och styrkor</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Hitta gymnasieprogram som passar just dig!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={handleStartGuidanceQuiz}
              className="bg-white text-guidance-blue hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors text-lg"
            >
              Starta quizet
            </Button>
            <Link 
              to="/career-map" 
              className="bg-guidance-green hover:bg-guidance-green/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-lg"
            >
              Utforska karriärkartan
            </Link>
            <Button
              onClick={handleDemoSYV}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-lg flex items-center"
            >
              <Monitor className="mr-2 h-5 w-5" />
              Prova SYV-demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* Steps Guide Section */}
      <div className="bg-guidance-lightBlue/30 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-guidance-blue">Hur du använder Gymnasieväljaren</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className={`step-card ${currentStep >= 1 ? 'active' : ''} flex flex-col items-center p-4 rounded-lg bg-white shadow-md flex-1`}>
                <div className="step-number bg-guidance-blue text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mb-3">1</div>
                <h3 className="text-lg font-semibold mb-2 text-center">Utforska dina intressen</h3>
                <p className="text-gray-600 text-center text-sm mb-3">
                  Gör quizzet för att ta reda på vilka ämnen och aktiviteter du gillar. Det hjälper dig hitta program som passar dig.
                </p>
              </div>
              
              <div className="hidden md:block text-guidance-blue text-3xl font-light self-center">→</div>
              
              <div className={`step-card ${currentStep >= 2 ? 'active' : ''} flex flex-col items-center p-4 rounded-lg bg-white shadow-md flex-1 ${currentStep >= 2 ? 'border-2 border-guidance-green' : ''}`}>
                <div className="step-number bg-guidance-purple text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mb-3">2</div>
                <h3 className="text-lg font-semibold mb-2 text-center">Upptäck gymnasieprogram</h3>
                <p className="text-gray-600 text-center text-sm mb-3">
                  Baserat på dina svar får du förslag på program som matchar dina intressen och styrkor.
                </p>
              </div>
              
              <div className="hidden md:block text-guidance-blue text-3xl font-light self-center">→</div>
              
              <div className={`step-card ${currentStep >= 3 ? 'active' : ''} flex flex-col items-center p-4 rounded-lg bg-white shadow-md flex-1`}>
                <div className="step-number bg-guidance-green text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mb-3">3</div>
                <h3 className="text-lg font-semibold mb-2 text-center">Utforska skolor</h3>
                <p className="text-gray-600 text-center text-sm mb-3">
                  Jämför skolor och program för att hitta den bästa platsen för just dig att studera på.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Tools Section with Better Descriptions */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-guidance-blue">Verktyg för att hitta din framtid</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-center mb-4 text-guidance-green">
                  <div className="bg-guidance-lightGreen p-3 rounded-full">
                    <BookOpen className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Karriärkarta</h3>
                <p className="text-gray-600 mb-6 flex-grow text-center">
                  <span className="font-medium block mb-2">Vad är detta?</span>
                  Ett interaktivt verktyg som visar dig olika gymnasieprogram och vad de kan leda till i framtiden.
                </p>
                <p className="text-guidance-blue mb-4 text-sm">
                  <span className="font-semibold">Varför ska du använda det?</span>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    <li>Se vilka yrken du kan jobba med efter olika program</li>
                    <li>Jämföra skolor och program sida vid sida</li>
                    <li>Ta reda på vilka kurser du behöver för olika utbildningar</li>
                  </ul>
                </p>
                <Button asChild className="bg-guidance-blue hover:bg-guidance-blue/90">
                  <Link to="/career-map">Utforska karriärkartan</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-center mb-4 text-guidance-purple">
                  <div className="bg-guidance-lightPurple p-3 rounded-full">
                    <MessageSquare className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">AI-chatt</h3>
                <p className="text-gray-600 mb-6 flex-grow text-center">
                  <span className="font-medium block mb-2">Vad är detta?</span>
                  En smart chattrobot som kan svara på alla dina frågor om gymnasiet, program och framtida yrken.
                </p>
                <p className="text-guidance-purple mb-4 text-sm">
                  <span className="font-semibold">Varför ska du använda det?</span>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    <li>Få svar på frågor du är för blyg att fråga andra</li>
                    <li>Lära dig mer om olika utbildningar när som helst</li>
                    <li>Få hjälp med att förstå svåra begrepp om gymnasiet</li>
                  </ul>
                </p>
                <Button asChild className="bg-guidance-purple hover:bg-guidance-purple/90">
                  <Link to="/ai-chat">Starta AI-chatt</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-center mb-4 text-guidance-green">
                  <div className="bg-guidance-lightGreen p-3 rounded-full">
                    <CalendarClock className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Förbered för utvecklingssamtal</h3>
                <p className="text-gray-600 mb-6 flex-grow text-center">
                  <span className="font-medium block mb-2">Vad är detta?</span>
                  Verktyg som hjälper dig att förbereda, dokumentera och följa upp dina utvecklingssamtal med lärare och föräldrar.
                </p>
                <p className="text-guidance-green mb-4 text-sm">
                  <span className="font-semibold">Varför ska du använda det?</span>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    <li>Skriv ner frågor och tankar inför utvecklingssamtalet</li>
                    <li>Samla mål och önskemål från tidigare samtal</li>
                    <li>Följ upp och se din utveckling över tid</li>
                  </ul>
                </p>
                <Button asChild className="bg-guidance-green hover:bg-guidance-green/90">
                  <Link to="/utvecklingssamtal">Förbered ditt samtal</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Quiz Section */}
      {showGuidanceQuiz && <GuidanceQuiz />}
      {showInterestsQuiz && <QuizSection />}
      {!showGuidanceQuiz && !showInterestsQuiz && (
        <div className="py-12 bg-gray-50" id="quiz">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-2 text-guidance-blue">Vilken typ av quiz vill du göra?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Quiz hjälper dig att förstå dina intressen och vad som skulle passa dig. Det tar bara några minuter!
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center max-w-3xl mx-auto">
              <Card className="flex-1 hover:shadow-lg transition-shadow border-2 border-guidance-blue">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="bg-guidance-lightBlue text-guidance-blue p-3 rounded-full mb-4">
                    <HelpCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Gymnasievägledning</h3>
                  <p className="text-gray-600 mb-6">
                    Få reda på vilket gymnasieprogram som passar dig bäst baserat på dina intressen och mål.
                  </p>
                  <p className="text-guidance-blue mb-4 text-sm">
                    <span className="font-semibold">Perfekt för dig som:</span>
                    <ul className="list-disc pl-4 mt-1 space-y-1 text-left">
                      <li>Känner dig osäker på vilket program du ska välja</li>
                      <li>Vill få förslag på program baserat på vad du gillar</li>
                      <li>Behöver hjälp att komma igång med ditt gymnasieval</li>
                    </ul>
                  </p>
                  <Button 
                    onClick={handleStartGuidanceQuiz} 
                    className="bg-guidance-blue hover:bg-guidance-blue/90 w-full"
                  >
                    Starta gymnasium-quiz
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="flex-1 hover:shadow-lg transition-shadow border-2 border-guidance-purple">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="bg-guidance-lightPurple text-guidance-purple p-3 rounded-full mb-4">
                    <UserCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Personliga intressen</h3>
                  <p className="text-gray-600 mb-6">
                    Utforska vad du gillar och vad du är bra på för att förstå vilka yrken som skulle passa dig.
                  </p>
                  <p className="text-guidance-purple mb-4 text-sm">
                    <span className="font-semibold">Perfekt för dig som:</span>
                    <ul className="list-disc pl-4 mt-1 space-y-1 text-left">
                      <li>Vill lära känna dig själv bättre</li>
                      <li>Funderar över vilka ämnen du tycker är roligast</li>
                      <li>Vill veta vilka yrken som skulle passa din personlighet</li>
                    </ul>
                  </p>
                  <Button 
                    onClick={handleStartInterestsQuiz}
                    className="bg-guidance-purple hover:bg-guidance-purple/90 w-full"
                  >
                    Starta intresse-quiz
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-grow">
        {!showGuidanceQuiz && !showInterestsQuiz && (
          <>
            <ReflectionQuestions />
            <GuidanceCounselor />
            <ProfileSection />
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
