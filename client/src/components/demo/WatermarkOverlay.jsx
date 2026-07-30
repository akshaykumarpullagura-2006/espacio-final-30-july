import React from 'react';
import DEMO_CONFIG from '../../config/demoConfig';

/**
 * Full Page Continuous Diagonal Watermark Overlay
 * Covers backgrounds, cards, empty spaces, dashboards, reports, and tables.
 * Opacity: 6-10%. Continuous repeating text with subtle slow drift.
 */
const WatermarkOverlay = () => {
  if (!DEMO_CONFIG.DEMO_MODE) return null;

  const lines = DEMO_CONFIG.BRANDING.watermarkLines;

  // Generate a matrix grid of watermark blocks
  const rows = Array.from({ length: 12 });
  const cols = Array.from({ length: 8 });

  return (
    <div 
      className="fixed inset-0 z-[9990] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="absolute -inset-[50%] w-[200%] h-[200%] rotate-[-25deg] flex flex-col justify-around opacity-[0.07] animate-watermark-drift">
        {rows.map((_, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex justify-around items-center space-x-12 whitespace-nowrap py-6"
            style={{
              transform: `translateX(${rowIndex % 2 === 0 ? '0px' : '80px'})`
            }}
          >
            {cols.map((_, colIndex) => (
              <div 
                key={colIndex} 
                className="flex flex-col items-center justify-center text-center font-sans tracking-widest uppercase font-bold text-charcoal dark:text-white"
              >
                <span className="text-xl md:text-2xl font-editorial tracking-[0.25em] text-gold dark:text-gold/90 font-extrabold mb-1">
                  {lines[0]}
                </span>
                <span className="text-sm md:text-base font-bold tracking-[0.2em] text-walnut/90 dark:text-white/80">
                  {lines[1]} • {lines[2]}
                </span>
                <span className="text-[11px] tracking-[0.15em] font-medium text-walnut/70 dark:text-white/60 mt-0.5">
                  {lines[3]}
                </span>
                <span className="text-[9px] tracking-normal font-normal text-walnut/50 dark:text-white/40 max-w-[220px] text-center mt-1 normal-case leading-tight">
                  {lines[4]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(WatermarkOverlay);
