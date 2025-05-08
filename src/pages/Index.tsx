
import React from 'react';
import NavBar from '@/components/NavBar';
import QuizSection from '@/components/QuizSection';
import ReflectionQuestions from '@/components/ReflectionQuestions';
import GuidanceCounselor from '@/components/GuidanceCounselor';
import ProfileSection from '@/components/ProfileSection';
import Footer from '@/components/Footer';
import GuidanceQuiz from '@/components/GuidanceQuiz';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const Index = () => {
  const [showGuidanceQuiz, setShowGuidanceQuiz] = useState(false);
  const [showInterestsQuiz, setShowInterestsQuiz] = useState(false);

  const handleStartGuidanceQuiz = () => {
    setShowGuidanceQuiz(true);
    setShowInterestsQuiz(false);
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
    // Smooth scroll to quiz section
    setTimeout(() => {
      document.getElementById('quiz')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Utforska dina intressen och styrkor</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Lär känna dig själv bättre inför framtida utbildnings- och yrkesval
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={handleStartGuidanceQuiz}
              className="bg-white text-guidance-blue hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Starta quizet
            </Button>
            <Link 
              to="/career-map" 
              className="bg-guidance-green hover:bg-guidance-green/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Utforska karriärkartan
            </Link>
          </div>
        </div>
      </div>
      
      {/* Featured Tools Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-guidance-blue">Verktyg för din framtid</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="flex flex-col h-full">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="text-5xl mb-4 text-guidance-green">🗺️</div>
                <h3 className="text-xl font-bold mb-2">Karriärkarta</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Utforska hur olika gymnasieprogram kan leda till olika yrken och framtidsvägar.
                </p>
                <Button asChild className="bg-guidance-blue hover:bg-guidance-blue/90">
                  <Link to="/career-map">Utforska karriärkartan</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col h-full">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="text-5xl mb-4 text-guidance-purple">🤖</div>
                <h3 className="text-xl font-bold mb-2">AI-chatt</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Få svar på vanliga frågor om utbildningar, yrken och framtida vägval.
                </p>
                <Button asChild className="bg-guidance-purple hover:bg-guidance-purple/90">
                  <Link to="/ai-chat">Starta AI-chatt</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col h-full">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="text-5xl mb-4 text-guidance-green">🎥</div>
                <h3 className="text-xl font-bold mb-2">Videointervjuer</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Se intervjuer med gymnasieelever och yrkesverksamma för inspiration.
                </p>
                <Button asChild className="bg-guidance-green hover:bg-guidance-green/90">
                  <Link to="/interviews">Se videointervjuer</Link>
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
            <h2 className="text-3xl font-bold mb-8 text-guidance-blue">Vilken typ av quiz vill du göra?</h2>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center max-w-3xl mx-auto">
              <Card className="flex-1">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="text-5xl mb-4">🏫</div>
                  <h3 className="text-xl font-bold mb-2">Gymnasievägledning</h3>
                  <p className="text-gray-600 mb-6">
                    Hitta rätt gymnasieprogram baserat på dina intressen och mål.
                  </p>
                  <Button 
                    onClick={handleStartGuidanceQuiz} 
                    className="bg-guidance-blue hover:bg-guidance-blue/90"
                  >
                    Starta gymnasium-quiz
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="flex-1">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="text-5xl mb-4">👤</div>
                  <h3 className="text-xl font-bold mb-2">Personliga intressen</h3>
                  <p className="text-gray-600 mb-6">
                    Utforska dina intressen och styrkor för att forma din profil.
                  </p>
                  <Button 
                    onClick={handleStartInterestsQuiz}
                    className="bg-guidance-purple hover:bg-guidance-purple/90"
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
