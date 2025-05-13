
import React from 'react';
import SYlVester from './SYlVester';
import { useSYlVester } from '@/context/SYlVesterContext';
import { useLocation } from 'react-router-dom';

const FloatingSYlVester: React.FC = () => {
  const { mood, greeting, isVisible, getPageTips } = useSYlVester();
  const location = useLocation();
  
  if (!isVisible) return null;

  const currentPageTips = getPageTips(location.pathname);

  return (
    <SYlVester 
      greeting={greeting}
      mood={mood}
      tips={currentPageTips}
      floatingMode={true}
      size="md"
    />
  );
};

export default FloatingSYlVester;
