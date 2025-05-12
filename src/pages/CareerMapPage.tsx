
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CareerMap from '@/components/CareerMap';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileHeart, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const CareerMapPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Karriärkarta</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Utforska sambandet mellan gymnasieskolor, program, inriktningar och framtida karriärmöjligheter
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8 border-l-4 border-guidance-purple">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3 text-guidance-purple">Hur fungerar karriärkartan?</h2>
              <div className="space-y-3 text-gray-700">
                <p>Karriärkartan hjälper dig att se hur olika utbildningsval hänger ihop med framtida möjligheter:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><span className="font-medium">Välj startpunkt</span> - Börja med en skola eller direkt med ett program</li>
                  <li><span className="font-medium">Utforska vägen</span> - Följ utbildningsvägen från program till inriktning och individuella val</li>
                  <li><span className="font-medium">Upptäck möjligheter</span> - Se vilka högre utbildningar och yrken som kan passa dig</li>
                  <li><span className="font-medium">Spara favoriter</span> - Klicka på program du är intresserad av för att spara dem till din profil</li>
                </ol>
                <p>Genom att utforska karriärkartan får du en helhetsbild av hur olika val påverkar dina framtida möjligheter!</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-guidance-blue mb-4 md:mb-0">Utforska din framtida väg</h2>
            <div className="flex gap-4">
              <Button 
                asChild
                variant="outline"
                className="border-guidance-green text-guidance-green hover:bg-guidance-lightGreen flex gap-2"
              >
                <Link to="/booking">
                  <Calendar className="h-5 w-5" />
                  <span>Boka SYV-möte</span>
                </Link>
              </Button>
              
              <Button 
                asChild
                className="bg-guidance-purple hover:bg-guidance-purple/90 flex gap-2"
              >
                <Link to="/profile">
                  <FileHeart className="h-5 w-5" />
                  <span>Min profil</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <CareerMap />
      </div>
      <Footer />
    </div>
  );
};

export default CareerMapPage;
