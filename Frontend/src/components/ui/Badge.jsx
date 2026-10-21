
export default function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const styles = {
    default: "bg-sand/30 text-burgundy border-sand/60",
    burgundy: "bg-burgundy text-creme border-burgundy",
    dusty: "bg-dustyPink/25 text-burgundy-dark border-dustyPink/50",
    success: "bg-emerald-900/10 text-emerald-800 border-emerald-700/20",
    warning: "bg-amber-900/10 text-amber-800 border-amber-700/20",
    danger: "bg-red-900/10 text-red-800 border-red-700/20",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3.5 py-1 text-xs",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border font-sans font-medium uppercase tracking-luxury backdrop-blur-sm ${styles[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}