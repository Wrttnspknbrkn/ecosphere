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

export const EcosystemElement = ({
  type,
  x,
  y,
  size,
  rotation = 0,
  ctx
}: EcosystemElementProps) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  
  switch (type) {
    case 'plant':
      drawPlant(ctx, 0, 0, size);
      break;
    case 'tree':
      drawTree(ctx, 0, 0, size);
      break;
    case 'animal':
      drawAnimal(ctx, 0, 0, size);
      break;
    case 'bird':
      drawBird(ctx, 0, 0, size);
      break;
    case 'fish':
      drawFish(ctx, 0, 0, size);
      break;
    case 'water':
      drawWater(ctx, 0, 0, size);
      break;
  }
  
  ctx.restore();
  return null;
};