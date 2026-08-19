import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { WoodenFishSkin } from '../types';

interface WoodenFishVisualProps {
  skin: WoodenFishSkin;
  onTap: (xPercentage?: number) => void;
  onDoubleTap: () => void;
  isAutoTapping: boolean;
  vibrationEnabled: boolean;
}

export const WoodenFishVisual: React.FC<WoodenFishVisualProps> = ({
  skin,
  onTap,
  onDoubleTap,
  isAutoTapping,
}) => {
  const [isHit, setIsHit] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const lastTapTimeRef = useRef<number>(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressingRef = useRef<boolean>(false);

  // Trigger visual hit effect
  const triggerVisualHit = () => {
    setIsHit(true);
    setTimeout(() => setIsHit(false), 120);

    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-4), { id, x: 50, y: 50 }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  // Handle pointer down (mouse/touch) for click, double tap, and long press
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const now = Date.now();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const xOffsetPercentage = (clickX - 50) * 0.8; // Random horizontal offset

    // Check for double tap (within 280ms)
    if (now - lastTapTimeRef.current < 280) {
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      if (longPressIntervalRef.current) clearInterval(longPressIntervalRef.current);
      isLongPressingRef.current = false;

      triggerVisualHit();
      onDoubleTap();
      lastTapTimeRef.current = 0;
      return;
    }

    lastTapTimeRef.current = now;
    triggerVisualHit();
    onTap(xOffsetPercentage);

    // Setup Long Press detector (starts continuous fast tap after 400ms hold)
    isLongPressingRef.current = false;
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);

    longPressTimerRef.current = setTimeout(() => {
      isLongPressingRef.current = true;
      longPressIntervalRef.current = setInterval(() => {
        triggerVisualHit();
        onTap((Math.random() - 0.5) * 40);
      }, 180); // Fast continuous tapping
    }, 400);
  };

  const handlePointerUp = () => {
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    if (longPressIntervalRef.current) clearInterval(longPressIntervalRef.current);
    isLongPressingRef.current = false;
  };

  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      if (longPressIntervalRef.current) clearInterval(longPressIntervalRef.current);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center my-auto select-none py-4 w-full max-w-sm mx-auto">
      {/* Soft Ambient Glow - Static neutral background */}
      <div
        className="absolute w-72 h-72 rounded-full blur-[80px] opacity-20 pointer-events-none bg-amber-600"
      />

      {/* Auto Tapping Status Pulse Indicator */}
      {isAutoTapping && (
        <div className="absolute -top-10 flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px] font-light tracking-[0.2em] uppercase animate-pulse z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          全自动念经中...
        </div>
      )}

      {/* Wooden Mallet (木槌) Stick & Ball Head - Positioned top-right like in reference photo */}
      <motion.div
        animate={isHit ? { rotate: [0, 22, 0], y: [0, 12, 0] } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.12, ease: 'easeInOut' }}
        className="absolute -top-4 right-2 sm:right-6 z-20 pointer-events-none origin-[85%_15%]"
      >
        <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
          <defs>
            {/* Birch Wood Stick Gradient */}
            <linearGradient id="malletStickGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A5A36" />
              <stop offset="40%" stopColor="#D4A373" />
              <stop offset="80%" stopColor="#FAEDCD" />
              <stop offset="100%" stopColor="#A3744D" />
            </linearGradient>

            {/* Mallet Ball Head Radial Gradient */}
            <radialGradient id="malletBallGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FEFAE0" />
              <stop offset="35%" stopColor="#E9EDC9" />
              <stop offset="70%" stopColor="#CCD5AE" />
              <stop offset="85%" stopColor="#D4A373" />
              <stop offset="100%" stopColor="#8A5A36" />
            </radialGradient>
          </defs>

          {/* Wooden Stick Handle */}
          <path
            d="M 135 45 L 58 78"
            stroke="url(#malletStickGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 135 45 L 58 78"
            stroke="#FEF3C7"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Mallet Head Ball (Wooden Knob) */}
          <circle cx="50" cy="80" r="15" fill="url(#malletBallGrad)" stroke="#8A5A36" strokeWidth="1.5" />
          <ellipse cx="45" cy="75" rx="5" ry="3" fill="#FFFFFF" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Main Wooden Fish Interactive Container */}
      <motion.div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        animate={
          isHit
            ? { scale: [1, 0.94, 1.02, 1], rotate: [0, -1, 1, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="relative cursor-pointer active:scale-95 transition-transform duration-75 touch-none"
      >
        {/* Subtle Wave Ripples */}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-amber-400/30 animate-ping pointer-events-none"
            style={{ animationDuration: '0.5s' }}
          />
        ))}

        {/* Scaled Render Container */}
        <div className="w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          <svg viewBox="0 0 240 200" className="w-full h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
            <defs>
              {/* Fish Body Clip Path to contain all skin graphics */}
              <clipPath id="fishBodyClip">
                <path
                  d="M 38 102
                     C 22 92 20 78 32 70
                     C 48 62 65 70 80 76
                     C 98 46 138 30 178 36
                     C 218 42 235 78 222 112
                     C 210 146 165 170 120 166
                     C 78 162 58 138 38 102 Z"
                />
              </clipPath>

              {/* Classic Teak Wood Gradient */}
              <radialGradient id="skinClassic3D" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#F3C68F" />
                <stop offset="25%" stopColor="#D98A48" />
                <stop offset="60%" stopColor="#A4581E" />
                <stop offset="85%" stopColor="#6C330D" />
                <stop offset="100%" stopColor="#3B1804" />
              </radialGradient>

              {/* Mecha Heavy Titanium Gradient */}
              <radialGradient id="skinMecha3D" cx="35%" cy="25%" r="75%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="25%" stopColor="#94A3B8" />
                <stop offset="60%" stopColor="#475569" />
                <stop offset="85%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </radialGradient>

              {/* Rainbow Gradient */}
              <radialGradient id="skinRainbow3D" cx="35%" cy="25%" r="80%">
                <stop offset="0%" stopColor="#FFE4E6" />
                <stop offset="20%" stopColor="#FB7185" />
                <stop offset="45%" stopColor="#C084FC" />
                <stop offset="70%" stopColor="#38BDF8" />
                <stop offset="90%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#FBBF24" />
              </radialGradient>

              {/* Gold Gradient */}
              <radialGradient id="skinGold3D" cx="35%" cy="25%" r="75%">
                <stop offset="0%" stopColor="#FFF9C4" />
                <stop offset="30%" stopColor="#FBC02D" />
                <stop offset="70%" stopColor="#F57F17" />
                <stop offset="100%" stopColor="#8D6E63" />
              </radialGradient>

              {/* Jade Gradient */}
              <radialGradient id="skinJade3D" cx="35%" cy="25%" r="75%">
                <stop offset="0%" stopColor="#E8F5E9" />
                <stop offset="35%" stopColor="#66BB6A" />
                <stop offset="75%" stopColor="#2E7D32" />
                <stop offset="100%" stopColor="#1B5E20" />
              </radialGradient>

              {/* Purple Gradient */}
              <radialGradient id="skinPurple3D" cx="35%" cy="25%" r="75%">
                <stop offset="0%" stopColor="#F3E5F5" />
                <stop offset="35%" stopColor="#AB47BC" />
                <stop offset="75%" stopColor="#6A1B9A" />
                <stop offset="100%" stopColor="#4A148C" />
              </radialGradient>

              {/* Cyber Neon Gradient */}
              <radialGradient id="skinCyber3D" cx="35%" cy="25%" r="75%">
                <stop offset="0%" stopColor="#E0F7FA" />
                <stop offset="35%" stopColor="#26C6DA" />
                <stop offset="75%" stopColor="#00838F" />
                <stop offset="100%" stopColor="#004D40" />
              </radialGradient>

              {/* Minimalist Gradient */}
              <radialGradient id="skinMinimal3D" cx="35%" cy="25%" r="75%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="60%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </radialGradient>

              {/* Slit Inner Cavity Shadow */}
              <radialGradient id="slitDark" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#080402" />
                <stop offset="70%" stopColor="#1A0B03" />
                <stop offset="100%" stopColor="#401B06" />
              </radialGradient>

              {/* Mecha Hexagon Mesh Pattern */}
              <pattern id="mechaHexPattern" width="12" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 6 0 L 12 3.5 L 12 10.5 L 6 14 L 0 10.5 L 0 3.5 Z M 6 14 L 12 17.5 L 12 24.5 L 6 28 L 0 24.5 L 0 17.5 Z"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="0.6"
                  opacity="0.35"
                />
              </pattern>

              {/* PCB Circuit Pattern */}
              <pattern id="cyberPcbPattern" width="28" height="28" patternUnits="userSpaceOnUse">
                <path
                  d="M 0 14 H 10 L 14 18 H 28 M 14 0 V 8 L 18 12 V 28"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <circle cx="10" cy="14" r="1.5" fill="#22D3EE" opacity="0.8" />
                <circle cx="18" cy="12" r="1.5" fill="#22D3EE" opacity="0.8" />
              </pattern>

              {/* Gold Coin Pattern */}
              <pattern id="goldCoinPattern" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="11" cy="11" r="8" fill="none" stroke="#D97706" strokeWidth="1" opacity="0.35" />
                <rect x="8.5" y="8.5" width="5" height="5" fill="none" stroke="#D97706" strokeWidth="1" opacity="0.35" />
              </pattern>
            </defs>

            {/* Main Wooden Fish Sculpted Body Path */}
            <path
              d="M 38 102
                 C 22 92 20 78 32 70
                 C 48 62 65 70 80 76
                 C 98 46 138 30 178 36
                 C 218 42 235 78 222 112
                 C 210 146 165 170 120 166
                 C 78 162 58 138 38 102 Z"
              fill={
                skin.id === 'classic' ? 'url(#skinClassic3D)' :
                skin.id === 'mecha' ? 'url(#skinMecha3D)' :
                skin.id === 'rainbow' ? 'url(#skinRainbow3D)' :
                skin.id === 'gold' ? 'url(#skinGold3D)' :
                skin.id === 'jade' ? 'url(#skinJade3D)' :
                skin.id === 'purple' ? 'url(#skinPurple3D)' :
                skin.id === 'cyber' ? 'url(#skinCyber3D)' : 'url(#skinMinimal3D)'
              }
              stroke={skin.borderColor}
              strokeWidth="0.8"
            />

            {/* Specialized Graphic Overlay Patterns Clipped inside Wooden Fish Body */}
            <g clipPath="url(#fishBodyClip)">
              {/* 1. MECHA (重工机甲) OVERLAY */}
              {skin.id === 'mecha' && (
                <g>
                  {/* Hexagon Armor Mesh */}
                  <rect x="0" y="0" width="240" height="200" fill="url(#mechaHexPattern)" />
                  {/* Panel Armor Cut Lines */}
                  <path
                    d="M 80 76 L 120 92 L 155 72 M 120 92 L 115 152 M 155 72 L 195 82 M 65 108 L 95 125"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.2"
                    strokeDasharray="8 3"
                    opacity="0.85"
                  />
                  <path
                    d="M 130 45 L 160 55 M 95 52 L 120 62"
                    fill="none"
                    stroke="#64748B"
                    strokeWidth="1.5"
                  />
                  {/* Armor Rivet Bolts */}
                  <circle cx="120" cy="92" r="2.5" fill="#38BDF8" />
                  <circle cx="155" cy="72" r="2.5" fill="#38BDF8" />
                  <circle cx="95" cy="125" r="2" fill="#38BDF8" />
                  {/* Energy Reactor Core Ring */}
                  <circle cx="150" cy="115" r="15" fill="none" stroke="#0284C7" strokeWidth="1.5" />
                  <circle cx="150" cy="115" r="10" fill="#0284C7" opacity="0.35" />
                  <circle cx="150" cy="115" r="4.5" fill="#38BDF8" className="animate-pulse" />
                  {/* Hazard Caution Stripes */}
                  <g opacity="0.75" stroke="#F59E0B" strokeWidth="2.5">
                    <line x1="175" y1="145" x2="185" y2="135" />
                    <line x1="181" y1="149" x2="191" y2="139" />
                    <line x1="187" y1="153" x2="197" y2="143" />
                  </g>
                </g>
              )}

              {/* 2. RAINBOW (绚彩彩虹) OVERLAY */}
              {skin.id === 'rainbow' && (
                <g>
                  {/* Curved Rainbow Ribbon Arc */}
                  <path
                    d="M 50 120 C 90 155 160 145 210 100"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    opacity="0.35"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 70 65 C 120 40 180 50 210 90"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    opacity="0.6"
                    strokeLinecap="round"
                  />
                  {/* Dreamy Sparkles */}
                  <g fill="#FFFFFF" opacity="0.9">
                    {/* Star 1 */}
                    <path d="M 140 55 Q 140 63 148 63 Q 140 63 140 71 Q 140 63 132 63 Q 140 63 140 55 Z" />
                    {/* Star 2 */}
                    <path d="M 85 85 Q 85 90 90 90 Q 85 90 85 95 Q 85 90 80 90 Q 85 90 85 85 Z" />
                    {/* Star 3 */}
                    <path d="M 180 125 Q 180 132 187 132 Q 180 132 180 139 Q 180 132 173 132 Q 180 132 180 125 Z" />
                  </g>
                  <circle cx="115" cy="70" r="3" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="165" cy="95" r="2.5" fill="#FFFFFF" opacity="0.85" />
                  <circle cx="100" cy="135" r="2" fill="#FFFFFF" opacity="0.7" />
                </g>
              )}

              {/* 3. GOLD (招财金光) OVERLAY */}
              {skin.id === 'gold' && (
                <g>
                  <rect x="0" y="0" width="240" height="200" fill="url(#goldCoinPattern)" />
                  {/* Central Coin Emblem */}
                  <g transform="translate(145, 65)">
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#FEF3C7" strokeWidth="1.8" opacity="0.8" />
                    <rect x="-5" y="-5" width="10" height="10" fill="none" stroke="#FEF3C7" strokeWidth="1.8" opacity="0.8" />
                  </g>
                  {/* Golden Wealth Sparkle */}
                  <path d="M 115 42 L 118 50 L 126 53 L 118 56 L 115 64 L 112 56 L 104 53 L 112 50 Z" fill="#FFF9C4" opacity="0.85" />
                </g>
              )}

              {/* 4. CYBER (赛博电路) OVERLAY */}
              {skin.id === 'cyber' && (
                <g>
                  <rect x="0" y="0" width="240" height="200" fill="url(#cyberPcbPattern)" />
                  {/* Processor IC Chip Block */}
                  <g transform="translate(125, 48)">
                    <rect x="0" y="0" width="22" height="22" rx="3" fill="#083344" stroke="#22D3EE" strokeWidth="1.2" />
                    <path d="M -5 6 H 0 M -5 11 H 0 M -5 16 H 0 M 22 6 H 27 M 22 11 H 27 M 22 16 H 27" stroke="#22D3EE" strokeWidth="1" />
                    <text x="11" y="14" fontSize="8" fill="#67E8F9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AI</text>
                  </g>
                </g>
              )}

              {/* 5. PURPLE (紫气祥云) OVERLAY */}
              {skin.id === 'purple' && (
                <g stroke="#E9D5FF" strokeWidth="1.2" fill="none" opacity="0.5">
                  {/* Cloud 1 */}
                  <path d="M 70 80 C 70 70 85 68 92 75 C 98 68 112 72 110 82 C 118 84 116 95 106 95 H 70 Z" />
                  {/* Cloud 2 */}
                  <path d="M 135 125 C 135 115 150 113 157 120 C 163 113 177 117 175 127 C 183 129 181 140 171 140 H 135 Z" />
                  <path d="M 110 50 C 125 42 145 45 155 58" stroke="#F3E8FF" strokeWidth="1.5" opacity="0.6" />
                </g>
              )}

              {/* 6. JADE (翡翠玉雕) OVERLAY */}
              {skin.id === 'jade' && (
                <g stroke="#A7F3D0" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round">
                  {/* Jade Ice Cracks */}
                  <path d="M 75 75 L 105 90 L 130 80 L 160 100" />
                  <path d="M 105 90 L 115 120 L 140 135" />
                  <path d="M 130 80 L 155 55" />
                  <path d="M 115 120 L 85 140" />
                  <path d="M 90 60 C 120 45 160 50 185 70" stroke="#ECFDF5" strokeWidth="2" opacity="0.45" />
                </g>
              )}

              {/* 7. CLASSIC (原木经典) OVERLAY */}
              {skin.id === 'classic' && (
                <g stroke="#3B1804" strokeWidth="1" fill="none" opacity="0.35">
                  <ellipse cx="120" cy="110" rx="35" ry="20" />
                  <ellipse cx="120" cy="110" rx="55" ry="32" />
                  <ellipse cx="120" cy="110" rx="75" ry="45" />
                  <path d="M 100 60 C 130 48 165 52 185 68" stroke="#FEF3C7" strokeWidth="1.2" opacity="0.25" />
                </g>
              )}

              {/* 8. MINIMAL (简约白线) OVERLAY */}
              {skin.id === 'minimal' && (
                <g fill="none">
                  <path d="M 75 75 C 105 50 155 45 185 65" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
                  <circle cx="130" cy="60" r="15" stroke="#94A3B8" strokeWidth="1" opacity="0.3" />
                </g>
              )}
            </g>

            {/* Traditional Wooden Fish Mouth / Slit Cutout (左低右高斜向暗槽) */}
            <path
              d="M 98 112
                 C 90 112 90 100 104 100
                 C 122 100 145 92 226 80
                 L 226 92
                 C 145 104 122 124 104 124
                 C 90 124 90 112 98 112 Z"
              fill="url(#slitDark)"
              stroke="#0A0402"
              strokeWidth="1"
            />

            {/* Inner Dark Hollow Shadow */}
            <path
              d="M 102 112 C 128 102 160 92 225 86"
              fill="none"
              stroke="#000000"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.div>

      {/* Tap Hint Text */}
      <div className="mt-2 text-center">
        <p className="text-[10px] text-neutral-500 font-light tracking-[0.25em] uppercase">
          点击敲击木鱼 • 长按连击 • 双击+10功德
        </p>
      </div>
    </div>
  );
};
