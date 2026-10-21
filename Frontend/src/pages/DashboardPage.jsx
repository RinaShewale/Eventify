import { useRef, useEffect } from 'react';
import { useEventContext } from '../hooks/useEventContext';
import { 
  Sparkles, 
  CalendarDays, 
  Wallet, 
  Users, 
  Store, 
  ArrowUpRight, 
  ArrowRight,
  Plus, 
  Clock, 
  CheckCircle2,
  MapPin,
  TrendingUp
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import EventCoverImage from '../components/ui/EventCoverImage';

export default function DashboardPage() {
  const { user, events, activeEvent, tasks, budgetCategories, vendors, updateEventCover } = useEventContext();
  const pageRef = useRef(null);

  // Financial and Production Calculations
  const totalBudgetManaged = events.reduce((acc, curr) => acc + curr.totalBudget, 0);
  const totalGuests = events.reduce((acc, curr) => acc + (Number(curr.guests) || 0), 0);
  const activeEventsCount = events.filter((e) => e.status === 'Upcoming' || e.status === 'Planning').length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dash-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="space-y-8 font-sans">
      {/* Top Header: Planner Greeting & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EADFCF] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#4A1521]/60 font-semibold block mb-1">
            Event Management Command Center
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#4A1521] font-normal">
            Welcome back, {user?.name || 'Director'}
          </h1>
          <p className="text-xs text-[#4A1521]/75 mt-1 font-light tracking-wide">
            Managing <span className="font-semibold text-[#4A1521]">{activeEventsCount} active celebrations</span> and <span className="font-semibold text-[#4A1521]">₹{(totalBudgetManaged / 100000).toFixed(1)} Lakhs</span> in total production value.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/app/ai-planner">
            <Button variant="outline" size="sm" icon={Sparkles}>
              AI Event Plan
            </Button>
          </Link>
          <Link to="/app/create-event">
            <Button icon={Plus} size="sm">
              Create New Event
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Core Production KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <Card className="dash-item p-5 bg-white border border-[#EADFCF]">
          <div className="flex items-center justify-between text-[#4A1521]/60 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">Events Managed</span>
            <CalendarDays className="w-4 h-4 text-[#B87A68]" />
          </div>
          <p className="font-serif text-3xl text-[#4A1521] font-normal">{events.length}</p>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-800 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{activeEventsCount} Active Productions</span>
          </div>
        </Card>

        {/* Metric 2 */}
        <Card className="dash-item p-5 bg-white border border-[#EADFCF]">
          <div className="flex items-center justify-between text-[#4A1521]/60 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">Total Budget</span>
            <Wallet className="w-4 h-4 text-[#B87A68]" />
          </div>
          <p className="font-serif text-3xl text-[#4A1521] font-normal">
            ₹{(totalBudgetManaged / 100000).toFixed(1)}L
          </p>
          <span className="text-[11px] text-[#4A1521]/60 font-light block mt-1">
            INR across all events
          </span>
        </Card>

        {/* Metric 3 */}
        <Card className="dash-item p-5 bg-white border border-[#EADFCF]">
          <div className="flex items-center justify-between text-[#4A1521]/60 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">Total Guest Matrix</span>
            <Users className="w-4 h-4 text-[#B87A68]" />
          </div>
          <p className="font-serif text-3xl text-[#4A1521] font-normal">{totalGuests}</p>
          <span className="text-[11px] text-[#4A1521]/60 font-light block mt-1">
            Guests across your events
          </span>
        </Card>

        {/* Metric 4 */}
        <Card className="dash-item p-5 bg-white border border-[#EADFCF]">
          <div className="flex items-center justify-between text-[#4A1521]/60 mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">Contracted Vendors</span>
            <Store className="w-4 h-4 text-[#B87A68]" />
          </div>
          <p className="font-serif text-3xl text-[#4A1521] font-normal">{vendors.length}</p>
          <span className="text-[11px] text-emerald-800 font-medium block mt-1">
            Vendors in your event list
          </span>
        </Card>
      </div>

      {/* AI Event Planner Hero Callout (Redesigned Banner & Luxury Button) */}
      <div className="dash-item relative rounded-3xl overflow-hidden p-8 sm:p-10 bg-[#4A1521] text-[#FAF7F2] shadow-xl border border-[#5E1A29]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D8B4A6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#D8B4A6] text-[10px] font-semibold uppercase tracking-[0.2em] mb-4 border border-white/15 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" /> Generative Event Planner
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight mb-3">
            Generate an entire event plan in seconds.
          </h2>
          <p className="text-xs text-[#FAF7F2]/80 font-light leading-relaxed mb-7 max-w-xl">
            Enter your destination, guest count, and INR budget to instantly generate custom decor concepts, multi-course dining schedules, and minute-by-minute run-of-show timelines.
          </p>

          {/* Luxury Elevated CTA Button */}
          <Link
            to="/app/ai-planner"
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] text-[#4A1521] bg-[#FAF7F2] hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-[#B87A68] transition-transform duration-300 group-hover:rotate-12" />
            <span>Launch AI Planner</span>
            <ArrowRight className="w-4 h-4 text-[#4A1521] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Main Grid: Live Event Production Status & Master Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Live Production Tracker */}
        <Card className="dash-item lg:col-span-2 space-y-6 bg-white border border-[#EADFCF]">
          <div className="flex items-center justify-between border-b border-[#EADFCF] pb-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B87A68] block">
                {activeEvent ? 'Production In Progress' : 'Event Overview'}
              </span>
              <h3 className="font-serif text-2xl text-[#4A1521] mt-0.5">
                {activeEvent?.title || 'No event selected'}
              </h3>
            </div>
            {activeEvent && (
              <Link 
                to={`/app/events/${activeEvent.id}`} 
                className="text-xs font-semibold text-[#4A1521] hover:text-[#5B1C2A] flex items-center gap-1 tracking-wide"
              >
                <span>Manage Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Event Details Card */}
          {activeEvent && (
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADFCF]">
              <EventCoverImage
                key={`${activeEvent.id}-${activeEvent.cover}`}
                event={activeEvent}
                alt={activeEvent.title}
                className="w-full sm:w-36 h-28 rounded-xl object-cover border border-[#EADFCF] shadow-sm"
                imageClassName="w-full sm:w-36 h-28 rounded-xl object-cover border border-[#EADFCF] shadow-sm"
                onImageChange={(cover) => updateEventCover(activeEvent.id, cover)}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="burgundy">{activeEvent.type}</Badge>
                  <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {activeEvent.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#4A1521]/75 my-2">
                  <span className="flex items-center gap-1.5 font-light">
                    <Clock className="w-3.5 h-3.5 text-[#B87A68]" /> {activeEvent.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-light">
                    <MapPin className="w-3.5 h-3.5 text-[#B87A68]" /> {activeEvent.location}
                  </span>
                  <span className="flex items-center gap-1.5 font-light">
                    <Users className="w-3.5 h-3.5 text-[#B87A68]" /> {activeEvent.guests} Guests
                  </span>
                </div>
                
                {/* Event Budget Progress */}
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] font-medium text-[#4A1521]/80 mb-1">
                    <span>Budget Committed: ₹{(activeEvent.allocatedBudget || 0).toLocaleString('en-IN')}</span>
                    <span>Target: ₹{(activeEvent.totalBudget || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <ProgressBar value={activeEvent.allocatedBudget} max={activeEvent.totalBudget} />
                </div>
              </div>
            </div>
          )}

          {/* Real Budget Category Breakdown */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4A1521]/60 mb-3">
              Department Budget Allocation
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {budgetCategories.slice(0, 3).map((cat) => (
                <div key={cat.id} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EADFCF]">
                  <span className="text-[10px] text-[#4A1521]/60 uppercase font-semibold tracking-[0.18em] block truncate">
                    {cat.category}
                  </span>
                  <p className="font-serif text-xl text-[#4A1521] mt-1">
                    ₹{Number(cat.spent).toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-[#4A1521]/50 block mt-0.5">
                    Cap: ₹{Number(cat.allocated).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Right Column: Master Event Run-of-Show Checklist */}
        <Card className="dash-item space-y-5 bg-white border border-[#EADFCF]">
          <div className="flex items-center justify-between border-b border-[#EADFCF] pb-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B87A68] block">
                Run-of-Show
              </span>
              <h3 className="font-serif text-2xl text-[#4A1521] mt-0.5">
                Milestone Tasks
              </h3>
            </div>
            <Link to="/app/checklist" className="text-xs text-[#4A1521] font-semibold hover:underline">
              View All ({tasks.length})
            </Link>
          </div>

          {/* Quick Progress Banner */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EADFCF] flex items-center justify-between">
            <span className="text-xs font-medium text-[#4A1521]">Checklist Progress</span>
            <span className="text-xs font-semibold text-[#4A1521]">
              {completedTasksCount} of {tasks.length} Done
            </span>
          </div>

          {/* Task Items */}
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div 
                key={task.id} 
                className={`p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-3 ${
                  task.completed 
                    ? 'bg-[#FAF7F2]/40 border-[#EADFCF]/50 opacity-60' 
                    : 'bg-[#FAF7F2] border-[#EADFCF] hover:border-[#D8B4A6]'
                }`}
              >
                <div className="mt-0.5">
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-[#4A1521]/40" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium leading-snug truncate ${
                    task.completed ? 'line-through text-[#4A1521]/50' : 'text-[#4A1521]'
                  }`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-[#4A1521]/60">
                    <span className="font-medium text-[#B87A68]">{task.timing}</span>
                    <span>•</span>
                    <span>{task.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/app/checklist" className="block w-full">
            <Button variant="outline" size="sm" className="w-full">
              Open Master Checklist
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}