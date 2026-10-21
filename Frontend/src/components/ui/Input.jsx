
export default function Input({ label, error, icon: Icon, className = '', ...props }) {
  return (
    <div className="w-full text-left space-y-1.5 font-sans">
      {label && (
        <label className="block text-[11px] font-medium tracking-luxury uppercase text-burgundy/70">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-4 w-4 h-4 text-dustyPink-dark" />}
        <input
          className={`w-full bg-creme-50/70 border ${
            error
              ? 'border-red-400 focus:ring-red-400/20'
              : 'border-sand hover:border-dustyPink focus:border-burgundy'
          } rounded-xl px-4 py-3 text-sm text-burgundy placeholder:text-burgundy/30 outline-none transition-all duration-300 focus:ring-2 focus:ring-burgundy/15 backdrop-blur-sm ${
            Icon ? 'pl-11' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] text-red-600 tracking-wide font-medium">{error}</p>}
    </div>
  );
}