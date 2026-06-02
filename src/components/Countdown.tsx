import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ThemeMode } from '../types';

interface CountdownProps {
  theme: ThemeMode;
}

export function Countdown({ theme }: CountdownProps) {
  // Use a stable, persisted launch countdown date (45 days from first load, or October 24, 2026)
  const [targetTime, setTargetTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const key = 'elite_ludo_launch_target';
    let savedTarget = localStorage.getItem(key);
    let target = 0;

    if (savedTarget) {
      target = parseInt(savedTarget, 10);
      // If the saved target is in the past, reset it to 30 days out for demo purposes
      if (target < Date.now()) {
        const newTarget = Date.now() + 30 * 24 * 60 * 60 * 1000;
        localStorage.setItem(key, newTarget.toString());
        target = newTarget;
      }
    } else {
      // 45 days, 12 hours from now
      const newTarget = Date.now() + (45 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000);
      localStorage.setItem(key, newTarget.toString());
      target = newTarget;
    }

    setTargetTime(target);
  }, []);

  useEffect(() => {
    if (targetTime === 0) return;

    const calculateTimeLeft = () => {
      const difference = targetTime - Date.now();
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const padZero = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const isMidnight = theme === 'midnight';

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ];

  return (
    <div id="countdown-timer-container" className="flex flex-col items-center">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-4 gap-3 sm:gap-6 md:gap-8 max-w-2xl px-4 py-8"
      >
        {timeBlocks.map((block, i) => (
          <motion.div
            key={block.label}
            variants={itemVariants}
            id={`timer-${block.label.toLowerCase()}`}
            className={`
              relative flex flex-col items-center justify-center 
              w-18 h-20 sm:w-24 sm:h-26 md:w-28 md:h-30 rounded-lg 
              backdrop-blur-md transition-all duration-500 gold-border
              ${isMidnight 
                ? 'bg-black/40 shadow-lg shadow-amber-950/10' 
                : 'bg-white/80 shadow-md shadow-amber-900/5'
              }
            `}
          >
            {/* Elegant luxury top gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            
            <span className={`
              text-2xl sm:text-4xl md:text-5xl font-royal royal-text font-bold mb-1 sm:mb-2 gold-text
            `}>
              {padZero(block.value)}
            </span>
            
            <span className={`
              text-[9px] sm:text-[11px] font-sans tracking-widest font-semibold
              ${isMidnight ? 'text-white/60' : 'text-zinc-650'}
            `}>
              {block.label}
            </span>

            {/* Premium miniature border flourish */}
            <div className="absolute inset-[3px] rounded bg-transparent border-[0.5px] border-amber-500/10 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
      <div className="flex items-center gap-2 mb-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span className={`text-[11px] font-mono tracking-wider ${isMidnight ? 'text-zinc-400' : 'text-zinc-600'}`}>
          DECREE OF ANNOUNCEMENT: LAUNCH COMMENCEMENT ACTIVE
        </span>
      </div>
    </div>
  );
}
