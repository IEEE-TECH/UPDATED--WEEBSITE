import { useState } from "react";
import { Button } from "@/components/ui/button";
import MainRegistrationForm from "@/components/forms/MainRegistrationForm";
import heroBackground from "@/assets/hero-battlefield.jpg";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="font-classified text-xl text-classified-gold">
            TECHNOPEDIA 14
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#timeline" className="font-classified text-foreground hover:text-classified-gold transition-colors">
              TIMELINE
            </a>
            <a href="#events" className="font-classified text-foreground hover:text-classified-gold transition-colors">
              EVENTS
            </a>
            <a href="#team" className="font-classified text-foreground hover:text-classified-gold transition-colors">
              TEAM
            </a>
            <a href="#sponsors" className="font-classified text-foreground hover:text-classified-gold transition-colors">
              SPONSORS
            </a>
            <a href="#briefing" className="font-classified text-foreground hover:text-classified-gold transition-colors">
              BRIEFING
            </a>
          </div>
          <Button variant="outline" size="sm" className="font-classified border-classified-gold text-classified-gold hover:bg-classified-gold hover:text-background">
            ACCESS CLEARANCE
          </Button>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleRegistrationClick = () => {
    setShowRegistrationForm(true);
  };

  const handleRegistrationClose = () => {
    setShowRegistrationForm(false);
  };
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Navbar */}
      <Navbar />
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-classified" />
      
      {/* Classified Document Effects */}
      <div className="absolute inset-0 texture-redacted opacity-20" />
      
      {/* Subtle Shadow Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 opacity-10 bg-shadow-dark rounded-full blur-xl" />
        <div className="absolute bottom-40 right-20 w-24 h-24 opacity-15 bg-intel-green rounded-full blur-lg" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 opacity-10 bg-shadow-dark rounded-full blur-md" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20">
        <div className="animate-fade-up">
          {/* Classification Header */}
          <div className="mb-6">
            <div className="inline-block bg-alert-red/20 border border-alert-red/50 px-4 py-2 rounded-lg mb-4">
              <span className="font-mono-classified text-alert-red text-sm font-bold">
                ⚠ CLASSIFIED - OPERATION TRINITY VEIL ⚠
              </span>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-classified text-classified-gold mb-4">
            TECHNOPEDIA 14
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl font-intel text-document-cream mb-4 opacity-90">
            Operation Trinity Veil: The Final Confluence
          </p>
          
          {/* Moral Warning */}
          <div className="max-w-3xl mx-auto mb-6">
            <p className="text-sm md:text-base font-mono-classified text-warning-amber italic leading-relaxed">
              "The war is an equation with too many unknowns — and every variable is human lives."
            </p>
            <p className="text-xs md:text-sm font-mono-classified text-muted-foreground mt-2">
              You will be moved through classified evaluations. You will not be told why.
            </p>
          </div>
          
          {/* Decorative Line */}
          <div className="w-32 h-1 bg-classified-gold mx-auto mb-6" />
          
          {/* Call to Action */}
          <div className="space-y-3">
            <Button 
              variant="hero" 
              size="lg"
              onClick={handleRegistrationClick}
              className="bg-classified-gold hover:bg-primary text-background font-classified text-base px-6 py-3 shadow-classified transition-all hover:scale-105"
            >
              REGISTER NOW
            </Button>
            
            <p className="text-xs md:text-sm font-mono-classified text-muted-foreground opacity-75">
              Security clearance required • Moral implications acknowledged
            </p>
          </div>
        </div>
        
        {/* Classification Stamps */}
        <div className="absolute -top-8 -right-8 w-12 h-12 border-2 border-alert-red/30 rounded-full flex items-center justify-center transform rotate-12">
          <span className="text-alert-red text-xs font-classified">TOP<br/>SECRET</span>
        </div>
        <div className="absolute top-16 -left-6 w-10 h-10 border border-warning-amber/30 rounded flex items-center justify-center transform -rotate-12">
          <span className="text-warning-amber text-xs font-classified">EYES<br/>ONLY</span>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <MainRegistrationForm
          onClose={handleRegistrationClose}
        />
      )}
    </section>
  );
};

export default HeroSection;