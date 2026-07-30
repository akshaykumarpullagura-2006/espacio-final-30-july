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
