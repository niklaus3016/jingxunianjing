/**
 * Web Audio Procedural Sound Engine for Wooden Fish & White Noise
 * Guarantees 100% offline playback with zero external file dependencies.
 * Audio separation: Wooden Fish Channel & White Noise Channel are two isolated gain nodes.
 */

let audioCtx: AudioContext | null = null;
let woodenFishGainNode: GainNode | null = null;

export const initAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;

  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();

      // Master Gain for Wooden Fish
      woodenFishGainNode = audioCtx.createGain();
      woodenFishGainNode.connect(audioCtx.destination);
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
};

// Ensure context is running after user click
export const ensureAudioContextUnlocked = () => {
  const ctx = initAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
};

/**
 * Play Wooden Fish Sound
 */
export const playWoodenFishSound = (
  soundType: string,
  volume: number = 0.9,
  isMuted: boolean = false
) => {
  if (isMuted || volume <= 0) return;

  try {
    const ctx = initAudioContext();
    if (!ctx || !woodenFishGainNode) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    woodenFishGainNode.gain.setValueAtTime(volume, now);

    // Create acoustic strike oscillator + bandpass filter for wood acoustic body
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const bandpass = ctx.createBiquadFilter();

    // Noise click for initial stick hit impact
    const clickBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.015, ctx.sampleRate);
    const clickData = clickBuffer.getChannelData(0);
    for (let i = 0; i < clickData.length; i++) {
      clickData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.003));
    }
    const clickSource = ctx.createBufferSource();
    clickSource.buffer = clickBuffer;
    const clickGain = ctx.createGain();

    switch (soundType) {
      case 'crisp': // 清脆木鱼 (Crisp bamboo/high hollow wood)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(680, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);

        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(550, now);
        bandpass.Q.setValueAtTime(4.0, now);

        gain.gain.setValueAtTime(0.85, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        clickGain.gain.setValueAtTime(0.4, now);
        clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.015);
        break;

      case 'deep': // 厚重老木鱼 (Deep ancient temple fish)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);

        bandpass.type = 'lowpass';
        bandpass.frequency.setValueAtTime(350, now);
        bandpass.Q.setValueAtTime(2.5, now);

        gain.gain.setValueAtTime(1.0, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        clickGain.gain.setValueAtTime(0.6, now);
        clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.02);
        break;

      case 'ethereal': // 空灵轻木鱼 (Ethereal light chime wood)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.25);

        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(800, now);
        bandpass.Q.setValueAtTime(6.0, now);

        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        // Add subtle harmonic overtone
        const overtone = ctx.createOscillator();
        const overtoneGain = ctx.createGain();
        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(1040, now);
        overtoneGain.gain.setValueAtTime(0.15, now);
        overtoneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        overtone.connect(gain);
        overtone.start(now);
        overtone.stop(now + 0.25);

        clickGain.gain.setValueAtTime(0.2, now);
        clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.015);
        break;

      case 'stone': // 磬石禅音 (Stone / Singing Bowl)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(872, now + 0.6);

        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(880, now);
        bandpass.Q.setValueAtTime(12.0, now);

        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        clickGain.gain.setValueAtTime(0.1, now);
        clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.01);
        break;

      case 'bell': // 梵钟金磬 (Temple Bell / Bronze Gong)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(575, now + 0.85);

        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(580, now);
        bandpass.Q.setValueAtTime(8.0, now);

        gain.gain.setValueAtTime(0.85, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        // Add metallic overtone
        const bellOvertone = ctx.createOscillator();
        const bellOvertoneGain = ctx.createGain();
        bellOvertone.type = 'sine';
        bellOvertone.frequency.setValueAtTime(1600, now);
        bellOvertoneGain.gain.setValueAtTime(0.2, now);
        bellOvertoneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        bellOvertone.connect(gain);
        bellOvertone.start(now);
        bellOvertone.stop(now + 0.55);

        clickGain.gain.setValueAtTime(0.25, now);
        clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.02);
        break;

      case 'water': // 水润滴翠 (Water Drop)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(980, now + 0.12);

        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(850, now);
        bandpass.Q.setValueAtTime(6.0, now);

        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        clickGain.gain.setValueAtTime(0.05, now);
        clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.01);
        break;

      case 'cyber': // 赛博脉冲 (Cyber Synth Pulse)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.25);

        bandpass.type = 'lowpass';
        bandpass.frequency.setValueAtTime(1800, now);
        bandpass.frequency.exponentialRampToValueAtTime(200, now + 0.22);
        bandpass.Q.setValueAtTime(5.0, now);

        gain.gain.setValueAtTime(0.75, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        clickGain.gain.setValueAtTime(0.3, now);
        clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.015);
        break;

      case 'mecha': // 重工齿轮 (Titanium Heavy Clack)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.18);

        bandpass.type = 'lowpass';
        bandpass.frequency.setValueAtTime(450, now);
        bandpass.Q.setValueAtTime(3.5, now);

        gain.gain.setValueAtTime(1.0, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        clickGain.gain.setValueAtTime(0.8, now);
        clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.025);
        break;

      case 'woodblock': // 檀木响板 (Hard Woodblock Snap)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(850, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.08);

        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(1100, now);
        bandpass.Q.setValueAtTime(5.0, now);

        gain.gain.setValueAtTime(0.95, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        clickGain.gain.setValueAtTime(0.6, now);
        clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.01);
        break;

      case 'standard':
      default: // 标准木鱼 (Standard wood thud)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.18);

        bandpass.type = 'bandpass';
        bandpass.frequency.setValueAtTime(400, now);
        bandpass.Q.setValueAtTime(3.0, now);

        gain.gain.setValueAtTime(0.95, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        clickGain.gain.setValueAtTime(0.5, now);
        clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.015);
        break;
    }

    // Connect node graph
    osc.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(woodenFishGainNode);

    clickSource.connect(clickGain);
    clickGain.connect(woodenFishGainNode);

    osc.start(now);
    clickSource.start(now);

    const stopTime = soundType === 'stone' ? 0.75 : soundType === 'deep' ? 0.5 : 0.35;
    osc.stop(now + stopTime);
    clickSource.stop(now + 0.02);
  } catch (e) {
    console.warn('Audio play fallback error:', e);
  }
};

export const setWoodenFishVolume = (vol: number) => {
  if (woodenFishGainNode && audioCtx) {
    woodenFishGainNode.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), audioCtx.currentTime);
  }
};
