import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playDiceClatter, playRoyalChime } from '../utils';
import { ThemeMode } from '../types';
import { Crown, HelpCircle, Sparkles, Trophy, RotateCcw } from 'lucide-react';

interface LudoInteractiveProps {
  theme: ThemeMode;
  imageSrc: string;
}

const DICE_FATES = [
  { roll: 1, title: "The Sovereign Scout", desc: "A singular calculated advance. The quiet preparation before a complete dominance." },
  { roll: 2, title: "The Gilded Gambit", desc: "Two steps forward. A strategic stride balancing caution and sovereign expansion." },
  { roll: 3, title: "The Triple Monarch", desc: "A triumvirate of movements to capture the strategic quadrants." },
  { roll: 4, title: "Imperial Quadrant", desc: "Four paces. Securing the vital gold checkpoints of the royal quadrant." },
  { roll: 5, title: "Grandmaster's Vanguard", desc: "Five positions claimed. Striking distance established for the ultimate victory." },
  { roll: 6, title: "The Royal Sovereign Aura", desc: "A perfect Six! Release a secondary coin and command an additional sovereign turn." }
];

export function LudoInteractive({ theme, imageSrc }: LudoInteractiveProps) {
  const [rollCount, setRollCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elite_ludo_roll_count');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [lastRollWasSix, setLastRollWasSix] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elite_ludo_last_roll_was_six');
      return saved === 'true';
    }
    return false;
  });

  const [currentRoll, setCurrentRoll] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elite_ludo_current_roll');
      return saved ? parseInt(saved, 10) : null;
    }
    return null;
  });

  const [rollHistory, setRollHistory] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elite_ludo_roll_history');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isRolling, setIsRolling] = useState(false);
  const [activeToken, setActiveToken] = useState<'gold' | 'black' | 'white'>('gold');
  const isMidnight = theme === 'midnight';

  const hasRollLimitReached = rollCount > 0 && !lastRollWasSix;

  const handleRoll = () => {
    if (isRolling || hasRollLimitReached) return;
    setIsRolling(true);
    playDiceClatter();

    // Roll animation sequence
    let rollingTicks = 0;
    const interval = setInterval(() => {
      setCurrentRoll(Math.floor(Math.random() * 6) + 1);
      rollingTicks++;
      if (rollingTicks > 12) {
        clearInterval(interval);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        
        setCurrentRoll(finalRoll);
        if (typeof window !== 'undefined') {
          localStorage.setItem('elite_ludo_current_roll', String(finalRoll));
        }

        setRollHistory((prev) => {
          const updated = [finalRoll, ...prev.slice(0, 4)];
          if (typeof window !== 'undefined') {
            localStorage.setItem('elite_ludo_roll_history', JSON.stringify(updated));
          }
          return updated;
        });

        const newRollCount = rollCount + 1;
        setRollCount(newRollCount);
        if (typeof window !== 'undefined') {
          localStorage.setItem('elite_ludo_roll_count', String(newRollCount));
        }

        const isSix = finalRoll === 6;
        setLastRollWasSix(isSix);
        if (typeof window !== 'undefined') {
          localStorage.setItem('elite_ludo_last_roll_was_six', String(isSix));
        }

        setIsRolling(false);
        playRoyalChime();
      }
    }, 60);
  };

  const handleReset = () => {
    setRollCount(0);
    setLastRollWasSix(false);
    setCurrentRoll(null);
    setRollHistory([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('elite_ludo_roll_count');
      localStorage.removeItem('elite_ludo_last_roll_was_six');
      localStorage.removeItem('elite_ludo_current_roll');
      localStorage.removeItem('elite_ludo_roll_history');
    }
    playRoyalChime();
  };

  const activeFate = currentRoll ? DICE_FATES.find(f => f.roll === currentRoll) : null;

  return (
    <div 
      id="noble-interactive-chamber" 
      className={`
        w-full rounded-xl p-6 md:p-8 transition-all duration-700 border
        ${isMidnight 
          ? 'bg-[#050505] gold-border shadow-xl shadow-amber-950/5' 
          : 'bg-gradient-to-br from-white via-zinc-50 to-zinc-100 border-amber-500/20 shadow-md'
        }
      `}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Exquisite Art Display & Token Selection */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-6">
          <div className="relative group rounded-xl overflow-hidden border-[1px] border-amber-500/30 shadow-2xl">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-400/10 to-transparent pointer-events-none z-10" />
            
            {/* Embedded Gemini Generated Image */}
            <img 
              src={imageSrc} 
              alt="Elite Ludo Royal Insignia" 
              className="w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
              id="royal-avatar-image"
            />
            
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10 flex items-center justify-between">
              <div>
                <p className="text-white text-xs font-mono tracking-widest uppercase">ELITE ARTIFACT #178</p>
                <p className="text-amber-400 text-[10px] tracking-wider uppercase">SOVEREIGN GOLD TOKENS</p>
              </div>
              <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
          </div>

          {/* Token customizer */}
          <div className="flex flex-col gap-2">
            <span className={`text-[10px] tracking-widest font-mono font-bold ${isMidnight ? 'text-zinc-500' : 'text-zinc-400'}`}>
              SELECT YOUR SOVEREIGN AVATAR TIER:
            </span>
            <div className="flex gap-2">
              {[
                { id: 'gold', name: 'Gilded Crown', color: 'bg-gradient-to-br from-amber-300 to-amber-600 border-amber-200' },
                { id: 'black', name: 'Obsidian Helm', color: 'bg-gradient-to-br from-neutral-800 to-black border-neutral-600' },
                { id: 'white', name: 'Ivory Throne', color: 'bg-gradient-to-br from-white to-gray-300 border-gray-100' },
              ].map((token) => (
                <button
                  key={token.id}
                  id={`token-btn-${token.id}`}
                  onClick={() => {
                    setActiveToken(token.id as any);
                    playRoyalChime();
                  }}
                  className={`
                    flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono border transition-all duration-300
                    ${activeToken === token.id 
                      ? 'border-amber-500 scale-102 font-bold ring-1 ring-amber-500/30' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                    }
                    ${isMidnight ? 'text-white' : 'text-zinc-900'}
                  `}
                >
                  <span className={`w-3 h-3 rounded-full ${token.color} border-[0.5px]`} />
                  <span className="hidden sm:inline">{token.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dice Interaction Mechanics */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full gap-5">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              
              <span className={`text-xs font-mono tracking-widest ${isMidnight ? 'text-zinc-400' : 'text-zinc-600'}`}>
                INTERACTIVE SACRED DICE ORACLE
              </span>
            </div>
            
            <h3 className={`text-lg sm:text-2xl font-sans font-medium tracking-tight ${isMidnight ? 'text-white' : 'text-zinc-900'}`}>
              Test Your Royal Fortune Before Launch
            </h3>
            
            <p className={`text-xs sm:text-sm leading-relaxed ${isMidnight ? 'text-zinc-400' : 'text-zinc-600'}`}>
              The sovereign dice in <span className="text-amber-400 font-semibold">Elite Ludo</span> are weighted for legendary strategy. In our custom game engine, rolls of six carry specific mechanics modeled after ancient Indian royalty. Roll below to see your destiny.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center my-4">
            {/* The Die Visualizer */}
            <div className="relative flex flex-col items-center">
              <motion.div 
                id="golden-die-element"
                whileTap={hasRollLimitReached ? {} : { scale: 0.93 }}
                onClick={handleRoll}
                className={`
                  relative w-28 h-28 rounded-2xl flex items-center justify-center select-none
                  border border-amber-400/40 shadow-xl transition-all duration-300
                  ${isMidnight 
                    ? 'bg-gradient-to-br from-amber-100 via-amber-300 to-amber-600 shadow-amber-950/20' 
                    : 'bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-amber-900/10'
                  }
                  ${hasRollLimitReached 
                    ? 'cursor-default' 
                    : 'cursor-pointer hover:brightness-105'
                  }
                `}
                animate={isRolling ? { 
                  rotate: [0, 90, 180, 270, 360],
                  x: [0, -10, 10, -5, 5, 0],
                  y: [0, 5, -5, 8, -8, 0],
                  scale: [1, 1.1, 0.95, 1.05, 1]
                } : {}}
                transition={{ duration: 0.65, ease: 'easeInOut' }}
              >
                {/* Luxury reflection lines */}
                <div className="absolute inset-2 border-[0.5px] border-white/25 rounded-xl pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                {/* Dice Dots based on roll */}
                <div className="grid grid-cols-3 grid-rows-3 gap-2.5 w-14 h-14 items-center justify-items-center">
                  {isRolling ? (
                    <div className="col-span-3 row-span-3 flex items-center justify-center text-amber-950 font-serif text-3xl font-bold uppercase animate-pulse">
                      <Crown className="w-8 h-8 text-amber-950 animate-bounce" />
                    </div>
                  ) : (
                    <>
                      {/* Render standard dice dots */}
                      {/* 1 */}
                      {currentRoll === 1 && (
                        <div className="col-start-2 row-start-2 w-3.5 h-3.5 rounded-full bg-amber-950 shadow-inner" />
                      )}
                      {/* 2 */}
                      {currentRoll === 2 && (
                        <>
                          <div className="col-start-1 row-start-1 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-3 row-start-3 w-3.5 h-3.5 rounded-full bg-amber-950" />
                        </>
                      )}
                      {/* 3 */}
                      {currentRoll === 3 && (
                        <>
                          <div className="col-start-1 row-start-1 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-2 row-start-2 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-3 row-start-3 w-3.5 h-3.5 rounded-full bg-amber-950" />
                        </>
                      )}
                      {/* 4 */}
                      {currentRoll === 4 && (
                        <>
                          <div className="col-start-1 row-start-1 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-3 row-start-1 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-1 row-start-3 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-3 row-start-3 w-3.5 h-3.5 rounded-full bg-amber-950" />
                        </>
                      )}
                      {/* 5 */}
                      {currentRoll === 5 && (
                        <>
                          <div className="col-start-1 row-start-1 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-3 row-start-1 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-2 row-start-2 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-1 row-start-3 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-3 row-start-3 w-3.5 h-3.5 rounded-full bg-amber-950" />
                        </>
                      )}
                      {/* 6 */}
                      {currentRoll === 6 && (
                        <>
                          <div className="col-start-1 row-start-1 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-3 row-start-1 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-1 row-start-2 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-3 row-start-2 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-1 row-start-3 w-3.5 h-3.5 rounded-full bg-amber-950" />
                          <div className="col-start-3 row-start-3 w-3.5 h-3.5 rounded-full bg-amber-950" />
                        </>
                      )}
                      {!currentRoll && (
                        <div className="col-span-3 row-span-3 flex flex-col items-center justify-center text-amber-950">
                          <Trophy className="w-5 h-5 text-amber-950" />
                          <span className="text-[9px] font-mono tracking-wider mt-1 uppercase font-bold">ROLL ME</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
              
              {/* Extra Roll Active Notice */}
              {lastRollWasSix && !isRolling && (
                <span className="text-[9px] text-amber-500 font-mono font-bold uppercase tracking-widest mt-2 animate-pulse bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  +1 Extra Roll
                </span>
              )}
            </div>

            {/* FATE MESSAGE BOX */}
            <div className="flex-1 w-full min-h-[110px] flex items-center">
              <AnimatePresence mode="wait">
                {hasRollLimitReached ? (
                  <motion.div
                    key="locked-fate"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className={`
                      p-4 rounded-xl border flex flex-col gap-1 w-full relative overflow-hidden
                      ${isMidnight 
                        ? 'bg-zinc-950/40 border-zinc-900/80 text-zinc-400' 
                        : 'bg-zinc-100/50 border-zinc-200 text-zinc-650'
                      }
                    `}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-zinc-650/30 to-transparent" />
                    <div className="flex items-center gap-1.5 justify-between">
                      <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
                        Sovereign Destiny Sealed
                      </span>
                      <span className="bg-zinc-800 text-zinc-400 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-widest leading-none">
                        1 Roll Used
                      </span>
                    </div>
                    
                    <h4 className={`font-royal royal-text font-bold text-xs uppercase tracking-wider mt-1 ${isMidnight ? 'text-zinc-300' : 'text-zinc-850'}`}>
                      Your Royal Fortune is cast
                    </h4>
                    
                    <p className="text-[11px] leading-relaxed mb-2">
                      Sovereign rules mandate only one alignment roll. Because your last die landed on <strong className="text-amber-500 font-mono">{currentRoll}</strong>, you have fulfilled your designated fate.
                    </p>

                    <button
                      onClick={handleReset}
                      className="inline-flex w-fit items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-amber-500 hover:text-amber-400 transition-colors cursor-pointer select-none font-bold"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Plea for Sovereign Pardon (Roll Again)
                    </button>
                  </motion.div>
                ) : activeFate ? (
                  <motion.div
                    key={activeFate.roll}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`
                      p-4 rounded-xl border flex flex-col gap-1 w-full
                      ${isMidnight 
                        ? 'bg-amber-950/20 border-amber-500/20 text-white' 
                        : 'bg-amber-500/10 border-amber-500/20 text-zinc-900'
                      }
                    `}
                  >
                    <div className="flex items-center gap-1.5 justify-between">
                      <span className="text-xs font-mono font-bold tracking-widest text-amber-400 capitalize">
                        ROLL FATE: LUXURY LUCKY {activeFate.roll}
                      </span>
                      {activeFate.roll === 6 ? (
                        <span className="bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-widest leading-none animate-pulse">
                          SOVEREIGN SIX
                        </span>
                      ) : (
                        <span className="bg-zinc-800 text-zinc-400 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono tracking-widest leading-none">
                          FINAL ROLL
                        </span>
                      )}
                    </div>
                    
                    <h4 className="font-sans font-medium text-sm text-amber-500 tracking-tight">
                      {activeFate.title}
                    </h4>
                    
                    <p className={`text-[11px] sm:text-xs leading-relaxed ${isMidnight ? 'text-zinc-300' : 'text-zinc-650'}`}>
                      {activeFate.desc}
                    </p>

                    {activeFate.roll === 6 && (
                      <span className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        Imperial Blessing! You are granted an immediate extra roll.
                      </span>
                    )}
                  </motion.div>
                ) : (
                  <div className={`p-4 rounded-xl border border-dashed text-xs text-center flex-1 py-7 flex flex-col items-center justify-center gap-1 ${isMidnight ? 'border-zinc-800 text-zinc-500' : 'border-zinc-300 text-zinc-400'}`}>
                    <HelpCircle className="w-5 h-5 opacity-40 mb-1" />
                    <span>Roll the gold luxury die to cast your sovereign blessing.</span>
                    <span className="text-[10px] opacity-70">Will you strike the coveted Royal Six?</span>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Roll History Tracker */}
          {rollHistory.length > 0 && (
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-mono tracking-wider ${isMidnight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                YOUR RECORDED DESTINIES:
              </span>
              <div className="flex gap-1.5">
                {rollHistory.map((historyVal, hIdx) => (
                  <span 
                    key={hIdx}
                    className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold border
                      ${historyVal === 6 
                        ? 'bg-amber-500 border-amber-400 text-black' 
                        : isMidnight 
                          ? 'bg-zinc-900 border-zinc-800 text-amber-400' 
                          : 'bg-white border-zinc-200 text-amber-700'
                      }
                    `}
                  >
                    {historyVal}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
