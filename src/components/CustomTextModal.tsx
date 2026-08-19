import React, { useState } from 'react';
import { FloatingTextConfig } from '../types';
import { X, Sparkles, RotateCcw, Check } from 'lucide-react';

interface CustomTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: FloatingTextConfig;
  onSaveConfig: (newConfig: FloatingTextConfig) => void;
}

const PRESET_COLOR_OPTIONS = [
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#10b981', // Emerald
  '#38bdf8', // Sky Blue
  '#c084fc', // Purple
  '#f43f5e', // Rose
  '#ffffff', // White
];

export const CustomTextModal: React.FC<CustomTextModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [formData, setFormData] = useState<FloatingTextConfig>({ ...config });

  if (!isOpen) return null;

  const handleResetPresets = () => {
    setFormData({
      text1: '功德+1',
      text2: '平安+1',
      text3: '财运+1',
      speed: 1.2,
      stayDuration: 0.3,
      fadeDuration: 0.5,
      fontSize: 22,
      textColor: '#f59e0b',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="w-full max-w-md bg-[#161618] border border-amber-500/20 rounded-3xl p-5 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-medium text-amber-100 tracking-wide">悬浮祈福文字设置</h2>
              <p className="text-[10px] text-white/40 tracking-wider">自定义敲击时随机展示的浮动祝福</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 3 Custom Text Inputs */}
          <div className="space-y-2.5">
            <label className="text-xs font-medium text-amber-300/90 block tracking-wide">
              祈福文案 (留空则不参与随机展示)
            </label>

            <div>
              <span className="text-[10px] text-white/40 mb-1 block">悬浮文字 1</span>
              <input
                type="text"
                maxLength={12}
                value={formData.text1}
                onChange={(e) => setFormData({ ...formData, text1: e.target.value })}
                placeholder="例: 功德+1 (留空跳过)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0E] border border-white/10 text-amber-100 text-sm focus:outline-none focus:border-amber-400/80 transition-colors"
              />
            </div>

            <div>
              <span className="text-[10px] text-white/40 mb-1 block">悬浮文字 2</span>
              <input
                type="text"
                maxLength={12}
                value={formData.text2}
                onChange={(e) => setFormData({ ...formData, text2: e.target.value })}
                placeholder="例: 平安+1 (留空跳过)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0E] border border-white/10 text-amber-100 text-sm focus:outline-none focus:border-amber-400/80 transition-colors"
              />
            </div>

            <div>
              <span className="text-[10px] text-white/40 mb-1 block">悬浮文字 3</span>
              <input
                type="text"
                maxLength={12}
                value={formData.text3}
                onChange={(e) => setFormData({ ...formData, text3: e.target.value })}
                placeholder="例: 财运+1 (留空跳过)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0E] border border-white/10 text-amber-100 text-sm focus:outline-none focus:border-amber-400/80 transition-colors"
              />
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-1.5 pt-2 border-t border-white/5">
            <label className="text-xs font-bold text-amber-300 block">文字颜色</label>
            <div className="flex items-center gap-2">
              {PRESET_COLOR_OPTIONS.map((col) => (
                <button
                  type="button"
                  key={col}
                  onClick={() => setFormData({ ...formData, textColor: col })}
                  className={`w-7 h-7 rounded-full transition-transform active:scale-90 flex items-center justify-center ${
                    formData.textColor === col ? 'ring-2 ring-white scale-110' : 'opacity-80'
                  }`}
                  style={{ backgroundColor: col }}
                >
                  {formData.textColor === col && <Check className="w-4 h-4 text-slate-950 stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Floating Speed & Animation Timings */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            <label className="text-xs font-bold text-amber-300 block">动画参数微调</label>

            {/* Float speed / duration */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">上浮速度/时长</span>
                <span className="text-amber-400 font-mono">{formData.speed.toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="3.0"
                step="0.1"
                value={formData.speed}
                onChange={(e) => setFormData({ ...formData, speed: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Stay duration */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">停留时长</span>
                <span className="text-amber-400 font-mono">{formData.stayDuration.toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={formData.stayDuration}
                onChange={(e) =>
                  setFormData({ ...formData, stayDuration: parseFloat(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Fade duration */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">淡出时长</span>
                <span className="text-amber-400 font-mono">{formData.fadeDuration.toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.0"
                step="0.1"
                value={formData.fadeDuration}
                onChange={(e) =>
                  setFormData({ ...formData, fadeDuration: parseFloat(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Font size */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">文字字号</span>
                <span className="text-amber-400 font-mono">{formData.fontSize}px</span>
              </div>
              <input
                type="range"
                min="16"
                max="32"
                step="1"
                value={formData.fontSize}
                onChange={(e) => setFormData({ ...formData, fontSize: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={handleResetPresets}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              恢复默认
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              保存生效
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
