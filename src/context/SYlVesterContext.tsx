
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Mood = 'happy' | 'thinking' | 'excited';

interface Tip {
  text: string;
}

interface SYlVesterContextType {
  mood: Mood;
  setMood: (mood: Mood) => void;
  greeting: string;
  setGreeting: (greeting: string) => void;
  tips: Record<string, Tip[]>;
  addTip: (path: string, tip: Tip) => void;
  removeTip: (path: string, index: number) => void;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  getPageTips: (path: string) => string[];
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

const defaultContext: SYlVesterContextType = {
  mood: 'happy',
  setMood: () => {},
  greeting: 'Hej! Jag är SYlVester, din guide genom gymnasievalet!',
  setGreeting: () => {},
  tips: {},
  addTip: () => {},
  removeTip: () => {},
  isVisible: true,
  setIsVisible: () => {},
  getPageTips: () => [],
  currentPath: '/',
  setCurrentPath: () => {},
};

const defaultTips: Record<string, Tip[]> = {
  '/': [
    { text: 'Hur fungerar quizen?' },
    { text: 'Hur sparar jag program?' },
    { text: 'Vad är en SYV?' },
  ],
  '/career-map': [
    { text: 'Vad är en karriärkarta?' },
    { text: 'Hur hittar jag rätt program?' },
  ],
  '/profile': [
    { text: 'Hur sparar jag mina val?' },
    { text: 'Vad kan jag göra här?' },
  ],
  '/booking': [
    { text: 'Hur bokar jag en tid?' },
    { text: 'Vad kan jag fråga?' },
  ],
  '/ai-chat': [
    { text: 'Vad kan jag fråga AI:n?' },
    { text: 'Är AI:n alltid korrekt?' },
  ],
};

const SYlVesterContext = createContext<SYlVesterContextType>(defaultContext);

export const useSYlVester = () => useContext(SYlVesterContext);

export const SYlVesterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mood, setMood] = useState<Mood>(defaultContext.mood);
  const [tips, setTips] = useState<Record<string, Tip[]>>(defaultTips);
  const [greeting, setGreeting] = useState(defaultContext.greeting);
  const [isVisible, setIsVisible] = useState(true);
  const [currentPath, setCurrentPath] = useState('/');
  
  // Update greeting based on current path
  useEffect(() => {
    const path = currentPath;
    
    let newGreeting = defaultContext.greeting;
    let newMood: Mood = 'happy';
    
    // Set specific greetings for different pages
    if (path === '/') {
      newGreeting = 'Välkommen! Utforska olika gymnasieprogram som passar dig!';
      newMood = 'excited';
    } else if (path === '/profile') {
      newGreeting = 'Här är din profil! Jag hjälper dig att hålla koll på dina favoriter.';
      newMood = 'happy';
    } else if (path === '/booking') {
      newGreeting = 'Boka tid med en studie- och yrkesvägledare för mer hjälp!';
      newMood = 'thinking';
    } else if (path === '/career-map') {
      newGreeting = 'Utforska olika karriärvägar och vad de kräver för utbildning!';
      newMood = 'excited';
    } else if (path === '/ai-chat') {
      newGreeting = 'Ställ frågor till mig för att lära dig mer om gymnasievalet!';
      newMood = 'thinking';
    }
    
    setGreeting(newGreeting);
    setMood(newMood);
  }, [currentPath]);

  const addTip = (path: string, tip: Tip) => {
    setTips(prevTips => {
      const updatedTips = { ...prevTips };
      if (!updatedTips[path]) {
        updatedTips[path] = [];
      }
      updatedTips[path] = [...updatedTips[path], tip];
      return updatedTips;
    });
  };

  const removeTip = (path: string, index: number) => {
    setTips(prevTips => {
      const updatedTips = { ...prevTips };
      if (updatedTips[path]) {
        updatedTips[path] = updatedTips[path].filter((_, i) => i !== index);
      }
      return updatedTips;
    });
  };

  const getPageTips = (path: string): string[] => {
    if (!tips[path]) return [];
    return tips[path].map(tip => tip.text);
  };

  return (
    <SYlVesterContext.Provider value={{
      mood,
      setMood,
      greeting,
      setGreeting,
      tips,
      addTip,
      removeTip,
      isVisible,
      setIsVisible,
      getPageTips,
      currentPath,
      setCurrentPath
    }}>
      {children}
    </SYlVesterContext.Provider>
  );
};
