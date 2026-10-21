import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Wallet, Store, ArrowRight, Star, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial quick entrance for immediate visual gratification
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      introTl
        .fromTo('.hero-badge', { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo('.hero-title-line', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 }, '-=0.4')
        .fromTo('.hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-cta-group', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');

      // 2. Scroll-Linked Hero Parallax & Fade Out
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

      // Showcase Image Parallax & Scale
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

      // Floating Info Card Parallax within Hero
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

      // 3. Section Titles Reveal on Scroll
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

      // 4. Feature Cards: Staggered Scroll-Driven Float Up
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

      // 5. Three Acts: Sequential Unveiling
      const steps = gsap.utils.toArray('.step-card');
      steps.forEach((card, index) => {
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

      // 6. Testimonial Scroll Scale & Illumination
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

      // Recalculate heights cleanly after render
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-[#FDFBF7] text-[#4A1521] selection:bg-[#4A1521] selection:text-[#FDFBF7] overflow-x-hidden font-sans"
    >
      {/* Sticky Glass Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FDFBF7]/85 border-b border-[#EADFCF] transition-all">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-[#4A1521] flex items-center justify-center text-[#FDFBF7] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#D8B4A6]" />
            </div>
            <div>
              <span className="font-serif text-2xl tracking-wide block leading-none font-normal">Événement</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#4A1521]/60 font-semibold mt-0.5 block">
                Private Maison
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/login"
              className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#4A1521]/75 hover:text-[#4A1521] transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/app"
              className="group relative inline-flex items-center justify-center px-5 py-2.5 rounded-full text-[11px] font-medium tracking-[0.18em] uppercase text-[#FDFBF7] bg-[#4A1521] hover:bg-[#340c15] transition-all duration-300 shadow-sm active:scale-[0.98]"
            >
              <span>Enter Atelier</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section max-w-6xl mx-auto px-6 pt-16 pb-24 text-center">
        <div className="hero-text-container">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3ECE1] border border-[#E0D3C1] text-[#4A1521] text-[10px] font-semibold uppercase tracking-[0.22em] mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#B87A68]" />
            <span>Autonomous Luxury Event Orchestration</span>
          </div>

          {/* Headings */}
          <div className="mb-7">
            <h1 className="hero-title-line font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#4A1521] leading-[1.05]">
              The Art of
            </h1>
            <h1 className="hero-title-line font-serif text-5xl sm:text-7xl md:text-8xl italic font-light text-[#5B1C2A] leading-[1.1] underline decoration-[#E0D3C1] decoration-1 underline-offset-8 mt-1">
              Effortless Grandeur.
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hero-desc max-w-2xl mx-auto text-sm sm:text-base text-[#4A1521]/75 font-light leading-relaxed mb-9">
            Synthesize full spatial concepts, precision INR budget allocations, and bespoke run-of-show schedules designed
            with the exact poise of luxury event directors.
          </p>

          {/* Buttons */}
          <div className="hero-cta-group flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/app"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-[#FDFBF7] bg-[#4A1521] hover:bg-[#340c15] border border-[#5E1A29] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Compose An Event</span>
              <ArrowRight className="w-4 h-4 ml-2.5 text-[#D8B4A6] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-[#4A1521] bg-white hover:bg-[#F3ECE1] border border-[#E0D3C1] shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] w-full sm:w-auto"
            >
              Explore Suite
            </a>
          </div>
        </div>

        {/* Showcase Image with Parallax Mask */}
        <div className="hero-showcase mt-16 relative rounded-3xl overflow-hidden border border-[#EADFCF] p-3 sm:p-4 bg-white/80 backdrop-blur shadow-md">
          <div className="rounded-2xl overflow-hidden border border-[#EADFCF] bg-[#FAF7F2] h-80 sm:h-[480px] relative">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
              alt="Luxury Royal Event Showcase"
              className="hero-showcase-img w-full h-[120%] -top-[10%] relative object-cover filter brightness-[0.96]"
            />
          </div>

          <div className="hero-floating-card absolute bottom-8 left-6 sm:left-12 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl max-w-sm text-left shadow-xl border border-[#EADFCF] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#4A1521] flex items-center justify-center text-[#D8B4A6] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-serif text-base text-[#4A1521] font-medium">AI Master Orchestration</p>
              <p className="text-[11px] text-[#4A1521]/70 font-light mt-0.5 leading-snug">
                “Udaipur palace banquet mapped with 300 guests, royal brass lighting, and sitar transition.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-24 bg-[#F8F4EC] border-y border-[#EADFCF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal-heading text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#4A1521]/60">
              Flawless Delivery
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#4A1521] mt-2">Meticulously Curated</h2>
          </div>

          <div id="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Generative Blueprints',
                desc: 'Instantly draft spatial themes, sensory audio palettes, and course menus with AI poise.',
              },
              {
                icon: Wallet,
                title: 'Capital Allocation',
                desc: 'Discipline every rupee across venue, floral decor, and hospitality with predictive accuracy.',
              },
              {
                icon: Store,
                title: 'Private Vendor Vault',
                desc: 'Catalog quotes, milestone balances, and vetted partners across Indian luxury destinations.',
              },
              {
                icon: Calendar,
                title: 'Run-of-Show Fidelity',
                desc: 'Dynamic minute-by-minute schedules synchronized for key hosts, staff, and artisans.',
              },
            ].map((f, i) => (
              <div
                key={i}
                className="feature-card bg-white p-7 rounded-2xl border border-[#EADFCF] shadow-sm hover:shadow-md hover:border-[#D8B4A6] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAF7F2] border border-[#EADFCF] text-[#4A1521] flex items-center justify-center mb-5">
                  <f.icon className="w-5 h-5 text-[#B87A68]" />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#4A1521] mb-2">{f.title}</h3>
                <p className="text-xs text-[#4A1521]/70 leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Methodology */}
      <section id="workflow" className="py-28 max-w-6xl mx-auto px-6 text-center">
        <div className="reveal-heading">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#4A1521]/60">Methodology</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#4A1521] mt-2 mb-16">
            Three Acts of Preparation
          </h2>
        </div>

        <div id="workflow-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: 'I',
              title: 'Impart The Vision',
              desc: 'Detail your aesthetic intention, location, and guest matrix. The AI understands nuance, not just numbers.',
            },
            {
              step: 'II',
              title: 'Refine The Blueprint',
              desc: 'Analyze the architectural plan, sensory pairings, and automatic milestone budget partitions.',
            },
            {
              step: 'III',
              title: 'Execute With Grace',
              desc: 'Engage confirmed masters, track timeline milestones, and celebrate with total peace of mind.',
            },
          ].map((s, i) => (
            <div
              key={i}
              className="step-card p-8 rounded-3xl bg-white border border-[#EADFCF] text-left shadow-sm hover:shadow-md hover:border-[#D8B4A6] transition-all duration-300"
            >
              <span className="font-serif text-4xl text-[#B87A68] font-light block mb-4">{s.step}</span>
              <h3 className="font-serif text-2xl text-[#4A1521] mb-2">{s.title}</h3>
              <p className="text-xs text-[#4A1521]/70 font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-28 bg-[#4A1521] text-[#FDFBF7] overflow-hidden">
        <div className="testimonial-content max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center text-[#D8B4A6] gap-1.5 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <blockquote className="font-serif text-2xl sm:text-4xl italic font-light leading-relaxed mb-8">
            “The AI spatial itinerary and budget predictions for our Udaipur palace gala were executed with such nuance that
            our family was completely present for every second.”
          </blockquote>
          <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#D8B4A6]">
            Pooja &amp; Siddharth • Private Gala Hosts
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FDFBF7] border-t border-[#EADFCF] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#4A1521]/60">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg text-[#4A1521] font-normal">Événement AI</span>
            <span>© {new Date().getFullYear()} All Rights Reserved.</span>
          </div>
          <div className="flex gap-8 tracking-wide">
            <a href="#" className="hover:text-[#4A1521] transition-colors">
              Privacy Protocol
            </a>
            <a href="#" className="hover:text-[#4A1521] transition-colors">
              Terms of Experience
            </a>
            <a href="#" className="hover:text-[#4A1521] transition-colors">
              Concierge Desk
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}