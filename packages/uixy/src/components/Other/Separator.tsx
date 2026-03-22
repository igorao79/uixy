"use client";

import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Visual style */
  variant?: "default" | "dashed" | "dotted" | "gradient";
  /** Label in the middle */
  label?: string;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", variant = "default", label, className, ...props }, ref) => {
    const isH = orientation === "horizontal";

    if (variant === "gradient") {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn(
            isH ? "w-full h-px" : "h-full w-px",
            className
          )}
          style={{
            background: isH
              ? "linear-gradient(to right, transparent, rgba(113,113,122,0.5), transparent)"
              : "linear-gradient(to bottom, transparent, rgba(113,113,122,0.5), transparent)",
          }}
          {...props}
        />
      );
    }

    const styles: Record<string, string> = {
      default: "border-solid",
      dashed: "border-dashed",
      dotted: "border-dotted",
    };

    if (label && isH) {
      return (
        <div ref={ref} role="separator" className={cn("flex items-center gap-3", className)} {...props}>
          <div className={cn("flex-1 border-t border-zinc-800", styles[variant])} />
          <span className="text-xs text-zinc-500 whitespace-nowrap">{label}</span>
          <div className={cn("flex-1 border-t border-zinc-800", styles[variant])} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={cn(
          isH
            ? cn("w-full border-t border-zinc-800", styles[variant])
            : cn("h-full border-l border-zinc-800", styles[variant]),
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";
