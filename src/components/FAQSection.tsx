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
    question: "What is Operation Trinity Veil?",
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
    answer: "Operation Trinity Veil draws inspiration from classified wartime operations where scientists and operatives worked on projects without knowing their ultimate purpose.",
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
    <section id="briefing" className="py-12 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-classified text-classified-gold mb-3">
            CLASSIFIED BRIEFING
          </h2>
          <p className="text-base font-intel text-muted-foreground max-w-2xl mx-auto">
            Need-to-know basis information about Operation Trinity Veil
          </p>
          <div className="w-24 h-1 bg-classified-gold mx-auto mt-3" />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          <Accordion type="single" collapsible className="space-y-3">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-1 hover:bg-card/70 transition-colors shadow-classified"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-classified-gold transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getCategoryIcon(faq.category)}</span>
                    <span className="font-classified text-sm group-hover:text-classified-gold transition-colors">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-1">
                  <div className="pl-8">
                    <p className="font-intel text-muted-foreground leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Section */}
        <div className="mt-8 text-center bg-muted/20 rounded-lg p-6 border border-border/30">
          <h3 className="text-xl font-classified text-foreground mb-3">
            Require Additional Clearance?
          </h3>
          <p className="font-intel text-muted-foreground mb-4 text-sm">
            Command center stands ready to provide additional classified information.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-classified-gold hover:bg-primary text-background font-classified px-4 py-2 rounded-lg shadow-classified hover:shadow-golden transition-all hover:scale-105 text-sm">
              REQUEST CLEARANCE
            </button>
            <button className="border border-classified-gold/50 text-classified-gold hover:bg-classified-gold/10 font-classified px-4 py-2 rounded-lg transition-all hover:scale-105 text-sm">
              SECURE CHANNEL
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;