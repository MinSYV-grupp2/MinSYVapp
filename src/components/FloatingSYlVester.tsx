
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SYlVester from './SYlVester';
import { useSYlVester } from '@/context/SYlVesterContext';
import { useLocation } from 'react-router-dom';

const FloatingSYlVester: React.FC = () => {
  const { mood, greeting, isVisible, getPageTips, currentPath, setCurrentPath } = useSYlVester();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Update current path in context when location changes
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname, setCurrentPath]);

  if (!isVisible) return null;

  const currentPageTips = getPageTips(currentPath);
  
  // Add a "Chat with me" option to every page
  const allTips = [...currentPageTips, "Chatta med mig"];
  
  const handleTipClick = (tip: string) => {
    if (tip === "Chatta med mig") {
      navigate('/ai-chat');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <SYlVester 
        greeting={greeting}
        mood={mood}
        tips={allTips}
        floatingMode={true}
        size="lg"
        useCustomImage={true}
        onTipClick={handleTipClick}
      />
    </div>
  );
};

export default FloatingSYlVester;
