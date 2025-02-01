import React from 'react';
import { drawPlant, drawTree, drawAnimal, drawBird, drawFish, drawWater } from './drawingUtils';

interface EcosystemElementProps {
  type: string;
  x: number;
  y: number;
  size: number;
  health: number;
  rotation?: number;
  ctx: CanvasRenderingContext2D;
}

export const EcosystemElement: React.FC<EcosystemElementProps> = ({
  type,
  x,
  y,
  size,
  ctx
}) => {
  React.useEffect(() => {
    switch (type) {
      case 'plant':
        drawPlant(ctx, x, y, size);
        break;
      case 'tree':
        drawTree(ctx, x, y, size);
        break;
      case 'animal':
        drawAnimal(ctx, x, y, size);
        break;
      case 'bird':
        drawBird(ctx, x, y, size);
        break;
      case 'fish':
        drawFish(ctx, x, y, size);
        break;
      case 'water':
        drawWater(ctx, x, y, size);
        break;
    }
  }, [type, x, y, size, ctx]);

  return null;
};