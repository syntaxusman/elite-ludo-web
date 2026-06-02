import { WaitlistEntry, RoyalTier } from './types';

// Web Audio API Sound Synthesizer for a Royal, Premium experience
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

/**
 * Synthesizes a luxury metallic chime sound (ideal for success or button interaction)
 */
export function playRoyalChime() {
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  const now = ctx.currentTime;
  
  // High-frequency bell feel using multiple sine oscillators
  const frequencies = [440, 554.37, 659.25, 880]; // A major arpeggio
  
  frequencies.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    
    // Stagger slightly for a strum/chime effect
    const delay = index * 0.04;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15 / frequencies.length, now + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.82);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now + delay);
    osc.stop(now + delay + 0.9);
  });
}

/**
 * Synthesizes a golden dice-clatter sound sequence for the interactive die roll
 */
export function playDiceClatter() {
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  const now = ctx.currentTime;
  
  // 4 rapid small wooden/metallic clatters, followed by a resonant thump
  for (let i = 0; i < 5; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    const time = now + (i * 0.08);
    const isLast = i === 4;
    
    osc.type = isLast ? 'triangle' : 'triangle';
    osc.frequency.setValueAtTime(isLast ? 180 : 350 + Math.random() * 200, time);
    
    // Filter for warmth
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isLast ? 300 : 800, time);
    
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(isLast ? 0.3 : 0.12, time + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + (isLast ? 0.25 : 0.06));
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + (isLast ? 0.3 : 0.08));
  }
}

/**
 * Validates email addresses using a robust regex
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Generates a mock list of royal-themed participants to start off the database beautifully
 */
export function getInitialWaitlist(): WaitlistEntry[] {
  const currentDaysAgo = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString();
  };

  return [
    {
      id: 'reg-001',
      email: 'lord.sterling@gildedgate.com',
      name: 'Lord Arthur Sterling',
      tier: 'Sovereign',
      timestamp: currentDaysAgo(3),
      referralCode: 'GOLDEN99',
      referralsCount: 14,
    },
    {
      id: 'reg-002',
      email: 'countess.elara@aurum.net',
      name: 'Countess Elara Vance',
      tier: 'Sovereign',
      timestamp: currentDaysAgo(2.5),
      referralCode: 'ROYAL448',
      referralsCount: 8,
    },
    {
      id: 'reg-003',
      email: 'sir.nicholas@crownplay.gg',
      name: 'Sir Nicholas Thorne',
      tier: 'Gilded',
      timestamp: currentDaysAgo(2),
      referralCode: 'CROWN552',
      referralsCount: 4,
    },
    {
      id: 'reg-004',
      email: 'velvet.queen@monarch.io',
      name: 'Lady Seraphina Black',
      tier: 'Obsidian',
      timestamp: currentDaysAgo(1.2),
      referralCode: 'DARKDICE',
      referralsCount: 3,
    },
    {
      id: 'reg-005',
      email: 'marquise.lyra@regals.co',
      name: 'Marquise Lyra Thorne',
      tier: 'Gilded',
      timestamp: currentDaysAgo(0.4),
      referralCode: 'AUREA91',
      referralsCount: 1,
    }
  ];
}

/**
 * Formats a timestamp into a royal/elegant reading style
 */
export function formatRoyalDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
