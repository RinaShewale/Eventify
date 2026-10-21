import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEventContext } from '../context/EventContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { Calendar, MapPin, Users, Sparkles, Trash2 } from 'lucide-react';

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, deleteEvent } = useEventContext();

  const event = events.find((e) => e.id === id) || events[0];

  const handleDelete = () => {
    if (window.confirm(`Are you certain you wish to archive "${event.title}"?`)) {
      deleteEvent(event.id);
      navigate('/app/events');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Hero Cover Card */}
      <div className="relative rounded-3xl overflow-hidden h-80 shadow-luxury border border-sand/60">
        <img src={event.cover} alt={event.title} className="w-full h-full object-cover filter brightness-[0.7]" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/90 via-burgundy-dark/30 to-transparent" />

        <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-creme">
          <div>
            <Badge variant="burgundy">{event.type}</Badge>
            <h1 className="font-editorial text-3xl sm:text-5xl font-normal mt-2 leading-tight">{event.title}</h1>
            <p className="text-xs text-creme/80 mt-2 flex items-center gap-5">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-dustyPink" /> {event.date}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-dustyPink" /> {event.location}</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-dustyPink" /> {event.guests} Guests</span>
            </p>
          </div>

          <div className="flex gap-3">
            <Link to="/app/ai-planner">
              <Button size="sm" variant="secondary" icon={Sparkles}>
                AI Blueprint
              </Button>
            </Link>
            <Button size="sm" variant="outline" icon={Trash2} onClick={handleDelete} />
          </div>
        </div>
      </div>

      {/* Grid: Overview & Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="font-editorial text-2xl text-burgundy mb-2">Narrative & Concept</h3>
            <p className="text-xs text-burgundy/80 leading-relaxed font-light">{event.description}</p>
          </div>

          <div className="border-t border-sand/50 pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-editorial text-2xl text-burgundy">Financial Drawdown</h3>
              <span className="text-xs font-semibold text-burgundy">
                ₹{(event.allocatedBudget).toLocaleString('en-IN')} / ₹{(event.totalBudget).toLocaleString('en-IN')}
              </span>
            </div>
            <ProgressBar value={event.allocatedBudget} max={event.totalBudget} />
            <p className="text-[11px] text-burgundy/60 mt-2 font-light">
              Remaining Uncommitted: ₹{(event.totalBudget - event.allocatedBudget).toLocaleString('en-IN')}
            </p>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-editorial text-2xl text-burgundy">Navigation</h3>
          <div className="space-y-2">
            <Link to="/app/budget" className="block p-3.5 rounded-xl bg-creme-50/70 hover:bg-sand/30 border border-sand/40 text-xs font-medium text-burgundy transition-all">
              💳 Manage Budget Breakdown
            </Link>
            <Link to="/app/vendors" className="block p-3.5 rounded-xl bg-creme-50/70 hover:bg-sand/30 border border-sand/40 text-xs font-medium text-burgundy transition-all">
              🏪 Review Vendors & Contracts
            </Link>
            <Link to="/app/checklist" className="block p-3.5 rounded-xl bg-creme-50/70 hover:bg-sand/30 border border-sand/40 text-xs font-medium text-burgundy transition-all">
              ✅ Open Run-of-Show Checklist
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}