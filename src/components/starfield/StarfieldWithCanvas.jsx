import React, { useEffect, useRef, useState } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const newStars = createStars(1000, canvas.width, canvas.height);
    setStars(newStars);

    function createStars(count, width, height) {
      const stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5,
          alpha: Math.random()
        });
      }
      return stars;
    }

    function drawStars(hoveredStar) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        if (star === hoveredStar) {
          ctx.fillStyle = `rgba(255, 255, 0, 1)`; // Glow color for hovered star
          ctx.shadowBlur = 20;
          ctx.shadowColor = "yellow";
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });
      requestAnimationFrame(() => drawStars(hoveredStar));
    }

    let hoveredStar = null;
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      hoveredStar = stars.find(star => {
        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        return Math.sqrt(dx * dx + dy * dy) < star.radius + 5; // +5 for easier hover detection
      });
    });

    drawStars(hoveredStar);

    return () => {
      canvas.removeEventListener('mousemove', () => {});
    };
  }, [stars]);

  return <canvas ref={canvasRef} className="starfield-canvas"></canvas>;
};

export default Starfield;
