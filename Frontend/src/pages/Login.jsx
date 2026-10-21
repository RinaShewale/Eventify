import { useEffect, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { PartyPopper } from 'lucide-react';
import Button from '../components/ui/Button';

const EventScene = lazy(() => import('../scenes/EventScene'));

export default function Login() {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const items = containerRef.current?.querySelectorAll('.login-animate');
    if (items) {
      tl.fromTo(items, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 });
    }
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left - 3D Scene (desktop only) */}
      <div className="hidden lg:flex w-1/2 relative gradient-hero items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-80 h-80 bg-primary-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl" />
        </div>
        <div className="relative w-full h-[500px]">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 animate-pulse-soft" />
            </div>
          }>
            <EventScene />
          </Suspense>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white relative">
        <div className="absolute top-6 left-6 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-warm flex items-center justify-center">
              <PartyPopper size={16} className="text-white" />
            </div>
            <span className="font-bold font-display gradient-text">Eventify AI</span>
          </Link>
        </div>

        <div ref={containerRef} className="w-full max-w-md">
          {/* Logo */}
          <div className="login-animate flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center">
              <PartyPopper size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display gradient-text">Eventify AI</h1>
              <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase">AI-Powered Event Planning</p>
            </div>
          </div>

          {/* Welcome */}
          <div className="login-animate mb-8">
            <h2 className="text-3xl font-bold font-display text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-500">Plan your celebration smarter with Eventify AI.</p>
          </div>

          {/* Google Login */}
          <div className="login-animate space-y-4">
            <Link to="/dashboard" className="block">
              <button className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold text-gray-700 hover:shadow-soft">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </Link>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-400">or</span>
              </div>
            </div>

            <Link to="/dashboard">
              <Button variant="primary" className="w-full">
                Continue as Guest
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <div className="login-animate mt-8 text-center">
            <p className="text-xs text-gray-400">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary-500 hover:underline">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-primary-500 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
