import React from 'react';
import { useEventContext } from '../context/EventContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { LogOut, ShieldCheck, Mail } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useEventContext();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-8 font-sans">
      <h1 className="font-editorial text-3xl sm:text-4xl text-burgundy">Host Dossier</h1>

      <Card className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left border border-sand/60">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-sand p-1 shadow-luxury"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-1">
            <h2 className="font-editorial text-2xl text-burgundy">{user.name}</h2>
            <Badge variant="burgundy">{user.plan}</Badge>
          </div>
          <p className="text-xs text-burgundy/70 flex items-center justify-center sm:justify-start gap-1.5 mb-5 font-light">
            <Mail className="w-3.5 h-3.5 text-dustyPink-dark" />
            <span>{user.email}</span>
          </p>

          <div className="flex justify-center sm:justify-start gap-3">
            <Button size="sm" variant="outline" icon={LogOut} onClick={() => navigate('/login')}>
              Sign Out
            </Button>
          </div>
        </div>
      </Card>

      <Card className="space-y-4 border border-sand/60">
        <h3 className="font-editorial text-2xl text-burgundy">Portfolio Statistics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-creme-50/70 border border-sand/50">
            <span className="text-[10px] text-burgundy/60 uppercase font-semibold tracking-luxury">Active Dossiers</span>
            <p className="font-editorial text-2xl text-burgundy mt-1">4</p>
          </div>
          <div className="p-4 rounded-xl bg-creme-50/70 border border-sand/50">
            <span className="text-[10px] text-burgundy/60 uppercase font-semibold tracking-luxury">AI Inquiries</span>
            <p className="font-editorial text-2xl text-burgundy mt-1">128</p>
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