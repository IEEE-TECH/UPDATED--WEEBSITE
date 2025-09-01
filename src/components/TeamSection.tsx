import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  department: string;
  avatar: string;
  bgColor: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Tejraj Gujar",
    role: "IEEE Vice Chairperson",
    department: "Executive Leadership",
    avatar: "TG",
    bgColor: "bg-classified-gold"
  },
  {
    name: "Pushendra Vedak",
    role: "IEEE CS Head",
    department: "Computer Society",
    avatar: "PV",
    bgColor: "bg-warning-amber"
  },
  {
    name: "Payal Wagh",
    role: "IEEE MTT-S Head",
    department: "Microwave Theory",
    avatar: "PW",
    bgColor: "bg-intel-green"
  },
  {
    name: "Nidhi Hegde",
    role: "IEEE WIE Head",
    department: "Women in Engineering",
    avatar: "NH",
    bgColor: "bg-alert-red"
  },
  {
    name: "Srinidhi Nidamarty",
    role: "Joint Secretary",
    department: "Administration",
    avatar: "SN",
    bgColor: "bg-classified-gold"
  },
  {
    name: "Rhythm Thakur",
    role: "Joint Secretary",
    department: "Administration",
    avatar: "RT",
    bgColor: "bg-warning-amber"
  },
  {
    name: "Sahil Chavan",
    role: "MDO",
    department: "Membership Development",
    avatar: "SC",
    bgColor: "bg-intel-green"
  },
  {
    name: "Chandhru Nadar",
    role: "Technical Head",
    department: "Technical Operations",
    avatar: "CN",
    bgColor: "bg-alert-red"
  },
  {
    name: "Janmanjay Verma",
    role: "Technical Head",
    department: "Technical Operations",
    avatar: "JV",
    bgColor: "bg-classified-gold"
  },
  {
    name: "Mukul Wani",
    role: "Technical Head",
    department: "Technical Operations",
    avatar: "MW",
    bgColor: "bg-warning-amber"
  },
  {
    name: "Gaurav Patil",
    role: "Technical Head",
    department: "Technical Operations",
    avatar: "GP",
    bgColor: "bg-intel-green"
  },
  {
    name: "Divya Hindurao",
    role: "Design Head",
    department: "Creative Design",
    avatar: "DH",
    bgColor: "bg-alert-red"
  },
  {
    name: "Bhumi Beloshe",
    role: "Design Head",
    department: "Creative Design",
    avatar: "BB",
    bgColor: "bg-classified-gold"
  },
  {
    name: "Aditi Dhanawade",
    role: "Publicity Head",
    department: "Public Relations",
    avatar: "AD",
    bgColor: "bg-warning-amber"
  },
  {
    name: "Abhang Rane",
    role: "PR & Admin Head",
    department: "Public Relations",
    avatar: "AR",
    bgColor: "bg-intel-green"
  },
  {
    name: "Sudeepto Ghosh",
    role: "PR & Admin Head",
    department: "Public Relations",
    avatar: "SG",
    bgColor: "bg-alert-red"
  },
  {
    name: "Harsh Wargantiwar",
    role: "Media Head",
    department: "Media & Communications",
    avatar: "HW",
    bgColor: "bg-classified-gold"
  },
  {
    name: "Varun Ubale",
    role: "Media Head",
    department: "Media & Communications",
    avatar: "VU",
    bgColor: "bg-warning-amber"
  },
  {
    name: "Laxmi Nair",
    role: "Co Treasurer",
    department: "Finance",
    avatar: "LN",
    bgColor: "bg-intel-green"
  },
  {
    name: "Ishita Poonja",
    role: "Creative Head",
    department: "Creative Operations",
    avatar: "IP",
    bgColor: "bg-alert-red"
  }
];

const TeamSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Auto-scrolling functionality
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoScrolling && !isHovered && scrollContainerRef.current) {
      intervalId = setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
          
          // If we're at the end, scroll back to the beginning
          if (scrollLeft >= scrollWidth - clientWidth - 1) {
            scrollContainerRef.current.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          } else {
            // Normal scroll
            scrollContainerRef.current.scrollTo({
              left: scrollLeft + 2, // Slow continuous scroll
              behavior: 'smooth'
            });
          }
        }
      }, 50); // Adjust speed here (lower = faster)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoScrolling, isHovered]);

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
      const scrollAmount = 280; // Adjusted for new card width + gap
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

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-shadow-dark to-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-classified font-bold mb-4 md:mb-6 text-classified-gold tracking-wider">
            Command Structure
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-intel px-2">
            Elite command team leading IEEE operations and strategic initiatives
          </p>
          <div className="w-24 md:w-32 h-1 bg-classified-gold mx-auto mt-4 md:mt-6"></div>
        </div>

        {/* Team Cards Container */}
        <div className="relative">
          {/* Auto-scroll Control Button */}
          <button
            onClick={toggleAutoScroll}
            className="absolute top-0 right-0 z-20 bg-shadow-dark/90 backdrop-blur-sm border border-classified-gold/30 rounded-full p-2 shadow-xl transition-all hover:bg-classified-gold hover:text-black hover:scale-110"
            title={isAutoScrolling ? "Pause Auto-scroll" : "Resume Auto-scroll"}
          >
            {isAutoScrolling ? (
              <Pause className="h-4 w-4 text-classified-gold" />
            ) : (
              <Play className="h-4 w-4 text-classified-gold" />
            )}
          </button>

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
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-8 md:px-12 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Render team members twice for seamless infinite scroll */}
            {[...teamMembers, ...teamMembers].map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                className="flex-shrink-0 w-72 md:w-80 group cursor-pointer"
              >
                <div className={`
                  ${member.bgColor} text-black rounded-xl p-4 md:p-6 h-40 md:h-48 
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
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-black/30">
                          <span className="text-sm md:text-lg font-classified text-black">
                            {member.avatar}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-classified text-black mb-1 group-hover:scale-105 transition-transform">
                            {member.name}
                          </h3>
                          <p className="text-xs md:text-sm font-intel text-black/80 opacity-90">
                            {member.department}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="text-right">
                      <div className="inline-block bg-black/20 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-lg border border-black/30">
                        <span className="text-sm md:text-lg font-classified text-black">
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
            {Array.from({ length: Math.ceil(teamMembers.length / 2) }, (_, index) => (
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