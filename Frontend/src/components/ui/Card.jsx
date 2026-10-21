export default function Card({ children, className = '', hover = true, glass = false, ...props }) {
  return (
    <div
      className={`${glass ? 'card-glass' : 'card'} ${!hover ? 'hover:shadow-soft' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
