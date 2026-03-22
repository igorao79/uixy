"use client";

import React, { useEffect, useRef } from "react";

export interface WaveBackgroundProps {
  /** Wave colors from top to bottom */
  colors?: string[];
  /** Number of wave layers */
  layers?: number;
  /** Animation speed multiplier */
  speed?: number;
  /** Wave amplitude in px */
  amplitude?: number;
  /** Wave frequency */
  frequency?: number;
  className?: string;
}

export const WaveBackground: React.FC<WaveBackgroundProps> = ({
  colors = ["rgba(139,92,246,0.15)", "rgba(59,130,246,0.12)", "rgba(6,182,212,0.1)"],
  layers = 3,
  speed = 1,
  amplitude = 40,
  frequency = 0.008,
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

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (let l = 0; l < layers; l++) {
        const color = colors[l % colors.length];
        const yBase = h * (0.5 + l * 0.12);
        const amp = amplitude * (1 - l * 0.15);
        const freq = frequency * (1 + l * 0.3);
        const phaseOffset = l * 1.2;

        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= w; x += 3) {
          const y =
            yBase +
            Math.sin(x * freq + t * speed + phaseOffset) * amp +
            Math.sin(x * freq * 0.5 + t * speed * 0.7 + phaseOffset * 2) * amp * 0.5;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      }

      t += 0.02;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [colors, layers, speed, amplitude, frequency]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ display: "block" }}
    />
  );
};

WaveBackground.displayName = "WaveBackground";
