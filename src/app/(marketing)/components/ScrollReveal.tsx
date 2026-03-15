"use client";

import React, { useEffect, useRef } from 'react';

/**
 * ScrollReveal — wraps a section and triggers a fade-up animation
 * the first time it enters the viewport.
 *
 * @param delay - staggered delay in ms (e.g. 0, 100, 200, 300)
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply initial hidden state immediately (avoids SSR flash)
    el.classList.add('section-hidden');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small timeout allows stagger delay to work properly
          setTimeout(() => {
            el.style.animationDelay = `${delay}ms`;
            el.classList.remove('section-hidden');
            el.classList.add('section-visible');
          }, delay);
          observer.disconnect();
        }
      },
      {
        // Trigger when at least 8% of the element is visible
        threshold: 0.08,
        // Start watching a bit before element enters viewport
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
