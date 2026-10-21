import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-danger-500 hover:bg-danger-600 transition-all duration-300 shadow-sm hover:shadow-md',
  outline: 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-300',
};

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: '',
  lg: 'text-lg px-8 py-4',
};

const Button = forwardRef(({ children, variant = 'primary', size = 'md', loading = false, disabled = false, className = '', icon: Icon, iconRight: IconRight, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`${variants[variant]} ${sizes[size]} ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : Icon && <Icon size={18} />}
      {children}
      {IconRight && !loading && <IconRight size={18} />}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
