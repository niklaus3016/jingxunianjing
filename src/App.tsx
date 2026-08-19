import React, { useState, useEffect, useRef, useCallback } from 'react';
import { loadAppState, saveAppState, clearCurrentMeritInStorage, loadConsent, saveConsent } from './services/storage';
import { WOODEN_FISH_SKINS, SOUND_PROFILES } from './data/constants';
import {
  AppState,
  FloatingTextInstance,
  WoodenFishSkin,
  FloatingTextConfig,
} from './types';
import {
  playWoodenFishSound,
  ensureAudioContextUnlocked,
  setWoodenFishVolume,
} from './services/audioEngine';
import { triggerHapticFeedback, triggerDoubleTapHaptic } from './services/vibration';

import { Header } from './components/Header';
import { WoodenFishVisual } from './components/WoodenFishVisual';
import { FloatingTextsLayer } from './components/FloatingTextsLayer';
import { SkinSelector } from './components/SkinSelector';
import { SoundSelector } from './components/SoundSelector';
import { AutoTapControl } from './components/AutoTapControl';
import { ZenTimerControl } from './components/ZenTimerControl';
import { CustomTextModal } from './components/CustomTextModal';
import { StatsModal } from './components/StatsModal';
import { BlessingCardModal } from './components/BlessingCardModal';
import { SettingsView } from './components/SettingsView';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { ConsentGate } from './components/ConsentGate';

import { Disc, Palette, Music, Zap, Clock } from 'lucide-react';

