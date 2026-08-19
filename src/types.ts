/**
 * 静序念经 (Jing Xu Nian Jing) - Data Types & Interfaces
 */

export interface FloatingTextConfig {
  text1: string;
  text2: string;
  text3: string;
  speed: number; // Float duration in seconds (0.6 - 3.0)
  stayDuration: number; // Stay duration in seconds (0.1 - 1.0)
  fadeDuration: number; // Fade out duration in seconds (0.2 - 1.0)
  fontSize: number; // Font size in px (16 - 32)
  textColor: string; // Hex or CSS color
}

export interface WoodenFishSkin {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  gradient: string;
  borderColor: string;
  glowColor: string;
  textColor: string;
  type: 'classic' | 'minimal' | 'gold' | 'jade' | 'purple' | 'cyber' | 'rainbow' | 'mecha';
  description: string;
}

export interface SoundProfile {
  id: string;
  name: string;
  description: string;
  pitch: number;
  decay: number;
  type: 'standard' | 'crisp' | 'deep' | 'ethereal' | 'stone' | 'bell' | 'water' | 'cyber' | 'mecha' | 'woodblock';
}

export interface AppState {
  totalMerit: number;
  peakMerit: number;
  tapsToday: number;
  lastTapDate: string;
  dailyLogs: Record<string, number>;
  
  // Custom Floating Text
  floatingTexts: FloatingTextConfig;
  
  // Auto Tap Config
  autoTapEnabled: boolean;
  autoTapInterval: number; // in seconds (0.2s - 3.0s)
  autoTapVibration: boolean; // independent switch for auto tap vibration
  
  // Vibration
  vibrationEnabled: boolean;
  
  // Skins & Audio
  activeSkinId: string;
  activeSoundId: string;
  
  // Volumes
  woodenFishVolume: number; // 0 - 1
  isMuted: boolean;
  
  // Theme & Layout
  theme: 'dark' | 'light' | 'gold';
  showAndroidFrame: boolean;
}

export interface FloatingTextInstance {
  id: string;
  text: string; // Primary text, e.g. "功德 +1"
  subText?: string; // Secondary top text, e.g. "快乐 +1"
  x: number; // random offset percentage
  y: number; // vertical starting point offset
  color?: string;
  isBonus?: boolean; // for +10 double tap
}

export interface Achievement {
  id: string;
  title: string;
  reqMerit: number;
  reqLabel?: string;
  description: string;
  iconName: string;
  unlocked: boolean;
}
