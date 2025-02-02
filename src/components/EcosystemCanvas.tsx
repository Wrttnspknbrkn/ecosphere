import React, { useState } from 'react';
import { Card } from './ui/card';
import { toast } from './ui/use-toast';
import { ElementControls } from './ecosystem/ElementControls';
import CanvasManager from './ecosystem/CanvasManager';
import SimulationStatus from './ecosystem/SimulationStatus';

interface Element {
  id: string;
  type: string;
  x: number;
  y: number;
  size: number;
  health: number;
  rotation?: number;
}

interface Props {
  isSimulating: boolean;
}

const EcosystemCanvas = ({ isSimulating }: Props) => {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedType, setSelectedType] = useState<string>('plant');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const type = e.dataTransfer.getData('elementType');

    const newElement: Element = {
      id: `${type}-${Date.now()}`,
      type,
      x,
      y,
      size: type === 'tree' ? 40 : type === 'water' ? 30 : 20,
      health: 100,
      rotation: Math.random() * Math.PI * 2
    };

    setElements(prev => [...prev, newElement]);
    toast({
      title: "Element Added",
      description: `Added new ${type} to the ecosystem`,
    });
  };

  const handleElementMove = (id: string, x: number, y: number) => {
    setElements(prev => prev.map(element => 
      element.id === id ? { ...element, x, y } : element
    ));
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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-3 space-y-4">
        <ElementControls 
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
          onSave={saveEcosystem}
          onLoad={loadEcosystem}
        />
        <Card className="relative w-full h-[600px] overflow-hidden">
          <div
            className="w-full h-full"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <CanvasManager 
              elements={elements}
              isSimulating={isSimulating}
              onElementMove={handleElementMove}
            />
          </div>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <SimulationStatus 
          isSimulating={isSimulating}
          elements={elements}
        />
      </div>
    </div>
  );
};

export default EcosystemCanvas;