
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';

interface QuizOption {
  id: string;
  text: string;
  category: "tech" | "nature" | "art" | "social" | "physical" | "analytical";
  image: string;
}

const quizOptions: QuizOption[] = [
  { id: '1', text: 'Att arbeta med datorer och teknik', category: 'tech', image: '💻' },
  { id: '2', text: 'Att vara utomhus i naturen', category: 'nature', image: '🌳' },
  { id: '3', text: 'Att måla, rita eller designa', category: 'art', image: '🎨' },
  { id: '4', text: 'Att hjälpa och prata med andra människor', category: 'social', image: '👥' },
  { id: '5', text: 'Att röra på dig och vara fysiskt aktiv', category: 'physical', image: '🏃' },
  { id: '6', text: 'Att lösa problem och pussel', category: 'analytical', image: '🧩' },
  { id: '7', text: 'Att bygga och konstruera saker', category: 'tech', image: '🔧' },
  { id: '8', text: 'Att undersöka hur saker fungerar', category: 'analytical', image: '🔍' },
  { id: '9', text: 'Att skriva berättelser eller dikter', category: 'art', image: '📝' },
  { id: '10', text: 'Att organisera och planera', category: 'analytical', image: '📋' },
  { id: '11', text: 'Att spela musik eller sjunga', category: 'art', image: '🎵' },
  { id: '12', text: 'Att laga mat eller baka', category: 'physical', image: '🍳' },
];

const QuizSection = () => {
  const { addInterest, profile, markQuizCompleted } = useUser();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionToggle = (optionId: string, category: "tech" | "nature" | "art" | "social" | "physical" | "analytical") => {
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

    // Mark quiz as completed
    markQuizCompleted();

    toast({
      title: "Bra jobbat!",
      description: "Dina intressen har sparats i din profil.",
    });
  };

  return (
    <div className="py-8" id="quiz">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Vad gillar du?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Välj några av alternativen nedan som du tycker om eller är intresserad av.
          Detta hjälper dig att börja utforska dina intressen.
        </p>
        
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
              <div className="flex items-center">
                <div className="text-4xl mr-4">{option.image}</div>
                <div>
                  <p className="text-lg font-medium">{option.text}</p>
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
      </div>
    </div>
  );
};

export default QuizSection;
