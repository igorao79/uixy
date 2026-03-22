"use client";

import React, { useEffect, useRef } from "react";

export interface AuroraBackgroundProps {
  /** Colors as CSS color strings */
  colors?: string[];
  /** Animation speed multiplier */
  speed?: number;
  /** Blur intensity in px */
  blur?: number;
  /** Opacity of the aurora layer (0-1) */
  opacity?: number;
  className?: string;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  colors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#8b5cf6"],
  speed = 1,
  blur = 120,
  opacity = 0.3,
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

    let t = 0;

    // Parse colors to RGB
    const parseColor = (c: string): [number, number, number] => {
      const tmp = document.createElement("div");
      tmp.style.color = c;
      document.body.appendChild(tmp);
      const computed = getComputedStyle(tmp).color;
      document.body.removeChild(tmp);
      const m = computed.match(/\d+/g);
      return m ? [+m[0], +m[1], +m[2]] : [139, 92, 246];
    };

    const rgbColors = colors.map(parseColor);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const blobCount = rgbColors.length;

      for (let i = 0; i < blobCount; i++) {
        const phase = (i / blobCount) * Math.PI * 2;
        const x = w * 0.5 + Math.sin(t * 0.3 * speed + phase) * w * 0.35;
        const y = h * 0.4 + Math.cos(t * 0.2 * speed + phase * 1.3) * h * 0.25;
        const radius = Math.max(w, h) * (0.3 + Math.sin(t * 0.15 * speed + i) * 0.1);

        const [r, g, b] = rgbColors[i % rgbColors.length];
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      t += 0.016;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [colors, speed, blur, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ display: "block", filter: `blur(${blur}px)` }}
    />
  );
};

AuroraBackground.displayName = "AuroraBackground";
