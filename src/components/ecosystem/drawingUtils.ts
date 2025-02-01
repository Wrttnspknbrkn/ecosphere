export const drawPlant = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
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

export const drawTree = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
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

export const drawAnimal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
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

export const drawBird = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
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

export const drawFish = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
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

export const drawWater = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
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