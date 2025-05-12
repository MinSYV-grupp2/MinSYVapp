
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CareerMap from '@/components/CareerMap';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileHeart, Calendar, Search, List, Layers, Book, GraduationCap, Briefcase, School, Compare } from 'lucide-react';
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
              Utforska sambandet mellan gymnasieprogram, inriktningar, vidare utbildning och framtida karriärmöjligheter
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8 border-l-4 border-guidance-purple">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3 text-guidance-purple">Hur du använder karriärkartan</h2>
              <div className="space-y-3 text-gray-700">
                <p>Karriärkartan hjälper dig att utforska din framtida utbildnings- och yrkesbana:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><span className="font-medium">Välj program</span> - Börja med att välja ett gymnasieprogram som intresserar dig</li>
                  <li><span className="font-medium">Se möjligheter</span> - Utforska inriktningar, högskoleutbildningar och yrken programmet kan leda till</li>
                  <li><span className="font-medium">Jämför skolor</span> - Se vilka skolor som erbjuder programmet och hur de skiljer sig åt</li>
                  <li><span className="font-medium">Jämför program</span> - Använd jämförelsefunktionen för att se skillnader mellan olika program</li>
                  <li><span className="font-medium">Spara favoriter</span> - Klicka på hjärtat för att spara program du är intresserad av till din profil</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 border-l-4 border-guidance-green">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3 text-guidance-green">Hitta rätt gymnasieprogram</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-4">
                    Välj ett program som passar dina intressen och framtidsplaner. Karriärkartan låter dig:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="bg-guidance-lightGreen p-1 rounded-full mr-2 mt-1">
                        <Search className="h-3 w-3 text-guidance-green" />
                      </span>
                      <span>Se detaljerad information om programmens innehåll och inriktningar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-guidance-lightGreen p-1 rounded-full mr-2 mt-1">
                        <List className="h-3 w-3 text-guidance-green" />
                      </span>
                      <span>Förstå vilka kurser som ingår och vilka som är valfria</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-guidance-lightGreen p-1 rounded-full mr-2 mt-1">
                        <Compare className="h-3 w-3 text-guidance-green" />
                      </span>
                      <span>Jämföra olika program och skolor sida vid sida</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-guidance-lightGreen p-1 rounded-full mr-2 mt-1">
                        <Briefcase className="h-3 w-3 text-guidance-green" />
                      </span>
                      <span>Se vilka yrken och karriärvägar programmet kan leda till</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-guidance-lightPurple/30 p-4 rounded-lg">
                  <h3 className="font-medium text-guidance-purple mb-3 flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Tänk på meritpoäng för högskola
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm">
                    Olika gymnasieprogram ger olika meritpoäng för olika högskoleutbildningar. 
                    Detta kan vara avgörande när du söker till högskola eller universitet senare.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span>Naturvetenskap / Teknik</span>
                      <span className="bg-guidance-purple text-white text-xs px-2 py-0.5 rounded">Merit: 1.0</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span>Ekonomi / Samhäll</span>
                      <span className="bg-guidance-purple text-white text-xs px-2 py-0.5 rounded">Merit: 0.5</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span>Estet / Yrkesprogram</span>
                      <span className="bg-guidance-purple text-white text-xs px-2 py-0.5 rounded">Merit: 0.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-guidance-blue mb-4 sm:mb-0">Börja med att välja program</h2>
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
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
              <div className="flex items-center bg-guidance-lightPurple p-2 rounded-md">
                <div className="bg-guidance-purple p-1.5 rounded-full mr-2">
                  <School className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">Skola</span>
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
            <h2 className="text-2xl font-bold text-guidance-blue mb-4 md:mb-0">Din framtida karriärväg</h2>
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
