import React, { useState } from 'react';
import { ACHIEVEMENTS_DATA } from '../data/constants';
import { Achievement } from '../types';
import {
  X,
  Flame,
  Award,
  ShieldCheck,
  Sparkles,
  Sun,
  Crown,
  RotateCcw,
  AlertTriangle,
  BarChart2,
  Share2,
} from 'lucide-react';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalMerit: number;
  peakMerit: number;
  tapsToday: number;
  onResetMerit: () => void;
  onOpenBlessingCard: () => void;
}

const renderAchievementIcon = (iconName: string) => {
  switch (iconName) {
    case 'Flame':
      return <Flame className="w-5 h-5 text-amber-400" />;
    case 'Award':
      return <Award className="w-5 h-5 text-amber-400" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-5 h-5 text-amber-400" />;
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 text-amber-400" />;
    case 'Sun':
      return <Sun className="w-5 h-5 text-amber-400" />;
    case 'Crown':
      return <Crown className="w-5 h-5 text-amber-400" />;
    default:
      return <Sparkles className="w-5 h-5 text-amber-400" />;
  }
};

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  totalMerit,
  peakMerit,
  tapsToday,
  onResetMerit,
  onOpenBlessingCard,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleConfirmReset = () => {
    onResetMerit();
    setShowConfirmReset(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="w-full max-w-md bg-[#161618] border border-amber-500/20 rounded-3xl p-5 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-medium text-amber-100 tracking-wide">功德统计与修持成就</h2>
              <p className="text-[10px] text-white/40 tracking-wider">本地持久化记录 • 功德无量</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Stats Dashboard Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Current Cumulative Merit */}
          <div className="bg-[#0C0C0E] p-3.5 rounded-2xl border border-amber-500/20 relative overflow-hidden">
            <div className="text-[10px] text-amber-300/80 uppercase tracking-widest font-medium mb-1">当前累计功德</div>
            <div className="text-2xl font-light text-amber-100 font-mono tracking-tight">
              {totalMerit.toLocaleString()}
            </div>
            <p className="text-[10px] text-white/30 mt-1">本地永久累加</p>
          </div>

          {/* Historical Peak Merit */}
          <div className="bg-[#0C0C0E] p-3.5 rounded-2xl border border-amber-500/20 relative overflow-hidden">
            <div className="text-[10px] text-amber-300/80 uppercase tracking-widest font-medium mb-1">历史最高峰值</div>
            <div className="text-2xl font-light text-amber-300 font-mono tracking-tight">
              {peakMerit.toLocaleString()}
            </div>
            <p className="text-[10px] text-white/30 mt-1">清零时保留不消除</p>
          </div>
        </div>

        {/* Today's Merit Taps */}
        <div className="bg-[#0C0C0E]/60 p-3 rounded-xl border border-white/5 flex items-center justify-between">
          <span className="text-xs text-white/60">今日敲击念经次数</span>
          <span className="text-sm font-bold text-amber-300 font-mono">{tapsToday} 次</span>
        </div>

        {/* Achievements List */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <h3 className="text-xs font-bold text-amber-300">修行成就勋章</h3>
          <div className="grid grid-cols-2 gap-2">
            {ACHIEVEMENTS_DATA.map((ach) => {
              const isUnlocked = totalMerit >= ach.reqMerit;

              return (
                <div
                  key={ach.id}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                    isUnlocked
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-100'
                      : 'bg-slate-800/40 border-white/5 text-slate-500 opacity-60'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-lg ${
                      isUnlocked ? 'bg-amber-500/20' : 'bg-slate-800'
                    }`}
                  >
                    {renderAchievementIcon(ach.iconName)}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold truncate">{ach.title}</div>
                    <div className="text-[10px] opacity-75">{ach.reqLabel || `${ach.reqMerit} 次功德`}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          {/* Secondary confirmation reset button */}
          <button
            onClick={() => setShowConfirmReset(true)}
            className="px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            手动清零
          </button>

          {/* Blessing Card Share Generator */}
          <button
            onClick={() => {
              onClose();
              onOpenBlessingCard();
            }}
            className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            生成功德海报/截图
          </button>
        </div>

        {/* Secondary Confirmation Modal (二次确认弹窗) */}
        {showConfirmReset && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-xs bg-slate-900 border border-rose-500/40 rounded-2xl p-4 space-y-3 shadow-2xl text-center">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-rose-200">确认重置功德计数？</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                确认后将重置当前累计的功德数值为 0。<br />
                <span className="text-amber-400 font-medium">注意：历史最高峰值记录将安全保留。</span>
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmReset}
                  className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/30"
                >
                  确认清零
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
