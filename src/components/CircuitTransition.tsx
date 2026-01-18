import { useEffect, useRef } from 'react';

interface CircuitTransitionProps {
  isTransitioning: boolean;
}

interface TransitionNode {
  x: number;
  y: number;
  delay: number;
  brightness: number;
}

interface TransitionLine {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  delay: number;
}

export const CircuitTransition = ({ isTransitioning }: CircuitTransitionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isTransitioning) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Generate circuit elements
    const lines: TransitionLine[] = [];
    const nodes: TransitionNode[] = [];

    // Horizontal main lines from center
    const numHorizontalLines = 8;
    for (let i = 0; i < numHorizontalLines; i++) {
      const y = centerY + (i - numHorizontalLines / 2) * 60;
      // Left line
      lines.push({
        startX: centerX,
        startY: y,
        endX: 0,
        endY: y,
        progress: 0,
        delay: i * 20
      });
      // Right line
      lines.push({
        startX: centerX,
        startY: y,
        endX: canvas.width,
        endY: y,
        progress: 0,
        delay: i * 20
      });
    }

    // Vertical lines
    const numVerticalLines = 12;
    for (let i = 0; i < numVerticalLines; i++) {
      const x = (canvas.width / (numVerticalLines + 1)) * (i + 1);
      // Top line
      lines.push({
        startX: x,
        startY: centerY,
        endX: x,
        endY: 0,
        progress: 0,
        delay: 50 + i * 15
      });
      // Bottom line
      lines.push({
        startX: x,
        startY: centerY,
        endX: x,
        endY: canvas.height,
        progress: 0,
        delay: 50 + i * 15
      });
    }

    // Generate nodes at intersections
    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        delay: 100 + i * 10,
        brightness: 0
      });
    }

    // Center node
    nodes.push({
      x: centerX,
      y: centerY,
      delay: 0,
      brightness: 0
    });

    startTimeRef.current = performance.now();
    const totalDuration = 400;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / totalDuration, 1);

      // Clear with fade
      ctx.fillStyle = `rgba(5, 5, 5, ${0.3 + progress * 0.7})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw lines
      lines.forEach(line => {
        const lineProgress = Math.max(0, Math.min(1, (elapsed - line.delay) / 150));
        
        if (lineProgress > 0) {
          const currentEndX = line.startX + (line.endX - line.startX) * lineProgress;
          const currentEndY = line.startY + (line.endY - line.startY) * lineProgress;

          // Glow effect
          ctx.shadowColor = 'hsl(200, 100%, 60%)';
          ctx.shadowBlur = 15;
          
          ctx.beginPath();
          ctx.moveTo(line.startX, line.startY);
          ctx.lineTo(currentEndX, currentEndY);
          ctx.strokeStyle = `hsla(200, 100%, 60%, ${0.8 * (1 - progress * 0.5)})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Brighter core
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.moveTo(line.startX, line.startY);
          ctx.lineTo(currentEndX, currentEndY);
          ctx.strokeStyle = `hsla(200, 100%, 80%, ${0.6 * (1 - progress * 0.5)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        const nodeProgress = Math.max(0, Math.min(1, (elapsed - node.delay) / 100));
        
        if (nodeProgress > 0) {
          const size = 4 + nodeProgress * 4;
          const alpha = nodeProgress * (1 - progress * 0.8);

          // Outer glow
          ctx.shadowColor = 'hsl(158, 100%, 50%)';
          ctx.shadowBlur = 20;
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(158, 100%, 50%, ${alpha})`;
          ctx.fill();

          // Inner bright core
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(node.x, node.y, size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(158, 100%, 80%, ${alpha})`;
          ctx.fill();
        }
      });

      // Flash effect at peak
      if (progress > 0.4 && progress < 0.7) {
        const flashIntensity = 1 - Math.abs(progress - 0.55) / 0.15;
        ctx.fillStyle = `rgba(255, 255, 255, ${flashIntensity * 0.15})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};
