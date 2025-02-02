import React, { useRef, useEffect } from 'react';
import { EcosystemElement } from './EcosystemElement';

interface Element {
  id: string;
  type: string;
  x: number;
  y: number;
  size: number;
  health: number;
  rotation?: number;
}

interface CanvasManagerProps {
  elements: Element[];
  isSimulating: boolean;
  onElementMove: (id: string, x: number, y: number) => void;
}

const CanvasManager = ({ elements, isSimulating, onElementMove }: CanvasManagerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#F2FCE2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      elements.forEach(element => {
        if (isSimulating) {
          element.rotation = (element.rotation || 0) + 0.01;
          if (element.type === 'bird' || element.type === 'fish') {
            element.x += Math.sin(element.rotation) * 0.5;
            element.y += Math.cos(element.rotation) * 0.5;
          }
        }

        const props = {
          ...element,
          ctx
        };
        EcosystemElement(props);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [elements, isSimulating]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedElement = elements.find(element => {
      const dx = x - element.x;
      const dy = y - element.y;
      return Math.sqrt(dx * dx + dy * dy) < element.size;
    });

    if (clickedElement) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        onElementMove(clickedElement.id, x, y);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-pointer"
      onMouseDown={handleCanvasMouseDown}
    />
  );
};

export default CanvasManager;