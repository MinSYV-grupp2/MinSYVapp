
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { X } from 'lucide-react';

const DiscussionQuestions = () => {
  const { profile, addDiscussionQuestion, removeDiscussionQuestion } = useUser();
  const [question, setQuestion] = useState('');

  const handleAddQuestion = () => {
    if (!question.trim()) {
      toast({
        title: "Ange en fråga",
        description: "Du behöver skriva en fråga att diskutera.",
        variant: "destructive"
      });
      return;
    }

    addDiscussionQuestion(question.trim());
    setQuestion('');
    
    toast({
      title: "Fråga tillagd",
      description: "Din fråga har sparats för diskussion med SYV.",
    });
  };

  const handleRemoveQuestion = (id: string) => {
    removeDiscussionQuestion(id);
    toast({
      title: "Fråga borttagen",
      description: "Frågan har tagits bort från din lista.",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-guidance-blue">Frågor att diskutera med SYV</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Skriv en fråga du vill ta upp med din SYV..."
            className="mb-2"
            rows={3}
          />
          <Button 
            onClick={handleAddQuestion}
            className="w-full bg-guidance-purple hover:bg-guidance-purple/90"
          >
            Lägg till fråga
          </Button>
        </div>
      </div>

      {profile.discussionQuestions.length > 0 ? (
        <div className="space-y-3">
          {profile.discussionQuestions.map((item) => (
            <Card key={item.id} className="relative">
              <CardContent className="p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-slate-100"
                  onClick={() => handleRemoveQuestion(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <p>{item.question}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(item.created).toLocaleDateString('sv-SE')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center italic">Du har inte lagt till några frågor att diskutera ännu</p>
      )}
    </div>
  );
};

export default DiscussionQuestions;
