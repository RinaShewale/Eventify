export default function Badge({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
  };

  return (
    <span className={`badge ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </span>
  );
}
