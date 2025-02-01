import React, { useRef, useEffect, useState } from 'react';
import { Card } from './ui/card';
import { toast } from './ui/use-toast';
import { Leaf, Fish, Droplets, Bug, Tree, Bird } from 'lucide-react';

interface EcosystemElement {
  type: string;
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
  const [selectedType, setSelectedType] = useState<string>('plant');

  const ECOSYSTEM_ITEMS = [
    { type: 'plant', icon: Leaf, color: 'bg-eco-green', label: 'Small Plant' },
    { type: 'tree', icon: Tree, color: 'bg-eco-green', label: 'Tree' },
    { type: 'animal', icon: Bug, color: 'bg-eco-brown', label: 'Small Animal' },
    { type: 'bird', icon: Bird, color: 'bg-eco-brown', label: 'Bird' },
    { type: 'fish', icon: Fish, color: 'bg-eco-blue', label: 'Fish' },
    { type: 'water', icon: Droplets, color: 'bg-eco-blue', label: 'Water Source' },
  ];

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
      
      ctx.beginPath();
      ctx.moveTo(x - size/2.5, y - size/2);
      ctx.lineTo(x, y - size*1.3);
      ctx.lineTo(x + size/2.5, y - size/2);
      ctx.closePath();
      ctx.fill();
    };

    const drawTree = (x: number, y: number, size: number) => {
      // Larger trunk
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x - size/4, y, size/2, size * 1.5);
      
      // Multiple layers of leaves
      ctx.fillStyle = '#2E7D32';
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x - size, y - i * size);
        ctx.lineTo(x, y - (i + 1) * size);
        ctx.lineTo(x + size, y - i * size);
        ctx.closePath();
        ctx.fill();
      }
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
      
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(x + size*1.2, y - size/3, size/12, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawBird = (x: number, y: number, size: number) => {
      // Body
      ctx.fillStyle = '#CD853F';
      ctx.beginPath();
      ctx.ellipse(x, y, size, size/2, Math.PI/4, 0, Math.PI * 2);
      ctx.fill();
      
      // Wing
      ctx.beginPath();
      ctx.ellipse(x - size/2, y, size/1.5, size/3, -Math.PI/4, 0, Math.PI * 2);
      ctx.fill();
      
      // Head
      ctx.beginPath();
      ctx.arc(x + size, y - size/2, size/3, 0, Math.PI * 2);
      ctx.fill();
      
      // Beak
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(x + size*1.3, y - size/2);
      ctx.lineTo(x + size*1.6, y - size/2);
      ctx.lineTo(x + size*1.3, y - size/3);
      ctx.closePath();
      ctx.fill();
    };

    const drawFish = (x: number, y: number, size: number) => {
      // Body
      ctx.fillStyle = '#FF6B6B';
      ctx.beginPath();
      ctx.ellipse(x, y, size, size/2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Tail
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x - size*1.5, y - size/2);
      ctx.lineTo(x - size*1.5, y + size/2);
      ctx.closePath();
      ctx.fill();
      
      // Eye
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(x + size/2, y - size/6, size/6, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(x + size/2, y - size/6, size/12, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawWater = (x: number, y: number, size: number) => {
      // Main water body
      ctx.fillStyle = '#87CEEB';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Wave effect
      ctx.strokeStyle = '#B0E2FF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = -size; i < size; i += 10) {
        ctx.moveTo(x + i, y);
        ctx.quadraticCurveTo(x + i + 5, y - 5, x + i + 10, y);
      }
      ctx.stroke();
      
      // Shine effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.ellipse(x - size/3, y - size/3, size/4, size/6, Math.PI/4, 0, Math.PI * 2);
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = '#F2FCE2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      elements.forEach(element => {
        switch (element.type) {
          case 'plant':
            drawPlant(element.x, element.y, element.size);
            break;
          case 'tree':
            drawTree(element.x, element.y, element.size);
            break;
          case 'animal':
            drawAnimal(element.x, element.y, element.size);
            break;
          case 'bird':
            drawBird(element.x, element.y, element.size);
            break;
          case 'fish':
            drawFish(element.x, element.y, element.size);
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
      size: selectedType === 'tree' ? 40 : selectedType === 'water' ? 30 : 20,
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
      <div className="flex flex-wrap gap-2 justify-center">
        {ECOSYSTEM_ITEMS.map((item) => (
          <button
            key={item.type}
            onClick={() => setSelectedType(item.type)}
            className={`px-4 py-2 rounded-md transition-all transform hover:scale-105 flex items-center gap-2 ${
              selectedType === item.type ? `${item.color} text-white` : 'bg-white/50'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
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