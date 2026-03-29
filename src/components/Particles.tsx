"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function Particles({ color = "#D4AF37", count = 40 }: { color?: string; count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (): Particle => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.3 - 0.05,
      size: Math.random() * 1.5 + 0.5,
      opacity: 0,
      life: 0,
      maxLife: Math.random() * 400 + 200,
    });

    for (let i = 0; i < count; i++) {
      const p = spawn();
      p.life = Math.random() * p.maxLife; // stagger initial state
      particles.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Fade in then out
        const progress = p.life / p.maxLife;
        if (progress < 0.1) {
          p.opacity = progress / 0.1;
        } else if (progress > 0.8) {
          p.opacity = (1 - progress) / 0.2;
        } else {
          p.opacity = 1;
        }

        // Respawn
        if (p.life >= p.maxLife || p.y < -10) {
          Object.assign(p, spawn());
          p.y = canvas.offsetHeight + 10;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.opacity * 0.25;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [color, count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
