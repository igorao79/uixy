"use client";

import React, { useEffect, useRef } from "react";

export type PixelVariant = "rain" | "life" | "terrain" | "noise";

export interface PixelBackgroundProps {
  /** Pixel art style */
  variant?: PixelVariant;
  /** Pixel size in px */
  pixelSize?: number;
  /** Base colors */
  colors?: string[];
  /** Animation speed multiplier */
  speed?: number;
  /** Pixel opacity */
  opacity?: number;
  className?: string;
}

/* ── helpers ── */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

/* Simple value noise for terrain/noise */
function makeNoise(cols: number, rows: number): Float32Array {
  const arr = new Float32Array(cols * rows);
  for (let i = 0; i < arr.length; i++) arr[i] = Math.random();
  return arr;
}

function smoothNoise(
  noise: Float32Array,
  cols: number,
  rows: number,
  x: number,
  y: number
): number {
  const x0 = Math.floor(x) % cols;
  const y0 = Math.floor(y) % rows;
  const x1 = (x0 + 1) % cols;
  const y1 = (y0 + 1) % rows;
  const fx = x - Math.floor(x);
  const fy = y - Math.floor(y);
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const n00 = noise[y0 * cols + x0];
  const n10 = noise[y0 * cols + x1];
  const n01 = noise[y1 * cols + x0];
  const n11 = noise[y1 * cols + x1];
  return (n00 * (1 - sx) + n10 * sx) * (1 - sy) + (n01 * (1 - sx) + n11 * sx) * sy;
}

