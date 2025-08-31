import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  department: string;
  avatar: string;
  bgColor: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Gaurav Patil",
    role: "Technical Head",
    department: "Engineering Division",
    avatar: "GP",
    bgColor: "bg-classified-gold"
  },
  {
    name: "Janmanjay Verma",
    role: "Technical Head", 
    department: "Operations Division",
    avatar: "JV",
    bgColor: "bg-warning-amber"
  },
  {
    name: "Mukul Wani",
    role: "Technical Head",
    department: "Intelligence Division",
    avatar: "MW", 
    bgColor: "bg-intel-green"
  },
  {
    name: "Chandru",
    role: "Technical Head",
    department: "Security Division",
    avatar: "CH",
    bgColor: "bg-alert-red"
  }
];

const TeamSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons(); // Initial check
      
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of card + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-shadow-dark to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-classified font-bold mb-6 text-classified-gold tracking-wider">
            Technical Command
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-intel">
            Elite officers overseeing classified operations and strategic intelligence
          </p>
          <div className="w-32 h-1 bg-classified-gold mx-auto mt-6"></div>
        </div>

        {/* Team Cards Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-shadow-dark/90 backdrop-blur-sm border border-classified-gold/30 rounded-full p-3 shadow-xl transition-all ${
              canScrollLeft 
                ? 'text-classified-gold hover:bg-classified-gold hover:text-black hover:scale-110' 
                : 'text-gray-500 cursor-not-allowed opacity-50'
            }`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-shadow-dark/90 backdrop-blur-sm border border-classified-gold/30 rounded-full p-3 shadow-xl transition-all ${
              canScrollRight 
                ? 'text-classified-gold hover:bg-classified-gold hover:text-black hover:scale-110' 
                : 'text-gray-500 cursor-not-allowed opacity-50'
            }`}
            disabled={!canScrollRight}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Scrollable Cards Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 group cursor-pointer"
              >
                <div className={`
                  ${member.bgColor} text-black rounded-xl p-6 h-48 
                  shadow-2xl hover:shadow-classified transition-all duration-500 
                  hover:scale-105 hover:-translate-y-2 relative overflow-hidden
                `}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-32 h-32 border border-black/20 rounded-full" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 border border-black/20 rounded" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* Avatar and Name */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-black/30">
                          <span className="text-lg font-classified text-black">
                            {member.avatar}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-classified text-black mb-1 group-hover:scale-105 transition-transform">
                            {member.name}
                          </h3>
                          <p className="text-sm font-intel text-black/80 opacity-90">
                            {member.department}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="text-right">
                      <div className="inline-block bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-black/30">
                        <span className="text-lg font-classified text-black">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(teamMembers.length / 3) }, (_, index) => (
              <div 
                key={index}
                className="w-2 h-2 rounded-full bg-classified-gold/30"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;