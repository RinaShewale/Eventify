import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function EventifyLoader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const lettersRef = useRef([]);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const brandName = "EVENTIFY";

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        },
      });

      // Initial state
      gsap.set(lettersRef.current, {
        y: 20,
        opacity: 0,
        filter: 'blur(10px)',
      });

      // 1. Letters emerge sequentially with optical blur clearing
      tl.to(lettersRef.current, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.05,
        duration: 0.9,
        ease: 'power3.out',
      })
      // 2. Subtle luxury breathing expansion
      .to(
        textRef.current,
        {
          letterSpacing: '0.65em',
          duration: 1.1,
          ease: 'power1.inOut',
        },
        '-=0.3'
      )
      // 3. Letters dissolve into soft light
      .to(lettersRef.current, {
        opacity: 0,
        y: -15,
        filter: 'blur(8px)',
        stagger: 0.02,
        duration: 0.5,
        ease: 'power2.in',
      })
      // 4. THE TRANSITION: Smooth circular/oval iris unmasking from center
      .to(
        containerRef.current,
        {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 1.1,
          ease: 'expo.inOut',
        },
        '-=0.15'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        clipPath: 'circle(150% at 50% 50%)',
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#340c15] select-none pointer-events-auto will-change-[clip-path]"
    >
      {/* Subtle deep-wine atmospheric lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(88, 18, 33, 0.6) 0%, rgba(52, 12, 21, 1) 70%)',
        }}
      />

      {/* Small, Elegant Centered Typography */}
      <h1
        ref={textRef}
        className="relative z-10 font-['Italiana'] text-sm sm:text-base md:text-lg text-[#F5ECE5] uppercase tracking-[0.45em] pl-[0.45em] font-normal"
      >
        {brandName.split('').map((char, index) => (
          <span
            key={index}
            ref={(el) => (lettersRef.current[index] = el)}
            className="inline-block transform-gpu will-change-[transform,filter,opacity]"
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}