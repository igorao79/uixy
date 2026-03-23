"use client";

import React, { useState, useId, useEffect } from "react";
import { cn } from "../../utils/cn";

let inputGlowStyleInjected = false;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "filled" | "underline" | "floating" | "ghost" | "glow";
  inputSize?: "sm" | "md" | "lg";
  error?: boolean;
  /** Label text for the floating variant (required when variant="floating") */
  label?: string;
  /** Custom class for the floating label */
  labelClassName?: string;
  /** Custom class for the floating wrapper */
  wrapperClassName?: string;
  /** Icon element to show on the left side */
  leftIcon?: React.ReactNode;
  /** Icon element to show on the right side */
  rightIcon?: React.ReactNode;
  /** Accent color for glow variant focus (hex) */
  color?: string;
}

const variantStyles: Record<string, string> = {
  default:
    "border border-zinc-300 bg-transparent dark:border-zinc-700 dark:bg-transparent",
  filled:
    "border border-transparent bg-zinc-100 dark:bg-zinc-800",
  underline:
    "border-b border-zinc-300 bg-transparent rounded-none px-0 dark:border-zinc-700",
  floating:
    "peer border border-zinc-300 bg-transparent dark:border-zinc-700 dark:bg-transparent",
  ghost:
    "border border-transparent bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-800",
  glow:
    "border border-zinc-300 bg-transparent dark:border-zinc-700 dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 uixy-input-glow",
};

const sizeStyles: Record<NonNullable<InputProps["inputSize"]>, string> = {
  sm: "h-8 px-2 text-xs",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

const iconSizeStyles: Record<NonNullable<InputProps["inputSize"]>, { left: string; right: string; inputLeft: string; inputRight: string }> = {
  sm: { left: "left-2", right: "right-2", inputLeft: "pl-7", inputRight: "pr-7" },
  md: { left: "left-3", right: "right-3", inputLeft: "pl-9", inputRight: "pr-9" },
  lg: { left: "left-4", right: "right-4", inputLeft: "pl-11", inputRight: "pr-11" },
};

const floatingSizeStyles: Record<NonNullable<InputProps["inputSize"]>, {
  input: string;
  label: string;
  floated: string;
  resting: string;
}> = {
  sm: {
    input: "h-10 pt-4 pb-1 px-3 text-xs",
    label: "text-xs left-3",
    floated: "top-1 text-[10px]",
    resting: "top-1/2 -translate-y-1/2 text-xs",
  },
  md: {
    input: "h-12 pt-5 pb-2 px-3 text-sm",
    label: "text-sm left-3",
    floated: "top-1.5 text-[11px]",
    resting: "top-1/2 -translate-y-1/2 text-sm",
  },
  lg: {
    input: "h-14 pt-6 pb-2 px-4 text-base",
    label: "text-base left-4",
    floated: "top-2 text-xs",
    resting: "top-1/2 -translate-y-1/2 text-base",
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      inputSize = "md",
      error,
      label,
      labelClassName,
      wrapperClassName,
      leftIcon,
      rightIcon,
      color,
      id,
      onChange,
      onFocus,
      onBlur,
      defaultValue,
      value: controlledValue,
      style,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (!inputGlowStyleInjected) {
        inputGlowStyleInjected = true;
        const s = document.createElement("style");
        s.textContent = `
          .uixy-input-glow:focus {
            border-color: var(--uixy-input-glow-c, #8b5cf6) !important;
            box-shadow: 0 0 10px rgba(var(--uixy-input-glow-rgb, 139,92,246), 0.5),
                        0 0 20px rgba(var(--uixy-input-glow-rgb, 139,92,246), 0.2) !important;
          }
        `;
        document.head.appendChild(s);
      }
    }, []);

    // Floating variant
    if (variant === "floating") {
      return (
        <FloatingInputInternal
          ref={ref}
          className={className}
          inputSize={inputSize}
          error={error}
          label={label || ""}
          labelClassName={labelClassName}
          wrapperClassName={wrapperClassName}
          id={id}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          defaultValue={defaultValue}
          value={controlledValue}
          {...props}
        />
      );
    }

    // With icons — needs a wrapper
    if (leftIcon || rightIcon) {
      const iconSizes = iconSizeStyles[inputSize];
      return (
        <div className={cn("relative w-full", wrapperClassName)}>
          {leftIcon && (
            <span className={cn("pointer-events-none absolute top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500", iconSizes.left)}>
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              "w-full rounded-md text-zinc-900 placeholder:text-zinc-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-100 dark:placeholder:text-zinc-500",
              variantStyles[variant],
              sizeStyles[inputSize],
              leftIcon && iconSizes.inputLeft,
              rightIcon && iconSizes.inputRight,
              error && "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
              className
            )}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            defaultValue={defaultValue}
            value={controlledValue}
            {...props}
          />
          {rightIcon && (
            <span className={cn("pointer-events-none absolute top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500", iconSizes.right)}>
              {rightIcon}
            </span>
          )}
        </div>
      );
    }

    // Standard input
    return (
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-md text-zinc-900 placeholder:text-zinc-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-100 dark:placeholder:text-zinc-500",
          variantStyles[variant],
          sizeStyles[inputSize],
          error && "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
          className
        )}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        defaultValue={defaultValue}
        value={controlledValue}
        style={{
          ...(variant === "glow" && color ? {
            "--uixy-input-glow-c": color,
            "--uixy-input-glow-rgb": (() => {
              const h = color.replace("#", "");
              return `${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)}`;
            })(),
          } as React.CSSProperties : {}),
          ...style,
        }}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

// ── Internal FloatingInput ──
interface FloatingInternalProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  inputSize: NonNullable<InputProps["inputSize"]>;
  error?: boolean;
  label: string;
  labelClassName?: string;
  wrapperClassName?: string;
}

const FloatingInputInternal = React.forwardRef<HTMLInputElement, FloatingInternalProps>(
  (
    {
      className, inputSize, error, label, labelClassName, wrapperClassName,
      id, onChange, onFocus, onBlur, defaultValue, value: controlledValue, ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue?.toString() || "");

    const value = controlledValue !== undefined ? controlledValue.toString() : internalValue;
    const isFloated = focused || value.length > 0;
    const sizes = floatingSizeStyles[inputSize];

    return (
      <div className={cn("relative w-full", wrapperClassName)}>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "peer w-full rounded-md border border-zinc-300 bg-transparent text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-100",
            sizes.input,
            error && "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
            className
          )}
          value={controlledValue !== undefined ? controlledValue : undefined}
          defaultValue={controlledValue !== undefined ? undefined : defaultValue}
          onChange={(e) => {
            if (controlledValue === undefined) setInternalValue(e.target.value);
            onChange?.(e);
          }}
          onFocus={(e) => { setFocused(true); onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute transition-all duration-200 ease-out",
            sizes.label,
            isFloated
              ? cn(sizes.floated, focused ? (error ? "text-red-500" : "text-zinc-500 dark:text-zinc-400") : "text-zinc-400 dark:text-zinc-500")
              : cn(sizes.resting, "text-zinc-400 dark:text-zinc-500"),
            labelClassName
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingInputInternal.displayName = "FloatingInputInternal";
