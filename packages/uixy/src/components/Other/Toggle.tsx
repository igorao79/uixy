"use client";

import React, { forwardRef, useEffect } from "react";
import { cn } from "../../utils/cn";

let toggleStyleInjected = false;

export type ToggleVariant = "default" | "ios" | "material" | "outline" | "glow" | "pill" | "slim" | "labeled";

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  variant?: ToggleVariant;
  color?: string;
  label?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ size = "md", variant = "default", color, label, className, checked, disabled, ...props }, ref) => {
    useEffect(() => {
      if (!toggleStyleInjected) {
        toggleStyleInjected = true;
        const style = document.createElement("style");
        style.textContent = `
          .uixy-toggle-thumb {
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
          }
          .uixy-toggle-track {
            transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          }
        `;
        document.head.appendChild(style);
      }
    }, []);

    const sizes = {
      sm: { trackW: 32, trackH: 18, thumb: 14, pad: 2 },
      md: { trackW: 44, trackH: 24, thumb: 18, pad: 3 },
      lg: { trackW: 56, trackH: 30, thumb: 24, pad: 3 },
    };
    const s = sizes[size];
    const translatePx = s.trackW - s.thumb - s.pad * 2;
    const activeColor = color || "#8b5cf6";

    // Variant-specific track styles
    const trackStyles: React.CSSProperties = { width: s.trackW, height: s.trackH };
    const thumbStyles: React.CSSProperties = {
      width: s.thumb,
      height: s.thumb,
      transform: checked ? `translateX(${translatePx}px)` : "translateX(0px)",
    };
    let trackClasses = "uixy-toggle-track rounded-full relative cursor-pointer";
    let thumbClasses = "uixy-toggle-thumb absolute rounded-full shadow-sm";

    if (variant === "default" || variant === "ios") {
      trackStyles.backgroundColor = checked ? activeColor : "rgb(63, 63, 70)";
      thumbStyles.backgroundColor = "white";
      thumbStyles.top = s.pad;
      thumbStyles.left = s.pad;
      if (variant === "ios" && checked) {
        thumbStyles.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
      }
    } else if (variant === "material") {
      trackStyles.backgroundColor = checked ? `${activeColor}60` : "rgb(82, 82, 91)";
      thumbStyles.backgroundColor = checked ? activeColor : "rgb(161, 161, 170)";
      thumbStyles.top = s.pad - 1;
      thumbStyles.left = s.pad;
      thumbStyles.width = s.thumb + 2;
      thumbStyles.height = s.thumb + 2;
      thumbStyles.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
    } else if (variant === "outline") {
      trackStyles.backgroundColor = "transparent";
      trackStyles.border = `2px solid ${checked ? activeColor : "rgb(113, 113, 122)"}`;
      thumbStyles.backgroundColor = checked ? activeColor : "rgb(161, 161, 170)";
      thumbStyles.top = s.pad;
      thumbStyles.left = s.pad;
    } else if (variant === "glow") {
      trackStyles.backgroundColor = checked ? activeColor : "rgb(63, 63, 70)";
      if (checked) {
        trackStyles.boxShadow = `0 0 12px ${activeColor}60, 0 0 24px ${activeColor}30`;
      }
      thumbStyles.backgroundColor = "white";
      thumbStyles.top = s.pad;
      thumbStyles.left = s.pad;
    } else if (variant === "pill") {
      trackStyles.backgroundColor = checked ? activeColor : "rgb(63, 63, 70)";
      trackClasses += " " + (size === "sm" ? "!rounded-sm" : size === "md" ? "!rounded-md" : "!rounded-lg");
      thumbClasses = thumbClasses.replace("rounded-full", size === "sm" ? "rounded-[2px]" : size === "md" ? "rounded-[4px]" : "rounded-[6px]");
      thumbStyles.backgroundColor = "white";
      thumbStyles.top = s.pad;
      thumbStyles.left = s.pad;
    } else if (variant === "slim") {
      trackStyles.height = Math.round(s.trackH * 0.55);
      trackStyles.backgroundColor = checked ? `${activeColor}60` : "rgb(63, 63, 70)";
      trackStyles.borderRadius = s.trackH;
      thumbStyles.backgroundColor = checked ? activeColor : "rgb(161, 161, 170)";
      thumbStyles.top = -Math.round((s.thumb - Math.round(s.trackH * 0.55)) / 2);
      thumbStyles.left = s.pad;
      thumbStyles.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
    } else if (variant === "labeled") {
      trackStyles.backgroundColor = checked ? activeColor : "rgb(63, 63, 70)";
      thumbStyles.backgroundColor = "white";
      thumbStyles.top = s.pad;
      thumbStyles.left = s.pad;
    }

    return (
      <label className={cn("inline-flex items-center gap-2.5 cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed", className)}>
        <div className="relative">
          <input ref={ref} type="checkbox" className="sr-only peer" checked={checked} disabled={disabled} {...props} />
          <div className={trackClasses} style={trackStyles}>
            {variant === "labeled" && (
              <span
                className="absolute inset-0 flex items-center text-white font-bold select-none"
                style={{ fontSize: Math.round(s.thumb * 0.45), paddingLeft: s.pad + 3, paddingRight: s.pad + 3, justifyContent: checked ? "flex-start" : "flex-end" }}
              >
                {checked ? "ON" : "OFF"}
              </span>
            )}
          </div>
          <div className={thumbClasses} style={thumbStyles} />
        </div>
        {label && <span className="text-sm text-zinc-300">{label}</span>}
      </label>
    );
  }
);
Toggle.displayName = "Toggle";
