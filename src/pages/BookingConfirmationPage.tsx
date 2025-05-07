
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Calendar, Clock, MessageSquare, User } from 'lucide-react';

interface BookingData {
  date: string;
  time: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  counselor?: {
    id: string;
    name: string;
  };
  profile?: {
    interests: string[];
    strengths: string[];
    reflections: string[];
    favoriteSchools: any[];
    discussionQuestions: any[];
  };
}

const BookingConfirmationPage = () => {
  const navigate = useNavigate();
  const { profile } = useUser();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'counselor', timestamp: Date}[]>([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem('bookingData');
    if (!storedData) {
      navigate('/booking');
      return;
    }
    setBookingData(JSON.parse(storedData));
    
    // Add sample welcome message from the counselor
    setChatMessages([
      {
        text: `Hej ${profile.name || 'där'}! Jag ser fram emot vårt möte. Om du har några frågor innan dess, är det bara att skriva här!`,
        sender: 'counselor',
        timestamp: new Date()
      }
    ]);
  }, [navigate, profile.name]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    // Add user message
    setChatMessages(prev => [
      ...prev, 
      {
        text: chatMessage,
        sender: 'user',
        timestamp: new Date()
      }
    ]);
    
    setChatMessage('');
    
    // Simulate counselor response after a short delay
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        {
          text: "Tack för ditt meddelande! Jag läser det och återkommer så snart jag kan.",
          sender: 'counselor',
          timestamp: new Date()
        }
      ]);
    }, 1000);
  };

  if (!bookingData) {
    return <div>Laddar bokning...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Bokningsbekräftelse</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Din tid med SYV är bokad! Här kan du se detaljer och kommunicera med din vägledare.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Booking Details */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-guidance-blue">Bokningsdetaljer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-guidance-green mr-2" />
                  <span>{bookingData.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-guidance-green mr-2" />
                  <span>{bookingData.time}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-guidance-green mr-2" />
                  <span>{bookingData.counselor?.name}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold mb-2">Om ditt möte</h3>
                  <p className="text-sm text-gray-600">
                    Din vägledare har tillgång till din profil och kan se dina intressen, 
                    styrkor och andra saker du delat i appen för att förbereda ert samtal.
                  </p>
                </div>
                
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full mt-4"
                >
                  <Link to="/profile">
                    Se och redigera din profil
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Chat with Counselor */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-guidance-blue flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Chat med {bookingData.counselor?.name}
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
          </div>
          
          {/* Shared information preview */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-guidance-blue">Information som delas med din vägledare</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-guidance-green">Dina intressen</h3>
                  {bookingData.profile?.interests && bookingData.profile.interests.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {bookingData.profile.interests.map((interest, i) => (
                        <li key={i} className="text-gray-600">{interest}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Inga intressen har lagts till</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-guidance-green">Dina styrkor</h3>
                  {bookingData.profile?.strengths && bookingData.profile.strengths.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {bookingData.profile.strengths.map((strength, i) => (
                        <li key={i} className="text-gray-600">{strength}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Inga styrkor har lagts till</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-guidance-green">Dina frågor</h3>
                  {bookingData.profile?.discussionQuestions && bookingData.profile.discussionQuestions.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {bookingData.profile.discussionQuestions.map((question, i) => (
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingConfirmationPage;
