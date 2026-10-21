import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Sparkles, CheckSquare, Plus } from 'lucide-react';

export default function MobileNav() {
  return (
    <nav 
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-3 right-3 sm:left-6 sm:right-6 max-w-md mx-auto z-40 bg-creme-50/90 backdrop-blur-2xl border border-sand/70 rounded-full px-2 sm:px-4 py-2 flex items-center justify-between shadow-2xl"
    >
      {/* Home */}
      <NavLink
        to="/app"
        end
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-1 transition-all duration-300 ${
            isActive ? 'text-burgundy scale-105 font-bold' : 'text-burgundy/45 hover:text-burgundy/70'
          }`
        }
      >
        <LayoutDashboard className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
        <span className="text-[9px] uppercase tracking-wider mt-0.5">Home</span>
      </NavLink>

      {/* Events */}
      <NavLink
        to="/app/events"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-1 transition-all duration-300 ${
            isActive ? 'text-burgundy scale-105 font-bold' : 'text-burgundy/45 hover:text-burgundy/70'
          }`
        }
      >
        <CalendarDays className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
        <span className="text-[9px] uppercase tracking-wider mt-0.5">Events</span>
      </NavLink>

      {/* Floating Center Action Button */}
      <div className="flex-shrink-0 px-1">
        <NavLink
          to="/app/create-event"
          aria-label="Create New Event"
          className="flex items-center justify-center -mt-6 sm:-mt-7 bg-burgundy hover:bg-burgundy-light text-creme w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full shadow-lg border-4 border-creme transition-transform duration-200 active:scale-95"
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-dustyPink" />
        </NavLink>
      </div>

      {/* AI Planner */}
      <NavLink
        to="/app/ai-planner"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-1 transition-all duration-300 ${
            isActive ? 'text-burgundy scale-105 font-bold' : 'text-burgundy/45 hover:text-burgundy/70'
          }`
        }
      >
        <Sparkles className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
        <span className="text-[9px] uppercase tracking-wider mt-0.5">AI</span>
      </NavLink>

      {/* Tasks / Checklist */}
      <NavLink
        to="/app/checklist"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-1 transition-all duration-300 ${
            isActive ? 'text-burgundy scale-105 font-bold' : 'text-burgundy/45 hover:text-burgundy/70'
          }`
        }
      >
        <CheckSquare className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
        <span className="text-[9px] uppercase tracking-wider mt-0.5">Tasks</span>
      </NavLink>
    </nav>
  );
}