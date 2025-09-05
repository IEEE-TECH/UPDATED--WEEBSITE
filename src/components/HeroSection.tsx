import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import MainRegistrationForm from "@/components/forms/MainRegistrationForm";
import heroBackground from "@/assets/hero-battlefield.jpg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-classified text-lg md:text-xl text-classified-gold">
            TECHOPEDIA 14
          </div>

          {/* Desktop Navigation */}
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
            <a href="#location" className="font-classified text-foreground hover:text-classified-gold transition-colors">
              LOCATION
            </a>
          </div>

          {/* Desktop Button */}
          <Button variant="outline" size="sm" className="hidden md:flex font-classified border-classified-gold text-classified-gold hover:bg-classified-gold hover:text-background">
            ACCESS CLEARANCE
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-classified-gold" />
            ) : (
              <Menu className="h-6 w-6 text-classified-gold" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/30">
            <div className="flex flex-col space-y-4 pt-4">
              <a
                href="#timeline"
                onClick={closeMobileMenu}
                className="font-classified text-foreground hover:text-classified-gold transition-colors py-2 px-2 rounded hover:bg-muted/50"
              >
                TIMELINE
              </a>
              <a
                href="#events"
                onClick={closeMobileMenu}
                className="font-classified text-foreground hover:text-classified-gold transition-colors py-2 px-2 rounded hover:bg-muted/50"
              >
                EVENTS
              </a>
              <a
                href="#team"
                onClick={closeMobileMenu}
                className="font-classified text-foreground hover:text-classified-gold transition-colors py-2 px-2 rounded hover:bg-muted/50"
              >
                TEAM
              </a>
              <a
                href="#sponsors"
                onClick={closeMobileMenu}
                className="font-classified text-foreground hover:text-classified-gold transition-colors py-2 px-2 rounded hover:bg-muted/50"
              >
                SPONSORS
              </a>
              <a
                href="#briefing"
                onClick={closeMobileMenu}
                className="font-classified text-foreground hover:text-classified-gold transition-colors py-2 px-2 rounded hover:bg-muted/50"
              >
                BRIEFING
              </a>
              <a
                href="#location"
                onClick={closeMobileMenu}
                className="font-classified text-foreground hover:text-classified-gold transition-colors py-2 px-2 rounded hover:bg-muted/50"
              >
                LOCATION
              </a>
              <div className="pt-2 border-t border-border/30">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full font-classified border-classified-gold text-classified-gold hover:bg-classified-gold hover:text-background"
                  onClick={closeMobileMenu}
                >
                  ACCESS CLEARANCE
                </Button>
              </div>
            </div>
          </div>
        )}
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-16 sm:pt-20">
        <div className="animate-fade-up">
          {/* Classification Header */}
          <div className="mb-4 sm:mb-6">
            <div className="inline-block bg-alert-red/20 border border-alert-red/50 px-3 sm:px-4 py-2 rounded-lg mb-4">
              <span className="font-mono-classified text-alert-red text-xs sm:text-sm font-bold">
                ⚠ CLASSIFIED - WAR ZONE: ZERO HOUR ⚠
              </span>
            </div>
          </div>

          {/* Main Title - Mobile Responsive */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-classified text-classified-gold mb-2 sm:mb-4 leading-tight">
            TECHOPEDIA 14
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-intel text-document-cream mb-3 sm:mb-4 opacity-90 px-2">
            War Zone: Zero Hour - The Final Confluence
          </p>

          {/* Moral Warning */}
          <div className="max-w-3xl mx-auto mb-4 sm:mb-6 px-2">
            <p className="text-xs sm:text-sm md:text-base font-mono-classified text-warning-amber italic leading-relaxed">
              "The war is an equation with too many unknowns — and every variable is human lives."
            </p>
            <p className="text-xs sm:text-sm font-mono-classified text-muted-foreground mt-2">
              You will be moved through classified evaluations. You will not be told why.
            </p>
          </div>

          {/* Decorative Line */}
          <div className="w-24 sm:w-32 h-1 bg-classified-gold mx-auto mb-4 sm:mb-6" />

          {/* Call to Action */}
          <div className="space-y-3">
            <Button
              variant="hero"
              size="lg"
              onClick={handleRegistrationClick}
              className="bg-classified-gold hover:bg-primary text-background font-classified text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 shadow-classified transition-all hover:scale-105"
            >
              REGISTER NOW
            </Button>

            <p className="text-xs sm:text-sm font-mono-classified text-muted-foreground opacity-75 px-2">
              Security clearance required • Moral implications acknowledged
            </p>
          </div>
        </div>

        {/* Classification Stamps - Hidden on very small screens */}
        <div className="absolute -top-8 -right-8 w-10 sm:w-12 h-10 sm:h-12 border-2 border-alert-red/30 rounded-full flex items-center justify-center transform rotate-12 hidden sm:flex">
          <span className="text-alert-red text-xs font-classified">TOP<br/>SECRET</span>
        </div>
        <div className="absolute top-16 -left-6 w-8 sm:w-10 h-8 sm:h-10 border border-warning-amber/30 rounded flex items-center justify-center transform -rotate-12 hidden sm:flex">
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