import { z } from 'zod';
import { BRANCHES, YEARS } from '@/types/registration';

// Main registration form validation schema
export const mainRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number')
    .length(10, 'Phone number must be exactly 10 digits'),
  
  prn: z
    .string()
    .min(5, 'PRN must be at least 5 characters')
    .max(50, 'PRN must be less than 50 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'PRN should only contain letters and numbers'),
  
  branch: z
    .string()
    .min(1, 'Please select your branch')
    .refine((val) => BRANCHES.includes(val) || val === 'Other', 'Please select a valid branch'),
  
  year: z
    .string()
    .min(1, 'Please select your academic year')
    .refine((val) => YEARS.includes(val), 'Please select a valid year')
});

// Game registration form validation schema
export const gameRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'),
  
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number')
    .length(10, 'Phone number must be exactly 10 digits'),
  
  prn: z
    .string()
    .min(5, 'PRN must be at least 5 characters')
    .max(50, 'PRN must be less than 50 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'PRN should only contain letters and numbers'),
  
  gameId: z
    .string()
    .min(1, 'Game selection is required')
});

// Custom validation functions
export const validatePRNUnique = async (prn: string): Promise<boolean> => {
  // This will be implemented when we add Supabase integration
  // For now, return true
  return true;
};

export const validateEmailUnique = async (email: string): Promise<boolean> => {
  // This will be implemented when we add Supabase integration
  // For now, return true
  return true;
};

// Helper function to format phone number
export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '').slice(0, 10);
};

// Helper function to validate age (optional)
export const validateAge = (dateOfBirth: string): boolean => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= 16; // Minimum age 16
  }
  
  return age >= 16;
};

// Export the inferred types
export type MainRegistrationFormData = z.infer<typeof mainRegistrationSchema>;
export type GameRegistrationFormData = z.infer<typeof gameRegistrationSchema>;
