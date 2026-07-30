import { useContext, createContext } from 'react';
import DEMO_CONFIG from '../config/demoConfig';

export const DemoProtectionContext = createContext({
  isDemoMode: DEMO_CONFIG.DEMO_MODE,
  isDevToolsOpen: false,
  isTabFocused: true,
  toasts: [],
  restrictedModal: { isOpen: false, featureName: '' },
  showRestrictedModal: (featureName) => {},
  closeRestrictedModal: () => {},
  triggerToast: (message) => {},
  handleRestrictedClick: (featureName, callback) => {}
});

/**
 * Custom hook to access global Demo Protection state and handlers
 */
export function useDemoProtection() {
  return useContext(DemoProtectionContext);
}

export default useDemoProtection;
