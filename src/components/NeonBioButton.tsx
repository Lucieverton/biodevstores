import { useEffect, useRef } from 'react';
import './NeonBioButton.css';

interface NeonBioButtonProps {
  onClick: () => void;
}

export const NeonBioButton = ({ onClick }: NeonBioButtonProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Liquid border animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const w = canvas.width;
      const h = canvas.height;
      const borderRadius = 24;
      const lineWidth = 3;
      
      // Create liquid flowing effect
      ctx.beginPath();
      ctx.strokeStyle = `hsl(180, 100%, 50%)`;
      ctx.lineWidth = lineWidth;
      ctx.shadowColor = 'hsl(180, 100%, 50%)';
      ctx.shadowBlur = 20;
      
      // Draw rounded rectangle with wave distortion
      const points: { x: number; y: number }[] = [];
      const segments = 200;
      const waveAmplitude = 2;
      const waveFrequency = 0.05;
      
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const perimeter = 2 * (w - 2 * borderRadius) + 2 * (h - 2 * borderRadius) + 2 * Math.PI * borderRadius;
        const dist = t * perimeter;
        
        let x = 0, y = 0;
        const topLen = w - 2 * borderRadius;
        const rightLen = h - 2 * borderRadius;
        const bottomLen = w - 2 * borderRadius;
        const leftLen = h - 2 * borderRadius;
        const cornerLen = Math.PI * borderRadius / 2;
        
        let remaining = dist;
        
        // Top edge
        if (remaining <= topLen) {
          x = borderRadius + remaining;
          y = 0;
        } else {
          remaining -= topLen;
          // Top-right corner
          if (remaining <= cornerLen) {
            const angle = -Math.PI / 2 + (remaining / cornerLen) * (Math.PI / 2);
            x = w - borderRadius + borderRadius * Math.cos(angle);
            y = borderRadius + borderRadius * Math.sin(angle);
          } else {
            remaining -= cornerLen;
            // Right edge
            if (remaining <= rightLen) {
              x = w;
              y = borderRadius + remaining;
            } else {
              remaining -= rightLen;
              // Bottom-right corner
              if (remaining <= cornerLen) {
                const angle = 0 + (remaining / cornerLen) * (Math.PI / 2);
                x = w - borderRadius + borderRadius * Math.cos(angle);
                y = h - borderRadius + borderRadius * Math.sin(angle);
              } else {
                remaining -= cornerLen;
                // Bottom edge
                if (remaining <= bottomLen) {
                  x = w - borderRadius - remaining;
                  y = h;
                } else {
                  remaining -= bottomLen;
                  // Bottom-left corner
                  if (remaining <= cornerLen) {
                    const angle = Math.PI / 2 + (remaining / cornerLen) * (Math.PI / 2);
                    x = borderRadius + borderRadius * Math.cos(angle);
                    y = h - borderRadius + borderRadius * Math.sin(angle);
                  } else {
                    remaining -= cornerLen;
                    // Left edge
                    if (remaining <= leftLen) {
                      x = 0;
                      y = h - borderRadius - remaining;
                    } else {
                      remaining -= leftLen;
                      // Top-left corner
                      const angle = Math.PI + (remaining / cornerLen) * (Math.PI / 2);
                      x = borderRadius + borderRadius * Math.cos(angle);
                      y = borderRadius + borderRadius * Math.sin(angle);
                    }
                  }
                }
              }
            }
          }
        }
        
        // Add wave distortion
        const wave = Math.sin(t * Math.PI * 8 + time * 2) * waveAmplitude;
        const normalX = x < w / 2 ? -1 : 1;
        const normalY = y < h / 2 ? -1 : 1;
        
        if (y === 0 || y === h) {
          y += wave * normalY;
        } else if (x === 0 || x === w) {
          x += wave * normalX;
        }
        
        points.push({ x, y });
      }
      
      // Draw the path
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.stroke();
      
      // Draw flowing energy particles
      const particleCount = 8;
      for (let i = 0; i < particleCount; i++) {
        const particleT = ((time * 0.3 + i / particleCount) % 1);
        const idx = Math.floor(particleT * points.length);
        const point = points[idx] || points[0];
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 15;
        ctx.fill();
      }
      
      time += 0.02;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="neon-bio-button-wrapper">
      {/* Expanding ripple rings behind button */}
      <div className="neon-ripple-container">
        <div className="neon-ripple-ring ring-1" />
        <div className="neon-ripple-ring ring-2" />
        <div className="neon-ripple-ring ring-3" />
        <div className="neon-ripple-ring ring-4" />
      </div>

      <button 
        onClick={onClick}
        className="neon-bio-button group"
      >
        {/* Liquid border canvas */}
        <canvas ref={canvasRef} className="neon-border-canvas" />
        
        {/* Dark background */}
        <div className="neon-button-bg" />
        
        {/* Content */}
        <div className="neon-button-content">
          {/* Icon group */}
          <div className="neon-icon-group">
            {/* Central phone */}
            <div className="neon-phone-icon">
              <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
                <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="9" y1="19" x2="15" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="5" r="1" fill="currentColor"/>
              </svg>
            </div>
            
            {/* Wi-Fi signal with animation */}
            <div className="neon-wifi-icon">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path className="wifi-wave wifi-wave-1" d="M12 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
                <path className="wifi-wave wifi-wave-2" d="M12 14c-2.2 0-4 1.8-4 4h2c0-1.1.9-2 2-2s2 .9 2 2h2c0-2.2-1.8-4-4-4z" fill="currentColor" opacity="0.7"/>
                <path className="wifi-wave wifi-wave-3" d="M12 10c-4.4 0-8 3.6-8 8h2c0-3.3 2.7-6 6-6s6 2.7 6 6h2c0-4.4-3.6-8-8-8z" fill="currentColor" opacity="0.5"/>
                <path className="wifi-wave wifi-wave-4" d="M12 6C5.9 6 1 10.9 1 17h2c0-5 4-9 9-9s9 4 9 9h2c0-6.1-4.9-11-11-11z" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            
            {/* Cloud icon */}
            <div className="neon-cloud-icon">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M19 11c0-3.3-2.7-6-6-6-2.5 0-4.6 1.5-5.5 3.6C5.1 9 3 11.3 3 14c0 2.8 2.2 5 5 5h10c2.2 0 4-1.8 4-4 0-2-1.5-3.7-3.4-3.9C18.8 11.1 19 11 19 11z" 
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* User avatars */}
            <div className="neon-user-icon user-1">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="neon-user-icon user-2">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="neon-user-icon user-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          
          {/* Text with animated gradient */}
          <div className="neon-button-text">
            <span>Quero meu</span>
            <span>link na bio</span>
          </div>
        </div>
      </button>
    </div>
  );
};
