// Payment interfaces
export interface PaymentData {
  amount: number;
  currency: string;
  orderId: string;
  description: string;
  registrationId: string;
  gameRegistrationId?: string;
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface PaymentRecord {
  id: string;
  registration_id: string;
  game_registration_id?: string;
  payment_gateway: string;
  payment_id: string;
  amount: number;
  currency: string;
  status: 'success' | 'failed' | 'pending';
  gateway_response: any;
  created_at: string;
}

// Razorpay specific interfaces
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: PaymentResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

// Pricing structure
export interface PricingPlan {
  single: number;
  combo2: number;
  combo3: number;
  allGames: number;
}

export interface EarlyBirdDiscount {
  discount: number;
  lastDate: string;
}

export const PRICING: {
  gameRegistration: PricingPlan;
  earlyBird: EarlyBirdDiscount;
} = {
  gameRegistration: {
    single: 299,
    combo2: 499,
    combo3: 699,
    allGames: 899
  },
  earlyBird: {
    discount: 100,
    lastDate: '2025-09-10'
  }
};

// Payment status types
export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed' | 'cancelled';
