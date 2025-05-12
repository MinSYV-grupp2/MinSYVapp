
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CareerMap from '@/components/CareerMap';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileHeart, Calendar, List, Layers, Book, GraduationCap, Briefcase, School } from 'lucide-react';
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

          <Card className="mb-8 border-l-4 border-guidance-green">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3 text-guidance-green">Upptäck hela utbildningsvägen</h2>
              <div className="space-y-3 text-gray-700">
                <p>I karriärkartan kan du nu utforska hela vägen från gymnasiet till yrke:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-guidance-lightPurple/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="bg-guidance-purple p-1.5 rounded-full mr-2">
                        <School className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-medium">Gymnasieskolor</h3>
                    </div>
                    <p className="text-sm">Utforska olika gymnasieskolor i Göteborg och vilka program de erbjuder. Varje skola har sin egen profil och specialisering.</p>
                  </div>
                  
                  <div className="bg-guidance-lightBlue/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="bg-guidance-blue p-1.5 rounded-full mr-2">
                        <Book className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-medium">Program</h3>
                    </div>
                    <p className="text-sm">Se vilka gymnasieprogram som finns och vad de innehåller. Programmen är grunden för din framtida utbildning och karriär.</p>
                  </div>
                  
                  <div className="bg-guidance-lightGreen/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="bg-guidance-green p-1.5 rounded-full mr-2">
                        <Layers className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-medium">Inriktningar</h3>
                    </div>
                    <p className="text-sm">Upptäck olika inriktningar inom programmen och hur de specialiserar din utbildning mot specifika områden.</p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="bg-amber-300 p-1.5 rounded-full mr-2">
                        <Book className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-medium">Individuella val</h3>
                    </div>
                    <p className="text-sm">Utforska hur individuella kursval kan påverka dina framtida studie- och karriärmöjligheter.</p>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="bg-indigo-300 p-1.5 rounded-full mr-2">
                        <GraduationCap className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-medium">Vidare utbildning</h3>
                    </div>
                    <p className="text-sm">Se vilka högskole- och universitetsutbildningar som dina val kan leda till, inklusive både YH och akademiska program.</p>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="bg-gray-500 p-1.5 rounded-full mr-2">
                        <Briefcase className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-medium">Yrken</h3>
                    </div>
                    <p className="text-sm">Upptäck vilka yrken och karriärvägar som öppnas upp genom olika utbildningsvägar.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-guidance-blue mb-4 sm:mb-0">Din väg till framtiden</h2>
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
              <div className="flex items-center bg-guidance-lightPurple p-2 rounded-md">
                <div className="bg-guidance-purple p-1.5 rounded-full mr-2">
                  <School className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">Skola</span>
              </div>
              <div className="flex items-center bg-guidance-lightBlue p-2 rounded-md">
                <div className="bg-guidance-blue p-1.5 rounded-full mr-2">
                  <Book className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">Program</span>
              </div>
              <div className="flex items-center bg-guidance-lightGreen p-2 rounded-md">
                <div className="bg-guidance-green p-1.5 rounded-full mr-2">
                  <Layers className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">Inriktning</span>
              </div>
              <div className="flex items-center bg-amber-50 p-2 rounded-md border border-amber-200">
                <div className="bg-amber-300 p-1.5 rounded-full mr-2">
                  <Book className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">Kurser</span>
              </div>
              <div className="flex items-center bg-indigo-50 p-2 rounded-md border border-indigo-200">
                <div className="bg-indigo-300 p-1.5 rounded-full mr-2">
                  <GraduationCap className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">Utbildning</span>
              </div>
              <div className="flex items-center bg-gray-100 p-2 rounded-md">
                <div className="bg-gray-500 p-1.5 rounded-full mr-2">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">Yrken</span>
              </div>
            </div>
          </div>

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
