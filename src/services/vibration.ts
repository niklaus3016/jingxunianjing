/**
 * Vibration feedback service with Web Haptics support
 */

export const triggerHapticFeedback = (enabled: boolean, pattern: number | number[] = 18): boolean => {
  if (!enabled) return false;

  try {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      return navigator.vibrate(pattern);
    }
  } catch (e) {
    // Ignore if not supported on desktop
  }
  return false;
};

export const triggerDoubleTapHaptic = (enabled: boolean): boolean => {
  if (!enabled) return false;
  return triggerHapticFeedback(true, [20, 40, 25]);
};
