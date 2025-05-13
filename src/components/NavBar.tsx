
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';

const NavBar = () => {
  const { profile } = useUser();
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            <span className="text-guidance-green">Min</span>
            <span className="text-guidance-blue">SYV</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-guidance-blue transition-colors">
            Hem
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-guidance-blue transition-colors">
            Om SYV
          </Link>
          <Link to="/booking" className="text-gray-600 hover:text-guidance-blue transition-colors">
            Boka tid
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-guidance-blue transition-colors">
            Min profil
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/profile">
            <Button className="bg-guidance-blue hover:bg-guidance-blue/90 text-white">
              {profile.name ? profile.name : 'Min profil'}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
