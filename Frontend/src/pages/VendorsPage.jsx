import { useState } from 'react';
import { useEventContext } from '../hooks/useEventContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { Plus, Phone, Trash2 } from 'lucide-react';

export default function VendorsPage() {
  const { vendors, addVendor, deleteVendor, activeEvent, events } = useEventContext();
  const [filter, setFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', category: 'Catering', contact: '', quote: '', status: 'Pending', notes: '' });

  const categories = ['All', 'Venue', 'Catering', 'Photography', 'Decoration', 'Music'];

  const filtered = filter === 'All' ? vendors : vendors.filter((v) => v.category === filter);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    setSaving(true);
    setError('');
    try {
      await addVendor({ ...form, quote: Number(form.quote) || 0 });
      setForm({ name: '', category: 'Catering', contact: '', quote: '', status: 'Pending', notes: '' });
      setModalOpen(false);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-burgundy">Artisan & Vendor Vault</h1>
          <p className="text-xs text-burgundy/70 mt-1 font-light tracking-wide">
            Verified partners, contract milestones, and quotes.
          </p>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)} disabled={!activeEvent.id}>Register Artisan</Button>
      </div>

      {events.length === 0 && (
        <Card className="text-sm text-burgundy/70">Create an event before registering vendors.</Card>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-5 py-2 rounded-full text-xs font-medium tracking-luxury uppercase transition-all duration-300 cursor-pointer ${
              filter === c 
                ? 'bg-burgundy text-creme shadow-sm' 
                : 'bg-creme-50 border border-sand text-burgundy/70 hover:border-burgundy'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((vendor) => (
          <Card key={vendor.id} hover className="flex flex-col justify-between border border-sand/60">
            <div>
              <div className="flex justify-between items-start mb-3">
                <Badge variant={vendor.status === 'Paid' ? 'success' : vendor.status === 'Partial' ? 'warning' : 'danger'}>
                  {vendor.status}
                </Badge>
                <span className="text-[10px] uppercase tracking-luxury font-semibold text-burgundy/50">{vendor.category}</span>
              </div>

              <h3 className="font-editorial text-2xl text-burgundy mb-1">{vendor.name}</h3>
              <p className="text-xs text-burgundy/70 mb-4 flex items-center gap-2 font-light">
                <Phone className="w-3.5 h-3.5 text-dustyPink-dark" />
                <span>{vendor.contact}</span>
              </p>

              {vendor.notes && (
                <p className="text-[11px] text-burgundy/80 bg-creme-50/80 p-3 rounded-xl border border-sand/40 mb-4 font-light leading-relaxed">
                  {vendor.notes}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-sand/40 flex justify-between items-center">
              <div>
                <span className="text-[9px] uppercase tracking-luxury text-burgundy/50 font-semibold block">Quoted Amount</span>
                <span className="font-editorial text-lg text-burgundy">
                  ₹{(vendor.quote).toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={() => deleteVendor(vendor.id)}
                className="text-burgundy/40 hover:text-red-700 p-2 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Vendor Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register Artisan">
        <form onSubmit={handleAdd} className="space-y-4">
          {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-xs text-red-800">{error}</p>}
          <Input
            label="Agency / Artisan Name"
            placeholder="e.g. Royal Clarinet Orchestra"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Domain"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              options={['Venue', 'Catering', 'Photography', 'Decoration', 'Music', 'Other']}
            />
            <Select
              label="Disbursement Status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              options={['Pending', 'Partial', 'Paid']}
            />
          </div>
          <Input
            label="Contact Details"
            placeholder="e.g. +91 98765 43210"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
          <Input
            type="number"
            label="Quoted Amount (₹ INR)"
            placeholder="e.g. 350000"
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
          />
          <Input
            label="Contract Milestones"
            placeholder="e.g. Acoustic riders finalized for Oct 20"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving} disabled={saving}>Commit Registration</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}