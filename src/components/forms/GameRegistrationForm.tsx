import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, User, Phone, BookOpen, Gamepad2, CreditCard } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

import { gameRegistrationSchema, type GameRegistrationFormData } from '@/lib/validations';
import { type GameRegistration, type GameRegistrationFormProps } from '@/types/registration';
import { formatAmount } from '@/lib/payment';
import { isEarlyBird, calculatePrice } from '@/lib/constants';

const GameRegistrationForm: React.FC<GameRegistrationFormProps> = ({
  gameId,
  gameName,
  onSubmit,
  onClose,
  isLoading = false
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<GameRegistrationFormData>({
    resolver: zodResolver(gameRegistrationSchema),
    defaultValues: {
      name: '',
      phone: '',
      prn: '',
      gameId: gameId
    }
  });

  const price = calculatePrice(1); // Single game price
  const showEarlyBird = isEarlyBird();

  const handleFormSubmit = async (data: GameRegistrationFormData) => {
    try {
      const gameRegistrationData: GameRegistration = {
        name: data.name,
        phone: data.phone,
        prn: data.prn,
        gameId: data.gameId
      };
      await onSubmit(gameRegistrationData);
      reset();
    } catch (error) {
      console.error('Game registration form submission error:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] bg-shadow-dark border-classified-gold/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-classified text-classified-gold flex items-center gap-2">
            <Gamepad2 className="h-6 w-6" />
            Mission Registration
          </DialogTitle>
          <DialogDescription className="text-gray-300 font-intel">
            Join <span className="text-classified-gold font-semibold">{gameName}</span> operation. 
            Quick registration for immediate deployment.
          </DialogDescription>
        </DialogHeader>

        {/* Game Info & Pricing */}
        <div className="bg-black/20 border border-classified-gold/20 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-classified text-classified-gold">{gameName}</h4>
              <p className="text-sm text-gray-400 font-intel">Single mission registration</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-classified-gold/10 text-classified-gold border-classified-gold/30">
                  {formatAmount(price)}
                </Badge>
                {showEarlyBird && (
                  <Badge variant="outline" className="bg-intel-green/10 text-intel-green border-intel-green/30">
                    Early Bird
                  </Badge>
                )}
              </div>
              {showEarlyBird && (
                <p className="text-xs text-intel-green font-intel mt-1">
                  ₹100 off applied!
                </p>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-classified-gold font-intel flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter your full name"
              className="bg-black/20 border-classified-gold/30 text-white placeholder:text-gray-400 focus:border-classified-gold"
              disabled={isLoading || isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-alert-red">{errors.name.message}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-classified-gold font-intel flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              className="bg-black/20 border-classified-gold/30 text-white placeholder:text-gray-400 focus:border-classified-gold"
              disabled={isLoading || isSubmitting}
            />
            {errors.phone && (
              <p className="text-sm text-alert-red">{errors.phone.message}</p>
            )}
          </div>

          {/* PRN Field */}
          <div className="space-y-2">
            <Label htmlFor="prn" className="text-classified-gold font-intel flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              PRN (Personal Registration Number)
            </Label>
            <Input
              id="prn"
              {...register('prn')}
              placeholder="Enter your PRN"
              className="bg-black/20 border-classified-gold/30 text-white placeholder:text-gray-400 focus:border-classified-gold"
              disabled={isLoading || isSubmitting}
            />
            {errors.prn && (
              <p className="text-sm text-alert-red">{errors.prn.message}</p>
            )}
          </div>

          {/* Payment Info */}
          <div className="bg-black/10 border border-classified-gold/10 rounded-lg p-3">
            <div className="flex items-center gap-2 text-classified-gold text-sm font-intel">
              <CreditCard className="h-4 w-4" />
              <span>Secure payment processing via Razorpay</span>
            </div>
            <p className="text-xs text-gray-400 mt-1 font-intel">
              You will be redirected to payment gateway after registration
            </p>
          </div>

          <DialogFooter className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading || isSubmitting}
              className="border-classified-gold/50 text-classified-gold hover:bg-classified-gold/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="bg-classified-gold hover:bg-warning-amber text-black font-classified"
            >
              {(isLoading || isSubmitting) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Proceed to Payment {formatAmount(price)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GameRegistrationForm;
