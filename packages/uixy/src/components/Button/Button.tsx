"use client";

import React, { useEffect } from "react";
import { cn } from "../../utils/cn";

let btnStyleInjected = false;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link"
    | "gradient"
    | "glow"
    | "soft";
  size?: "sm" | "md" | "lg" | "icon";
  /** Pill-shaped rounded button */
  pill?: boolean;
  /** Show a loading spinner and disable the button */
  loading?: boolean;
  /** Icon element shown before the children */
  leftIcon?: React.ReactNode;
  /** Icon element shown after the children */
  rightIcon?: React.ReactNode;
  /** Accent color for gradient/glow/soft variants (hex, e.g. "#8b5cf6") */
  color?: string;
}

const variantStyles: Record<string, string> = {
  default:
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
  outline:
    "border border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800",
  ghost:
    "bg-transparent text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
  link: "bg-transparent text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100 p-0 h-auto",
  gradient: "uixy-btn-gradient text-white shadow-md hover:shadow-lg",
  glow: "uixy-btn-glow text-white",
  soft: "uixy-btn-soft",
};

const sizeStyles: Record<string, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  icon: "h-10 w-10",
};

const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  return `${parseInt(h.substring(0, 2), 16)}, ${parseInt(h.substring(2, 4), 16)}, ${parseInt(h.substring(4, 6), 16)}`;
}

function darken(hex: string, amount: number): string {
  const h = hex.replace("#", "");
  const r = Math.max(0, parseInt(h.substring(0, 2), 16) - amount);
  const g = Math.max(0, parseInt(h.substring(2, 4), 16) - amount);
  const b = Math.max(0, parseInt(h.substring(4, 6), 16) - amount);
  return `rgb(${r}, ${g}, ${b})`;
}

function lighten(hex: string, amount: number): string {
  const h = hex.replace("#", "");
  const r = Math.min(255, parseInt(h.substring(0, 2), 16) + amount);
  const g = Math.min(255, parseInt(h.substring(2, 4), 16) + amount);
  const b = Math.min(255, parseInt(h.substring(4, 6), 16) + amount);
  return `rgb(${r}, ${g}, ${b})`;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      pill = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      color,
      style,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (!btnStyleInjected) {
        btnStyleInjected = true;
        const s = document.createElement("style");
        s.textContent = `
          .uixy-btn-gradient {
            background: linear-gradient(to right, var(--uixy-btn-c1), var(--uixy-btn-c2));
          }
          .uixy-btn-gradient:hover {
            filter: brightness(0.9);
          }
          .uixy-btn-glow {
            background-color: var(--uixy-btn-c1);
            box-shadow: 0 0 15px rgba(var(--uixy-btn-rgb), 0.4);
          }
          .uixy-btn-glow:hover {
            filter: brightness(0.9);
            box-shadow: 0 0 25px rgba(var(--uixy-btn-rgb), 0.6);
          }
          .uixy-btn-soft {
            background-color: rgba(var(--uixy-btn-rgb), 0.12);
            color: var(--uixy-btn-c1);
          }
          .uixy-btn-soft:hover {
            background-color: rgba(var(--uixy-btn-rgb), 0.2);
          }
        `;
        document.head.appendChild(s);
      }
    }, []);

    const spinnerSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
    const c = color || "#8b5cf6";
    const needsColor = variant === "gradient" || variant === "glow" || variant === "soft";

    const colorVars: React.CSSProperties = needsColor
      ? {
          "--uixy-btn-c1": c,
          "--uixy-btn-c2": darken(c, 40),
          "--uixy-btn-rgb": hexToRgb(c),
        } as React.CSSProperties
      : {};

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          pill ? "rounded-full" : "rounded-md",
          className
        )}
        style={{ ...colorVars, ...style }}
        {...props}
      >
        {loading && <Spinner className={spinnerSize} />}
        {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
