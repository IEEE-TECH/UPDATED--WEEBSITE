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
}

const trinityEvents: EventCard[] = [
  {
    title: "The Signal Room",
    subtitle: "INQUISITIVE",
    role: "Newly assigned cryptographers in a fortified communications bunker",
    briefing: "You are the unseen front line. Every cipher you break, every signal you intercept, is another step toward saving our forces. Fail — and they walk blind into the enemy's guns.",
    objective: "Crack intercepted enemy transmissions before they can be acted upon",
    task: "Solve logic puzzles, wartime ciphers, and code-breaking challenges under time pressure",
    outcome: "Correct solutions reveal cipher fragments — numbers, symbols, words. The final puzzle points to the movement of a mysterious classified cargo through hostile territory.",
    icon: <Radio className="h-6 w-6" />,
    difficulty: "CLASSIFIED",
    eventNumber: 1,
    status: "AVAILABLE"
  },
  {
    title: "The Iron Route",
    subtitle: "SQUABBLE",
    role: "Diplomatic operatives securing safe passage for the 'cargo' decoded in Event 1",
    briefing: "You must ensure the package's delivery. No one must suspect its true nature. You will bargain, lie, or sacrifice — whatever is needed to clear its path.",
    objective: "Protect the shipment without revealing its existence to neutral or hostile powers",
    task: "Debate strategic routes, broker ceasefires, and negotiate alliances — each choice affects risk, time, and secrecy",
    outcome: "The chosen route is recorded in the mission log. Intercepted messages from Event 1 resurface mid-negotiation, hinting at deeper connections.",
    icon: <MessageSquare className="h-6 w-6" />,
    difficulty: "TOP SECRET",
    eventNumber: 2,
    status: "LOCKED"
  },
  {
    title: "The Black Forge",
    subtitle: "TBD",
    role: "Military engineers tasked with securing and containing the 'cargo' from Event 2",
    briefing: "The enemy compound you now hold is unstable. Mishandle it, and it will destroy you. Secure it to Command's exact specifications — there can be no mistakes.",
    objective: "Design a containment casing for an unstable, classified payload",
    task: "Using provided materials, sketches, or models, build a casing that matches strict 'classified technical specs'",
    outcome: "Completed design is approved by High Command. A technician quietly remarks: 'Do you even know what you've made?' First real hint that the events are connected.",
    icon: <Wrench className="h-6 w-6" />,
    difficulty: "EYES ONLY",
    eventNumber: 3,
    status: "LOCKED"
  },
  {
    title: "The Convergence Briefing",
    subtitle: "GRAND REVEAL & MORAL CHOICE",
    role: "War council members in a secure underground facility",
    briefing: "A secure underground war council. Lights dim. A single projector illuminates the table. The truth about what you have built will be revealed.",
    objective: "Face the moral consequences of your actions and make the final decision",
    task: "Learn that you have unknowingly built a weapon capable of ending the war in a single strike — but at the cost of annihilating an entire city",
    outcome: "Strike immediately, delay, sabotage, or redirect. The council votes. Your names are etched into history — for better or worse.",
    icon: <Users className="h-6 w-6" />,
    difficulty: "ULTRA",
    eventNumber: 4,
    status: "LOCKED"
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

  const handleGameRegistration = (gameId: string, gameName: string) => {
    setSelectedGame({ id: gameId, name: gameName });
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
            OPERATION TRINITY VEIL
          </h2>
          <p className="text-sm sm:text-base font-intel text-muted-foreground max-w-2xl mx-auto px-2">
            Four classified events. Each builds toward the final revelation. You will not see the full picture.
          </p>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-classified-gold mx-auto mt-2 sm:mt-3" />
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {trinityEvents.map((event, index) => (
            <Card 
              key={index}
              className="group hover:shadow-golden transition-all duration-500 hover:scale-105 bg-card/70 backdrop-blur-sm border-border/50 overflow-hidden h-full"
            >
              <CardHeader className="relative pb-2 sm:pb-3">
                <div className="flex items-start justify-between mb-1 sm:mb-2">
                  <div className={`p-1.5 sm:p-2 rounded-lg bg-classified-gold/20 text-classified-gold group-hover:scale-110 transition-all`}>
                    {event.icon}
                  </div>
                  <Badge variant="secondary" className={`font-mono-classified text-xs ${getDifficultyColor(event.difficulty)}`}>
                    {event.difficulty}
                  </Badge>
                </div>
                
                <div className="mb-1 sm:mb-2">
                  <div className="text-xs font-mono-classified text-warning-amber mb-0.5 sm:mb-1">
                    EVENT {event.eventNumber}
                  </div>
                  <CardTitle className="font-classified text-sm sm:text-base text-foreground group-hover:text-classified-gold transition-colors leading-tight">
                    {event.title}
                  </CardTitle>
                  <div className="text-xs sm:text-sm font-intel text-warning-amber/80 italic">
                    {event.subtitle}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-2 sm:space-y-3 pt-0">
                {/* Role */}
                <div className="text-xs font-mono-classified text-muted-foreground">
                  <span className="text-classified-gold">ROLE:</span> {event.role}
                </div>

                {/* Briefing */}
                <div className="text-xs font-intel text-foreground/90 leading-relaxed">
                  "{event.briefing}"
                </div>

                {/* Status */}
                <div className="flex items-center justify-between pt-1 sm:pt-2">
                  <span className={`text-xs font-mono-classified ${
                    event.status === "AVAILABLE" ? "text-classified-gold" : 
                    event.status === "LOCKED" ? "text-alert-red" : "text-warning-amber"
                  }`}>
                    {event.status}
                  </span>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full text-xs group-hover:bg-classified-gold group-hover:text-background transition-all"
                  variant="outline"
                  size="sm"
                  disabled={event.status === "LOCKED"}
                  onClick={() => event.status === "AVAILABLE" && handleGameRegistration(`game${event.eventNumber}`, event.title)}
                >
                  {event.status === "LOCKED" ? (
                    <>
                      <Lock className="h-3 w-3 mr-1" />
                      REQUIRES CLEARANCE
                    </>
                  ) : event.status === "AVAILABLE" ? (
                    "BEGIN MISSION"
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
              <span className="font-classified text-alert-red text-sm">MORAL IMPLICATIONS WARNING</span>
            </div>
            <p className="text-xs sm:text-sm font-intel text-muted-foreground leading-relaxed px-2">
              By participating in Operation Trinity Veil, you acknowledge that your actions may have unforeseen consequences. 
              The true nature of your mission will only be revealed upon completion of all events.
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