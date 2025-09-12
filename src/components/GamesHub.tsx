import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GameRegistrationForm from "@/components/forms/GameRegistrationForm";
import { 
  Radio, 
  MessageSquare, 
  Wrench, 
  Users,
  Lock,
  AlertTriangle
} from "lucide-react";

interface EventCard {
  title: string;
  subtitle: string;
  role: string;
  briefing: string;
  objective: string;
  task: string;
  outcome: string;
  icon: React.ReactNode;
  difficulty: "CLASSIFIED" | "TOP SECRET" | "EYES ONLY" | "ULTRA";
  eventNumber: number;
  status: "AVAILABLE" | "LOCKED" | "COMPLETED";
  registrationLink?: string;
}

const trinityEvents: EventCard[] = [
  {
    title: "Inquisitive",
    subtitle: "QUIZ COMPETITION",
    role: "Strategic thinkers in the intelligence briefing room",
    briefing: "Knowledge is power in the theater of war. Every question answered correctly brings us closer to victory. Your intellectual prowess is our greatest weapon against the enemy's strategic planning.",
    objective: "Dominate the quiz competition and demonstrate superior knowledge",
    task: "Answer complex questions across multiple categories, solve strategic puzzles, and outsmart opponents in intellectual combat",
    outcome: "Your quiz mastery earns you a place in the elite DEFUSE THE BOMB challenge.",
    icon: <Radio className="h-6 w-6" />,
    difficulty: "CLASSIFIED",
    eventNumber: 1,
    status: "AVAILABLE",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfSwE2j8oDMFvRerorP8OempfRwsn7hxmldY45GSAcK5qdLTQ/viewform?usp=header"
  },
  {
    title: "Squabble",
    subtitle: "DEBATE COMPETITION",
    role: "Master debaters in the war council chamber",
    briefing: "Words are weapons in the art of psychological warfare. You must navigate the treacherous waters of argumentation, where every point scored could mean victory or defeat.",
    objective: "Win strategic debates and outmaneuver opponents",
    task: "Engage in high-stakes debates, construct compelling arguments, and dismantle opponent positions in verbal warfare",
    outcome: "Your debating victory earns you a place in the elite DEFUSE THE BOMB challenge.",
    icon: <MessageSquare className="h-6 w-6" />,
    difficulty: "TOP SECRET",
    eventNumber: 2,
    status: "AVAILABLE",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSftB7euKNMtzJ4DaeyoPwm1xhgcCLdpERbxg1YRaCoSUYzJOA/viewform?usp=header"
  },
  {
    title: "Eureka",
    subtitle: "IDEA PRESENTATION",
    role: "Visionary innovators in the strategic development lab",
    briefing: "Innovation is born in the crucible of necessity. You must think beyond conventional limits, creating breakthrough solutions that will redefine the art of modern warfare.",
    objective: "Present groundbreaking ideas and innovative solutions",
    task: "Develop creative concepts, design innovative strategies, and present compelling pitches that could change the course of battle",
    outcome: "Your innovative presentation earns you a place in the elite DEFUSE THE BOMB challenge.",
    icon: <Wrench className="h-6 w-6" />,
    difficulty: "EYES ONLY",
    eventNumber: 3,
    status: "AVAILABLE",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfuTOondyINY9quRJnDdhmMU3ueHWzIOcYiQnnVq6BaDe2-kw/viewform?usp=header"
  },
  {
    title: "DEFUSE THE BOMB",
    subtitle: "WINNERS-ONLY CHALLENGE",
    role: "Elite engineers in the classified containment facility",
    briefing: "The route you choose and the signed route agreement are recorded and passed on. You are a military engineer holding an unstable enemy compound. You are tasked with securing and containing the 'cargo' from the Iron Route. The briefing states that mishandling it will result in its destruction and that you must secure it to Command's exact specifications without mistakes.",
    objective: "Build a containment casing that matches strict classified technical specs",
    task: "Use provided materials, sketches, or models to build a containment casing. The designs secretly embed cipher patterns from the Signal Room and coordinates from the Iron Route. As you work, a technician quietly remarks, 'Do you even know what you've made?'",
    outcome: "Your successful construction reveals the horrifying truth - you've built a weapon that can end the war in a single strike, but at the cost of annihilating an entire city.",
    icon: <Users className="h-6 w-6" />,
    difficulty: "ULTRA",
    eventNumber: 4,
    status: "LOCKED",
    registrationLink: undefined
  },
  {
    title: "Warlash 2.0",
    subtitle: "ULTIMATE SHOWDOWN",
    role: "Elite warriors in the final arena",
    briefing: "This is where legends are forged and destinies decided. Every battle, every victory, every defeat shapes the future of warfare itself.",
    objective: "Dominate the ultimate showdown and prove your supremacy",
    task: "Engage in the final arena battle, outmaneuver elite opponents, and claim victory in the ultimate test of skill and strategy",
    outcome: "Your victory in the ultimate showdown cements your place among the greatest warriors in Operation Trinity Veil.",
    icon: <Users className="h-6 w-6" />,
    difficulty: "ULTRA",
    eventNumber: 5,
    status: "AVAILABLE",
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

const GamesHub = () => {
  const [selectedGame, setSelectedGame] = useState<{ id: string; name: string } | null>(null);

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

  const handleCloseRegistration = () => {
    setSelectedGame(null);
  };
  return (
    <section id="events" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-shadow-dark to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-classified text-classified-gold mb-2 sm:mb-3">
            WORZONE 00:00 HOUR
          </h2>
          <p className="text-sm sm:text-base font-intel text-muted-foreground max-w-2xl mx-auto px-2">
            Dates: 18, 19, 20 - Five intense gaming events await. Test your skills in quiz competition, debate, idea presentation, and the elite DEFUSE THE BOMB challenge. Winners advance to Warlash 2.0 and the Grand Finale.
          </p>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-classified-gold mx-auto mt-2 sm:mt-3" />
        </div>

        {/* Events Grid - Optimized for Mobile */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* First Row - 3 Games */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {trinityEvents.slice(0, 3).map((event, index) => (
              <Card
                key={index}
                className="group hover:shadow-golden transition-all duration-300 hover:scale-[1.02] bg-card/70 backdrop-blur-none sm:backdrop-blur-sm border-border/50 overflow-hidden h-full will-change-transform touch-manipulation"
              >
                <CardHeader className="relative pb-3 sm:pb-4">
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className={`p-2 sm:p-2.5 rounded-lg bg-classified-gold/20 text-classified-gold group-hover:scale-110 transition-transform duration-300`}>
                      {event.icon}
                    </div>
                    <Badge variant="secondary" className={`font-mono-classified text-xs px-2 py-1 ${getDifficultyColor(event.difficulty)}`}>
                      {event.difficulty}
                    </Badge>
                  </div>

                  <div className="mb-2 sm:mb-3">
                    <div className="text-xs font-mono-classified text-warning-amber mb-1 sm:mb-2">
                      EVENT {event.eventNumber}
                    </div>
                    <CardTitle className="font-classified text-base sm:text-lg text-foreground group-hover:text-classified-gold transition-colors duration-300 leading-tight">
                      {event.title}
                    </CardTitle>
                    <div className="text-xs sm:text-sm font-intel text-warning-amber/80 italic mt-1">
                      {event.subtitle}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4 pt-0">
                  {/* Role */}
                  <div className="text-xs font-mono-classified text-muted-foreground leading-relaxed">
                    <span className="text-classified-gold font-semibold">ROLE:</span> {event.role}
                  </div>

                  {/* Briefing - Truncated on mobile */}
                  <div className="text-xs sm:text-sm font-intel text-foreground/90 leading-relaxed line-clamp-3">
                    "{event.briefing}"
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between pt-2">
                    <span className={`text-xs font-mono-classified font-semibold ${
                      event.status === "AVAILABLE" ? "text-classified-gold" :
                      event.status === "LOCKED" ? "text-alert-red" : "text-warning-amber"
                    }`}>
                      {event.status}
                    </span>
                  </div>

                  {/* Action Button - Optimized for touch */}
                  <Button
                    className="w-full text-xs sm:text-sm group-hover:bg-classified-gold group-hover:text-background transition-all duration-300 cursor-pointer touch-manipulation"
                    variant="outline"
                    size="sm"
                    disabled={event.status === "LOCKED"}
                    onClick={() => {
                      event.registrationLink && handleGameRegistration(event.registrationLink, event.title);
                    }}
                  >
                    {event.status === "LOCKED" ? (
                      <>
                        <Lock className="h-3 w-3 mr-1" />
                        WINNERS ONLY
                      </>
                    ) : event.status === "AVAILABLE" ? (
                      <>
                        📝 REGISTER NOW
                      </>
                    ) : (
                      "COMPLETED"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Second Row - 2 Games */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto w-full">
            {trinityEvents.slice(3, 5).map((event, index) => (
              <Card
                key={index + 3}
                className="group hover:shadow-golden transition-all duration-300 hover:scale-[1.02] bg-card/70 backdrop-blur-none sm:backdrop-blur-sm border-border/50 overflow-hidden h-full will-change-transform touch-manipulation"
              >
                <CardHeader className="relative pb-3 sm:pb-4">
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className={`p-2 sm:p-2.5 rounded-lg bg-classified-gold/20 text-classified-gold group-hover:scale-110 transition-transform duration-300`}>
                      {event.icon}
                    </div>
                    <Badge variant="secondary" className={`font-mono-classified text-xs px-2 py-1 ${getDifficultyColor(event.difficulty)}`}>
                      {event.difficulty}
                    </Badge>
                  </div>

                  <div className="mb-2 sm:mb-3">
                    <div className="text-xs font-mono-classified text-warning-amber mb-1 sm:mb-2">
                      EVENT {event.eventNumber}
                    </div>
                    <CardTitle className="font-classified text-base sm:text-lg text-foreground group-hover:text-classified-gold transition-colors duration-300 leading-tight">
                      {event.title}
                    </CardTitle>
                    <div className="text-xs sm:text-sm font-intel text-warning-amber/80 italic mt-1">
                      {event.subtitle}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4 pt-0">
                  {/* Role */}
                  <div className="text-xs font-mono-classified text-muted-foreground leading-relaxed">
                    <span className="text-classified-gold font-semibold">ROLE:</span> {event.role}
                  </div>

                  {/* Briefing - Truncated on mobile */}
                  <div className="text-xs sm:text-sm font-intel text-foreground/90 leading-relaxed line-clamp-3">
                    "{event.briefing}"
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between pt-2">
                    <span className={`text-xs font-mono-classified font-semibold ${
                      event.status === "AVAILABLE" ? "text-classified-gold" :
                      event.status === "LOCKED" ? "text-alert-red" : "text-warning-amber"
                    }`}>
                      {event.status}
                    </span>
                  </div>

                  {/* Action Button - Optimized for touch */}
                  <Button
                    className="w-full text-xs sm:text-sm group-hover:bg-classified-gold group-hover:text-background transition-all duration-300 cursor-pointer touch-manipulation"
                    variant="outline"
                    size="sm"
                    disabled={event.status === "LOCKED"}
                    onClick={() => {
                      event.registrationLink && handleGameRegistration(event.registrationLink, event.title);
                    }}
                  >
                    {event.status === "LOCKED" ? (
                      <>
                        <Lock className="h-3 w-3 mr-1" />
                        WINNERS ONLY
                      </>
                    ) : event.status === "AVAILABLE" ? (
                      <>
                        📝 REGISTER NOW
                      </>
                    ) : (
                      "COMPLETED"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="text-center mt-6 sm:mt-8 md:mt-12">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* DEFUSE THE BOMB Notice */}
            <div className="bg-alert-red/10 border border-alert-red/30 rounded-lg p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-alert-red" />
                <span className="font-classified text-alert-red text-sm">WINNERS-ONLY CHALLENGE</span>
              </div>
              <p className="text-xs sm:text-sm font-intel text-muted-foreground leading-relaxed px-2">
                <strong>DEFUSE THE BOMB</strong> is a private, winners-only challenge. Only winners from Inquisitive, Squabble, and Eureka will be invited to participate. It is not open for general registration.
              </p>
            </div>

            {/* Grand Finale */}
            <div className="bg-warning-amber/10 border border-warning-amber/30 rounded-lg p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-warning-amber" />
                <span className="font-classified text-warning-amber text-sm">GRAND FINALE</span>
              </div>
              <p className="text-xs sm:text-sm font-intel text-muted-foreground leading-relaxed px-2">
                The events converge in an underground war council. All pieces are revealed: cipher fragments were targeting coordinates, route choices ensured payload delivery, and your containment casing was the warhead housing. You face a final decision: Strike immediately, Delay, Sabotage, or Redirect. The council votes, and your names are etched into Operation Trinity Veil's historical record forever.
              </p>
            </div>

            {/* Battle Ready Warning */}
            <div className="bg-classified-gold/10 border border-classified-gold/30 rounded-lg p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-classified-gold" />
                <span className="font-classified text-classified-gold text-sm">BATTLE READY WARNING</span>
              </div>
              <p className="text-xs sm:text-sm font-intel text-muted-foreground leading-relaxed px-2">
                By participating in Worzone 00:00 Hour events, you acknowledge that competition is fierce and only the strongest will prevail. Register for your chosen event and prepare for battle.
              </p>
            </div>
          </div>
        </div>

        {/* Game Registration Modal */}
        {selectedGame && (
          <GameRegistrationForm
            gameId={selectedGame.id}
            gameName={selectedGame.name}
            onClose={handleCloseRegistration}
          />
        )}
      </div>
    </section>
  );
};

export default GamesHub;