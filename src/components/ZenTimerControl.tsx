import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Bell, Sparkles } from 'lucide-react';
import { playWoodenFishSound } from '../services/audioEngine';

interface ZenTimerControlProps {
  autoTapEnabled: boolean;
  onToggleAutoTap: (enabled: boolean) => void;
}

export const ZenTimerControl: React.FC<ZenTimerControlProps> = ({
  autoTapEnabled,
  onToggleAutoTap,
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(10);
  const [timeLeft, setTimeLeft] = useState<number>(10 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Keep refs for props & callbacks to prevent re-renders from destroying the countdown interval
  const autoTapEnabledRef = useRef(autoTapEnabled);
  autoTapEnabledRef.current = autoTapEnabled;

  const onToggleAutoTapRef = useRef(onToggleAutoTap);
  onToggleAutoTapRef.current = onToggleAutoTap;

  const timeLeftRef = useRef(timeLeft);
  timeLeftRef.current = timeLeft;

  // Reset time left when user changes preset minutes while not running
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(selectedMinutes * 60);
    }
  }, [selectedMinutes, isRunning]);

  // Main countdown timer effect based on absolute target timestamp
  useEffect(() => {
    if (!isRunning) return;

    // Calculate target end timestamp based on current remaining time
    const startTime = Date.now();
    const durationMs = timeLeftRef.current * 1000;
    const targetEndTime = startTime + durationMs;

    const timer = setInterval(() => {
      const remainingMs = targetEndTime - Date.now();
      const remainingSecs = Math.max(0, Math.ceil(remainingMs / 1000));

      setTimeLeft(remainingSecs);

      if (remainingSecs <= 0) {
        setIsRunning(false);
        if (autoTapEnabledRef.current) {
          onToggleAutoTapRef.current(false);
        }
        // End bell chime sound
        playWoodenFishSound('bell', 1.0, false);
        clearInterval(timer);
      }
    }, 250);

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const handleStart = () => {
    if (timeLeft <= 0) {
      setTimeLeft(selectedMinutes * 60);
    }
    setIsRunning(true);
    if (!autoTapEnabled) {
      onToggleAutoTap(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    if (autoTapEnabled) {
      onToggleAutoTap(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedMinutes * 60);
    if (autoTapEnabled) {
      onToggleAutoTap(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSecs = selectedMinutes * 60;
  const progressPercent = totalSecs > 0 ? ((totalSecs - timeLeft) / totalSecs) * 100 : 0;

  return (
    <div className="w-full h-full bg-[#161618]/90 backdrop-blur-xl rounded-2xl border border-white/5 p-4 shadow-2xl select-none flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-amber-100 tracking-wide">禅修倒计时</h3>
            <p className="text-[10px] text-white/40 tracking-wider">定时坐禅 自动敲击与梵钟收尾</p>
          </div>
        </div>

        {isRunning && (
          <span className="flex items-center gap-1 text-[10px] text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full animate-pulse">
            <Sparkles className="w-3 h-3" /> 禅修进行中
          </span>
        )}
      </div>

      {/* Preset Duration Selector */}
      {!isRunning && (
        <div className="grid grid-cols-4 gap-2 flex-shrink-0 my-1">
          {[5, 10, 15, 30].map((mins) => (
            <button
              key={mins}
              onClick={() => setSelectedMinutes(mins)}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedMinutes === mins
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400/40'
                  : 'bg-[#1C1C1E]/60 border-white/5 text-white/40 hover:bg-[#1C1C1E]'
              }`}
            >
              {mins} 分钟
            </button>
          ))}
        </div>
      )}

      {/* Countdown Timer Circle Display */}
      <div className="relative w-40 h-40 sm:w-44 sm:h-44 mx-auto flex items-center justify-center my-auto flex-shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="68"
            stroke="#1C1C1E"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="80"
            cy="80"
            r="68"
            stroke="#f59e0b"
            strokeWidth="8"
            fill="none"
            strokeDasharray={427}
            strokeDashoffset={427 - (427 * progressPercent) / 100}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl sm:text-4xl font-light text-amber-100 font-mono tracking-tight">
            {formatTime(timeLeft)}
          </span>
          <span className="text-[10px] text-amber-300/70 mt-1 uppercase tracking-widest">
            {isRunning ? '静心坐禅中...' : '准备就绪'}
          </span>
        </div>
      </div>

      {/* Control Buttons & Info */}
      <div className="space-y-2 flex-shrink-0 pt-1">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all active:scale-90"
            title="重置倒计时"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {isRunning ? (
            <button
              onClick={handlePause}
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Pause className="w-4 h-4 fill-current" />
              暂停禅修
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              开始禅修
            </button>
          )}
        </div>

        <p className="text-[10px] text-white/30 text-center leading-tight">
          倒计时结束将自动停止敲击，并鸣响梵钟善音结缘。
        </p>
      </div>
    </div>
  );
};
