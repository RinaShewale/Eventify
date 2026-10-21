import { useEventContext } from '../../hooks/useEventContext';
import { Calendar, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Topbar() {
  const { user, events, selectedEventId, setSelectedEventId } = useEventContext();

  return (
    <header className="w-full bg-creme-50/80 backdrop-blur-xl border-b border-sand/50 px-3 sm:px-6 md:px-10 py-3 flex items-center justify-between sticky top-0 z-30 gap-2 sm:gap-4 box-border">
      
      {/* Event Selection Switcher (Left) */}
      <div className="flex items-center min-w-0 flex-1 sm:flex-initial">
        <div className="flex items-center gap-1.5 sm:gap-2.5 bg-creme/90 border border-sand hover:border-dustyPink rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm transition-all min-w-0 max-w-full">
          <Calendar className="w-3.5 h-3.5 text-dustyPink-dark flex-shrink-0" />
          
          <span className="hidden xs:inline-block text-[10px] font-bold uppercase tracking-luxury text-burgundy/50 flex-shrink-0">
            Current:
          </span>

          <div className="relative flex items-center min-w-0 flex-1">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="appearance-none bg-transparent text-xs font-semibold text-burgundy pr-5 outline-none cursor-pointer w-full min-w-0 truncate"
            >
              {events?.map((ev) => (
                <option key={ev.id} value={ev.id} className="bg-creme text-burgundy">
                  {ev.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-burgundy/60 absolute right-0 pointer-events-none flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* User Profile Pill (Right) */}
      <Link
        to="/app/profile"
        className="flex items-center gap-2 sm:gap-2.5 p-1 pr-3 sm:pr-3.5 bg-creme/90 hover:bg-creme border border-sand hover:border-dustyPink rounded-full shadow-sm transition-all duration-200 flex-shrink-0 group"
      >
        {/* Avatar Image */}
        <img
          src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
          alt={user?.name || "Member"}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-sand group-hover:border-burgundy/40 flex-shrink-0"
        />

        {/* User Name */}
        <span className="text-xs sm:text-sm font-medium text-burgundy tracking-wide max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate">
          {user?.name || "Rina Shewale"}
        </span>

        {/* Dropdown Indicator */}
        <ChevronDown className="w-3.5 h-3.5 text-burgundy/60 group-hover:text-burgundy transition-colors flex-shrink-0" />
      </Link>

    </header>
  );
}