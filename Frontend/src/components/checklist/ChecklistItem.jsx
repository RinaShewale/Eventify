import { useRef } from 'react';
import gsap from 'gsap';
import { Check } from 'lucide-react';
import Badge from '../ui/Badge';

export default function ChecklistItem({ item, onToggle, className = '' }) {
  const checkRef = useRef(null);
  const textRef = useRef(null);

  const priorityColors = {
    high: 'danger',
    medium: 'warning',
    low: 'success',
  };

  const handleToggle = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced && checkRef.current) {
      gsap.fromTo(
        checkRef.current,
        { scale: 0.5 },
        { scale: 1, duration: 0.3, ease: 'back.out(2)' }
      );
    }
    if (!prefersReduced && textRef.current) {
      gsap.to(textRef.current, {
        opacity: !item.completed ? 0.5 : 1,
        duration: 0.3,
      });
    }
    onToggle?.(item.id);
  };

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:shadow-soft transition-all duration-300 ${className}`}>
      <button
        ref={checkRef}
        onClick={handleToggle}
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          item.completed
            ? 'bg-primary-500 border-primary-500 text-white'
            : 'border-gray-300 hover:border-primary-400'
        }`}
        aria-label={`Mark "${item.title}" as ${item.completed ? 'incomplete' : 'complete'}`}
      >
        {item.completed && <Check size={14} strokeWidth={3} />}
      </button>

      <div ref={textRef} className={`flex-1 min-w-0 ${item.completed ? 'opacity-50' : ''}`}>
        <p className={`font-medium text-gray-800 ${item.completed ? 'line-through' : ''}`}>{item.title}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-xs text-gray-400">{item.timing}</span>
          <Badge variant={priorityColors[item.priority]} className="text-[10px]">
            {item.priority}
          </Badge>
          <span className="text-xs text-gray-400">{item.category}</span>
        </div>
      </div>
    </div>
  );
}
