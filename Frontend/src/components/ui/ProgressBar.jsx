import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ProgressBar({ value = 0, max = 100, className = '' }) {
  const barRef = useRef(null);
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${percentage}%`,
        duration: 1.2,
        ease: 'power3.out',
      });
    }
  }, [percentage]);

  return (
    <div className={`w-full bg-sand/30 h-2 rounded-full overflow-hidden p-0.5 border border-sand/40 ${className}`}>
      <div
        ref={barRef}
        className="h-full rounded-full bg-gradient-to-r from-dustyPink via-burgundy to-burgundy-light shadow-sm"
        style={{ width: '0%' }}
      />
    </div>
  );
}