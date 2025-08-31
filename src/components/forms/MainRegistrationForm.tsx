import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, User, Mail, Phone, BookOpen, Calendar, GraduationCap } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { mainRegistrationSchema, type MainRegistrationFormData } from '@/lib/validations';
import { BRANCHES, YEARS, type MainRegistration } from '@/types/registration';
import type { RegistrationFormProps } from '@/types/registration';

const MainRegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  onClose,
  isLoading = false
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<MainRegistrationFormData>({
    resolver: zodResolver(mainRegistrationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      prn: '',
      branch: '',
      year: ''
    }
  });

  const watchedBranch = watch('branch');
  const watchedYear = watch('year');

  const handleFormSubmit = async (data: MainRegistrationFormData) => {
    try {
      // Ensure all required fields are present (they should be due to validation)
      const registrationData: MainRegistration = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        prn: data.prn,
        branch: data.branch,
        year: data.year
      };
      await onSubmit(registrationData);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-shadow-dark border-classified-gold/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-classified text-classified-gold">
            Mission Registration
          </DialogTitle>
          <DialogDescription className="text-gray-300 font-intel">
            Join Trinity Veil: The Final Confluence. All fields are required for security clearance.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-classified-gold font-intel flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email address"
              className="bg-black/20 border-classified-gold/30 text-white placeholder:text-gray-400 focus:border-classified-gold"
              disabled={isLoading || isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-alert-red">{errors.email.message}</p>
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

          {/* Branch Field */}
          <div className="space-y-2">
            <Label className="text-classified-gold font-intel flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Branch/Department
            </Label>
            <Select
              value={watchedBranch}
              onValueChange={(value) => setValue('branch', value)}
              disabled={isLoading || isSubmitting}
            >
              <SelectTrigger className="bg-black/20 border-classified-gold/30 text-white focus:border-classified-gold">
                <SelectValue placeholder="Select your branch" />
              </SelectTrigger>
              <SelectContent className="bg-shadow-dark border-classified-gold/30">
                {BRANCHES.map((branch) => (
                  <SelectItem 
                    key={branch} 
                    value={branch}
                    className="text-white hover:bg-classified-gold/20 focus:bg-classified-gold/20"
                  >
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.branch && (
              <p className="text-sm text-alert-red">{errors.branch.message}</p>
            )}
          </div>

          {/* Year Field */}
          <div className="space-y-2">
            <Label className="text-classified-gold font-intel flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Academic Year
            </Label>
            <Select
              value={watchedYear}
              onValueChange={(value) => setValue('year', value)}
              disabled={isLoading || isSubmitting}
            >
              <SelectTrigger className="bg-black/20 border-classified-gold/30 text-white focus:border-classified-gold">
                <SelectValue placeholder="Select your academic year" />
              </SelectTrigger>
              <SelectContent className="bg-shadow-dark border-classified-gold/30">
                {YEARS.map((year) => (
                  <SelectItem 
                    key={year} 
                    value={year}
                    className="text-white hover:bg-classified-gold/20 focus:bg-classified-gold/20"
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.year && (
              <p className="text-sm text-alert-red">{errors.year.message}</p>
            )}
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
              Register Now
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MainRegistrationForm;
