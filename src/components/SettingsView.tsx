import React from 'react';
import {
  Settings,
  Volume2,
  VolumeX,
  ShieldCheck,
  Edit3,
  BarChart2,
  Sparkles,
  ChevronRight,
  Vibrate,
  ArrowLeft,
} from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  vibrationEnabled: boolean;
  onToggleVibration: (enabled: boolean) => void;
  customTexts: { text1: string; text2: string; text3: string };
  onOpenCustomText: () => void;
  totalMerit: number;
  tapsToday: number;
  onOpenStats: () => void;
  onOpenPrivacyPolicy: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onBack,
  isMuted,
  onToggleMute,
  vibrationEnabled,
  onToggleVibration,
  customTexts,
  onOpenCustomText,
  totalMerit,
  tapsToday,
  onOpenStats,
  onOpenPrivacyPolicy,
}) => {
  return (
    <div className="w-full h-full bg-[#161618]/90 backdrop-blur-xl rounded-2xl border border-white/5 p-4 shadow-2xl select-none flex flex-col overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-amber-100 tracking-wide">应用设置</h3>
            <p className="text-[10px] text-white/40 tracking-wider">偏好选项与自定义设置</p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回</span>
        </button>
      </div>

      {/* Setting Groups */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-0.5 no-scrollbar">
        {/* Section 1: Sound & Audio Switch */}
        <div className="bg-[#0C0C0E]/60 p-3.5 rounded-2xl border border-white/5 space-y-3">
          <div className="text-[10px] text-amber-300/80 font-medium uppercase tracking-wider">
            声音与触感
          </div>

          {/* Mute Switch */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className={`p-2 rounded-xl border ${
                  isMuted
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                    : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                }`}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs font-medium text-amber-100">敲击声音静音</div>
                <div className="text-[10px] text-white/40">开启后静音念经</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isMuted}
                onChange={onToggleMute}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-black/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500"></div>
            </label>
          </div>

          {/* Vibration Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center gap-2.5">
              <div
                className={`p-2 rounded-xl border ${
                  vibrationEnabled
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                    : 'bg-white/5 border-white/5 text-white/40'
                }`}
              >
                <Vibrate className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-amber-100">物理震动触感</div>
                <div className="text-[10px] text-white/40">敲击时提供微震体验</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={vibrationEnabled}
                onChange={(e) => onToggleVibration(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-black/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>
        </div>

        {/* Section 2: Custom Text Setting */}
        <button
          onClick={onOpenCustomText}
          className="w-full bg-[#0C0C0E]/60 hover:bg-[#0C0C0E] p-3.5 rounded-2xl border border-white/5 hover:border-amber-500/30 text-left transition-all flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 group-hover:scale-105 transition-transform">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-medium text-amber-100 flex items-center gap-1.5">
                自定义祈福文案
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
              <div className="text-[10px] text-white/40 mt-0.5 truncate max-w-[190px]">
                当前: {[customTexts.text1, customTexts.text2, customTexts.text3].filter(Boolean).join(' • ') || '功德+1'}
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs text-amber-400 font-medium gap-0.5 group-hover:translate-x-0.5 transition-transform">
            修改文案
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>

        {/* Section 3: Stats & Achievements */}
        <button
          onClick={onOpenStats}
          className="w-full bg-[#0C0C0E]/60 hover:bg-[#0C0C0E] p-3.5 rounded-2xl border border-white/5 hover:border-amber-500/30 text-left transition-all flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 group-hover:scale-105 transition-transform">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-medium text-amber-100">功德统计与修持成就</div>
              <div className="text-[10px] text-white/40 mt-0.5">
                累计功德 <span className="text-amber-300 font-bold font-mono">{totalMerit}</span> • 今日敲击 <span className="text-amber-300 font-mono">{tapsToday}</span> 次
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs text-amber-400 font-medium gap-0.5 group-hover:translate-x-0.5 transition-transform">
            查看成就
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>

        {/* Section 4: Privacy Policy */}
        <button
          onClick={onOpenPrivacyPolicy}
          className="w-full bg-[#0C0C0E]/60 hover:bg-[#0C0C0E] p-3.5 rounded-2xl border border-white/5 hover:border-amber-500/30 text-left transition-all flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-medium text-amber-100 flex items-center gap-1.5">
                隐私政策条款
                <ShieldCheck className="w-3 h-3 text-amber-400" />
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs text-amber-400 font-medium gap-0.5 group-hover:translate-x-0.5 transition-transform">
            查看详情
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
};
