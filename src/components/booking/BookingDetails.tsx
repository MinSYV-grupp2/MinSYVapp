
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookingDetailsProps {
  date: string;
  time: string;
  counselorName: string;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  date,
  time,
  counselorName,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-guidance-blue">Bokningsdetaljer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-guidance-green mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-guidance-green mr-2" />
          <span>{time}</span>
        </div>
        <div className="flex items-center">
          <User className="h-5 w-5 text-guidance-green mr-2" />
          <span>{counselorName}</span>
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
  );
};

export default BookingDetails;
