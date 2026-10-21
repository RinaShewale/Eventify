import { useState, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Sparkles, Copy, Check, Layers, Compass, BookmarkPlus } from 'lucide-react';
import { aiApi } from '../services/aiApi';
import useAuth from '../hooks/useAuth';
import { useEventContext } from '../hooks/useEventContext';
import { createEventCoverUrl } from '../utils/eventCover';

function formatLabel(label) {
  if (!label) return '';
  return label
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

// Depth-controlled, lightweight renderer to eliminate DOM nesting lag
const PlanNode = memo(function PlanNode({ label, value, depth = 0 }) {
  if (value == null || value === '') return null;

  // Render string / number / boolean primitives
  if (typeof value !== 'object') {
    return (
      <div className="py-1">
        {label && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-burgundy/60 block mb-0.5">
            {formatLabel(label)}
          </span>
        )}
        <p className="text-xs leading-relaxed text-burgundy/85 whitespace-pre-wrap font-light">
          {String(value)}
        </p>
      </div>
    );
  }

  // Render arrays
  if (Array.isArray(value)) {
    if (!value.length) return null;

    const arePrimitives = value.every(
      (item) => item == null || ['string', 'number', 'boolean'].includes(typeof item)
    );

    return (
      <div className="space-y-2 mt-2">
        {label && (
          <h4 className="text-xs font-semibold uppercase tracking-wider text-burgundy/75">
            {formatLabel(label)}
          </h4>
        )}
        {arePrimitives ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {value.filter((item) => item != null).map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-burgundy/80 bg-white/60 border border-sand-dark/40 px-3 py-1.5 rounded-xl font-light"
              >
                {String(item)}
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-2.5">
            {value.map((item, idx) => (
              <PlanNode
                key={idx}
                label={item?.title || item?.name || item?.category || item?.task || `${label} #${idx + 1}`}
                value={item}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render objects
  const entries = Object.entries(value).filter(
    ([, val]) => val != null && val !== '' && (!Array.isArray(val) || val.length > 0)
  );

  if (!entries.length) return null;

  // Root or Top-level Section
  if (depth === 0) {
    return (
      <div className="rounded-2xl border border-sand-dark/60 bg-white p-5 shadow-sm space-y-4">
        {label && (
          <div className="border-b border-sand pb-2">
            <h3 className="font-editorial text-xl sm:text-2xl text-burgundy">
              {formatLabel(label)}
            </h3>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map(([key, val]) => (
            <div key={key} className={typeof val === 'object' ? 'col-span-full' : ''}>
              <PlanNode label={key} value={val} depth={depth + 1} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Inner nested objects (Light container instead of full Card to prevent lag)
  return (
    <div className="rounded-xl bg-[#FAF7F2] border border-sand/80 p-3.5 space-y-2.5">
      {label && (
        <h5 className="font-editorial text-base text-burgundy font-medium">
          {formatLabel(label)}
        </h5>
      )}
      <div className="space-y-2">
        {entries.map(([key, val]) => (
          <PlanNode key={key} label={key} value={val} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
});

// Memoized viewer for the entire plan output
const PlanViewer = memo(function PlanViewer({ planData, cover, onSave, saving, saveError }) {
  const [activeTab, setActiveTab] = useState('blueprint');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');

  const hasBlueprint = Boolean(planData?.blueprint);
  const hasPlan = Boolean(planData?.plan);

  const currentContent = activeTab === 'blueprint' ? planData?.blueprint : planData?.plan;

  const handleCopy = async () => {
    setCopyError('');
    try {
      await navigator.clipboard.writeText(JSON.stringify(planData, null, 2));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError('Clipboard access failed. Check browser permissions and try again.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Bar with Tab switcher and Copy button */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/70 p-2 rounded-2xl border border-sand">
        <div className="flex items-center gap-1.5">
          {hasBlueprint && (
            <button
              type="button"
              onClick={() => setActiveTab('blueprint')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'blueprint'
                  ? 'bg-burgundy text-[#FDFBF7] shadow-sm'
                  : 'text-burgundy/70 hover:bg-sand/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Spatial Blueprint</span>
            </button>
          )}

          {hasPlan && (
            <button
              type="button"
              onClick={() => setActiveTab('plan')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'plan'
                  ? 'bg-burgundy text-[#FDFBF7] shadow-sm'
                  : 'text-burgundy/70 hover:bg-sand/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Execution Plan</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-[11px] text-burgundy/70 hover:text-burgundy px-3 py-1.5 rounded-lg border border-sand bg-white transition hover:border-sand-dark"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>
          <Button
            type="button"
            size="sm"
            icon={BookmarkPlus}
            loading={saving}
            disabled={saving}
            onClick={onSave}
          >
            {saving ? 'Saving Event...' : 'Add to My Events'}
          </Button>
        </div>
      </div>

      {copyError && <p role="alert" className="text-xs text-red-800">{copyError}</p>}
      {saveError && <p role="alert" className="text-xs text-red-800">{saveError}</p>}

      <Card className="overflow-hidden p-0">
        <img
          src={cover}
          alt="AI-generated event concept"
          className="h-56 w-full object-cover sm:h-72"
          loading="eager"
        />
      </Card>

      {/* Render active content */}
      <div className="space-y-4">
        {currentContent && typeof currentContent === 'object' ? (
          Object.entries(currentContent).map(([secKey, secValue]) => (
            <PlanNode key={secKey} label={secKey} value={secValue} depth={0} />
          ))
        ) : (
          <PlanNode label={activeTab} value={currentContent} depth={0} />
        )}
      </div>
    </div>
  );
});

function getPlanContent(response) {
  const blueprint = response?.blueprint || response?.data?.blueprint;
  const plan = response?.plan || response?.data?.plan;
  if (!blueprint && !plan) return null;
  return { blueprint, plan };
}

export default function AiPlannerPage() {
  const { token } = useAuth();
  const { createEvent } = useEventContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [generatedCover, setGeneratedCover] = useState('');
  const [error, setError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [form, setForm] = useState({
    type: 'Wedding Celebration',
    budget: '3500000',
    guests: '300',
    location: 'Jaipur, Rajasthan',
    date: '',
    theme: 'Royal Rajputana Floral Heritage',
  });

  const isFormValid = useMemo(() => {
    return Boolean(
      token &&
      form.type.trim() &&
      Number(form.budget) > 0 &&
      Number(form.guests) > 0
    );
  }, [token, form.budget, form.guests, form.type]);

  async function handleGenerate() {
    setLoading(true);
    setError('');

    try {
      const result = await aiApi.generatePlan(token, {
        eventType: form.type,
        budget: Number(form.budget),
        guestCount: Number(form.guests),
        location: form.location,
        date: form.date,
        description: form.theme,
      });

      const content = getPlanContent(result);
      if (!content) {
        throw new Error('The server responded without a valid plan structure. Please try again.');
      }
      setGeneratedPlan(content);
      setGeneratedCover(createEventCoverUrl({
        type: form.type,
        title: content.plan?.eventOverview?.title || form.type,
        theme: form.theme,
        location: form.location,
      }, Date.now()));
    } catch (requestError) {
      setError(requestError.message || 'Unable to generate an event plan.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSavePlan() {
    if (!form.date) {
      setSaveError('Choose an event date before adding this plan to My Events.');
      return;
    }

    setSaving(true);
    setSaveError('');
    try {
      const suggestedTitle = generatedPlan?.plan?.eventOverview?.title;
      const title = typeof suggestedTitle === 'string' && suggestedTitle.trim()
        ? suggestedTitle.trim()
        : form.type.trim();
      const eventId = await createEvent({
        title,
        type: form.type.trim(),
        date: form.date,
        location: form.location.trim(),
        guests: form.guests,
        totalBudget: form.budget,
        description: form.theme.trim(),
        cover: generatedCover,
        aiPlan: generatedPlan,
      });
      navigate(`/app/events/${eventId}`);
    } catch (saveRequestError) {
      setSaveError(saveRequestError.message || 'Unable to save this plan to My Events.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8 font-sans pb-16">
      <div>
        <h1 className="font-editorial text-3xl sm:text-4xl text-burgundy flex items-center gap-3">
          <span>AI Event Architect</span>
          <span className="text-[10px] font-sans bg-sand text-burgundy border border-sand-dark px-3 py-1 rounded-full uppercase tracking-luxury font-semibold">
            Atelier Engine
          </span>
        </h1>
        <p className="text-xs text-burgundy/70 mt-1 font-light tracking-wide">
          Synthesize full event aesthetics, food pairings, vertical timelines, and cost matrices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Parameter Controls */}
        <Card className="lg:col-span-4 sticky top-24">
          <h3 className="font-editorial text-2xl text-burgundy mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-dustyPink-dark" /> Aesthetic Parameters
          </h3>

          <div className="space-y-4">
            <Input
              label="Event Type"
              placeholder="e.g. Graduation, baby shower, product launch"
              value={form.type}
              onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
            />
            <Input
              type="number"
              min="1"
              label="Total Budget (₹ INR)"
              value={form.budget}
              onChange={(e) => setForm((prev) => ({ ...prev, budget: e.target.value }))}
            />
            <Input
              type="number"
              min="1"
              label="Guest Count"
              value={form.guests}
              onChange={(e) => setForm((prev) => ({ ...prev, guests: e.target.value }))}
            />
            <Input
              label="Destination / City"
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
            />
            <Input
              type="date"
              label="Event Date"
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
            />
            <Input
              label="Aesthetic Mood / Theme"
              value={form.theme}
              onChange={(e) => setForm((prev) => ({ ...prev, theme: e.target.value }))}
            />
            <Button
              className="w-full mt-2"
              onClick={handleGenerate}
              loading={loading}
              disabled={loading || !isFormValid}
            >
              {loading ? 'Synthesizing...' : 'Generate AI Plan ✨'}
            </Button>
          </div>
        </Card>

        {/* Right Output Area */}
        <div className="lg:col-span-8 space-y-6">
          {loading && (
            <Card className="py-20 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-burgundy border-t-transparent animate-spin mx-auto" />
              <p className="text-xs font-serif text-burgundy/75 animate-pulse">
                Orchestrating themes, floral palettes, and run-of-show fidelity...
              </p>
            </Card>
          )}

          {error && (
            <Card role="alert" className="border border-red-200 bg-red-50 text-sm text-red-900">
              {error}
            </Card>
          )}

          {!loading && !generatedPlan && !error && (
            <div className="rounded-2xl border border-dashed border-sand-dark/60 p-12 text-center text-burgundy/50">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40 text-dustyPink-dark" />
              <p className="font-editorial text-lg text-burgundy/70">Awaiting Specifications</p>
              <p className="text-xs font-light mt-1">Configure your event parameters and generate your custom architectural plan.</p>
            </div>
          )}

          {!loading && generatedPlan && (
            <PlanViewer
              planData={generatedPlan}
              cover={generatedCover}
              onSave={handleSavePlan}
              saving={saving}
              saveError={saveError}
            />
          )}
        </div>
      </div>
    </div>
  );
}