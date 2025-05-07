
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
        <BookAppointment />
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
