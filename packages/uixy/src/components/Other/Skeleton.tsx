"use client";

import React, { useEffect } from "react";
import { cn } from "../../utils/cn";

let skeletonStyleInjected = false;

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: "rectangle" | "circle" | "text";
  /** Width (CSS value) */
  width?: string | number;
  /** Height (CSS value) */
  height?: string | number;
  /** Animation style */
  animation?: "pulse" | "shimmer" | "none";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "rectangle",
  width,
  height,
  animation = "shimmer",
  className,
  ...props
}) => {
  useEffect(() => {
    if (!skeletonStyleInjected) {
      skeletonStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        @keyframes uixy-skeleton-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const shapes: Record<string, string> = {
    rectangle: "rounded-md",
    circle: "rounded-full",
    text: "rounded h-4",
  };

  const animStyles: Record<string, React.CSSProperties> = {
    pulse: {},
    shimmer: {
      background: "linear-gradient(90deg, rgba(63,63,70,0.4) 25%, rgba(82,82,91,0.6) 50%, rgba(63,63,70,0.4) 75%)",
      backgroundSize: "400% 100%",
      animation: "uixy-skeleton-shimmer 1.5s ease-in-out infinite",
    },
    none: {},
  };

  return (
    <div
      className={cn(
        shapes[variant],
        animation === "pulse" && "animate-pulse bg-zinc-800",
        animation === "none" && "bg-zinc-800",
        className
      )}
      style={{
        width: width ?? (variant === "circle" ? 40 : "100%"),
        height: height ?? (variant === "circle" ? 40 : variant === "text" ? 16 : 20),
        ...(animation === "shimmer" ? animStyles.shimmer : {}),
      }}
      {...props}
    />
  );
};

Skeleton.displayName = "Skeleton";
