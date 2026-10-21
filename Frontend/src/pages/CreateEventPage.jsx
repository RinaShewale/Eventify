import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEventContext } from '../hooks/useEventContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function CreateEventPage() {
  const navigate = useNavigate();
  const { createEvent } = useEventContext();

  const [formData, setFormData] = useState({
    title: '',
    type: 'Wedding Celebration',
    date: '',
    location: '',
    guests: '',
    totalBudget: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Event title is required';
    if (!formData.date) errs.date = 'Date is required';
    if (!formData.location.trim()) errs.location = 'Location is required';
    if (!formData.guests || Number(formData.guests) <= 0) errs.guests = 'Valid guest count required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const newId = await createEvent(formData);
      navigate(`/app/events/${newId}`);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-luxury text-burgundy/60 hover:text-burgundy transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </button>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-burgundy font-normal">Create an Event</h1>
          <p className="text-xs text-burgundy/70 mt-1 font-light tracking-wide">
            Add the details to create an event workspace for your budget, vendors, and checklist.
          </p>
        </div>

        <Button variant="outline" size="sm" icon={Sparkles} onClick={() => navigate('/app/ai-planner')}>
          AI Synthesis
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          {submitError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-xs text-red-800">{submitError}</p>}
          <Input
            label="Event Title"
            placeholder="e.g. Royal Jaipur Sangeet & Reception"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Event Type"
              placeholder="e.g. Graduation, baby shower, product launch"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            />
            <Input
              type="date"
              label="Event Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              error={errors.date}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Destination / City"
              placeholder="e.g. Udaipur, Rajasthan"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              error={errors.location}
            />
            <Input
              type="number"
              label="Estimated Guests"
              placeholder="e.g. 250"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              error={errors.guests}
            />
            <Input
              type="number"
              label="Estimated Budget (₹ INR)"
              placeholder="e.g. 2500000"
              value={formData.totalBudget}
              onChange={(e) => setFormData({ ...formData, totalBudget: e.target.value })}
            />
          </div>

          <div className="text-left space-y-1.5 font-sans">
            <label className="block text-[11px] font-medium tracking-luxury uppercase text-burgundy/70">
              Event Style & Notes
            </label>
            <textarea
              rows={3}
              className="w-full bg-creme-50/70 border border-sand hover:border-dustyPink focus:border-burgundy rounded-xl px-4 py-3 text-sm text-burgundy outline-none transition-all duration-300 focus:ring-2 focus:ring-burgundy/15 backdrop-blur-sm"
              placeholder="Detail silk drape preferences, rare floral requirements, champagne pairings, or acoustic ambiance..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="submit" size="md" loading={submitting} disabled={submitting}>
              {submitting ? 'Saving Event...' : 'Create Event'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
              Discard
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}