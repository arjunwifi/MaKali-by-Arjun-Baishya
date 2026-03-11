import { useEffect, useRef, useState } from 'react';

const businessName = 'MaKali Store by Arjun Baishya';
const phoneNumber = '+91 84531 30589';
const whatsappLink = 'https://wa.me/918453130589';
const callLink = 'tel:+918453130589';

// Custom hook for scroll animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isVisible, end, duration]);

  return <span ref={ref} className="counter-value">{count}{suffix}</span>;
}

// Particle Background
function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

// Network Lines Background
function NetworkLines() {
  return (
    <div className="network-lines">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="network-line"
          style={{
            left: `${20 + i * 15}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

// Navigation
function TopContactBar({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] border-b border-cyan-400/15 bg-[#040816]/80 backdrop-blur-xl transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-cyan-300/80">Get In Touch</p>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <span className="text-sm font-semibold text-white">{businessName}</span>
              <span className="hidden sm:block h-1 w-1 rounded-full bg-cyan-400/60" />
              <span className="text-sm text-slate-300">Open 24 Hours, 7 Days a Week</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-button glow-button-green inline-flex items-center justify-center gap-2 px-5 py-3 text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href={callLink}
              className="glow-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {phoneNumber}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navigation({ isTopBarVisible }: { isTopBarVisible: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Services', 'Why Us', 'Process', 'Contact'];
  const navOffsetClass = isTopBarVisible ? 'top-[112px] md:top-[77px]' : 'top-0';

  return (
    <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${navOffsetClass} ${isScrolled ? 'bg-[#09101f]/88 backdrop-blur-md shadow-lg shadow-cyan-500/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 rounded-b-3xl border border-white/0 px-2 md:px-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 rounded-lg flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.35)]">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <span className="block text-base font-bold leading-tight text-white md:text-lg">
                MaKali Store
              </span>
              <span className="block text-[0.68rem] uppercase tracking-[0.25em] text-cyan-300/80">
                by Arjun Baishya
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium"
              >
                {link}
              </a>
            ))}
            <a href="#contact" className="glow-button text-sm">Get In Touch</a>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden rounded-2xl border border-cyan-400/10 bg-[#0f1629]/95 p-4 mb-4 shadow-lg shadow-cyan-500/10">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="block py-3 text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient theme-shift pt-48 md:pt-40">
      <div className="aurora aurora-left" />
      <div className="aurora aurora-right" />
      <ParticleBackground />
      <NetworkLines />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0e1a]" />
      
      <div ref={ref} className={`relative z-10 text-center px-4 max-w-5xl mx-auto pt-20 fade-in-up ${isVisible ? 'visible' : ''}`}>
        <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
          <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse" />
          <span className="text-cyan-400 text-sm font-medium">Get In Touch for Instant Installation Booking</span>
        </div>

        <p className="text-sm uppercase tracking-[0.45em] text-white/60 mb-4">MaKali Store by Arjun Baishya</p>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">Fast Internet</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            & Broadband Installation
          </span>
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10">
          MaKali Store by Arjun Baishya delivers RailWire, NXT Broadband, BSNL, and AirFiber installation with 24/7 availability,
          fast activation, and direct WhatsApp or call support from the moment visitors land on the website.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="glow-button glow-button-green text-lg px-8 py-4 inline-flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
          <a href={callLink} className="glow-button text-lg px-8 py-4 inline-flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
          <span>{phoneNumber}</span>
          <span className="hidden sm:block h-1 w-1 rounded-full bg-cyan-400/60" />
          <span>Open 24 Hours Every Week</span>
          <span className="hidden sm:block h-1 w-1 rounded-full bg-cyan-400/60" />
          <span>RailWire, NXT, BSNL, AirFiber</span>
        </div>
        
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-cyan-400">
              <AnimatedCounter end={500} suffix="+" />
            </div>
            <div className="text-gray-500 text-sm mt-1">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-cyan-400">
              <AnimatedCounter end={1} suffix=" Gbps" />
            </div>
            <div className="text-gray-500 text-sm mt-1">Max Speed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-cyan-400">
              <AnimatedCounter end={24} suffix="/7" />
            </div>
            <div className="text-gray-500 text-sm mt-1">Support</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    {
      icon: (
        <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
        </svg>
      ),
      title: 'RailWire Broadband',
      description: 'High-speed fiber optic broadband from RailTel. Enjoy seamless streaming, gaming, and work-from-home connectivity.',
      features: ['Up to 1 Gbps', 'Unlimited Data', 'Low Latency']
    },
    {
      icon: (
        <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      title: 'NXT Broadband',
      description: 'Next-generation broadband service with exceptional speeds and reliability for modern digital needs.',
      features: ['Up to 300 Mbps', 'Stable Connection', 'Quick Setup']
    },
    {
      icon: (
        <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v13.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75V5.25zm4.5 2.25h9m-9 4.5h9m-9 4.5h6" />
        </svg>
      ),
      title: 'BSNL Broadband',
      description: 'Trusted wired broadband installation for homes and offices with dependable everyday connectivity and nationwide reach.',
      features: ['Up to 300 Mbps', 'Reliable Coverage', 'Value Plans']
    },
    {
      icon: (
        <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
      title: 'AirFiber Setup',
      description: 'Wireless fiber-speed internet using cutting-edge AirFiber technology. Perfect for areas without fiber access.',
      features: ['No Cables Needed', 'Fast Deployment', 'Rural Coverage']
    },
  ];

  return (
    <section id="services" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <ServicesSectionHeader />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSectionHeader() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div ref={ref} className={`fade-in-up ${isVisible ? 'visible' : ''}`}>
      <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">What We Offer</span>
      <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
        Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Services</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        We provide professional installation for RailWire, NXT Broadband, BSNL, and AirFiber to keep you connected at the best available speed.
      </p>
    </div>
  );
}

function ServiceCard({ service, index }: { service: { icon: React.ReactNode; title: string; description: string; features: string[] }; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`service-card scale-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="icon-container">
        {service.icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
      <p className="text-gray-400 mb-4 text-sm leading-relaxed">{service.description}</p>
      <ul className="space-y-2">
        {service.features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm text-gray-300">
            <svg className="w-4 h-4 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}



// Why Choose Us Section
function WhyChooseUsSection() {
  const stats = [
    { value: 500, suffix: '+', label: 'Happy Customers' },
    { value: 99, suffix: '%', label: 'Uptime Guarantee' },
    { value: 2, suffix: ' Hrs', label: 'Avg Response Time' },
    { value: 5, suffix: ' Yrs', label: 'Experience' }
  ];

  const reasons = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Experience blazing-fast speeds up to 1 Gbps' },
    { icon: '🛡️', title: 'Reliable & Secure', desc: 'Enterprise-grade security and 99.9% uptime' },
    { icon: '🔧', title: 'Expert Installation', desc: 'Professional technicians with years of experience' },
    { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock customer support when you need it' }
  ];

  return (
    <section id="why-us" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <WhyChooseUsSectionHeader />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {reasons.map((reason, index) => (
            <ReasonCard key={index} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSectionHeader() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div ref={ref} className={`text-center fade-in-up ${isVisible ? 'visible' : ''}`}>
      <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Why Choose Us</span>
      <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
        Trusted by <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Hundreds</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        We've been delivering exceptional service and building lasting relationships with our customers.
      </p>
    </div>
  );
}

function StatCard({ stat, index }: { stat: { value: number; suffix: string; label: string }; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`stat-card scale-in ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
      </div>
      <div className="text-gray-400">{stat.label}</div>
    </div>
  );
}

function ReasonCard({ reason, index }: { reason: { icon: string; title: string; desc: string }; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`text-center p-6 fade-in-up ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-4xl mb-4">{reason.icon}</div>
      <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
      <p className="text-gray-400 text-sm">{reason.desc}</p>
    </div>
  );
}

// Installation Process Section
function ProcessSection() {
  const steps = [
    { number: 1, title: 'Contact Us', desc: 'Reach out via call or WhatsApp to discuss your requirements' },
    { number: 2, title: 'Site Survey', desc: 'Our team visits your location to assess installation requirements' },
    { number: 3, title: 'Plan Selection', desc: 'Choose the best plan based on your needs and budget' },
    { number: 4, title: 'Installation', desc: 'Professional installation by our expert technicians' },
    { number: 5, title: 'Activation', desc: 'Your connection is activated and tested for optimal performance' }
  ];

  return (
    <section id="process" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <ProcessSectionHeader />
        
        <div className="mt-16 relative">
          {steps.map((step, index) => (
            <ProcessStep key={index} step={step} index={index} isLast={index === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSectionHeader() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div ref={ref} className={`text-center fade-in-up ${isVisible ? 'visible' : ''}`}>
      <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">How It Works</span>
      <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
        Installation <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Process</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Simple and hassle-free installation process to get you connected quickly.
      </p>
    </div>
  );
}

function ProcessStep({ step, index, isLast }: { step: { number: number; title: string; desc: string }; index: number; isLast: boolean }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`flex items-start gap-6 mb-12 ${index % 2 === 0 ? 'fade-in-left' : 'fade-in-right'} ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative flex-shrink-0">
        <div className="step-number">{step.number}</div>
        {!isLast && <div className="step-line" />}
      </div>
      <div className="pt-3">
        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
        <p className="text-gray-400">{step.desc}</p>
      </div>
    </div>
  );
}

// Contact Section
function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-[#0a0e1a] to-blue-500/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={ref} className={`text-center fade-in-up ${isVisible ? 'visible' : ''}`}>
          <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Talk to <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">MaKali Store</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Contact MaKali Store by Arjun Baishya for broadband installation, quick support, and direct booking any time of the week.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-button glow-button-green flex items-center gap-3 text-lg px-8 py-4"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
            
            <a
              href={callLink}
              className="glow-button flex items-center gap-3 text-lg px-8 py-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactInfo
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              title="Location"
              text="Service available for local home and business broadband installations"
            />
            <ContactInfo
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              title="Phone"
              text={phoneNumber}
            />
            <ContactInfo
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Business Hours"
              text="Open 24 Hours — 7 Days a Week"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400">
        {icon}
      </div>
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#070a12] py-12 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <span className="block text-base font-bold text-white">MaKali Store</span>
              <span className="block text-[0.68rem] uppercase tracking-[0.25em] text-cyan-300/80">by Arjun Baishya</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
          
          <p className="text-gray-500 text-sm">
            © 2026 to 2030 MaKali Store by Arjun Baishya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleBannerVisibility = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 24) {
        setIsTopBarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsTopBarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsTopBarVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleBannerVisibility, { passive: true });
    return () => window.removeEventListener('scroll', handleBannerVisibility);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      <TopContactBar isVisible={isTopBarVisible} />
      <Navigation isTopBarVisible={isTopBarVisible} />
      <HeroSection />
      <ServicesSection />

      <WhyChooseUsSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
