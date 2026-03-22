"use client";

import React, { useEffect } from "react";
import { cn } from "../../utils/cn";

let marqueeStyleInjected = false;

export interface MarqueeProps {
  children: React.ReactNode;
  /** Speed in seconds for one full cycle */
  speed?: number;
  /** Direction */
  direction?: "left" | "right" | "up" | "down";
  /** Pause on hover */
  pauseOnHover?: boolean;
  /** Fade edges */
  fade?: boolean;
  /** Number of copies (higher = smoother for short content) */
  repeat?: number;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  fade = true,
  repeat = 4,
  className,
}) => {
  useEffect(() => {
    if (!marqueeStyleInjected) {
      marqueeStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        @keyframes uixy-marquee-h { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes uixy-marquee-v { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const isVertical = direction === "up" || direction === "down";
  const isReverse = direction === "right" || direction === "down";

  const animName = isVertical ? "uixy-marquee-v" : "uixy-marquee-h";
  const animDir = isReverse ? "reverse" : "normal";
  const fadeDir = isVertical ? "to bottom" : "to right";

  return (
    <div
      className={cn("overflow-hidden relative", className)}
      style={fade ? {
        maskImage: `linear-gradient(${fadeDir}, transparent 0%, black 10%, black 90%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(${fadeDir}, transparent 0%, black 10%, black 90%, transparent 100%)`,
      } : undefined}
    >
      <div
        className={cn(
          isVertical ? "flex flex-col" : "flex",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `${animName} ${speed}s linear infinite`,
          animationDirection: animDir,
        }}
      >
        {Array.from({ length: repeat }, (_, i) => (
          <div key={i} className={cn(isVertical ? "flex flex-col" : "flex", "shrink-0")}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

Marquee.displayName = "Marquee";
