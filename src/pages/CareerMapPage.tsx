
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CareerMap from '@/components/CareerMap';

const CareerMapPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-guidance-blue to-guidance-purple text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Karriärkarta</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Utforska sambandet mellan gymnasieprogram, yrken och framtida studier
            </p>
          </div>
        </div>
        <CareerMap />
      </div>
      <Footer />
    </div>
  );
};

export default CareerMapPage;
