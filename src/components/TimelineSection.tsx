import { useState } from "react";
import timelineBackground from "@/assets/timeline-map.jpg";

interface TimelineEvent {
  date: string;
  year: number;
  title: string;
  description: string;
  category: "invasion" | "battle" | "victory" | "turning-point";
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "Sept 17, 2025",
    year: 2025,
    title: "Operation Launch",
    description: "Trinity Veil operation officially launches. Initial briefings begin for classified personnel.",
    category: "turning-point"
  },
  {
    date: "Sept 18, 2025",
    year: 2025,
    title: "Day 1 Operations",
    description: "First day of active Trinity Veil operations. Signal Room protocols activated.",
    category: "battle"
  },
  {
    date: "Sept 19, 2025",
    year: 2025,
    title: "Registration Opens",
    description: "Security clearance applications open for qualified personnel. Background checks initiated.",
    category: "victory"
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "invasion": return "bg-alert-red";
    case "battle": return "bg-warning-amber";
    case "victory": return "bg-classified-gold";
    case "turning-point": return "bg-classified-gold";
    default: return "bg-muted";
  }
};

const TimelineSection = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <section id="timeline" className="py-20 relative overflow-hidden bg-gradient-to-b from-shadow-dark to-black">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${timelineBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="absolute inset-0 bg-background/90" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-classified text-classified-gold mb-3 md:mb-4">
            OPERATION TIMELINE
          </h2>
          <p className="text-base md:text-lg font-intel text-muted-foreground max-w-2xl mx-auto px-2">
            Key dates for Trinity Veil operation deployment and personnel clearance
          </p>
          <div className="w-20 md:w-24 h-1 bg-classified-gold mx-auto mt-3 md:mt-4" />
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-2xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-1 bg-muted" />

          {/* Timeline Events */}
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className="relative flex items-start gap-3 sm:gap-4 md:gap-8 cursor-pointer group"
                onMouseEnter={() => setSelectedEvent(event)}
                onMouseLeave={() => setSelectedEvent(null)}
              >
                {/* Event Marker */}
                <div className={`
                  w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-4 border-background z-10 mt-1 sm:mt-2
                  ${getCategoryColor(event.category)}
                  transition-combat group-hover:scale-125
                  shadow-military
                `} />

                {/* Event Content */}
                <div className="flex-1 transform group-hover:scale-105 transition-combat">
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-3 sm:p-4 md:p-6 hover:bg-card/70 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-xs sm:text-sm font-mono-classified text-classified-gold font-bold mb-1">
                          {event.date}
                        </div>
                        <h3 className="text-lg sm:text-xl font-classified text-foreground group-hover:text-classified-gold transition-colors">
                          {event.title}
                        </h3>
                      </div>
                      <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-mono-classified text-background ${getCategoryColor(event.category)}`}>
                        {event.category.replace('-', ' ').toUpperCase()}
                      </div>
                    </div>

                    {/* Hover Description */}
                    <div className={`
                      mt-3 sm:mt-4 text-sm font-intel text-muted-foreground leading-relaxed
                      transition-all duration-300
                      ${selectedEvent?.title === event.title
                        ? 'opacity-100 max-h-32'
                        : 'opacity-0 max-h-0 overflow-hidden'
                      }
                    `}>
                      {event.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12 md:mt-16">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-alert-red" />
            <span className="text-xs md:text-sm font-mono-classified text-muted-foreground">Critical Events</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning-amber" />
            <span className="text-xs md:text-sm font-mono-classified text-muted-foreground">Operations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-classified-gold" />
            <span className="text-xs md:text-sm font-mono-classified text-muted-foreground">Milestones</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;