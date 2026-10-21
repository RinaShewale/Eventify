import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: 'bg-success-50 border-success-400 text-success-600',
  error: 'bg-danger-50 border-danger-400 text-danger-600',
  info: 'bg-blue-50 border-blue-400 text-blue-600',
};

function Toast({ toast, onRemove }) {
  const ref = useRef(null);
  const Icon = icons[toast.type] || Info;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' });
  }, []);

  const handleClose = () => {
    const el = ref.current;
    gsap.to(el, {
      opacity: 0,
      x: 60,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => onRemove(toast.id),
    });
  };

  useEffect(() => {
    const timer = setTimeout(handleClose, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-soft min-w-[300px] max-w-[420px] ${colors[toast.type]}`}
      role="alert"
    >
      <Icon size={18} />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button onClick={handleClose} className="opacity-60 hover:opacity-100 transition-opacity" aria-label="Close notification">
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
