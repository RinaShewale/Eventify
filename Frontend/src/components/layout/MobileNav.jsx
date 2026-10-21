import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Sparkles, CheckSquare, Plus } from 'lucide-react';

export default function MobileNav() {
  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-creme-50/85 backdrop-blur-2xl border border-sand/70 rounded-3xl px-6 py-2.5 flex items-center justify-between shadow-2xl">
      <NavLink
        to="/app"
        end
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-all duration-300 ${
            isActive ? 'text-burgundy scale-105 font-semibold' : 'text-burgundy/40'
          }`
        }
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[9px] uppercase tracking-wider">Home</span>
      </NavLink>

      <NavLink
        to="/app/events"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-all duration-300 ${
            isActive ? 'text-burgundy scale-105 font-semibold' : 'text-burgundy/40'
          }`
        }
      >
        <CalendarDays className="w-5 h-5" />
        <span className="text-[9px] uppercase tracking-wider">Events</span>
      </NavLink>

      {/* Floating Center Action Button */}
      <NavLink
        to="/app/create-event"
        className="flex items-center justify-center -mt-7 bg-burgundy hover:bg-burgundy-light text-creme w-13 h-13 rounded-full shadow-luxury border-4 border-creme transition-transform duration-300 active:scale-95"
      >
        <Plus className="w-6 h-6 text-dustyPink" />
      </NavLink>

      <NavLink
        to="/app/ai-planner"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-all duration-300 ${
            isActive ? 'text-burgundy scale-105 font-semibold' : 'text-burgundy/40'
          }`
        }
      >
        <Sparkles className="w-5 h-5 text-dustyPink-dark" />
        <span className="text-[9px] uppercase tracking-wider">Concierge</span>
      </NavLink>

      <NavLink
        to="/app/checklist"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 transition-all duration-300 ${
            isActive ? 'text-burgundy scale-105 font-semibold' : 'text-burgundy/40'
          }`
        }
      >
        <CheckSquare className="w-5 h-5" />
        <span className="text-[9px] uppercase tracking-wider">Tasks</span>
      </NavLink>
    </div>
  );
}