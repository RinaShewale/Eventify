import { Inbox } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ icon: Icon = Inbox, title = 'No data yet', description = 'Get started by creating something.', action, actionLabel = 'Create', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <Icon size={28} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2 font-display">{title}</h3>
      <p className="text-gray-500 max-w-sm mb-6">{description}</p>
      {action && <Button onClick={action}>{actionLabel}</Button>}
    </div>
  );
}
