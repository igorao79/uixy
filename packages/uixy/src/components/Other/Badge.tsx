"use client";

import React, { forwardRef, useEffect } from "react";
import { cn } from "../../utils/cn";

let badgeStyleInjected = false;

export type BadgeVariant =
  | "default" | "secondary" | "outline" | "success" | "warning" | "destructive"
  | "glow" | "gradient" | "glass" | "neon" | "shimmer" | "soft"
  | "info" | "premium" | "new" | "beta";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  dotColor?: string;
  /** Pill shape (more rounded) */
  pill?: boolean;
  /** Icon before text */
  icon?: React.ReactNode;
  /** Accent color override for default/glow/gradient/soft variants (hex) */
  color?: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", size = "md", dot, dotColor, pill = true, icon, color, className, children, style, ...props }, ref) => {
    useEffect(() => {
      if (!badgeStyleInjected) {
        badgeStyleInjected = true;
        const style = document.createElement("style");
        style.textContent = `
          @keyframes uixy-badge-shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `;
        document.head.appendChild(style);
      }
    }, []);

    const variants: Record<string, string> = {
      default: "bg-violet-500/15 text-violet-400 border-violet-500/20",
      secondary: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
      outline: "bg-transparent text-zinc-300 border-zinc-600",
      success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
      warning: "bg-amber-500/15 text-amber-400 border-amber-500/20",
      destructive: "bg-red-500/15 text-red-400 border-red-500/20",
      glow: "bg-violet-500/15 text-violet-400 border-violet-500/30 shadow-[0_0_8px_rgba(139,92,246,0.3)]",
      gradient: "bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-violet-300 border-violet-500/20",
      glass: "bg-white/5 backdrop-blur-md text-zinc-200 border-white/10",
      neon: "bg-transparent text-cyan-400 border-cyan-400/50 shadow-[0_0_6px_rgba(34,211,238,0.4),inset_0_0_6px_rgba(34,211,238,0.1)]",
      shimmer: "text-zinc-200 border-zinc-700",
      soft: "bg-violet-500/8 text-violet-300 border-transparent",
      info: "bg-blue-500/15 text-blue-400 border-blue-500/20",
      premium: "bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 text-amber-300 border-amber-500/25",
      new: "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/20",
      beta: "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/20",
    };

    const sizes: Record<string, string> = {
      sm: "text-[10px] px-1.5 py-0.5 gap-1",
      md: "text-xs px-2.5 py-0.5 gap-1.5",
      lg: "text-sm px-3 py-1 gap-1.5",
    };

    const dotColors: Record<string, string> = {
      default: "bg-violet-400", secondary: "bg-zinc-400", outline: "bg-zinc-400",
      success: "bg-emerald-400", warning: "bg-amber-400", destructive: "bg-red-400",
      glow: "bg-violet-400", gradient: "bg-violet-400", glass: "bg-zinc-300",
      neon: "bg-cyan-400", shimmer: "bg-zinc-400", soft: "bg-violet-400",
      info: "bg-blue-400", premium: "bg-amber-400", new: "bg-emerald-400", beta: "bg-indigo-400",
    };

    // Custom color override for accent variants
    const colorOverride: React.CSSProperties = {};
    if (color && ["default", "glow", "gradient", "soft"].includes(variant)) {
      const h = color.replace("#", "");
      const r = parseInt(h.substring(0, 2), 16);
      const g = parseInt(h.substring(2, 4), 16);
      const b = parseInt(h.substring(4, 6), 16);
      colorOverride.backgroundColor = `rgba(${r},${g},${b},0.15)`;
      colorOverride.color = color;
      colorOverride.borderColor = `rgba(${r},${g},${b},0.2)`;
      if (variant === "glow") {
        colorOverride.boxShadow = `0 0 8px rgba(${r},${g},${b},0.3)`;
      }
    }

    const shimmerStyle: React.CSSProperties = variant === "shimmer" ? {
      backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.08) 50%, transparent 75%)",
      backgroundSize: "200% 100%",
      animation: "uixy-badge-shimmer 2s ease-in-out infinite",
    } : {};

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium border whitespace-nowrap transition-colors",
          pill ? "rounded-full" : "rounded-md",
          variants[variant],
          sizes[size],
          className
        )}
        style={{ ...shimmerStyle, ...colorOverride, ...style }}
        {...props}
      >
        {dot && (
          <span
            className={cn("w-1.5 h-1.5 rounded-full animate-pulse shrink-0", dotColor ? "" : dotColors[variant])}
            style={dotColor ? { backgroundColor: dotColor } : undefined}
          />
        )}
        {icon && <span className="shrink-0 [&>svg]:w-3 [&>svg]:h-3">{icon}</span>}
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";
