import React from 'react';
import { Leaf, Fish, Droplets, Bug, Trees, Bird } from 'lucide-react';

interface ElementControlsProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

export const ElementControls: React.FC<ElementControlsProps> = ({
  selectedType,
  onTypeSelect,
}) => {
  const ECOSYSTEM_ITEMS = [
    { type: 'plant', icon: Leaf, color: 'bg-eco-green', label: 'Small Plant' },
    { type: 'tree', icon: Trees, color: 'bg-eco-green', label: 'Tree' },
    { type: 'animal', icon: Bug, color: 'bg-eco-brown', label: 'Small Animal' },
    { type: 'bird', icon: Bird, color: 'bg-eco-brown', label: 'Bird' },
    { type: 'fish', icon: Fish, color: 'bg-eco-blue', label: 'Fish' },
    { type: 'water', icon: Droplets, color: 'bg-eco-blue', label: 'Water Source' },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {ECOSYSTEM_ITEMS.map((item) => (
        <button
          key={item.type}
          onClick={() => onTypeSelect(item.type)}
          className={`px-4 py-2 rounded-md transition-all transform hover:scale-105 flex items-center gap-2 ${
            selectedType === item.type ? `${item.color} text-white` : 'bg-white/50'
          }`}
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </button>
      ))}
    </div>
  );
};