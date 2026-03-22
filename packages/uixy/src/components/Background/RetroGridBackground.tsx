"use client";

import React, { useEffect, useRef } from "react";

export interface RetroGridBackgroundProps {
  /** Grid cell size in px */
  cellSize?: number;
  /** Line color */
  lineColor?: string;
  /** Scroll speed multiplier */
  speed?: number;
  /** Show horizon glow */
  glow?: boolean;
  /** Number of vertical lines */
  verticalLines?: number;
  /** Number of horizontal lines */
  horizontalLines?: number;
  className?: string;
}

function hexToRgba(hex: string, a: number): string {
  const h = hex.replace("#", "");
  return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`;
}

export const RetroGridBackground: React.FC<RetroGridBackgroundProps> = ({
  cellSize = 50,
  lineColor = "#8b5cf6",
  speed = 1,
  glow = true,
  verticalLines = 25,
  horizontalLines = 16,
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

    let scrollY = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const horizon = h * 0.35;
      const groundH = h - horizon;
      const cx = w / 2;

      // ── Vertical lines ── converge to vanishing point
      ctx.lineWidth = 1;
      const half = Math.floor(verticalLines / 2);
      for (let i = -half; i <= half; i++) {
        const spread = (i / half); // -1 to 1
        const bottomX = cx + spread * w * 1.2;

        // Fade edges
        const edgeFade = 1 - Math.abs(spread) * 0.5;
        ctx.strokeStyle = hexToRgba(lineColor, 0.25 * edgeFade);
        ctx.beginPath();
        ctx.moveTo(cx, horizon);
        ctx.lineTo(bottomX, h);
        ctx.stroke();
      }

      // ── Horizontal lines ── perspective-spaced, scrolling
      const scrollPhase = (scrollY % 1);

      for (let i = 0; i < horizontalLines + 2; i++) {
        // Normalized position 0..1 with scroll offset
        const rawT = (i - scrollPhase) / horizontalLines;
        if (rawT < 0 || rawT > 1) continue;

        // Apply perspective curve — square for natural depth feel
        const perspT = rawT * rawT;
        const y = horizon + perspT * groundH;

        // Lines closer to horizon are thinner & more transparent
        const alpha = 0.08 + rawT * 0.3;
        const thickness = 0.5 + rawT * 1;

        // Calc X span at this depth — wider near bottom
        const spanFactor = rawT * 1.2;
        const leftX = cx - w * spanFactor;
        const rightX = cx + w * spanFactor;

        ctx.strokeStyle = hexToRgba(lineColor, alpha);
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.stroke();
      }

      // ── Horizon glow ──
      if (glow) {
        // Main glow line
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.2, hexToRgba(lineColor, 0.4));
        grad.addColorStop(0.5, hexToRgba(lineColor, 0.9));
        grad.addColorStop(0.8, hexToRgba(lineColor, 0.4));
        grad.addColorStop(1, "transparent");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 25;
        ctx.shadowColor = lineColor;
        ctx.beginPath();
        ctx.moveTo(0, horizon);
        ctx.lineTo(w, horizon);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Vertical glow from vanishing point
        const vGrad = ctx.createLinearGradient(cx, horizon - 80, cx, horizon + 30);
        vGrad.addColorStop(0, "transparent");
        vGrad.addColorStop(0.5, hexToRgba(lineColor, 0.15));
        vGrad.addColorStop(1, "transparent");
        ctx.fillStyle = vGrad;
        ctx.fillRect(cx - 60, horizon - 80, 120, 110);

        // Wide ambient glow on horizon
        const ambGrad = ctx.createRadialGradient(cx, horizon, 10, cx, horizon, w * 0.5);
        ambGrad.addColorStop(0, hexToRgba(lineColor, 0.06));
        ambGrad.addColorStop(1, "transparent");
        ctx.fillStyle = ambGrad;
        ctx.fillRect(0, horizon - 100, w, 200);

        // Stars above horizon
        ctx.fillStyle = hexToRgba(lineColor, 0.15);
        for (let i = 0; i < 30; i++) {
          const sx = ((i * 137.5) % w);
          const sy = ((i * 97.3) % (horizon - 10));
          const sr = 0.5 + (i % 3) * 0.4;
          ctx.beginPath();
          ctx.arc(sx, sy, sr, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      scrollY += 0.02 * speed;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [cellSize, lineColor, speed, glow, verticalLines, horizontalLines]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ display: "block" }}
    />
  );
};

RetroGridBackground.displayName = "RetroGridBackground";
