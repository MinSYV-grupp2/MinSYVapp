
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AIInsight } from '@/services/openai';

interface AIInsightVisualizationProps {
  insights: AIInsight[];
  title?: string;
}

const AIInsightVisualization: React.FC<AIInsightVisualizationProps> = ({ 
  insights,
  title = "AI-genererade insikter"
}) => {
  // Group insights by type
  const groupedInsights = insights.reduce((acc, insight) => {
    if (!acc[insight.type]) {
      acc[insight.type] = [];
    }
    acc[insight.type].push(insight);
    return acc;
  }, {} as Record<string, AIInsight[]>);

  const typeLabels: Record<string, string> = {
    interest: 'Intressen',
    strength: 'Styrkor',
    value: 'Värderingar',
    education: 'Utbildning',
    career: 'Karriär',
    reflection: 'Reflektioner'
  };

  const typeColors: Record<string, string> = {
    interest: 'bg-guidance-lightBlue text-guidance-blue',
    strength: 'bg-guidance-lightGreen text-guidance-green',
    value: 'bg-guidance-lightPurple text-guidance-purple',
    education: 'bg-blue-100 text-blue-800',
    career: 'bg-amber-100 text-amber-800',
    reflection: 'bg-gray-100 text-gray-800'
  };

  const typeIcons: Record<string, string> = {
    interest: '⭐️',
    strength: '💪',
    value: '❤️',
    education: '🎓',
    career: '💼',
    reflection: '🤔'
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-guidance-blue flex items-center">
          <span className="mr-2">🧠</span>
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {Object.entries(groupedInsights).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedInsights).map(([type, typeInsights]) => (
              <div key={type} className="mb-4">
                <h3 className="font-medium text-lg mb-3 flex items-center">
                  <span className="mr-2">{typeIcons[type]}</span>
                  {typeLabels[type] || type}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {typeInsights.map(insight => (
                    <span 
                      key={insight.id}
                      className={`px-3 py-1.5 rounded-full text-sm ${typeColors[type]}`}
                    >
                      {insight.content}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>Inga AI-insikter har sparats än.</p>
            <p className="text-sm mt-2">
              Chatta med SYlVester för att få personliga insikter baserade på dina svar.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsightVisualization;
