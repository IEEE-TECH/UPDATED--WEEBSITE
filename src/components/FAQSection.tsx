import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
  category: "event" | "games" | "registration" | "technical";
}

const faqData: FAQItem[] = [
  {
    question: "What is War Zone: Zero Hour?",
    answer: "A classified evaluation system that tests logic, diplomacy, and engineering skills. You will be moved through four connected events without knowing the full picture until the final briefing.",
    category: "event"
  },
  {
    question: "How do I gain security clearance?",
    answer: "Registration opens soon. You must acknowledge the moral implications of your participation. Each event requires completion of the previous one to unlock.",
    category: "registration"
  },
  {
    question: "What are the four events?",
    answer: "Signal Room (cryptography), Iron Route (diplomacy), Black Forge (engineering), and Convergence Briefing (moral choice). Each event builds toward the final revelation.",
    category: "event"
  },
  {
    question: "Will I know what I'm building?",
    answer: "No. You will work on classified components without understanding the full scope. The true nature of your work will only be revealed in the final briefing.",
    category: "event"
  },
  {
    question: "What are the moral implications?",
    answer: "Your actions will have consequences you cannot foresee. The final choice will determine whether you are remembered as a savior or destroyer. Choose wisely.",
    category: "event"
  },
  {
    question: "Is this based on real events?",
    answer: "War Zone: Zero Hour draws inspiration from classified wartime operations where scientists and operatives worked on projects without knowing their ultimate purpose.",
    category: "technical"
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "event": return "🎯";
    case "games": return "🎮";
    case "registration": return "📝";
    case "technical": return "⚙️";
    default: return "❓";
  }
};

const FAQSection = () => {
  return (
    <section id="briefing" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-shadow-dark to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-classified text-classified-gold mb-3 md:mb-4">
            CLASSIFIED BRIEFING
          </h2>
          <p className="text-base md:text-lg font-intel text-muted-foreground max-w-2xl mx-auto px-2">
            Need-to-know basis information about War Zone: Zero Hour
          </p>
          <div className="w-24 md:w-32 h-1 bg-classified-gold mx-auto mt-3 md:mt-4" />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2 md:space-y-3">
          <Accordion type="single" collapsible className="space-y-2 md:space-y-3">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-3 md:px-4 py-2 md:py-3 hover:bg-card/70 transition-colors shadow-classified"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-classified-gold transition-colors group">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-base md:text-lg">{getCategoryIcon(faq.category)}</span>
                    <span className="font-classified text-sm md:text-base group-hover:text-classified-gold transition-colors">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-2 md:pb-1">
                  <div className="pl-6 md:pl-8">
                    <p className="font-intel text-muted-foreground leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Section */}
        <div className="mt-8 md:mt-12 text-center bg-muted/20 rounded-lg p-4 md:p-6 border border-border/30">
          <h3 className="text-lg md:text-xl font-classified text-foreground mb-2 md:mb-3">
            Require Additional Clearance?
          </h3>
          <p className="font-intel text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">
            Command center stands ready to provide additional classified information.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <button className="bg-classified-gold hover:bg-primary text-background font-classified px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg shadow-classified hover:shadow-golden transition-all hover:scale-105 text-xs sm:text-sm md:text-base">
              REQUEST CLEARANCE
            </button>
            <button className="border border-classified-gold/50 text-classified-gold hover:bg-classified-gold/10 font-classified px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg transition-all hover:scale-105 text-xs sm:text-sm md:text-base">
              SECURE CHANNEL
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;