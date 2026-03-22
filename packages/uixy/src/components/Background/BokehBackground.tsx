"use client";

import React, { useEffect, useRef } from "react";

let bokehStyleInjected = false;

export type BokehShape = "circle" | "hexagon" | "diamond" | "triangle" | "star" | "ring" | "mixed";

export interface BokehBackgroundProps {
  /** Number of bokeh shapes */
  count?: number;
  /** Base colors */
  colors?: string[];
  /** Shape of bokeh elements */
  shape?: BokehShape;
  /** Animation speed multiplier */
  speed?: number;
  /** Min/max size in px */
  sizeRange?: [number, number];
  className?: string;
}

const clipPaths: Record<string, string> = {
  circle: "",
  hexagon: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  triangle: "polygon(50% 0%, 100% 100%, 0% 100%)",
  star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  ring: "",
};

const shapeKeys: (keyof typeof clipPaths)[] = ["circle", "hexagon", "diamond", "triangle", "star", "ring"];

export const BokehBackground: React.FC<BokehBackgroundProps> = ({
  count = 15,
  colors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#ec4899", "#f97316"],
  shape = "circle",
  speed = 1,
  sizeRange = [40, 200],
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bokehStyleInjected) {
      bokehStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        @keyframes uixy-bokeh-float {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(var(--uixy-bk-dx1), var(--uixy-bk-dy1)) scale(var(--uixy-bk-s1)) rotate(var(--uixy-bk-r1)); }
          50% { transform: translate(var(--uixy-bk-dx2), var(--uixy-bk-dy2)) scale(var(--uixy-bk-s2)) rotate(var(--uixy-bk-r2)); }
          75% { transform: translate(var(--uixy-bk-dx3), var(--uixy-bk-dy3)) scale(var(--uixy-bk-s3)) rotate(var(--uixy-bk-r3)); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const elements = Array.from({ length: count }, (_, i) => {
    const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
    const color = colors[i % colors.length];
    const duration = (15 + Math.random() * 20) / speed;
    const rp = () => `${(Math.random() - 0.5) * 60}px`;
    const rs = () => `${0.8 + Math.random() * 0.4}`;
    const rr = () => `${(Math.random() - 0.5) * 40}deg`;

    // Determine shape for this element
    const s = shape === "mixed" ? shapeKeys[i % shapeKeys.length] : shape;
    const isRing = s === "ring";
    const isCircle = s === "circle";
    const clip = clipPaths[s];

    const baseStyle: React.CSSProperties = {
      position: "absolute",
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: size,
      height: size,
      opacity: 0.35 + Math.random() * 0.3,
      filter: `blur(${1.5 + Math.random() * 3}px)`,
      animation: `uixy-bokeh-float ${duration}s ease-in-out infinite`,
      animationDelay: `${-Math.random() * duration}s`,
      "--uixy-bk-dx1": rp(),
      "--uixy-bk-dy1": rp(),
      "--uixy-bk-s1": rs(),
      "--uixy-bk-r1": rr(),
      "--uixy-bk-dx2": rp(),
      "--uixy-bk-dy2": rp(),
      "--uixy-bk-s2": rs(),
      "--uixy-bk-r2": rr(),
      "--uixy-bk-dx3": rp(),
      "--uixy-bk-dy3": rp(),
      "--uixy-bk-s3": rs(),
      "--uixy-bk-r3": rr(),
    } as React.CSSProperties;

    if (isRing) {
      return {
        key: i,
        style: {
          ...baseStyle,
          borderRadius: "50%",
          border: `${2 + Math.random() * 3}px solid ${color}50`,
          background: "transparent",
        },
      };
    }

    return {
      key: i,
      style: {
        ...baseStyle,
        borderRadius: isCircle ? "50%" : "0",
        background: isCircle
          ? `radial-gradient(circle at 35% 35%, ${color}45, ${color}18, transparent)`
          : `linear-gradient(135deg, ${color}40, ${color}15, transparent)`,
        border: `1px solid ${color}20`,
        clipPath: clip || undefined,
      },
    };
  });

  return (
    <div
      ref={containerRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ overflow: "hidden", position: "relative" }}
    >
      {elements.map((c) => (
        <div key={c.key} style={c.style} />
      ))}
    </div>
  );
};

BokehBackground.displayName = "BokehBackground";
