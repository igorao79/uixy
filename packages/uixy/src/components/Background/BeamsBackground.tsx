"use client";

import React, { useEffect } from "react";

let beamsStyleInjected = false;

export interface BeamsBackgroundProps {
  /** Number of beams */
  count?: number;
  /** Beam colors */
  colors?: string[];
  /** Animation speed multiplier */
  speed?: number;
  /** Beam max opacity */
  opacity?: number;
  /** Beam width in px */
  beamWidth?: number;
  className?: string;
}

export const BeamsBackground: React.FC<BeamsBackgroundProps> = ({
  count = 8,
  colors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#ec4899"],
  speed = 1,
  opacity = 0.12,
  beamWidth = 300,
  className,
}) => {
  useEffect(() => {
    if (beamsStyleInjected) return;
    beamsStyleInjected = true;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes uixy-beam-sway {
        0%, 100% { transform: rotate(var(--uixy-beam-r0)) scaleY(1); opacity: var(--uixy-beam-o); }
        25% { transform: rotate(var(--uixy-beam-r1)) scaleY(1.1); opacity: calc(var(--uixy-beam-o) * 1.3); }
        50% { transform: rotate(var(--uixy-beam-r2)) scaleY(0.9); opacity: var(--uixy-beam-o); }
        75% { transform: rotate(var(--uixy-beam-r3)) scaleY(1.05); opacity: calc(var(--uixy-beam-o) * 0.8); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const beams = Array.from({ length: count }, (_, i) => {
    const angle = -30 + (i / (count - 1)) * 60; // spread -30 to +30 degrees
    const color = colors[i % colors.length];
    const duration = (12 + Math.random() * 10) / speed;
    const jitter = (Math.random() - 0.5) * 15;

    return {
      key: i,
      style: {
        position: "absolute" as const,
        bottom: "-20%",
        left: "50%",
        width: `${beamWidth}px`,
        height: "160%",
        marginLeft: `${-beamWidth / 2}px`,
        transformOrigin: "center bottom",
        background: `linear-gradient(to top, ${color}00 0%, ${color} 30%, ${color}80 60%, transparent 100%)`,
        filter: `blur(${40 + Math.random() * 30}px)`,
        animation: `uixy-beam-sway ${duration}s ease-in-out infinite`,
        animationDelay: `${-Math.random() * duration}s`,
        "--uixy-beam-r0": `${angle + jitter}deg`,
        "--uixy-beam-r1": `${angle + jitter + 5}deg`,
        "--uixy-beam-r2": `${angle + jitter - 4}deg`,
        "--uixy-beam-r3": `${angle + jitter + 3}deg`,
        "--uixy-beam-o": String(opacity),
        pointerEvents: "none" as const,
        mixBlendMode: "screen" as const,
      } as React.CSSProperties,
    };
  });

  return (
    <div
      className={className ?? "fixed inset-0 -z-10 pointer-events-none"}
      style={{ overflow: "hidden", position: "relative" }}
    >
      {beams.map((b) => (
        <div key={b.key} style={b.style} />
      ))}
    </div>
  );
};

BeamsBackground.displayName = "BeamsBackground";
