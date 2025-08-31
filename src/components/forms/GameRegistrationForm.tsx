import React from 'react';
import { ExternalLink, User, Phone, BookOpen, Gamepad2, FileText } from 'lucide-react';

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

interface GameRegistrationFormProps {
  gameId: string;
  gameName: string;
  onClose: () => void;
}

const GameRegistrationForm: React.FC<GameRegistrationFormProps> = ({
  gameId,
  gameName,
  onClose
}) => {
  const getGameFormUrl = (gameId: string): string => {
    // Map gameId to Google Form URLs
    const gameFormMap: Record<string, string> = {
      'game1': GOOGLE_FORMS.gameRegistrations.game1,
      'game2': GOOGLE_FORMS.gameRegistrations.game2,
      'game3': GOOGLE_FORMS.gameRegistrations.game3,
      'game4': GOOGLE_FORMS.gameRegistrations.game4,
    };
    
    return gameFormMap[gameId] || GOOGLE_FORMS.gameRegistrations.game1;
  };

  const handleRegister = () => {
    const formUrl = getGameFormUrl(gameId);
    window.open(formUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-shadow-dark border-classified-gold/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-classified text-classified-gold flex items-center gap-2">
            <Gamepad2 className="h-6 w-6" />
            Mission Registration
          </DialogTitle>
          <DialogDescription className="text-gray-300 font-intel">
            Join <span className="text-classified-gold font-semibold">{gameName}</span> operation. 
            Quick registration via secure form.
          </DialogDescription>
        </DialogHeader>

        {/* Game Info */}
        <div className="bg-black/20 border border-classified-gold/20 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-classified text-classified-gold">{gameName}</h4>
              <p className="text-sm text-gray-400 font-intel">Single mission registration</p>
            </div>
            <Badge variant="outline" className="bg-classified-gold/10 text-classified-gold border-classified-gold/30">
              Free Registration
            </Badge>
          </div>
        </div>

        {/* Registration Info */}
        <div className="space-y-4">
          <div className="bg-black/10 border border-classified-gold/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-classified-gold text-sm font-intel mb-2">
              <FileText className="h-4 w-4" />
              <span>Registration Process</span>
            </div>
            <div className="space-y-2 text-sm text-gray-300 font-intel">
              <div className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span>Full Name</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>Phone Number</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-3 w-3" />
                <span>PRN (Personal Registration Number)</span>
              </div>
            </div>
          </div>

          <div className="bg-intel-green/10 border border-intel-green/20 rounded-lg p-3">
            <p className="text-intel-green text-sm font-intel">
              🎯 You'll be redirected to a secure Google Form for quick registration.
              All submissions are automatically recorded.
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

export default GameRegistrationForm;
