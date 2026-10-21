import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function usePageEntrance(deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, deps);

  return containerRef;
}

export function useStaggerAnimation(selector, deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const children = el.querySelectorAll(selector);
    if (children.length === 0) return;

    gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      }
    );
  }, deps);

  return containerRef;
}

export function useHoverAnimation() {
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const onEnter = () => {
      gsap.to(el, { y: -4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.12)', duration: 0.3, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to(el, { y: 0, boxShadow: '0 2px 15px -3px rgba(0,0,0,0.07)', duration: 0.3, ease: 'power2.out' });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return elRef;
}

export function useCountAnimation(targetValue, duration = 1.5) {
  const ref = useRef(null);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      el.textContent = targetValue.toLocaleString('en-IN');
      return;
    }

    gsap.to(countRef.current, {
      value: targetValue,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.round(countRef.current.value).toLocaleString('en-IN');
      },
    });
  }, [targetValue, duration]);

  return ref;
}