export default function App() {
  // 用户协议与隐私政策同意状态：未同意时仅渲染 ConsentGate，不进入主应用
  const [hasConsented, setHasConsented] = useState<boolean>(() => loadConsent());

  const handleAcceptConsent = useCallback(() => {
    saveConsent(true);
    setHasConsented(true);
  }, []);

  const [state, setState] = useState<AppState>(loadAppState);

  // Active Bottom Tab
  const [activeTab, setActiveTab] = useState<'main' | 'skin' | 'sound' | 'auto' | 'zen' | 'settings'>('main');

  // Modals state
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showCustomTextModal, setShowCustomTextModal] = useState<boolean>(false);
  const [showStatsModal, setShowStatsModal] = useState<boolean>(false);
  const [showBlessingCardModal, setShowBlessingCardModal] = useState<boolean>(false);

  // Active floating text instances
  const [floaters, setFloaters] = useState<FloatingTextInstance[]>([]);

  // Refs for auto tap
  const autoTapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active Skin
  const activeSkin: WoodenFishSkin =
    WOODEN_FISH_SKINS.find((s) => s.id === state.activeSkinId) || WOODEN_FISH_SKINS[0];

  // Save state on change
  useEffect(() => {
    saveAppState(state);
  }, [state]);

  // Helper to trigger floating blessing text
  const spawnFloatingText = useCallback(
    (xOffsetPercentage: number = 0, isBonus: boolean = false, bonusText?: string) => {
      let customBlessing = bonusText;

      if (!customBlessing) {
        // Collect non-empty texts from config
        const textPool = [
          state.floatingTexts.text1.trim(),
          state.floatingTexts.text2.trim(),
          state.floatingTexts.text3.trim(),
        ].filter(Boolean);

        if (textPool.length > 0) {
          const randomIndex = Math.floor(Math.random() * textPool.length);
          customBlessing = textPool[randomIndex];
        } else {
          customBlessing = '快乐 +1';
        }
      }

      const id = `${Date.now()}_${Math.random()}`;
      const newFloater: FloatingTextInstance = {
        id,
        text: isBonus ? '功德 +10' : '功德 +1',
        subText: customBlessing,
        x: xOffsetPercentage,
        y: 0,
        isBonus,
      };

      setFloaters((prev) => [...prev.slice(-10), newFloater]);

      // Auto prune floater
      const totalTime =
        (state.floatingTexts.speed +
          state.floatingTexts.stayDuration +
          state.floatingTexts.fadeDuration) *
        1000;

      setTimeout(() => {
        setFloaters((prev) => prev.filter((item) => item.id !== id));
      }, totalTime + 200);
    },
    [state.floatingTexts]
  );

  // Core Tap Action Handler
  const handleTap = useCallback(
    (xOffsetPercentage: number = 0, isFromAutoTap: boolean = false) => {
      ensureAudioContextUnlocked();

      setState((prev) => {
        const nextMerit = prev.totalMerit + 1;
        const nextPeak = Math.max(prev.peakMerit, nextMerit);
        const nextToday = prev.tapsToday + 1;

        // Daily log update
        const todayStr = new Date().toISOString().split('T')[0];
        const nextLogs = {
          ...prev.dailyLogs,
          [todayStr]: (prev.dailyLogs[todayStr] || 0) + 1,
        };

        return {
          ...prev,
          totalMerit: nextMerit,
          peakMerit: nextPeak,
          tapsToday: nextToday,
          dailyLogs: nextLogs,
        };
      });

      // Play Sound
      playWoodenFishSound(state.activeSoundId, state.woodenFishVolume, state.isMuted);

      // Trigger Vibration (respects auto tap vibration sub-switch)
      const shouldVibrate = isFromAutoTap ? state.autoTapVibration : state.vibrationEnabled;
      triggerHapticFeedback(shouldVibrate);

      // Spawn Floater
      spawnFloatingText(xOffsetPercentage);
    },
    [
      state.activeSoundId,
      state.woodenFishVolume,
      state.isMuted,
      state.vibrationEnabled,
      state.autoTapVibration,
      spawnFloatingText,
    ]
  );

  // Double Tap Handler (+10 merit burst!)
  const handleDoubleTap = useCallback(() => {
    ensureAudioContextUnlocked();

    setState((prev) => {
      const nextMerit = prev.totalMerit + 10;
      const nextPeak = Math.max(prev.peakMerit, nextMerit);
      const nextToday = prev.tapsToday + 10;

      return {
        ...prev,
        totalMerit: nextMerit,
        peakMerit: nextPeak,
        tapsToday: nextToday,
      };
    });

    playWoodenFishSound(state.activeSoundId, state.woodenFishVolume, state.isMuted);
    triggerDoubleTapHaptic(state.vibrationEnabled);

    spawnFloatingText(0, true, '功德+10 大吉大利!');
  }, [
    state.activeSoundId,
    state.woodenFishVolume,
    state.isMuted,
    state.vibrationEnabled,
    spawnFloatingText,
  ]);

  // Auto Tap Loop
  useEffect(() => {
    if (autoTapTimerRef.current) {
      clearInterval(autoTapTimerRef.current);
      autoTapTimerRef.current = null;
    }

    if (state.autoTapEnabled) {
      // Safeguard minimum interval 0.2s
      const safeIntervalMs = Math.max(0.2, state.autoTapInterval) * 1000;

      autoTapTimerRef.current = setInterval(() => {
        handleTap((Math.random() - 0.5) * 30, true);
      }, safeIntervalMs);
    }

    return () => {
      if (autoTapTimerRef.current) {
        clearInterval(autoTapTimerRef.current);
        autoTapTimerRef.current = null;
      }
    };
  }, [state.autoTapEnabled, state.autoTapInterval, handleTap]);

  // Secondary confirmation reset
  const handleResetMerit = () => {
    const newState = clearCurrentMeritInStorage(state);
    setState(newState);
  };

  // Toggle Mute
  const handleToggleMute = () => {
    setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  };

  // Save Floating Text Config
  const handleSaveFloatingTextConfig = (newConfig: FloatingTextConfig) => {
    setState((prev) => ({ ...prev, floatingTexts: newConfig }));
  };

  // 启动拦截：未同意用户协议与隐私政策时不进入主应用
  if (!hasConsented) {
    return <ConsentGate onAccept={handleAcceptConsent} />;
  }

  return (
    <div className="min-h-screen bg-black text-[#E5E5E5] flex flex-col items-center justify-center font-sans antialiased overflow-hidden select-none">
      {/* Background Dark Canvas */}
      <div className="fixed inset-0 bg-black pointer-events-none" />

      {/* Main Responsive Frame Container */}
      <div
        className={`w-full h-full flex flex-col justify-between relative transition-all duration-300 ${
          state.showAndroidFrame
            ? 'max-w-md max-h-[850px] my-auto rounded-[44px] border-[10px] border-[#18181B] shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden bg-black'
            : 'max-w-md min-h-screen bg-black'
        }`}
      >
        {/* Top Header */}
        <Header
          totalMerit={state.totalMerit}
          onOpenStats={() => setShowStatsModal(true)}
          onOpenSettings={() =>
            setActiveTab((prev) => (prev === 'settings' ? 'main' : 'settings'))
          }
          isSettingsActive={activeTab === 'settings'}
        />

        {/* Floating Blessing Text Overlay */}
        <FloatingTextsLayer floaters={floaters} config={state.floatingTexts} />

        {/* Center Main Stage / Active View */}
        <main className="flex-1 flex flex-col items-center justify-center relative px-4 py-2 w-full overflow-hidden">
          {activeTab === 'main' && (
            <WoodenFishVisual
              skin={activeSkin}
              onTap={handleTap}
              onDoubleTap={handleDoubleTap}
              isAutoTapping={state.autoTapEnabled}
              vibrationEnabled={state.vibrationEnabled}
            />
          )}

          {activeTab === 'skin' && (
            <div className="w-full h-full py-2 flex flex-col">
              <SkinSelector
                activeSkinId={state.activeSkinId}
                onSelectSkin={(id) => setState((prev) => ({ ...prev, activeSkinId: id }))}
              />
            </div>
          )}

          {activeTab === 'sound' && (
            <div className="w-full h-full py-2 flex flex-col">
              <SoundSelector
                activeSoundId={state.activeSoundId}
                onSelectSound={(id) => setState((prev) => ({ ...prev, activeSoundId: id }))}
                woodenFishVolume={state.woodenFishVolume}
                onChangeWoodenFishVolume={(vol) => {
                  setState((prev) => ({ ...prev, woodenFishVolume: vol }));
                  setWoodenFishVolume(vol);
                }}
                vibrationEnabled={state.vibrationEnabled}
                onToggleVibration={(val) =>
                  setState((prev) => ({ ...prev, vibrationEnabled: val }))
                }
                isMuted={state.isMuted}
              />
            </div>
          )}

          {activeTab === 'auto' && (
            <div className="w-full h-full py-2 flex flex-col">
              <AutoTapControl
                autoTapEnabled={state.autoTapEnabled}
                onToggleAutoTap={(val) =>
                  setState((prev) => ({ ...prev, autoTapEnabled: val }))
                }
                interval={state.autoTapInterval}
                onChangeInterval={(val) =>
                  setState((prev) => ({ ...prev, autoTapInterval: val }))
                }
                autoTapVibration={state.autoTapVibration}
                onToggleAutoVibration={(val) =>
                  setState((prev) => ({ ...prev, autoTapVibration: val }))
                }
              />
            </div>
          )}

          {activeTab === 'zen' && (
            <div className="w-full h-full py-2 flex flex-col">
              <ZenTimerControl
                autoTapEnabled={state.autoTapEnabled}
                onToggleAutoTap={(val) =>
                  setState((prev) => ({ ...prev, autoTapEnabled: val }))
                }
              />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="w-full h-full py-2 flex flex-col">
              <SettingsView
                onBack={() => setActiveTab('main')}
                isMuted={state.isMuted}
                onToggleMute={handleToggleMute}
                vibrationEnabled={state.vibrationEnabled}
                onToggleVibration={(val) => setState((prev) => ({ ...prev, vibrationEnabled: val }))}
                customTexts={{
                  text1: state.floatingTexts.text1,
                  text2: state.floatingTexts.text2,
                  text3: state.floatingTexts.text3,
                }}
                onOpenCustomText={() => setShowCustomTextModal(true)}
                totalMerit={state.totalMerit}
                tapsToday={state.tapsToday}
                onOpenStats={() => setShowStatsModal(true)}
                onOpenPrivacyPolicy={() => setShowPrivacyModal(true)}
              />
            </div>
          )}
        </main>

        {/* Bottom Navigation Toolbar */}
        <nav className="w-full border-t border-white/5 bg-[#161618]/80 backdrop-blur-xl px-1 sm:px-2 py-2 flex items-center justify-around z-30">
          <button
            onClick={() => setActiveTab('main')}
            className={`flex flex-col items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'main'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/20 font-bold shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            <Disc className="w-5 h-5" />
            <span className="text-[10px] tracking-wider">念经</span>
          </button>

          <button
            onClick={() => setActiveTab('skin')}
            className={`flex flex-col items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'skin'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/20 font-bold shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            <Palette className="w-5 h-5" />
            <span className="text-[10px] tracking-wider">皮肤</span>
          </button>

          <button
            onClick={() => setActiveTab('sound')}
            className={`flex flex-col items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'sound'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/20 font-bold shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            <Music className="w-5 h-5" />
            <span className="text-[10px] tracking-wider">音效</span>
          </button>

          <button
            onClick={() => setActiveTab('auto')}
            className={`flex flex-col items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'auto'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/20 font-bold shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            <Zap className="w-5 h-5" />
            <span className="text-[10px] tracking-wider">自动</span>
          </button>

          <button
            onClick={() => setActiveTab('zen')}
            className={`flex flex-col items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'zen'
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/20 font-bold shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-[10px] tracking-wider">禅修</span>
          </button>
        </nav>
      </div>

      {/* Modals */}
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />

      <CustomTextModal
        isOpen={showCustomTextModal}
        onClose={() => setShowCustomTextModal(false)}
        config={state.floatingTexts}
        onSaveConfig={handleSaveFloatingTextConfig}
      />

      <StatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        totalMerit={state.totalMerit}
        peakMerit={state.peakMerit}
        tapsToday={state.tapsToday}
        onResetMerit={handleResetMerit}
        onOpenBlessingCard={() => setShowBlessingCardModal(true)}
      />

      <BlessingCardModal
        isOpen={showBlessingCardModal}
        onClose={() => setShowBlessingCardModal(false)}
        totalMerit={state.totalMerit}
        peakMerit={state.peakMerit}
        customText={state.floatingTexts.text1}
      />
    </div>
  );
}
