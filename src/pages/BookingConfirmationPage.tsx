
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BookingDetails from '@/components/booking/BookingDetails';
import ChatWithCounselor from '@/components/booking/ChatWithCounselor';
import SharedInformation from '@/components/booking/SharedInformation';
import BookingLoadingState from '@/components/booking/BookingLoadingState';
import BookingNotFound from '@/components/booking/BookingNotFound';
import PageHeader from '@/components/booking/PageHeader';
import { supabase } from '@/integrations/supabase/client';

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

const BookingConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get('id');
  const { profile } = useUser();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'counselor', timestamp: Date}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = sessionStorage.getItem('bookingData');
    
    if (appointmentId) {
      // When we have authentication implemented, we'd fetch from Supabase
      setLoading(true);
      
      // This is where we would get appointment details from Supabase
      // For now, just use mock data
      const mockAppointment = {
        date: '2025-05-25',
        time: '13:00',
        name: 'Anna Andersson',
        email: 'anna.andersson@skola.se',
        counselor: {
          id: '1',
          name: 'Anna Andersson'
        },
        profile: {
          interests: ['Teknik', 'Programmering', 'Design'],
          strengths: ['Analytisk förmåga', 'Kreativitet', 'Samarbete'],
          reflections: ['Jag vill jobba med teknik i framtiden'],
          favoriteSchools: [{name: 'Teknikgymnasiet'}],
          discussionQuestions: [{question: 'Vilka kurser är viktiga för teknikprogram?'}]
        }
      };
      
      setBookingData(mockAppointment);
      
      // Add sample welcome message from the counselor
      setChatMessages([
        {
          text: `Hej ${profile.name || 'där'}! Jag ser fram emot vårt möte. Om du har några frågor innan dess, är det bara att skriva här!`,
          sender: 'counselor',
          timestamp: new Date()
        }
      ]);
      
      setLoading(false);
      
    } else if (storedData) {
      setBookingData(JSON.parse(storedData));
      
      // Add sample welcome message from the counselor
      setChatMessages([
        {
          text: `Hej ${profile.name || 'där'}! Jag ser fram emot vårt möte. Om du har några frågor innan dess, är det bara att skriva här!`,
          sender: 'counselor',
          timestamp: new Date()
        }
      ]);
    } else {
      navigate('/booking');
      return;
    }
  }, [navigate, profile.name, appointmentId]);

  const handleSendMessage = async (message: string) => {
    // When we have Supabase auth set up, we could save the message:
    /*
    try {
      // Save message to chat_history
      const { error } = await supabase
        .from('chat_history')
        .insert({
          student_id: profile.studentId, // Would be the student_profile ID
          role: 'student',
          content: message
        });
      
      if (error) throw error;
      
    } catch (error) {
      console.error('Error saving message:', error);
    }
    */
    
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

  if (loading) {
    return <BookingLoadingState />;
  }

  if (!bookingData) {
    return <BookingNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <PageHeader
          title="Bokningsbekräftelse"
          description="Din tid med SYV är bokad! Här kan du se detaljer och kommunicera med din vägledare."
        />
        
        <div className="container mx-auto py-8 px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="md:col-span-1">
              <BookingDetails
                date={bookingData.date}
                time={bookingData.time}
                counselorName={bookingData.counselor?.name || ''}
              />
            </div>
            
            {/* Chat with Counselor */}
            <div className="md:col-span-2">
              <ChatWithCounselor
                counselorName={bookingData.counselor?.name || ''}
                initialMessages={chatMessages}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
          
          {/* Shared information preview */}
          <SharedInformation profileData={bookingData.profile || {}} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingConfirmationPage;
