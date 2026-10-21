import { useRef } from 'react';
import gsap from 'gsap';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  loading = false,
  ...props
}) {
  const btnRef = useRef(null);

  // Magnetic interactive effect
  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.22,
      y: y * 0.22,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1.1, 0.4)',
    });
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-sans text-center font-medium uppercase tracking-luxury transition-all duration-300 select-none cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2 focus-visible:ring-offset-creme disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "border border-burgundy bg-burgundy text-creme shadow-[0_14px_32px_-14px_rgba(77,14,19,0.75)] hover:-translate-y-0.5 hover:border-burgundy-light hover:bg-burgundy-light hover:shadow-[0_20px_38px_-14px_rgba(77,14,19,0.55)] active:translate-y-0 active:scale-[0.98]",
    secondary:
      "border border-dustyPink-dark/30 bg-dustyPink text-burgundy shadow-sm hover:-translate-y-0.5 hover:border-dustyPink-dark/50 hover:bg-dustyPink-light hover:shadow-md active:translate-y-0 active:scale-[0.98]",
    outline:
      "border border-burgundy/30 bg-creme/40 text-burgundy backdrop-blur-sm hover:-translate-y-0.5 hover:border-burgundy hover:bg-burgundy hover:text-creme hover:shadow-md active:translate-y-0 active:scale-[0.98]",
    ghost:
      "border border-transparent bg-transparent text-burgundy hover:bg-burgundy/5 active:scale-[0.98]",
    sand:
      "border border-sand-dark/30 bg-sand text-burgundy-dark shadow-sm hover:-translate-y-0.5 hover:bg-sand-light hover:shadow-md active:translate-y-0 active:scale-[0.98]",
  };

  const sizes = {
    sm: "text-[10px] px-4 py-2 gap-1.5",
    md: "text-xs px-6 py-3 gap-2",
    lg: "text-sm px-8 py-4 gap-2.5 font-semibold",
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : Icon ? (
        <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
      ) : null}
      <span className="relative z-10">{children}</span>
    </button>
  );
}