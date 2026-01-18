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
  nodes: number[]; // índices dos nós nesta linha
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

export const CircuitBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<CircuitNode[]>([]);
  const linesRef = useRef<CircuitLine[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize PCB-style circuit
  const initializeCircuit = useCallback((width: number, height: number) => {
    const nodes: CircuitNode[] = [];
    const lines: CircuitLine[] = [];
    const particles: Particle[] = [];

    // Create horizontal main lines with angular connections
    const lineCount = 4;
    const spacing = height / (lineCount + 1);

    for (let i = 0; i < lineCount; i++) {
      const y = spacing * (i + 1);
      const points: { x: number; y: number }[] = [];
      const lineNodes: number[] = [];

      // Start point
      let currentX = -20;
      points.push({ x: currentX, y });

      // Create segments with occasional vertical jogs
      while (currentX < width + 50) {
        const segmentLength = 60 + Math.random() * 100;
        currentX += segmentLength;

        // Add node at this point
        const nodeIndex = nodes.length;
        nodes.push({
          x: Math.min(currentX, width + 20),
          y,
          radius: 2 + Math.random() * 1.5,
          pulsePhase: Math.random() * Math.PI * 2,
          brightness: 0.4 + Math.random() * 0.3,
        });
        lineNodes.push(nodeIndex);
        points.push({ x: Math.min(currentX, width + 20), y });

        // Occasionally add a vertical jog (90° angle)
        if (Math.random() > 0.6 && currentX < width - 100) {
          const jogHeight = (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 15);
          const newY = Math.max(10, Math.min(height - 10, y + jogHeight));
          
          points.push({ x: currentX, y: newY });
          
          // Add node at corner
          const cornerNodeIndex = nodes.length;
          nodes.push({
            x: currentX,
            y: newY,
            radius: 2.5 + Math.random() * 1,
            pulsePhase: Math.random() * Math.PI * 2,
            brightness: 0.5 + Math.random() * 0.3,
          });
          lineNodes.push(cornerNodeIndex);

          // Continue horizontal
          const nextSegment = 40 + Math.random() * 60;
          currentX += nextSegment;
          points.push({ x: currentX, y: newY });
          
          // Go back to original y
          points.push({ x: currentX, y });
        }
      }

      lines.push({ points, nodes: lineNodes });

      // Add particles for this line
      const particleCount = 2 + Math.floor(Math.random() * 2);
      for (let p = 0; p < particleCount; p++) {
        particles.push({
          lineIndex: i,
          segmentIndex: 0,
          progress: Math.random(),
          speed: 0.008 + Math.random() * 0.006,
        });
      }
    }

    // Add some diagonal connecting lines between main lines
    for (let i = 0; i < lineCount - 1; i++) {
      if (Math.random() > 0.3) {
        const startX = 100 + Math.random() * (width - 200);
        const startY = spacing * (i + 1);
        const endY = spacing * (i + 2);
        
        const points = [
          { x: startX, y: startY },
          { x: startX + 30, y: startY },
          { x: startX + 60, y: (startY + endY) / 2 },
          { x: startX + 90, y: endY },
          { x: startX + 120, y: endY },
        ];

        // Add nodes at connection points
        const lineNodes: number[] = [];
        [0, 2, 4].forEach(idx => {
          const nodeIndex = nodes.length;
          nodes.push({
            x: points[idx].x,
            y: points[idx].y,
            radius: 2.5,
            pulsePhase: Math.random() * Math.PI * 2,
            brightness: 0.5,
          });
          lineNodes.push(nodeIndex);
        });

        lines.push({ points, nodes: lineNodes });

        // Add particle
        particles.push({
          lineIndex: lines.length - 1,
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
      const height = 80;
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

        // Subtle gradient stroke
        const gradient = ctx.createLinearGradient(0, 0, dimensions.width, 0);
        gradient.addColorStop(0, 'hsla(200, 100%, 50%, 0.15)');
        gradient.addColorStop(0.5, 'hsla(200, 100%, 60%, 0.25)');
        gradient.addColorStop(1, 'hsla(200, 100%, 50%, 0.15)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw and animate particles
      particles.forEach(particle => {
        const line = lines[particle.lineIndex];
        if (!line || line.points.length < 2) return;

        // Calculate total line length and current position
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
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        particleGradient.addColorStop(0, 'hsla(200, 100%, 70%, 0.8)');
        particleGradient.addColorStop(0.5, 'hsla(200, 100%, 60%, 0.3)');
        particleGradient.addColorStop(1, 'hsla(200, 100%, 50%, 0)');

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(200, 100%, 90%, 0.9)';
        ctx.fill();
      });

      // Draw nodes with pulsing glow
      nodes.forEach(node => {
        const pulse = Math.sin(time * 2.5 + node.pulsePhase) * 0.2 + 0.8;
        const distToMouse = Math.hypot(mouse.x - node.x, mouse.y - node.y);
        const hoverBoost = distToMouse < 80 ? (1 - distToMouse / 80) * 0.4 : 0;
        const brightness = node.brightness * pulse + hoverBoost;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 8
        );
        glowGradient.addColorStop(0, `hsla(200, 100%, 60%, ${brightness * 0.6})`);
        glowGradient.addColorStop(0.4, `hsla(200, 100%, 50%, ${brightness * 0.2})`);
        glowGradient.addColorStop(1, 'hsla(200, 100%, 50%, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 8, 0, Math.PI * 2);
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
            radius: ripple.radius + 6,
            opacity: ripple.opacity - 0.025,
          }))
          .filter(ripple => ripple.opacity > 0);

        updatedRipples.forEach(ripple => {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(200, 100%, 60%, ${ripple.opacity})`;
          ctx.lineWidth = 2;
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

  // Mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  }, []);

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    mousePos.current = { x: -1000, y: -1000 };
  }, []);

  // Click/touch handler
  const handleInteraction = useCallback((x: number, y: number) => {
    setRipples(prev => [
      ...prev,
      { x, y, radius: 0, opacity: 0.7 },
    ]);

    // Boost nearby node brightness
    nodesRef.current.forEach(node => {
      const dist = Math.hypot(x - node.x, y - node.y);
      if (dist < 100) {
        const originalBrightness = node.brightness;
        node.brightness = Math.min(1, node.brightness + 0.4);
        setTimeout(() => {
          node.brightness = originalBrightness;
        }, 400);
      }
    });
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      handleInteraction(e.clientX - rect.left, e.clientY - rect.top);
    }
  }, [handleInteraction]);

  const handleTouch = useCallback((e: React.TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      handleInteraction(
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top
      );
    }
  }, [handleInteraction]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 w-full h-full opacity-70"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouch}
      style={{ touchAction: 'manipulation' }}
    />
  );
};
