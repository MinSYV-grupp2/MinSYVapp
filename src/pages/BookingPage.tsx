
import React from 'react';
import NavBar from '@/components/NavBar';
import BookAppointment from '@/components/BookAppointment';
import Footer from '@/components/Footer';

const BookingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Boka tid med SYV</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Få personlig vägledning om utbildning, yrkesval och framtidsplaner
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6 bg-guidance-lightGreen">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl text-guidance-green font-semibold mb-2">Förberedd vägledning</h2>
            <p className="text-gray-700">
              När du bokar tid kommer din vägledare att få tillgång till din profil med intressen, 
              styrkor och eventuella frågor du sparat. Detta gör att ni direkt kan fokusera på 
              meningsfulla samtal istället för att börja från noll.
            </p>
          </div>
        </div>
        
        <BookAppointment />
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
