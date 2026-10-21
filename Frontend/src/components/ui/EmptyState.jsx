import Button from './Button';

export default function EmptyState({ icon: Icon, title, description, actionText, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-14 glass-panel rounded-3xl border border-dashed border-sand">
      <div className="w-16 h-16 rounded-2xl bg-dustyPink/25 text-burgundy flex items-center justify-center mb-5 shadow-inner">
        {Icon && <Icon className="w-8 h-8" />}
      </div>
      <h3 className="font-editorial text-2xl text-burgundy mb-2">{title}</h3>
      <p className="text-xs text-burgundy/70 max-w-sm mb-6 font-sans leading-relaxed tracking-wide">
        {description}
      </p>
      {actionText && (
        <Button onClick={onAction} size="sm" variant="primary">
          {actionText}
        </Button>
      )}
    </div>
  );
}