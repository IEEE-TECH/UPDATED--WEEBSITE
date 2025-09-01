import { useState, useCallback } from 'react';
import { RegistrationService } from '@/services/registrationService';
import { PaymentService } from '@/services/paymentService';
import type { 
  MainRegistration, 
  GameRegistration, 
  RegistrationRecord,
  GameRegistrationRecord 
} from '@/types/registration';
import type { PaymentResponse } from '@/types/payment';
import { calculatePrice } from '@/lib/constants';
import { GAMES } from '@/types/registration';

interface UseRegistrationReturn {
  // State
  isLoading: boolean;
  error: string | null;
  registrationData: RegistrationRecord | null;
  gameRegistrations: GameRegistrationRecord[];
  
  // Actions
  submitMainRegistration: (data: MainRegistration) => Promise<RegistrationRecord>;
  submitGameRegistration: (data: GameRegistration) => Promise<void>;
  clearError: () => void;
  reset: () => void;
  
  // Utils
  checkEmailExists: (email: string) => Promise<boolean>;
  checkPRNExists: (prn: string) => Promise<boolean>;
  getUserRegistrations: (registrationId: string) => Promise<GameRegistrationRecord[]>;
}

export const useRegistration = (): UseRegistrationReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrationData, setRegistrationData] = useState<RegistrationRecord | null>(null);
  const [gameRegistrations, setGameRegistrations] = useState<GameRegistrationRecord[]>([]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setRegistrationData(null);
    setGameRegistrations([]);
  }, []);

  const checkEmailExists = useCallback(async (email: string): Promise<boolean> => {
    try {
      return await RegistrationService.checkEmailExists(email);
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }, []);

  const checkPRNExists = useCallback(async (prn: string): Promise<boolean> => {
    try {
      return await RegistrationService.checkPRNExists(prn);
    } catch (error) {
      console.error('Error checking PRN:', error);
      return false;
    }
  }, []);

  const submitMainRegistration = useCallback(async (data: MainRegistration): Promise<RegistrationRecord> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await RegistrationService.createMainRegistration(data);
      setRegistrationData(result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitGameRegistration = useCallback(async (data: GameRegistration): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Get or create user registration
      const userRegistration = await RegistrationService.createOrGetRegistration(data);
      
      // Find game details
      const gameInfo = GAMES.find(game => game.id === data.gameId);
      if (!gameInfo) {
        throw new Error('Invalid game selection');
      }

      // Calculate price
      const price = calculatePrice(1);

      // Create game registration
      const gameRegistration = await RegistrationService.createGameRegistration(
        userRegistration.id,
        data.gameId,
        gameInfo.name,
        price
      );

      // Process payment
      await PaymentService.processGameRegistrationPayment(
        gameRegistration,
        userRegistration
      );

      // Update local state
      setRegistrationData(userRegistration);
      setGameRegistrations(prev => [...prev, gameRegistration]);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Game registration failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserRegistrations = useCallback(async (registrationId: string): Promise<GameRegistrationRecord[]> => {
    try {
      const registrations = await RegistrationService.getUserGameRegistrations(registrationId);
      setGameRegistrations(registrations);
      return registrations;
    } catch (error) {
      console.error('Error getting user registrations:', error);
      return [];
    }
  }, []);

  return {
    // State
    isLoading,
    error,
    registrationData,
    gameRegistrations,
    
    // Actions
    submitMainRegistration,
    submitGameRegistration,
    clearError,
    reset,
    
    // Utils
    checkEmailExists,
    checkPRNExists,
    getUserRegistrations
  };
};

export default useRegistration;
