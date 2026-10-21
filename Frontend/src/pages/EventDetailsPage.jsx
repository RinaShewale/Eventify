import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEventContext } from '../hooks/useEventContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { Calendar, MapPin, Users, Sparkles, Trash2 } from 'lucide-react';
import EventCoverImage from '../components/ui/EventCoverImage';

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, deleteEvent, setSelectedEventId, updateEventCover } = useEventContext();

  const [deleteError, setDeleteError] = useState('');
  const event = events.find((item) => item.id === id);

  const handleDelete = async () => {
    if (!event) return;
    if (window.confirm(`Are you certain you wish to archive "${event.title}"?`)) {
      setDeleteError('');
      try {
        await deleteEvent(event.id);
        navigate('/app/events');
      } catch (error) {
        setDeleteError(error.message);
      }
    }
  };

  if (!event) {
    return (
      <div className="space-y-4">
        <h1 className="font-editorial text-3xl text-burgundy">Event unavailable</h1>
        <p className="text-sm text-burgundy/70">This event could not be found in your account.</p>
        <Button onClick={() => navigate('/app/events')}>Return to events</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      {deleteError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-xs text-red-800">{deleteError}</p>}
      {/* Hero Cover Card */}
      <div className="relative rounded-3xl overflow-hidden h-80 shadow-luxury border border-sand/60">
        <EventCoverImage
          key={`${event.id}-${event.cover}`}
          event={event}
          alt={event.title}
          className="h-full w-full"
          imageClassName="h-full w-full object-cover brightness-[0.7]"
          onImageChange={(cover) => updateEventCover(event.id, cover)}
        />
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
            <Link
              to="/app/checklist"
              onClick={() => setSelectedEventId(event.id)}
              className="block p-3.5 rounded-xl bg-creme-50/70 hover:bg-sand/30 border border-sand/40 text-xs font-medium text-burgundy transition-all"
            >
              ✅ Open Run-of-Show Checklist
            </Link>
          </div>
        </Card>
      </div>

      {event.aiPlan && (
        <Card className="space-y-4">
          <h2 className="font-editorial text-2xl text-burgundy">Saved AI Event Plan</h2>
          {event.aiPlan.blueprint && (
            <details className="rounded-xl border border-sand/60 p-4">
              <summary className="cursor-pointer text-sm font-medium text-burgundy">
                Spatial Blueprint
              </summary>
              <pre className="mt-4 max-h-[32rem] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-creme-50 p-4 text-xs leading-relaxed text-burgundy/80">
                {JSON.stringify(event.aiPlan.blueprint, null, 2)}
              </pre>
            </details>
          )}
          {event.aiPlan.plan && (
            <details className="rounded-xl border border-sand/60 p-4">
              <summary className="cursor-pointer text-sm font-medium text-burgundy">
                Full Execution Plan
              </summary>
              <pre className="mt-4 max-h-[32rem] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-creme-50 p-4 text-xs leading-relaxed text-burgundy/80">
                {JSON.stringify(event.aiPlan.plan, null, 2)}
              </pre>
            </details>
          )}
        </Card>
      )}
    </div>
  );
}