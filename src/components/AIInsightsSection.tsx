
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import AIInsightVisualization from './AIInsightVisualization';
import { Brain, Eye, EyeOff, Trash2 } from 'lucide-react';

const AIInsightsSection: React.FC = () => {
  const { profile, updateInsightPermissions, removeAIInsight } = useUser();
  const [showSettings, setShowSettings] = useState(false);

  // Filter to only show approved insights
  const approvedInsights = profile.aiInsights.filter(insight => insight.approved);

  const handleToggleParentVisibility = () => {
    updateInsightPermissions({
      showToParents: !profile.insightPermissions.showToParents
    });
  };

  const handleToggleCounselorVisibility = () => {
    updateInsightPermissions({
      showToCounselor: !profile.insightPermissions.showToCounselor
    });
  };

  const handleDeleteAllInsights = () => {
    // In a real app, add a confirmation dialog here
    approvedInsights.forEach(insight => {
      removeAIInsight(insight.id);
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-guidance-purple flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          AI-genererade insikter
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          className="text-gray-500 hover:text-guidance-purple"
        >
          {showSettings ? 'Dölj inställningar' : 'Inställningar'}
        </Button>
      </CardHeader>
      
      <CardContent>
        {showSettings && (
          <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-100">
            <h4 className="font-medium text-guidance-purple mb-3">Integritetsinställningar</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-parents" className="text-sm font-medium">
                    Visa för föräldrar
                  </Label>
                  <p className="text-xs text-gray-500">
                    Välj om föräldrar kan se dina AI-genererade insikter
                  </p>
                </div>
                <Switch 
                  id="show-parents" 
                  checked={profile.insightPermissions.showToParents} 
                  onCheckedChange={handleToggleParentVisibility}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-counselor" className="text-sm font-medium">
                    Visa för studie- och yrkesvägledare
                  </Label>
                  <p className="text-xs text-gray-500">
                    Välj om din SYV kan se dina AI-genererade insikter
                  </p>
                </div>
                <Switch 
                  id="show-counselor" 
                  checked={profile.insightPermissions.showToCounselor} 
                  onCheckedChange={handleToggleCounselorVisibility}
                />
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={handleDeleteAllInsights}
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Radera alla insikter
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <div className="flex items-center mb-2 text-sm text-gray-500">
            <div className="flex items-center mr-4">
              <Eye className="h-4 w-4 mr-1" />
              <span>{profile.insightPermissions.showToCounselor ? 'Synlig' : 'Dold'} för SYV</span>
            </div>
            <div className="flex items-center">
              {profile.insightPermissions.showToParents ? 
                <Eye className="h-4 w-4 mr-1" /> : 
                <EyeOff className="h-4 w-4 mr-1" />
              }
              <span>{profile.insightPermissions.showToParents ? 'Synlig' : 'Dold'} för föräldrar</span>
            </div>
          </div>
        </div>
        
        <AIInsightVisualization 
          insights={approvedInsights}
          title="Dina sparade insikter"
        />
        
        {approvedInsights.length === 0 && (
          <div className="mt-4 text-center">
            <Button
              asChild
              className="bg-guidance-purple hover:bg-guidance-purple/90"
            >
              <a href="/ai-chat">Chatta med SYlVester</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsightsSection;
