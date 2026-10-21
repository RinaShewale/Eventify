import { useRef } from 'react';
import { useEventContext } from '../../hooks/useEventContext';
import { Calendar, Bell, Sparkles, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Topbar() {
  const { user, events, selectedEventId, setSelectedEventId } = useEventContext();
  const bellRef = useRef(null);

  // Subtle interactive bell shake on hover
  const onBellHover = () => {
    gsap.to(bellRef.current, {
      rotate: 15,
      repeat: 3,
      yoyo: true,
      duration: 0.1,
      ease: 'power1.inOut',
      onComplete: () => gsap.to(bellRef.current, { rotate: 0, duration: 0.1 })
    });
  };

  return (
    <header className="w-full bg-creme-50/70 backdrop-blur-xl border-b border-sand/50 px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-30 transition-all duration-300">
      {/* Event Selection Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 bg-creme/90 border border-sand hover:border-dustyPink rounded-full px-4 py-2 shadow-sm transition-all">
          <Calendar className="w-3.5 h-3.5 text-dustyPink-dark" />
          <span className="text-[10px] font-bold uppercase tracking-luxury text-burgundy/50">
            Current:
          </span>
          <div className="relative flex items-center">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="appearance-none bg-transparent text-xs font-semibold text-burgundy pr-5 outline-none cursor-pointer"
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id} className="bg-creme text-burgundy">
                  {ev.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-burgundy/60 absolute right-0 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* AI Action Pill */}
        <Link
          to="/app/ai-planner"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-dustyPink/60 bg-dustyPink/15 hover:bg-dustyPink/25 text-burgundy text-xs font-medium tracking-wide transition-all duration-300 hover:scale-102"
        >
          <Sparkles className="w-3.5 h-3.5 text-burgundy" />
          <span className="font-sans font-medium">Concierge AI</span>
        </Link>

        {/* Notification Bell */}
        <button
          ref={bellRef}
          onMouseEnter={onBellHover}
          className="w-9 h-9 rounded-full bg-creme border border-sand hover:border-dustyPink flex items-center justify-center text-burgundy transition-colors relative cursor-pointer shadow-sm"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-dustyPink-dark rounded-full ring-2 ring-creme animate-pulse" />
        </button>

        {/* User Identity */}
        <Link
          to="/app/profile"
          className="flex items-center gap-3 pl-3 border-l border-sand/70 group cursor-pointer"
        >
          <div className="relative">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
              alt={user?.name || "Member"}
              className="w-9 h-9 rounded-full object-cover border border-sand group-hover:border-burgundy transition-all duration-300"
            />
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-semibold text-burgundy block leading-tight tracking-wide group-hover:text-burgundy-light">
              {user?.name}
            </span>
            <span className="text-[10px] text-dustyPink-dark uppercase tracking-luxury font-medium">
              {user?.plan || "VIP Member"}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}