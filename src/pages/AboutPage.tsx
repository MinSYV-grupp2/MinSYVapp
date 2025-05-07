
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="page-container flex-grow">
        <h1 className="text-3xl font-bold mb-2 text-guidance-blue">Om SYV</h1>
        <p className="text-lg text-gray-600 mb-8">
          Lär dig mer om vad en studie- och yrkesvägledare gör och hur du kan få hjälp.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-guidance-blue">Vad är en studie- och yrkesvägledare?</h2>
                
                <p className="text-gray-700 mb-4">
                  En studie- och yrkesvägledare, ofta förkortat som SYV, är en person som hjälper elever 
                  att utforska olika utbildningsmöjligheter och framtida yrkesval.
                </p>
                
                <p className="text-gray-700 mb-4">
                  SYV:en finns där för att stötta dig i att:
                </p>
                
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Lära känna dina intressen, styrkor och mål</li>
                  <li>Förstå olika utbildningsvägar och vad de leder till</li>
                  <li>Utforska olika yrken och arbetsområden</li>
                  <li>Planera dina studier inför framtiden</li>
                  <li>Fatta välgrundade beslut om din utbildning och karriär</li>
                </ul>
                
                <p className="text-gray-700">
                  SYV:en är en neutral person som inte bestämmer åt dig, utan hjälper dig att hitta din egen väg.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-guidance-blue">När kan du träffa SYV?</h2>
                
                <p className="text-gray-700 mb-4">
                  Det finns många tillfällen då det kan vara bra att prata med en SYV:
                </p>
                
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>När du ska välja kurser i skolan</li>
                  <li>När du funderar på vad du vill göra efter grundskolan</li>
                  <li>När du vill veta mer om olika gymnasieprogram</li>
                  <li>När du vill utforska olika typer av yrken</li>
                  <li>När du känner dig osäker på vad du vill i framtiden</li>
                  <li>När du har frågor om utbildning och arbetsmarknad</li>
                </ul>
                
                <p className="text-gray-700">
                  Du kan boka tid med din SYV genom att kontakta dem direkt eller genom 
                  din lärare eller mentor.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-guidance-blue">Hur kan du förbereda dig?</h2>
                
                <p className="text-gray-700 mb-4">
                  Innan du träffar SYV kan det vara bra att fundera lite på:
                </p>
                
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>Vad du tycker om att göra på fritiden</li>
                  <li>Vilka skolämnen du tycker är intressanta</li>
                  <li>Vad du tror att du är bra på</li>
                  <li>Om det finns några yrken du är nyfiken på</li>
                  <li>Om du har funderingar eller frågor om framtiden</li>
                </ul>
                
                <div className="bg-guidance-lightBlue p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 text-guidance-blue">Tips!</h3>
                  <p className="text-gray-700">
                    Använd gärna den här webbplatsen för att utforska dina intressen och 
                    styrkor innan du träffar SYV. Du kan visa din profil för SYV när ni ses!
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-guidance-lightGreen">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-guidance-green">Kom igång med din resa</h2>
                
                <p className="text-gray-700 mb-6">
                  Den här webbplatsen är ett verktyg för att hjälpa dig att börja utforska 
                  dina intressen och styrkor. Detta är det första steget på din resa mot att 
                  hitta utbildningar och yrken som passar just dig.
                </p>
                
                <div className="space-y-3">
                  <Button 
                    asChild
                    className="w-full bg-guidance-green hover:bg-guidance-green/90 text-white"
                  >
                    <Link to="/#quiz">
                      Starta quizet "Vad gillar du?"
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild
                    className="w-full bg-guidance-blue hover:bg-guidance-blue/90 text-white"
                  >
                    <Link to="/#reflections">
                      Utforska reflektionsfrågorna
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild
                    className="w-full bg-guidance-purple hover:bg-guidance-purple/90 text-white"
                  >
                    <Link to="/profile">
                      Gå till din profil
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
