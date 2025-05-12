
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { Check } from 'lucide-react';

interface QuizOption {
  id: string;
  text: string;
  category: "tech" | "nature" | "art" | "social" | "physical" | "analytical";
  image: string;
  description: string;
  relatedPrograms: string[];
}

const quizOptions: QuizOption[] = [
  { 
    id: '1', 
    text: 'Att arbeta med datorer och teknik', 
    category: 'tech', 
    image: '💻',
    description: 'Du är intresserad av programmering, IT och tekniska lösningar.',
    relatedPrograms: ['Teknikprogrammet', 'El- och energiprogrammet', 'Informationsteknik']
  },
  { 
    id: '2', 
    text: 'Att vara utomhus i naturen', 
    category: 'nature', 
    image: '🌳',
    description: 'Du trivs i naturen och är intresserad av miljö, djur och växter.',
    relatedPrograms: ['Naturvetenskapsprogrammet', 'Naturbruksprogrammet', 'Miljövetenskap'] 
  },
  { 
    id: '3', 
    text: 'Att måla, rita eller designa', 
    category: 'art', 
    image: '🎨',
    description: 'Du är kreativ och tycker om att uttrycka dig genom visuella medier.',
    relatedPrograms: ['Estetiska programmet', 'Hantverksprogrammet', 'Design'] 
  },
  { 
    id: '4', 
    text: 'Att hjälpa och prata med andra människor', 
    category: 'social', 
    image: '👥',
    description: 'Du är social och tycker om att arbeta med människor och relationer.',
    relatedPrograms: ['Samhällsvetenskapsprogrammet', 'Vård- och omsorgsprogrammet', 'Barn- och fritidsprogrammet'] 
  },
  { 
    id: '5', 
    text: 'Att röra på dig och vara fysiskt aktiv', 
    category: 'physical', 
    image: '🏃',
    description: 'Du är energisk och tycker om idrott, rörelse och fysiska utmaningar.',
    relatedPrograms: ['Barn- och fritidsprogrammet', 'Naturvetenskapsprogrammet', 'Idrottsvetenskap'] 
  },
  { 
    id: '6', 
    text: 'Att lösa problem och pussel', 
    category: 'analytical', 
    image: '🧩',
    description: 'Du är logisk och analytisk och tycker om att lösa komplexa problem.',
    relatedPrograms: ['Naturvetenskapsprogrammet', 'Ekonomiprogrammet', 'Teknikprogrammet'] 
  },
  { 
    id: '7', 
    text: 'Att bygga och konstruera saker', 
    category: 'tech', 
    image: '🔧',
    description: 'Du är praktisk och tycker om att skapa saker med dina händer.',
    relatedPrograms: ['Teknikprogrammet', 'Bygg- och anläggningsprogrammet', 'Industritekniska programmet'] 
  },
  { 
    id: '8', 
    text: 'Att undersöka hur saker fungerar', 
    category: 'analytical', 
    image: '🔍',
    description: 'Du är nyfiken och vetgirig och vill förstå hur saker och ting hänger ihop.',
    relatedPrograms: ['Naturvetenskapsprogrammet', 'Teknikprogrammet', 'Samhällsvetenskapsprogrammet'] 
  },
  { 
    id: '9', 
    text: 'Att skriva berättelser eller dikter', 
    category: 'art', 
    image: '📝',
    description: 'Du är kreativ med ord och tycker om att uttrycka dig genom text.',
    relatedPrograms: ['Samhällsvetenskapsprogrammet', 'Estetiska programmet', 'Litteraturvetenskap'] 
  },
  { 
    id: '10', 
    text: 'Att organisera och planera', 
    category: 'analytical', 
    image: '📋',
    description: 'Du är strukturerad och tycker om att planera och organisera.',
    relatedPrograms: ['Ekonomiprogrammet', 'Handel- och administrationsprogrammet', 'Samhällsvetenskapsprogrammet'] 
  },
  { 
    id: '11', 
    text: 'Att spela musik eller sjunga', 
    category: 'art', 
    image: '🎵',
    description: 'Du är musikalisk och tycker om att uttrycka dig genom ljud och toner.',
    relatedPrograms: ['Estetiska programmet', 'Musikproduktion', 'Musikvetenskap'] 
  },
  { 
    id: '12', 
    text: 'Att laga mat eller baka', 
    category: 'physical', 
    image: '🍳',
    description: 'Du är kreativ i köket och tycker om att experimentera med smaker.',
    relatedPrograms: ['Restaurang- och livsmedelsprogrammet', 'Hotell- och turismprogrammet', 'Kockutbildning'] 
  },
];

