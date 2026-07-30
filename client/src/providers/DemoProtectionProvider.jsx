import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DEMO_CONFIG from '../config/demoConfig';
import { isEditableElement, isBlockedShortcut, checkDevTools } from '../utilities/security';
import { DemoProtectionContext } from '../hooks/useDemoProtection';

import WatermarkOverlay from '../components/demo/WatermarkOverlay';
import DevToolsOverlay from '../components/demo/DevToolsOverlay';
import DemoTabPauseOverlay from '../components/demo/DemoTabPauseOverlay';
import DemoBadge from '../components/demo/DemoBadge';
import DemoBanner from '../components/demo/DemoBanner';
import DemoToast from '../components/demo/DemoToast';
import DemoFeatureModal from '../components/demo/DemoFeatureModal';
import DemoAgreementModal from '../components/demo/DemoAgreementModal';

/**
 * Global Demo Protection Provider
 * Enforces right-click protection, shortcut blocking, DevTools detection,
 * text selection restriction, copy protection, and tab focus protection.
 * When DEMO_CONFIG.DEMO_MODE is false, returns plain children with zero overhead.
 */
export const DemoProtectionProvider = ({ children }) => {
  const isDemoActive = DEMO_CONFIG.DEMO_MODE;

  const [isAgreementAccepted, setIsAgreementAccepted] = useState(() => {
    return sessionStorage.getItem('espacio_demo_agreement_accepted') === 'true';
  });

  const handleAcceptAgreement = useCallback(() => {
    sessionStorage.setItem('espacio_demo_agreement_accepted', 'true');
    setIsAgreementAccepted(true);
  }, []);

  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isTabFocused, setIsTabFocused] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [restrictedModal, setRestrictedModal] = useState({ isOpen: false, featureName: '' });

  // ── Toast Dispatcher ────────────────────────────────────────────────────────
  const triggerToast = useCallback((message) => {
    if (!isDemoActive) return;
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev.slice(-2), { id, message }]); // keep max 3 toasts

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, DEMO_CONFIG.SECURITY.toastDurationMs);
  }, [isDemoActive]);

  // ── Restricted Feature Dialog Handlers ──────────────────────────────────────
  const showRestrictedModal = useCallback((featureName = '') => {
    if (!isDemoActive) return;
    setRestrictedModal({ isOpen: true, featureName });
  }, [isDemoActive]);

  const closeRestrictedModal = useCallback(() => {
    setRestrictedModal({ isOpen: false, featureName: '' });
  }, []);

  const handleRestrictedClick = useCallback((featureName, callback) => {
    if (!isDemoActive) {
      if (typeof callback === 'function') callback();
      return;
    }
    showRestrictedModal(featureName);
  }, [isDemoActive, showRestrictedModal]);

  // ── Security Event Listeners ────────────────────────────────────────────────
  useEffect(() => {
    if (!isDemoActive) return;

    // 1. Right Click Handler
    const handleContextMenu = (e) => {
      if (isEditableElement(e)) return; // Allow inside inputs / textareas
      e.preventDefault();
      triggerToast(DEMO_CONFIG.BRANDING.rightClickToast);
    };

    // 2. Keyboard Shortcut Handler
    const handleKeyDown = (e) => {
      const check = isBlockedShortcut(e);
      if (check.blocked) {
        e.preventDefault();
        e.stopPropagation();
        triggerToast(`${DEMO_CONFIG.BRANDING.shortcutToast} (${check.name})`);
      }
    };

    // 3. Copy / Cut Protection Handler
    const handleCopyCut = (e) => {
      if (isEditableElement(e)) return;
      e.preventDefault();
      triggerToast(DEMO_CONFIG.BRANDING.copyToast);
    };

    // 4. Drag & Drop Protection Handler (prevent image/text dragging)
    const handleDragStart = (e) => {
      if (isEditableElement(e)) return;
      e.preventDefault();
    };

    // 5. Selection start protection
    const handleSelectStart = (e) => {
      if (isEditableElement(e)) return;
      e.preventDefault();
    };

    // Attach document listeners with non-passive options where preventDefault is required
    document.addEventListener('contextmenu', handleContextMenu, false);
    document.addEventListener('keydown', handleKeyDown, false);
    document.addEventListener('copy', handleCopyCut, false);
    document.addEventListener('cut', handleCopyCut, false);
    document.addEventListener('dragstart', handleDragStart, false);
    document.addEventListener('selectstart', handleSelectStart, false);

    // Apply global text selection CSS override on body when demo mode active
    document.body.classList.add('demo-mode-active');

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      document.body.classList.remove('demo-mode-active');
    };
  }, [isDemoActive, triggerToast]);

  // ── DevTools Detection Polling Loop (500ms) ─────────────────────────────────
  useEffect(() => {
    if (!isDemoActive) return;

    const interval = setInterval(() => {
      const detected = checkDevTools();
      setIsDevToolsOpen((prev) => (prev !== detected ? detected : prev));
    }, DEMO_CONFIG.SECURITY.devtoolsCheckIntervalMs);

    return () => clearInterval(interval);
  }, [isDemoActive]);

  // ── Tab Visibility Listener ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isDemoActive) return;

    const handleVisibilityChange = () => {
      setIsTabFocused(!document.hidden);
    };

    const handleBlur = () => setIsTabFocused(false);
    const handleFocus = () => setIsTabFocused(true);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isDemoActive]);

  // Context value object
  const contextValue = useMemo(() => ({
    isDemoMode: isDemoActive,
    isDevToolsOpen,
    isTabFocused,
    toasts,
    restrictedModal,
    showRestrictedModal,
    closeRestrictedModal,
    triggerToast,
    handleRestrictedClick
  }), [
    isDemoActive,
    isDevToolsOpen,
    isTabFocused,
    toasts,
    restrictedModal,
    showRestrictedModal,
    closeRestrictedModal,
    triggerToast,
    handleRestrictedClick
  ]);

  if (!isDemoActive) {
    return <>{children}</>;
  }

  return (
    <DemoProtectionContext.Provider value={contextValue}>
      {!isAgreementAccepted ? (
        <DemoAgreementModal onAccept={handleAcceptAgreement} />
      ) : (
        <>
          <div className="demo-mode-root">
            {children}
          </div>

          {/* Security Overlays & UI Components */}
          <WatermarkOverlay />
          <DevToolsOverlay isOpen={isDevToolsOpen} />
          <DemoTabPauseOverlay isTabFocused={isTabFocused} />
          <DemoBadge />
          <DemoBanner />
          <DemoToast toasts={toasts} />
          <DemoFeatureModal
            isOpen={restrictedModal.isOpen}
            featureName={restrictedModal.featureName}
            onClose={closeRestrictedModal}
          />
        </>
      )}
    </DemoProtectionContext.Provider>
  );
};

export default DemoProtectionProvider;
