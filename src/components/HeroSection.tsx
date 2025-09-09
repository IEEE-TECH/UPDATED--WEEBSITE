import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Menu, X, Radio, MessageSquare, Wrench, Users, AlertTriangle, FileText } from "lucide-react";
import heroBackground from "@/assets/hero-battlefield.jpg";

const Navbar = ({ onOpenRegistration }: { onOpenRegistration?: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleBrochureClick = () => {
    setShowBrochure(true);
  };

  const handleBrochureClose = () => {
    setShowBrochure(false);
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
                  onClick={() => {
                    closeMobileMenu();
                    handleBrochureClick();
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  ACCESS CLEARANCE
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  return (
    <>
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
                    onClick={() => {
                      closeMobileMenu();
                      handleBrochureClick();
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    ACCESS CLEARANCE
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Brochure Modal - Mobile Optimized */}
      {showBrochure && (
        <Dialog open={showBrochure} onOpenChange={handleBrochureClose}>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-shadow-dark to-black border-border/50">
            <DialogHeader className="sticky top-0 bg-gradient-to-b from-shadow-dark to-black pb-4">
              <DialogTitle className="text-center font-classified text-classified-gold text-xl sm:text-2xl flex items-center justify-center gap-2">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-alert-red" />
                <span className="text-lg sm:text-xl">CLASSIFIED BROCHURE</span>
              </DialogTitle>
              <p className="text-center font-intel text-muted-foreground text-sm">
                War Zone: Zero Hour - Operation Briefing
              </p>
            </DialogHeader>

            <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6 px-2 sm:px-0">
              {/* Warning Section */}
              <div className="bg-alert-red/10 border border-alert-red/30 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-alert-red mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-classified text-alert-red text-sm mb-2">
                      ⚠ SECURITY CLEARANCE REQUIRED
                    </h3>
                    <p className="text-xs font-mono-classified text-muted-foreground leading-relaxed">
                      This document contains classified information about War Zone: Zero Hour operations.
                      Unauthorized access is prohibited and may result in immediate security protocol activation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Operation Details */}
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-classified text-classified-gold text-base sm:text-lg mb-3">
                    OPERATION OVERVIEW
                  </h4>
                  <div className="space-y-2 text-sm font-intel text-foreground/90">
                    <p><span className="text-classified-gold font-semibold">Code Name:</span> War Zone: Zero Hour</p>
                    <p><span className="text-classified-gold font-semibold">Classification:</span> TOP SECRET</p>
                    <p><span className="text-classified-gold font-semibold">Duration:</span> 48 Hours of Intense Combat</p>
                    <p><span className="text-classified-gold font-semibold">Participants:</span> Elite Gaming Forces</p>
                  </div>
                </div>

                <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-classified text-classified-gold text-base sm:text-lg mb-3">
                    COMBAT EVENTS
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    <div className="flex items-center gap-3 p-2 bg-classified-gold/10 rounded">
                      <Radio className="h-4 w-4 text-classified-gold flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-intel">Inquisitive - Cryptography Challenge</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-warning-amber/10 rounded">
                      <MessageSquare className="h-4 w-4 text-warning-amber flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-intel">Squabble - Strategic Debate</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-alert-red/10 rounded">
                      <Wrench className="h-4 w-4 text-alert-red flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-intel">Eureka - Innovation Battleground</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-document-cream/10 rounded">
                      <Users className="h-4 w-4 text-document-cream flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-intel">Warlash 2.0 - Ultimate Showdown</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Warning */}
              <div className="bg-warning-amber/10 border border-warning-amber/30 rounded-lg p-3 sm:p-4">
                <p className="text-xs font-mono-classified text-warning-amber leading-relaxed text-center">
                  "The battlefield is no place for the unprepared. Every decision carries the weight of victory or defeat.
                  Choose your path wisely, soldier."
                </p>
              </div>

              {/* Action Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 sticky bottom-0 bg-gradient-to-b from-shadow-dark to-black pb-2">
                <Button
                  className="flex-1 bg-classified-gold hover:bg-primary text-background font-classified text-sm sm:text-base touch-manipulation"
                  onClick={() => {
                    handleBrochureClose();
                    onOpenRegistration?.();
                  }}
                >
                  PROCEED TO REGISTRATION
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-border/50 hover:border-classified-gold/50 font-classified text-sm sm:text-base touch-manipulation"
                  onClick={handleBrochureClose}
                >
                  ABORT MISSION
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

const HeroSection = () => {
  const [showGameSelection, setShowGameSelection] = useState(false);

  const handleRegistrationClick = () => {
    setShowGameSelection(true);
  };

  const handleGameSelectionClose = () => {
    setShowGameSelection(false);
  };

  const handleGameRegistration = (registrationLink: string, gameName: string) => {
    if (registrationLink) {
      console.log('Opening registration link:', registrationLink);
      try {
        const newWindow = window.open(registrationLink, '_blank', 'noopener,noreferrer');
        if (!newWindow) {
          // Fallback for popup blockers
          window.location.href = registrationLink;
        }
      } catch (error) {
        console.error('Error opening link:', error);
        // Fallback
        window.location.href = registrationLink;
      }
    } else {
      console.error('No registration link provided for:', gameName);
    }
  };

  const games = [
    {
      title: "Inquisitive",
      subtitle: "CRYPTOGRAPHY CHALLENGE",
      icon: <Radio className="h-6 w-6" />,
      difficulty: "CLASSIFIED",
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfSwE2j8oDMFvRerorP8OempfRwsn7hxmldY45GSAcK5qdLTQ/viewform?usp=header"
    },
    {
      title: "Squabble",
      subtitle: "STRATEGIC DEBATE",
      icon: <MessageSquare className="h-6 w-6" />,
      difficulty: "TOP SECRET",
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSftB7euKNMtzJ4DaeyoPwm1xhgcCLdpERbxg1YRaCoSUYzJOA/viewform?usp=header"
    },
    {
      title: "Eureka",
      subtitle: "INNOVATION BATTLEGROUND",
      icon: <Wrench className="h-6 w-6" />,
      difficulty: "EYES ONLY",
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfuTOondyINY9quRJnDdhmMU3ueHWzIOcYiQnnVq6BaDe2-kw/viewform?usp=header"
    },
    {
      title: "Warlash 2.0",
      subtitle: "ULTIMATE SHOWDOWN",
      icon: <Users className="h-6 w-6" />,
      difficulty: "ULTRA",
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLScVD_XK0HVYD3ZzNGvtfqtObO4FzlseXAbLIqQgTmjL6QJDew/viewform?usp=header"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "CLASSIFIED": return "text-classified-gold bg-classified-gold/20";
      case "TOP SECRET": return "text-warning-amber bg-warning-amber/20";
      case "EYES ONLY": return "text-alert-red bg-alert-red/20";
      case "ULTRA": return "text-document-cream bg-document-cream/20";
      default: return "text-muted-foreground bg-muted/20";
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Navbar */}
      <Navbar onOpenRegistration={handleRegistrationClick} />

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

      {/* Content - Mobile Optimized */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-16 sm:pt-20">
        <div className="animate-fade-up">
          {/* Classification Header */}
          <div className="mb-4 sm:mb-6">
            <div className="inline-block bg-alert-red/20 border border-alert-red/50 px-2 sm:px-3 lg:px-4 py-2 rounded-lg mb-4">
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
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-intel text-document-cream mb-3 sm:mb-4 opacity-90 px-2">
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
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-classified-gold mx-auto mb-4 sm:mb-6" />

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

      {/* Game Selection Modal - Mobile Optimized */}
      {showGameSelection && (
        <Dialog open={showGameSelection} onOpenChange={handleGameSelectionClose}>
          <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-shadow-dark to-black border-border/50">
            <DialogHeader className="sticky top-0 bg-gradient-to-b from-shadow-dark to-black pb-4">
              <DialogTitle className="text-center font-classified text-classified-gold text-xl sm:text-2xl">
                SELECT YOUR BATTLEFIELD
              </DialogTitle>
              <p className="text-center font-intel text-muted-foreground text-sm">
                Choose your event and register for War Zone: Zero Hour
              </p>
            </DialogHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6 px-2 sm:px-0">
              {games.map((game, index) => (
                <div
                  key={index}
                  className="group bg-card/70 backdrop-blur-sm border border-border/50 rounded-lg p-3 sm:p-4 hover:border-classified-gold/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer touch-manipulation will-change-transform"
                  onClick={() => handleGameRegistration(game.registrationLink, game.title)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-classified-gold/20 text-classified-gold group-hover:scale-110 transition-transform duration-300">
                        {game.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-classified text-base sm:text-lg text-foreground group-hover:text-classified-gold transition-colors duration-300 leading-tight">
                          {game.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-intel text-warning-amber/80 mt-1">
                          {game.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-mono-classified whitespace-nowrap ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-classified-gold hover:bg-primary text-background font-classified transition-all duration-300 touch-manipulation"
                    size="sm"
                  >
                    REGISTER NOW
                  </Button>
                </div>
              ))}
            </div>

            <div className="text-center mt-4 sm:mt-6">
              <p className="text-xs font-mono-classified text-muted-foreground">
                Security clearance required • Moral implications acknowledged
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default HeroSection;