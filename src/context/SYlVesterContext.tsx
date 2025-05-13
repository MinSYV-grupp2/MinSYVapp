
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Mood = 'happy' | 'thinking' | 'excited';
type Tip = { text: string; seen: boolean };

interface SYlVesterContextType {
  mood: Mood;
  setMood: (mood: Mood) => void;
  tips: Record<string, Tip[]>;
  addTip: (page: string, tip: string) => void;
  markTipAsSeen: (page: string, tipText: string) => void;
  greeting: string;
  setGreeting: (greeting: string) => void;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  getPageTips: (page: string) => string[];
}

const defaultContext: SYlVesterContextType = {
  mood: 'happy',
  setMood: () => {},
  tips: {},
  addTip: () => {},
  markTipAsSeen: () => {},
  greeting: "Hej! Jag är SYlVester, din guide genom gymnasievalet!",
  setGreeting: () => {},
  isVisible: true,
  setIsVisible: () => {},
  getPageTips: () => [],
};

const SYlVesterContext = createContext<SYlVesterContextType>(defaultContext);

export const useSYlVester = () => useContext(SYlVesterContext);

interface SYlVesterProviderProps {
  children: React.ReactNode;
}

const defaultTips: Record<string, Tip[]> = {
  '/': [
    { text: 'Hur fungerar quizen?', seen: false },
    { text: 'Hur sparar jag program?', seen: false },
    { text: 'Vad är en SYV?', seen: false },
  ],
  '/ai-chat': [
    { text: 'Vad kan jag fråga om?', seen: false },
    { text: 'Hur fungerar chatten?', seen: false },
    { text: 'Vilka program finns?', seen: false },
  ],
  '/profile': [
    { text: 'Hur sparar jag mina resultat?', seen: false },
    { text: 'Vad betyder mina resultat?', seen: false },
    { text: 'Hur jämför jag program?', seen: false },
  ],
  '/career-map': [
    { text: 'Hur använder jag karriärkartan?', seen: false },
    { text: 'Vilka jobb passar mig?', seen: false },
    { text: 'Vad betyder de olika färgerna?', seen: false },
  ]
};

export const SYlVesterProvider: React.FC<SYlVesterProviderProps> = ({ children }) => {
  const [mood, setMood] = useState<Mood>('happy');
  const [tips, setTips] = useState<Record<string, Tip[]>>(defaultTips);
  const [greeting, setGreeting] = useState(defaultContext.greeting);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  // Update greeting based on current route
  useEffect(() => {
    const path = location.pathname;
    let newGreeting = defaultContext.greeting;
    let newMood: Mood = 'happy';

    switch(path) {
      case '/':
        newGreeting = "Välkommen till Gymnasieväljaren! Jag är SYlVester och hjälper dig att välja rätt!";
        newMood = 'excited';
        break;
      case '/ai-chat':
        newGreeting = "Här kan du ställa frågor till mig! Jag vet mycket om gymnasieprogram och utbildningar!";
        newMood = 'happy';
        break;
      case '/profile':
        newGreeting = "Det här är din profil! Här samlas allt du sparat och dina resultat.";
        newMood = 'happy';
        break;
      case '/career-map':
        newGreeting = "Karriärkartan visar dig olika vägar till framtida jobb och utbildningar!";
        newMood = 'thinking';
        break;
      default:
        newGreeting = "Jag är SYlVester! Klicka på mig om du behöver hjälp!";
    }

    setGreeting(newGreeting);
    setMood(newMood);
  }, [location]);

  const addTip = (page: string, tipText: string) => {
    setTips(prev => {
      const pageTips = prev[page] || [];
      if (!pageTips.some(tip => tip.text === tipText)) {
        return {
          ...prev,
          [page]: [...pageTips, { text: tipText, seen: false }]
        };
      }
      return prev;
    });
  };

  const markTipAsSeen = (page: string, tipText: string) => {
    setTips(prev => {
      const pageTips = prev[page] || [];
      return {
        ...prev,
        [page]: pageTips.map(tip => 
          tip.text === tipText ? { ...tip, seen: true } : tip
        )
      };
    });
  };

  const getPageTips = (page: string): string[] => {
    const pageTips = tips[page] || [];
    return pageTips.filter(tip => !tip.seen).map(tip => tip.text);
  };

  return (
    <SYlVesterContext.Provider value={{
      mood,
      setMood,
      tips,
      addTip,
      markTipAsSeen,
      greeting,
      setGreeting,
      isVisible,
      setIsVisible,
      getPageTips,
    }}>
      {children}
    </SYlVesterContext.Provider>
  );
};
