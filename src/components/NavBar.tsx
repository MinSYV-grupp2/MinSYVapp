
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import SYlVester from '@/components/SYlVester';

const NavBar = () => {
  const { profile } = useUser();
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="hidden sm:block">
            <SYlVester size="sm" mood="happy" />
          </div>
          <span className="text-2xl font-bold">
            <span className="text-guidance-green">Min</span>
            <span className="text-guidance-blue">SYV</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-guidance-blue transition-colors">
            Hem
          </Link>
          <Link to="/interviews" className="text-gray-600 hover:text-guidance-blue transition-colors">
            Intervjuer
          </Link>
          <Link to="/booking" className="text-gray-600 hover:text-guidance-blue transition-colors">
            Boka tid
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-guidance-blue transition-colors">
            Om SYV
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="hidden md:flex" 
            onClick={() => navigate('/profile')}
          >
            Min profil
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
