import React, { useEffect, useRef, useState } from 'react';

/**
 * RevealOnScroll wrapper component for smooth on-scroll entrance animations.
 * Supports direction: 'up' | 'down' | 'left' | 'right' | 'zoom'
 */
export default function RevealOnScroll({
  children,
  className = '',
  animation = 'up',
  delay = 0,
  duration = 700,
  threshold = 0.15
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  const getInitialStyle = () => {
    switch (animation) {
      case 'left':
        return 'translate-x-12 opacity-0';
      case 'right':
        return '-translate-x-12 opacity-0';
      case 'zoom':
        return 'scale-95 opacity-0';
      case 'down':
        return '-translate-y-12 opacity-0';
      case 'up':
      default:
        return 'translate-y-12 opacity-0';
    }
  };

  const getVisibleStyle = () => {
    switch (animation) {
      case 'zoom':
        return 'scale-100 opacity-100';
      default:
        return 'translate-x-0 translate-y-0 opacity-100';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out transform ${
        isVisible ? getVisibleStyle() : getInitialStyle()
      } ${className}`}
    >
      {children}
    </div>
  );
}
