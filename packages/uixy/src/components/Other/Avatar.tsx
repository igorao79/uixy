"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: number;
  shape?: "circle" | "square";
  status?: "online" | "offline" | "busy" | "away";
  ring?: boolean;
  ringColor?: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = 40, shape = "circle", status, ring, ringColor, className, ...props }, ref) => {
    const [imgError, setImgError] = useState(false);

    const statusColors: Record<string, string> = {
      online: "bg-emerald-500",
      offline: "bg-zinc-500",
      busy: "bg-red-500",
      away: "bg-amber-500",
    };

    const showFallback = !src || imgError;
    const dotSize = Math.max(10, Math.round(size * 0.28));
    const borderW = Math.max(2, Math.round(size * 0.06));

    // For circle, position dot at bottom-right on the circle edge using trig
    const angle = 45 * (Math.PI / 180); // 45 degrees from bottom-right
    const radius = size / 2;
    const dotX = radius + radius * Math.cos(angle) - dotSize / 2;
    const dotY = radius + radius * Math.sin(angle) - dotSize / 2;

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex shrink-0", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-center bg-zinc-800 overflow-hidden",
            shape === "circle" ? "rounded-full" : "rounded-lg",
            ring && "ring-2 ring-offset-2 ring-offset-zinc-950"
          )}
          style={{
            width: size,
            height: size,
            ...(ring ? { "--tw-ring-color": ringColor || "#8b5cf6" } as React.CSSProperties : {}),
          }}
        >
          {!showFallback ? (
            <img
              src={src}
              alt={alt || ""}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-medium text-zinc-300 select-none" style={{ fontSize: size * 0.38 }}>
              {fallback || "?"}
            </span>
          )}
        </div>

        {status && (
          <span
            className={cn("absolute rounded-full", statusColors[status])}
            style={{
              width: dotSize,
              height: dotSize,
              left: shape === "circle" ? dotX : undefined,
              top: shape === "circle" ? dotY : undefined,
              bottom: shape !== "circle" ? -dotSize / 4 : undefined,
              right: shape !== "circle" ? -dotSize / 4 : undefined,
              border: `${borderW}px solid #09090b`,
              zIndex: 1,
            }}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";
