
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileSection {
  title: string;
  items: string[];
}

interface SharedInformationProps {
  profileData: {
    interests?: string[];
    strengths?: string[];
    discussionQuestions?: Array<{question: string}>;
  };
}

const SharedInformation: React.FC<SharedInformationProps> = ({ profileData }) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-guidance-blue">Information som delas med din vägledare</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-guidance-green">Dina intressen</h3>
            {profileData.interests && profileData.interests.length > 0 ? (
              <ul className="list-disc pl-5">
                {profileData.interests.map((interest, i) => (
                  <li key={i} className="text-gray-600">{interest}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Inga intressen har lagts till</p>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-guidance-green">Dina styrkor</h3>
            {profileData.strengths && profileData.strengths.length > 0 ? (
              <ul className="list-disc pl-5">
                {profileData.strengths.map((strength, i) => (
                  <li key={i} className="text-gray-600">{strength}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Inga styrkor har lagts till</p>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold mb-2 text-guidance-green">Dina frågor</h3>
            {profileData.discussionQuestions && profileData.discussionQuestions.length > 0 ? (
              <ul className="list-disc pl-5">
                {profileData.discussionQuestions.map((question, i) => (
                  <li key={i} className="text-gray-600">{question.question}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Inga frågor har lagts till</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SharedInformation;
