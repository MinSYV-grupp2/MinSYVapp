
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import SYlVester from './SYlVester';
import { useSYlVester } from '@/context/SYlVesterContext';

const NavBar = () => {
  const { profile } = useUser();
  const { mood } = useSYlVester();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <SYlVester 
            size="md" 
            mood={mood}
            greeting="Välkommen till Vägledning! Klicka här för att gå till startsidan."
            className="ml-[-8px]"
          />
          <span className="text-2xl font-bold ml-1">
            <span className="text-guidance-green">Väg</span>
            <span className="text-guidance-blue">ledning</span>
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
