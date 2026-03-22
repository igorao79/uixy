"use client";

import React, { useEffect, useRef } from "react";

export interface MeteorBackgroundProps {
  /** Number of meteors */
  count?: number;
  /** Meteor angle in degrees (215 = top-right to bottom-left) */
  angle?: number;
  /** Meteor color */
  color?: string;
  /** Tail length in px */
  tailLength?: number;
  /** Speed multiplier */
  speed?: number;
  className?: string;
}

export const MeteorBackground: React.FC<MeteorBackgroundProps> = ({
  count = 20,
  angle = 215,
  color = "#a1a1aa",
  tailLength = 80,
  speed = 1,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const rad = (angle * Math.PI) / 180;
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);

    interface Meteor {
      x: number;
      y: number;
      speed: number;
      length: number;
      opacity: number;
      width: number;
    }

    const spawnMeteor = (): Meteor => {
      const w = canvas.width;
      const h = canvas.height;
      // Spawn above and to the right
      return {
        x: Math.random() * (w + 400) - 200,
        y: -Math.random() * h * 0.5 - 50,
        speed: (2 + Math.random() * 4) * speed,
        length: tailLength * (0.5 + Math.random() * 1),
        opacity: 0.3 + Math.random() * 0.7,
        width: 0.5 + Math.random() * 1.5,
      };
    };

    let meteors: Meteor[] = Array.from({ length: count }, () => {
      const m = spawnMeteor();
      // Randomize initial position so they don't all start at top
      m.x += dx * Math.random() * canvas.height * 2;
      m.y += dy * Math.random() * canvas.height * 2;
      return m;
    });

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const m of meteors) {
        const headX = m.x;
        const headY = m.y;
        const tailX = headX - dx * m.length;
        const tailY = headY - dy * m.length;

        // Gradient tail
        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.6, `${color}${Math.round(m.opacity * 100).toString(16).padStart(2, "0")}`);
        grad.addColorStop(1, color);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.lineCap = "round";
        ctx.globalAlpha = m.opacity;
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(headX, headY, m.width + 0.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = m.opacity * 0.8;
        ctx.shadowBlur = 6;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Move
        m.x += dx * m.speed;
        m.y += dy * m.speed;

        // Reset when off screen
        if (m.x < -200 || m.x > w + 200 || m.y > h + 200) {
          Object.assign(m, spawnMeteor());
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, angle, color, tailLength, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ display: "block" }}
    />
  );
};

MeteorBackground.displayName = "MeteorBackground";
