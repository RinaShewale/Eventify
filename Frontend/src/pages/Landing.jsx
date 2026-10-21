import { useEffect, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles, Wallet, Users, CheckCircle,
  ArrowRight, Star, PartyPopper, ChevronRight,
  Zap, Shield, Clock, Heart,
} from 'lucide-react';
import Button from '../components/ui/Button';
import { features, testimonials } from '../data/mockData';

gsap.registerPlugin(ScrollTrigger);

const EventScene = lazy(() => import('../scenes/EventScene'));

const iconMap = { Sparkles, Wallet, Users, CheckCircle };

function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg gradient-warm flex items-center justify-center">
              <PartyPopper size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold font-display gradient-text">Eventify AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-primary-500 transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-primary-500 transition-colors font-medium">How it works</a>
            <a href="#testimonials" className="text-sm text-gray-600 hover:text-primary-500 transition-colors font-medium">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm" icon={Sparkles}>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(textRef.current?.querySelectorAll('.hero-text'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 });
    tl.fromTo(buttonsRef.current?.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.3');
  }, []);

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 gradient-hero overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div ref={textRef} className="relative z-10">
            <div className="hero-text inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-6">
              <Sparkles size={14} className="text-primary-500" />
              <span className="text-sm font-semibold text-primary-600">AI-Powered Event Planning</span>
            </div>

            <h1 className="hero-text text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-gray-900 leading-tight mb-6">
              Plan Better.{' '}
              <span className="gradient-text">Celebrate Smarter.</span>
            </h1>

            <p className="hero-text text-lg text-gray-600 max-w-lg mb-8 leading-relaxed">
              Eventify AI helps you plan unforgettable celebrations with AI-powered ideas, budgets, vendors and smart checklists.
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <Link to="/dashboard">
                <Button size="lg" icon={Sparkles} iconRight={ArrowRight}>
                  Start Planning
                </Button>
              </Link>
              <a href="#features">
                <Button variant="secondary" size="lg">
                  Explore Features
                </Button>
              </a>
            </div>

            <div className="hero-text flex items-center gap-6 mt-10 pt-8 border-t border-gray-200/50">
              <div className="text-center">
                <p className="text-2xl font-bold font-display text-gray-900">10k+</p>
                <p className="text-xs text-gray-500 font-medium">Events Planned</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-bold font-display text-gray-900">4.9</p>
                <p className="text-xs text-gray-500 font-medium">User Rating</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-bold font-display text-gray-900">500+</p>
                <p className="text-xs text-gray-500 font-medium">Vendors</p>
              </div>
            </div>
          </div>

          {/* Right - 3D Scene */}
          <div className="relative h-[350px] sm:h-[400px] lg:h-[500px]">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 animate-pulse-soft" />
              </div>
            }>
              <EventScene />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cards = sectionRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%' },
      });
    });
  }, []);

  const gradients = [
    'from-primary-500 to-primary-400',
    'from-secondary-500 to-secondary-400',
    'from-blue-500 to-blue-400',
    'from-emerald-500 to-emerald-400',
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border border-secondary-100 text-sm font-semibold text-secondary-600 mb-4">
            <Zap size={14} />
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 mb-4">
            Everything you need to{' '}
            <span className="gradient-text">plan perfectly</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From AI-powered planning to budget tracking, manage every aspect of your event in one platform.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div key={feature.id} className="feature-card card !p-8 text-center group hover:shadow-glow">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold font-display text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const steps = sectionRef.current?.querySelectorAll('.step-item');
    steps?.forEach((step, i) => {
      gsap.fromTo(step, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: step, start: 'top 85%' },
      });
    });
  }, []);

  const steps = [
    { number: '01', title: 'Create your event', description: 'Enter your event details — type, date, budget, and guest count.', icon: PartyPopper },
    { number: '02', title: 'Generate your AI plan', description: 'Let AI create a personalized plan with themes, timeline, and vendor suggestions.', icon: Sparkles },
    { number: '03', title: 'Manage everything', description: 'Track budgets, vendors, and tasks all in one organized dashboard.', icon: Shield },
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 lg:py-28 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-sm font-semibold text-primary-600 mb-4">
            <Clock size={14} />
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 mb-4">
            Plan your event in{' '}
            <span className="gradient-text">3 simple steps</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="step-item relative">
                <div className="card !p-8 text-center relative overflow-hidden">
                  <span className="absolute top-4 right-4 text-6xl font-bold font-display text-gray-100">{step.number}</span>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-5">
                      <Icon size={24} className="text-primary-500" />
                    </div>
                    <h3 className="text-lg font-semibold font-display text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AIPreview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(sectionRef.current?.querySelector('.ai-preview-card'), { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border border-secondary-100 text-sm font-semibold text-secondary-600 mb-4">
            <Sparkles size={14} />
            AI Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 mb-4">
            See the <span className="gradient-text">AI magic</span> in action
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">Here's a preview of what an AI-generated event plan looks like.</p>
        </div>

        <div className="ai-preview-card max-w-4xl mx-auto">
          <div className="card !p-0 overflow-hidden">
            {/* Header */}
            <div className="gradient-warm p-6 sm:p-8 text-white">
              <h3 className="text-2xl font-bold font-display mb-2">Modern Birthday Bash</h3>
              <p className="text-white/80 text-sm">Generated by Eventify AI • Birthday Party • 50 Guests • Nashik</p>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Theme */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Theme</h4>
                <p className="font-semibold text-gray-900 font-display text-lg">Modern Celebration Vibes</p>
                <p className="text-gray-500 text-sm mt-1">A trendy and vibrant birthday with warm lighting and Instagram-worthy setups.</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {['Coral', 'Blush Pink', 'Gold', 'Ivory'].map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full bg-surface-200 text-xs font-medium text-gray-600">{c}</span>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Budget Allocation</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Venue', amount: '₹15,000', pct: 30 },
                    { name: 'Catering', amount: '₹12,000', pct: 24 },
                    { name: 'Photography', amount: '₹8,000', pct: 16 },
                    { name: 'Decoration', amount: '₹7,000', pct: 14 },
                    { name: 'Music & DJ', amount: '₹5,000', pct: 10 },
                    { name: 'Other', amount: '₹3,000', pct: 6 },
                  ].map((item) => (
                    <div key={item.name} className="bg-surface-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500">{item.name}</p>
                      <p className="font-semibold text-gray-900 mt-0.5">{item.amount}</p>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                        <div className="gradient-warm h-1.5 rounded-full" style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick ideas */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">🎨 Decoration Ideas</h4>
                  <ul className="space-y-2">
                    {['Modern balloon arch', 'LED fairy light backdrop', 'Neon sign', 'Photo booth'].map((idea) => (
                      <li key={idea} className="flex items-center gap-2 text-sm text-gray-600">
                        <ChevronRight size={14} className="text-primary-400" />
                        {idea}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">🎵 Activities</h4>
                  <ul className="space-y-2">
                    {['Grand Cake Cutting', 'Group Games', 'Dance Floor', 'Photo Session'].map((act) => (
                      <li key={act} className="flex items-center gap-2 text-sm text-gray-600">
                        <ChevronRight size={14} className="text-secondary-400" />
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cards = sectionRef.current?.querySelectorAll('.testimonial-card');
    cards?.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.5, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%' },
      });
    });
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 lg:py-28 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-sm font-semibold text-primary-600 mb-4">
            <Heart size={14} />
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 mb-4">
            Loved by <span className="gradient-text">event planners</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card card !p-8">
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(null).map((_, i) => (
                  <Star key={i} size={16} className="text-warning-400 fill-warning-400" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-200 flex items-center justify-center text-lg">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const ctaRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(ctaRef.current, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
    });
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div ref={ctaRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="card !p-10 sm:!p-16 gradient-warm text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
              Ready to plan your next celebration?
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Join thousands of event planners who trust Eventify AI to create unforgettable celebrations.
            </p>
            <Link to="/dashboard">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-white text-primary-600 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <Sparkles size={18} />
                Get Started for Free
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-warm flex items-center justify-center">
                <PartyPopper size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold font-display">Eventify AI</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              AI-powered celebration and event planning platform. Plan better, celebrate smarter with intelligent tools and personalized recommendations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
              <li><Link to="/ai-planner" className="hover:text-white transition-colors">AI Planner</Link></li>
              <li><Link to="/budget" className="hover:text-white transition-colors">Budget</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 Eventify AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <AIPreview />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}
