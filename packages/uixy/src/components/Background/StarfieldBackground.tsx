"use client";

import React, { useEffect, useRef } from "react";

export interface StarfieldBackgroundProps {
  /** Number of stars */
  count?: number;
  /** Star speed multiplier */
  speed?: number;
  /** Star color */
  color?: [number, number, number];
  /** Max star size */
  maxSize?: number;
  /** Enable warp speed effect */
  warp?: boolean;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
}

export const StarfieldBackground: React.FC<StarfieldBackgroundProps> = ({
  count = 300,
  speed = 1,
  color = [200, 200, 255],
  maxSize = 2.5,
  warp = false,
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

    const stars: Star[] = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 1000,
      prevX: 0,
      prevY: 0,
    }));

    const baseSpeed = warp ? 8 : 1.5;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const [r, g, b] = color;

      // Fade trail for warp, clear for normal
      if (warp) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }

      for (const star of stars) {
        // Store previous projected position
        const prevZ = star.z + baseSpeed * speed;
        star.prevX = (star.x / prevZ) * 500 + cx;
        star.prevY = (star.y / prevZ) * 500 + cy;

        // Move star closer
        star.z -= baseSpeed * speed;

        // Reset if too close
        if (star.z <= 1) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = 1000;
          star.prevX = (star.x / star.z) * 500 + cx;
          star.prevY = (star.y / star.z) * 500 + cy;
          continue;
        }

        const sx = (star.x / star.z) * 500 + cx;
        const sy = (star.y / star.z) * 500 + cy;

        // Skip offscreen
        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;

        const size = Math.max(0.3, (1 - star.z / 1000) * maxSize);
        const alpha = Math.min(1, (1 - star.z / 1000) * 1.5);

        if (warp) {
          // Draw streak line
          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`;
          ctx.lineWidth = size * 0.8;
          ctx.stroke();
        }

        // Draw star dot
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, speed, color, maxSize, warp]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ display: "block", background: "black" }}
    />
  );
};

StarfieldBackground.displayName = "StarfieldBackground";
