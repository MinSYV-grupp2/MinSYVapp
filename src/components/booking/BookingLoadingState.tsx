
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const BookingLoadingState: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center">
        <p>Laddar bokning...</p>
      </div>
      <Footer />
    </div>
  );
};

export default BookingLoadingState;
