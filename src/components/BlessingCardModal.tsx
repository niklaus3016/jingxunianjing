import React, { useState, useRef } from 'react';
import { X, Download, Sparkles, Shield, Check } from 'lucide-react';

interface BlessingCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalMerit: number;
  peakMerit: number;
  customText: string;
}

export const BlessingCardModal: React.FC<BlessingCardModalProps> = ({
  isOpen,
  onClose,
  totalMerit,
  peakMerit,
  customText,
}) => {
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleTriggerSave = () => {
    // Show Android runtime storage permission prompt first as per requirement 4.3
    setShowPermissionPrompt(true);
  };

  const handleGrantPermission = () => {
    setShowPermissionPrompt(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const currentDateStr = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="w-full max-w-sm bg-[#161618] border border-amber-500/20 rounded-3xl p-5 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-medium text-amber-100 tracking-wide">功德祈福海报</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Poster Canvas Preview */}
        <div
          ref={cardRef}
          className="w-full rounded-2xl bg-gradient-to-b from-[#1E170C] via-[#0C0C0E] to-[#1E170C] border-2 border-amber-500/30 p-6 text-center space-y-4 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500/60" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500/60" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500/60" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500/60" />

          {/* Title Branding */}
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest text-amber-300/60 uppercase block">
              JING XU NIAN JING
            </span>
            <h3 className="text-xl font-bold text-amber-100 tracking-wider">《静序念经》</h3>
            <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
          </div>

          {/* Blessing Main Text */}
          <div className="py-2">
            <span className="text-2xl font-black text-amber-400 tracking-widest block drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
              {customText || '功德无量 • 诸事顺遂'}
            </span>
          </div>

          {/* Cumulative Merit Stats */}
          <div className="bg-slate-950/60 p-3 rounded-xl border border-amber-500/20 space-y-1">
            <div className="text-xs text-amber-200/80">累计敲击功德</div>
            <div className="text-3xl font-black text-amber-300 font-mono tracking-tight">
              {totalMerit.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400">历史最高峰值: {peakMerit.toLocaleString()}</div>
          </div>

          {/* Date & Stamp */}
          <div className="pt-2 text-slate-400 text-[11px] flex items-center justify-between border-t border-white/5">
            <span>{currentDateStr}</span>
            <span className="text-amber-300/80 font-serif">修持合十 谨记</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleTriggerSave}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4" />
              已保存到系统相册！
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              保存功德卡片到相册
            </>
          )}
        </button>

        {/* Android Storage Permission Modal Simulation (Requirement 4.3) */}
        {showPermissionPrompt && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-xs bg-slate-900 border border-amber-500/40 rounded-2xl p-4 space-y-3 shadow-2xl text-center">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-amber-100">申请照片与存储权限</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                《静序念经》需要获取设备的本地存储权限，以便将您生成的功德祈福海报截图保存至系统相册。
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowPermissionPrompt(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                >
                  拒绝
                </button>
                <button
                  onClick={handleGrantPermission}
                  className="flex-1 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
                >
                  允许授权
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
