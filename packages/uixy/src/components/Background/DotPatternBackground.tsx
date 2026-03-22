"use client";

import React, { useEffect, useRef } from "react";

export interface DotPatternBackgroundProps {
  /** Spacing between dots */
  spacing?: number;
  /** Dot radius */
  radius?: number;
  /** Dot color */
  color?: string;
  /** Enable glow animation — dots pulse randomly */
  glow?: boolean;
  /** Glow color (defaults to color) */
  glowColor?: string;
  /** Mouse proximity — dots grow near cursor */
  mouseReactive?: boolean;
  /** Mouse influence radius */
  mouseRadius?: number;
  className?: string;
}

export const DotPatternBackground: React.FC<DotPatternBackgroundProps> = ({
  spacing = 24,
  radius = 1.2,
  color = "rgba(161, 161, 170, 0.25)",
  glow = false,
  glowColor,
  mouseReactive = true,
  mouseRadius = 120,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
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

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    if (mouseReactive) window.addEventListener("mousemove", onMouse);

    // Generate random glow phases per dot
    const cols = Math.ceil(3000 / spacing);
    const rows = Math.ceil(2000 / spacing);
    const phases = glow
      ? Array.from({ length: cols * rows }, () => ({
          offset: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 2,
        }))
      : [];

    let t = 0;
    const gc = glowColor || color;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const curCols = Math.ceil(w / spacing) + 1;
      const curRows = Math.ceil(h / spacing) + 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let r = 0; r < curRows; r++) {
        for (let c = 0; c < curCols; c++) {
          const x = c * spacing;
          const y = r * spacing;

          let dotRadius = radius;
          let dotAlpha = 1;

          // Mouse proximity effect
          if (mouseReactive) {
            const dx = mx - x;
            const dy = my - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
              const factor = 1 - dist / mouseRadius;
              dotRadius = radius + factor * radius * 2.5;
              dotAlpha = 1;
            }
          }

          // Glow pulse
          if (glow) {
            const idx = (r * cols + c) % phases.length;
            if (idx < phases.length) {
              const p = phases[idx];
              const pulse = (Math.sin(t * p.speed + p.offset) + 1) / 2;
              dotRadius += pulse * radius * 1.5;
              dotAlpha *= 0.4 + pulse * 0.6;
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);

          if (glow && dotRadius > radius * 1.5) {
            ctx.fillStyle = gc;
            ctx.shadowBlur = 8;
            ctx.shadowColor = gc;
          } else {
            ctx.fillStyle = color;
            ctx.shadowBlur = 0;
          }

          ctx.globalAlpha = dotAlpha;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      t += 0.016;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [spacing, radius, color, glow, glowColor, mouseReactive, mouseRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ display: "block" }}
    />
  );
};

DotPatternBackground.displayName = "DotPatternBackground";
