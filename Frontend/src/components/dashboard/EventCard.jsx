import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Users as UsersIcon, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

export default function EventCard({ event, className = '' }) {
  const statusColors = {
    upcoming: 'warning',
    completed: 'success',
    cancelled: 'danger',
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <Link to={`/events/${event.id}`} className={`card group block ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 font-display group-hover:text-primary-500 transition-colors">
            {event.title}
          </h3>
          <Badge variant={statusColors[event.status]} className="mt-1">
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>
        <div className="p-2 rounded-xl bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all">
          <ArrowRight size={16} />
        </div>
      </div>

      <div className="space-y-2.5 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={15} />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={15} />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <UsersIcon size={15} />
          <span>{event.guestCount} guests</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-semibold text-gray-700">{event.progress}%</span>
        </div>
        <ProgressBar value={event.progress} size="sm" />
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span>{formatCurrency(event.spent)} / {formatCurrency(event.budget)}</span>
          <span>{event.tasks.completed}/{event.tasks.total} tasks</span>
        </div>
      </div>
    </Link>
  );
}
