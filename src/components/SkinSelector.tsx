import React from 'react';
import { WOODEN_FISH_SKINS } from '../data/constants';
import { WoodenFishSkin } from '../types';
import { Palette, Check } from 'lucide-react';

interface SkinSelectorProps {
  activeSkinId: string;
  onSelectSkin: (skinId: string) => void;
}

export const SkinSelector: React.FC<SkinSelectorProps> = ({
  activeSkinId,
  onSelectSkin,
}) => {
  return (
    <div className="w-full h-full bg-[#161618]/90 backdrop-blur-xl rounded-2xl border border-white/5 p-4 shadow-2xl select-none flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
          <Palette className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-amber-100 tracking-wide">木鱼皮肤外观</h3>
          <p className="text-[10px] text-white/40 tracking-wider">选择心仪材质与纹理</p>
        </div>
      </div>

      {/* Grid Selector Cards - Spread vertically across page, no scrollbar */}
      <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1 flex-1 pb-2 no-scrollbar">
        {WOODEN_FISH_SKINS.map((skin: WoodenFishSkin) => {
          const isActive = skin.id === activeSkinId;

          return (
            <button
              key={skin.id}
              onClick={() => onSelectSkin(skin.id)}
              className={`relative w-full p-3 rounded-xl border text-left transition-all active:scale-95 flex flex-col justify-between ${
                isActive
                  ? 'border-amber-400/80 bg-amber-500/10 ring-1 ring-amber-400/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                  : 'border-white/5 bg-[#1C1C1E]/60 hover:bg-[#1C1C1E]/90'
              }`}
            >
              {/* Active Badge */}
              {isActive && (
                <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-md z-10">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}

              {/* Mini Skin Preview Icon with Pattern Features */}
              <div className="w-full h-14 rounded-lg mb-2 flex items-center justify-center overflow-hidden border border-white/10 relative">
                <div className={`w-full h-full bg-gradient-to-br ${skin.gradient} flex items-center justify-center relative overflow-hidden`}>
                  {/* Pattern Badges */}
                  {skin.id === 'mecha' && (
                    <div className="relative w-8 h-8 rounded-full border-2 border-sky-400 bg-slate-800/80 flex items-center justify-center shadow-lg">
                      <div className="w-4 h-4 rounded-full border border-sky-300 border-dashed animate-spin" style={{ animationDuration: '6s' }} />
                      <div className="absolute w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                    </div>
                  )}

                  {skin.id === 'rainbow' && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full border-2 border-rose-300 bg-gradient-to-tr from-rose-400 via-purple-400 to-sky-400 flex items-center justify-center shadow-md">
                        <span className="text-white text-xs font-bold">✨</span>
                      </div>
                    </div>
                  )}

                  {skin.id === 'gold' && (
                    <div className="w-8 h-8 rounded-full border-2 border-amber-300 bg-amber-500/80 flex items-center justify-center shadow-md">
                      <div className="w-3.5 h-3.5 border border-amber-200 bg-amber-600/60 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-amber-200" />
                      </div>
                    </div>
                  )}

                  {skin.id === 'cyber' && (
                    <div className="w-8 h-8 rounded-full border-2 border-cyan-400 bg-cyan-950/80 flex items-center justify-center shadow-md">
                      <div className="w-4 h-4 border border-cyan-300 rounded flex items-center justify-center text-[8px] font-mono font-bold text-cyan-200">
                        AI
                      </div>
                    </div>
                  )}

                  {skin.id === 'purple' && (
                    <div className="w-8 h-8 rounded-full border-2 border-purple-300 bg-purple-900/80 flex items-center justify-center shadow-md">
                      <span className="text-purple-200 text-xs font-serif">☁️</span>
                    </div>
                  )}

                  {skin.id === 'jade' && (
                    <div className="w-8 h-8 rounded-full border-2 border-emerald-400 bg-emerald-800/80 flex items-center justify-center shadow-md relative">
                      <div className="w-5 h-5 border border-emerald-200/50 rotate-45" />
                    </div>
                  )}

                  {skin.id === 'classic' && (
                    <div className="w-8 h-8 rounded-full border-2 border-amber-800 bg-amber-900/80 flex items-center justify-center shadow-md">
                      <div className="w-5 h-5 rounded-full border border-amber-600/50 border-dotted" />
                    </div>
                  )}

                  {skin.id === 'minimal' && (
                    <div className="w-8 h-8 rounded-full border-2 border-slate-300 bg-slate-800 flex items-center justify-center shadow-md">
                      <div className="w-4 h-4 rounded-full border border-slate-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Skin Info */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-100">{skin.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                    {skin.tag}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-1">{skin.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
