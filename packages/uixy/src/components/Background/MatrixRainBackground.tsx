"use client";

import React, { useEffect, useRef } from "react";

export interface MatrixRainBackgroundProps {
  /** Characters to use */
  charset?: string;
  /** Column width in px */
  columnWidth?: number;
  /** Fall speed multiplier */
  speed?: number;
  /** Text color */
  color?: string;
  /** Font size in px */
  fontSize?: number;
  className?: string;
}

export const MatrixRainBackground: React.FC<MatrixRainBackgroundProps> = ({
  charset = "abcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>{}[]",
  columnWidth = 20,
  speed = 1,
  color = "#22c55e",
  fontSize = 14,
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

    const chars = charset.split("");
    let columns = Math.floor(canvas.width / columnWidth);
    let drops: number[] = Array.from({ length: columns }, () => Math.random() * -100);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Recalculate if resized
      const newCols = Math.floor(w / columnWidth);
      if (newCols !== columns) {
        columns = newCols;
        drops = Array.from({ length: columns }, () => Math.random() * -100);
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * columnWidth;
        const y = drops[i] * fontSize;

        // Head character — brighter
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.9;
        ctx.fillText(char, x, y);

        // Trail characters — dimmer
        ctx.globalAlpha = 0.3;
        const trailChar = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(trailChar, x, y - fontSize);

        ctx.globalAlpha = 1;

        if (y > h && Math.random() > 0.98) {
          drops[i] = 0;
        }

        drops[i] += speed * 0.5;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [charset, columnWidth, speed, color, fontSize]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ display: "block", background: "black" }}
    />
  );
};

MatrixRainBackground.displayName = "MatrixRainBackground";
