// App configuration constants
export const APP_CONFIG = {
  name: 'TECHNOPEDIA 14',
  title: 'Trinity Veil: The Final Confluence',
  eventDate: '2025-09-17',
  registrationEndDate: '2025-09-19',
  earlyBirdEndDate: '2025-09-10',
  organizerName: 'TECHNOPEDIA 14',
  supportEmail: 'support@technopedia14.com',
  supportPhone: '+91-XXXXXXXXXX'
};

// Google Forms URLs for registrations
export const GOOGLE_FORMS = {
  mainRegistration: 'https://forms.google.com/your-main-registration-form',
  gameRegistrations: {
    game1: 'https://forms.google.com/your-game1-form',
    game2: 'https://forms.google.com/your-game2-form', 
    game3: 'https://forms.google.com/your-game3-form',
    game4: 'https://forms.google.com/your-game4-form'
  }
};

// Registration status constants
export const REGISTRATION_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  EARLY_BIRD: 'early_bird'
} as const;

// Form field limits
export const FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 100 },
  phone: { length: 10 },
  prn: { min: 5, max: 50 },
  branch: { max: 100 }
};

// Error messages
export const ERROR_MESSAGES = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid 10-digit mobile number',
  invalidPRN: 'PRN should only contain letters and numbers',
  duplicateEmail: 'Email is already registered',
  duplicatePRN: 'PRN is already registered',
  networkError: 'Network error. Please check your connection.',
  registrationClosed: 'Registration is currently closed',
  serverError: 'Server error. Please try again later.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  registrationSuccess: 'Registration successful!'
};

// Date utility functions
export const isEarlyBird = (): boolean => {
  const today = new Date();
  const earlyBirdEnd = new Date(APP_CONFIG.earlyBirdEndDate);
  return today <= earlyBirdEnd;
};

export const isRegistrationOpen = (): boolean => {
  const today = new Date();
  const registrationEnd = new Date(APP_CONFIG.registrationEndDate);
  return today <= registrationEnd;
};

export const getRegistrationStatus = (): string => {
  if (!isRegistrationOpen()) {
    return REGISTRATION_STATUS.CLOSED;
  }
  if (isEarlyBird()) {
    return REGISTRATION_STATUS.EARLY_BIRD;
  }
  return REGISTRATION_STATUS.OPEN;
};

// Environment variables with defaults
export const ENV = {
  APP_ENV: import.meta.env.MODE || 'development'
};

// Validate environment variables  
export const validateEnv = (): boolean => {
  // No required environment variables for frontend-only mode
  console.log('Frontend-only mode - no environment validation required');
  return true;
};
