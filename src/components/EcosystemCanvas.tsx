import React, { useRef, useEffect, useState } from 'react';
import { Card } from './ui/card';
import { toast } from './ui/use-toast';

interface EcosystemElement {
  type: 'plant' | 'animal' | 'water';
  x: number;
  y: number;
  size: number;
  health: number;
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

    // Animation loop
    const animate = () => {
      ctx.fillStyle = '#F2FCE2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw elements
      elements.forEach(element => {
        switch (element.type) {
          case 'plant':
            ctx.fillStyle = '#4CAF50';
            ctx.beginPath();
            ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'animal':
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'water':
            ctx.fillStyle = '#87CEEB';
            ctx.beginPath();
            ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2);
            ctx.fill();
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
      health: 100
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