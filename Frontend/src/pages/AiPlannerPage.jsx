import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import { Sparkles, Utensils, Music, Palette, Clock, Lightbulb } from 'lucide-react';

export default function AiPlannerPage() {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(true);

  const [form, setForm] = useState({
    type: 'Wedding Celebration',
    budget: '3500000',
    guests: '300',
    location: 'Jaipur, Rajasthan',
    theme: 'Royal Rajputana Floral Heritage',
  });

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1800);
  };

  return (
    <div className="space-y-8 font-sans">
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
        {/* Left Side: Parameters Panel */}
        <Card className="lg:col-span-4 sticky top-24">
          <h3 className="font-editorial text-2xl text-burgundy mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-dustyPink-dark" /> Aesthetic Parameters
          </h3>

          <div className="space-y-4">
            <Select
              label="Celebration Style"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              options={['Wedding Celebration', 'Luxury Cocktail Gala', 'Milestone Birthday', 'Corporate Retreat']}
            />
            <Input
              label="Total Budget (₹ INR)"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
            />
            <Input
              label="Guest Count"
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
            />
            <Input
              label="Destination / City"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <Input
              label="Aesthetic Mood / Theme"
              value={form.theme}
              onChange={(e) => setForm({ ...form, theme: e.target.value })}
            />

            <Button
              className="w-full mt-2"
              onClick={handleGenerate}
              loading={loading}
            >
              {loading ? 'Synthesizing...' : 'Generate AI Plan ✨'}
            </Button>
          </div>
        </Card>

        {/* Right Side: Generated Blueprint */}
        <div className="lg:col-span-8 space-y-6">
          {loading ? (
            <Card className="py-24 text-center">
              <div className="w-14 h-14 rounded-full border-2 border-burgundy border-t-transparent animate-spin mx-auto mb-5" />
              <h3 className="font-editorial text-2xl text-burgundy">Curating your bespoke blueprint...</h3>
              <p className="text-xs text-burgundy/60 mt-1 max-w-sm mx-auto font-light leading-relaxed">
                Formulating local artisan quotes, sensory acoustic lighting, and multi-course culinary tastings.
              </p>
            </Card>
          ) : generated ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Executive Overview Card */}
              <Card className="bg-creme-50 border-sand">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="burgundy">AI Architectural Blueprint</Badge>
                  <span className="text-[10px] uppercase tracking-luxury text-burgundy/60 font-medium">Confidence: 99.4%</span>
                </div>
                <h2 className="font-editorial text-3xl text-burgundy mb-2">
                  The Celestial Lotus Palace Gala
                </h2>
                <p className="text-xs text-burgundy/75 leading-relaxed font-light">
                  A synthesis of historical Rajasthani grandeur with minimalist raw silk drapes, warm antique brass luminaries, and dynamic sitar-ambient soundscapes designed for 300 guests.
                </p>
              </Card>

              {/* Ideas Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-5">
                  <Palette className="w-5 h-5 text-dustyPink-dark mb-2" />
                  <h4 className="font-editorial text-lg text-burgundy mb-1">Botanical Vibe</h4>
                  <p className="text-[11px] text-burgundy/70 leading-relaxed font-light">
                    Marigold chandeliers, floating lotus bowls, and ivory canopy drapes.
                  </p>
                </Card>

                <Card className="p-5">
                  <Utensils className="w-5 h-5 text-dustyPink-dark mb-2" />
                  <h4 className="font-editorial text-lg text-burgundy mb-1">Culinary Atelier</h4>
                  <p className="text-[11px] text-burgundy/70 leading-relaxed font-light">
                    Slow-cooked royal thal, artisanal live chaat, and saffron-infused desserts.
                  </p>
                </Card>

                <Card className="p-5">
                  <Music className="w-5 h-5 text-dustyPink-dark mb-2" />
                  <h4 className="font-editorial text-lg text-burgundy mb-1">Sensory Audio</h4>
                  <p className="text-[11px] text-burgundy/70 leading-relaxed font-light">
                    Acoustic clarinet and sitar welcome shifting into modern lounge-Sufi grooves.
                  </p>
                </Card>
              </div>

              {/* Master Run-of-Show */}
              <Card>
                <h3 className="font-editorial text-2xl text-burgundy mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-dustyPink-dark" /> Master Run-of-Show
                </h3>

                <div className="space-y-6 relative border-l border-sand ml-3 pl-6">
                  {[
                    { time: "05:30 PM", title: "Sunset Guest Welcome & Clarinet Duet", desc: "Welcome refreshments served in crystal coupes with chilled scented linens." },
                    { time: "07:00 PM", title: "Ceremonial Courtyard Entrance", desc: "Brass lanterns illuminated with synchronized atmospheric low-level haze." },
                    { time: "08:30 PM", title: "Curated 5-Course Banquet Service", desc: "Plated multi-course dinner paired with an ambient acoustic playlist." },
                    { time: "10:30 PM", title: "Live Fusion Ensemble & Midnight Toast", desc: "Stage illumination shifts to warm deep burgundy and amber tones." },
                  ].map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-burgundy border-2 border-creme" />
                      <span className="text-[10px] font-semibold text-burgundy/60 tracking-luxury uppercase">{step.time}</span>
                      <h4 className="font-editorial text-lg text-burgundy mt-0.5">{step.title}</h4>
                      <p className="text-xs text-burgundy/70 mt-1 font-light">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recommendation Note */}
              <div className="p-4 rounded-2xl bg-dustyPink/20 border border-dustyPink/40 flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-burgundy tracking-wide uppercase">Director's Advisory</h4>
                  <p className="text-[11px] text-burgundy/80 leading-relaxed mt-0.5 font-light">
                    For 300 guests in Jaipur during November, early confirmation of heritage vintage automobiles for arrival is advised 6 weeks in advance to preserve priority allocations.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}