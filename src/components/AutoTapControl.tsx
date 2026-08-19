import React from 'react';
import { Play, Pause, Zap, Smartphone, ShieldCheck } from 'lucide-react';

interface AutoTapControlProps {
  autoTapEnabled: boolean;
  onToggleAutoTap: (enabled: boolean) => void;
  interval: number;
  onChangeInterval: (val: number) => void;
  autoTapVibration: boolean;
  onToggleAutoVibration: (val: boolean) => void;
}

const SPEED_PRESETS = [
  { val: 0.2, label: '0.2s 极速' },
  { val: 0.5, label: '0.5s 推荐' },
  { val: 1.0, label: '1.0s 标准' },
  { val: 2.0, label: '2.0s 舒缓' },
  { val: 3.0, label: '3.0s 沉静' },
];

export const AutoTapControl: React.FC<AutoTapControlProps> = ({
  autoTapEnabled,
  onToggleAutoTap,
  interval,
  onChangeInterval,
  autoTapVibration,
  onToggleAutoVibration,
}) => {
  const roundedInterval = Math.round(interval * 10) / 10;
  const tapsPerMinute = Math.round(60 / (interval || 0.5));

  return (
    <div className="w-full bg-[#161618]/90 backdrop-blur-xl rounded-2xl border border-white/5 p-4 shadow-2xl select-none flex flex-col justify-between">
      {/* Top Header & Toggle Button */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-amber-100 tracking-wide">自动敲击模式</h3>
            <p className="text-[10px] text-white/40 tracking-wider">循环自动念经 冥想放松</p>
          </div>
        </div>

        {/* Master Switch */}
        <button
          onClick={() => onToggleAutoTap(!autoTapEnabled)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-xs transition-all active:scale-95 shadow-md ${
            autoTapEnabled
              ? 'bg-amber-500/20 text-amber-200 border border-amber-400/50 shadow-[0_0_15px_rgba(212,175,55,0.2)] ring-1 ring-amber-400/30 font-medium'
              : 'bg-white/5 hover:bg-white/10 text-amber-200/80 border border-white/5'
          }`}
        >
          {autoTapEnabled ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              停止自动
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              开启自动
            </>
          )}
        </button>
      </div>

      {/* Speed Presets & Slider Settings */}
      <div className="space-y-3 pt-3 border-t border-white/5">
        {/* Speed Header & Realtime Value */}
        <div className="flex justify-between items-baseline text-xs">
          <span className="text-white/60 font-medium">敲击间隔速度</span>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-amber-400 font-bold text-sm">{roundedInterval.toFixed(1)} 秒/次</span>
            <span className="text-[10px] text-white/40">({tapsPerMinute} 次/分)</span>
          </div>
        </div>

        {/* Quick Speed Preset Chips */}
        <div className="grid grid-cols-5 gap-1.5">
          {SPEED_PRESETS.map((preset) => {
            const isSelected = Math.abs(interval - preset.val) < 0.05;
            return (
              <button
                key={preset.val}
                onClick={() => onChangeInterval(preset.val)}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-medium transition-all text-center border ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-sm'
                    : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Continuous Precision Slider */}
        <div className="pt-1">
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={interval}
            onChange={(e) => onChangeInterval(parseFloat(e.target.value))}
            className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[10px] text-white/30 mt-1">
            <span>0.2s 极速</span>
            <span>3.0s 舒缓</span>
          </div>
        </div>

        {/* Dedicated Auto Vibration Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-white/60">
            <Smartphone className="w-3.5 h-3.5 text-white/40" />
            <span>自动敲击独立震动</span>
            <span className="text-[10px] text-white/30">(避免长时间省电)</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoTapVibration}
              onChange={(e) => onToggleAutoVibration(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-black/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        {/* Safeguard Notice */}
        <div className="flex items-center gap-1.5 text-[10px] text-amber-200/50 bg-amber-500/5 px-2.5 py-1.5 rounded-lg border border-amber-500/10">
          <ShieldCheck className="w-3 h-3 text-amber-400 flex-shrink-0" />
          <span>防卡顿机制已开启：限制最小间隔 0.2s，保障流畅运行。</span>
        </div>
      </div>
    </div>
  );
};
