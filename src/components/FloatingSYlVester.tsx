
import React, { useEffect } from 'react';
import SYlVester from './SYlVester';
import { useSYlVester } from '@/context/SYlVesterContext';
import { useLocation } from 'react-router-dom';

const FloatingSYlVester: React.FC = () => {
  const { mood, greeting, isVisible, getPageTips, currentPath, setCurrentPath } = useSYlVester();
  const location = useLocation();
  
  // Update current path in context when location changes
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname, setCurrentPath]);

  if (!isVisible) return null;

  const currentPageTips = getPageTips(currentPath);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <SYlVester 
        greeting={greeting}
        mood={mood}
        tips={currentPageTips}
        floatingMode={true}
        size="lg"
        useCustomImage={true}
      />
    </div>
  );
};

export default FloatingSYlVester;
