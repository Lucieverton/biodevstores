import { useRef, useEffect, useState, useCallback } from 'react';

interface CircuitNode {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  brightness: number;
}

interface CircuitLine {
  points: { x: number; y: number }[];
  nodes: number[];
}

interface Particle {
  lineIndex: number;
  segmentIndex: number;
  progress: number;
  speed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

export const CircuitBackgroundMobile = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<CircuitNode[]>([]);
  const linesRef = useRef<CircuitLine[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize PCB-style circuit for mobile (70px height)
  const initializeCircuit = useCallback((width: number, height: number) => {
    const nodes: CircuitNode[] = [];
    const lines: CircuitLine[] = [];
    const particles: Particle[] = [];

    // Create 2 horizontal main lines for the compact height
    const lineCount = 2;
    const spacing = height / (lineCount + 1);

    for (let i = 0; i < lineCount; i++) {
      const y = spacing * (i + 1);
      const points: { x: number; y: number }[] = [];
      const lineNodes: number[] = [];

      let currentX = -20;
      points.push({ x: currentX, y });

      while (currentX < width + 50) {
        const segmentLength = 50 + Math.random() * 80;
        currentX += segmentLength;

        const nodeIndex = nodes.length;
        nodes.push({
          x: Math.min(currentX, width + 20),
          y,
          radius: 1.5 + Math.random() * 1,
          pulsePhase: Math.random() * Math.PI * 2,
          brightness: 0.4 + Math.random() * 0.3,
        });
        lineNodes.push(nodeIndex);
        points.push({ x: Math.min(currentX, width + 20), y });

        // Smaller vertical jogs for compact height
        if (Math.random() > 0.65 && currentX < width - 80) {
          const jogHeight = (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 8);
          const newY = Math.max(5, Math.min(height - 5, y + jogHeight));
          
          points.push({ x: currentX, y: newY });
          
          const cornerNodeIndex = nodes.length;
          nodes.push({
            x: currentX,
            y: newY,
            radius: 2 + Math.random() * 0.5,
            pulsePhase: Math.random() * Math.PI * 2,
            brightness: 0.5 + Math.random() * 0.3,
          });
          lineNodes.push(cornerNodeIndex);

          const nextSegment = 30 + Math.random() * 50;
          currentX += nextSegment;
          points.push({ x: currentX, y: newY });
          points.push({ x: currentX, y });
        }
      }

      lines.push({ points, nodes: lineNodes });

      // Fewer particles for mobile performance
      const particleCount = 1 + Math.floor(Math.random() * 2);
      for (let p = 0; p < particleCount; p++) {
        particles.push({
          lineIndex: i,
          segmentIndex: 0,
          progress: Math.random(),
          speed: 0.006 + Math.random() * 0.004,
        });
      }
    }

    nodesRef.current = nodes;
    linesRef.current = lines;
    particlesRef.current = particles;
  }, []);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      const height = 70;
      const width = window.innerWidth;
      setDimensions({ width, height });
      initializeCircuit(width, height);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [initializeCircuit]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const nodes = nodesRef.current;
      const lines = linesRef.current;
      const particles = particlesRef.current;
      const mouse = mousePos.current;

      // Draw lines (PCB traces)
      lines.forEach(line => {
        if (line.points.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(line.points[0].x, line.points[0].y);

        for (let i = 1; i < line.points.length; i++) {
          ctx.lineTo(line.points[i].x, line.points[i].y);
        }

        const gradient = ctx.createLinearGradient(0, 0, dimensions.width, 0);
        gradient.addColorStop(0, 'hsla(200, 100%, 50%, 0.12)');
        gradient.addColorStop(0.5, 'hsla(200, 100%, 60%, 0.2)');
        gradient.addColorStop(1, 'hsla(200, 100%, 50%, 0.12)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw and animate particles
      particles.forEach(particle => {
        const line = lines[particle.lineIndex];
        if (!line || line.points.length < 2) return;

        let totalLength = 0;
        const segmentLengths: number[] = [];

        for (let i = 0; i < line.points.length - 1; i++) {
          const len = Math.hypot(
            line.points[i + 1].x - line.points[i].x,
            line.points[i + 1].y - line.points[i].y
          );
          segmentLengths.push(len);
          totalLength += len;
        }

        particle.progress += particle.speed;
        if (particle.progress > 1) particle.progress = 0;

        const targetDist = particle.progress * totalLength;
        let accumulatedDist = 0;
        let x = line.points[0].x;
        let y = line.points[0].y;

        for (let i = 0; i < segmentLengths.length; i++) {
          if (accumulatedDist + segmentLengths[i] >= targetDist) {
            const segmentProgress = (targetDist - accumulatedDist) / segmentLengths[i];
            x = line.points[i].x + (line.points[i + 1].x - line.points[i].x) * segmentProgress;
            y = line.points[i].y + (line.points[i + 1].y - line.points[i].y) * segmentProgress;
            break;
          }
          accumulatedDist += segmentLengths[i];
        }

        // Draw particle with glow
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
        particleGradient.addColorStop(0, 'hsla(200, 100%, 70%, 0.7)');
        particleGradient.addColorStop(0.5, 'hsla(200, 100%, 60%, 0.25)');
        particleGradient.addColorStop(1, 'hsla(200, 100%, 50%, 0)');

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(200, 100%, 90%, 0.8)';
        ctx.fill();
      });

      // Draw nodes with pulsing glow
      nodes.forEach(node => {
        const pulse = Math.sin(time * 2.5 + node.pulsePhase) * 0.2 + 0.8;
        const distToMouse = Math.hypot(mouse.x - node.x, mouse.y - node.y);
        const hoverBoost = distToMouse < 60 ? (1 - distToMouse / 60) * 0.35 : 0;
        const brightness = node.brightness * pulse + hoverBoost;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 6
        );
        glowGradient.addColorStop(0, `hsla(200, 100%, 60%, ${brightness * 0.5})`);
        glowGradient.addColorStop(0.4, `hsla(200, 100%, 50%, ${brightness * 0.15})`);
        glowGradient.addColorStop(1, 'hsla(200, 100%, 50%, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Core
        const coreGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius
        );
        coreGradient.addColorStop(0, `hsla(200, 100%, 90%, ${brightness})`);
        coreGradient.addColorStop(1, `hsla(200, 100%, 60%, ${brightness * 0.9})`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
      });

      // Draw ripples
      setRipples(prev => {
        const updatedRipples = prev
          .map(ripple => ({
            ...ripple,
            radius: ripple.radius + 5,
            opacity: ripple.opacity - 0.03,
          }))
          .filter(ripple => ripple.opacity > 0);

        updatedRipples.forEach(ripple => {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(200, 100%, 60%, ${ripple.opacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        return updatedRipples;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  // Touch handler for mobile
  const handleTouch = useCallback((e: React.TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      
      mousePos.current = { x, y };

      setRipples(prev => [
        ...prev,
        { x, y, radius: 0, opacity: 0.6 },
      ]);

      nodesRef.current.forEach(node => {
        const dist = Math.hypot(x - node.x, y - node.y);
        if (dist < 80) {
          const originalBrightness = node.brightness;
          node.brightness = Math.min(1, node.brightness + 0.4);
          setTimeout(() => {
            node.brightness = originalBrightness;
          }, 300);
        }
      });
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    mousePos.current = { x: -1000, y: -1000 };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      onTouchStart={handleTouch}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'manipulation' }}
    />
  );
};
