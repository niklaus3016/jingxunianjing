import React from 'react';
import { SOUND_PROFILES } from '../data/constants';
import { SoundProfile } from '../types';
import { Music, Volume2, Smartphone } from 'lucide-react';
import { playWoodenFishSound } from '../services/audioEngine';

interface SoundSelectorProps {
  activeSoundId: string;
  onSelectSound: (soundId: string) => void;
  woodenFishVolume: number;
  onChangeWoodenFishVolume: (vol: number) => void;
  vibrationEnabled: boolean;
  onToggleVibration: (enabled: boolean) => void;
  isMuted: boolean;
}

export const SoundSelector: React.FC<SoundSelectorProps> = ({
  activeSoundId,
  onSelectSound,
  woodenFishVolume,
  onChangeWoodenFishVolume,
  vibrationEnabled,
  onToggleVibration,
  isMuted,
}) => {
  const handleSoundSelect = (sound: SoundProfile) => {
    onSelectSound(sound.id);
    // Audition preview sound
    playWoodenFishSound(sound.type, woodenFishVolume, isMuted);
  };

  return (
    <div className="w-full h-full bg-[#161618]/90 backdrop-blur-xl rounded-2xl border border-white/5 p-4 shadow-2xl select-none flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
            <Music className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-amber-100 tracking-wide">敲击音色</h3>
            <p className="text-[10px] text-white/40 tracking-wider">材质音色与敲击设置</p>
          </div>
        </div>

        {/* Global Manual Vibration Switch */}
        <button
          onClick={() => onToggleVibration(!vibrationEnabled)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all active:scale-95 border ${
            vibrationEnabled
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-white/5 border-white/5 text-white/40'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="text-[11px]">震动触感</span>
        </button>
      </div>

      {/* Sound Options Grid */}
      <div className="grid grid-cols-2 gap-2.5 overflow-y-auto pr-1 flex-1 pb-2 no-scrollbar">
        {SOUND_PROFILES.map((sound: SoundProfile) => {
          const isActive = sound.id === activeSoundId;

          return (
            <button
              key={sound.id}
              onClick={() => handleSoundSelect(sound)}
              className={`w-full p-3 rounded-xl border text-left transition-all active:scale-95 flex flex-col justify-between ${
                isActive
                  ? 'border-amber-400/80 bg-amber-500/10 ring-1 ring-amber-400/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                  : 'border-white/5 bg-[#1C1C1E]/60 hover:bg-[#1C1C1E]/90'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-amber-100">{sound.name}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
              <p className="text-[10px] text-white/40 leading-snug line-clamp-2">
                {sound.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Volume Slider */}
      <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-3 flex-shrink-0">
        <Volume2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-white/60">敲击音量</span>
            <span className="text-amber-400 font-mono">{Math.round(woodenFishVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={woodenFishVolume}
            onChange={(e) => onChangeWoodenFishVolume(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
};
