import React, { useRef, useEffect } from 'react';
import { Card } from './ui/card';

const EcosystemCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial drawing
    ctx.fillStyle = '#F2FCE2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <Card className="relative w-full h-[600px] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full ecosystem-canvas"
      />
    </Card>
  );
};

export default EcosystemCanvas;