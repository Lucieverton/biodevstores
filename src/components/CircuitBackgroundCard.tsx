import { useRef, useEffect, useCallback } from 'react';

interface CircuitNode {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  brightness: number;
}

interface CircuitLine {
  points: { x: number; y: number }[];
}

interface Particle {
  lineIndex: number;
  progress: number;
  speed: number;
}

export const CircuitBackgroundCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<CircuitNode[]>([]);
  const linesRef = useRef<CircuitLine[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const initializeCircuit = useCallback((width: number, height: number) => {
    const nodes: CircuitNode[] = [];
    const lines: CircuitLine[] = [];
    const particles: Particle[] = [];

    // Create horizontal lines
    const lineCount = 3;
    const spacing = height / (lineCount + 1);

    for (let i = 0; i < lineCount; i++) {
      const y = spacing * (i + 1);
      const points: { x: number; y: number }[] = [];

      let currentX = -10;
      points.push({ x: currentX, y });

      while (currentX < width + 30) {
        const segmentLength = 30 + Math.random() * 50;
        currentX += segmentLength;

        nodes.push({
          x: Math.min(currentX, width + 10),
          y,
          radius: 1.5 + Math.random() * 1,
          pulsePhase: Math.random() * Math.PI * 2,
          brightness: 0.5 + Math.random() * 0.3,
        });
        points.push({ x: Math.min(currentX, width + 10), y });

        // Occasional vertical jog
        if (Math.random() > 0.7 && currentX < width - 50) {
          const jogHeight = (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 10);
          const newY = Math.max(5, Math.min(height - 5, y + jogHeight));
          
          points.push({ x: currentX, y: newY });
          nodes.push({
            x: currentX,
            y: newY,
            radius: 2,
            pulsePhase: Math.random() * Math.PI * 2,
            brightness: 0.6,
          });

          const nextSegment = 25 + Math.random() * 40;
          currentX += nextSegment;
          points.push({ x: currentX, y: newY });
          points.push({ x: currentX, y });
        }
      }

      lines.push({ points });

      // Add particles
      for (let p = 0; p < 2; p++) {
        particles.push({
          lineIndex: i,
          progress: Math.random(),
          speed: 0.006 + Math.random() * 0.004,
        });
      }
    }

    nodesRef.current = nodes;
    linesRef.current = lines;
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        dimensionsRef.current = { width, height };
        initializeCircuit(width, height);
      }
    });

    resizeObserver.observe(canvas.parentElement || canvas);

    return () => resizeObserver.disconnect();
  }, [initializeCircuit]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const animate = () => {
      time += 0.016;
      const { width, height } = dimensionsRef.current;
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const lines = linesRef.current;
      const particles = particlesRef.current;

      // Draw lines
      lines.forEach(line => {
        if (line.points.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(line.points[0].x, line.points[0].y);

        for (let i = 1; i < line.points.length; i++) {
          ctx.lineTo(line.points[i].x, line.points[i].y);
        }

        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'hsla(200, 100%, 50%, 0.2)');
        gradient.addColorStop(0.5, 'hsla(270, 80%, 60%, 0.3)');
        gradient.addColorStop(1, 'hsla(200, 100%, 50%, 0.2)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw particles
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

        // Particle glow
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
        particleGradient.addColorStop(0, 'hsla(200, 100%, 70%, 0.9)');
        particleGradient.addColorStop(0.5, 'hsla(270, 80%, 60%, 0.4)');
        particleGradient.addColorStop(1, 'hsla(200, 100%, 50%, 0)');

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(200, 100%, 95%, 1)';
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach(node => {
        const pulse = Math.sin(time * 3 + node.pulsePhase) * 0.3 + 0.7;
        const brightness = node.brightness * pulse;

        // Glow
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 6
        );
        glowGradient.addColorStop(0, `hsla(270, 80%, 60%, ${brightness * 0.7})`);
        glowGradient.addColorStop(0.5, `hsla(200, 100%, 50%, ${brightness * 0.3})`);
        glowGradient.addColorStop(1, 'hsla(200, 100%, 50%, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(200, 100%, 85%, ${brightness})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
    />
  );
};
