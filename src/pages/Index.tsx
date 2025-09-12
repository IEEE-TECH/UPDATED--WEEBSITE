import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import GamesHub from "@/components/GamesHub";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import MapSection from "@/components/MapSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TimelineSection />
      <GamesHub />
      <TeamSection />
      <FAQSection />
      <MapSection />

      {/* Footer */}
      <footer className="bg-gradient-to-b from-black to-shadow-dark py-8 md:py-12 border-t border-classified-gold/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Copyright Notice */}
            <div className="mb-6">
              <p className="font-classified text-classified-gold text-sm md:text-base mb-2">
                © {new Date().getFullYear()} TECHOPEDIA 14 - THE FRONTLINE
              </p>
              <p className="font-intel text-muted-foreground text-xs md:text-sm">
                Created by Technical Team of IEEE
              </p>
            </div>

            {/* Additional Elements */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
              {/* Operation Status */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-classified-gold rounded-full animate-pulse"></div>
                <span className="font-mono-classified text-xs text-muted-foreground">
                  OPERATION STATUS: ACTIVE
                </span>
              </div>

              {/* Security Clearance */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning-amber rounded-full"></div>
                <span className="font-mono-classified text-xs text-muted-foreground">
                  SECURITY CLEARANCE: CLASSIFIED
                </span>
              </div>

              {/* Mission Code */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-alert-red rounded-full"></div>
                <span className="font-mono-classified text-xs text-muted-foreground">
                  MISSION CODE: WORZONE 00:00 HOUR
                </span>
              </div>
            </div>

            {/* Decorative Line */}
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-classified-gold to-transparent mx-auto mb-4"></div>

            {/* Final Message */}
            <p className="font-intel text-muted-foreground text-xs italic">
              "In the shadows of classified operations, truth emerges from the darkness"
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
