import React from 'react';
import { EyeOff, ShieldCheck } from 'lucide-react';
import DEMO_CONFIG from '../../config/demoConfig';

/**
 * Tab Visibility Protection Overlay
 * When the browser tab loses focus:
 * - Blurs application content
 * - Displays "Demo paused." status message
 * - Restores automatically when focus returns
 */
const DemoTabPauseOverlay = ({ isTabFocused }) => {
  if (!DEMO_CONFIG.DEMO_MODE || isTabFocused) return null;

  return (
    <div className="fixed inset-0 z-[99995] flex items-center justify-center p-6 bg-black/75 backdrop-blur-xl transition-all duration-300 select-none">
      <div className="max-w-sm w-full bg-[#0d0d12]/95 border border-gold/25 rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden">
        {/* Icon */}
        <div className="mx-auto w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-4">
          <EyeOff className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="font-editorial text-xl font-bold tracking-wider text-cream uppercase mb-2">
          {DEMO_CONFIG.BRANDING.tabPauseTitle}
        </h3>

        {/* Message */}
        <p className="font-sans text-xs text-cream/75 mb-4">
          {DEMO_CONFIG.BRANDING.tabPauseMessage}
        </p>

        {/* Status */}
        <div className="inline-flex items-center space-x-2 text-[11px] font-mono text-gold/90 px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Switch back to tab to resume preview</span>
        </div>
      </div>
    </div>
  );
};

export default DemoTabPauseOverlay;
