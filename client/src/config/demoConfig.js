/**
 * Global Demo Mode Configuration
 * When DEMO_MODE is set to false, all demo security listeners, overlays, 
 * badges, and feature restrictions are completely bypassed.
 */
export const DEMO_CONFIG = {
  // Master toggle: set to false to restore production functionality instantly
  DEMO_MODE: true,

  // Branding & Copy Text
  BRANDING: {
    title: 'CONFIDENTIAL DEMO',
    company: 'ESPACIO DEMO',
    team: 'TEAM VEINS',
    version: 'Preview Build',
    watermarkLines: [
      'CONFIDENTIAL',
      'ESPACIO DEMO',
      'TEAM VEINS',
      'Preview Version',
      'Unauthorized recording, screenshots or redistribution prohibited.'
    ],
    footerText: 'Confidential Demonstration • Property of TEAM VEINS',
    devtoolsTitle: 'CONFIDENTIAL DEMO',
    devtoolsMessage: 'This preview is intended solely for evaluation.\nPlease close Developer Tools to continue.',
    tabPauseTitle: 'Demo Paused',
    tabPauseMessage: 'Confidential view protected while inactive.',
    rightClickToast: 'Right-click is disabled in this confidential demonstration.',
    shortcutToast: 'Developer shortcuts and inspection tools are disabled in Demo Mode.',
    copyToast: 'Copying content is disabled in Demo Mode.',
    featureDialogTitle: 'Feature Unavailable',
    featureDialogMessage: 'This feature is disabled in the demonstration version and will be available in the full release.'
  },

  // Full-Screen Agreement Text
  AGREEMENT: {
    title: 'CONFIDENTIAL DEMO AGREEMENT',
    intro: 'This demonstration is provided exclusively for authorized evaluation by ESPACIO Management.',
    ipNotice: 'The contents of this website, including its UI, workflows, design system, source code, business logic, graphics, animations, and documentation are confidential intellectual property of TEAM VEINS.',
    prohibitedHeader: 'By proceeding, you agree that you will not:',
    prohibitedList: [
      'Record the demonstration for unauthorized distribution.',
      'Copy or reproduce the UI or functionality.',
      'Reverse engineer or imitate the software.',
      'Redistribute screenshots or recordings without written permission.',
      'Share access credentials with unauthorized individuals.'
    ],
    legalNotice: 'Unauthorized copying or infringement of intellectual property may be subject to applicable legal remedies.',
    checkboxLabel: 'I have read and agree to the Confidential Demonstration Agreement.',
    buttonText: 'Continue to Demo'
  },

  // List of feature IDs or names that are restricted in Demo Mode
  RESTRICTED_FEATURES: [
    'Export',
    'Download',
    'AI Assistant',
    'Automation',
    'Reports Export',
    'Settings',
    'Advanced Analytics',
    'CSV Export',
    'PDF Export',
    'Database Backup',
    'System Configuration'
  ],

  // Sample data placeholders for masking real sensitive business information
  SAMPLE_DATA: {
    customerName: 'Sample Customer',
    projectName: 'Sample Project',
    revenue: '$125,000 (Sample)',
    employeeName: 'Sample Employee',
    clientEmail: 'client@sample-demo.com',
    phoneNumber: '+1 (555) 019-2834 (Sample)'
  },

  // Security timing settings
  SECURITY: {
    devtoolsCheckIntervalMs: 500,
    toastDurationMs: 3500,
    devtoolsThreshold: 160 // Delta px width/height indicating open DevTools panel
  }
};

export default DEMO_CONFIG;
