import { useCountAnimation } from '../../hooks/useAnimations';

export default function StatCard({ title, value, icon: Icon, prefix = '', suffix = '', color = 'primary', trend, className = '' }) {
  const countRef = useCountAnimation(typeof value === 'number' ? value : 0);
  const colorMap = {
    primary: 'bg-primary-50 text-primary-500',
    secondary: 'bg-secondary-50 text-secondary-500',
    success: 'bg-success-50 text-success-500',
    warning: 'bg-warning-50 text-warning-500',
  };

  return (
    <div className={`card group ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <div className="flex items-baseline gap-1">
            {prefix && <span className="text-lg font-semibold text-gray-700">{prefix}</span>}
            <span ref={countRef} className="text-2xl font-bold text-gray-900 font-display">
              {typeof value === 'number' ? '0' : value}
            </span>
            {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
          </div>
          {trend && (
            <p className={`text-xs font-medium ${trend > 0 ? 'text-success-500' : 'text-danger-500'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]} transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
