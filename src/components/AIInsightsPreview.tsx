
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { AIInsight } from '@/services/openai';

interface AIInsightsPreviewProps {
  insights: AIInsight[];
  onApprove: (insightId: string) => void;
  onReject: (insightId: string) => void;
}

const insightTypeToLabel: Record<string, string> = {
  interest: 'Intresse',
  strength: 'Styrka',
  value: 'Värdering',
  education: 'Utbildning',
  career: 'Karriär',
  reflection: 'Reflektion'
};

const insightTypeToEmoji: Record<string, string> = {
  interest: '⭐️',
  strength: '💪',
  value: '❤️',
  education: '🎓',
  career: '💼',
  reflection: '🤔'
};

const AIInsightsPreview: React.FC<AIInsightsPreviewProps> = ({ 
  insights, 
  onApprove, 
  onReject 
}) => {
  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <Card className="border-2 border-guidance-lightPurple mb-4 shadow-md">
      <CardHeader className="bg-guidance-lightPurple/20 pb-2">
        <CardTitle className="text-guidance-purple text-lg flex items-center">
          <span className="mr-2">🧠</span>
          AI har upptäckt nya insikter från er konversation
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        <p className="text-sm text-gray-500 mb-3">
          SYlVester har analyserat din konversation och upptäckt följande insikter. 
          Vill du spara dem till din profil?
        </p>
        
        <div className="space-y-3">
          {insights.map(insight => (
            <div 
              key={insight.id} 
              className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-100 shadow-sm"
            >
              <div className="flex items-center">
                <div className="text-xl mr-3">{insightTypeToEmoji[insight.type]}</div>
                <div>
                  <div className="font-medium">{insight.content}</div>
                  <div className="text-xs text-gray-500">
                    {insightTypeToLabel[insight.type]}
                    {insight.confidence > 0.8 && ' • Hög säkerhet'}
                    {insight.confidence <= 0.8 && insight.confidence > 0.5 && ' • Medium säkerhet'}
                    {insight.confidence <= 0.5 && ' • Låg säkerhet'}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => onReject(insight.id)}
                >
                  <X size={18} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-green-500 hover:text-green-700 hover:bg-green-50"
                  onClick={() => onApprove(insight.id)}
                >
                  <Check size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightsPreview;
