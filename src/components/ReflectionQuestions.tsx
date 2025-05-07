
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Question {
  id: number;
  question: string;
  description: string;
  emoji: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Vad är du bra på?",
    description: "Fundera över vilka förmågor du har och vad du gör bra. Det kan vara saker i skolan eller utanför.",
    emoji: "💪"
  },
  {
    id: 2,
    question: "Vad tycker du är roligt?",
    description: "Tänk på vilka aktiviteter som får dig att känna glädje och engagemang.",
    emoji: "😄"
  },
  {
    id: 3,
    question: "Hur vill du hjälpa andra?",
    description: "På vilket sätt skulle du vilja göra skillnad för andra människor i framtiden?",
    emoji: "🤝"
  },
  {
    id: 4,
    question: "Vilka miljöer trivs du i?",
    description: "Föredrar du att vara inomhus eller utomhus? I stora grupper eller med några få personer?",
    emoji: "🏞️"
  },
  {
    id: 5,
    question: "Vad är du nyfiken på att lära dig mer om?",
    description: "Vilka ämnen eller områden skulle du vilja utforska djupare?",
    emoji: "🔍"
  }
];

const ReflectionQuestions = () => {
  return (
    <div className="bg-guidance-lightBlue py-12" id="reflections">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Frågor att fundera över</h2>
        <p className="text-lg text-gray-600 mb-8">
          Här är några frågor som kan hjälpa dig att fundera över dina intressen och styrkor. 
          Du behöver inte svara på alla direkt, men fundera gärna på dem då och då.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((q) => (
            <Card key={q.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4 flex justify-center">{q.emoji}</div>
                <h3 className="text-xl font-semibold mb-2 text-guidance-blue">{q.question}</h3>
                <p className="text-gray-600">{q.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReflectionQuestions;
