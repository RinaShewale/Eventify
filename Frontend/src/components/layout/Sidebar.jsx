import { NavLink, useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
  LayoutDashboard,
  CalendarDays,
  Sparkles,
  Wallet,
  Users,
  CheckSquare,
  User,
  PartyPopper,
  LogOut,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/events', label: 'My Events', icon: CalendarDays },
  { to: '/ai-planner', label: 'AI Planner', icon: Sparkles },
  { to: '/budget', label: 'Budget', icon: Wallet },
  { to: '/vendors', label: 'Vendors', icon: Users },
  { to: '/checklist', label: 'Checklist', icon: CheckSquare },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar() {
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(
      el,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className="hidden lg:flex flex-col w-[260px] h-screen bg-white/80 backdrop-blur-xl border-r border-gray-100 fixed left-0 top-0 z-40"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center">
          <PartyPopper size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold font-display gradient-text">Eventify</h1>
          <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">AI</p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary-500" />
              )}
              <Icon size={20} />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="px-4 py-4 border-t border-gray-100">
        <button className="sidebar-link w-full text-gray-400 hover:text-danger-500">
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export { navItems };
