import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingTextInstance, FloatingTextConfig } from '../types';

interface FloatingTextsLayerProps {
  floaters: FloatingTextInstance[];
  config: FloatingTextConfig;
}

export const FloatingTextsLayer: React.FC<FloatingTextsLayerProps> = ({ floaters, config }) => {
  const { speed, stayDuration, fadeDuration, fontSize, textColor } = config;

  // Calculate motion keyframes from custom parameters
  const totalDuration = speed + stayDuration + fadeDuration;
  const riseKeyframe = speed / totalDuration;
  const stayKeyframe = (speed + stayDuration) / totalDuration;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 flex items-center justify-center">
      <AnimatePresence>
        {floaters.map((item) => {
          const itemColor = item.color || (item.isBonus ? '#fbbf24' : textColor);
          const itemSize = item.isBonus ? fontSize * 1.25 : fontSize;

          return (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: -10,
                x: `${item.x}%`,
                scale: item.isBonus ? 0.85 : 0.95,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [-10, -110, -160, -210],
                scale: [item.isBonus ? 0.85 : 0.95, 1.05, 1, 0.95],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: totalDuration,
                times: [0, riseKeyframe * 0.4, stayKeyframe, 1],
                ease: 'easeOut',
              }}
              className="absolute flex flex-col items-center justify-center select-none whitespace-nowrap text-center pointer-events-none"
            >
              {/* Top Sub-text (e.g. 快乐 +1 in soft translucent gray) */}
              {item.subText && (
                <span className="text-lg font-normal text-neutral-400 tracking-widest mb-1 opacity-80">
                  {item.subText}
                </span>
              )}
              {/* Primary Text (e.g. 功德 +1 in crisp white) */}
              <span
                className="font-semibold tracking-widest leading-none drop-shadow-md"
                style={{
                  fontSize: `${itemSize}px`,
                  color: itemColor,
                }}
              >
                {item.text}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
