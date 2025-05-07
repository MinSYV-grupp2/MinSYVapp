
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const GuidanceCounselor = () => {
  return (
    <div className="bg-white py-12" id="about-syv">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="section-title">Vem är SYV?</h2>
            <p className="text-lg text-gray-600 mb-6">
              SYV står för studie- och yrkesvägledare. En studie- och yrkesvägledare hjälper dig att 
              utforska olika möjligheter för utbildning och framtida yrkesval.
            </p>
            
            <p className="text-lg text-gray-600 mb-6">
              Du kan prata med en SYV om:
            </p>
            
            <ul className="list-disc pl-6 mb-6 text-gray-600">
              <li className="mb-2">Dina intressen och styrkor</li>
              <li className="mb-2">Olika utbildningar och skolor</li>
              <li className="mb-2">Olika yrken och vad man gör i dem</li>
              <li className="mb-2">Hur du kan planera din framtid</li>
              <li>Frågor du har om studier och arbete</li>
            </ul>
            
            <Link to="/about">
              <Button className="bg-guidance-purple hover:bg-guidance-purple/90 text-white mt-2">
                Läs mer om SYV
              </Button>
            </Link>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-guidance-lightGreen p-8 rounded-lg shadow-lg max-w-md">
              <div className="text-6xl mb-4 flex justify-center">👩‍🏫</div>
              <h3 className="text-xl font-bold mb-3 text-guidance-green text-center">Hej!</h3>
              <p className="text-gray-700 mb-4 text-center">
                Jag är din studie- och yrkesvägledare. Mitt jobb är att hjälpa dig att 
                utforska olika möjligheter och fatta beslut om din framtid.
              </p>
              <p className="text-gray-700 text-center">
                Du kan boka tid med mig för att prata om dina tankar, frågor och funderingar 
                kring utbildning och yrkesval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidanceCounselor;
