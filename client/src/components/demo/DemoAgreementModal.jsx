import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertOctagon, CheckSquare, Square, ArrowRight } from 'lucide-react';
import DEMO_CONFIG from '../../config/demoConfig';

/**
 * Full-Screen Mandatory Confidential Demo Agreement Modal
 * Displayed before the application loads in Demo Mode.
 * Requires explicit checkbox acceptance to continue to the preview.
 */
const DemoAgreementModal = ({ onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);
  const agreement = DEMO_CONFIG.AGREEMENT;

  return (
    <div className="fixed inset-0 z-[999999] bg-[#08080c] backdrop-blur-3xl flex items-center justify-center p-4 md:p-6 overflow-y-auto select-none">
      {/* Background Ambient Glows */}
      <div className="fixed -top-32 -left-32 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-32 -right-32 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-2xl w-full bg-[#0d0d14] border border-gold/40 rounded-2xl p-6 md:p-9 shadow-[0_0_60px_rgba(201,169,110,0.2)] my-auto text-left flex flex-col justify-between overflow-hidden">
        
        {/* Header Badge & Title */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shadow-inner">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-gold/90">
                {DEMO_CONFIG.BRANDING.company} • {DEMO_CONFIG.BRANDING.team}
              </span>
              <h1 className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-cream uppercase">
                {agreement.title}
              </h1>
            </div>
          </div>

          {/* Statement Box */}
          <div className="space-y-3 py-4 border-t border-b border-white/10 text-xs md:text-sm text-cream/90 font-sans leading-relaxed my-4">
            <p className="font-semibold text-gold/95">
              {agreement.intro}
            </p>
            <p className="text-cream/80">
              {agreement.ipNotice}
            </p>
          </div>

          {/* Prohibited List */}
          <div className="mb-5">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-cream/90 mb-3">
              {agreement.prohibitedHeader}
            </p>
            <ul className="space-y-2">
              {agreement.prohibitedList.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs md:text-[13px] text-cream/85">
                  <span className="text-gold font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Notice Warning Box */}
          <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/25 flex items-center space-x-3 mb-6">
            <AlertOctagon className="w-5 h-5 text-gold flex-shrink-0" />
            <p className="text-[11px] md:text-xs text-cream/80 font-sans leading-snug">
              {agreement.legalNotice}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-white/10 space-y-4">
          {/* Interactive Checkbox */}
          <label 
            onClick={() => setIsChecked(!isChecked)}
            className="flex items-center space-x-3 cursor-pointer group select-none p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
              isChecked 
                ? 'bg-gold border-gold text-charcoal' 
                : 'border-gold/50 group-hover:border-gold bg-transparent'
            }`}>
              {isChecked && <CheckSquare className="w-4 h-4 text-charcoal fill-current" />}
            </div>
            <span className="text-xs md:text-sm font-sans font-medium text-cream/90 group-hover:text-cream transition-colors">
              {agreement.checkboxLabel}
            </span>
          </label>

          {/* Continue Button */}
          <button
            disabled={!isChecked}
            onClick={onAccept}
            className={`w-full py-4 px-6 rounded-xl font-sans font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 ${
              isChecked
                ? 'bg-gold hover:bg-gold-light text-charcoal shadow-[0_0_30px_rgba(201,169,110,0.4)] cursor-pointer'
                : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/5'
            }`}
          >
            <span>{agreement.buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default DemoAgreementModal;
