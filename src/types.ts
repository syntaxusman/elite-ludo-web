export type RoyalTier = 'Sovereign' | 'Gilded' | 'Obsidian';

export interface WaitlistEntry {
  id: string;
  email: string;
  name?: string;
  tier: RoyalTier;
  timestamp: string;
  referralCode: string;
  referralsCount: number;
}

export type ThemeMode = 'midnight' | 'ivory';
