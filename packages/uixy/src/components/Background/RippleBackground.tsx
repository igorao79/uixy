"use client";

import React, { useEffect } from "react";

let rippleStyleInjected = false;

export interface RippleBackgroundProps {
  /** Number of ripple rings */
  count?: number;
  /** Base color */
  color?: string;
  /** Animation duration per ring in seconds */
  duration?: number;
  className?: string;
}

export const RippleBackground: React.FC<RippleBackgroundProps> = ({
  count = 6,
  color = "rgba(139, 92, 246, 0.15)",
  duration = 4,
  className,
}) => {
  useEffect(() => {
    if (rippleStyleInjected) return;
    rippleStyleInjected = true;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes uixy-ripple {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const rings = Array.from({ length: count }, (_, i) => ({
    key: i,
    style: {
      position: "absolute" as const,
      left: "50%",
      top: "50%",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      border: `1.5px solid ${color}`,
      boxShadow: `0 0 30px 2px ${color}`,
      animation: `uixy-ripple ${duration}s ease-out infinite`,
      animationDelay: `${(i * duration) / count}s`,
      pointerEvents: "none" as const,
    },
  }));

  return (
    <div
      className={className ?? "fixed inset-0 -z-10 pointer-events-none"}
      style={{ overflow: "hidden", position: "relative" }}
    >
      {rings.map((r) => (
        <div key={r.key} style={r.style} />
      ))}
    </div>
  );
};

RippleBackground.displayName = "RippleBackground";
