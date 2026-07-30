import React from 'react';
import { ShieldAlert, Lock, AlertTriangle } from 'lucide-react';
import DEMO_CONFIG from '../../config/demoConfig';

/**
 * DevTools Protection Overlay
 * When DevTools are detected:
 * - Blurs application content completely
 * - Disables all pointer events
 * - Shows a sleek, high-priority confidentiality warning modal
 * - Restores automatically when DevTools are closed
 */
const DevToolsOverlay = ({ isOpen }) => {
  if (!DEMO_CONFIG.DEMO_MODE || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl transition-all duration-300 animate-in fade-in">
      <div className="max-w-md w-full bg-[#0d0d12] border border-gold/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(201,169,110,0.2)] text-center relative overflow-hidden select-none">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6 shadow-inner">
          <ShieldAlert className="w-8 h-8 animate-pulse" />
        </div>

        {/* Title */}
        <h2 className="font-editorial text-2xl font-bold tracking-wider text-cream uppercase mb-3">
          {DEMO_CONFIG.BRANDING.devtoolsTitle}
        </h2>

        {/* Subtitle / Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-mono uppercase tracking-widest mb-6">
          <Lock className="w-3 h-3" />
          <span>Security Protection Active</span>
        </div>

        {/* Message */}
        <p className="font-sans text-sm text-cream/80 leading-relaxed mb-8 whitespace-pre-line">
          {DEMO_CONFIG.BRANDING.devtoolsMessage}
        </p>

        {/* Footer info box */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-center space-x-2 text-xs font-mono text-cream/50">
          <AlertTriangle className="w-3.5 h-3.5 text-gold" />
          <span>{DEMO_CONFIG.BRANDING.company} • {DEMO_CONFIG.BRANDING.team}</span>
        </div>
      </div>
    </div>
  );
};

export default DevToolsOverlay;
