import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ items, className = '' }) {
  const timelineRef = useRef(null);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const entries = el.querySelectorAll('.timeline-entry');
    entries.forEach((entry, index) => {
      gsap.fromTo(
        entry,
        { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [items]);

  return (
    <div ref={timelineRef} className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-secondary-300 to-primary-300 rounded-full" />

      <div className="space-y-6">
        {items.map((item, index) => {
          const isCompleted = item.completed !== undefined ? item.completed : false;
          return (
            <div key={index} className="timeline-entry relative flex gap-5 pl-2">
              {/* Dot */}
              <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                isCompleted
                  ? 'bg-primary-500 border-primary-500 text-white'
                  : 'bg-white border-gray-200 text-gray-400'
              }`}>
                {isCompleted ? <Check size={16} /> : <Clock size={16} />}
              </div>

              {/* Content */}
              <div className="flex-1 card !p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 font-display">{item.task || item.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                  <span className="text-xs text-primary-500 font-semibold whitespace-nowrap ml-3">{item.time || item.timing}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
