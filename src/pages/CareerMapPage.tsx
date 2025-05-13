
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CareerMap from '@/components/CareerMap';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileHeart, Calendar, Search, List, Layers, Book, GraduationCap, Briefcase, School, SplitSquareVertical } from 'lucide-react';
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
              Hitta program som passar just dig och se vad de kan leda till i framtiden!
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8 border-l-4 border-guidance-purple">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3 text-guidance-purple">Så här använder du karriärkartan</h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-medium">Följ dessa tre enkla steg:</p>
                <ol className="list-decimal pl-5 space-y-4">
                  <li className="bg-guidance-lightBlue/30 p-3 rounded-lg">
                    <span className="font-medium text-guidance-blue block">Steg 1: Välj program</span>
                    <p className="text-sm mt-1">Klicka på ett gymnasieprogram som låter intressant för dig. Det finns många att välja mellan!</p>
                  </li>
                  <li className="bg-guidance-lightGreen/30 p-3 rounded-lg">
                    <span className="font-medium text-guidance-green block">Steg 2: Utforska möjligheter</span>
                    <p className="text-sm mt-1">Se vilka inriktningar, högskole-utbildningar och yrken programmet kan leda till. Testa olika för att jämföra!</p>
                  </li>
                  <li className="bg-guidance-lightPurple/30 p-3 rounded-lg">
                    <span className="font-medium text-guidance-purple block">Steg 3: Jämför och spara</span>
                    <p className="text-sm mt-1">Klicka på hjärtat för att spara dina favoritprogram till din profil, och använd jämför-knappen för att se skillnader mellan olika program.</p>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 border-l-4 border-guidance-green">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3 text-guidance-green">Vad ska jag tänka på när jag väljer gymnasieprogram?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-4 font-medium">
                    Välj efter vad DU tycker är intressant och roligt! Tänk på:
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="bg-guidance-lightGreen p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <Search className="h-4 w-4 text-guidance-green" />
                      </span>
                      <span>Vilka ämnen tycker du är roligast i skolan just nu?</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-guidance-lightGreen p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <List className="h-4 w-4 text-guidance-green" />
                      </span>
                      <span>Vill du plugga vidare på högskola eller börja jobba direkt?</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-guidance-lightGreen p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <Briefcase className="h-4 w-4 text-guidance-green" />
                      </span>
                      <span>Har du redan en dröm om vad du vill jobba med?</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-guidance-lightGreen p-2 rounded-full mr-3 flex-shrink-0 mt-0.5">
                        <School className="h-4 w-4 text-guidance-green" />
                      </span>
                      <span>Finns programmet på en skola som känns bra för dig?</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-guidance-lightPurple/30 p-4 rounded-lg">
                  <h3 className="font-medium text-guidance-purple mb-3 flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Visste du? Meritpoäng är viktigt!
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm">
                    Om du vill plugga på högskola efter gymnasiet är det bra att veta att olika gymnasieprogram 
                    ger dig olika mycket extrapoäng när du söker. Dessa kallas "meritpoäng".
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span>Naturvetenskap / Teknik</span>
                      <span className="bg-guidance-purple text-white text-xs px-2 py-1 rounded">Mest meritpoäng</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span>Ekonomi / Samhäll</span>
                      <span className="bg-guidance-purple text-white text-xs px-2 py-1 rounded">Mellan meritpoäng</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded">
                      <span>Estet / Yrkesprogram</span>
                      <span className="bg-guidance-purple text-white text-xs px-2 py-1 rounded">Minst meritpoäng</span>
                    </div>
                    <p className="pt-2 text-xs text-gray-600 italic">Men kom ihåg - välj det som passar DIG bäst!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-guidance-blue mb-4 sm:mb-0">Välj ett program nedan</h2>
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
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                variant="outline"
                className="border-guidance-green text-guidance-green hover:bg-guidance-lightGreen flex gap-2"
              >
                <Link to="/booking">
                  <Calendar className="h-5 w-5" />
                  <span>Boka SYV-möte</span>
                  <span className="text-xs block sm:hidden">(Prata med en studie-och yrkesvägledare)</span>
                </Link>
              </Button>
              
              <Button 
                asChild
                className="bg-guidance-purple hover:bg-guidance-purple/90 flex gap-2"
              >
                <Link to="/profile">
                  <FileHeart className="h-5 w-5" />
                  <span>Min profil</span>
                  <span className="text-xs block sm:hidden">(Se dina sparade favoriter)</span>
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
