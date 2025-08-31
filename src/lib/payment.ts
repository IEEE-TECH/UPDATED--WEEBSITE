import { ENV, PAYMENT_CONFIG, APP_CONFIG } from './constants';
import type { PaymentData, PaymentResponse, RazorpayOptions } from '@/types/payment';

// Declare Razorpay on window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Create Razorpay order (this would typically be done on the server)
export const createRazorpayOrder = async (amount: number, currency: string = 'INR'): Promise<{
  orderId: string;
  amount: number;
  currency: string;
}> => {
  // In a real implementation, this would be a server-side API call
  // For demo purposes, we'll generate a mock order ID
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    orderId,
    amount: amount * 100, // Razorpay expects amount in paisa
    currency
  };
};

// Initialize Razorpay payment
export const initializePayment = async (
  paymentData: PaymentData,
  userDetails: {
    name: string;
    email: string;
    phone: string;
  }
): Promise<PaymentResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      // Create order
      const order = await createRazorpayOrder(paymentData.amount, paymentData.currency);

      // Razorpay options
      const options: RazorpayOptions = {
        key: ENV.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: APP_CONFIG.name,
        description: paymentData.description,
        order_id: order.orderId,
        handler: (response: PaymentResponse) => {
          resolve(response);
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone
        },
        theme: {
          color: PAYMENT_CONFIG.theme.color
        },
        modal: {
          ondismiss: () => {
            reject(new Error('Payment cancelled by user'));
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      reject(error);
    }
  });
};

// Verify payment signature (server-side verification recommended)
export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  // In production, this should be done on the server using Razorpay secret key
  // For demo purposes, we'll return true
  console.log('Payment verification:', { orderId, paymentId, signature });
  return true;
};

// Format amount for display
export const formatAmount = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Calculate tax (if applicable)
export const calculateTax = (amount: number, taxRate: number = 0): number => {
  return Math.round(amount * taxRate);
};

// Calculate total amount including tax
export const calculateTotal = (
  baseAmount: number,
  taxRate: number = 0,
  discount: number = 0
): {
  baseAmount: number;
  discount: number;
  tax: number;
  total: number;
} => {
  const discountedAmount = baseAmount - discount;
  const tax = calculateTax(discountedAmount, taxRate);
  const total = discountedAmount + tax;

  return {
    baseAmount,
    discount,
    tax,
    total
  };
};

// Payment status helpers
export const getPaymentStatusMessage = (status: string): string => {
  switch (status) {
    case 'success':
      return 'Payment completed successfully!';
    case 'failed':
      return 'Payment failed. Please try again.';
    case 'pending':
      return 'Payment is being processed...';
    case 'cancelled':
      return 'Payment was cancelled.';
    default:
      return 'Unknown payment status.';
  }
};

// Generate receipt number
export const generateReceiptNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  
  return `TECH14-${year}${month}${day}-${random}`;
};
