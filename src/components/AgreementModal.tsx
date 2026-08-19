import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';

interface AgreementModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

/**
 * 协议详情大弹窗外壳
 * 深色禅意风：bg-[#161618] + amber 强调色，与应用内 UI 保持一致。
 */
export const AgreementModal: React.FC<AgreementModalProps> = ({
  onClose,
  title,
  children,
}) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#161618] border border-amber-500/20 rounded-3xl w-full max-w-2xl h-[85vh] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#161618] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-base font-medium text-amber-100 tracking-wide">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors active:scale-90"
            aria-label="关闭"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-[#0C0C0E]/60 p-5">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
