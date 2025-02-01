import React, { useRef, useEffect, useState } from 'react';
import { Card } from './ui/card';
import { toast } from './ui/use-toast';
import { EcosystemElement } from './ecosystem/EcosystemElement';
import { ElementControls } from './ecosystem/ElementControls';

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
  const [selectedType, setSelectedType] = useState<string>('plant');

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

      elements.forEach(element => {
        const props = {
          ...element,
          ctx
        };
        return <EcosystemElement {...props} />;
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
      <ElementControls 
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
      />
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