import { Phone, Mail, Star, MoreVertical } from 'lucide-react';
import Badge from '../ui/Badge';
import { useState } from 'react';

export default function VendorCard({ vendor, onEdit, onDelete, className = '' }) {
  const [showMenu, setShowMenu] = useState(false);

  const statusColors = {
    paid: 'success',
    partial: 'warning',
    pending: 'danger',
  };

  const statusLabels = {
    paid: 'Paid',
    partial: 'Partial',
    pending: 'Pending',
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className={`card group ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 font-display">{vendor.name}</h3>
          <Badge variant="secondary" className="mt-1">{vendor.category}</Badge>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Vendor options"
          >
            <MoreVertical size={16} className="text-gray-400" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-soft-lg border border-gray-100 py-1 w-32 z-10">
              <button
                onClick={() => { setShowMenu(false); onEdit?.(vendor); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => { setShowMenu(false); onDelete?.(vendor); }}
                className="w-full text-left px-4 py-2 text-sm text-danger-500 hover:bg-danger-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Phone size={14} />
          <span>{vendor.contact}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Mail size={14} />
          <span>{vendor.email}</span>
        </div>
        {vendor.rating && (
          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-warning-400 fill-warning-400" />
            <span className="text-sm font-medium text-gray-700">{vendor.rating}</span>
          </div>
        )}
      </div>

      {vendor.notes && (
        <p className="text-xs text-gray-400 mb-4 line-clamp-2">{vendor.notes}</p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-lg font-bold text-gray-900 font-display">{formatCurrency(vendor.quote)}</span>
        <Badge variant={statusColors[vendor.paymentStatus]}>
          {statusLabels[vendor.paymentStatus]}
        </Badge>
      </div>
    </div>
  );
}
