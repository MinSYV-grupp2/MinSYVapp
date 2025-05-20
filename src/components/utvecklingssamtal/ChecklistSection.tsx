
import React from 'react';
import { CheckSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChecklistSection: React.FC = () => {
  return (
    <div className="mt-8 bg-guidance-lightBlue rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-guidance-blue flex items-center">
        <CheckSquare className="mr-2" />
        Checklista inför samtalet
      </h3>
      
      <ul className="space-y-3">
        <li className="flex items-start">
          <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
            <CheckSquare className="h-4 w-4 text-guidance-blue" />
          </div>
          <span>Skriv ner specifika frågor du vill ta upp</span>
        </li>
        <li className="flex items-start">
          <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
            <CheckSquare className="h-4 w-4 text-guidance-blue" />
          </div>
          <span>Fundera över dina styrkor och vad du vill utveckla</span>
        </li>
        <li className="flex items-start">
          <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
            <CheckSquare className="h-4 w-4 text-guidance-blue" />
          </div>
          <span>Ta med dina betyg och tidigare överenskommelser</span>
        </li>
        <li className="flex items-start">
          <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
            <CheckSquare className="h-4 w-4 text-guidance-blue" />
          </div>
          <span>Prata med dina föräldrar om vad de tycker är viktigt att ta upp</span>
        </li>
        <li className="flex items-start">
          <div className="bg-white rounded-full p-1 mr-3 mt-0.5">
            <CheckSquare className="h-4 w-4 text-guidance-blue" />
          </div>
          <span>Ta med anteckningsmaterial för att skriva ner nya mål</span>
        </li>
      </ul>
      
      <div className="mt-6">
        <Button variant="outline" className="text-guidance-blue border-guidance-blue hover:bg-guidance-lightBlue">
          Ladda ned checklistan som PDF <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChecklistSection;