const QuizSection = () => {
  const { addInterest, profile, markQuizCompleted, updateProfile } = useUser();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [recommendedPrograms, setRecommendedPrograms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleOptionToggle = (optionId: string, category: "tech" | "nature" | "art" | "social" | "physical" | "analytical") => {
    const option = quizOptions.find(opt => opt.id === optionId);
    if (!option) return;

    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
      
      // Only add to interests if not already selected
      if (!profile.interests.includes(category)) {
        addInterest(category);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) {
      toast({
        title: "Välj minst ett alternativ",
        description: "Du behöver välja minst ett alternativ för att fortsätta.",
        variant: "destructive"
      });
      return;
    }

    // Generate recommendations based on selected options
    const programs = new Set<string>();
    selectedOptions.forEach(optionId => {
      const option = quizOptions.find(opt => opt.id === optionId);
      if (option) {
        option.relatedPrograms.forEach(program => programs.add(program));
      }
    });
    
    setRecommendedPrograms([...programs]);
    
    // Save a personalized summary to the user's profile
    const selectedCategories = selectedOptions.map(optionId => 
      quizOptions.find(opt => opt.id === optionId)?.category || ""
    ).filter(Boolean);
    
    // Create unique categories array
    const uniqueCategories = [...new Set(selectedCategories)];
    
    // Generate summary based on interests
    const summary = generateSummary(uniqueCategories);
    
    // Add to user's profile reflections
    updateProfile({
      reflections: [...profile.reflections, summary]
    });
    
    // Mark quiz as completed
    markQuizCompleted();
    
    // Show results
    setShowResults(true);

    toast({
      title: "Bra jobbat!",
      description: "Dina intressen har sparats i din profil och vi har skapat rekommendationer baserat på dina val.",
    });
  };

  const generateSummary = (categories: string[]): string => {
    const date = new Date().toLocaleDateString('sv-SE');
    
    let summary = `Quiz-resultat (${date}): Baserat på dina val verkar du vara intresserad av `;
    
    const categoryDescriptions: Record<string, string> = {
      "tech": "teknik och datorer",
      "nature": "natur och miljö",
      "art": "kreativt skapande",
      "social": "att hjälpa och arbeta med människor",
      "physical": "fysiska aktiviteter",
      "analytical": "analys och problemlösning"
    };
    
    const descriptions = categories.map(c => categoryDescriptions[c]);
    
    if (descriptions.length === 1) {
      summary += descriptions[0] + ".";
    } else if (descriptions.length === 2) {
      summary += descriptions.join(" och ") + ".";
    } else {
      const lastDescription = descriptions.pop();
      summary += descriptions.join(", ") + " och " + lastDescription + ".";
    }
    
    summary += " Detta kan passa bra med utbildningar inom " + 
      [...recommendedPrograms].slice(0, 3).join(", ") + 
      (recommendedPrograms.length > 3 ? " och liknande områden." : ".");
    
    return summary;
  };

  const resetQuiz = () => {
    setSelectedOptions([]);
    setRecommendedPrograms([]);
    setShowResults(false);
  };

  return (
    <div className="py-8" id="quiz">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Vad gillar du?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Välj några av alternativen nedan som du tycker om eller är intresserad av.
          Detta hjälper dig att börja utforska dina intressen och hitta möjliga utbildningsvägar.
        </p>
        
        {!showResults ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {quizOptions.map((option) => (
                <Card 
                  key={option.id}
                  className={`quiz-card cursor-pointer transition-all ${
                    selectedOptions.includes(option.id)
                      ? 'border-4 border-guidance-blue scale-105'
                      : 'border border-gray-200 hover:border-guidance-blue/50'
                  }`}
                  onClick={() => handleOptionToggle(option.id, option.category)}
                >
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">{option.image}</div>
                      <div className="flex-1">
                        <p className="text-lg font-medium">{option.text}</p>
                        <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                      </div>
                      {selectedOptions.includes(option.id) && (
                        <div className="ml-2 bg-guidance-blue text-white p-1 rounded-full">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleSubmit}
                className="bg-guidance-green hover:bg-guidance-green/90 text-white font-medium px-8 py-2 text-lg"
              >
                Spara mina intressen
              </Button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
            <div className="bg-guidance-lightGreen text-guidance-green p-4 rounded-md mb-6 text-center">
              <h3 className="text-xl font-bold mb-2">Tack för dina svar!</h3>
              <p>Vi har sparat dina intressen i din profil</p>
            </div>
            
            <h3 className="text-xl font-semibold text-guidance-blue mb-4">Baserat på dina val rekommenderar vi följande utbildningar:</h3>
            
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedPrograms.slice(0, 6).map((program, index) => (
                  <div key={index} className="bg-guidance-lightBlue/30 p-3 rounded-md flex items-center">
                    <div className="bg-guidance-blue text-white p-2 rounded-full mr-3">
                      {index + 1}
                    </div>
                    <span className="font-medium">{program}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h4 className="font-semibold text-guidance-purple mb-3">Reflektera över resultatet:</h4>
              <p className="text-gray-600 mb-4">
                Bekanta dig med dessa utbildningsområden genom att utforska karriärkartan. 
                Du kan också boka ett möte med en SYV för att diskutera dessa alternativ närmare.
              </p>
              
              <div className="flex justify-between mt-8">
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-guidance-blue text-guidance-blue"
                >
                  Gör om testet
                </Button>
                
                <Button
                  asChild
                  className="bg-guidance-purple hover:bg-guidance-purple/90"
                >
                  <a href="#profile">Gå till min profil</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSection;
