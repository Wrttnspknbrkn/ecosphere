import React from 'react';
import { Card } from '../ui/card';
import { AlertCircle } from 'lucide-react';

interface SimulationStatusProps {
  isSimulating: boolean;
  elements: Array<{
    type: string;
    health: number;
  }>;
}

const SimulationStatus = ({ isSimulating, elements }: SimulationStatusProps) => {
  const getEcosystemHealth = () => {
    if (elements.length === 0) return "Empty";
    const avgHealth = elements.reduce((acc, el) => acc + el.health, 0) / elements.length;
    if (avgHealth > 80) return "Thriving";
    if (avgHealth > 50) return "Stable";
    return "Struggling";
  };

  const getEcosystemDescription = () => {
    const counts = elements.reduce((acc, el) => {
      acc[el.type] = (acc[el.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Your ecosystem contains:
        </p>
        <ul className="list-disc pl-4 text-sm">
          {Object.entries(counts).map(([type, count]) => (
            <li key={type}>
              {count} {type}(s)
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const getInteractionExplanation = () => {
    const hasPlants = elements.some(el => el.type === 'plant' || el.type === 'tree');
    const hasAnimals = elements.some(el => el.type === 'bird' || el.type === 'fish');
    const hasWater = elements.some(el => el.type === 'water');

    return (
      <div className="space-y-2 text-sm">
        <p className="font-medium">Current Interactions:</p>
        <ul className="space-y-1 text-muted-foreground">
          {hasPlants && hasWater && (
            <li>• Plants are absorbing water for growth</li>
          )}
          {hasPlants && hasAnimals && (
            <li>• Animals are interacting with plants for food</li>
          )}
          {hasWater && (
            <li>• Water sources are maintaining ecosystem balance</li>
          )}
          {hasAnimals && (
            <li>• Animals are moving and exploring the environment</li>
          )}
        </ul>
      </div>
    );
  };

  return (
    <Card className="p-4 space-y-4 bg-white/50">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-eco-green" />
        <h3 className="text-lg font-semibold">Ecosystem Status</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium">Current State:</p>
          <p className="text-2xl font-bold text-eco-green">
            {getEcosystemHealth()}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">Simulation:</p>
          <p className="text-eco-brown">
            {isSimulating ? "Running - Watch how elements interact!" : "Paused"}
          </p>
        </div>

        {elements.length > 0 && getEcosystemDescription()}
        {isSimulating && elements.length > 0 && getInteractionExplanation()}

        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-2">How it works:</p>
          <ul className="space-y-2">
            <li>• Plants need sunlight and water to thrive</li>
            <li>• Animals depend on plants for survival</li>
            <li>• Birds help spread seeds</li>
            <li>• Fish need clean water sources</li>
            <li>• Weather conditions affect all elements</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default SimulationStatus;