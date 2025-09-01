import { 
  initializePayment, 
  verifyPaymentSignature, 
  generateReceiptNumber,
  formatAmount 
} from '@/lib/payment';
import { supabase } from '@/lib/supabase';
import { RegistrationService } from './registrationService';
import type { PaymentData, PaymentResponse } from '@/types/payment';
import type { GameRegistrationRecord, RegistrationRecord } from '@/types/registration';

export class PaymentService {
  // Process game registration with payment
  static async processGameRegistrationPayment(
    gameRegistration: GameRegistrationRecord,
    userRegistration: RegistrationRecord
  ): Promise<PaymentResponse> {
    try {
      const paymentData: PaymentData = {
        amount: gameRegistration.payment_amount,
        currency: 'INR',
        orderId: `game_${gameRegistration.id}`,
        description: `TECHNOPEDIA 14 - ${gameRegistration.game_name}`,
        registrationId: userRegistration.id,
        gameRegistrationId: gameRegistration.id
      };

      const userDetails = {
        name: userRegistration.name,
        email: userRegistration.email,
        phone: userRegistration.phone
      };

      // Initialize payment through Razorpay
      const paymentResponse = await initializePayment(paymentData, userDetails);

      // Verify payment signature
      const isValid = verifyPaymentSignature(
        paymentResponse.razorpay_order_id,
        paymentResponse.razorpay_payment_id,
        paymentResponse.razorpay_signature
      );

      if (!isValid) {
        throw new Error('Payment signature verification failed');
      }

      // Record successful payment
      await RegistrationService.recordPayment(
        userRegistration.id,
        gameRegistration.id,
        {
          payment_gateway: 'razorpay',
          payment_id: paymentResponse.razorpay_payment_id,
          amount: gameRegistration.payment_amount,
          currency: 'INR',
          status: 'success',
          gateway_response: paymentResponse
        }
      );

      // Update game registration status
      await RegistrationService.updateGameRegistrationPayment(
        gameRegistration.id,
        paymentResponse.razorpay_payment_id,
        'paid'
      );

      return paymentResponse;
    } catch (error) {
      console.error('Payment processing error:', error);
      
      // Record failed payment if we have enough information
      if (gameRegistration && userRegistration) {
        try {
          await RegistrationService.recordPayment(
            userRegistration.id,
            gameRegistration.id,
            {
              payment_gateway: 'razorpay',
              payment_id: '',
              amount: gameRegistration.payment_amount,
              currency: 'INR',
              status: 'failed',
              gateway_response: { error: error.message }
            }
          );

          await RegistrationService.updateGameRegistrationPayment(
            gameRegistration.id,
            '',
            'failed'
          );
        } catch (recordError) {
          console.error('Error recording failed payment:', recordError);
        }
      }

      throw error;
    }
  }

  // Generate payment receipt data
  static generateReceiptData(
    payment: PaymentResponse,
    gameRegistration: GameRegistrationRecord,
    userRegistration: RegistrationRecord
  ): {
    receiptNumber: string;
    paymentId: string;
    amount: string;
    gameName: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    date: string;
  } {
    return {
      receiptNumber: generateReceiptNumber(),
      paymentId: payment.razorpay_payment_id,
      amount: formatAmount(gameRegistration.payment_amount),
      gameName: gameRegistration.game_name,
      userName: userRegistration.name,
      userEmail: userRegistration.email,
      userPhone: userRegistration.phone,
      date: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  }

  // Handle payment failure
  static async handlePaymentFailure(
    gameRegistrationId: string,
    error: Error
  ): Promise<void> {
    try {
      await RegistrationService.updateGameRegistrationPayment(
        gameRegistrationId,
        '',
        'failed'
      );
      
      console.error('Payment failed:', error);
    } catch (updateError) {
      console.error('Error updating payment failure:', updateError);
    }
  }

  // Retry payment for existing game registration
  static async retryPayment(
    gameRegistrationId: string
  ): Promise<PaymentResponse> {
    try {
      // Get game registration details
      const { data: gameReg, error: gameError } = await supabase
        .from('game_registrations')
        .select('*, registrations(*)')
        .eq('id', gameRegistrationId)
        .single();

      if (gameError || !gameReg) {
        throw new Error('Game registration not found');
      }

      return await this.processGameRegistrationPayment(
        gameReg,
        gameReg.registrations
      );
    } catch (error) {
      console.error('Payment retry error:', error);
      throw error;
    }
  }

  // Validate payment amount
  static validatePaymentAmount(
    expectedAmount: number,
    actualAmount: number
  ): boolean {
    // Allow for small discrepancies (in paisa) due to currency conversion
    const tolerance = 1; // 1 paisa
    return Math.abs(expectedAmount - actualAmount) <= tolerance;
  }

  // Get payment status message
  static getPaymentStatusMessage(status: string): {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } {
    switch (status) {
      case 'success':
      case 'paid':
        return {
          message: 'Payment completed successfully! Registration confirmed.',
          type: 'success'
        };
      case 'failed':
        return {
          message: 'Payment failed. Please try again or contact support.',
          type: 'error'
        };
      case 'pending':
        return {
          message: 'Payment is being processed. Please wait...',
          type: 'info'
        };
      case 'cancelled':
        return {
          message: 'Payment was cancelled. You can retry anytime.',
          type: 'warning'
        };
      default:
        return {
          message: 'Unknown payment status. Please contact support.',
          type: 'error'
        };
    }
  }
}

export default PaymentService;
