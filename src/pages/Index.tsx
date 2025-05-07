
import React from 'react';
import NavBar from '@/components/NavBar';
import QuizSection from '@/components/QuizSection';
import ReflectionQuestions from '@/components/ReflectionQuestions';
import GuidanceCounselor from '@/components/GuidanceCounselor';
import ProfileSection from '@/components/ProfileSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
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
            <a 
              href="#quiz" 
              className="bg-white text-guidance-blue hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Starta quizet
            </a>
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
      
      {/* Main Content */}
      <div className="flex-grow">
        <QuizSection />
        <ReflectionQuestions />
        <GuidanceCounselor />
        <ProfileSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
