import { createClient } from '@supabase/supabase-js';
import { ENV, validateEnv } from './constants';

// Validate environment variables on initialization
if (!validateEnv()) {
  throw new Error('Missing required environment variables for Supabase');
}

// Create Supabase client
export const supabase = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false // We don't need auth sessions for this use case
    }
  }
);

// Database table names
export const TABLES = {
  REGISTRATIONS: 'registrations',
  GAME_REGISTRATIONS: 'game_registrations', 
  PAYMENTS: 'payments'
} as const;

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any): string => {
  if (error?.code === '23505') {
    if (error.constraint?.includes('email')) {
      return 'Email is already registered';
    }
    if (error.constraint?.includes('prn')) {
      return 'PRN is already registered';
    }
    return 'This record already exists';
  }
  
  if (error?.code === '23503') {
    return 'Invalid reference data';
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'Database operation failed';
};

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from(TABLES.REGISTRATIONS)
      .select('count(*)')
      .limit(1);
    
    if (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
};

// Database health check
export const checkDatabaseHealth = async (): Promise<{
  isHealthy: boolean;
  message: string;
}> => {
  try {
    const isConnected = await testConnection();
    
    if (!isConnected) {
      return {
        isHealthy: false,
        message: 'Database connection failed'
      };
    }
    
    return {
      isHealthy: true,
      message: 'Database is healthy'
    };
  } catch (error) {
    return {
      isHealthy: false,
      message: 'Database health check failed'
    };
  }
};
