import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, AlertTriangle, RotateCcw } from 'lucide-react';
import { AgreementModal } from './AgreementModal';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';
import { UserAgreementContent } from './UserAgreementContent';

interface ConsentGateProps {
  onAccept: () => void;
}

type Phase = 'consent' | 'decline_confirm' | 'blocked';
type AgreementView = null | 'user' | 'privacy';

/**
 * 启动同意流程
 *   consent          显示用户协议与隐私政策同意弹窗
 *   decline_confirm  拒绝时的二次确认弹窗（叠加在 consent 之上）
 *   blocked          拒绝确认后阻塞应用，提供「重新查看协议」入口
 * 同时支持点击协议链接打开 AgreementModal 查看完整正文。
 */
export const ConsentGate: React.FC<ConsentGateProps> = ({ onAccept }) => {
  const [phase, setPhase] = useState<Phase>('consent');
  const [agreementView, setAgreementView] = useState<AgreementView>(null);

  // 打开协议详情
  const openAgreement = (view: AgreementView) => setAgreementView(view);
  const closeAgreement = () => setAgreementView(null);

  // 同意
  const handleAccept = () => {
    onAccept();
  };

  // 拒绝流程
  const handleDecline = () => setPhase('decline_confirm');
  const handleDeclineCancel = () => setPhase('consent');
  const handleDeclineConfirm = () => setPhase('blocked');

  // 阻塞页重新查看
  const handleReconsider = () => {
    setPhase('consent');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center select-none">
      {/* 暗色禅意背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E170C] via-black to-[#1E170C] pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full blur-[80px] opacity-20 bg-amber-600 pointer-events-none" />

      {/* ============ 主同意弹窗 ============ */}
      <AnimatePresence mode="wait">
        {phase === 'consent' && (
          <motion.div
            key="consent"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-sm mx-4 bg-[#161618] border border-amber-500/20 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 pt-7 pb-4 text-center border-b border-white/5">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-medium text-amber-100 tracking-wide">
                用户协议与隐私政策
              </h3>
              <p className="text-[10px] text-amber-300/60 mt-1 tracking-wider">
                静序念经 · 启动前请阅读
              </p>
            </div>

            {/* Body */}
            <div className="px-6 py-5 overflow-y-auto no-scrollbar">
              <div className="space-y-2.5 mb-5">
                <p className="text-[13px] text-white/70 leading-relaxed">
                  <span className="text-amber-300 font-medium">(1)</span>{' '}
                  《隐私政策》中关于本地应用数据存储与硬件调用的说明。
                </p>
                <p className="text-[13px] text-white/70 leading-relaxed">
                  <span className="text-amber-300 font-medium">(2)</span>{' '}
                  本应用为完全离线工具，无网络通信、无第三方 SDK、无广告与追踪。
                </p>
              </div>

              <div className="bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                <p className="text-[11px] text-white/60 leading-relaxed">
                  请阅读完整的
                  <button
                    onClick={() => openAgreement('user')}
                    className="text-amber-400 hover:text-amber-300 hover:underline font-medium mx-1 transition-colors"
                  >
                    《用户服务协议》
                  </button>
                  和
                  <button
                    onClick={() => openAgreement('privacy')}
                    className="text-amber-400 hover:text-amber-300 hover:underline font-medium mx-1 transition-colors"
                  >
                    《隐私政策》
                  </button>
                  了解详细内容。点击「同意并继续」即表示您已阅读并同意上述协议。
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex border-t border-white/5">
              <button
                onClick={handleDecline}
                className="flex-1 py-3.5 text-sm font-medium text-white/60 bg-transparent border-r border-white/5 hover:bg-white/5 transition-colors active:scale-95"
              >
                不同意
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 py-3.5 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors active:scale-95"
              >
                同意并继续
              </button>
            </div>
          </motion.div>
        )}

        {/* ============ 阻塞页（拒绝后） ============ */}
        {phase === 'blocked' && (
          <motion.div
            key="blocked"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-sm mx-4 bg-[#161618] border border-rose-500/20 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="px-6 py-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-rose-200 mb-3">
                您已拒绝协议
              </h3>
              <p className="text-[12px] text-white/60 leading-relaxed mb-6">
                由于您未同意《用户服务协议》与《隐私政策》，
                <br />
                应用无法继续使用。
                <br />
                您可以重新查看协议并选择同意，或卸载本应用。
              </p>

              <button
                onClick={handleReconsider}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                重新查看协议
              </button>

              <p className="mt-4 text-[10px] text-white/30 leading-tight">
                您可随时在系统设置中卸载本应用，
                <br />
                卸载后将自动清除所有本地数据。
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ 拒绝二次确认弹窗（叠加在 consent 之上） ============ */}
      <AnimatePresence>
        {phase === 'decline_confirm' && (
          <motion.div
            key="decline_confirm"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="w-full max-w-xs bg-[#161618] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-5 pt-6 pb-5 text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-rose-200 mb-2">
                  确认拒绝
                </h4>
                <p className="text-[12px] text-white/60 leading-relaxed">
                  您确定要拒绝用户协议与隐私政策吗？
                  <br />
                  拒绝后将无法使用本应用。
                </p>
              </div>
              <div className="flex border-t border-white/5">
                <button
                  onClick={handleDeclineCancel}
                  className="flex-1 py-3 text-sm text-white/70 font-medium bg-transparent border-r border-white/5 hover:bg-white/5 transition-colors active:scale-95"
                >
                  取消
                </button>
                <button
                  onClick={handleDeclineConfirm}
                  className="flex-1 py-3 text-sm text-rose-400 font-bold bg-transparent hover:bg-rose-500/10 transition-colors active:scale-95"
                >
                  确认拒绝
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ 协议详情大弹窗 ============ */}
      <AnimatePresence>
        {agreementView !== null && (
          <AgreementModal
            onClose={closeAgreement}
            title={agreementView === 'user' ? '用户服务协议' : '隐私政策'}
          >
            {agreementView === 'user' ? (
              <UserAgreementContent />
            ) : (
              <PrivacyPolicyContent />
            )}
          </AgreementModal>
        )}
      </AnimatePresence>
    </div>
  );
};
