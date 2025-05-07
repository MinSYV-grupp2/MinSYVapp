
import React from 'react';
import NavBar from '@/components/NavBar';
import QuizSection from '@/components/QuizSection';
import ReflectionQuestions from '@/components/ReflectionQuestions';
import GuidanceCounselor from '@/components/GuidanceCounselor';
import ProfileSection from '@/components/ProfileSection';
import Footer from '@/components/Footer';

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
            <a 
              href="#about-syv" 
              className="bg-guidance-green hover:bg-guidance-green/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Läs om SYV
            </a>
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
