import { useRef } from 'react';
import gsap from 'gsap';

export default function Card({ children, className = '', hover = true, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!hover || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    if (!hover || !cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
      className={`glass-card rounded-2xl p-6 shadow-luxury border border-sand/40 transition-shadow duration-500 hover:shadow-luxury-hover hover:border-dustyPink/60 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}