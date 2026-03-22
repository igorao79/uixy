"use client";

import React, { useEffect, useRef } from "react";

let gridStyleInjected = false;

export interface GridBackgroundProps {
  /** Grid variant */
  variant?: "grid" | "dots" | "cross";
  /** Grid cell size in px */
  size?: number;
  /** Grid line/dot color */
  color?: string;
  /** Grid line/dot opacity */
  opacity?: number;
  /** Animated radial mask that follows the mouse */
  followMouse?: boolean;
  /** Radial mask radius in px */
  maskRadius?: number;
  className?: string;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  variant = "grid",
  size = 40,
  color = "rgba(255,255,255,0.08)",
  opacity = 1,
  followMouse = false,
  maskRadius = 300,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridStyleInjected) {
      gridStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        .uixy-grid-bg {
          --uixy-grid-mx: 50%;
          --uixy-grid-my: 50%;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    if (!followMouse) return;
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--uixy-grid-mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--uixy-grid-my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [followMouse]);

  let bgImage: string;
  if (variant === "dots") {
    bgImage = `radial-gradient(circle, ${color} 1px, transparent 1px)`;
  } else if (variant === "cross") {
    bgImage = `
      linear-gradient(${color} 1px, transparent 1px),
      linear-gradient(90deg, ${color} 1px, transparent 1px),
      radial-gradient(circle, ${color} 1.5px, transparent 1.5px)
    `;
  } else {
    bgImage = `
      linear-gradient(${color} 1px, transparent 1px),
      linear-gradient(90deg, ${color} 1px, transparent 1px)
    `;
  }

  const bgSize =
    variant === "cross"
      ? `${size}px ${size}px, ${size}px ${size}px, ${size}px ${size}px`
      : `${size}px ${size}px`;

  const maskImage = followMouse
    ? `radial-gradient(circle ${maskRadius}px at var(--uixy-grid-mx) var(--uixy-grid-my), black, transparent)`
    : undefined;

  return (
    <div
      ref={containerRef}
      className={`uixy-grid-bg ${className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}`}
      style={{
        backgroundImage: bgImage,
        backgroundSize: bgSize,
        opacity,
        WebkitMaskImage: maskImage,
        maskImage,
      }}
    />
  );
};

GridBackground.displayName = "GridBackground";
