
import React from 'react';
import SYlVester from './SYlVester';
import { useSYlVester } from '@/context/SYlVesterContext';

const FloatingSYlVester: React.FC = () => {
  const { mood, greeting, isVisible, getPageTips, currentPath } = useSYlVester();
  
  if (!isVisible) return null;

  const currentPageTips = getPageTips(currentPath);

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
