
import React, { useState, useEffect } from 'react';
import { Cat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

interface SYlVesterProps {
  greeting?: string;
  tips?: string[];
  floatingMode?: boolean;
  onTipClick?: (tip: string) => void;
  size?: 'sm' | 'md' | 'lg';
  mood?: 'happy' | 'thinking' | 'excited';
  className?: string;
}

const SYlVester: React.FC<SYlVesterProps> = ({
  greeting = "Hej! Jag är SYlVester, din guide genom gymnasievalet!",
  tips = [],
  floatingMode = false,
  onTipClick,
  size = 'md',
  mood = 'happy',
  className,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const moodColors = {
    happy: 'text-guidance-green',
    thinking: 'text-guidance-blue',
    excited: 'text-guidance-purple'
  };

  const containerClasses = floatingMode 
    ? 'fixed bottom-4 right-4 z-50' 
    : 'relative';

  const handleHover = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  useEffect(() => {
    // Show greeting animation when component mounts
    if (!floatingMode) {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [floatingMode]);

  return (
    <div className={cn(containerClasses, className)}>
      <div className="relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "rounded-full p-2 transition-all hover:scale-110",
                isAnimating && "animate-bounce",
                floatingMode && "shadow-lg bg-white hover:bg-white"
              )}
              onMouseEnter={handleHover}
            >
              <div className={cn("relative", mood === 'excited' && "animate-pulse")}>
                <Cat 
                  className={cn(
                    sizeClasses[size], 
                    moodColors[mood]
                  )} 
                />
                {floatingMode && (
                  <Badge className="absolute -top-1 -right-1 bg-guidance-purple text-[10px] h-5">
                    ?
                  </Badge>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4 bg-white rounded-xl shadow-lg border border-guidance-lightBlue">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cat className={cn("w-6 h-6", moodColors[mood])} />
                <p className="font-bold text-guidance-blue">SYlVester</p>
              </div>
              <p className="text-sm">{greeting}</p>
              
              {tips.length > 0 && (
                <div className="pt-2 space-y-2">
                  <p className="text-xs font-semibold text-guidance-purple">Vad vill du veta?</p>
                  <div className="flex flex-wrap gap-2">
                    {tips.map((tip, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm" 
                        className="text-xs py-1 h-auto border-guidance-lightPurple text-guidance-purple"
                        onClick={() => onTipClick && onTipClick(tip)}
                      >
                        {tip}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default SYlVester;
