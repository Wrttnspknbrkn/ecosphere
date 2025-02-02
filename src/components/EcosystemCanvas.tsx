import React, { useRef, useEffect, useState } from 'react';
import { Card } from './ui/card';
import { toast } from './ui/use-toast';
import { EcosystemElement } from './ecosystem/EcosystemElement';
import { ElementControls } from './ecosystem/ElementControls';

interface EcosystemElement {
  id: string;
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
  const [isDragging, setIsDragging] = useState(false);

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#F2FCE2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      elements.forEach(element => {
        const props = {
          ...element,
          ctx
        };
        EcosystemElement(props);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [elements]);

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('elementType', type);
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const type = e.dataTransfer.getData('elementType');

    const newElement: EcosystemElement = {
      id: `${type}-${Date.now()}`,
      type,
      x,
      y,
      size: type === 'tree' ? 40 : type === 'water' ? 30 : 20,
      health: 100,
      rotation: Math.random() * Math.PI * 2
    };

    setElements(prev => [...prev, newElement]);
    setIsDragging(false);
    toast({
      title: "Element Added",
      description: `Added new ${type} to the ecosystem`,
    });
  };

  const saveEcosystem = () => {
    try {
      localStorage.setItem('ecosystem', JSON.stringify(elements));
      toast({
        title: "Ecosystem Saved",
        description: "Your ecosystem has been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save ecosystem",
        variant: "destructive",
      });
    }
  };

  const loadEcosystem = () => {
    try {
      const savedEcosystem = localStorage.getItem('ecosystem');
      if (savedEcosystem) {
        setElements(JSON.parse(savedEcosystem));
        toast({
          title: "Ecosystem Loaded",
          description: "Your ecosystem has been loaded successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load ecosystem",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <ElementControls 
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
        onDragStart={handleDragStart}
      />
      <Card className="relative w-full h-[600px] overflow-hidden">
        <canvas
          ref={canvasRef}
          className={`w-full h-full ecosystem-canvas ${isDragging ? 'cursor-copy' : 'cursor-pointer'}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      </Card>
    </div>
  );
};

export default EcosystemCanvas;