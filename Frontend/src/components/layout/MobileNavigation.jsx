import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Sparkles,
  Wallet,
  Users,
  CheckSquare,
  MoreHorizontal,
} from 'lucide-react';
import { useState } from 'react';

const mainItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/events', label: 'Events', icon: CalendarDays },
  { to: '/ai-planner', label: 'AI', icon: Sparkles },
  { to: '/budget', label: 'Budget', icon: Wallet },
];

const moreItems = [
  { to: '/vendors', label: 'Vendors', icon: Users },
  { to: '/checklist', label: 'Checklist', icon: CheckSquare },
];

export default function MobileNavigation() {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {/* More Menu Overlay */}
      {showMore && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setShowMore(false)}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-20 left-4 right-4 bg-white rounded-2xl shadow-soft-lg p-3 space-y-1">
            {moreItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setShowMore(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-xl border-t border-gray-100 safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors min-w-[60px] ${isActive ? 'text-primary-500' : 'text-gray-400'}`}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && <div className="w-4 h-0.5 rounded-full bg-primary-500" />}
              </NavLink>
            );
          })}
          <button
            onClick={() => setShowMore(!showMore)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors min-w-[60px] ${showMore ? 'text-primary-500' : 'text-gray-400'}`}
          >
            <MoreHorizontal size={20} />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
