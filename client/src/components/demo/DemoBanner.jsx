import React from 'react';
import { Lock } from 'lucide-react';
import DEMO_CONFIG from '../../config/demoConfig';

/**
 * Bottom Footer Professional Banner
 * Displays confidential demo property text at the bottom of the viewport
 */
const DemoBanner = () => {
  if (!DEMO_CONFIG.DEMO_MODE) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[9990] bg-[#08080a]/90 border-t border-gold/25 py-1.5 px-4 backdrop-blur-md text-center pointer-events-none select-none">
      <div className="flex items-center justify-center space-x-2 text-[11px] font-sans tracking-widest text-cream/80 uppercase font-medium">
        <Lock className="w-3 h-3 text-gold" />
        <span>{DEMO_CONFIG.BRANDING.footerText}</span>
      </div>
    </div>
  );
};

export default React.memo(DemoBanner);
