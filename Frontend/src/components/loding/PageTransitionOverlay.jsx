import React, { useRef } from 'react';
import gsap from 'gsap';

export const transitionContext = {
  navigateWithTransition: null,
};

export default function PageTransitionOverlay({ children }) {
  const overlayRef = useRef(null);
  const primaryCurtainRef = useRef(null);
  const secondaryCurtainRef = useRef(null);
  const contentWrapperRef = useRef(null);

  // Function to run the angled wipe transition
  const triggerTransition = (actionCallback) => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
    });

    tl
      // 1. Current page zooms back subtly and blurs (as seen in screenshot 2)
      .to(contentWrapperRef.current, {
        scale: 0.94,
        opacity: 0.4,
        filter: 'blur(8px)',
        duration: 0.5,
        ease: 'power2.in',
      })
      // 2. Angled double-curtain sweeps down from top across the screen
      .set(overlayRef.current, { pointerEvents: 'auto', display: 'block' }, 0)
      .fromTo(
        secondaryCurtainRef.current,
        { yPercent: -120, skewY: -6 },
        { yPercent: 0, skewY: 0, duration: 0.75 },
        0.1
      )
      .fromTo(
        primaryCurtainRef.current,
        { yPercent: -120, skewY: -6 },
        { yPercent: 0, skewY: 0, duration: 0.75 },
        0.2
      )
      // 3. Switch the route / component content behind the curtain
      .add(() => {
        if (actionCallback) actionCallback();
      })
      // 4. Curtains sweep down out of view, revealing the next page
      .to(primaryCurtainRef.current, {
        yPercent: 120,
        skewY: 6,
        duration: 0.8,
      })
      .to(
        secondaryCurtainRef.current,
        {
          yPercent: 120,
          skewY: 6,
          duration: 0.8,
        },
        '-=0.7'
      )
      // 5. Incoming page scales up from depth to full crisp view
      .fromTo(
        contentWrapperRef.current,
        { scale: 1.05, opacity: 0, filter: 'blur(10px)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .set(overlayRef.current, { pointerEvents: 'none', display: 'none' });
  };

  // Expose transition to global dispatcher
  transitionContext.navigateWithTransition = triggerTransition;

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#FDFBF7]">
      {/* Dynamic Content Container */}
      <div ref={contentWrapperRef} className="w-full min-h-screen will-change-transform">
        {children}
      </div>

      {/* Screen-Wiping Angled Overlays */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] pointer-events-none hidden overflow-hidden"
      >
        {/* Layer 1: Rose Gold / Champagne Accent trailing edge */}
        <div
          ref={secondaryCurtainRef}
          className="absolute -top-[20%] -left-[10%] w-[120%] h-[140%] bg-[#D8B4A6] origin-top will-change-transform"
        />

        {/* Layer 2: Main Brand Burgundy Velvet Curtain */}
        <div
          ref={primaryCurtainRef}
          className="absolute -top-[20%] -left-[10%] w-[120%] h-[140%] bg-[#4A1521] origin-top flex items-center justify-center will-change-transform shadow-2xl"
        >
          {/* Subtle Monogram or watermark inside transition */}
          <span className="font-serif italic text-3xl sm:text-5xl text-[#FDFBF7]/20 tracking-wider">
            Événement
          </span>
        </div>
      </div>
    </div>
  );
}