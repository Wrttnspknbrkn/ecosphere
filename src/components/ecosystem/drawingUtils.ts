export const drawPlant = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Stem
  ctx.strokeStyle = '#8B4513';
  ctx.lineWidth = size/8;
  ctx.beginPath();
  ctx.moveTo(x, y + size);
  ctx.quadraticCurveTo(x - size/4, y + size/2, x, y);
  ctx.stroke();
  
  // Leaves
  const gradient = ctx.createRadialGradient(x, y - size/2, 0, x, y - size/2, size);
  gradient.addColorStop(0, '#90EE90');
  gradient.addColorStop(1, '#4CAF50');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y - size/2, size/2, 0, Math.PI * 2);
  ctx.fill();
};

export const drawTree = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Trunk with gradient
  const trunkGradient = ctx.createLinearGradient(x - size/4, y, x + size/4, y);
  trunkGradient.addColorStop(0, '#8B4513');
  trunkGradient.addColorStop(1, '#A0522D');
  
  ctx.fillStyle = trunkGradient;
  ctx.fillRect(x - size/4, y, size/2, size * 1.5);
  
  // Foliage with gradient
  const leafGradient = ctx.createRadialGradient(x, y - size, 0, x, y - size, size * 1.2);
  leafGradient.addColorStop(0, '#2E7D32');
  leafGradient.addColorStop(1, '#1B5E20');
  
  ctx.fillStyle = leafGradient;
  ctx.beginPath();
  ctx.arc(x, y - size, size, 0, Math.PI * 2);
  ctx.fill();
};

export const drawAnimal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Body
  const bodyGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
  bodyGradient.addColorStop(0, '#D2B48C');
  bodyGradient.addColorStop(1, '#8B4513');
  
  ctx.fillStyle = bodyGradient;
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

export const drawBird = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Body
  const bodyGradient = ctx.createLinearGradient(x - size, y - size, x + size, y + size);
  bodyGradient.addColorStop(0, '#4169E1');
  bodyGradient.addColorStop(1, '#1E90FF');
  
  ctx.fillStyle = bodyGradient;
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

export const drawFish = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Body
  const fishGradient = ctx.createLinearGradient(x - size, y, x + size, y);
  fishGradient.addColorStop(0, '#FF6B6B');
  fishGradient.addColorStop(1, '#FF4040');
  
  ctx.fillStyle = fishGradient;
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
  
  // Scales effect
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(x - size/2 + i * size/4, y, size/4, 0, Math.PI);
    ctx.stroke();
  }
};

export const drawWater = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Water body with gradient
  const waterGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
  waterGradient.addColorStop(0, '#87CEEB');
  waterGradient.addColorStop(1, '#4682B4');
  
  ctx.fillStyle = waterGradient;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  
  // Ripple effect
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath();
    ctx.arc(x, y, size * i/3, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  // Shine effect
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.ellipse(x - size/3, y - size/3, size/4, size/6, Math.PI/4, 0, Math.PI * 2);
  ctx.fill();
};