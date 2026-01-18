import { useRef, useEffect, useState, useCallback } from 'react';

interface CircuitNode {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  connections: number[];
  brightness: number;
}

interface Particle {
  lineIndex: number;
  progress: number;
  speed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export const CircuitBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<CircuitNode[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const linesRef = useRef<[number, number][]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize nodes
  const initializeCircuit = useCallback((width: number, height: number) => {
    const nodeCount = Math.max(10, Math.floor(width / 120));
    const nodes: CircuitNode[] = [];
    const lines: [number, number][] = [];

    // Create nodes distributed across the header
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (width / (nodeCount + 1)) * (i + 1) + (Math.random() - 0.5) * 60,
        y: height * 0.3 + (Math.random() - 0.5) * height * 0.5,
        radius: 2 + Math.random() * 2,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
        brightness: 0.5 + Math.random() * 0.3,
      });
    }

    // Create connections (each node connects to 1-3 nearby nodes)
    nodes.forEach((node, i) => {
      const connectionCount = 1 + Math.floor(Math.random() * 2);
      const distances = nodes
        .map((other, j) => ({ index: j, dist: Math.hypot(other.x - node.x, other.y - node.y) }))
        .filter(d => d.index !== i && d.dist < 200)
        .sort((a, b) => a.dist - b.dist);

      for (let c = 0; c < Math.min(connectionCount, distances.length); c++) {
        const targetIndex = distances[c].index;
        if (!node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex);
          lines.push([i, targetIndex]);
        }
      }
    });

    // Initialize particles on lines
    const particles: Particle[] = lines.map((_, idx) => ({
      lineIndex: idx,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
    }));

    // Add extra particles
    for (let i = 0; i < lines.length * 0.5; i++) {
      particles.push({
        lineIndex: Math.floor(Math.random() * lines.length),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
      });
    }

    nodesRef.current = nodes;
    linesRef.current = lines;
    particlesRef.current = particles;
  }, []);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      const height = 80; // apenas altura do header (sem notification bar)
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

      // Draw lines with gradient
      lines.forEach(([fromIdx, toIdx]) => {
        const from = nodes[fromIdx];
        const to = nodes[toIdx];
        if (!from || !to) return;

        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, 'hsla(190, 100%, 50%, 0.3)');
        gradient.addColorStop(0.5, 'hsla(158, 100%, 50%, 0.4)');
        gradient.addColorStop(1, 'hsla(190, 100%, 50%, 0.3)');

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw particles
      particles.forEach(particle => {
        particle.progress += particle.speed;
        if (particle.progress > 1) particle.progress = 0;

        const line = lines[particle.lineIndex];
        if (!line) return;

        const from = nodes[line[0]];
        const to = nodes[line[1]];
        if (!from || !to) return;

        const x = from.x + (to.x - from.x) * particle.progress;
        const y = from.y + (to.y - from.y) * particle.progress;

        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 4);
        particleGradient.addColorStop(0, 'hsla(190, 100%, 70%, 0.9)');
        particleGradient.addColorStop(1, 'hsla(190, 100%, 50%, 0)');

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7;
        const distToMouse = Math.hypot(mouse.x - node.x, mouse.y - node.y);
        const hoverBoost = distToMouse < 100 ? (1 - distToMouse / 100) * 0.5 : 0;
        const brightness = node.brightness * pulse + hoverBoost;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 6
        );
        glowGradient.addColorStop(0, `hsla(190, 100%, 60%, ${brightness * 0.5})`);
        glowGradient.addColorStop(0.5, `hsla(158, 100%, 50%, ${brightness * 0.2})`);
        glowGradient.addColorStop(1, 'hsla(190, 100%, 50%, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Core
        const coreGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius
        );
        coreGradient.addColorStop(0, `hsla(190, 100%, 80%, ${brightness})`);
        coreGradient.addColorStop(1, `hsla(190, 100%, 50%, ${brightness * 0.8})`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
      });

      // Draw connection to mouse
      if (mouse.x > 0 && mouse.y > 0 && mouse.y < dimensions.height) {
        let closestNode = nodes[0];
        let closestDist = Infinity;

        nodes.forEach(node => {
          const dist = Math.hypot(mouse.x - node.x, mouse.y - node.y);
          if (dist < closestDist) {
            closestDist = dist;
            closestNode = node;
          }
        });

        if (closestDist < 150 && closestNode) {
          const opacity = (1 - closestDist / 150) * 0.6;
          const gradient = ctx.createLinearGradient(mouse.x, mouse.y, closestNode.x, closestNode.y);
          gradient.addColorStop(0, `hsla(280, 100%, 60%, ${opacity})`);
          gradient.addColorStop(1, `hsla(190, 100%, 50%, ${opacity * 0.5})`);

          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(closestNode.x, closestNode.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Draw ripples
      setRipples(prev => {
        const updatedRipples = prev
          .map(ripple => ({
            ...ripple,
            radius: ripple.radius + 8,
            opacity: ripple.opacity - 0.02,
          }))
          .filter(ripple => ripple.opacity > 0);

        updatedRipples.forEach(ripple => {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(280, 100%, 60%, ${ripple.opacity})`;
          ctx.lineWidth = 3;
          ctx.stroke();

          // Inner glow
          const innerGradient = ctx.createRadialGradient(
            ripple.x, ripple.y, ripple.radius * 0.8,
            ripple.x, ripple.y, ripple.radius
          );
          innerGradient.addColorStop(0, 'hsla(280, 100%, 60%, 0)');
          innerGradient.addColorStop(1, `hsla(280, 100%, 60%, ${ripple.opacity * 0.3})`);
          ctx.fillStyle = innerGradient;
          ctx.fill();
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
      {
        x,
        y,
        radius: 0,
        maxRadius: 200,
        opacity: 0.8,
      },
    ]);

    // Boost nearby node brightness temporarily
    nodesRef.current.forEach(node => {
      const dist = Math.hypot(x - node.x, y - node.y);
      if (dist < 150) {
        node.brightness = Math.min(1, node.brightness + 0.3);
        setTimeout(() => {
          node.brightness = Math.max(0.5, node.brightness - 0.3);
        }, 300);
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
      className="absolute inset-0 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouch}
      style={{ touchAction: 'manipulation' }}
    />
  );
};
