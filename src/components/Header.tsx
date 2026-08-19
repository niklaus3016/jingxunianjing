import React from 'react';
import { Sparkles, Settings } from 'lucide-react';

interface HeaderProps {
  totalMerit: number;
  onOpenStats: () => void;
  onOpenSettings: () => void;
  isSettingsActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  totalMerit,
  onOpenStats,
  onOpenSettings,
  isSettingsActive,
}) => {
  return (
    <header className="w-full px-4 py-3 flex items-center justify-between border-b border-white/5 bg-[#161618]/80 backdrop-blur-md z-30 select-none">
      {/* Brand Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-sm font-medium text-amber-100 tracking-[0.15em] leading-tight">
            静序念经
          </h1>
          <p className="text-[9px] text-amber-200/40 font-light tracking-[0.2em] uppercase">
            静心解压 • 积攒功德
          </p>
        </div>
      </div>

      {/* Counter Pill & Unified Settings Button */}
      <div className="flex items-center gap-2">
        {/* Total Merit Counter Pill */}
        <button
          onClick={onOpenStats}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all active:scale-95"
        >
          <span className="text-[10px] text-amber-300/80 font-medium uppercase tracking-wider">功德</span>
          <span className="text-xs font-bold text-amber-100 tracking-wider font-mono">
            {totalMerit.toLocaleString()}
          </span>
        </button>

        {/* Unified Settings Button */}
        <button
          onClick={onOpenSettings}
          title="应用设置"
          className={`p-2 rounded-full border transition-all active:scale-90 flex items-center gap-1.5 ${
            isSettingsActive
              ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'bg-white/5 hover:bg-white/10 text-amber-200/80 hover:text-amber-100 border-white/5'
          }`}
        >
          <Settings className={`w-4 h-4 ${isSettingsActive ? 'rotate-45' : ''} transition-transform duration-300`} />
        </button>
      </div>
    </header>
  );
};
