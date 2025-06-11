import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const InteractiveGlobe = () => {
  const canvasRef = useRef(null);
  const globeRadius = 180;
  const rotationSpeed = 0.0005;
  const numPoints = 100;
  const pointSize = 2.5;

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      pts.push({
        x: globeRadius * Math.cos(theta) * Math.sin(phi),
        y: globeRadius * Math.sin(theta) * Math.sin(phi),
        z: globeRadius * Math.cos(phi),
        color: `hsla(${Math.random() * 360}, 70%, 70%, 0.8)`,
        size: Math.random() * pointSize + 1,
      });
    }
    return pts;
  }, [globeRadius, numPoints, pointSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let rotation = 0;

    const resizeCanvas = () => {
      const { clientWidth, clientHeight } = canvas.parentElement;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      rotation += rotationSpeed * (16000/60); // Adjusted for smoother animation

      points.sort((a, b) => b.z - a.z);

      points.forEach(point => {
        const rotX = point.x * Math.cos(rotation) - point.z * Math.sin(rotation);
        const rotZ = point.x * Math.sin(rotation) + point.z * Math.cos(rotation);
        
        const perspective = 500 / (500 + rotZ + globeRadius); // Add globeRadius to keep points in front
        const screenX = centerX + rotX * perspective;
        const screenY = centerY + point.y * perspective;
        const size = point.size * perspective * 1.5; // Scale size with perspective
        const alpha = Math.max(0, (rotZ + globeRadius) / (2 * globeRadius)); // Fade points in the back

        if (rotZ > -globeRadius * 0.8) { // Only draw points mostly in front
          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(0.5, size), 0, 2 * Math.PI);
          ctx.fillStyle = point.color.replace(/[^,]+(?=\))/, Math.min(1, alpha + 0.2).toFixed(2)); // Adjust alpha
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [points, globeRadius, rotationSpeed]);

  return (
    <motion.div 
      className="w-full h-full relative"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, type: "spring" }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[calc(100%-140px)] h-[calc(100%-140px)] rounded-full border-2 border-purple-500/20 animate-pulse-slow"
          style={{ boxShadow: '0 0 80px rgba(139, 92, 246, 0.2), inset 0 0 50px rgba(139, 92, 246, 0.1)'}}
        ></div>
      </div>
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[calc(100%-80px)] h-[calc(100%-80px)] rounded-full border border-cyan-500/10 animate-pulse-slow"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>
    </motion.div>
  );
};

export default InteractiveGlobe;