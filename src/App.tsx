import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Countdown } from './components/Countdown';
import { LudoInteractive } from './components/LudoInteractive';
import { ThemeMode } from './types';
import { playRoyalChime } from './utils';
import { 
  Crown, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Gamepad2, 
  MapPin, 
  Sparkles, 
  Dribbble, 
  Trophy, 
  Twitter, 
  Github,
  Facebook 
} from 'lucide-react';

// Import the generated luxury Ludo logo asset
import royalInsignia from './assets/images/elite_ludo_royal_1780321994707.png';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('midnight');
  const [soundEnabled, setSoundEnabled] = useState(false);

  const isMidnight = theme === 'midnight';

  // Play entry chime once user interacts with the page and activates sound
  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      // Small delay to allow audio context start
      setTimeout(() => {
        playRoyalChime();
      }, 50);
    }
  };

  const cycleTheme = () => {
    const nextTheme = theme === 'midnight' ? 'ivory' : 'midnight';
    setTheme(nextTheme);
    playRoyalChime();
  };

  return (
    <div 
      className={`
        min-h-screen transition-all duration-1000 relative overflow-x-hidden font-sans flex flex-col justify-between
        md:border-[12px] border-[6px]
        ${isMidnight 
          ? 'bg-[#050505] border-royal-borderBg text-white select-none' 
          : 'bg-[#fafafa] border-[#eaeaea] text-zinc-900 select-none'
        }
      `}
    >
      {/* Elegant Dark Theme Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="dice-decoration -top-10 -left-10 opacity-15" />
        <div className="dice-decoration top-[40%] right-[-40px] opacity-10" style={{ transform: 'rotate(-25deg)' }} />
        <div className="dice-decoration bottom-[-20px] left-[10%] opacity-15" style={{ transform: 'rotate(45deg)' }} />
        
        {/* Dark radial center gradient */}
        <div className={`
          absolute inset-0 transition-opacity duration-1000 pointer-events-none
          ${isMidnight 
            ? 'bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.85)_100%)] opacity-100' 
            : 'bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(250,250,250,0.4)_100%)] opacity-60'
          }
        `} />
      </div>

      {/* TOP NAVIGATION HEADER */}
      <header className={`
        relative w-full border-b backdrop-blur-md z-30 transition-colors duration-1000
        ${isMidnight ? 'border-amber-500/20 bg-black/40' : 'border-zinc-200/80 bg-white/20'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Mark */}
          <div className="flex items-center gap-3">
            <div className="relative group flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 border border-amber-300 p-0.5 shadow-md">
              <div className="bg-black w-full h-full rounded-[6px] flex items-center justify-center relative">
                <Crown className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-500" />
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className="royal-text font-royal font-bold text-lg sm:text-2xl tracking-[0.3em] gold-text uppercase leading-none">
                ELITE LUDO
              </h1>
              <span className={`text-[8px] sm:text-[9px] uppercase tracking-[0.4em] mt-0.5 font-sans ${isMidnight ? 'text-white/50' : 'text-zinc-500'}`}>
                The Sovereign's Game
              </span>
            </div>
          </div>

          {/* Core Applet Utilities (Audio, Theme) */}
          <div className="flex items-center gap-2 sm:gap-4 select-none">
            {/* Live Beta Badge */}
            <div className={`
              hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono tracking-wider
              ${isMidnight ? 'bg-zinc-950/60 border-zinc-800 text-zinc-400' : 'bg-white border-zinc-250 text-zinc-650'}
            `}>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>LAUNCH STATUS:</span>
              <strong className="text-amber-500">COMING SOON</strong>
            </div>

            {/* Simulated Audio activation sound button */}
            <button
              id="audio-activation-btn"
              onClick={toggleSound}
              title={soundEnabled ? "Mute Royal Chimes" : "Enable Royal Chimes"}
              className={`
                p-2 sm:p-2.5 rounded-lg border transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95
                ${isMidnight 
                  ? 'border-zinc-800 hover:border-amber-400 bg-zinc-950/40 text-zinc-400 hover:text-white' 
                  : 'border-zinc-250 hover:border-amber-500 bg-white text-zinc-600 hover:text-zinc-900'
                }
              `}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-amber-500 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 opacity-70" />
              )}
            </button>

            {/* Theme Customizer Switcher */}
            <button
              id="theme-customizer-btn"
              onClick={cycleTheme}
              title={isMidnight ? "Activate Gilded Ivory Canvas" : "Activate Gilded Midnight Canvas"}
              className={`
                p-2 sm:p-2.5 rounded-lg border transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95
                ${isMidnight 
                  ? 'border-zinc-800 hover:border-amber-400 bg-zinc-950/40 text-zinc-400 hover:text-white' 
                  : 'border-zinc-250 hover:border-amber-500 bg-white text-zinc-600 hover:text-zinc-900'
                }
              `}
            >
              {isMidnight ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-amber-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* CORE DISPLAY CANVAS */}
      <main className="relative flex-1 flex flex-col items-center justify-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl w-full mx-auto space-y-12 sm:space-y-16">
          
          {/* ROYAL HERO HEADLINE & INTENSE BRANDING */}
          <div className="text-center space-y-4 max-w-3xl mx-auto flex flex-col items-center select-none">
            {/* Shimmering Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className={`
                inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] sm:text-[11px] font-mono tracking-widest uppercase mb-2 gold-border
                ${isMidnight ? 'bg-[#050505] text-amber-300' : 'bg-white text-amber-700'}
              `}
            >
              
              <span>THE ROYAL BOARD REIMAGINED</span>
            </motion.div>

            {/* Sovereign Title */}
            <motion.h1 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`
                royal-text font-royal font-bold text-4xl sm:text-6xl md:text-7xl tracking-widest leading-tight uppercase
                ${isMidnight 
                  ? 'gold-text' 
                  : 'text-zinc-950'
                }
              `}
            >
              Sovereign Play.<br className="hidden sm:block" />
              <span className={`text-3xl sm:text-4xl md:text-5xl tracking-widest block mt-3 font-medium ${isMidnight ? 'text-white/90' : 'text-zinc-800'}`}>
                Elite Strategy.
              </span>
            </motion.h1>

            {/* Narrative description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`
                text-xs sm:text-base leading-relaxed max-w-2xl font-sans font-light
                ${isMidnight ? 'text-white/60' : 'text-zinc-650'}
              `}
            >
              Step into the inner sanctum of the world's ancient imperial pastime, curated for the modern grandmaster. Compete on gold-embossed virtual layouts with custom-molded tokens, royal roll mechanics, and unified table lobbies.
            </motion.p>
          </div>

          {/* DETAILED LUXURY COUNTDOWN TIMER MODULE */}
          <Countdown theme={theme} />

          {/* SINGLE CENTERED INTERACTIVE MODULE */}
          <div className="max-w-5xl mx-auto w-full pt-4">
            <LudoInteractive theme={theme} imageSrc={royalInsignia} />
          </div>

          {/* MINI ROYAL SPECIFICATION DECK - DESIGN HIGHLIGHTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {[
              {
                icon: <Crown className="w-5 h-5 text-amber-500" />,
                title: "Imperial Aesthetics",
                desc: "Pristine white marble tiles, obsidian boards, and true gold accents synthesized down to the millimeter."
              },
              {
                icon: <Trophy className="w-5 h-5 text-amber-500" />,
                title: "Honor-System Matchmaking",
                desc: "Challenge other global elites to low-latency prestige encounters within our private members-only sandbox guild."
              },
              {
                icon: <Gamepad2 className="w-5 h-5 text-amber-500" />,
                title: "True Randomness Oracle",
                desc: "No simulated curves. Fully cryptographically audited die structures guarantee ultimate strategic agency."
              }
            ].map((spec, sIdx) => (
              <div 
                key={sIdx}
                className={`
                  p-5 rounded-xl border flex flex-col gap-3 transition-all duration-350 ease-out
                  hover:scale-[1.02]
                  ${isMidnight 
                    ? 'bg-[#050505] gold-border hover:brightness-110 hover:shadow-xl hover:shadow-amber-500/5' 
                    : 'bg-white border-zinc-200/80 hover:border-amber-500/20 hover:shadow-xl hover:shadow-zinc-200/80'
                  }
                `}
              >
                <div className="p-2 w-fit rounded-lg bg-amber-500/10 border border-amber-500/20">
                  {spec.icon}
                </div>
                <h4 className={`font-royal royal-text font-bold text-sm tracking-widest uppercase ${isMidnight ? 'text-white' : 'text-zinc-900'}`}>
                  {spec.title}
                </h4>
                <p className={`text-xs leading-relaxed ${isMidnight ? 'text-white/60' : 'text-zinc-600'}`}>
                  {spec.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* ROYAL FOOTER INFORMATION */}
      <footer className={`
        relative w-full border-t transition-colors duration-1000 py-10 z-30 select-none
        ${isMidnight ? 'border-zinc-900/60 bg-black/60 text-zinc-500' : 'border-zinc-200 bg-white text-zinc-500'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5">
            <span className="font-mono text-[10px] tracking-widest text-amber-500 select-none uppercase font-bold">
              © EST. 2026 ELITE LUDO
            </span>
            <span className="text-[10px] text-zinc-500 flex items-center gap-1 select-none">
              <MapPin className="w-3.5 h-3.5 opacity-50" />
              PAKISTAN UTC: 2026-06-01
            </span>
          </div>

          {/* Social connections and guild nodes */}
          <div className="flex items-center gap-4">
          <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`p-2 rounded-full border transition-all ${isMidnight ? 'border-zinc-900 hover:border-amber-500 text-zinc-500 hover:text-white' : 'border-zinc-200 hover:border-amber-500 text-zinc-600 hover:text-zinc-900'}`}
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`p-2 rounded-full border transition-all ${isMidnight ? 'border-zinc-900 hover:border-amber-500 text-zinc-500 hover:text-white' : 'border-zinc-200 hover:border-amber-500 text-zinc-600 hover:text-zinc-900'}`}
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="https://dribbble.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`p-2 rounded-full border transition-all ${isMidnight ? 'border-zinc-900 hover:border-amber-500 text-zinc-500 hover:text-white' : 'border-zinc-200 hover:border-amber-500 text-zinc-650 hover:text-zinc-900'}`}
            >
              <Dribbble className="w-4 h-4" />
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}
