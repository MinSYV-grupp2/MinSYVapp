
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

const BookAppointment = () => {
  const navigate = useNavigate();
  const { profile } = useUser();
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [counselor, setCounselor] = useState('');

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'
  ];

  const counselors = [
    { id: "anna", name: "Anna Johansson" },
    { id: "erik", name: "Erik Lindberg" },
    { id: "maria", name: "Maria Svensson" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!date || !time || !name || !email || !counselor) {
      toast({
        title: "Ofullständig information",
        description: "Vänligen fyll i alla obligatoriska fält.",
        variant: "destructive"
      });
      return;
    }

    // Form is valid, create booking data
    const bookingData = {
      date: format(date, 'yyyy-MM-dd'),
      time,
      name,
      email,
      phone,
      message,
      counselor: counselors.find(c => c.id === counselor),
      profile: {
        interests: profile.interests,
        strengths: profile.strengths,
        reflections: profile.reflections,
        favoriteSchools: profile.favoriteSchools,
        discussionQuestions: profile.discussionQuestions
      }
    };

    // Store booking data in session storage for the confirmation page
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

    // Show toast and navigate to confirmation page
    toast({
      title: "Bokning bekräftad!",
      description: `Din tid med ${counselors.find(c => c.id === counselor)?.name} är bokad ${format(date, 'yyyy-MM-dd')} kl ${time}.`,
    });

    navigate('/booking-confirmation');
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-guidance-blue">Boka tid med SYV</h2>

      <Tabs defaultValue="booking" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-2 w-full mb-8">
          <TabsTrigger value="booking">Boka tid</TabsTrigger>
          <TabsTrigger value="info">Om våra vägledare</TabsTrigger>
        </TabsList>
        
        <TabsContent value="booking">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Välj tid</CardTitle>
                <CardDescription>Välj ett datum och tid som passar dig</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Datum</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Välj ett datum</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                        disabled={(date) => 
                          date < new Date() || 
                          date.getDay() === 0 || 
                          date.getDay() === 6
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {date && (
                  <div className="space-y-2">
                    <Label>Tid</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((timeSlot) => (
                        <Button
                          key={timeSlot}
                          type="button"
                          variant={time === timeSlot ? "default" : "outline"}
                          className={cn(
                            "flex items-center justify-center",
                            time === timeSlot && "bg-guidance-purple hover:bg-guidance-purple/90"
                          )}
                          onClick={() => setTime(timeSlot)}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {timeSlot}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="counselor">Studie- och yrkesvägledare</Label>
                  <Select value={counselor} onValueChange={setCounselor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Välj vägledare" />
                    </SelectTrigger>
                    <SelectContent>
                      {counselors.map((counselor) => (
                        <SelectItem key={counselor.id} value={counselor.id}>
                          {counselor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dina uppgifter</CardTitle>
                <CardDescription>Fyll i dina kontaktuppgifter</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Namn *</Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-post *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input 
                      id="phone" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Meddelande</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Skriv om det är något särskilt du vill diskutera" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-guidance-green hover:bg-guidance-green/90"
                  >
                    Boka tid
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="info">
          <div className="grid md:grid-cols-3 gap-8">
            {counselors.map((counselor) => (
              <Card key={counselor.id}>
                <CardHeader>
                  <CardTitle>{counselor.name}</CardTitle>
                  <CardDescription>Studie- och yrkesvägledare</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="w-32 h-32 mx-auto rounded-full bg-guidance-blue/20 flex items-center justify-center">
                      <span className="text-4xl text-guidance-blue">
                        {counselor.name.split(' ')[0][0]}{counselor.name.split(' ')[1][0]}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {counselor.id === "anna" && "Anna har arbetat som SYV i över 15 år med fokus på högskoleförberedande program."}
                    {counselor.id === "erik" && "Erik är specialiserad på yrkesförberedande program och har kontakter i många branscher."}
                    {counselor.id === "maria" && "Maria hjälper elever att utforska sina intressen och hitta vägar till framtida yrken."}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setCounselor(counselor.id);
                      document.querySelector('[data-value="booking"]')?.dispatchEvent(
                        new MouseEvent('click', { bubbles: true })
                      );
                    }}
                  >
                    Boka tid med {counselor.name.split(' ')[0]}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookAppointment;
