import React from 'react';
import { Lock, Sparkles, X } from 'lucide-react';
import DEMO_CONFIG from '../../config/demoConfig';

/**
 * Feature Restricted Dialog Modal
 * Displayed when the client clicks on disabled features in Demo Mode (e.g. Export, AI Assistant, Settings)
 */
const DemoFeatureModal = ({ isOpen, featureName, onClose }) => {
  if (!DEMO_CONFIG.DEMO_MODE || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in select-none">
      <div className="max-w-md w-full bg-[#0d0d12] border border-gold/40 rounded-2xl p-7 shadow-[0_0_40px_rgba(201,169,110,0.2)] text-center relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-cream/50 hover:text-cream hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="mx-auto w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-5 shadow-inner">
          <Lock className="w-7 h-7" />
        </div>

        {/* Title */}
        <h3 className="font-editorial text-2xl font-bold tracking-wider text-cream uppercase mb-2">
          {DEMO_CONFIG.BRANDING.featureDialogTitle}
        </h3>

        {/* Feature badge */}
        {featureName && (
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3" />
            <span>{featureName}</span>
          </div>
        )}

        {/* Message */}
        <p className="font-sans text-sm text-cream/80 leading-relaxed mb-7">
          {DEMO_CONFIG.BRANDING.featureDialogMessage}
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-gold hover:bg-gold-light text-charcoal font-sans font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl shadow-lg hover:shadow-gold/30 transition-all duration-300 cursor-pointer"
        >
          Acknowledge & Continue
        </button>
      </div>
    </div>
  );
};

export default DemoFeatureModal;
