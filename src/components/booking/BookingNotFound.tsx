
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BookingNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Ingen bokning hittades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Det verkar som att det inte finns någon bokningsinformation.</p>
            <Button asChild>
              <Link to="/booking">Gör en ny bokning</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default BookingNotFound;
