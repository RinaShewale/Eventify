import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

export default function Modal({ isOpen, onClose, title, children }) {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: 'power2.out' }
        );
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.92, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)' }
        );
      });
      return () => ctx.revert();
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 15,
      duration: 0.25,
      ease: 'power2.in',
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-burgundy-dark/40 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        className="bg-creme-50/95 border border-sand/80 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative"
      >
        <div className="flex items-center justify-between pb-4 border-b border-sand/40">
          <h3 className="font-editorial text-2xl text-burgundy">{title}</h3>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-sand/30 hover:bg-burgundy hover:text-creme flex items-center justify-center transition-all duration-300 text-burgundy cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="pt-6">{children}</div>
      </div>
    </div>
  );
}