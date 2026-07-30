import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import DEMO_CONFIG from '../../config/demoConfig';

/**
 * Top-Right Corner Premium Demo Badge
 * Displays persistent evaluation branding:
 * ESPACIO DEMO • TEAM VEINS • Preview Build
 */
const DemoBadge = () => {
  if (!DEMO_CONFIG.DEMO_MODE) return null;

  return (
    <div className="fixed top-4 right-4 z-[9995] pointer-events-auto select-none">
      <div className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#0c0c10]/85 border border-gold/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md hover:border-gold transition-all duration-300 group">
        <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
        <div className="flex items-center space-x-1.5 text-cream text-[11px] font-sans font-semibold tracking-wider uppercase">
          <span className="text-gold font-editorial tracking-widest">{DEMO_CONFIG.BRANDING.company}</span>
          <span className="text-gold/40">•</span>
          <span className="text-cream/90">{DEMO_CONFIG.BRANDING.team}</span>
          <span className="text-gold/40">•</span>
          <span className="text-gold/80 font-mono text-[10px]">{DEMO_CONFIG.BRANDING.version}</span>
        </div>
        <ShieldCheck className="w-3.5 h-3.5 text-gold group-hover:rotate-12 transition-transform duration-300" />
      </div>
    </div>
  );
};

export default React.memo(DemoBadge);
