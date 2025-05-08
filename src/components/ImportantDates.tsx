
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { toast } from '@/components/ui/use-toast';
import { X, Calendar, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const ImportantDates = () => {
  const { profile, removeAppointment, removeImportantDate } = useUser();

  const handleRemoveAppointment = (id: string) => {
    removeAppointment(id);
    toast({
      title: "Bokning borttagen",
      description: "Din bokning har tagits bort.",
    });
  };

  const handleRemoveDate = (id: string) => {
    removeImportantDate(id);
    toast({
      title: "Datum borttaget",
      description: "Det viktiga datumet har tagits bort.",
    });
  };

  // Sort all dates chronologically
  const allDates = [
    ...profile.appointments.map(appt => ({
      ...appt,
      type: 'appointment',
      dateObj: parseISO(`${appt.date}T${appt.time}`)
    })),
    ...profile.importantDates.map(date => ({
      ...date,
      type: 'date',
      dateObj: parseISO(date.date)
    }))
  ].sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

  return (
    <Card className="shadow">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-guidance-blue">Viktiga datum</h3>
        
        {allDates.length > 0 ? (
          <div className="space-y-3">
            {allDates.map((item) => (
              <Card key={`${item.type}-${item.id}`} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1.5 h-full ${item.type === 'appointment' ? 'bg-guidance-green' : 'bg-guidance-blue'}`}></div>
                <CardContent className="p-4 pl-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-slate-100"
                    onClick={() => item.type === 'appointment' 
                      ? handleRemoveAppointment(item.id) 
                      : handleRemoveDate(item.id)
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      {item.type === 'appointment' ? (
                        <div className="bg-guidance-lightGreen p-2 rounded-full">
                          <Clock className="h-5 w-5 text-guidance-green" />
                        </div>
                      ) : (
                        <div className="bg-guidance-lightBlue p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-guidance-blue" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.title}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-y-1 gap-x-4 mt-1">
                        <span className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1.5" />
                          {format(item.dateObj, 'yyyy-MM-dd')}
                        </span>
                        {item.type === 'appointment' && (
                          <>
                            <span className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1.5" />
                              {(item as typeof profile.appointments[0]).time}
                            </span>
                            <span>
                              SYV: {(item as typeof profile.appointments[0]).counselor}
                            </span>
                          </>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center space-y-4 py-2">
            <p className="text-gray-500 italic">
              Inga viktiga datum eller bokningar än. 
            </p>
            <Button 
              asChild
              className="bg-guidance-blue hover:bg-guidance-blue/90"
            >
              <a href="/booking">Boka tid med SYV</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImportantDates;
