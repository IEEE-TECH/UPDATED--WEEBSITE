import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import GamesHub from "@/components/GamesHub";
import TeamSection from "@/components/TeamSection";
import SponsorsSection from "@/components/SponsorsSection";
import FAQSection from "@/components/FAQSection";
import MapSection from "@/components/MapSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TimelineSection />
      <GamesHub />
      <TeamSection />
      <SponsorsSection />
      <FAQSection />
      <MapSection />
    </main>
  );
};

export default Index;
