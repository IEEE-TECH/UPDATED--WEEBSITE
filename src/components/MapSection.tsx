import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const MapSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [mapError, setMapError] = useState(false);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="location" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-shadow-dark to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-classified text-classified-gold mb-4 md:mb-6">
            STRATEGIC LOCATION
          </h2>
          <p className="text-lg md:text-xl font-intel text-muted-foreground max-w-3xl mx-auto px-2">
            SIES Graduate School of Technology - Command Center for Worzone 00:00 Hour
          </p>
          <div className="w-24 md:w-32 h-1 bg-classified-gold mx-auto mt-4 md:mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Map Container */}
          <div className="space-y-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-classified">
              <div className="p-4 bg-muted/20 border-b border-border/30">
                <h3 className="text-lg md:text-xl font-classified text-classified-gold">
                  MISSION COORDINATES
                </h3>
              </div>
              <div className="relative h-80 md:h-96">
                {/* Google Maps Embed or Classified Fallback */}
                {googleMapsApiKey && !mapError ? (
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=19.0428,73.0233&zoom=15`}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="SIES GST Location"
                    onError={() => setMapError(true)}
                  />
                ) : (
                  /* Classified Military Map Fallback */
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-classified-gold/30 relative overflow-hidden">
                    {/* Grid Pattern Background */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 215, 0, 0.3)" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>

                    {/* Topographic Lines */}
                    <div className="absolute inset-0">
                      <svg className="w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50,150 Q100,120 150,140 T250,130 Q300,110 350,130"
                              fill="none" stroke="rgba(255, 215, 0, 0.2)" strokeWidth="1"/>
                        <path d="M30,180 Q80,160 130,170 T230,165 Q280,150 330,165"
                              fill="none" stroke="rgba(255, 215, 0, 0.15)" strokeWidth="1"/>
                        <path d="M70,200 Q120,185 170,195 T270,190 Q320,180 370,190"
                              fill="none" stroke="rgba(255, 215, 0, 0.1)" strokeWidth="1"/>
                      </svg>
                    </div>

                    {/* Target Location Marker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        {/* Outer Ring */}
                        <div className="w-16 h-16 border-2 border-classified-gold rounded-full animate-pulse"></div>
                        {/* Inner Ring */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-classified-gold rounded-full"></div>
                        {/* Center Dot */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-alert-red rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    {/* Classified Text Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/80 backdrop-blur-sm border border-classified-gold/30 rounded px-3 py-2">
                        <div className="text-xs font-mono-classified text-classified-gold text-center">
                          CLASSIFIED: STRATEGIC COORDINATES
                        </div>
                        <div className="text-xs font-mono-classified text-warning-amber/80 text-center mt-1">
                          NAVI MUMBAI SECTOR - MISSION READY
                        </div>
                      </div>
                    </div>

                    {/* Corner Security Badges */}
                    <div className="absolute top-2 right-2">
                      <div className="bg-alert-red/20 border border-alert-red/50 rounded px-2 py-1">
                        <span className="text-xs font-mono-classified text-alert-red">TOP SECRET</span>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <div className="bg-classified-gold/20 border border-classified-gold/50 rounded px-2 py-1">
                        <span className="text-xs font-mono-classified text-classified-gold">AUTHORIZED</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Classified Overlay - Always visible */}
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-3 py-1 rounded border border-classified-gold/30">
                  <span className="text-xs font-mono-classified text-classified-gold">
                    COORDS: 19.0428°N, 73.0233°E
                  </span>
                </div>

                {/* API Key Status Indicator */}
                {(!googleMapsApiKey || mapError) && (
                  <div className="absolute top-2 right-2 bg-alert-red/20 backdrop-blur-sm px-2 py-1 rounded border border-alert-red/50">
                    <span className="text-xs font-mono-classified text-alert-red">
                      {mapError ? 'MAP ERROR' : 'API KEY MISSING'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-classified">
              <h4 className="text-lg md:text-xl font-classified text-classified-gold mb-4">
                BASE CAMP DETAILS
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-classified-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-intel text-foreground text-sm md:text-base leading-relaxed">
                      Sri Chandrasekarendra Saraswati Vidyapuram<br />
                      Sector-V, Nerul<br />
                      Navi Mumbai - 400706<br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-classified-gold flex-shrink-0" />
                  <div>
                    <p className="font-intel text-muted-foreground text-sm md:text-base">
                      Operation Hours: 0800 - 1800 IST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-classified">
              <h4 className="text-lg md:text-xl font-classified text-classified-gold mb-4">
                ESTABLISH COMMUNICATION
              </h4>
              <p className="font-intel text-muted-foreground mb-6 text-sm md:text-base">
                Send secure transmission to command center. All communications are classified.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-mono-classified text-classified-gold mb-2">
                      CALLSIGN
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-background border border-border/50 rounded-lg focus:border-classified-gold focus:outline-none transition-colors text-sm"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono-classified text-classified-gold mb-2">
                      SECURE CHANNEL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-background border border-border/50 rounded-lg focus:border-classified-gold focus:outline-none transition-colors text-sm"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-mono-classified text-classified-gold mb-2">
                    MISSION OBJECTIVE
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-background border border-border/50 rounded-lg focus:border-classified-gold focus:outline-none transition-colors text-sm"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono-classified text-classified-gold mb-2">
                    TRANSMISSION
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-background border border-border/50 rounded-lg focus:border-classified-gold focus:outline-none transition-colors text-sm resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-classified-gold hover:bg-primary text-background font-classified px-6 py-3 rounded-lg shadow-classified hover:shadow-golden transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <Send className="h-4 w-4" />
                  SEND TRANSMISSION
                </button>
              </form>
            </div>

            {/* Alternative Contact Methods */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-classified">
              <h4 className="text-lg md:text-xl font-classified text-classified-gold mb-4">
                ALTERNATE FREQUENCIES
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-classified-gold flex-shrink-0" />
                  <div>
                    <p className="font-intel text-muted-foreground text-sm">
                      Command Line: CLASSIFIED
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-classified-gold flex-shrink-0" />
                  <div>
                    <p className="font-intel text-muted-foreground text-sm">
                      Secure Channel: command@technopedia14.ieee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Clearance Notice */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto bg-alert-red/10 border border-alert-red/30 rounded-lg p-4 md:p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-alert-red rounded-full animate-pulse" />
              <span className="font-classified text-alert-red text-sm">SECURITY PROTOCOL</span>
            </div>
            <p className="text-xs md:text-sm font-intel text-muted-foreground leading-relaxed">
              All communications are monitored and encrypted. Unauthorized access attempts will be logged and investigated.
              Worzone 00:00 Hour maintains strict information security protocols.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
