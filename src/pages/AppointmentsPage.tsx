
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays, Clock, User, MapPin, MessageSquare } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { format } from 'date-fns';

interface Counselor {
  id: string;
  name: string;
  title: string;
  bio: string;
}

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  counselor: Counselor;
  description: string;
  status: string;
}

const AppointmentsPage = () => {
  const { toast } = useToast();
  const { profile } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch from Supabase
    // For now we'll use mock data
    const mockCounselors = [
      { 
        id: '1', 
        name: 'Anna Andersson', 
        title: 'SYV',
        bio: 'Specialiserad på tekniska program och internationella studier.'
      },
      { 
        id: '2', 
        name: 'Erik Eriksson', 
        title: 'SYV',
        bio: 'Fokus på samhällsvetenskapliga program och högskoleförberedande utbildningar.'
      },
    ];
    
    const mockAppointments = [
      {
        id: '1',
        title: 'Individuell vägledning',
        date: '2025-05-25',
        time: '13:00',
        location: 'Rum 302',
        counselor: mockCounselors[0],
        description: 'Genomgång av intressen och olika utbildningsvägar.',
        status: 'upcoming'
      },
      {
        id: '2',
        title: 'Uppföljningsmöte',
        date: '2025-06-10',
        time: '14:30',
        location: 'Online via Teams',
        counselor: mockCounselors[1],
        description: 'Uppföljning av tidigare diskussioner och nya frågor.',
        status: 'upcoming'
      }
    ];
    
    setCounselors(mockCounselors);
    setAppointments(mockAppointments);
    setLoading(false);
    
    // When we have authentication set up, we would fetch real data like this:
    /*
    const fetchAppointments = async () => {
      try {
        const { data: appointmentsData, error } = await supabase
          .from('appointments')
          .select(`
            id,
            title,
            date,
            time,
            description,
            location,
            status,
            syv_id(
              id,
              profile_id(
                first_name,
                last_name
              ),
              title,
              bio
            )
          `)
          .eq('student_id', profile.studentId)
          .order('date', { ascending: true });
          
        if (error) throw error;
        
        // Transform data to match our interface
        const formattedAppointments = appointmentsData.map(appt => ({
          id: appt.id,
          title: appt.title,
          date: appt.date,
          time: appt.time,
          location: appt.location || 'Inte angivet',
          counselor: {
            id: appt.syv_id.id,
            name: `${appt.syv_id.profile_id.first_name} ${appt.syv_id.profile_id.last_name}`,
            title: appt.syv_id.title || 'SYV',
            bio: appt.syv_id.bio || ''
          },
          description: appt.description || '',
          status: appt.status
        }));
        
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast({
          title: 'Kunde inte hämta bokningar',
          description: 'Ett fel uppstod vid hämtning av dina bokningar.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppointments();
    */
  }, []);

  const handleBookAppointment = () => {
    window.location.href = '/booking';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mina bokningar</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Här hittar du alla dina bokade tider med studie- och yrkesvägledare.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-4">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
              <TabsTrigger value="upcoming">Kommande bokningar</TabsTrigger>
              <TabsTrigger value="past">Tidigare bokningar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-6">
              <div className="flex flex-col gap-4">
                {loading ? (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center">Laddar bokningar...</p>
                    </CardContent>
                  </Card>
                ) : appointments.filter(a => a.status === 'upcoming').length > 0 ? (
                  appointments.filter(a => a.status === 'upcoming').map((appointment) => (
                    <Card key={appointment.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{appointment.title}</span>
                          <span className="text-sm text-guidance-green font-normal">
                            {appointment.status === 'upcoming' ? 'Kommande' : 'Genomförd'}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-4">
                            <div className="flex items-center text-gray-700">
                              <CalendarDays className="h-5 w-5 text-guidance-green mr-2" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <Clock className="h-5 w-5 text-guidance-green mr-2" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <User className="h-5 w-5 text-guidance-green mr-2" />
                              <span>{appointment.counselor.name}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <MapPin className="h-5 w-5 text-guidance-green mr-2" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-gray-700 mb-4">
                              <MessageSquare className="h-5 w-5 text-guidance-green inline mr-2" />
                              <span className="font-medium">Beskrivning:</span>
                            </p>
                            <p className="text-gray-600">{appointment.description}</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                          <Button variant="outline" onClick={() => window.location.href = `/booking-confirmation?id=${appointment.id}`}>
                            Visa detaljer
                          </Button>
                          <Button className="bg-guidance-green hover:bg-guidance-green/90">
                            Skicka meddelande
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-center">Du har inga kommande bokningar.</p>
                      <div className="mt-4 flex justify-center">
                        <Button onClick={handleBookAppointment}>
                          Boka tid med SYV
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center">Du har inga tidigare bokningar.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-center mb-6">Boka ny tid</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4">Välj en SYV</h3>
                    <div className="space-y-4">
                      {counselors.map((counselor) => (
                        <Card key={counselor.id} className="cursor-pointer hover:border-guidance-green transition-colors">
                          <CardContent className="pt-6">
                            <h4 className="font-medium">{counselor.name}</h4>
                            <p className="text-sm text-gray-500">{counselor.title}</p>
                            <p className="mt-2 text-sm">{counselor.bio}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">Välj datum</h3>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-medium mb-4">Välj tid</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {['9:00', '10:00', '11:00', '13:00', '14:00', '15:00'].map((time) => (
                          <Button key={time} variant="outline" size="sm">
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button onClick={handleBookAppointment} className="w-full md:w-auto">
                        Fortsätt till bokning
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentsPage;
