
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-guidance-blue flex items-center gap-1">
              <span className="text-guidance-green">Min</span>SYV
            </Link>
            <p className="text-gray-600 text-sm mt-1">
              Utforska dina intressen och styrkor inför framtiden
            </p>
          </div>
          
          <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Link to="/" className="text-gray-600 hover:text-guidance-blue transition-colors">
              Hem
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-guidance-blue transition-colors">
              Om SYV
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-guidance-blue transition-colors">
              Min profil
            </Link>
          </nav>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MinSYV. Alla rättigheter förbehållna.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
