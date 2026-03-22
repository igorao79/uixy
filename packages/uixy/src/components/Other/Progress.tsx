"use client";

import React, { forwardRef, useEffect } from "react";
import { cn } from "../../utils/cn";

let progressStyleInjected = false;

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value 0-100 */
  value?: number;
  /** Visual style */
  variant?: "default" | "gradient" | "striped" | "glow";
  /** Bar size */
  size?: "sm" | "md" | "lg";
  /** Show percentage label */
  showValue?: boolean;
  /** Bar color */
  color?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, variant = "default", size = "md", showValue, color, className, ...props }, ref) => {
    useEffect(() => {
      if (!progressStyleInjected) {
        progressStyleInjected = true;
        const style = document.createElement("style");
        style.textContent = `
          @keyframes uixy-progress-stripes {
            0% { background-position: 1rem 0; }
            100% { background-position: 0 0; }
          }
        `;
        document.head.appendChild(style);
      }
    }, []);

    const clamped = Math.min(100, Math.max(0, value));

    const sizes: Record<string, string> = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
    };

    const barBase = "h-full rounded-full transition-all duration-500 ease-out";

    const barStyles: Record<string, string | React.CSSProperties> = {
      default: color || "#8b5cf6",
      gradient: "",
      striped: color || "#8b5cf6",
      glow: color || "#8b5cf6",
    };

    const barCss: React.CSSProperties = {
      width: `${clamped}%`,
    };

    if (variant === "gradient") {
      barCss.background = "linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)";
    } else if (variant === "striped") {
      barCss.backgroundColor = (barStyles.striped as string);
      barCss.backgroundImage = "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)";
      barCss.backgroundSize = "1rem 1rem";
      barCss.animation = "uixy-progress-stripes 0.6s linear infinite";
    } else if (variant === "glow") {
      barCss.backgroundColor = (barStyles.glow as string);
      barCss.boxShadow = `0 0 8px ${color || "#8b5cf6"}80, 0 0 20px ${color || "#8b5cf6"}40`;
    } else {
      barCss.backgroundColor = (barStyles.default as string);
    }

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <div className={cn("w-full rounded-full bg-zinc-800 overflow-hidden", sizes[size])}>
          <div className={barBase} style={barCss} />
        </div>
        {showValue && size === "lg" && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-white">
            {Math.round(clamped)}%
          </span>
        )}
        {showValue && size !== "lg" && (
          <span className="text-[10px] text-zinc-400 mt-1 block text-right">{Math.round(clamped)}%</span>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";
