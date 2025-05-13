
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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

  // SVG paths for the cartoon cat based on mood
  const getCatSvg = () => {
    const baseClasses = cn(
      sizeClasses[size], 
      "fill-current",
      moodColors[mood]
    );
    
    if (mood === 'happy') {
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          <path d="M50,20c-16.5,0-30,13.5-30,30s13.5,30,30,30s30-13.5,30-30S66.5,20,50,20z M35,45c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5 S32.2,45,35,45z M65,45c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5S62.2,45,65,45z M65,70H35c-1.1,0-2-0.9-2-2s0.9-2,2-2h30 c1.1,0,2,0.9,2,2S66.1,70,65,70z" />
          <path d="M25,30c0,0-8-10-15-10s0,15,0,15S17,40,25,30z" />
          <path d="M75,30c0,0,8-10,15-10s0,15,0,15S83,40,75,30z" />
        </svg>
      );
    } else if (mood === 'thinking') {
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          <path d="M50,20c-16.5,0-30,13.5-30,30s13.5,30,30,30s30-13.5,30-30S66.5,20,50,20z M35,45c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5 S32.2,45,35,45z M65,45c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5S62.2,45,65,45z M65,65c0,1.1-0.9,2-2,2H45c-1.1,0-2-0.9-2-2 s0.9-2,2-2h18C64.1,63,65,63.9,65,65z" />
          <path d="M25,30c0,0-8-10-15-10s0,15,0,15S17,40,25,30z" />
          <path d="M75,30c0,0,8-10,15-10s0,15,0,15S83,40,75,30z" />
        </svg>
      );
    } else { // excited
      return (
        <svg viewBox="0 0 100 100" className={baseClasses}>
          <path d="M50,20c-16.5,0-30,13.5-30,30s13.5,30,30,30s30-13.5,30-30S66.5,20,50,20z M35,45c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5 S32.2,45,35,45z M65,45c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5S62.2,45,65,45z M50,75c-5.5,0-10-4.5-10-10h20 C60,70.5,55.5,75,50,75z" />
          <path d="M25,30c0,0-8-10-15-10s0,15,0,15S17,40,25,30z" />
          <path d="M75,30c0,0,8-10,15-10s0,15,0,15S83,40,75,30z" />
          <circle cx="35" cy="50" r="2" fill="#FFFFFF" />
          <circle cx="65" cy="50" r="2" fill="#FFFFFF" />
        </svg>
      );
    }
  };

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
                {getCatSvg()}
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
                {getCatSvg()}
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
