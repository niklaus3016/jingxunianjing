import { AppState } from '../types';

const STORAGE_KEY = 'jing_xu_nian_jing_app_state_v1';
const CONSENT_KEY = 'jing_xu_nian_jing_consent_v1';

/**
 * 用户协议与隐私政策同意状态
 * 独立 key 存储，避免与 AppState 互相影响；
 * 仅当值为 'true' 时视为已同意。
 */
export const loadConsent = (): boolean => {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'true';
  } catch {
    return false;
  }
};

export const saveConsent = (agreed: boolean): void => {
  try {
    localStorage.setItem(CONSENT_KEY, agreed ? 'true' : 'false');
  } catch (err) {
    console.error('Failed to save consent state:', err);
  }
};

export const DEFAULT_APP_STATE: AppState = {
  totalMerit: 0,
  peakMerit: 0,
  tapsToday: 0,
  lastTapDate: new Date().toISOString().split('T')[0],
  dailyLogs: {},

  floatingTexts: {
    text1: '快乐 +1',
    text2: '平安 +1',
    text3: '好运 +1',
    speed: 1.2,
    stayDuration: 0.3,
    fadeDuration: 0.5,
    fontSize: 26,
    textColor: '#ffffff',
  },

  autoTapEnabled: false,
  autoTapInterval: 0.5, // 0.5s default
  autoTapVibration: false, // auto vibration off by default to save power

  vibrationEnabled: true,

  activeSkinId: 'classic',
  activeSoundId: 'standard',

  woodenFishVolume: 0.9,
  isMuted: false,

  theme: 'dark',
  showAndroidFrame: false,
};

export const loadAppState = (): AppState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_APP_STATE;
    const parsed = JSON.parse(raw);
    const today = new Date().toISOString().split('T')[0];

    // Reset today count if new day
    let tapsToday = parsed.tapsToday || 0;
    if (parsed.lastTapDate !== today) {
      tapsToday = 0;
    }

    return {
      ...DEFAULT_APP_STATE,
      ...parsed,
      tapsToday,
      lastTapDate: today,
      floatingTexts: {
        ...DEFAULT_APP_STATE.floatingTexts,
        ...(parsed.floatingTexts || {}),
      },
    };
  } catch (err) {
    console.warn('Failed to load local state, using default:', err);
    return DEFAULT_APP_STATE;
  }
};

export const saveAppState = (state: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save local state:', err);
  }
};

export const clearCurrentMeritInStorage = (state: AppState): AppState => {
  // Clearing current merit preserves historical peak merit!
  const newState: AppState = {
    ...state,
    totalMerit: 0,
    tapsToday: 0,
  };
  saveAppState(newState);
  return newState;
};
