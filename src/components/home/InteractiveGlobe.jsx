
import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const InteractiveGlobe = () => {
  const canvasRef = useRef(null);
  const globeRadius = 180; 
  const rotationSpeed = 0.0004; 
  const numPoints = 120; 
  const pointSize = 2.8; 

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi + (Math.random() - 0.5) * 0.5; // Add some randomness
      pts.push({
        x: globeRadius * Math.cos(theta) * Math.sin(phi),
        y: globeRadius * Math.sin(theta) * Math.sin(phi),
        z: globeRadius * Math.cos(phi),
        color: `hsla(${180 + Math.random() * 120}, 80%, 75%, 0.85)`, // More vibrant colors
        size: Math.random() * pointSize + 1.2,
        speedFactor: Math.random() * 0.3 + 0.85, // Individual speed factor
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
      canvas.width = clientWidth * devicePixelRatio; // Scale for retina
      canvas.height = clientHeight * devicePixelRatio;
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);
      const centerX = (canvas.width / devicePixelRatio) / 2;
      const centerY = (canvas.height / devicePixelRatio) / 2;

      rotation = time * rotationSpeed;

      points.sort((a, b) => b.z - a.z);

      points.forEach(point => {
        const currentRotation = rotation * point.speedFactor;
        const rotX = point.x * Math.cos(currentRotation) - point.z * Math.sin(currentRotation);
        const rotZ = point.x * Math.sin(currentRotation) + point.z * Math.cos(currentRotation);
        
        const perspective = 600 / (600 + rotZ + globeRadius);
        const screenX = centerX + rotX * perspective;
        const screenY = centerY + point.y * perspective;
        const size = point.size * perspective * 1.6; 
        const alpha = Math.max(0, (rotZ + globeRadius * 1.2) / (2.4 * globeRadius));

        if (rotZ > -globeRadius * 0.85) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(0.6, size), 0, 2 * Math.PI);
          ctx.fillStyle = point.color.replace(/[^,]+(?=\))/, Math.min(1, alpha + 0.25).toFixed(2));
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [points, globeRadius, rotationSpeed]);

  return (
    <motion.div 
      className="w-full h-full relative"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 90, damping: 15 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[calc(100%-140px)] h-[calc(100%-140px)] rounded-full border-2 border-purple-500/15 animate-pulse-slow"
          style={{ boxShadow: '0 0 90px rgba(139, 92, 246, 0.15), inset 0 0 60px rgba(139, 92, 246, 0.08)'}}
        ></div>
      </div>
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[calc(100%-80px)] h-[calc(100%-80px)] rounded-full border border-cyan-500/05 animate-pulse-slow"
          style={{ animationDelay: '0.6s' }}
        ></div>
      </div>
    </motion.div>
  );
};

export default InteractiveGlobe;
