import { supabase, TABLES, handleSupabaseError } from '@/lib/supabase';
import type { 
  MainRegistration, 
  GameRegistration, 
  RegistrationRecord, 
  GameRegistrationRecord 
} from '@/types/registration';
import type { PaymentRecord } from '@/types/payment';
import { v4 as uuidv4 } from 'uuid';

// Registration Service Functions

export class RegistrationService {
  // Check if email exists
  static async checkEmailExists(email: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from(TABLES.REGISTRATIONS)
        .select('id')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking email:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Check if PRN exists
  static async checkPRNExists(prn: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from(TABLES.REGISTRATIONS)
        .select('id')
        .eq('prn', prn)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking PRN:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Create main registration
  static async createMainRegistration(data: MainRegistration): Promise<RegistrationRecord> {
    try {
      // Check for duplicates
      const [emailExists, prnExists] = await Promise.all([
        this.checkEmailExists(data.email),
        this.checkPRNExists(data.prn)
      ]);

      if (emailExists) {
        throw new Error('Email is already registered');
      }

      if (prnExists) {
        throw new Error('PRN is already registered');
      }

      const registrationData = {
        id: uuidv4(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        prn: data.prn,
        branch: data.branch,
        year: data.year,
        registration_type: 'main' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data: result, error } = await supabase
        .from(TABLES.REGISTRATIONS)
        .insert(registrationData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return result;
    } catch (error) {
      console.error('Error creating main registration:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Get registration by email or PRN
  static async getRegistrationByIdentifier(identifier: string): Promise<RegistrationRecord | null> {
    try {
      const { data, error } = await supabase
        .from(TABLES.REGISTRATIONS)
        .select('*')
        .or(`email.eq.${identifier},prn.eq.${identifier}`)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data || null;
    } catch (error) {
      console.error('Error getting registration:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Create or get registration for game registration
  static async createOrGetRegistration(data: GameRegistration): Promise<RegistrationRecord> {
    try {
      // First try to find existing registration by PRN
      let registration = await this.getRegistrationByIdentifier(data.prn);

      if (!registration) {
        // Create a basic registration record for game-only registration
        const registrationData = {
          id: uuidv4(),
          name: data.name,
          email: `${data.prn}@temp.technopedia14.com`, // Temporary email
          phone: data.phone,
          prn: data.prn,
          branch: 'Not Specified',
          year: 'Not Specified',
          registration_type: 'game_only' as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data: result, error } = await supabase
          .from(TABLES.REGISTRATIONS)
          .insert(registrationData)
          .select()
          .single();

        if (error) {
          throw error;
        }

        registration = result;
      }

      return registration;
    } catch (error) {
      console.error('Error creating/getting registration:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Create game registration
  static async createGameRegistration(
    registrationId: string,
    gameId: string,
    gameName: string,
    amount: number
  ): Promise<GameRegistrationRecord> {
    try {
      const gameRegistrationData = {
        id: uuidv4(),
        registration_id: registrationId,
        game_id: gameId,
        game_name: gameName,
        payment_status: 'pending' as const,
        payment_amount: amount,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from(TABLES.GAME_REGISTRATIONS)
        .insert(gameRegistrationData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error creating game registration:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Update game registration payment status
  static async updateGameRegistrationPayment(
    gameRegistrationId: string,
    paymentId: string,
    status: 'paid' | 'failed'
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from(TABLES.GAME_REGISTRATIONS)
        .update({
          payment_status: status,
          payment_id: paymentId
        })
        .eq('id', gameRegistrationId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating game registration payment:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Get user's game registrations
  static async getUserGameRegistrations(registrationId: string): Promise<GameRegistrationRecord[]> {
    try {
      const { data, error } = await supabase
        .from(TABLES.GAME_REGISTRATIONS)
        .select('*')
        .eq('registration_id', registrationId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error getting user game registrations:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Record payment
  static async recordPayment(
    registrationId: string,
    gameRegistrationId: string,
    paymentData: {
      payment_gateway: string;
      payment_id: string;
      amount: number;
      currency: string;
      status: 'success' | 'failed' | 'pending';
      gateway_response: any;
    }
  ): Promise<PaymentRecord> {
    try {
      const paymentRecord = {
        id: uuidv4(),
        registration_id: registrationId,
        game_registration_id: gameRegistrationId,
        ...paymentData,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from(TABLES.PAYMENTS)
        .insert(paymentRecord)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error recording payment:', error);
      throw new Error(handleSupabaseError(error));
    }
  }

  // Get registration statistics
  static async getRegistrationStats(): Promise<{
    totalRegistrations: number;
    gameRegistrations: number;
    totalRevenue: number;
  }> {
    try {
      const [registrations, gameRegistrations, payments] = await Promise.all([
        supabase.from(TABLES.REGISTRATIONS).select('id', { count: 'exact' }),
        supabase.from(TABLES.GAME_REGISTRATIONS).select('id', { count: 'exact' }),
        supabase.from(TABLES.PAYMENTS).select('amount').eq('status', 'success')
      ]);

      const totalRevenue = payments.data?.reduce((sum, payment) => sum + payment.amount, 0) || 0;

      return {
        totalRegistrations: registrations.count || 0,
        gameRegistrations: gameRegistrations.count || 0,
        totalRevenue
      };
    } catch (error) {
      console.error('Error getting registration stats:', error);
      return {
        totalRegistrations: 0,
        gameRegistrations: 0,
        totalRevenue: 0
      };
    }
  }
}

export default RegistrationService;
