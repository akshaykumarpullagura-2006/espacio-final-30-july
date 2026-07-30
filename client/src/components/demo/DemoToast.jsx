import React from 'react';
import { ShieldAlert, AlertCircle, Lock } from 'lucide-react';
import DEMO_CONFIG from '../../config/demoConfig';

/**
 * Premium Security Toast Notification Component
 * Renders stacked security warning toasts for blocked right clicks & developer shortcuts
 */
const DemoToast = ({ toasts = [], onDismiss }) => {
  if (!DEMO_CONFIG.DEMO_MODE || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[99999] flex flex-col items-center space-y-2 pointer-events-auto select-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center space-x-3 px-5 py-3 rounded-xl bg-[#0e0e14]/95 border border-gold/40 text-cream shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-md w-full"
        >
          <div className="p-2 rounded-lg bg-gold/10 text-gold flex-shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs font-sans">
            <p className="font-semibold text-gold tracking-wide uppercase text-[10px] mb-0.5">
              {DEMO_CONFIG.BRANDING.title}
            </p>
            <p className="text-cream/90 font-medium leading-tight">
              {toast.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DemoToast;
