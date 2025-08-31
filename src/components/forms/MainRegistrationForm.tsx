import React from 'react';
import { ExternalLink, User, Mail, Phone, BookOpen, Calendar, GraduationCap, FileText } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { GOOGLE_FORMS } from '@/lib/constants';

interface MainRegistrationFormProps {
  onClose: () => void;
}

const MainRegistrationForm: React.FC<MainRegistrationFormProps> = ({
  onClose
}) => {
  const handleRegister = () => {
    window.open(GOOGLE_FORMS.mainRegistration, '_blank');
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-shadow-dark border-classified-gold/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-classified text-classified-gold">
            Mission Registration
          </DialogTitle>
          <DialogDescription className="text-gray-300 font-intel">
            Join Trinity Veil: The Final Confluence. Quick registration via secure form.
          </DialogDescription>
        </DialogHeader>

        {/* Registration Info */}
        <div className="space-y-4">
          <div className="bg-black/20 border border-classified-gold/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-classified text-classified-gold">Main Event Registration</h4>
              <Badge variant="outline" className="bg-classified-gold/10 text-classified-gold border-classified-gold/30">
                Free Registration
              </Badge>
            </div>
            <p className="text-sm text-gray-400 font-intel">
              Complete your registration for TECHNOPEDIA 14 - The Final Confluence
            </p>
          </div>

          <div className="bg-black/10 border border-classified-gold/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-classified-gold text-sm font-intel mb-3">
              <FileText className="h-4 w-4" />
              <span>Required Information</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-300 font-intel">
              <div className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span>Full Name</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>Email Address</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>Phone Number</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-3 w-3" />
                <span>PRN</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-3 w-3" />
                <span>Branch</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>Academic Year</span>
              </div>
            </div>
          </div>

          <div className="bg-intel-green/10 border border-intel-green/20 rounded-lg p-3">
            <p className="text-intel-green text-sm font-intel">
              🎯 You'll be redirected to a secure Google Form for registration.
              All submissions are automatically recorded and verified.
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-classified-gold/50 text-classified-gold hover:bg-classified-gold/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleRegister}
            className="bg-classified-gold hover:bg-warning-amber text-black font-classified"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Register Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MainRegistrationForm;
