import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  Wallet, 
  Store, 
  ArrowRight, 
  User as UserIcon, 
  LayoutDashboard, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useAuth from '../hooks/useAuth';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage({ isReady = true, onIntroTimelineReady }) {
  const mainRef = useRef(null);
  const dropdownRef = useRef(null);
  const introTimelineRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { status, user, logout } = useAuth();
  const isAuthenticated = status === 'authenticated';

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
      introTimelineRef.current = introTl;
      introTl
        .fromTo('.hero-badge', { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo('.hero-title-line', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 }, '-=0.4')
        .fromTo('.hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-cta-group', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
      onIntroTimelineReady?.(introTl);

      gsap.to('.hero-text-container', {
        y: -70,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom 50%',
          scrub: 1,
        },
      });

      gsap.fromTo(
        '.hero-showcase',
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.hero-showcase',
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.hero-showcase-img',
        { yPercent: -8, scale: 1.08 },
        {
          yPercent: 8,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-showcase',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      gsap.to('.hero-floating-card', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-showcase',
          start: 'top 80%',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.utils.toArray('.reveal-heading').forEach((heading) => {
        gsap.fromTo(
          heading,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              end: 'top 65%',
              scrub: 0.8,
            },
          }
        );
      });

      gsap.fromTo(
        '.feature-card',
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#features-grid',
            start: 'top 85%',
            end: 'center 65%',
            scrub: 1,
          },
        }
      );

      gsap.utils.toArray('.step-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, filter: 'blur(4px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 60%',
              scrub: 0.8,
            },
          }
        );
      });

      gsap.fromTo(
        '.testimonial-content',
        { scale: 0.92, opacity: 0.3, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 85%',
            end: 'center 50%',
            scrub: 1,
          },
        }
      );

      ScrollTrigger.refresh();
    }, mainRef);

    return () => {
      introTimelineRef.current = null;
      ctx.revert();
    };
  }, [onIntroTimelineReady]);

  useEffect(() => {
    if (isReady) introTimelineRef.current?.play();
  }, [isReady]);

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-[#FDFBF7] text-[#4A1521] selection:bg-[#4A1521] selection:text-[#FDFBF7] overflow-x-hidden font-sans"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FDFBF7]/85 border-b border-[#EADFCF] transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#4A1521] flex items-center justify-center text-[#FDFBF7] shadow-sm flex-shrink-0">
              <Sparkles className="w-4 h-4 text-[#D8B4A6]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl tracking-wide block leading-none font-normal">
                Eventify
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#4A1521]/60 font-semibold mt-0.5 block">
                Smart Event Planner
              </span>
            </div>
          </Link>

          {/* Auth section */}
          <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#EADFCF] bg-white p-1 pr-3 text-[#4A1521] shadow-sm transition hover:border-[#D8B4A6] hover:shadow-md focus:outline-none"
                  aria-expanded={isDropdownOpen}
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={user?.name || 'User Avatar'}
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-[#EADFCF] object-cover flex-shrink-0"
                  />
                  <span className="text-xs font-medium max-w-[100px] truncate hidden sm:inline">
                    {user?.name || 'My Account'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#4A1521]/60 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-56 sm:w-60 rounded-2xl bg-[#FDFBF7] border border-[#EADFCF] shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-[#EADFCF]/70">
                      <p className="text-xs font-semibold text-[#4A1521] truncate">
                        {user?.name || 'Welcome Back'}
                      </p>
                      <p className="text-[11px] text-[#4A1521]/60 truncate font-light mt-0.5">
                        {user?.email || 'user@eventify.com'}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/app"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#4A1521] hover:bg-[#F3ECE1] transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#B87A68]" />
                        <span>My Dashboard</span>
                      </Link>

                      <Link
                        to="/app/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#4A1521] hover:bg-[#F3ECE1] transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-[#B87A68]" />
                        <span>Profile &amp; Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-[#EADFCF]/70 pt-1 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          if (logout) logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-700 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 sm:px-5 py-2 rounded-full border border-[#4A1521] text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium text-[#4A1521] hover:bg-[#4A1521] hover:text-[#FDFBF7] transition-all duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-20 pb-16 sm:pb-24 text-center">
        <div className="hero-text-container">
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#F3ECE1] border border-[#E0D3C1] text-[#4A1521] text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] mb-6 sm:mb-8 max-w-full">
            <Sparkles className="w-3.5 h-3.5 text-[#B87A68] flex-shrink-0" />
            <span className="truncate">Plan Any Event in Minutes with AI</span>
          </div>

          <div className="mb-6 sm:mb-7">
            <h1 className="hero-title-line font-serif text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#4A1521] leading-[1.08]">
              Plan unforgettable events,
            </h1>
            <h1 className="hero-title-line font-serif text-4xl xs:text-5xl sm:text-7xl md:text-8xl italic font-light text-[#5B1C2A] leading-[1.1] underline decoration-[#E0D3C1] decoration-1 underline-offset-8 mt-1">
              without the stress.
            </h1>
          </div>

          <p className="hero-desc max-w-2xl mx-auto text-xs sm:text-base text-[#4A1521]/75 font-light leading-relaxed mb-8 sm:mb-10 px-2">
            Just describe what you are celebrating. Our AI instantly organizes your budget, creates a full to-do checklist, helps you pick vendors, and builds your day-of timeline.
          </p>

          <div className="hero-cta-group flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/app"
              className="group relative inline-flex items-center justify-center px-7 sm:px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-[#FDFBF7] bg-[#4A1521] hover:bg-[#340c15] border border-[#5E1A29] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Start Planning with AI</span>
              <ArrowRight className="w-4 h-4 ml-2.5 text-[#D8B4A6] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href="#features"
              className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-[#4A1521] bg-white hover:bg-[#F3ECE1] border border-[#E0D3C1] shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] w-full sm:w-auto"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Showcase Video Section */}
        <div className="hero-showcase mt-12 sm:mt-16 relative rounded-3xl overflow-hidden border border-[#EADFCF] p-2.5 sm:p-4 bg-white/80 backdrop-blur shadow-md">
          <div className="rounded-2xl overflow-hidden border border-[#EADFCF] bg-[#FAF7F2] h-72 xs:h-80 sm:h-[460px] md:h-[500px] relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
              className="hero-showcase-img w-full h-[120%] -top-[10%] relative object-cover filter brightness-[0.92]"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-bride-holding-a-bouquet-of-flowers-43187-large.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
          </div>

          {/* Floating Card */}
          <div className="hero-floating-card absolute bottom-5 left-4 right-4 sm:right-auto sm:bottom-8 sm:left-12 bg-white/95 backdrop-blur-md p-3.5 sm:p-5 rounded-2xl max-w-sm text-left shadow-xl border border-[#EADFCF] flex items-center gap-3.5 sm:gap-4 z-10">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#4A1521] flex items-center justify-center text-[#D8B4A6] flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-serif text-sm sm:text-base text-[#4A1521] font-medium leading-tight">
                Instant Event Blueprint
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#4A1521]/70 font-light mt-0.5 leading-snug">
                Your budget split, vendor checklist, and complete schedule ready in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 sm:py-24 bg-[#F8F4EC] border-y border-[#EADFCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="reveal-heading text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] text-[#4A1521]/60">
              Everything in One Place
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#4A1521] mt-2">
              Features Designed to Save You Time
            </h2>
          </div>

          <div id="features-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Instant Themes & Ideas',
                desc: 'Describe your dream party or wedding in simple words. AI suggests themes, color palettes, and decor concepts instantly.',
              },
              {
                icon: Wallet,
                title: 'Smart Budgeting',
                desc: 'Stay on budget effortlessly. Automatically split costs across food, venue, and decor, and track every payment easily.',
              },
              {
                icon: Store,
                title: 'Vendor Manager',
                desc: 'Keep all your vendor quotes, notes, and contacts for caterers, DJs, and photographers organized in one spot.',
              },
              {
                icon: Calendar,
                title: 'Interactive Checklist',
                desc: 'Get a step-by-step checklist and an hour-by-hour day-of timeline that updates automatically if your plans change.',
              },
            ].map((f, i) => (
              <div
                key={i}
                className="feature-card bg-white p-6 sm:p-7 rounded-2xl border border-[#EADFCF] shadow-sm hover:shadow-md hover:border-[#D8B4A6] transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF7F2] border border-[#EADFCF] text-[#4A1521] flex items-center justify-center mb-4 sm:mb-5">
                  <f.icon className="w-5 h-5 text-[#B87A68]" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-normal text-[#4A1521] mb-2">{f.title}</h3>
                <p className="text-xs text-[#4A1521]/70 leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="workflow" className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="reveal-heading">
          <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] text-[#4A1521]/60">
            Simple Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#4A1521] mt-2 mb-12 sm:mb-16">
            Plan in 3 Easy Steps
          </h2>
        </div>

        <div id="workflow-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              step: '01',
              title: 'Tell Us Your Vision',
              desc: 'Enter what event you are planning, your guest count, rough budget, and favorite style. You can write in plain, everyday language.',
            },
            {
              step: '02',
              title: 'Get Your Custom Plan',
              desc: 'In seconds, receive an organized plan with an itemized budget, to-do list, vendor suggestions, and an event-day schedule.',
            },
            {
              step: '03',
              title: 'Enjoy Your Big Day',
              desc: 'Easily tick off tasks, send reminders to vendors, and host your celebration without any last-minute surprises.',
            },
          ].map((s, i) => (
            <div
              key={i}
              className="step-card p-6 sm:p-8 rounded-3xl bg-white border border-[#EADFCF] text-left shadow-sm hover:shadow-md hover:border-[#D8B4A6] transition-all duration-300"
            >
              <span className="font-serif text-3xl sm:text-4xl text-[#B87A68] font-light block mb-3 sm:mb-4">
                {s.step}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#4A1521] mb-2">{s.title}</h3>
              <p className="text-xs text-[#4A1521]/70 font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials / Vision Statement */}
      <section id="testimonials" className="py-20 sm:py-28 bg-[#4A1521] text-[#FDFBF7] overflow-hidden">
        <div className="testimonial-content max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center text-[#D8B4A6] mb-6 sm:mb-8">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <blockquote className="font-serif text-xl sm:text-3xl md:text-4xl italic font-light leading-relaxed mb-6 sm:mb-8 px-2">
            “Planning a 200-guest wedding felt totally overwhelming until we used Eventify. It broke everything down step-by-step and saved us countless hours.”
          </blockquote>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold text-[#D8B4A6]">
            Loved by Couples, Families &amp; Event Planners
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FDFBF7] border-t border-[#EADFCF] py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-xs text-[#4A1521]/60 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="font-serif text-base sm:text-lg text-[#4A1521] font-normal">Eventify</span>
            <span>© {new Date().getFullYear()} All Rights Reserved.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-8 tracking-wide">
            <a href="#features" className="hover:text-[#4A1521] transition-colors">Features</a>
            <a href="#workflow" className="hover:text-[#4A1521] transition-colors">How It Works</a>
            <Link to={isAuthenticated ? '/app' : '/login'} className="hover:text-[#4A1521] transition-colors">
              {isAuthenticated ? 'Open Dashboard' : 'Sign In'}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}