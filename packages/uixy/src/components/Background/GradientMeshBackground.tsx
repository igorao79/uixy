"use client";

import React, { useEffect, useRef } from "react";

let meshStyleInjected = false;

export interface GradientMeshBackgroundProps {
  /** Array of 4 color stops */
  colors?: string[];
  /** Animation speed multiplier */
  speed?: number;
  /** Mesh intensity / contrast */
  intensity?: number;
  className?: string;
}

export const GradientMeshBackground: React.FC<GradientMeshBackgroundProps> = ({
  colors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#ec4899"],
  speed = 1,
  intensity = 1,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!meshStyleInjected) {
      meshStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        @keyframes uixy-mesh-1 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          25% { transform: translate(30%, -20%) scale(1.1); }
          50% { transform: translate(-10%, 30%) scale(0.95); }
          75% { transform: translate(20%, 10%) scale(1.05); }
        }
        @keyframes uixy-mesh-2 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          25% { transform: translate(-25%, 15%) scale(1.05); }
          50% { transform: translate(20%, -25%) scale(1.1); }
          75% { transform: translate(-15%, -10%) scale(0.9); }
        }
        @keyframes uixy-mesh-3 {
          0%, 100% { transform: translate(0%, 0%) scale(1.05); }
          33% { transform: translate(15%, 25%) scale(0.95); }
          66% { transform: translate(-20%, -15%) scale(1.1); }
        }
        @keyframes uixy-mesh-4 {
          0%, 100% { transform: translate(0%, 0%) scale(0.95); }
          33% { transform: translate(-30%, 10%) scale(1.1); }
          66% { transform: translate(10%, -30%) scale(1); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const animations = [
    `uixy-mesh-1 ${12 / speed}s ease-in-out infinite`,
    `uixy-mesh-2 ${15 / speed}s ease-in-out infinite`,
    `uixy-mesh-3 ${18 / speed}s ease-in-out infinite`,
    `uixy-mesh-4 ${14 / speed}s ease-in-out infinite`,
  ];

  const positions = [
    { top: "10%", left: "15%" },
    { top: "60%", right: "10%" },
    { bottom: "15%", left: "25%" },
    { top: "30%", right: "30%" },
  ];

  return (
    <div
      ref={containerRef}
      className={className ?? "fixed inset-0 -z-10 pointer-events-none w-full h-full"}
      style={{ overflow: "hidden", position: "relative" }}
    >
      {colors.slice(0, 4).map((color, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: 0.25 * intensity,
            filter: "blur(80px)",
            animation: animations[i],
            ...positions[i],
          }}
        />
      ))}
    </div>
  );
};

GradientMeshBackground.displayName = "GradientMeshBackground";
