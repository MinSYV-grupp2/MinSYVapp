
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Monitor } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const { profile, enableDemoMode, disableDemoMode } = useUser();
  const isDemo = profile.demoMode;
  const navigate = useNavigate();

  const handleDemoSYV = () => {
    enableDemoMode();
    navigate('/syv-dashboard');
  };

  const handleExitDemo = () => {
    disableDemoMode();
    navigate('/');
  };

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
            
            {isDemo ? (
              <Button
                variant="outline"
                size="sm"
                className="text-orange-600 border-orange-500 hover:bg-orange-100"
                onClick={handleExitDemo}
              >
                Avsluta demo
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleDemoSYV}
              >
                <Monitor className="h-4 w-4" />
                Prova SYV-demo
              </Button>
            )}
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
