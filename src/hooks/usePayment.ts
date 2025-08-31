import { useState, useCallback } from 'react';
import { PaymentService } from '@/services/paymentService';
import type { PaymentResponse, PaymentStatus } from '@/types/payment';
import type { GameRegistrationRecord, RegistrationRecord } from '@/types/registration';

interface UsePaymentReturn {
  // State
  isProcessing: boolean;
  paymentStatus: PaymentStatus;
  error: string | null;
  paymentResponse: PaymentResponse | null;
  receiptData: any | null;
  
  // Actions
  processPayment: (
    gameRegistration: GameRegistrationRecord,
    userRegistration: RegistrationRecord
  ) => Promise<PaymentResponse>;
  retryPayment: (gameRegistrationId: string) => Promise<PaymentResponse>;
  generateReceipt: (
    payment: PaymentResponse,
    gameRegistration: GameRegistrationRecord,
    userRegistration: RegistrationRecord
  ) => any;
  clearError: () => void;
  reset: () => void;
  
  // Utils
  getStatusMessage: () => { message: string; type: 'success' | 'error' | 'warning' | 'info' };
}

export const usePayment = (): UsePaymentReturn => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const [error, setError] = useState<string | null>(null);
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);
  const [receiptData, setReceiptData] = useState<any | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setIsProcessing(false);
    setPaymentStatus('pending');
    setError(null);
    setPaymentResponse(null);
    setReceiptData(null);
  }, []);

  const processPayment = useCallback(async (
    gameRegistration: GameRegistrationRecord,
    userRegistration: RegistrationRecord
  ): Promise<PaymentResponse> => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    setError(null);

    try {
      const response = await PaymentService.processGameRegistrationPayment(
        gameRegistration,
        userRegistration
      );

      setPaymentResponse(response);
      setPaymentStatus('success');

      // Generate receipt
      const receipt = PaymentService.generateReceiptData(
        response,
        gameRegistration,
        userRegistration
      );
      setReceiptData(receipt);

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
      setError(errorMessage);
      setPaymentStatus('failed');
      
      // Handle payment failure
      await PaymentService.handlePaymentFailure(
        gameRegistration.id,
        error instanceof Error ? error : new Error('Unknown payment error')
      );
      
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const retryPayment = useCallback(async (gameRegistrationId: string): Promise<PaymentResponse> => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    setError(null);

    try {
      const response = await PaymentService.retryPayment(gameRegistrationId);
      setPaymentResponse(response);
      setPaymentStatus('success');
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment retry failed';
      setError(errorMessage);
      setPaymentStatus('failed');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const generateReceipt = useCallback((
    payment: PaymentResponse,
    gameRegistration: GameRegistrationRecord,
    userRegistration: RegistrationRecord
  ) => {
    const receipt = PaymentService.generateReceiptData(
      payment,
      gameRegistration,
      userRegistration
    );
    setReceiptData(receipt);
    return receipt;
  }, []);

  const getStatusMessage = useCallback(() => {
    return PaymentService.getPaymentStatusMessage(paymentStatus);
  }, [paymentStatus]);

  return {
    // State
    isProcessing,
    paymentStatus,
    error,
    paymentResponse,
    receiptData,
    
    // Actions
    processPayment,
    retryPayment,
    generateReceipt,
    clearError,
    reset,
    
    // Utils
    getStatusMessage
  };
};

export default usePayment;