export const PixelBackground: React.FC<PixelBackgroundProps> = ({
  variant = "rain",
  pixelSize = 8,
  colors,
  speed = 1,
  opacity = 0.6,
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

    const ps = pixelSize;

    /* ════════════════════════════════════════════
       RAIN — neon streaks falling like Matrix
       but with pixel-art feel, colored streams
       ════════════════════════════════════════════ */
    if (variant === "rain") {
      const palette = (colors || ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4"]).map(hexToRgb);

      interface Drop {
        x: number;
        y: number;
        len: number;
        speed: number;
        color: [number, number, number];
      }

      let cols = Math.ceil(canvas.width / ps);
      const makeDrop = (col: number, startY?: number): Drop => ({
        x: col,
        y: startY ?? -(Math.random() * 30),
        len: 4 + Math.floor(Math.random() * 12),
        speed: 0.15 + Math.random() * 0.25,
        color: palette[Math.floor(Math.random() * palette.length)],
      });

      let drops: Drop[] = [];
      // One drop per ~3 columns
      cols = Math.ceil(canvas.width / ps);
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 0.35) {
          drops.push(makeDrop(c));
        }
      }

      const draw = () => {
        const w = canvas.width;
        const h = canvas.height;
        const rows = Math.ceil(h / ps);
        cols = Math.ceil(w / ps);

        // Fade previous frame
        ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
        ctx.fillRect(0, 0, w, h);

        for (const d of drops) {
          const headRow = Math.floor(d.y);
          for (let i = 0; i < d.len; i++) {
            const row = headRow - i;
            if (row < 0 || row >= rows) continue;
            // Head is brightest, tail fades
            const brightness = 1 - i / d.len;
            const a = brightness * brightness * opacity;
            const [r, g, b] = d.color;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            ctx.fillRect(d.x * ps, row * ps, ps - 1, ps - 1);
          }

          // Glow on head pixel
          const hr = Math.floor(d.y);
          if (hr >= 0 && hr < rows) {
            const [r, g, b] = d.color;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`;
            ctx.fillRect(d.x * ps - 1, hr * ps - 1, ps + 2, ps + 2);
          }

          d.y += d.speed * speed;
        }

        // Respawn drops that fell off screen
        drops = drops.filter((d) => {
          if ((d.y - d.len) * ps > h) {
            return false;
          }
          return true;
        });

        // Spawn new drops
        if (Math.random() < 0.3 * speed) {
          const col = Math.floor(Math.random() * cols);
          drops.push(makeDrop(col, -2));
        }

        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    /* ════════════════════════════════════════════
       LIFE — Conway's Game of Life
       ════════════════════════════════════════════ */
    else if (variant === "life") {
      const palette = colors || ["#22c55e", "#16a34a", "#15803d"];
      const cols = Math.ceil(canvas.width / ps);
      const rows = Math.ceil(canvas.height / ps);
      let grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => (Math.random() > 0.82 ? 1 : 0))
      );

      // Age tracking for fade-in/out effect
      let ages = Array.from({ length: rows }, () =>
        new Float32Array(cols)
      );

      let frame = 0;
      const draw = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (grid[r][c]) {
              ages[r][c] = Math.min(ages[r][c] + 0.08, 1);
            } else {
              ages[r][c] = Math.max(ages[r][c] - 0.05, 0);
            }
            if (ages[r][c] > 0.01) {
              ctx.globalAlpha = ages[r][c] * opacity;
              ctx.fillStyle = palette[(r + c) % palette.length];
              ctx.fillRect(c * ps, r * ps, ps - 1, ps - 1);
            }
          }
        }
        ctx.globalAlpha = 1;

        frame++;
        if (frame % Math.max(1, Math.round(6 / speed)) === 0) {
          const next = grid.map((row) => [...row]);
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              let n = 0;
              for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                  if (dr === 0 && dc === 0) continue;
                  const nr = (r + dr + rows) % rows;
                  const nc = (c + dc + cols) % cols;
                  n += grid[nr][nc];
                }
              }
              if (grid[r][c]) {
                next[r][c] = n === 2 || n === 3 ? 1 : 0;
              } else {
                next[r][c] = n === 3 ? 1 : 0;
              }
            }
          }
          grid = next;

          // Re-seed if too dead
          let alive = 0;
          for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) alive += grid[r][c];
          if (alive < rows * cols * 0.03) {
            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                if (Math.random() > 0.85) grid[r][c] = 1;
              }
            }
          }
        }

        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    /* ════════════════════════════════════════════
       TERRAIN — smooth animated elevation map
       ════════════════════════════════════════════ */
    else if (variant === "terrain") {
      const palette = colors || ["#0f172a", "#1e3a5f", "#1a4731", "#365314", "#4d7c0f", "#65a30d", "#84cc16", "#a3e635"];
      const cols = Math.ceil(canvas.width / ps);
      const rows = Math.ceil(canvas.height / ps);

      const noise = (x: number, y: number, t: number) => {
        return (
          Math.sin(x * 0.04 + t * 0.7) * 0.35 +
          Math.sin(y * 0.06 - t * 0.5) * 0.25 +
          Math.sin((x + y) * 0.025 + t * 0.3) * 0.2 +
          Math.sin(x * 0.1 - y * 0.08 + t * 0.4) * 0.2
        );
      };

      let t = 0;
      const draw = () => {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const n = (noise(c, r, t) + 1) / 2;
            const idx = Math.min(palette.length - 1, Math.floor(n * palette.length));
            ctx.globalAlpha = opacity;
            ctx.fillStyle = palette[idx];
            ctx.fillRect(c * ps, r * ps, ps, ps);
          }
        }
        ctx.globalAlpha = 1;
        t += 0.006 * speed;
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    /* ════════════════════════════════════════════
       NOISE — smooth flowing plasma / lava lamp
       ════════════════════════════════════════════ */
    else {
      const palette = (colors || ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#14b8a6"]).map(hexToRgb);
      const cols = Math.ceil(canvas.width / ps);
      const rows = Math.ceil(canvas.height / ps);

      // Pre-generate noise grids for smooth animation
      const noiseSize = 64;
      const noise1 = makeNoise(noiseSize, noiseSize);
      const noise2 = makeNoise(noiseSize, noiseSize);
      const noise3 = makeNoise(noiseSize, noiseSize);

      let t = 0;
      const draw = () => {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            // Layer multiple noise octaves scrolling in different directions
            const n1 = smoothNoise(noise1, noiseSize, noiseSize, c * 0.08 + t * 0.5, r * 0.08 + t * 0.3);
            const n2 = smoothNoise(noise2, noiseSize, noiseSize, c * 0.12 - t * 0.4, r * 0.12 + t * 0.2);
            const n3 = smoothNoise(noise3, noiseSize, noiseSize, c * 0.05 + t * 0.2, r * 0.05 - t * 0.35);

            const combined = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2);

            // Map to color palette with smooth interpolation
            const pi = combined * (palette.length - 1);
            const idx0 = Math.floor(pi);
            const idx1 = Math.min(idx0 + 1, palette.length - 1);
            const frac = pi - idx0;

            const [r0, g0, b0] = palette[idx0];
            const [r1, g1, b1] = palette[idx1];
            const fr = Math.round(r0 + (r1 - r0) * frac);
            const fg = Math.round(g0 + (g1 - g0) * frac);
            const fb = Math.round(b0 + (b1 - b0) * frac);

            ctx.globalAlpha = opacity * (0.5 + combined * 0.5);
            ctx.fillStyle = `rgb(${fr}, ${fg}, ${fb})`;
            ctx.fillRect(c * ps, r * ps, ps, ps);
          }
        }
        ctx.globalAlpha = 1;
        t += 0.015 * speed;
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [variant, pixelSize, colors, speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ display: "block", background: "#09090b", imageRendering: "pixelated" }}
    />
  );
};

PixelBackground.displayName = "PixelBackground";
