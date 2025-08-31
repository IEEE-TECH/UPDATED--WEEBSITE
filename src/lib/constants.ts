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

// Payment configuration
export const PAYMENT_CONFIG = {
  currency: 'INR',
  gateway: 'razorpay',
  theme: {
    color: '#D4AF37' // Classified gold color
  }
};

// Game pricing and packages
export const GAME_PRICING = {
  individual: 299,
  combo2: 499,    // 2 games
  combo3: 699,    // 3 games  
  allGames: 899,  // All 4 games
  earlyBirdDiscount: 100
};

// Registration status constants
export const REGISTRATION_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  EARLY_BIRD: 'early_bird'
} as const;

// Payment status constants
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
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
  paymentFailed: 'Payment failed. Please try again.',
  registrationClosed: 'Registration is currently closed',
  serverError: 'Server error. Please try again later.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  registrationSuccess: 'Registration successful!',
  paymentSuccess: 'Payment completed successfully!',
  emailSent: 'Confirmation email sent successfully!'
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

// Calculate pricing based on game count and early bird status
export const calculatePrice = (gameCount: number): number => {
  let basePrice: number;
  
  switch (gameCount) {
    case 1:
      basePrice = GAME_PRICING.individual;
      break;
    case 2:
      basePrice = GAME_PRICING.combo2;
      break;
    case 3:
      basePrice = GAME_PRICING.combo3;
      break;
    case 4:
      basePrice = GAME_PRICING.allGames;
      break;
    default:
      basePrice = GAME_PRICING.individual * gameCount;
  }
  
  // Apply early bird discount
  if (isEarlyBird()) {
    return Math.max(0, basePrice - GAME_PRICING.earlyBirdDiscount);
  }
  
  return basePrice;
};

// Environment variables with defaults
export const ENV = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  RAZORPAY_KEY_ID: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
  APP_ENV: import.meta.env.MODE || 'development'
};

// Validate environment variables
export const validateEnv = (): boolean => {
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_RAZORPAY_KEY_ID'
  ];
  
  for (const varName of requiredVars) {
    if (!import.meta.env[varName]) {
      console.error(`Missing environment variable: ${varName}`);
      return false;
    }
  }
  
  return true;
};
