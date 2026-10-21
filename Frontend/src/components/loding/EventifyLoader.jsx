import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * @param {Function} onComplete - Callback when the curtain completes its exit
 * @param {number} duration - Total loader duration in seconds (e.g. 3 for 3 seconds)
 */
export default function EventifyLoader({ onComplete, duration = 3 }) {
  const containerRef = useRef(null);
  const mainPanelRef = useRef(null);
  const accentPanelRef = useRef(null);
  const textStageRef = useRef(null);
  const lettersRef = useRef([]);
  const glowRef = useRef(null);

  const [isInteractive, setIsInteractive] = useState(false);
  const masterTlRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  const triggerExitRef = useRef(null);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const state = useRef({
    startY: 0,
    isDragging: false,
    hasExited: false,
  });

  const brandName = "EVENTIFY";

  // Lock page scrolling while the loader is mounted
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Quick setters for smooth cursor tracking
    const xGlow = gsap.quickTo(glowRef.current, 'x', { duration: 0.8, ease: 'power3' });
    const yGlow = gsap.quickTo(glowRef.current, 'y', { duration: 0.8, ease: 'power3' });
    const tiltX = gsap.quickTo(textStageRef.current, 'rotateX', { duration: 0.5, ease: 'power2.out' });
    const tiltY = gsap.quickTo(textStageRef.current, 'rotateY', { duration: 0.5, ease: 'power2.out' });

    const handlePointerMove = (e) => {
      if (state.current.hasExited) return;

      const { innerWidth: width, innerHeight: height } = window;
      const xNorm = (e.clientX / width) - 0.5;
      const yNorm = (e.clientY / height) - 0.5;

      tiltX(-yNorm * 24);
      tiltY(xNorm * 24);
      xGlow(e.clientX);
      yGlow(e.clientY);

      if (state.current.isDragging) {
        const deltaY = Math.min(0, e.clientY - state.current.startY);
        const resistanceY = deltaY * 0.75;
        gsap.set(mainPanelRef.current, { y: resistanceY, skewY: deltaY * 0.015 });
        gsap.set(accentPanelRef.current, { y: resistanceY * 1.2, skewY: deltaY * 0.02 });
      }
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Master Entrance and Hold Timeline
    const ctx = gsap.context(() => {
      gsap.set(lettersRef.current, {
        yPercent: 120,
        opacity: 0,
        scale: 0.8,
        filter: 'blur(12px)',
      });

      const master = gsap.timeline({
        onComplete: () => {
          triggerExitRef.current?.();
        },
      });

      masterTlRef.current = master;

      // 1. Reveal typography
      master.to(lettersRef.current, {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        stagger: 0.04,
        duration: 1.2,
        ease: 'power4.out',
        onComplete: () => setIsInteractive(true),
      });

      // 2. Hold for the remaining duration before auto-exit
      const holdTime = Math.max(0.4, duration - 1.2);
      master.to({}, { duration: holdTime });
    }, containerRef);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      ctx.revert();
    };
  }, [duration]);

  // Curtain Slingshot Exit
  const triggerExit = useCallback((velocityMultiplier = 1) => {
    if (state.current.hasExited) return;
    state.current.hasExited = true;

    if (masterTlRef.current) masterTlRef.current.kill();

    const exitTl = gsap.timeline({
      onComplete: () => {
        // Restore scroll on completion
        document.body.style.overflow = '';
        if (onCompleteRef.current) onCompleteRef.current();
      },
    });

    exitTl
      // Typography scatters up
      .to(lettersRef.current, {
        yPercent: -180,
        rotateX: 45,
        opacity: 0,
        stagger: 0.02,
        duration: 0.6,
        ease: 'power4.in',
      })
      // Silk accent curtain pulls up
      .to(
        accentPanelRef.current,
        {
          yPercent: -100,
          skewY: -5,
          duration: 0.9 * velocityMultiplier,
          ease: 'expo.inOut',
        },
        '-=0.4'
      )
      // Main velvet curtain follows
      .to(
        mainPanelRef.current,
        {
          yPercent: -100,
          skewY: -5,
          duration: 1.0 * velocityMultiplier,
          ease: 'expo.inOut',
        },
        '-=0.85'
      )
      .to(
        [mainPanelRef.current, accentPanelRef.current],
        {
          skewY: 0,
          duration: 0.2,
          ease: 'power1.out',
        },
        '-=0.2'
      );
  }, []);

  useEffect(() => {
    triggerExitRef.current = triggerExit;
    return () => {
      triggerExitRef.current = null;
    };
  }, [triggerExit]);

  // Optional upward drag/flick to dismiss early
  const onPointerDown = (e) => {
    if (!isInteractive || state.current.hasExited) return;
    state.current.isDragging = true;
    state.current.startY = e.clientY;
  };

  const onPointerUp = (e) => {
    if (!state.current.isDragging || state.current.hasExited) return;
    state.current.isDragging = false;
    const deltaY = e.clientY - state.current.startY;

    if (deltaY < -60) {
      triggerExit(0.85);
    } else {
      gsap.to([mainPanelRef.current, accentPanelRef.current], {
        y: 0,
        skewY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.45)',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className={`fixed inset-0 z-[100] w-screen h-screen overflow-hidden select-none touch-none ${
        isInteractive ? 'cursor-grab active:cursor-grabbing' : 'cursor-wait'
      }`}
    >
      {/* Silk Accent Panel */}
      <div
        ref={accentPanelRef}
        className="absolute inset-0 bg-[#A68A68] will-change-transform"
        style={{ transformOrigin: '0% 0%' }}
      />

      {/* Main Velvet Panel */}
      <div
        ref={mainPanelRef}
        className="absolute inset-0 bg-[#25060D] flex flex-col items-center justify-center will-change-transform"
        style={{ transformOrigin: '0% 0%' }}
      >
        {/* Glow Halo */}
        <div
          ref={glowRef}
          className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 blur-[90px]"
          style={{
            background: 'radial-gradient(circle, rgba(166,138,104,0.45) 0%, rgba(94,18,34,0.6) 50%, transparent 70%)',
          }}
        />

        {/* Brand Letters Stage */}
        <div
          ref={textStageRef}
          className="relative z-10 flex flex-col items-center [perspective:1200px] [transform-style:preserve-3d]"
        >
          <h1 className="font-['Italiana'] text-3xl sm:text-5xl md:text-6xl text-[#F8EFEA] tracking-[0.45em] pl-[0.45em] uppercase font-normal flex overflow-hidden py-2 select-none">
            {brandName.split('').map((char, index) => (
              <span
                key={index}
                ref={(el) => (lettersRef.current[index] = el)}
                className="inline-block transform-gpu will-change-transform"
              >
                {char}
              </span>
            ))}
          </h1>

          <div className="w-12 h-[1px] bg-[#A68A68]/50 mt-4" />
        </div>
      </div>
    </div>
  );
}