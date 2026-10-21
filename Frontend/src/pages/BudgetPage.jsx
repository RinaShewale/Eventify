import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import ProgressBar from '../components/ui/ProgressBar';
import { Plus } from 'lucide-react';

export default function BudgetPage() {
  const { activeEvent, budgetCategories, addBudgetItem } = useEventContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ category: '', allocated: '', spent: '', notes: '' });

  const totalAllocated = budgetCategories.reduce((acc, c) => acc + Number(c.allocated), 0);
  const totalSpent = budgetCategories.reduce((acc, c) => acc + Number(c.spent), 0);
  const remaining = activeEvent.totalBudget - totalSpent;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.category) return;
    addBudgetItem(newItem);
    setNewItem({ category: '', allocated: '', spent: '', notes: '' });
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-burgundy">Capital & Budget</h1>
          <p className="text-xs text-burgundy/70 mt-1 font-light tracking-wide">
            Precision financial discipline for {activeEvent.title}.
          </p>
        </div>
        <Button icon={Plus} onClick={() => setModalOpen(true)}>Add Allocation</Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <span className="text-[10px] font-semibold uppercase tracking-luxury text-burgundy/60">Total Target</span>
          <p className="font-editorial text-3xl text-burgundy mt-1">
            ₹{(activeEvent.totalBudget).toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-burgundy/50">Approved Cap</span>
        </Card>

        <Card>
          <span className="text-[10px] font-semibold uppercase tracking-luxury text-burgundy/60">Total Committed</span>
          <p className="font-editorial text-3xl text-burgundy mt-1">
            ₹{totalAllocated.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-dustyPink-dark font-medium">
            {Math.round((totalAllocated / activeEvent.totalBudget) * 100)}% Allocated
          </span>
        </Card>

        <Card>
          <span className="text-[10px] font-semibold uppercase tracking-luxury text-burgundy/60">Liquid Reserve</span>
          <p className="font-editorial text-3xl text-emerald-800 mt-1">
            ₹{remaining.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-emerald-700 font-medium">Safe Cushion</span>
        </Card>
      </div>

      {/* Category Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgetCategories.map((cat) => (
          <Card key={cat.id} hover>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-editorial text-xl text-burgundy">{cat.category}</h3>
              <span className="text-xs font-semibold text-burgundy">
                ₹{(Number(cat.spent)).toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-[11px] text-burgundy/60 font-light mb-5">{cat.notes || 'General allocation'}</p>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-medium text-burgundy/70">
                <span>Spent: ₹{(Number(cat.spent)).toLocaleString('en-IN')}</span>
                <span>Cap: ₹{(Number(cat.allocated)).toLocaleString('en-IN')}</span>
              </div>
              <ProgressBar value={cat.spent} max={cat.allocated} />
            </div>
          </Card>
        ))}
      </div>

      {/* Add Category Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="New Allocation Ledger">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            label="Category Name"
            placeholder="e.g. Vintage Limousines"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            required
          />
          <Input
            type="number"
            label="Allocated Cap (₹ INR)"
            placeholder="e.g. 200000"
            value={newItem.allocated}
            onChange={(e) => setNewItem({ ...newItem, allocated: e.target.value })}
            required
          />
          <Input
            type="number"
            label="Current Draw (₹ INR)"
            placeholder="e.g. 150000"
            value={newItem.spent}
            onChange={(e) => setNewItem({ ...newItem, spent: e.target.value })}
          />
          <Input
            label="Artisan / Contract Reference"
            placeholder="e.g. Fleet deposit for wedding party"
            value={newItem.notes}
            onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
          />
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Commit Allocation</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}