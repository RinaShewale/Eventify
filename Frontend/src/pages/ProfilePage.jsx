import { useEventContext } from '../hooks/useEventContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { LogOut, ShieldCheck, Mail, Sparkles, Calendar, Users } from 'lucide-react';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

export default function ProfilePage() {
  const { user, events } = useEventContext();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [signOutError, setSignOutError] = useState('');

  const activeEventsCount = events.filter((event) => ['Upcoming', 'Planning'].includes(event.status)).length;
  const plannedGuests = events.reduce((total, event) => total + (Number(event.guests) || 0), 0);

  const handleSignOut = async () => {
    setSignOutError('');
    try {
      await signOut().unwrap();
      navigate('/login', { replace: true });
    } catch (error) {
      setSignOutError(typeof error === 'string' ? error : error.message);
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 font-sans">
      <h1 className="font-editorial text-3xl sm:text-4xl text-burgundy">Your Profile</h1>

      <Card className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left border border-sand/60">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-sand p-1 shadow-luxury"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-1">
            <h2 className="font-editorial text-2xl text-burgundy">{user.name}</h2>
            <Badge variant="burgundy">{user.plan || 'GenAI Planner'}</Badge>
          </div>
          <p className="text-xs text-burgundy/70 flex items-center justify-center sm:justify-start gap-1.5 mb-5 font-light">
            <Mail className="w-3.5 h-3.5 text-dustyPink-dark" />
            <span>{user.email}</span>
          </p>

          <div className="flex justify-center sm:justify-start gap-3">
            <Button size="sm" variant="outline" icon={LogOut} onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
          {signOutError && <p role="alert" className="mt-3 text-xs text-red-800">{signOutError}</p>}
        </div>
      </Card>

      {/* Changed Portfolio Statistics to Event Planner Summary */}
      <Card className="space-y-4 border border-sand/60">
        <div className="flex items-center justify-between">
          <h3 className="font-editorial text-2xl text-burgundy">Event Planner Insights</h3>
          <span className="text-xs text-burgundy/60 flex items-center gap-1 font-medium bg-sand/20 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Powered by Mistral AI
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-creme-50/70 border border-sand/50">
            <span className="text-[10px] text-burgundy/60 uppercase font-semibold tracking-luxury flex items-center justify-center gap-1">
              <Calendar className="w-3 h-3" /> Active Events
            </span>
            <p className="font-editorial text-2xl text-burgundy mt-1">{activeEventsCount}</p>
          </div>

          <div className="p-4 rounded-xl bg-creme-50/70 border border-sand/50">
            <span className="text-[10px] text-burgundy/60 uppercase font-semibold tracking-luxury flex items-center justify-center gap-1">
              <Users className="w-3 h-3" /> Total Planned Guests
            </span>
            <p className="font-editorial text-2xl text-burgundy mt-1">{plannedGuests}</p>
          </div>

          <div className="p-4 rounded-xl bg-creme-50/70 border border-sand/50 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-burgundy/60 uppercase font-semibold tracking-luxury">Authentication</span>
            <p className="text-xs font-semibold text-emerald-800 mt-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Google SSO
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}