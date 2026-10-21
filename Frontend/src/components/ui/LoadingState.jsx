import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Loading...', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <Loader2 size={36} className="text-primary-400 animate-spin mb-4" />
      <p className="text-gray-500 font-medium">{message}</p>
    </div>
  );
}
