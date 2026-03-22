"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "../../utils/cn";

let tooltipStyleInjected = false;

export type TooltipVariant = "default" | "dark" | "light" | "gradient" | "glass" | "outlined" | "neon" | "success" | "warning" | "error";

export interface TooltipProps {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  variant?: TooltipVariant;
  delay?: number;
  arrow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  side = "top",
  variant = "default",
  delay = 300,
  arrow = true,
  children,
  className,
}) => {
  const [state, setState] = useState<"hidden" | "entering" | "visible" | "leaving">("hidden");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!tooltipStyleInjected) {
      tooltipStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        .uixy-tt { pointer-events: none; }
        .uixy-tt[data-state="entering"] { opacity: 0; transform: translateY(var(--uixy-tt-dy,0)) translateX(var(--uixy-tt-dx,0)) scale(0.95); }
        .uixy-tt[data-state="visible"]  { opacity: 1; transform: translateY(0) translateX(0) scale(1); transition: opacity .15s ease-out, transform .15s ease-out; }
        .uixy-tt[data-state="leaving"]  { opacity: 0; transform: scale(0.97); transition: opacity .1s ease-in, transform .1s ease-in; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const show = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setState("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setState("visible"));
      });
    }, delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    setState("leaving");
    timerRef.current = setTimeout(() => setState("hidden"), 120);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const variants: Record<string, string> = {
    default: "bg-zinc-800 text-zinc-100 border border-zinc-700",
    dark: "bg-zinc-950 text-zinc-100 border border-zinc-800",
    light: "bg-zinc-100 text-zinc-900 border border-zinc-200",
    gradient: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white",
    glass: "bg-white/10 backdrop-blur-md text-zinc-100 border border-white/20",
    outlined: "bg-transparent text-zinc-300 border-2 border-zinc-500",
    neon: "bg-zinc-950 text-violet-300 border border-violet-500/50 shadow-[0_0_12px_rgba(139,92,246,0.3)]",
    success: "bg-emerald-950 text-emerald-200 border border-emerald-700/50",
    warning: "bg-amber-950 text-amber-200 border border-amber-700/50",
    error: "bg-red-950 text-red-200 border border-red-700/50",
  };

  const arrowBg: Record<string, string> = {
    default: "bg-zinc-800 border-zinc-700",
    dark: "bg-zinc-950 border-zinc-800",
    light: "bg-zinc-100 border-zinc-200",
    gradient: "bg-violet-600 border-violet-600",
    glass: "bg-white/10 border-white/20",
    outlined: "bg-zinc-950 border-zinc-500",
    neon: "bg-zinc-950 border-violet-500/50",
    success: "bg-emerald-950 border-emerald-700/50",
    warning: "bg-amber-950 border-amber-700/50",
    error: "bg-red-950 border-red-700/50",
  };

  // Animation offsets per side
  const slideVars: Record<string, React.CSSProperties> = {
    top: { "--uixy-tt-dy": "4px", "--uixy-tt-dx": "0" } as React.CSSProperties,
    bottom: { "--uixy-tt-dy": "-4px", "--uixy-tt-dx": "0" } as React.CSSProperties,
    left: { "--uixy-tt-dx": "4px", "--uixy-tt-dy": "0" } as React.CSSProperties,
    right: { "--uixy-tt-dx": "-4px", "--uixy-tt-dy": "0" } as React.CSSProperties,
  };

  // Position classes — use separate position + centering
  const positionStyle: Record<string, React.CSSProperties> = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 8 },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8 },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 8 },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 8 },
  };

  // Arrow side positioning
  const arrowSide: Record<string, React.CSSProperties> = {
    top: { bottom: -4, left: "50%", marginLeft: -4 },
    bottom: { top: -4, left: "50%", marginLeft: -4 },
    left: { right: -4, top: "50%", marginTop: -4 },
    right: { left: -4, top: "50%", marginTop: -4 },
  };

  // Arrow border sides to show
  const arrowBorderSide: Record<string, string> = {
    top: "border-b border-r",
    bottom: "border-t border-l",
    left: "border-t border-r",
    right: "border-b border-l",
  };

  if (state === "hidden") {
    return (
      <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
        {children}
      </div>
    );
  }

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      <div
        className={cn(
          "uixy-tt absolute z-50 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shadow-lg",
          variants[variant],
          className
        )}
        style={{ ...positionStyle[side], ...slideVars[side] }}
        data-state={state}
        role="tooltip"
      >
        {content}
        {arrow && (
          <span
            className={cn("absolute w-2 h-2 rotate-45", arrowBorderSide[side], arrowBg[variant])}
            style={arrowSide[side]}
          />
        )}
      </div>
    </div>
  );
};

Tooltip.displayName = "Tooltip";
