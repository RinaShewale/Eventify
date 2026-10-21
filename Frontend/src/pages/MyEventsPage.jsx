import React from 'react';
import { useEventContext } from '../context/EventContext';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Plus, MapPin, Users, Calendar } from 'lucide-react';

export default function MyEventsPage() {
  const { events, setSelectedEventId } = useEventContext();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-plum-900">My Celebrations</h1>
          <p className="text-xs text-neutral-500 mt-1">Manage and track all ongoing and upcoming events.</p>
        </div>
        <Link to="/app/create-event">
          <Button icon={Plus}>New Event</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <Card key={ev.id} hover className="flex flex-col justify-between overflow-hidden p-0">
            <div className="h-44 w-full relative">
              <img src={ev.cover} alt={ev.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3">
                <Badge variant="coral">{ev.status}</Badge>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#CCA87B]">{ev.type}</span>
                <h3 className="font-display text-lg font-bold text-plum-900 mt-0.5 mb-2">{ev.title}</h3>
                
                <div className="space-y-1.5 text-xs text-neutral-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="truncate">{ev.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{ev.guests} Guests</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EADBC7]/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 font-bold block">Budget</span>
                  <span className="font-display font-bold text-sm text-plum-900">
                    ₹{(ev.totalBudget).toLocaleString('en-IN')}
                  </span>
                </div>
                <Link to={`/app/events/${ev.id}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedEventId(ev.id)}
                  >
                    Open Event
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}