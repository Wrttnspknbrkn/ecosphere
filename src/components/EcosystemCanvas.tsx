import React, { useRef, useEffect, useState } from 'react';
import { Card } from './ui/card';
import { toast } from './ui/use-toast';

interface EcosystemElement {
  type: 'plant' | 'animal' | 'water';
  x: number;
  y: number;
  size: number;
  health: number;
  rotation?: number;
}

const EcosystemCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<EcosystemElement[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedType, setSelectedType] = useState<'plant' | 'animal' | 'water'>('plant');

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

    const drawPlant = (x: number, y: number, size: number) => {
      // Draw trunk
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x - size/8, y, size/4, size);
      
      // Draw leaves
      ctx.fillStyle = '#4CAF50';
      ctx.beginPath();
      ctx.moveTo(x - size/2, y);
      ctx.lineTo(x, y - size);
      ctx.lineTo(x + size/2, y);
      ctx.closePath();
      ctx.fill();
      
      // Add a second layer of leaves
      ctx.beginPath();
      ctx.moveTo(x - size/2.5, y - size/2);
      ctx.lineTo(x, y - size*1.3);
      ctx.lineTo(x + size/2.5, y - size/2);
      ctx.closePath();
      ctx.fill();
    };

    const drawAnimal = (x: number, y: number, size: number) => {
      // Body
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.ellipse(x, y, size, size/1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Head
      ctx.beginPath();
      ctx.ellipse(x + size, y - size/4, size/2, size/2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Eye
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(x + size*1.2, y - size/3, size/6, 0, Math.PI * 2);
      ctx.fill();
      
      // Pupil
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(x + size*1.2, y - size/3, size/12, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawWater = (x: number, y: number, size: number) => {
      // Main water body
      ctx.fillStyle = '#87CEEB';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add wave effect
      ctx.strokeStyle = '#B0E2FF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = -size; i < size; i += 10) {
        ctx.moveTo(x + i, y);
        ctx.quadraticCurveTo(
          x + i + 5, y - 5,
          x + i + 10, y
        );
      }
      ctx.stroke();
      
      // Add shine
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.ellipse(x - size/3, y - size/3, size/4, size/6, Math.PI/4, 0, Math.PI * 2);
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = '#F2FCE2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw elements
      elements.forEach(element => {
        switch (element.type) {
          case 'plant':
            drawPlant(element.x, element.y, element.size);
            break;
          case 'animal':
            drawAnimal(element.x, element.y, element.size);
            break;
          case 'water':
            drawWater(element.x, element.y, element.size);
            break;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [elements]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement: EcosystemElement = {
      type: selectedType,
      x,
      y,
      size: selectedType === 'water' ? 30 : 20,
      health: 100,
      rotation: Math.random() * Math.PI * 2
    };

    setElements(prev => [...prev, newElement]);
    toast({
      title: "Element Added",
      description: `Added new ${selectedType} to the ecosystem`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setSelectedType('plant')}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedType === 'plant' ? 'bg-eco-green text-white' : 'bg-eco-lightGreen'
          }`}
        >
          Plant
        </button>
        <button
          onClick={() => setSelectedType('animal')}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedType === 'animal' ? 'bg-eco-brown text-white' : 'bg-eco-sand'
          }`}
        >
          Animal
        </button>
        <button
          onClick={() => setSelectedType('water')}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedType === 'water' ? 'bg-eco-blue text-white' : 'bg-eco-skyBlue'
          }`}
        >
          Water
        </button>
      </div>
      <Card className="relative w-full h-[600px] overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full ecosystem-canvas cursor-pointer"
          onClick={handleCanvasClick}
        />
      </Card>
    </div>
  );
};

export default EcosystemCanvas;