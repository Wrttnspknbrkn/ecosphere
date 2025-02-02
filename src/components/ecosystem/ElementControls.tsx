import React from 'react';
import { Leaf, Fish, Droplets, Bug, Trees, Bird } from 'lucide-react';
import { Button } from '../ui/button';

interface ElementControlsProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
  onDragStart: (e: React.DragEvent, type: string) => void;
}

export const ElementControls: React.FC<ElementControlsProps> = ({
  selectedType,
  onTypeSelect,
  onDragStart,
}) => {
  const ECOSYSTEM_ITEMS = [
    { type: 'plant', icon: Leaf, color: 'bg-green-500', label: 'Small Plant' },
    { type: 'tree', icon: Trees, color: 'bg-green-700', label: 'Tree' },
    { type: 'animal', icon: Bug, color: 'bg-amber-600', label: 'Small Animal' },
    { type: 'bird', icon: Bird, color: 'bg-blue-500', label: 'Bird' },
    { type: 'fish', icon: Fish, color: 'bg-blue-600', label: 'Fish' },
    { type: 'water', icon: Droplets, color: 'bg-blue-400', label: 'Water Source' },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center p-4 bg-white/50 rounded-lg shadow-sm">
      {ECOSYSTEM_ITEMS.map((item) => (
        <Button
          key={item.type}
          draggable
          onDragStart={(e) => onDragStart(e, item.type)}
          onClick={() => onTypeSelect(item.type)}
          className={`px-4 py-2 rounded-md transition-all transform hover:scale-105 flex items-center gap-2 ${
            selectedType === item.type 
              ? `${item.color} text-white` 
              : 'bg-white hover:bg-gray-50'
          }`}
          variant="outline"
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </Button>
      ))}
    </div>
  );
};