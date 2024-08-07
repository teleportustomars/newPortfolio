import React, { useRef, useEffect } from 'react';

const SmoothScrollContainer = ({ children }) => {
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    let animationFrameId;

    const smoothScroll = () => {
      const currentScrollPosition = window.scrollY;
      const diff = currentScrollPosition - scrollPositionRef.current;
      
      // Adjust this value to control scroll speed (lower = slower)
      const speed = 0.5;
      
      scrollPositionRef.current += diff * speed;
      
      window.scrollTo(0, scrollPositionRef.current);
      
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    window.addEventListener('scroll', () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(smoothScroll);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', smoothScroll);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

export default SmoothScrollContainer;