import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const MapSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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
            SIES Graduate School of Technology - Command Center for War Zone: Zero Hour
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
                {/* Google Maps Embed */}
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD2t6bQkQa9uc-ePInTi_0c4L8_yrv6ofc&q=19.0428,73.0233&zoom=15`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SIES GST Location"
                />
                {/* Classified Overlay */}
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-3 py-1 rounded border border-classified-gold/30">
                  <span className="text-xs font-mono-classified text-classified-gold">
                    COORDS: 19.0428°N, 73.0233°E
                  </span>
                </div>
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
              War Zone: Zero Hour maintains strict information security protocols.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
