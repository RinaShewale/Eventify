import React, { useRef, useEffect } from 'react';
import { useEventContext } from '../../context/EventContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import gsap from 'gsap';

function ToastItem({ toast, onRemove }) {
  const itemRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      itemRef.current,
      { opacity: 0, x: 40, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: 'back.out(1.2)' }
    );
  }, []);

  const handleDismiss = () => {
    gsap.to(itemRef.current, {
      opacity: 0,
      x: 30,
      scale: 0.9,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => onRemove(toast.id),
    });
  };

  const isSuccess = toast.type === 'success';
  const isInfo = toast.type === 'info';

  return (
    <div
      ref={itemRef}
      className="pointer-events-auto flex items-center gap-3.5 bg-creme-50/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-luxury border border-sand/60 min-w-[300px]"
    >
      {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />}
      {isInfo && <Info className="w-5 h-5 text-dustyPink-dark shrink-0" />}
      {!isSuccess && !isInfo && <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />}

      <p className="text-xs font-sans font-medium text-burgundy flex-1 leading-snug">
        {toast.message}
      </p>
      <button
        onClick={handleDismiss}
        className="text-burgundy/40 hover:text-burgundy transition-colors p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function Toast() {
  const { toasts, removeToast } = useEventContext();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}