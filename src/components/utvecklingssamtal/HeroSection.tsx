
import React from 'react';
import SYlVester from '@/components/SYlVester';

interface HeroSectionProps {
  onTipClick: (tip: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTipClick }) => {
  return (
    <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-16">
      <div className="container mx-auto px-4 relative">
        <div className="absolute top-0 right-0 transform -translate-y-1/2">
          <SYlVester 
            size="md" 
            mood="thinking" 
            greeting="Förbered dig inför ditt utvecklingssamtal!"
            tips={["Tips för förberedelse", "Under samtalet", "Efter samtalet"]}
            onTipClick={onTipClick}
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">Utvecklingssamtal</h1>
        <p className="text-xl max-w-2xl">
          Förbered dig för att få ut så mycket som möjligt av ditt utvecklingssamtal. 
          Här kan du skriva ner frågor, tankar och mål innan samtalet.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
