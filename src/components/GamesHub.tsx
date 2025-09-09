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
    subtitle: "CRYPTOGRAPHY CHALLENGE",
    role: "Code-breaking specialists in a secure operations center",
    briefing: "You are the digital frontline. Every encrypted message you crack brings us closer to victory. Your analytical mind is our greatest weapon against the enemy's communications network.",
    objective: "Decrypt classified enemy transmissions and solve complex puzzles",
    task: "Analyze encrypted messages, solve logic puzzles, and decode wartime ciphers under time pressure",
    outcome: "Successful decryption reveals critical intelligence that could turn the tide of battle.",
    icon: <Radio className="h-6 w-6" />,
    difficulty: "CLASSIFIED",
    eventNumber: 1,
    status: "AVAILABLE",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfSwE2j8oDMFvRerorP8OempfRwsn7hxmldY45GSAcK5qdLTQ/viewform?usp=header"
  },
  {
    title: "Squabble",
    subtitle: "STRATEGIC DEBATE",
    role: "Tactical negotiators in the war room",
    briefing: "Diplomacy is a weapon sharper than any blade. You must navigate the treacherous waters of negotiation, where every word could mean victory or defeat.",
    objective: "Win strategic debates and negotiate alliances",
    task: "Engage in high-stakes debates, broker temporary alliances, and outmaneuver opponents in verbal combat",
    outcome: "Your negotiation skills determine whether forces advance or retreat, alliances form or break.",
    icon: <MessageSquare className="h-6 w-6" />,
    difficulty: "TOP SECRET",
    eventNumber: 2,
    status: "AVAILABLE",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSftB7euKNMtzJ4DaeyoPwm1xhgcCLdpERbxg1YRaCoSUYzJOA/viewform?usp=header"
  },
  {
    title: "Eureka",
    subtitle: "INNOVATION BATTLEGROUND",
    role: "Brilliant minds in the innovation lab",
    briefing: "Innovation is born in the heat of battle. You must think beyond conventional limits, creating solutions that will redefine the art of war.",
    objective: "Solve complex problems with creative and innovative solutions",
    task: "Tackle engineering challenges, design innovative solutions, and compete in intellectual combat",
    outcome: "Your breakthrough innovations could provide the technological edge needed for victory.",
    icon: <Wrench className="h-6 w-6" />,
    difficulty: "EYES ONLY",
    eventNumber: 3,
    status: "AVAILABLE",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfuTOondyINY9quRJnDdhmMU3ueHWzIOcYiQnnVq6BaDe2-kw/viewform?usp=header"
  },
  {
    title: "Warlash 2.0",
    subtitle: "ULTIMATE SHOWDOWN",
    role: "Elite warriors in the final arena",
    briefing: "This is where legends are forged and destinies decided. Every battle, every victory, every defeat shapes the future of warfare itself.",
    objective: "Compete in the ultimate gaming tournament",
    task: "Face off against the best competitors in intense gaming battles across multiple rounds",
    outcome: "Only the strongest will emerge victorious, claiming the title of ultimate champion.",
    icon: <Users className="h-6 w-6" />,
    difficulty: "ULTRA",
    eventNumber: 4,
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
            WAR ZONE: ZERO HOUR
          </h2>
          <p className="text-sm sm:text-base font-intel text-muted-foreground max-w-2xl mx-auto px-2">
            Four intense gaming events await. Test your skills in cryptography, strategy, innovation, and ultimate combat. Register now to join the battlefield.
          </p>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-classified-gold mx-auto mt-2 sm:mt-3" />
        </div>

        {/* Events Grid - Optimized for Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {trinityEvents.map((event, index) => (
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
                    console.log('Button clicked for:', event.title);
                    event.registrationLink && handleGameRegistration(event.registrationLink, event.title);
                  }}
                >
                  {event.status === "LOCKED" ? (
                    <>
                      <Lock className="h-3 w-3 mr-1" />
                      REQUIRES CLEARANCE
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

        {/* Warning */}
        <div className="text-center mt-6 sm:mt-8 md:mt-12">
          <div className="max-w-2xl mx-auto bg-alert-red/10 border border-alert-red/30 rounded-lg p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-alert-red" />
              <span className="font-classified text-alert-red text-sm">BATTLE READY WARNING</span>
            </div>
            <p className="text-xs sm:text-sm font-intel text-muted-foreground leading-relaxed px-2">
              By participating in War Zone: Zero Hour events, you acknowledge that competition is fierce and only the strongest will prevail. 
              Register for your chosen event and prepare for battle.
            </p>
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