import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, FileX } from "lucide-react";

interface SponsorTier {
  name: string;
  tier: "Classified" | "Confidential" | "Restricted" | "Internal";
  icon: React.ReactNode;
  status: string;
  slots: number;
  color: string;
}

const sponsorTiers: SponsorTier[] = [
  {
    name: "Operation Command",
    tier: "Classified",
    icon: <Shield className="h-8 w-8" />,
    status: "Access Pending",
    slots: 2,
    color: "bg-classified-gold"
  },
  {
    name: "Intelligence Division", 
    tier: "Confidential",
    icon: <Eye className="h-8 w-8" />,
    status: "Clearance Required",
    slots: 4,
    color: "bg-warning-amber"
  },
  {
    name: "Security Branch",
    tier: "Restricted",
    icon: <Lock className="h-8 w-8" />,
    status: "Authorization Needed",
    slots: 6,
    color: "bg-intel-green"
  },
  {
    name: "Support Network",
    tier: "Internal",
    icon: <FileX className="h-8 w-8" />,
    status: "Documentation Review",
    slots: 8,
    color: "bg-alert-red"
  }
];

const SponsorsSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-shadow-dark to-black">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-classified font-bold mb-4 md:mb-6 text-classified-gold tracking-wider">
            Strategic Partners
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-intel px-2">
            Elite organizations supporting classified operations and intelligence gathering
          </p>
          <div className="w-24 md:w-32 h-1 bg-classified-gold mx-auto mt-4 md:mt-6"></div>
        </div>

        {/* Coming Soon Display */}
        <div className="bg-shadow-dark/50 rounded-xl p-8 md:p-12 backdrop-blur-sm border border-classified-gold/20 text-center">
          <div className="space-y-8">
            {/* Large "Coming Soon" Message */}
            <div className="space-y-4">
              <div className="w-24 h-24 bg-classified-gold/20 rounded-full flex items-center justify-center mx-auto">
                <Lock className="h-12 w-12 text-classified-gold" />
              </div>
              <h3 className="text-3xl md:text-4xl font-classified text-classified-gold mb-4">
                COMING SOON
              </h3>
              <p className="text-lg font-intel text-gray-300 max-w-2xl mx-auto">
                Strategic partnerships are currently under classified review. 
                Intelligence reports will be declassified once operational security is confirmed.
              </p>
            </div>

            {/* Partnership Tiers Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
              {sponsorTiers.map((tier, index) => (
                <Card 
                  key={index}
                  className="group bg-shadow-dark/30 backdrop-blur-sm border border-classified-gold/10 overflow-hidden hover:border-classified-gold/30 transition-all duration-500"
                >
                  <div className="p-4 md:p-6 text-center space-y-3 md:space-y-4">
                    {/* Tier Icon */}
                    <div className={`mx-auto w-12 h-12 md:w-16 md:h-16 rounded-full ${tier.color} flex items-center justify-center text-black group-hover:scale-110 transition-all duration-300 shadow-xl`}>
                      {React.cloneElement(tier.icon as React.ReactElement, { className: "h-6 w-6 md:h-8 md:w-8" })}
                    </div>

                    {/* Tier Name */}
                    <div>
                      <h4 className="font-classified text-base md:text-lg text-classified-gold mb-2">
                        {tier.name}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className="bg-classified-gold/10 text-classified-gold border-classified-gold/30 font-intel text-xs md:text-sm"
                      >
                        {tier.tier}
                      </Badge>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <div className="text-xs md:text-sm font-intel text-gray-400 p-2 md:p-3 bg-black/20 rounded border border-classified-gold/10">
                        {tier.status}
                      </div>
                    </div>

                    {/* Available Slots */}
                    <div className="pt-3 md:pt-4 border-t border-classified-gold/20">
                      <div className="text-xs md:text-sm font-intel text-gray-400">
                        Positions Available:
                      </div>
                      <div className="text-base md:text-lg font-classified text-classified-gold">
                        {tier.slots} Slots
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Contact Information */}
            <div className="mt-12 space-y-6">
              <div className="max-w-2xl mx-auto">
                <h4 className="text-xl font-classified text-classified-gold mb-4">
                  Partnership Inquiries
                </h4>
                <p className="font-intel text-gray-300 leading-relaxed">
                  Organizations interested in strategic partnerships should await further intelligence briefings. 
                  Classified documentation will be distributed through secure channels once operational parameters are established.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-classified-gold hover:bg-warning-amber text-black font-classified px-8 py-3 rounded-lg shadow-xl hover:shadow-classified transition-all duration-300 hover:scale-105 cursor-not-allowed opacity-60">
                  ACCESS RESTRICTED
                </button>
                <button className="border border-classified-gold/50 text-classified-gold hover:bg-classified-gold/10 font-classified px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-not-allowed opacity-60">
                  CLEARANCE PENDING
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;