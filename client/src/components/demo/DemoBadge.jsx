import React from 'react';
import { ShieldCheck } from 'lucide-react';
import DEMO_CONFIG from '../../config/demoConfig';

/**
 * Dead-Center Transparent Glassmorphic Demo Badge
 * Positioned in the exact center of the screen from every edge and corner:
 * © Copyright Reserved • TEAM VEINS
 */
const DemoBadge = () => {
  if (!DEMO_CONFIG.DEMO_MODE) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9995] pointer-events-auto select-none">
      <div className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/35 border border-gold/40 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md hover:border-gold/70 hover:bg-black/50 transition-all duration-300 group">
        <div className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
        <span className="text-cream/90 text-[10px] font-sans font-medium tracking-widest uppercase">
          {DEMO_CONFIG.BRANDING.copyrightText}
        </span>
        <ShieldCheck className="w-3.5 h-3.5 text-gold group-hover:rotate-12 transition-transform duration-300" />
      </div>
    </div>
  );
};

export default React.memo(DemoBadge);
