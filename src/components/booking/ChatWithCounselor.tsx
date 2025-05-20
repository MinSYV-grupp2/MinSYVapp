
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';

interface ChatMessage {
  text: string;
  sender: 'user' | 'counselor';
  timestamp: Date;
}

interface ChatWithCounselorProps {
  counselorName: string;
  initialMessages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const ChatWithCounselor: React.FC<ChatWithCounselorProps> = ({
  counselorName,
  initialMessages,
  onSendMessage,
}) => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialMessages);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      text: chatMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    onSendMessage(chatMessage);
    setChatMessage('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-guidance-blue flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Chat med {counselorName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 rounded-lg p-4 h-80 overflow-y-auto mb-4">
          {chatMessages.map((msg, index) => (
            <div 
              key={index}
              className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div 
                className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                  msg.sender === 'user' 
                    ? 'bg-guidance-blue text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <Textarea
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Skriv ett meddelande till din vägledare..."
            className="flex-grow"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-guidance-purple hover:bg-guidance-purple/90"
          >
            Skicka
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWithCounselor;
