import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Sparkles, 
  Wallet, 
  Store, 
  CheckSquare, 
  UserCircle,
  Plus
} from 'lucide-react';
import gsap from 'gsap';

const navItems = [
  { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
  { name: 'My Events', path: '/app/events', icon: CalendarDays },
  { name: 'AI Planner', path: '/app/ai-planner', icon: Sparkles, badge: 'AI' },
  { name: 'Budget', path: '/app/budget', icon: Wallet },
  { name: 'Vendors', path: '/app/vendors', icon: Store },
  { name: 'Checklist', path: '/app/checklist', icon: CheckSquare },
  { name: 'Profile', path: '/app/profile', icon: UserCircle },
];

export default function Sidebar() {
  const sidebarRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    // Filter out null elements
    const validLinks = linksRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        validLinks,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.04,
          duration: 0.4,
          ease: 'power2.out',
          clearProps: 'all', // Cleans inline opacity/transforms so they NEVER stay hidden
        }
      );
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  return (
    <aside 
      ref={sidebarRef}
      className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-[#FAF7F2] border-r border-[#EADFCF] p-6 justify-between select-none z-20"
    >
      <div>
        {/* Editorial Brand Heading */}
        <div className="flex items-center gap-3.5 mb-8 px-2">
          <div className="w-10 h-10 rounded-2xl bg-[#4A1521] flex items-center justify-center text-[#FAF7F2] shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer">
            <Sparkles className="w-4 h-4 text-[#D8B4A6]" />
          </div>
          <div>
            <span className="font-serif text-2xl tracking-wide text-[#4A1521] block leading-none font-normal">
              Eventify
            </span>
            <span className="text-[9px] uppercase tracking-[0.22em] text-[#4A1521]/60 font-semibold mt-1 block">
              Event planning
            </span>
          </div>
        </div>

        {/* High-End Quick Action Button */}
        <NavLink
          to="/app/create-event"
          className="group relative w-full mb-6 bg-[#4A1521] hover:bg-[#340C15] text-[#FAF7F2] py-3.5 px-5 rounded-full font-medium text-xs tracking-[0.18em] uppercase flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4 text-[#D8B4A6] transition-transform duration-300 group-hover:rotate-90" />
          <span>New Experience</span>
        </NavLink>

        {/* Navigation Item Stack */}
        <nav className="space-y-1">
          {navItems.map((item, index) => (
            <NavLink
              key={item.name}
              ref={(el) => {
                if (el) linksRef.current[index] = el;
              }}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) =>
                `group relative flex items-center justify-between px-4 py-3 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-[#4A1521] text-[#FAF7F2] shadow-sm font-semibold'
                    : 'text-[#4A1521]/80 hover:text-[#4A1521] hover:bg-[#EFE8DF]/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3.5">
                    <item.icon 
                      className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? 'text-[#D8B4A6]' : 'text-[#4A1521]/65 group-hover:text-[#4A1521]'
                      }`} 
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span 
                      className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.18em] font-bold border transition-colors ${
                        isActive 
                          ? 'border-[#D8B4A6]/40 bg-[#D8B4A6]/20 text-[#D8B4A6]'
                          : 'border-[#DFCFC1] bg-[#EFE8DF] text-[#4A1521]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Eventify assistant card */}
      <div className="relative overflow-hidden bg-white/70 backdrop-blur-md rounded-2xl p-4 text-center border border-[#EADFCF] shadow-sm">
        <p className="font-serif text-base text-[#4A1521] font-medium">Eventify Assistant</p>
        <p className="text-[11px] text-[#4A1521]/70 mt-1 mb-3 leading-relaxed font-light">
          Turn your event details into a practical plan with AI.
        </p>
        <NavLink
          to="/app/ai-planner"
          className="inline-block text-[10px] text-[#4A1521] font-semibold tracking-[0.2em] uppercase border-b border-[#4A1521]/40 pb-0.5 hover:border-[#4A1521] transition-all"
        >
          Open AI Planner →
        </NavLink>
      </div>
    </aside>
  );
}