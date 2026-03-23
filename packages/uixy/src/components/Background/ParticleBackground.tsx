"use client";

import React, { useEffect, useRef, useCallback } from "react";

export interface ParticleNode {
  /** Text label, emoji, or image URL */
  content: string;
  /** Type of content */
  type?: "text" | "emoji" | "image";
}

export interface ParticleBackgroundProps {
  /** Array of items to display as floating particles */
  items: (string | ParticleNode)[];
  /** Max number of particles (auto-limited by screen size) */
  count?: number;
  /** Connection line distance threshold in px */
  connectionDistance?: number;
  /** Show arrowheads on connection lines */
  arrows?: boolean;
  /** Mouse interaction distance */
  mouseDistance?: number;
  /** Base color for text/lines as [r, g, b] */
  color?: [number, number, number];
  /** Particle movement speed multiplier */
  speed?: number;
  /** Base font size range [min, max] in px */
  fontSize?: [number, number];
  /** Image size in px (for image type nodes) */
  imageSize?: number;
  /** Line width */
  lineWidth?: number;
  /** Max particle opacity */
  maxOpacity?: number;
  /** CSS class for the canvas wrapper */
  className?: string;
}

interface InternalNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  content: string;
  type: "text" | "emoji" | "image";
  opacity: number;
  shade: number;
  fontSize: number;
  img?: HTMLImageElement;
  imgLoaded?: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  items,
  count,
  connectionDistance = 180,
  arrows = false,
  mouseDistance = 200,
  color = [110, 120, 220],
  speed = 1,
  fontSize = [13, 18],
  imageSize = 28,
  lineWidth = 0.6,
  maxOpacity = 0.25,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<InternalNode[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const normalize = useCallback(
    (item: string | ParticleNode): { content: string; type: "text" | "emoji" | "image" } => {
      if (typeof item === "string") {
        // Auto-detect: if it looks like a URL or path to image
        if (/^(https?:\/\/|data:image|\/|\.\.?\/)/.test(item)) {
          return { content: item, type: "image" };
        }
        // Auto-detect emoji: single emoji or short emoji sequence
        const emojiRegex = /^[\p{Emoji_Presentation}\p{Extended_Pictographic}\u200d\ufe0f]{1,8}$/u;
        if (emojiRegex.test(item.trim())) {
          return { content: item.trim(), type: "emoji" };
        }
        return { content: item, type: "text" };
      }
      return { content: item.content, type: item.type || "text" };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const [baseR, baseG, baseB] = color;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodeCount =
      count ?? Math.min(Math.floor((canvas.width * canvas.height) / 22000), 60);

    // Create nodes
    const nodes: InternalNode[] = Array.from({ length: nodeCount }, (_, i) => {
      const item = normalize(items[i % items.length]);
      const node: InternalNode = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3 * speed,
        vy: (Math.random() - 0.5) * 0.3 * speed,
        content: item.content,
        type: item.type,
        opacity: Math.random() * (maxOpacity - 0.05) + 0.05,
        shade: Math.random(),
        fontSize: fontSize[0] + Math.random() * (fontSize[1] - fontSize[0]),
      };

      // Preload images
      if (item.type === "image") {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = item.content;
        node.img = img;
        node.imgLoaded = false;
        img.onload = () => {
          node.imgLoaded = true;
        };
      }

      return node;
    });
    nodesRef.current = nodes;

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    // Listen on window so pointer-events:none on canvas doesn't block mouse tracking
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onMouseLeave);

    const getColor = (shade: number, alpha: number) => {
      const v = 40;
      const r = Math.round(baseR + (shade - 0.5) * v);
      const g = Math.round(baseG + (shade - 0.5) * v);
      const b = Math.round(baseB + (shade - 0.5) * (v * 0.3));
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const drawArrow = (
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      color: string
    ) => {
      const headLen = 6;
      const dx = toX - fromX;
      const dy = toY - fromY;
      const angle = Math.atan2(dy, dx);
      // Draw midpoint arrow
      const mx = (fromX + toX) / 2;
      const my = (fromY + toY) / 2;
      ctx.beginPath();
      ctx.moveTo(
        mx - headLen * Math.cos(angle - Math.PI / 6),
        my - headLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(mx, my);
      ctx.lineTo(
        mx - headLen * Math.cos(angle + Math.PI / 6),
        my - headLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -50) n.x = canvas.width + 50;
        if (n.x > canvas.width + 50) n.x = -50;
        if (n.y < -30) n.y = canvas.height + 30;
        if (n.y > canvas.height + 30) n.y = -30;
      }

      // Lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const avgShade = (nodes[i].shade + nodes[j].shade) / 2;
            const alpha = (1 - dist / connectionDistance) * 0.1;
            const c = getColor(avgShade, alpha);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = c;
            ctx.lineWidth = lineWidth;
            ctx.stroke();

            if (arrows) {
              drawArrow(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, c);
            }
          }
        }
      }

      // Mouse interaction lines
      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDistance) {
          const alpha = (1 - dist / mouseDistance) * 0.25;
          const c = getColor(n.shade, alpha);
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = c;
          ctx.lineWidth = lineWidth * 1.2;
          ctx.stroke();

          if (arrows) {
            drawArrow(n.x, n.y, mouse.x, mouse.y, c);
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const hoverBoost = dist < mouseDistance ? (1 - dist / mouseDistance) * 0.35 : 0;
        const alpha = Math.min(n.opacity + hoverBoost, 1);

        if (n.type === "image" && n.img && n.imgLoaded) {
          ctx.globalAlpha = alpha;
          const s = imageSize;
          ctx.drawImage(n.img, n.x - s / 2, n.y - s / 2, s, s);
          ctx.globalAlpha = 1;
        } else if (n.type === "emoji") {
          ctx.globalAlpha = alpha;
          ctx.font = `${n.fontSize + 4}px serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(n.content, n.x, n.y);
          ctx.globalAlpha = 1;
        } else {
          // text
          ctx.font = `600 ${n.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = getColor(n.shade, alpha);
          ctx.fillText(n.content, n.x, n.y);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [items, count, connectionDistance, arrows, mouseDistance, color, speed, fontSize, imageSize, lineWidth, maxOpacity, normalize]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ display: "block" }}
    />
  );
};

ParticleBackground.displayName = "ParticleBackground";
