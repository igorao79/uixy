// src/components/Button/Button.tsx
import React, { useEffect } from "react";

// src/utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/Button/Button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var btnStyleInjected = false;
var variantStyles = {
  default: "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
  secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
  outline: "border border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800",
  ghost: "bg-transparent text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800",
  destructive: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800",
  link: "bg-transparent text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100 p-0 h-auto",
  gradient: "uixy-btn-gradient text-white shadow-md hover:shadow-lg",
  glow: "uixy-btn-glow text-white",
  soft: "uixy-btn-soft"
};
var sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  icon: "h-10 w-10"
};
var Spinner = ({ className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    className: cn("animate-spin", className),
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    children: [
      /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
      /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
    ]
  }
);
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return `${parseInt(h.substring(0, 2), 16)}, ${parseInt(h.substring(2, 4), 16)}, ${parseInt(h.substring(4, 6), 16)}`;
}
function darken(hex, amount) {
  const h = hex.replace("#", "");
  const r = Math.max(0, parseInt(h.substring(0, 2), 16) - amount);
  const g = Math.max(0, parseInt(h.substring(2, 4), 16) - amount);
  const b = Math.max(0, parseInt(h.substring(4, 6), 16) - amount);
  return `rgb(${r}, ${g}, ${b})`;
}
var Button = React.forwardRef(
  ({
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
  }, ref) => {
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
    const colorVars = needsColor ? {
      "--uixy-btn-c1": c,
      "--uixy-btn-c2": darken(c, 40),
      "--uixy-btn-rgb": hexToRgb(c)
    } : {};
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        disabled: disabled || loading,
        className: cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          pill ? "rounded-full" : "rounded-md",
          className
        ),
        style: { ...colorVars, ...style },
        ...props,
        children: [
          loading && /* @__PURE__ */ jsx(Spinner, { className: spinnerSize }),
          !loading && leftIcon && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: leftIcon }),
          children,
          !loading && rightIcon && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: rightIcon })
        ]
      }
    );
  }
);
Button.displayName = "Button";

// src/components/Input/Input.tsx
import React2, { useState, useId, useEffect as useEffect2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var inputGlowStyleInjected = false;
var variantStyles2 = {
  default: "border border-zinc-300 bg-transparent dark:border-zinc-700 dark:bg-transparent",
  filled: "border border-transparent bg-zinc-100 dark:bg-zinc-800",
  underline: "border-b border-zinc-300 bg-transparent rounded-none px-0 dark:border-zinc-700",
  floating: "peer border border-zinc-300 bg-transparent dark:border-zinc-700 dark:bg-transparent",
  ghost: "border border-transparent bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-800",
  glow: "border border-zinc-300 bg-transparent dark:border-zinc-700 dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 uixy-input-glow"
};
var sizeStyles2 = {
  sm: "h-8 px-2 text-xs",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base"
};
var iconSizeStyles = {
  sm: { left: "left-2", right: "right-2", inputLeft: "pl-7", inputRight: "pr-7" },
  md: { left: "left-3", right: "right-3", inputLeft: "pl-9", inputRight: "pr-9" },
  lg: { left: "left-4", right: "right-4", inputLeft: "pl-11", inputRight: "pr-11" }
};
var floatingSizeStyles = {
  sm: {
    input: "h-10 pt-4 pb-1 px-3 text-xs",
    label: "text-xs left-3",
    floated: "top-1 text-[10px]",
    resting: "top-1/2 -translate-y-1/2 text-xs"
  },
  md: {
    input: "h-12 pt-5 pb-2 px-3 text-sm",
    label: "text-sm left-3",
    floated: "top-1.5 text-[11px]",
    resting: "top-1/2 -translate-y-1/2 text-sm"
  },
  lg: {
    input: "h-14 pt-6 pb-2 px-4 text-base",
    label: "text-base left-4",
    floated: "top-2 text-xs",
    resting: "top-1/2 -translate-y-1/2 text-base"
  }
};
var Input = React2.forwardRef(
  ({
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
  }, ref) => {
    useEffect2(() => {
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
    if (variant === "floating") {
      return /* @__PURE__ */ jsx2(
        FloatingInputInternal,
        {
          ref,
          className,
          inputSize,
          error,
          label: label || "",
          labelClassName,
          wrapperClassName,
          id,
          onChange,
          onFocus,
          onBlur,
          defaultValue,
          value: controlledValue,
          ...props
        }
      );
    }
    if (leftIcon || rightIcon) {
      const iconSizes = iconSizeStyles[inputSize];
      return /* @__PURE__ */ jsxs2("div", { className: cn("relative w-full", wrapperClassName), children: [
        leftIcon && /* @__PURE__ */ jsx2("span", { className: cn("pointer-events-none absolute top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500", iconSizes.left), children: leftIcon }),
        /* @__PURE__ */ jsx2(
          "input",
          {
            ref,
            id,
            className: cn(
              "w-full rounded-md text-zinc-900 placeholder:text-zinc-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-100 dark:placeholder:text-zinc-500",
              variantStyles2[variant],
              sizeStyles2[inputSize],
              leftIcon && iconSizes.inputLeft,
              rightIcon && iconSizes.inputRight,
              error && "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
              className
            ),
            onChange,
            onFocus,
            onBlur,
            defaultValue,
            value: controlledValue,
            ...props
          }
        ),
        rightIcon && /* @__PURE__ */ jsx2("span", { className: cn("pointer-events-none absolute top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500", iconSizes.right), children: rightIcon })
      ] });
    }
    return /* @__PURE__ */ jsx2(
      "input",
      {
        ref,
        id,
        className: cn(
          "w-full rounded-md text-zinc-900 placeholder:text-zinc-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-100 dark:placeholder:text-zinc-500",
          variantStyles2[variant],
          sizeStyles2[inputSize],
          error && "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
          className
        ),
        onChange,
        onFocus,
        onBlur,
        defaultValue,
        value: controlledValue,
        style: {
          ...variant === "glow" && color ? {
            "--uixy-input-glow-c": color,
            "--uixy-input-glow-rgb": (() => {
              const h = color.replace("#", "");
              return `${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)}`;
            })()
          } : {},
          ...style
        },
        ...props
      }
    );
  }
);
Input.displayName = "Input";
var FloatingInputInternal = React2.forwardRef(
  ({
    className,
    inputSize,
    error,
    label,
    labelClassName,
    wrapperClassName,
    id,
    onChange,
    onFocus,
    onBlur,
    defaultValue,
    value: controlledValue,
    ...props
  }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState((defaultValue == null ? void 0 : defaultValue.toString()) || "");
    const value = controlledValue !== void 0 ? controlledValue.toString() : internalValue;
    const isFloated = focused || value.length > 0;
    const sizes = floatingSizeStyles[inputSize];
    return /* @__PURE__ */ jsxs2("div", { className: cn("relative w-full", wrapperClassName), children: [
      /* @__PURE__ */ jsx2(
        "input",
        {
          ref,
          id: inputId,
          className: cn(
            "peer w-full rounded-md border border-zinc-300 bg-transparent text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-100",
            sizes.input,
            error && "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
            className
          ),
          value: controlledValue !== void 0 ? controlledValue : void 0,
          defaultValue: controlledValue !== void 0 ? void 0 : defaultValue,
          onChange: (e) => {
            if (controlledValue === void 0) setInternalValue(e.target.value);
            onChange == null ? void 0 : onChange(e);
          },
          onFocus: (e) => {
            setFocused(true);
            onFocus == null ? void 0 : onFocus(e);
          },
          onBlur: (e) => {
            setFocused(false);
            onBlur == null ? void 0 : onBlur(e);
          },
          placeholder: " ",
          ...props
        }
      ),
      /* @__PURE__ */ jsx2(
        "label",
        {
          htmlFor: inputId,
          className: cn(
            "pointer-events-none absolute transition-all duration-200 ease-out",
            sizes.label,
            isFloated ? cn(sizes.floated, focused ? error ? "text-red-500" : "text-zinc-500 dark:text-zinc-400" : "text-zinc-400 dark:text-zinc-500") : cn(sizes.resting, "text-zinc-400 dark:text-zinc-500"),
            labelClassName
          ),
          children: label
        }
      )
    ] });
  }
);
FloatingInputInternal.displayName = "FloatingInputInternal";

// src/components/Input/PasswordInput.tsx
import React3, { useState as useState2 } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var sizeStyles3 = {
  sm: { input: "h-8 px-2 pr-8 text-xs", btn: "right-1.5 h-5 w-5" },
  md: { input: "h-10 px-3 pr-10 text-sm", btn: "right-2.5 h-5 w-5" },
  lg: { input: "h-12 px-4 pr-12 text-base", btn: "right-3.5 h-6 w-6" }
};
var EyeIcon = () => /* @__PURE__ */ jsxs3("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "h-full w-full", children: [
  /* @__PURE__ */ jsx3("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }),
  /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "3" })
] });
var EyeOffIcon = () => /* @__PURE__ */ jsxs3("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "h-full w-full", children: [
  /* @__PURE__ */ jsx3("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }),
  /* @__PURE__ */ jsx3("path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }),
  /* @__PURE__ */ jsx3("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" }),
  /* @__PURE__ */ jsx3("path", { d: "m2 2 20 20" })
] });
var PasswordInput = React3.forwardRef(
  ({ className, inputSize = "md", error, wrapperClassName, ...props }, ref) => {
    const [visible, setVisible] = useState2(false);
    const sizes = sizeStyles3[inputSize];
    return /* @__PURE__ */ jsxs3("div", { className: cn("relative w-full", wrapperClassName), children: [
      /* @__PURE__ */ jsx3(
        "input",
        {
          ref,
          type: visible ? "text" : "password",
          className: cn(
            "w-full rounded-md border border-zinc-300 bg-transparent text-zinc-900 placeholder:text-zinc-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-100 dark:placeholder:text-zinc-500",
            sizes.input,
            error && "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
            className
          ),
          ...props
        }
      ),
      /* @__PURE__ */ jsx3(
        "button",
        {
          type: "button",
          tabIndex: -1,
          onClick: () => setVisible((v) => !v),
          className: cn(
            "absolute top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors",
            sizes.btn
          ),
          "aria-label": visible ? "Hide password" : "Show password",
          children: visible ? /* @__PURE__ */ jsx3(EyeOffIcon, {}) : /* @__PURE__ */ jsx3(EyeIcon, {})
        }
      )
    ] });
  }
);
PasswordInput.displayName = "PasswordInput";

// src/components/Input/SearchInput.tsx
import React4, { useState as useState3 } from "react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var sizeStyles4 = {
  sm: { input: "h-8 pl-7 pr-7 text-xs", iconL: "left-2 h-3.5 w-3.5", iconR: "right-1.5 h-3.5 w-3.5" },
  md: { input: "h-10 pl-9 pr-9 text-sm", iconL: "left-3 h-4 w-4", iconR: "right-2.5 h-4 w-4" },
  lg: { input: "h-12 pl-11 pr-11 text-base", iconL: "left-4 h-5 w-5", iconR: "right-3.5 h-5 w-5" }
};
var SearchIcon = ({ className }) => /* @__PURE__ */ jsxs4("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className, children: [
  /* @__PURE__ */ jsx4("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ jsx4("path", { d: "m21 21-4.3-4.3" })
] });
var XIcon = ({ className }) => /* @__PURE__ */ jsxs4("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className, children: [
  /* @__PURE__ */ jsx4("path", { d: "M18 6 6 18" }),
  /* @__PURE__ */ jsx4("path", { d: "m6 6 12 12" })
] });
var SearchInput = React4.forwardRef(
  ({ className, inputSize = "md", onClear, wrapperClassName, onChange, value: controlledValue, defaultValue, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState3((defaultValue == null ? void 0 : defaultValue.toString()) || "");
    const value = controlledValue !== void 0 ? controlledValue.toString() : internalValue;
    const sizes = sizeStyles4[inputSize];
    const handleChange = (e) => {
      if (controlledValue === void 0) setInternalValue(e.target.value);
      onChange == null ? void 0 : onChange(e);
    };
    const handleClear = () => {
      if (controlledValue === void 0) setInternalValue("");
      onClear == null ? void 0 : onClear();
    };
    return /* @__PURE__ */ jsxs4("div", { className: cn("relative w-full", wrapperClassName), children: [
      /* @__PURE__ */ jsx4("span", { className: cn("pointer-events-none absolute top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500", sizes.iconL), children: /* @__PURE__ */ jsx4(SearchIcon, { className: "h-full w-full" }) }),
      /* @__PURE__ */ jsx4(
        "input",
        {
          ref,
          type: "search",
          className: cn(
            "w-full rounded-md border border-zinc-300 bg-transparent text-zinc-900 placeholder:text-zinc-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-100 dark:placeholder:text-zinc-500 [&::-webkit-search-cancel-button]:hidden",
            sizes.input,
            className
          ),
          value: controlledValue !== void 0 ? controlledValue : void 0,
          defaultValue: controlledValue !== void 0 ? void 0 : defaultValue,
          onChange: handleChange,
          ...props
        }
      ),
      value.length > 0 && /* @__PURE__ */ jsx4(
        "button",
        {
          type: "button",
          tabIndex: -1,
          onClick: handleClear,
          className: cn(
            "absolute top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors",
            sizes.iconR
          ),
          "aria-label": "Clear search",
          children: /* @__PURE__ */ jsx4(XIcon, { className: "h-full w-full" })
        }
      )
    ] });
  }
);
SearchInput.displayName = "SearchInput";

// src/components/Input/OTPInput.tsx
import React5, { useRef, useState as useState4, useCallback } from "react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var sizeStyles5 = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-lg",
  lg: "h-12 w-12 text-xl"
};
var OTPInput = ({
  length = 6,
  onComplete,
  onChange,
  inputSize = "md",
  error = false,
  disabled = false,
  className,
  wrapperClassName,
  separatorAfter
}) => {
  const [values, setValues] = useState4(Array(length).fill(""));
  const inputRefs = useRef([]);
  const focusInput = useCallback((index) => {
    var _a;
    if (index >= 0 && index < length) {
      (_a = inputRefs.current[index]) == null ? void 0 : _a.focus();
    }
  }, [length]);
  const updateValues = useCallback(
    (newValues) => {
      setValues(newValues);
      const otp = newValues.join("");
      onChange == null ? void 0 : onChange(otp);
      if (otp.length === length && newValues.every((v) => v !== "")) {
        onComplete == null ? void 0 : onComplete(otp);
      }
    },
    [length, onChange, onComplete]
  );
  const handleChange = (index, e) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;
    const digit = val.slice(-1);
    const newValues = [...values];
    newValues[index] = digit;
    updateValues(newValues);
    if (digit && index < length - 1) {
      focusInput(index + 1);
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newValues = [...values];
      if (values[index]) {
        newValues[index] = "";
        updateValues(newValues);
      } else if (index > 0) {
        newValues[index - 1] = "";
        updateValues(newValues);
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight") {
      focusInput(index + 1);
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    const newValues = [...values];
    for (let i = 0; i < pasted.length; i++) {
      newValues[i] = pasted[i];
    }
    updateValues(newValues);
    focusInput(Math.min(pasted.length, length - 1));
  };
  const separatorSet = new Set(separatorAfter || []);
  return /* @__PURE__ */ jsx5("div", { className: cn("flex items-center gap-2", wrapperClassName), children: values.map((val, i) => /* @__PURE__ */ jsxs5(React5.Fragment, { children: [
    /* @__PURE__ */ jsx5(
      "input",
      {
        ref: (el) => {
          inputRefs.current[i] = el;
        },
        type: "text",
        inputMode: "numeric",
        autoComplete: "one-time-code",
        maxLength: 1,
        value: val,
        disabled,
        onChange: (e) => handleChange(i, e),
        onKeyDown: (e) => handleKeyDown(i, e),
        onPaste: i === 0 ? handlePaste : void 0,
        onFocus: (e) => e.target.select(),
        className: cn(
          "rounded-md border border-zinc-300 bg-transparent text-center font-mono text-zinc-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-100",
          sizeStyles5[inputSize],
          error && "border-red-500 focus-visible:ring-red-500 dark:border-red-500",
          className
        ),
        "aria-label": `Digit ${i + 1}`
      }
    ),
    separatorSet.has(i) && /* @__PURE__ */ jsx5("span", { className: "text-zinc-400 dark:text-zinc-500 text-lg font-bold select-none", children: "-" })
  ] }, i)) });
};
OTPInput.displayName = "OTPInput";

// src/components/Label/Label.tsx
import React6 from "react";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var sizeStyles6 = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base"
};
var Label = React6.forwardRef(
  ({ className, size = "md", required, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxs6(
      "label",
      {
        ref,
        className: cn(
          "font-medium text-zinc-900 dark:text-zinc-100 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          sizeStyles6[size],
          className
        ),
        ...props,
        children: [
          children,
          required && /* @__PURE__ */ jsx6("span", { className: "ml-1 text-red-500", children: "*" })
        ]
      }
    );
  }
);
Label.displayName = "Label";

// src/components/Text/TypewriterText.tsx
import { useState as useState5, useEffect as useEffect3, useCallback as useCallback2, useMemo } from "react";
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var TypewriterText = ({
  words,
  typeSpeed = 80,
  deleteSpeed = 50,
  pauseDuration = 1500,
  loop = true,
  cursor = true,
  cursorChar = "|",
  className,
  cursorClassName,
  as: Tag = "span"
}) => {
  const [text, setText] = useState5("");
  const [wordIndex, setWordIndex] = useState5(0);
  const [isDeleting, setIsDeleting] = useState5(false);
  const longestWord = useMemo(
    () => words.reduce((a, b) => a.length >= b.length ? a : b, ""),
    [words]
  );
  const tick = useCallback2(() => {
    const currentWord = words[wordIndex] || "";
    if (isDeleting) {
      setText(currentWord.substring(0, text.length - 1));
    } else {
      setText(currentWord.substring(0, text.length + 1));
    }
  }, [text, wordIndex, isDeleting, words]);
  useEffect3(() => {
    const currentWord = words[wordIndex] || "";
    if (!isDeleting && text === currentWord) {
      if (!loop && wordIndex === words.length - 1) return;
      const timeout2 = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout2);
    }
    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timeout = setTimeout(tick, speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseDuration, loop, tick]);
  return /* @__PURE__ */ jsxs7(Tag, { className: cn("inline-grid", className), children: [
    /* @__PURE__ */ jsx7("span", { className: "invisible col-start-1 row-start-1 whitespace-pre", "aria-hidden": "true", children: longestWord }),
    /* @__PURE__ */ jsxs7("span", { className: "col-start-1 row-start-1 whitespace-pre", children: [
      text,
      cursor && /* @__PURE__ */ jsx7(
        "span",
        {
          className: cn(
            "inline-block w-[2px] h-[1em] align-middle ml-0.5 animate-[uixy-blink_1s_step-end_infinite] bg-current",
            cursorClassName
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx7("style", { children: `
        @keyframes uixy-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      ` })
  ] });
};
TypewriterText.displayName = "TypewriterText";

// src/components/Text/GradientText.tsx
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
var GradientText = ({
  children,
  animate = true,
  speed = 3,
  colors = "from-violet-500 via-pink-500 to-indigo-500",
  as: Tag = "span",
  className
}) => {
  return /* @__PURE__ */ jsxs8(
    Tag,
    {
      className: cn(
        "inline-block bg-clip-text text-transparent bg-gradient-to-r",
        colors,
        animate && "bg-[length:200%_auto]",
        className
      ),
      style: animate ? {
        animation: `uixy-gradient ${speed}s linear infinite`
      } : void 0,
      children: [
        /* @__PURE__ */ jsx8("style", { children: `
        @keyframes uixy-gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      ` }),
        children
      ]
    }
  );
};
GradientText.displayName = "GradientText";

// src/components/Text/GlitchText.tsx
import { useEffect as useEffect4, useRef as useRef2 } from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var glitchCounter = 0;
var GlitchText = ({
  children,
  speed = 3,
  intensity = 5,
  as: Tag = "span",
  className
}) => {
  const wrapperRef = useRef2(null);
  const idRef = useRef2(`uixy-g-${++glitchCounter}`);
  const id = idRef.current;
  const offset = Math.max(1, Math.min(intensity, 10));
  useEffect4(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      .${id} { position: relative; display: inline-block; }
      .${id}::before, .${id}::after {
        content: "${children.replace(/"/g, '\\"')}";
        position: absolute; inset: 0; opacity: 0.8;
      }
      .${id}::before {
        color: #0ff; z-index: -1;
        animation: ${id}-a ${speed}s infinite;
      }
      .${id}::after {
        color: #f0f; z-index: -1;
        animation: ${id}-b ${speed}s infinite;
      }
      @keyframes ${id}-a {
        0%, 15%, 40%, 46%, 80%, 86%, 100% { transform: translate(0); clip-path: inset(0 0 100% 0); }
        5%  { transform: translate(${offset}px, 0); clip-path: inset(10% 0 70% 0); }
        10% { transform: translate(-${offset}px, 0); clip-path: inset(50% 0 10% 0); }
        42% { transform: translate(${offset * 0.6}px, 0); clip-path: inset(20% 0 50% 0); }
        44% { transform: translate(-${offset * 0.8}px, 0); clip-path: inset(60% 0 5% 0); }
        82% { transform: translate(-${offset * 0.5}px, 0); clip-path: inset(5% 0 80% 0); }
        84% { transform: translate(${offset}px, 0); clip-path: inset(40% 0 20% 0); }
      }
      @keyframes ${id}-b {
        0%, 15%, 50%, 56%, 85%, 91%, 100% { transform: translate(0); clip-path: inset(0 0 100% 0); }
        5%  { transform: translate(-${offset}px, 0); clip-path: inset(30% 0 40% 0); }
        10% { transform: translate(${offset}px, 0); clip-path: inset(70% 0 0% 0); }
        52% { transform: translate(-${offset * 0.7}px, 0); clip-path: inset(15% 0 60% 0); }
        54% { transform: translate(${offset * 0.5}px, 0); clip-path: inset(75% 0 0% 0); }
        87% { transform: translate(${offset * 0.8}px, 0); clip-path: inset(0% 0 85% 0); }
        89% { transform: translate(-${offset * 0.6}px, 0); clip-path: inset(55% 0 15% 0); }
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [children, speed, offset, id]);
  return /* @__PURE__ */ jsx9(Tag, { ref: wrapperRef, className: cn("relative inline-block", className), children: /* @__PURE__ */ jsx9("span", { className: id, children }) });
};
GlitchText.displayName = "GlitchText";

// src/components/Text/ShimmerText.tsx
import { useEffect as useEffect5, useRef as useRef3 } from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var shimmerStyleInjected = false;
var ShimmerText = ({
  children,
  speed = 2,
  shimmerColor = "rgba(255,255,255,0.8)",
  baseColor = "rgba(255,255,255,0.4)",
  as: Tag = "span",
  className
}) => {
  const ref = useRef3(null);
  useEffect5(() => {
    if (!shimmerStyleInjected) {
      shimmerStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        @keyframes uixy-shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .uixy-shimmer-text {
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          color: transparent !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  return /* @__PURE__ */ jsx10(
    Tag,
    {
      ref,
      className: cn("uixy-shimmer-text inline-block", className),
      style: {
        backgroundImage: `linear-gradient(90deg, ${baseColor} 0%, ${baseColor} 35%, ${shimmerColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`,
        backgroundSize: "200% 100%",
        animation: `uixy-shimmer ${speed}s linear infinite`
      },
      children
    }
  );
};
ShimmerText.displayName = "ShimmerText";

// src/components/Text/WaveText.tsx
import { jsx as jsx11, jsxs as jsxs9 } from "react/jsx-runtime";
var WaveText = ({
  children,
  delay = 80,
  duration = 1,
  height = 12,
  as: Tag = "span",
  className
}) => {
  const letters = children.split("");
  return /* @__PURE__ */ jsxs9(Tag, { className: cn("inline-flex", className), children: [
    /* @__PURE__ */ jsx11("style", { children: `
        @keyframes uixy-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-${height}px); }
        }
      ` }),
    letters.map((letter, i) => /* @__PURE__ */ jsx11(
      "span",
      {
        style: {
          display: "inline-block",
          animation: `uixy-wave ${duration}s ease-in-out infinite`,
          animationDelay: `${i * delay}ms`,
          whiteSpace: letter === " " ? "pre" : void 0
        },
        children: letter === " " ? "\xA0" : letter
      },
      i
    ))
  ] });
};
WaveText.displayName = "WaveText";

// src/components/Text/BlurText.tsx
import { useEffect as useEffect6, useRef as useRef4, useState as useState6 } from "react";
import { jsx as jsx12 } from "react/jsx-runtime";
var BlurText = ({
  children,
  mode = "word",
  delay = 100,
  duration = 500,
  triggerOnView = true,
  as: Tag = "span",
  className
}) => {
  const containerRef = useRef4(null);
  const [visible, setVisible] = useState6(!triggerOnView);
  useEffect6(() => {
    if (!triggerOnView) {
      const t = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t);
    }
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView]);
  const units = mode === "word" ? children.split(" ").map((w, i, arr) => i < arr.length - 1 ? w + " " : w) : children.split("");
  return /* @__PURE__ */ jsx12("div", { ref: containerRef, className: "inline", children: /* @__PURE__ */ jsx12(Tag, { className: cn("inline", className), children: units.map((unit, i) => /* @__PURE__ */ jsx12(
    "span",
    {
      style: {
        display: "inline-block",
        transition: `opacity ${duration}ms ease, filter ${duration}ms ease, transform ${duration}ms ease`,
        transitionDelay: visible ? `${i * delay}ms` : "0ms",
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0px)" : "blur(10px)",
        transform: visible ? "translateY(0)" : "translateY(12px)",
        whiteSpace: "pre"
      },
      children: unit
    },
    i
  )) }) });
};
BlurText.displayName = "BlurText";

// src/components/Text/CounterText.tsx
import { useEffect as useEffect7, useRef as useRef5, useState as useState7 } from "react";
import { jsxs as jsxs10 } from "react/jsx-runtime";
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}
var CounterText = ({
  target,
  from = 0,
  duration = 2e3,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  triggerOnView = true,
  as: Tag = "span",
  className
}) => {
  const ref = useRef5(null);
  const [value, setValue] = useState7(from);
  const [started, setStarted] = useState7(!triggerOnView);
  useEffect7(() => {
    if (!triggerOnView) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView]);
  useEffect7(() => {
    if (!started) return;
    const startTime = performance.now();
    let rafId;
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = from + (target - from) * eased;
      setValue(current);
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [started, from, target, duration]);
  const formatNumber = (num) => {
    const fixed = num.toFixed(decimals);
    if (!separator) return fixed;
    const [int, dec] = fixed.split(".");
    const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return dec !== void 0 ? `${formatted}.${dec}` : formatted;
  };
  return /* @__PURE__ */ jsxs10(Tag, { ref, className: cn("tabular-nums", className), children: [
    prefix,
    formatNumber(value),
    suffix
  ] });
};
CounterText.displayName = "CounterText";

// src/components/Text/MediaText.tsx
import { useEffect as useEffect8 } from "react";
import { jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
var mediaTextStyleInjected = false;
var MediaText = ({
  children,
  src,
  videoSrc,
  backgroundSize = "cover",
  backgroundPosition = "center",
  loop = true,
  muted = true,
  as: Tag = "h1",
  className
}) => {
  useEffect8(() => {
    if (mediaTextStyleInjected) return;
    mediaTextStyleInjected = true;
    const style = document.createElement("style");
    style.textContent = `
      .uixy-media-text-clip {
        -webkit-background-clip: text !important;
        background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        color: transparent !important;
      }
      .uixy-media-text-video-container {
        position: relative;
        display: inline-block;
        overflow: hidden;
      }
      .uixy-media-text-video-container video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .uixy-media-text-video-overlay {
        position: relative;
        z-index: 1;
        mix-blend-mode: screen;
        background: #000;
      }
    `;
    document.head.appendChild(style);
  }, []);
  if (src && !videoSrc) {
    return /* @__PURE__ */ jsx13(
      Tag,
      {
        className: cn("uixy-media-text-clip inline-block", className),
        style: {
          backgroundImage: `url(${src})`,
          backgroundSize,
          backgroundPosition,
          backgroundRepeat: "no-repeat"
        },
        children
      }
    );
  }
  if (videoSrc) {
    return /* @__PURE__ */ jsxs11("span", { className: "uixy-media-text-video-container", children: [
      /* @__PURE__ */ jsx13(
        "video",
        {
          src: videoSrc,
          autoPlay: true,
          loop,
          muted,
          playsInline: true,
          preload: "auto"
        }
      ),
      /* @__PURE__ */ jsx13(
        Tag,
        {
          className: cn("uixy-media-text-video-overlay whitespace-nowrap", className),
          children
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx13(Tag, { className: cn("inline-block", className), children });
};
MediaText.displayName = "MediaText";

// src/components/Text/SparklesText.tsx
import { useEffect as useEffect9, useRef as useRef6, useCallback as useCallback3 } from "react";
import { jsx as jsx14 } from "react/jsx-runtime";
var sparklesStyleInjected = false;
var SparklesText = ({
  children,
  sparkleColor = "#FFC700",
  count = 12,
  minSize = 4,
  maxSize = 14,
  speed = 450,
  as: Tag = "span",
  className
}) => {
  const containerRef = useRef6(null);
  const injectStyles = useCallback3(() => {
    if (sparklesStyleInjected) return;
    sparklesStyleInjected = true;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes uixy-sparkle-life {
        0%   { transform: scale(0) rotate(0deg); opacity: 0; }
        20%  { transform: scale(0.6) rotate(60deg); opacity: 0.8; }
        50%  { transform: scale(1) rotate(140deg); opacity: 1; }
        80%  { transform: scale(0.6) rotate(240deg); opacity: 0.8; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);
  useEffect9(() => {
    injectStyles();
    const container = containerRef.current;
    if (!container) return;
    const createSparkleSVG = () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const size = minSize + Math.random() * (maxSize - minSize);
      const duration = 1.2 + Math.random() * 1.2;
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", sparkleColor);
      svg.innerHTML = `<path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z"/>`;
      Object.assign(svg.style, {
        position: "absolute",
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: "none",
        animation: `uixy-sparkle-life ${duration}s ease-in-out forwards`,
        zIndex: "1"
      });
      container.appendChild(svg);
      setTimeout(() => {
        if (svg.parentNode === container) {
          container.removeChild(svg);
        }
      }, duration * 1e3);
    };
    for (let i = 0; i < count; i++) {
      setTimeout(() => createSparkleSVG(), Math.random() * speed * 2);
    }
    const interval = setInterval(() => {
      createSparkleSVG();
    }, speed);
    return () => {
      clearInterval(interval);
      const svgs = container.querySelectorAll("svg");
      svgs.forEach((s) => s.remove());
    };
  }, [sparkleColor, count, minSize, maxSize, speed, injectStyles]);
  return /* @__PURE__ */ jsx14(Tag, { ref: containerRef, className: cn("relative inline-block", className), children: /* @__PURE__ */ jsx14("span", { className: "relative z-[2]", children }) });
};
SparklesText.displayName = "SparklesText";

// src/components/Text/HighlightText.tsx
import { useEffect as useEffect10, useRef as useRef7, useState as useState8 } from "react";
import { jsx as jsx15 } from "react/jsx-runtime";
var highlightStyleInjected = false;
var HighlightText = ({
  children,
  variant = "marker",
  color = "rgba(139, 92, 246, 0.35)",
  colorTo,
  duration = 800,
  delay = 0,
  triggerOnView = true,
  as: Tag = "span",
  className
}) => {
  const containerRef = useRef7(null);
  const [active, setActive] = useState8(false);
  useEffect10(() => {
    if (!highlightStyleInjected) {
      highlightStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        /* \u2500\u2500 marker \u2500\u2500 */
        .uixy-hl-marker {
          background-size: 0% 100%;
          background-repeat: no-repeat;
          background-position: left center;
          padding: 0.05em 0.15em;
          margin: -0.05em -0.15em;
          border-radius: 0.15em;
        }
        .uixy-hl-marker.uixy-hl-on { background-size: 100% 100%; }

        /* \u2500\u2500 underline \u2500\u2500 */
        .uixy-hl-underline {
          background-size: 0% 3px;
          background-repeat: no-repeat;
          background-position: left bottom;
          padding-bottom: 4px;
        }
        .uixy-hl-underline.uixy-hl-on { background-size: 100% 3px; }

        /* \u2500\u2500 box \u2500\u2500 */
        .uixy-hl-box {
          border: 2px solid transparent;
          border-radius: 4px;
          padding: 0.05em 0.25em;
          margin: -0.05em -0.25em;
        }
        .uixy-hl-box.uixy-hl-on { border-color: var(--uixy-hl-c); }

        /* \u2500\u2500 strikethrough \u2500\u2500 */
        .uixy-hl-strikethrough {
          position: relative;
        }
        .uixy-hl-strikethrough::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          height: 2.5px;
          background: var(--uixy-hl-c);
          width: 0%;
          transition: width var(--uixy-hl-dur) cubic-bezier(0.25, 0.1, 0.25, 1);
          border-radius: 2px;
        }
        .uixy-hl-strikethrough.uixy-hl-on::after { width: 100%; }

        /* \u2500\u2500 gradient \u2500\u2500 */
        .uixy-hl-gradient {
          background-size: 0% 100%;
          background-repeat: no-repeat;
          background-position: left center;
          padding: 0.05em 0.15em;
          margin: -0.05em -0.15em;
          border-radius: 0.15em;
        }
        .uixy-hl-gradient.uixy-hl-on { background-size: 100% 100%; }

        /* \u2500\u2500 glow \u2500\u2500 */
        .uixy-hl-glow {
          text-shadow: none;
          transition: text-shadow var(--uixy-hl-dur) ease;
        }
        .uixy-hl-glow.uixy-hl-on {
          text-shadow:
            0 0 8px var(--uixy-hl-c),
            0 0 20px var(--uixy-hl-c),
            0 0 40px var(--uixy-hl-c);
        }

        /* \u2500\u2500 bracket \u2500\u2500 */
        .uixy-hl-bracket {
          position: relative;
          padding: 0 0.3em;
          margin: 0 -0.3em;
        }
        .uixy-hl-bracket::before,
        .uixy-hl-bracket::after {
          position: absolute;
          top: -2px;
          bottom: -2px;
          width: 6px;
          border: 2px solid transparent;
          transition: border-color var(--uixy-hl-dur) ease;
          content: '';
        }
        .uixy-hl-bracket::before {
          left: 0;
          border-right: none;
          border-radius: 3px 0 0 3px;
        }
        .uixy-hl-bracket::after {
          right: 0;
          border-left: none;
          border-radius: 0 3px 3px 0;
        }
        .uixy-hl-bracket.uixy-hl-on::before,
        .uixy-hl-bracket.uixy-hl-on::after {
          border-color: var(--uixy-hl-c);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  useEffect10(() => {
    if (!triggerOnView) {
      const timer = setTimeout(() => setActive(true), Math.max(delay, 50));
      return () => clearTimeout(timer);
    }
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setActive(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView, delay]);
  const gradientBg = variant === "gradient" && colorTo ? `linear-gradient(120deg, ${color}, ${colorTo})` : `linear-gradient(${color}, ${color})`;
  const transitionProp = variant === "box" ? `border-color ${duration}ms cubic-bezier(0.25,0.1,0.25,1)` : variant === "glow" || variant === "bracket" ? void 0 : `background-size ${duration}ms cubic-bezier(0.25,0.1,0.25,1)`;
  return /* @__PURE__ */ jsx15("div", { ref: containerRef, className: "inline", children: /* @__PURE__ */ jsx15(
    Tag,
    {
      className: cn(
        `uixy-hl-${variant}`,
        active && "uixy-hl-on",
        className
      ),
      style: {
        ...["marker", "underline", "gradient"].includes(variant) ? { backgroundImage: gradientBg } : {},
        "--uixy-hl-c": color,
        "--uixy-hl-dur": `${duration}ms`,
        ...transitionProp ? { transition: transitionProp } : {}
      },
      children
    }
  ) });
};
HighlightText.displayName = "HighlightText";

// src/components/Card/Card.tsx
import { forwardRef, useEffect as useEffect11, useRef as useRef8, useCallback as useCallback4 } from "react";
import { jsx as jsx16 } from "react/jsx-runtime";
var cardStyleInjected = false;
function injectCardStyles() {
  if (cardStyleInjected) return;
  cardStyleInjected = true;
  const style = document.createElement("style");
  style.textContent = `
    /* \u2500\u2500 spotlight \u2500\u2500 */
    .uixy-card-spotlight {
      --uixy-mx: 50%; --uixy-my: 50%;
      position: relative; overflow: hidden;
    }
    .uixy-card-spotlight::before {
      content:''; position:absolute; inset:0;
      background: radial-gradient(600px circle at var(--uixy-mx) var(--uixy-my), rgba(var(--uixy-card-rgb,139,92,246),0.15), transparent 40%);
      opacity:0; transition:opacity .3s; pointer-events:none; z-index:0;
    }
    .uixy-card-spotlight:hover::before { opacity:1; }

    /* \u2500\u2500 neon \u2500\u2500 */
    .uixy-card-neon {
      box-shadow: 0 0 5px rgba(var(--uixy-card-rgb,139,92,246),0.4),
                  0 0 20px rgba(var(--uixy-card-rgb,139,92,246),0.2),
                  inset 0 0 20px rgba(var(--uixy-card-rgb,139,92,246),0.05);
      transition: box-shadow 0.3s ease;
    }
    .uixy-card-neon:hover {
      box-shadow: 0 0 10px rgba(var(--uixy-card-rgb,139,92,246),0.6),
                  0 0 40px rgba(var(--uixy-card-rgb,139,92,246),0.3),
                  0 0 80px rgba(var(--uixy-card-rgb,139,92,246),0.15),
                  inset 0 0 30px rgba(var(--uixy-card-rgb,139,92,246),0.08);
    }

    /* \u2500\u2500 tilt \u2500\u2500 */
    .uixy-card-tilt {
      transition: transform 0.15s ease;
      transform-style: preserve-3d;
      perspective: 1000px;
    }

    /* \u2500\u2500 animated border \u2500\u2500 */
    @keyframes uixy-border-spin {
      to { --uixy-angle: 360deg; }
    }
    @property --uixy-angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }
    .uixy-card-animated-border {
      position:relative; overflow:hidden;
    }
    .uixy-card-animated-border::before {
      content:''; position:absolute; inset:-2px;
      background: conic-gradient(from var(--uixy-angle,0deg), var(--uixy-card-c,#8b5cf6), var(--uixy-card-c2,#3b82f6), var(--uixy-card-c3,#06b6d4), var(--uixy-card-c,#8b5cf6));
      animation: uixy-border-spin 3s linear infinite;
      border-radius: inherit;
      z-index: -1;
    }
    .uixy-card-animated-border::after {
      content:''; position:absolute; inset:2px;
      background: rgb(24 24 27);
      border-radius: inherit;
      z-index: -1;
    }

    /* \u2500\u2500 noise \u2500\u2500 */
    .uixy-card-noise { position:relative; overflow:hidden; }
    .uixy-card-noise::before {
      content:''; position:absolute; inset:-50%;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 128px;
      opacity: 0.04;
      pointer-events: none;
      z-index:0;
    }

    /* \u2500\u2500 lifted \u2500\u2500 */
    .uixy-card-lifted {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .uixy-card-lifted:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2);
    }
  `;
  document.head.appendChild(style);
}
var Card = forwardRef(
  ({ variant = "default", color, className, children, onMouseMove, onMouseLeave, style, ...props }, ref) => {
    const innerRef = useRef8(null);
    const cardRef = ref || innerRef;
    useEffect11(() => {
      injectCardStyles();
    }, []);
    const handleMouseMove = useCallback4(
      (e) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (variant === "spotlight") {
          el.style.setProperty("--uixy-mx", `${x}px`);
          el.style.setProperty("--uixy-my", `${y}px`);
        }
        if (variant === "tilt") {
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const rotateX = (y - cy) / cy * -8;
          const rotateY = (x - cx) / cx * 8;
          el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }
        onMouseMove == null ? void 0 : onMouseMove(e);
      },
      [variant, onMouseMove, cardRef]
    );
    const handleMouseLeave = useCallback4(
      (e) => {
        if (variant === "tilt") {
          const el = cardRef.current;
          if (el) el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
        }
        onMouseLeave == null ? void 0 : onMouseLeave(e);
      },
      [variant, onMouseLeave, cardRef]
    );
    const base = "rounded-xl p-6";
    const variants = {
      default: `${base} border border-zinc-800 bg-zinc-900`,
      bordered: `${base} border-2 border-zinc-600 bg-zinc-900/50`,
      elevated: `${base} bg-zinc-900 shadow-xl shadow-black/30`,
      ghost: `${base} hover:bg-zinc-900/50 transition-colors`,
      gradient: `${base} border border-zinc-800 bg-gradient-to-br from-violet-950/40 via-zinc-900 to-cyan-950/30`,
      glass: `${base} border border-white/10 bg-white/5 backdrop-blur-lg`,
      spotlight: `${base} border border-zinc-800 bg-zinc-900 uixy-card-spotlight`,
      neon: `${base} border bg-zinc-900 uixy-card-neon`,
      tilt: `${base} border border-zinc-800 bg-zinc-900 uixy-card-tilt cursor-pointer`,
      "animated-border": `${base} bg-zinc-900 uixy-card-animated-border`,
      noise: `${base} border border-zinc-800 bg-zinc-900 uixy-card-noise`,
      lifted: `${base} border border-zinc-800 bg-zinc-900 uixy-card-lifted cursor-pointer`
    };
    const needsZWrap = variant === "spotlight" || variant === "noise" || variant === "animated-border";
    const c = color || "#8b5cf6";
    const h = c.replace("#", "");
    const rgb = `${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)}`;
    const needsColorVars = ["spotlight", "neon", "animated-border"].includes(variant);
    const colorVars = needsColorVars ? {
      "--uixy-card-rgb": rgb,
      "--uixy-card-c": c,
      "--uixy-card-c2": color ? c : "#3b82f6",
      "--uixy-card-c3": color ? c : "#06b6d4",
      ...variant === "neon" ? { borderColor: `rgba(${rgb}, 0.3)` } : {}
    } : {};
    return /* @__PURE__ */ jsx16(
      "div",
      {
        ref: cardRef,
        className: cn(variants[variant], className),
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: { ...colorVars, ...style },
        ...props,
        children: needsZWrap ? /* @__PURE__ */ jsx16("div", { className: "relative z-10", children }) : children
      }
    );
  }
);
Card.displayName = "Card";
var CardHeader = forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx16("div", { ref, className: cn("mb-4", className), ...props })
);
CardHeader.displayName = "CardHeader";
var CardTitle = forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx16("h3", { ref, className: cn("text-lg font-semibold text-zinc-100", className), ...props })
);
CardTitle.displayName = "CardTitle";
var CardDescription = forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx16("p", { ref, className: cn("text-sm text-zinc-400 mt-1", className), ...props })
);
CardDescription.displayName = "CardDescription";
var CardContent = forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx16("div", { ref, className: cn("", className), ...props })
);
CardContent.displayName = "CardContent";
var CardFooter = forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx16("div", { ref, className: cn("mt-4 flex items-center gap-2", className), ...props })
);
CardFooter.displayName = "CardFooter";

// src/components/Background/ParticleBackground.tsx
import { useEffect as useEffect12, useRef as useRef9, useCallback as useCallback5 } from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
var ParticleBackground = ({
  items,
  count,
  connectionDistance = 180,
  arrows = false,
  mouseDistance = 200,
  color = [110, 120, 220],
  speed = 1,
  fontSize = [13, 18],
  imageSize = 28,
  lineWidth = 0.6,
  maxOpacity = 0.25,
  className
}) => {
  const canvasRef = useRef9(null);
  const nodesRef = useRef9([]);
  const mouseRef = useRef9({ x: -9999, y: -9999 });
  const rafRef = useRef9(0);
  const normalize = useCallback5(
    (item) => {
      if (typeof item === "string") {
        if (/^(https?:\/\/|data:image|\/|\.\.?\/)/.test(item)) {
          return { content: item, type: "image" };
        }
        const emojiRegex = /^[\p{Emoji_Presentation}\p{Extended_Pictographic}\u200d\ufe0f]{1,8}$/u;
        if (emojiRegex.test(item.trim())) {
          return { content: item.trim(), type: "emoji" };
        }
        return { content: item, type: "text" };
      }
      return { content: item.content, type: item.type || "text" };
    },
    []
  );
  useEffect12(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const [baseR, baseG, baseB] = color;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const nodeCount = count != null ? count : Math.min(Math.floor(canvas.width * canvas.height / 22e3), 60);
    const nodes = Array.from({ length: nodeCount }, (_, i) => {
      const item = normalize(items[i % items.length]);
      const node = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3 * speed,
        vy: (Math.random() - 0.5) * 0.3 * speed,
        content: item.content,
        type: item.type,
        opacity: Math.random() * (maxOpacity - 0.05) + 0.05,
        shade: Math.random(),
        fontSize: fontSize[0] + Math.random() * (fontSize[1] - fontSize[0])
      };
      if (item.type === "image") {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = item.content;
        node.img = img;
        node.imgLoaded = false;
        img.onload = () => {
          node.imgLoaded = true;
        };
      }
      return node;
    });
    nodesRef.current = nodes;
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onMouseLeave);
    const getColor = (shade, alpha) => {
      const v = 40;
      const r = Math.round(baseR + (shade - 0.5) * v);
      const g = Math.round(baseG + (shade - 0.5) * v);
      const b = Math.round(baseB + (shade - 0.5) * (v * 0.3));
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    const drawArrow = (fromX, fromY, toX, toY, color2) => {
      const headLen = 6;
      const dx = toX - fromX;
      const dy = toY - fromY;
      const angle = Math.atan2(dy, dx);
      const mx = (fromX + toX) / 2;
      const my = (fromY + toY) / 2;
      ctx.beginPath();
      ctx.moveTo(
        mx - headLen * Math.cos(angle - Math.PI / 6),
        my - headLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(mx, my);
      ctx.lineTo(
        mx - headLen * Math.cos(angle + Math.PI / 6),
        my - headLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.strokeStyle = color2;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -50) n.x = canvas.width + 50;
        if (n.x > canvas.width + 50) n.x = -50;
        if (n.y < -30) n.y = canvas.height + 30;
        if (n.y > canvas.height + 30) n.y = -30;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const avgShade = (nodes[i].shade + nodes[j].shade) / 2;
            const alpha = (1 - dist / connectionDistance) * 0.1;
            const c = getColor(avgShade, alpha);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = c;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            if (arrows) {
              drawArrow(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, c);
            }
          }
        }
      }
      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDistance) {
          const alpha = (1 - dist / mouseDistance) * 0.25;
          const c = getColor(n.shade, alpha);
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = c;
          ctx.lineWidth = lineWidth * 1.2;
          ctx.stroke();
          if (arrows) {
            drawArrow(n.x, n.y, mouse.x, mouse.y, c);
          }
        }
      }
      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const hoverBoost = dist < mouseDistance ? (1 - dist / mouseDistance) * 0.35 : 0;
        const alpha = Math.min(n.opacity + hoverBoost, 1);
        if (n.type === "image" && n.img && n.imgLoaded) {
          ctx.globalAlpha = alpha;
          const s = imageSize;
          ctx.drawImage(n.img, n.x - s / 2, n.y - s / 2, s, s);
          ctx.globalAlpha = 1;
        } else if (n.type === "emoji") {
          ctx.globalAlpha = alpha;
          ctx.font = `${n.fontSize + 4}px serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(n.content, n.x, n.y);
          ctx.globalAlpha = 1;
        } else {
          ctx.font = `600 ${n.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = getColor(n.shade, alpha);
          ctx.fillText(n.content, n.x, n.y);
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [items, count, connectionDistance, arrows, mouseDistance, color, speed, fontSize, imageSize, lineWidth, maxOpacity, normalize]);
  return /* @__PURE__ */ jsx17(
    "canvas",
    {
      ref: canvasRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { display: "block" }
    }
  );
};
ParticleBackground.displayName = "ParticleBackground";

// src/components/Background/AuroraBackground.tsx
import { useEffect as useEffect13, useRef as useRef10 } from "react";
import { jsx as jsx18 } from "react/jsx-runtime";
var AuroraBackground = ({
  colors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#8b5cf6"],
  speed = 1,
  blur = 120,
  opacity = 0.3,
  className
}) => {
  const canvasRef = useRef10(null);
  const rafRef = useRef10(0);
  useEffect13(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    let t = 0;
    const parseColor = (c) => {
      const tmp = document.createElement("div");
      tmp.style.color = c;
      document.body.appendChild(tmp);
      const computed = getComputedStyle(tmp).color;
      document.body.removeChild(tmp);
      const m = computed.match(/\d+/g);
      return m ? [+m[0], +m[1], +m[2]] : [139, 92, 246];
    };
    const rgbColors = colors.map(parseColor);
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const blobCount = rgbColors.length;
      for (let i = 0; i < blobCount; i++) {
        const phase = i / blobCount * Math.PI * 2;
        const x = w * 0.5 + Math.sin(t * 0.3 * speed + phase) * w * 0.35;
        const y = h * 0.4 + Math.cos(t * 0.2 * speed + phase * 1.3) * h * 0.25;
        const radius = Math.max(w, h) * (0.3 + Math.sin(t * 0.15 * speed + i) * 0.1);
        const [r, g, b] = rgbColors[i % rgbColors.length];
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
      t += 0.016;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [colors, speed, blur, opacity]);
  return /* @__PURE__ */ jsx18(
    "canvas",
    {
      ref: canvasRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { display: "block", filter: `blur(${blur}px)` }
    }
  );
};
AuroraBackground.displayName = "AuroraBackground";

// src/components/Background/GridBackground.tsx
import { useEffect as useEffect14, useRef as useRef11 } from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var gridStyleInjected = false;
var GridBackground = ({
  variant = "grid",
  size = 40,
  color = "rgba(255,255,255,0.08)",
  opacity = 1,
  followMouse = false,
  maskRadius = 300,
  className
}) => {
  const containerRef = useRef11(null);
  useEffect14(() => {
    if (!gridStyleInjected) {
      gridStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        .uixy-grid-bg {
          --uixy-grid-mx: 50%;
          --uixy-grid-my: 50%;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  useEffect14(() => {
    if (!followMouse) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--uixy-grid-mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--uixy-grid-my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [followMouse]);
  let bgImage;
  if (variant === "dots") {
    bgImage = `radial-gradient(circle, ${color} 1px, transparent 1px)`;
  } else if (variant === "cross") {
    bgImage = `
      linear-gradient(${color} 1px, transparent 1px),
      linear-gradient(90deg, ${color} 1px, transparent 1px),
      radial-gradient(circle, ${color} 1.5px, transparent 1.5px)
    `;
  } else {
    bgImage = `
      linear-gradient(${color} 1px, transparent 1px),
      linear-gradient(90deg, ${color} 1px, transparent 1px)
    `;
  }
  const bgSize = variant === "cross" ? `${size}px ${size}px, ${size}px ${size}px, ${size}px ${size}px` : `${size}px ${size}px`;
  const maskImage = followMouse ? `radial-gradient(circle ${maskRadius}px at var(--uixy-grid-mx) var(--uixy-grid-my), black, transparent)` : void 0;
  return /* @__PURE__ */ jsx19(
    "div",
    {
      ref: containerRef,
      className: `uixy-grid-bg ${className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full"}`,
      style: {
        backgroundImage: bgImage,
        backgroundSize: bgSize,
        opacity,
        WebkitMaskImage: maskImage,
        maskImage
      }
    }
  );
};
GridBackground.displayName = "GridBackground";

// src/components/Background/StarfieldBackground.tsx
import { useEffect as useEffect15, useRef as useRef12 } from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
var StarfieldBackground = ({
  count = 300,
  speed = 1,
  color = [200, 200, 255],
  maxSize = 2.5,
  warp = false,
  className
}) => {
  const canvasRef = useRef12(null);
  const rafRef = useRef12(0);
  useEffect15(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 2e3,
      y: (Math.random() - 0.5) * 2e3,
      z: Math.random() * 1e3,
      prevX: 0,
      prevY: 0
    }));
    const baseSpeed = warp ? 8 : 1.5;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const [r, g, b] = color;
      if (warp) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
      for (const star of stars) {
        const prevZ = star.z + baseSpeed * speed;
        star.prevX = star.x / prevZ * 500 + cx;
        star.prevY = star.y / prevZ * 500 + cy;
        star.z -= baseSpeed * speed;
        if (star.z <= 1) {
          star.x = (Math.random() - 0.5) * 2e3;
          star.y = (Math.random() - 0.5) * 2e3;
          star.z = 1e3;
          star.prevX = star.x / star.z * 500 + cx;
          star.prevY = star.y / star.z * 500 + cy;
          continue;
        }
        const sx = star.x / star.z * 500 + cx;
        const sy = star.y / star.z * 500 + cy;
        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;
        const size = Math.max(0.3, (1 - star.z / 1e3) * maxSize);
        const alpha = Math.min(1, (1 - star.z / 1e3) * 1.5);
        if (warp) {
          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`;
          ctx.lineWidth = size * 0.8;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, speed, color, maxSize, warp]);
  return /* @__PURE__ */ jsx20(
    "canvas",
    {
      ref: canvasRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { display: "block", background: "black" }
    }
  );
};
StarfieldBackground.displayName = "StarfieldBackground";

// src/components/Background/WaveBackground.tsx
import { useEffect as useEffect16, useRef as useRef13 } from "react";
import { jsx as jsx21 } from "react/jsx-runtime";
var WaveBackground = ({
  colors = ["rgba(139,92,246,0.15)", "rgba(59,130,246,0.12)", "rgba(6,182,212,0.1)"],
  layers = 3,
  speed = 1,
  amplitude = 40,
  frequency = 8e-3,
  className
}) => {
  const canvasRef = useRef13(null);
  const rafRef = useRef13(0);
  useEffect16(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    let t = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (let l = 0; l < layers; l++) {
        const color = colors[l % colors.length];
        const yBase = h * (0.5 + l * 0.12);
        const amp = amplitude * (1 - l * 0.15);
        const freq = frequency * (1 + l * 0.3);
        const phaseOffset = l * 1.2;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 3) {
          const y = yBase + Math.sin(x * freq + t * speed + phaseOffset) * amp + Math.sin(x * freq * 0.5 + t * speed * 0.7 + phaseOffset * 2) * amp * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      }
      t += 0.02;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [colors, layers, speed, amplitude, frequency]);
  return /* @__PURE__ */ jsx21(
    "canvas",
    {
      ref: canvasRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { display: "block" }
    }
  );
};
WaveBackground.displayName = "WaveBackground";

// src/components/Background/GradientMeshBackground.tsx
import { useEffect as useEffect17, useRef as useRef14 } from "react";
import { jsx as jsx22 } from "react/jsx-runtime";
var meshStyleInjected = false;
var GradientMeshBackground = ({
  colors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#ec4899"],
  speed = 1,
  intensity = 1,
  className
}) => {
  const containerRef = useRef14(null);
  useEffect17(() => {
    if (!meshStyleInjected) {
      meshStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        @keyframes uixy-mesh-1 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          25% { transform: translate(30%, -20%) scale(1.1); }
          50% { transform: translate(-10%, 30%) scale(0.95); }
          75% { transform: translate(20%, 10%) scale(1.05); }
        }
        @keyframes uixy-mesh-2 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          25% { transform: translate(-25%, 15%) scale(1.05); }
          50% { transform: translate(20%, -25%) scale(1.1); }
          75% { transform: translate(-15%, -10%) scale(0.9); }
        }
        @keyframes uixy-mesh-3 {
          0%, 100% { transform: translate(0%, 0%) scale(1.05); }
          33% { transform: translate(15%, 25%) scale(0.95); }
          66% { transform: translate(-20%, -15%) scale(1.1); }
        }
        @keyframes uixy-mesh-4 {
          0%, 100% { transform: translate(0%, 0%) scale(0.95); }
          33% { transform: translate(-30%, 10%) scale(1.1); }
          66% { transform: translate(10%, -30%) scale(1); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  const animations = [
    `uixy-mesh-1 ${12 / speed}s ease-in-out infinite`,
    `uixy-mesh-2 ${15 / speed}s ease-in-out infinite`,
    `uixy-mesh-3 ${18 / speed}s ease-in-out infinite`,
    `uixy-mesh-4 ${14 / speed}s ease-in-out infinite`
  ];
  const positions = [
    { top: "10%", left: "15%" },
    { top: "60%", right: "10%" },
    { bottom: "15%", left: "25%" },
    { top: "30%", right: "30%" }
  ];
  return /* @__PURE__ */ jsx22(
    "div",
    {
      ref: containerRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { overflow: "hidden", position: "relative" },
      children: colors.slice(0, 4).map((color, i) => /* @__PURE__ */ jsx22(
        "div",
        {
          style: {
            position: "absolute",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: 0.25 * intensity,
            filter: "blur(80px)",
            animation: animations[i],
            ...positions[i]
          }
        },
        i
      ))
    }
  );
};
GradientMeshBackground.displayName = "GradientMeshBackground";

// src/components/Background/MatrixRainBackground.tsx
import { useEffect as useEffect18, useRef as useRef15 } from "react";
import { jsx as jsx23 } from "react/jsx-runtime";
var MatrixRainBackground = ({
  charset = "abcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>{}[]",
  columnWidth = 20,
  speed = 1,
  color = "#22c55e",
  fontSize = 14,
  className
}) => {
  const canvasRef = useRef15(null);
  const rafRef = useRef15(0);
  useEffect18(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const chars = charset.split("");
    let columns = Math.floor(canvas.width / columnWidth);
    let drops = Array.from({ length: columns }, () => Math.random() * -100);
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const newCols = Math.floor(w / columnWidth);
      if (newCols !== columns) {
        columns = newCols;
        drops = Array.from({ length: columns }, () => Math.random() * -100);
      }
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * columnWidth;
        const y = drops[i] * fontSize;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.9;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 0.3;
        const trailChar = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(trailChar, x, y - fontSize);
        ctx.globalAlpha = 1;
        if (y > h && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += speed * 0.5;
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [charset, columnWidth, speed, color, fontSize]);
  return /* @__PURE__ */ jsx23(
    "canvas",
    {
      ref: canvasRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { display: "block", background: "black" }
    }
  );
};
MatrixRainBackground.displayName = "MatrixRainBackground";

// src/components/Background/BokehBackground.tsx
import { useEffect as useEffect19, useRef as useRef16 } from "react";
import { jsx as jsx24 } from "react/jsx-runtime";
var bokehStyleInjected = false;
var clipPaths = {
  circle: "",
  hexagon: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  triangle: "polygon(50% 0%, 100% 100%, 0% 100%)",
  star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  ring: ""
};
var shapeKeys = ["circle", "hexagon", "diamond", "triangle", "star", "ring"];
var BokehBackground = ({
  count = 15,
  colors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#ec4899", "#f97316"],
  shape = "circle",
  speed = 1,
  sizeRange = [40, 200],
  className
}) => {
  const containerRef = useRef16(null);
  useEffect19(() => {
    if (!bokehStyleInjected) {
      bokehStyleInjected = true;
      const style = document.createElement("style");
      style.textContent = `
        @keyframes uixy-bokeh-float {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(var(--uixy-bk-dx1), var(--uixy-bk-dy1)) scale(var(--uixy-bk-s1)) rotate(var(--uixy-bk-r1)); }
          50% { transform: translate(var(--uixy-bk-dx2), var(--uixy-bk-dy2)) scale(var(--uixy-bk-s2)) rotate(var(--uixy-bk-r2)); }
          75% { transform: translate(var(--uixy-bk-dx3), var(--uixy-bk-dy3)) scale(var(--uixy-bk-s3)) rotate(var(--uixy-bk-r3)); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  const elements = Array.from({ length: count }, (_, i) => {
    const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
    const color = colors[i % colors.length];
    const duration = (15 + Math.random() * 20) / speed;
    const rp = () => `${(Math.random() - 0.5) * 60}px`;
    const rs = () => `${0.8 + Math.random() * 0.4}`;
    const rr = () => `${(Math.random() - 0.5) * 40}deg`;
    const s = shape === "mixed" ? shapeKeys[i % shapeKeys.length] : shape;
    const isRing = s === "ring";
    const isCircle = s === "circle";
    const clip = clipPaths[s];
    const baseStyle = {
      position: "absolute",
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: size,
      height: size,
      opacity: 0.35 + Math.random() * 0.3,
      filter: `blur(${1.5 + Math.random() * 3}px)`,
      animation: `uixy-bokeh-float ${duration}s ease-in-out infinite`,
      animationDelay: `${-Math.random() * duration}s`,
      "--uixy-bk-dx1": rp(),
      "--uixy-bk-dy1": rp(),
      "--uixy-bk-s1": rs(),
      "--uixy-bk-r1": rr(),
      "--uixy-bk-dx2": rp(),
      "--uixy-bk-dy2": rp(),
      "--uixy-bk-s2": rs(),
      "--uixy-bk-r2": rr(),
      "--uixy-bk-dx3": rp(),
      "--uixy-bk-dy3": rp(),
      "--uixy-bk-s3": rs(),
      "--uixy-bk-r3": rr()
    };
    if (isRing) {
      return {
        key: i,
        style: {
          ...baseStyle,
          borderRadius: "50%",
          border: `${2 + Math.random() * 3}px solid ${color}50`,
          background: "transparent"
        }
      };
    }
    return {
      key: i,
      style: {
        ...baseStyle,
        borderRadius: isCircle ? "50%" : "0",
        background: isCircle ? `radial-gradient(circle at 35% 35%, ${color}45, ${color}18, transparent)` : `linear-gradient(135deg, ${color}40, ${color}15, transparent)`,
        border: `1px solid ${color}20`,
        clipPath: clip || void 0
      }
    };
  });
  return /* @__PURE__ */ jsx24(
    "div",
    {
      ref: containerRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { overflow: "hidden", position: "relative" },
      children: elements.map((c) => /* @__PURE__ */ jsx24("div", { style: c.style }, c.key))
    }
  );
};
BokehBackground.displayName = "BokehBackground";

// src/components/Background/PixelBackground.tsx
import { useEffect as useEffect20, useRef as useRef17 } from "react";
import { jsx as jsx25 } from "react/jsx-runtime";
function hexToRgb2(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16)
  ];
}
function makeNoise(cols, rows) {
  const arr = new Float32Array(cols * rows);
  for (let i = 0; i < arr.length; i++) arr[i] = Math.random();
  return arr;
}
function smoothNoise(noise, cols, rows, x, y) {
  const x0 = Math.floor(x) % cols;
  const y0 = Math.floor(y) % rows;
  const x1 = (x0 + 1) % cols;
  const y1 = (y0 + 1) % rows;
  const fx = x - Math.floor(x);
  const fy = y - Math.floor(y);
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const n00 = noise[y0 * cols + x0];
  const n10 = noise[y0 * cols + x1];
  const n01 = noise[y1 * cols + x0];
  const n11 = noise[y1 * cols + x1];
  return (n00 * (1 - sx) + n10 * sx) * (1 - sy) + (n01 * (1 - sx) + n11 * sx) * sy;
}
var PixelBackground = ({
  variant = "rain",
  pixelSize = 8,
  colors,
  speed = 1,
  opacity = 0.6,
  className
}) => {
  const canvasRef = useRef17(null);
  const rafRef = useRef17(0);
  useEffect20(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const ps = pixelSize;
    if (variant === "rain") {
      const palette = (colors || ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4"]).map(hexToRgb2);
      let cols = Math.ceil(canvas.width / ps);
      const makeDrop = (col, startY) => ({
        x: col,
        y: startY != null ? startY : -(Math.random() * 30),
        len: 4 + Math.floor(Math.random() * 12),
        speed: 0.15 + Math.random() * 0.25,
        color: palette[Math.floor(Math.random() * palette.length)]
      });
      let drops = [];
      cols = Math.ceil(canvas.width / ps);
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 0.35) {
          drops.push(makeDrop(c));
        }
      }
      const draw = () => {
        const w = canvas.width;
        const h = canvas.height;
        const rows = Math.ceil(h / ps);
        cols = Math.ceil(w / ps);
        ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
        ctx.fillRect(0, 0, w, h);
        for (const d of drops) {
          const headRow = Math.floor(d.y);
          for (let i = 0; i < d.len; i++) {
            const row = headRow - i;
            if (row < 0 || row >= rows) continue;
            const brightness = 1 - i / d.len;
            const a = brightness * brightness * opacity;
            const [r, g, b] = d.color;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            ctx.fillRect(d.x * ps, row * ps, ps - 1, ps - 1);
          }
          const hr = Math.floor(d.y);
          if (hr >= 0 && hr < rows) {
            const [r, g, b] = d.color;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`;
            ctx.fillRect(d.x * ps - 1, hr * ps - 1, ps + 2, ps + 2);
          }
          d.y += d.speed * speed;
        }
        drops = drops.filter((d) => {
          if ((d.y - d.len) * ps > h) {
            return false;
          }
          return true;
        });
        if (Math.random() < 0.3 * speed) {
          const col = Math.floor(Math.random() * cols);
          drops.push(makeDrop(col, -2));
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    } else if (variant === "life") {
      const palette = colors || ["#22c55e", "#16a34a", "#15803d"];
      const cols = Math.ceil(canvas.width / ps);
      const rows = Math.ceil(canvas.height / ps);
      let grid = Array.from(
        { length: rows },
        () => Array.from({ length: cols }, () => Math.random() > 0.82 ? 1 : 0)
      );
      let ages = Array.from(
        { length: rows },
        () => new Float32Array(cols)
      );
      let frame = 0;
      const draw = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (grid[r][c]) {
              ages[r][c] = Math.min(ages[r][c] + 0.08, 1);
            } else {
              ages[r][c] = Math.max(ages[r][c] - 0.05, 0);
            }
            if (ages[r][c] > 0.01) {
              ctx.globalAlpha = ages[r][c] * opacity;
              ctx.fillStyle = palette[(r + c) % palette.length];
              ctx.fillRect(c * ps, r * ps, ps - 1, ps - 1);
            }
          }
        }
        ctx.globalAlpha = 1;
        frame++;
        if (frame % Math.max(1, Math.round(6 / speed)) === 0) {
          const next = grid.map((row) => [...row]);
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              let n = 0;
              for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                  if (dr === 0 && dc === 0) continue;
                  const nr = (r + dr + rows) % rows;
                  const nc = (c + dc + cols) % cols;
                  n += grid[nr][nc];
                }
              }
              if (grid[r][c]) {
                next[r][c] = n === 2 || n === 3 ? 1 : 0;
              } else {
                next[r][c] = n === 3 ? 1 : 0;
              }
            }
          }
          grid = next;
          let alive = 0;
          for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) alive += grid[r][c];
          if (alive < rows * cols * 0.03) {
            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                if (Math.random() > 0.85) grid[r][c] = 1;
              }
            }
          }
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    } else if (variant === "terrain") {
      const palette = colors || ["#0f172a", "#1e3a5f", "#1a4731", "#365314", "#4d7c0f", "#65a30d", "#84cc16", "#a3e635"];
      const cols = Math.ceil(canvas.width / ps);
      const rows = Math.ceil(canvas.height / ps);
      const noise = (x, y, t2) => {
        return Math.sin(x * 0.04 + t2 * 0.7) * 0.35 + Math.sin(y * 0.06 - t2 * 0.5) * 0.25 + Math.sin((x + y) * 0.025 + t2 * 0.3) * 0.2 + Math.sin(x * 0.1 - y * 0.08 + t2 * 0.4) * 0.2;
      };
      let t = 0;
      const draw = () => {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const n = (noise(c, r, t) + 1) / 2;
            const idx = Math.min(palette.length - 1, Math.floor(n * palette.length));
            ctx.globalAlpha = opacity;
            ctx.fillStyle = palette[idx];
            ctx.fillRect(c * ps, r * ps, ps, ps);
          }
        }
        ctx.globalAlpha = 1;
        t += 6e-3 * speed;
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    } else {
      const palette = (colors || ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#14b8a6"]).map(hexToRgb2);
      const cols = Math.ceil(canvas.width / ps);
      const rows = Math.ceil(canvas.height / ps);
      const noiseSize = 64;
      const noise1 = makeNoise(noiseSize, noiseSize);
      const noise2 = makeNoise(noiseSize, noiseSize);
      const noise3 = makeNoise(noiseSize, noiseSize);
      let t = 0;
      const draw = () => {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const n1 = smoothNoise(noise1, noiseSize, noiseSize, c * 0.08 + t * 0.5, r * 0.08 + t * 0.3);
            const n2 = smoothNoise(noise2, noiseSize, noiseSize, c * 0.12 - t * 0.4, r * 0.12 + t * 0.2);
            const n3 = smoothNoise(noise3, noiseSize, noiseSize, c * 0.05 + t * 0.2, r * 0.05 - t * 0.35);
            const combined = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
            const pi = combined * (palette.length - 1);
            const idx0 = Math.floor(pi);
            const idx1 = Math.min(idx0 + 1, palette.length - 1);
            const frac = pi - idx0;
            const [r0, g0, b0] = palette[idx0];
            const [r1, g1, b1] = palette[idx1];
            const fr = Math.round(r0 + (r1 - r0) * frac);
            const fg = Math.round(g0 + (g1 - g0) * frac);
            const fb = Math.round(b0 + (b1 - b0) * frac);
            ctx.globalAlpha = opacity * (0.5 + combined * 0.5);
            ctx.fillStyle = `rgb(${fr}, ${fg}, ${fb})`;
            ctx.fillRect(c * ps, r * ps, ps, ps);
          }
        }
        ctx.globalAlpha = 1;
        t += 0.015 * speed;
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();
    }
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [variant, pixelSize, colors, speed, opacity]);
  return /* @__PURE__ */ jsx25(
    "canvas",
    {
      ref: canvasRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { display: "block", background: "#09090b", imageRendering: "pixelated" }
    }
  );
};
PixelBackground.displayName = "PixelBackground";

// src/components/Background/RippleBackground.tsx
import { useEffect as useEffect21 } from "react";
import { jsx as jsx26 } from "react/jsx-runtime";
var rippleStyleInjected = false;
var RippleBackground = ({
  count = 6,
  color = "rgba(139, 92, 246, 0.15)",
  duration = 4,
  className
}) => {
  useEffect21(() => {
    if (rippleStyleInjected) return;
    rippleStyleInjected = true;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes uixy-ripple {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);
  const rings = Array.from({ length: count }, (_, i) => ({
    key: i,
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      border: `1.5px solid ${color}`,
      boxShadow: `0 0 30px 2px ${color}`,
      animation: `uixy-ripple ${duration}s ease-out infinite`,
      animationDelay: `${i * duration / count}s`,
      pointerEvents: "none"
    }
  }));
  return /* @__PURE__ */ jsx26(
    "div",
    {
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none",
      style: { overflow: "hidden", position: "relative" },
      children: rings.map((r) => /* @__PURE__ */ jsx26("div", { style: r.style }, r.key))
    }
  );
};
RippleBackground.displayName = "RippleBackground";

// src/components/Background/DotPatternBackground.tsx
import { useEffect as useEffect22, useRef as useRef18 } from "react";
import { jsx as jsx27 } from "react/jsx-runtime";
var DotPatternBackground = ({
  spacing = 24,
  radius = 1.2,
  color = "rgba(161, 161, 170, 0.25)",
  glow = false,
  glowColor,
  mouseReactive = true,
  mouseRadius = 120,
  className
}) => {
  const canvasRef = useRef18(null);
  const mouseRef = useRef18({ x: -9999, y: -9999 });
  const rafRef = useRef18(0);
  useEffect22(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    if (mouseReactive) window.addEventListener("mousemove", onMouse);
    const cols = Math.ceil(3e3 / spacing);
    const rows = Math.ceil(2e3 / spacing);
    const phases = glow ? Array.from({ length: cols * rows }, () => ({
      offset: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 2
    })) : [];
    let t = 0;
    const gc = glowColor || color;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const curCols = Math.ceil(w / spacing) + 1;
      const curRows = Math.ceil(h / spacing) + 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      for (let r = 0; r < curRows; r++) {
        for (let c = 0; c < curCols; c++) {
          const x = c * spacing;
          const y = r * spacing;
          let dotRadius = radius;
          let dotAlpha = 1;
          if (mouseReactive) {
            const dx = mx - x;
            const dy = my - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
              const factor = 1 - dist / mouseRadius;
              dotRadius = radius + factor * radius * 2.5;
              dotAlpha = 1;
            }
          }
          if (glow) {
            const idx = (r * cols + c) % phases.length;
            if (idx < phases.length) {
              const p = phases[idx];
              const pulse = (Math.sin(t * p.speed + p.offset) + 1) / 2;
              dotRadius += pulse * radius * 1.5;
              dotAlpha *= 0.4 + pulse * 0.6;
            }
          }
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          if (glow && dotRadius > radius * 1.5) {
            ctx.fillStyle = gc;
            ctx.shadowBlur = 8;
            ctx.shadowColor = gc;
          } else {
            ctx.fillStyle = color;
            ctx.shadowBlur = 0;
          }
          ctx.globalAlpha = dotAlpha;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      t += 0.016;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [spacing, radius, color, glow, glowColor, mouseReactive, mouseRadius]);
  return /* @__PURE__ */ jsx27(
    "canvas",
    {
      ref: canvasRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { display: "block" }
    }
  );
};
DotPatternBackground.displayName = "DotPatternBackground";

// src/components/Background/RetroGridBackground.tsx
import { useEffect as useEffect23, useRef as useRef19 } from "react";
import { jsx as jsx28 } from "react/jsx-runtime";
function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`;
}
var RetroGridBackground = ({
  cellSize = 50,
  lineColor = "#8b5cf6",
  speed = 1,
  glow = true,
  verticalLines = 25,
  horizontalLines = 16,
  className
}) => {
  const canvasRef = useRef19(null);
  const rafRef = useRef19(0);
  useEffect23(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    let scrollY = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const horizon = h * 0.35;
      const groundH = h - horizon;
      const cx = w / 2;
      ctx.lineWidth = 1;
      const half = Math.floor(verticalLines / 2);
      for (let i = -half; i <= half; i++) {
        const spread = i / half;
        const bottomX = cx + spread * w * 1.2;
        const edgeFade = 1 - Math.abs(spread) * 0.5;
        ctx.strokeStyle = hexToRgba(lineColor, 0.25 * edgeFade);
        ctx.beginPath();
        ctx.moveTo(cx, horizon);
        ctx.lineTo(bottomX, h);
        ctx.stroke();
      }
      const scrollPhase = scrollY % 1;
      for (let i = 0; i < horizontalLines + 2; i++) {
        const rawT = (i - scrollPhase) / horizontalLines;
        if (rawT < 0 || rawT > 1) continue;
        const perspT = rawT * rawT;
        const y = horizon + perspT * groundH;
        const alpha = 0.08 + rawT * 0.3;
        const thickness = 0.5 + rawT * 1;
        const spanFactor = rawT * 1.2;
        const leftX = cx - w * spanFactor;
        const rightX = cx + w * spanFactor;
        ctx.strokeStyle = hexToRgba(lineColor, alpha);
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.moveTo(leftX, y);
        ctx.lineTo(rightX, y);
        ctx.stroke();
      }
      if (glow) {
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.2, hexToRgba(lineColor, 0.4));
        grad.addColorStop(0.5, hexToRgba(lineColor, 0.9));
        grad.addColorStop(0.8, hexToRgba(lineColor, 0.4));
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 25;
        ctx.shadowColor = lineColor;
        ctx.beginPath();
        ctx.moveTo(0, horizon);
        ctx.lineTo(w, horizon);
        ctx.stroke();
        ctx.shadowBlur = 0;
        const vGrad = ctx.createLinearGradient(cx, horizon - 80, cx, horizon + 30);
        vGrad.addColorStop(0, "transparent");
        vGrad.addColorStop(0.5, hexToRgba(lineColor, 0.15));
        vGrad.addColorStop(1, "transparent");
        ctx.fillStyle = vGrad;
        ctx.fillRect(cx - 60, horizon - 80, 120, 110);
        const ambGrad = ctx.createRadialGradient(cx, horizon, 10, cx, horizon, w * 0.5);
        ambGrad.addColorStop(0, hexToRgba(lineColor, 0.06));
        ambGrad.addColorStop(1, "transparent");
        ctx.fillStyle = ambGrad;
        ctx.fillRect(0, horizon - 100, w, 200);
        ctx.fillStyle = hexToRgba(lineColor, 0.15);
        for (let i = 0; i < 30; i++) {
          const sx = i * 137.5 % w;
          const sy = i * 97.3 % (horizon - 10);
          const sr = 0.5 + i % 3 * 0.4;
          ctx.beginPath();
          ctx.arc(sx, sy, sr, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      scrollY += 0.02 * speed;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [cellSize, lineColor, speed, glow, verticalLines, horizontalLines]);
  return /* @__PURE__ */ jsx28(
    "canvas",
    {
      ref: canvasRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { display: "block" }
    }
  );
};
RetroGridBackground.displayName = "RetroGridBackground";

// src/components/Background/MeteorBackground.tsx
import { useEffect as useEffect24, useRef as useRef20 } from "react";
import { jsx as jsx29 } from "react/jsx-runtime";
var MeteorBackground = ({
  count = 20,
  angle = 215,
  color = "#a1a1aa",
  tailLength = 80,
  speed = 1,
  className
}) => {
  const canvasRef = useRef20(null);
  const rafRef = useRef20(0);
  useEffect24(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const rad = angle * Math.PI / 180;
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    const spawnMeteor = () => {
      const w = canvas.width;
      const h = canvas.height;
      return {
        x: Math.random() * (w + 400) - 200,
        y: -Math.random() * h * 0.5 - 50,
        speed: (2 + Math.random() * 4) * speed,
        length: tailLength * (0.5 + Math.random() * 1),
        opacity: 0.3 + Math.random() * 0.7,
        width: 0.5 + Math.random() * 1.5
      };
    };
    let meteors = Array.from({ length: count }, () => {
      const m = spawnMeteor();
      m.x += dx * Math.random() * canvas.height * 2;
      m.y += dy * Math.random() * canvas.height * 2;
      return m;
    });
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const m of meteors) {
        const headX = m.x;
        const headY = m.y;
        const tailX = headX - dx * m.length;
        const tailY = headY - dy * m.length;
        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.6, `${color}${Math.round(m.opacity * 100).toString(16).padStart(2, "0")}`);
        grad.addColorStop(1, color);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.lineCap = "round";
        ctx.globalAlpha = m.opacity;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(headX, headY, m.width + 0.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = m.opacity * 0.8;
        ctx.shadowBlur = 6;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;
        m.x += dx * m.speed;
        m.y += dy * m.speed;
        if (m.x < -200 || m.x > w + 200 || m.y > h + 200) {
          Object.assign(m, spawnMeteor());
        }
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, angle, color, tailLength, speed]);
  return /* @__PURE__ */ jsx29(
    "canvas",
    {
      ref: canvasRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { display: "block" }
    }
  );
};
MeteorBackground.displayName = "MeteorBackground";

// src/components/Background/BeamsBackground.tsx
import { useEffect as useEffect25 } from "react";
import { jsx as jsx30 } from "react/jsx-runtime";
var beamsStyleInjected = false;
var BeamsBackground = ({
  count = 8,
  colors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#ec4899"],
  speed = 1,
  opacity = 0.12,
  beamWidth = 300,
  className
}) => {
  useEffect25(() => {
    if (beamsStyleInjected) return;
    beamsStyleInjected = true;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes uixy-beam-sway {
        0%, 100% { transform: rotate(var(--uixy-beam-r0)) scaleY(1); opacity: var(--uixy-beam-o); }
        25% { transform: rotate(var(--uixy-beam-r1)) scaleY(1.1); opacity: calc(var(--uixy-beam-o) * 1.3); }
        50% { transform: rotate(var(--uixy-beam-r2)) scaleY(0.9); opacity: var(--uixy-beam-o); }
        75% { transform: rotate(var(--uixy-beam-r3)) scaleY(1.05); opacity: calc(var(--uixy-beam-o) * 0.8); }
      }
    `;
    document.head.appendChild(style);
  }, []);
  const beams = Array.from({ length: count }, (_, i) => {
    const angle = -30 + i / (count - 1) * 60;
    const color = colors[i % colors.length];
    const duration = (12 + Math.random() * 10) / speed;
    const jitter = (Math.random() - 0.5) * 15;
    return {
      key: i,
      style: {
        position: "absolute",
        bottom: "-20%",
        left: "50%",
        width: `${beamWidth}px`,
        height: "160%",
        marginLeft: `${-beamWidth / 2}px`,
        transformOrigin: "center bottom",
        background: `linear-gradient(to top, ${color}00 0%, ${color} 30%, ${color}80 60%, transparent 100%)`,
        filter: `blur(${40 + Math.random() * 30}px)`,
        animation: `uixy-beam-sway ${duration}s ease-in-out infinite`,
        animationDelay: `${-Math.random() * duration}s`,
        "--uixy-beam-r0": `${angle + jitter}deg`,
        "--uixy-beam-r1": `${angle + jitter + 5}deg`,
        "--uixy-beam-r2": `${angle + jitter - 4}deg`,
        "--uixy-beam-r3": `${angle + jitter + 3}deg`,
        "--uixy-beam-o": String(opacity),
        pointerEvents: "none",
        mixBlendMode: "screen"
      }
    };
  });
  return /* @__PURE__ */ jsx30(
    "div",
    {
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none",
      style: { overflow: "hidden", position: "relative" },
      children: beams.map((b) => /* @__PURE__ */ jsx30("div", { style: b.style }, b.key))
    }
  );
};
BeamsBackground.displayName = "BeamsBackground";

// src/components/Background/NoiseBackground.tsx
import { useEffect as useEffect26, useRef as useRef21 } from "react";
import { jsx as jsx31 } from "react/jsx-runtime";
function hexToRgb3(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
}
function createNoiseGen(seed) {
  const size = 256;
  const perm = new Uint8Array(size * 2);
  let s = seed;
  const rng = () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s & 2147483647) / 2147483647;
  };
  const vals = new Float32Array(size);
  for (let i = 0; i < size; i++) vals[i] = rng();
  for (let i = 0; i < size; i++) perm[i] = perm[i + size] = Math.floor(rng() * size);
  return (x, y) => {
    const xi = Math.floor(x) & size - 1;
    const yi = Math.floor(y) & size - 1;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);
    const a = vals[perm[xi + perm[yi]]];
    const b = vals[perm[xi + 1 + perm[yi]]];
    const c = vals[perm[xi + perm[yi + 1]]];
    const d = vals[perm[xi + 1 + perm[yi + 1]]];
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  };
}
function fbm(noiseFn, x, y, octaves) {
  let val = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < octaves; i++) {
    val += amp * noiseFn(x * freq, y * freq);
    amp *= 0.5;
    freq *= 2;
  }
  return val;
}
var NoiseBackground = ({
  variant = "perlin",
  colors,
  speed = 1,
  scale = 1,
  opacity = 0.8,
  className
}) => {
  const canvasRef = useRef21(null);
  const rafRef = useRef21(0);
  useEffect26(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pixelRatio = 0.25;
    const resize = () => {
      canvas.width = Math.ceil(canvas.offsetWidth * pixelRatio);
      canvas.height = Math.ceil(canvas.offsetHeight * pixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);
    const noise1 = createNoiseGen(42);
    const noise2 = createNoiseGen(137);
    const noise3 = createNoiseGen(256);
    const palette = (colors || ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#14b8a6"]).map(hexToRgb3);
    let t = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;
      const sc = 8e-3 / scale;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let val;
          const px = x * sc;
          const py = y * sc;
          if (variant === "perlin") {
            val = fbm(noise1, px + t * 0.3, py + t * 0.2, 5);
          } else if (variant === "clouds") {
            const n1 = fbm(noise1, px + t * 0.15, py + t * 0.1, 4);
            const n2 = fbm(noise2, px * 2 - t * 0.1, py * 2 + t * 0.15, 3) * 0.3;
            val = Math.min(1, Math.max(0, n1 + n2));
          } else if (variant === "marble") {
            const n = fbm(noise1, px, py + t * 0.2, 5);
            val = (Math.sin(px * 8 + n * 20 + t) + 1) * 0.5;
          } else {
            const n1 = fbm(noise1, px + t * 0.5, py, 4);
            const n2 = fbm(noise2, px, py + t * 0.5, 4);
            const n3 = fbm(noise3, px + t * 0.3, py + t * 0.3, 3);
            const raw = Math.abs(Math.sin(n1 * 12 + t * 2)) * Math.abs(Math.cos(n2 * 10 - t));
            val = raw * raw + n3 * 0.15;
            val = Math.min(1, val);
          }
          const pi = val * (palette.length - 1);
          const idx0 = Math.floor(pi);
          const idx1 = Math.min(idx0 + 1, palette.length - 1);
          const frac = pi - idx0;
          const [r0, g0, b0] = palette[idx0];
          const [r1, g1, b1] = palette[idx1];
          const i = (y * w + x) * 4;
          data[i] = Math.round(r0 + (r1 - r0) * frac);
          data[i + 1] = Math.round(g0 + (g1 - g0) * frac);
          data[i + 2] = Math.round(b0 + (b1 - b0) * frac);
          data[i + 3] = Math.round(opacity * 255);
        }
      }
      ctx.putImageData(imgData, 0, 0);
      t += 8e-3 * speed;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [variant, colors, speed, scale, opacity]);
  return /* @__PURE__ */ jsx31(
    "canvas",
    {
      ref: canvasRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { display: "block", imageRendering: "auto", width: "100%", height: "100%" }
    }
  );
};
NoiseBackground.displayName = "NoiseBackground";

// src/components/Background/GeometricBackground.tsx
import { useEffect as useEffect27, useRef as useRef22 } from "react";
import { jsx as jsx32 } from "react/jsx-runtime";
function hexToRGBA(hex, a) {
  const h = hex.replace("#", "");
  return `rgba(${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)},${a})`;
}
var GeometricBackground = ({
  variant = "triangles",
  colors,
  speed = 1,
  cellSize = 60,
  opacity = 0.5,
  className
}) => {
  const canvasRef = useRef22(null);
  const rafRef = useRef22(0);
  useEffect27(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const palette = colors || ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#14b8a6"];
    let t = 0;
    const voronoiCount = Math.max(20, Math.floor(canvas.width * canvas.height / (cellSize * cellSize * 4)));
    const seeds = Array.from({ length: voronoiCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      color: palette[Math.floor(Math.random() * palette.length)]
    }));
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      if (variant === "triangles") {
        const cs = cellSize;
        const rowH = cs * Math.sin(Math.PI / 3);
        const cols = Math.ceil(w / cs) + 2;
        const rows = Math.ceil(h / rowH) + 2;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const offset = r % 2 === 0 ? 0 : cs / 2;
            const x = c * cs + offset;
            const y = r * rowH;
            for (let tri = 0; tri < 2; tri++) {
              const phase = Math.sin(t * 0.5 + c * 0.3 + r * 0.4 + tri) * 0.5 + 0.5;
              const cIdx = Math.floor(phase * (palette.length - 1));
              const alpha = (0.15 + phase * 0.35) * opacity;
              ctx.beginPath();
              if (tri === 0) {
                ctx.moveTo(x, y);
                ctx.lineTo(x + cs, y);
                ctx.lineTo(x + cs / 2, y + rowH);
              } else {
                ctx.moveTo(x + cs / 2, y);
                ctx.lineTo(x + cs * 1.5, y);
                ctx.lineTo(x + cs, y + rowH);
              }
              ctx.closePath();
              ctx.fillStyle = hexToRGBA(palette[cIdx], alpha);
              ctx.fill();
              ctx.strokeStyle = hexToRGBA(palette[cIdx], alpha * 0.5);
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      } else if (variant === "hexgrid") {
        const size = cellSize / 2;
        const hSpacing = size * 1.5;
        const vSpacing = size * Math.sqrt(3);
        const cols = Math.ceil(w / hSpacing) + 2;
        const rows = Math.ceil(h / vSpacing) + 2;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const cx = c * hSpacing;
            const cy = r * vSpacing + (c % 2 === 1 ? vSpacing / 2 : 0);
            const phase = Math.sin(t * 0.4 + c * 0.2 + r * 0.3) * 0.5 + 0.5;
            const pulse = 0.85 + Math.sin(t * 0.8 + c * 0.5 + r * 0.7) * 0.15;
            const cIdx = Math.floor(phase * (palette.length - 1));
            const alpha = (0.1 + phase * 0.4) * opacity;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = Math.PI / 3 * i - Math.PI / 6;
              const px = cx + size * pulse * Math.cos(angle);
              const py = cy + size * pulse * Math.sin(angle);
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = hexToRGBA(palette[cIdx], alpha * 0.6);
            ctx.fill();
            ctx.strokeStyle = hexToRGBA(palette[cIdx], alpha);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      } else if (variant === "voronoi") {
        for (const s of seeds) {
          s.x += s.vx * speed;
          s.y += s.vy * speed;
          if (s.x < 0 || s.x > w) s.vx *= -1;
          if (s.y < 0 || s.y > h) s.vy *= -1;
        }
        const step = 8;
        for (let y = 0; y < h; y += step) {
          for (let x = 0; x < w; x += step) {
            let minDist = Infinity;
            let secondDist = Infinity;
            let closest = 0;
            for (let i = 0; i < seeds.length; i++) {
              const dx = x - seeds[i].x;
              const dy = y - seeds[i].y;
              const d = dx * dx + dy * dy;
              if (d < minDist) {
                secondDist = minDist;
                minDist = d;
                closest = i;
              } else if (d < secondDist) {
                secondDist = d;
              }
            }
            const edge = Math.sqrt(secondDist) - Math.sqrt(minDist);
            const isEdge = edge < 8;
            const alpha = isEdge ? opacity * 0.8 : opacity * 0.15;
            ctx.fillStyle = hexToRGBA(seeds[closest].color, alpha);
            ctx.fillRect(x, y, step, step);
          }
        }
      } else if (variant === "circles") {
        const cs = cellSize;
        const cols = Math.ceil(w / cs) + 1;
        const rows = Math.ceil(h / cs) + 1;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const cx = c * cs + cs / 2;
            const cy = r * cs + cs / 2;
            const phase = Math.sin(t * 0.6 + c * 0.4 + r * 0.5) * 0.5 + 0.5;
            const radius = cs * 0.3 * (0.3 + phase * 0.7);
            const cIdx = Math.floor(phase * (palette.length - 1));
            const alpha = (0.15 + phase * 0.35) * opacity;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = hexToRGBA(palette[cIdx], alpha * 0.5);
            ctx.fill();
            ctx.strokeStyle = hexToRGBA(palette[cIdx], alpha);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      t += 0.015 * speed;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [variant, colors, speed, cellSize, opacity]);
  return /* @__PURE__ */ jsx32(
    "canvas",
    {
      ref: canvasRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { display: "block" }
    }
  );
};
GeometricBackground.displayName = "GeometricBackground";

// src/components/Background/FlowFieldBackground.tsx
import { useEffect as useEffect28, useRef as useRef23 } from "react";
import { jsx as jsx33 } from "react/jsx-runtime";
function hexToRGBA2(hex, a) {
  const h = hex.replace("#", "");
  return `rgba(${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)},${a})`;
}
var FlowFieldBackground = ({
  variant = "wind",
  colors,
  speed = 1,
  particleCount = 800,
  trailLength = 0.92,
  opacity = 0.6,
  className
}) => {
  const canvasRef = useRef23(null);
  const rafRef = useRef23(0);
  useEffect28(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const palette = colors || ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#14b8a6"];
    const createParticle = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        prevX: x,
        prevY: y,
        color: palette[Math.floor(Math.random() * palette.length)],
        life: 0,
        maxLife: 100 + Math.random() * 200
      };
    };
    let particles = Array.from({ length: particleCount }, createParticle);
    let t = 0;
    const getAngle = (x, y) => {
      const w = canvas.width;
      const h = canvas.height;
      const nx = x / w;
      const ny = y / h;
      if (variant === "wind") {
        return Math.sin(nx * 4 + t * 0.5) * 0.5 + Math.cos(ny * 3 - t * 0.3) * 0.3 + Math.sin((nx + ny) * 2 + t * 0.2) * 0.2 + t * 0.1;
      }
      if (variant === "magnetic") {
        const p1x = w * 0.3, p1y = h * 0.4;
        const p2x = w * 0.7, p2y = h * 0.6;
        const a1 = Math.atan2(y - p1y, x - p1x);
        const a2 = Math.atan2(y - p2y, x - p2x);
        const d1 = Math.sqrt((x - p1x) ** 2 + (y - p1y) ** 2);
        const d2 = Math.sqrt((x - p2x) ** 2 + (y - p2y) ** 2);
        return (a1 * d2 + (a2 + Math.PI) * d1) / (d1 + d2) + Math.sin(t * 0.3) * 0.2;
      }
      if (variant === "curl") {
        const s = 5e-3;
        const n1 = Math.sin(x * s + t * 0.3) * Math.cos(y * s * 1.3 - t * 0.2);
        const n2 = Math.sin(y * s * 0.7 + t * 0.25) * Math.cos(x * s * 1.1 + t * 0.15);
        return Math.atan2(n1 - n2, n1 + n2) + t * 0.05;
      }
      const cx = w / 2 + Math.sin(t * 0.2) * w * 0.1;
      const cy = h / 2 + Math.cos(t * 0.15) * h * 0.1;
      const dx = x - cx;
      const dy = y - cy;
      const angle = Math.atan2(dy, dx);
      const dist = Math.sqrt(dx * dx + dy * dy);
      return angle + Math.PI / 2 + 0.5 / (dist * 0.01 + 1) + t * 0.1;
    };
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = `rgba(9, 9, 11, ${1 - trailLength})`;
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.prevX = p.x;
        p.prevY = p.y;
        const angle = getAngle(p.x, p.y);
        const spd = 1.5 * speed;
        p.x += Math.cos(angle) * spd;
        p.y += Math.sin(angle) * spd;
        p.life++;
        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(1, p.life / 20);
        const fadeOut = Math.max(0, 1 - (lifeRatio - 0.8) / 0.2);
        const alpha = fadeIn * (lifeRatio > 0.8 ? fadeOut : 1) * opacity;
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = hexToRGBA2(p.color, alpha);
        ctx.lineWidth = 1;
        ctx.stroke();
        if (p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10 || p.life > p.maxLife) {
          particles[i] = createParticle();
        }
      }
      t += 0.02 * speed;
      rafRef.current = requestAnimationFrame(draw);
    };
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [variant, colors, speed, particleCount, trailLength, opacity]);
  return /* @__PURE__ */ jsx33(
    "canvas",
    {
      ref: canvasRef,
      className: className != null ? className : "fixed inset-0 -z-10 pointer-events-none w-full h-full",
      style: { display: "block" }
    }
  );
};
FlowFieldBackground.displayName = "FlowFieldBackground";

// src/components/Other/Badge.tsx
import { forwardRef as forwardRef2, useEffect as useEffect29 } from "react";
import { jsx as jsx34, jsxs as jsxs12 } from "react/jsx-runtime";
var badgeStyleInjected = false;
var Badge = forwardRef2(
  ({ variant = "default", size = "md", dot, dotColor, pill = true, icon, color, className, children, style, ...props }, ref) => {
    useEffect29(() => {
      if (!badgeStyleInjected) {
        badgeStyleInjected = true;
        const style2 = document.createElement("style");
        style2.textContent = `
          @keyframes uixy-badge-shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `;
        document.head.appendChild(style2);
      }
    }, []);
    const variants = {
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
      beta: "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/20"
    };
    const sizes = {
      sm: "text-[10px] px-1.5 py-0.5 gap-1",
      md: "text-xs px-2.5 py-0.5 gap-1.5",
      lg: "text-sm px-3 py-1 gap-1.5"
    };
    const dotColors = {
      default: "bg-violet-400",
      secondary: "bg-zinc-400",
      outline: "bg-zinc-400",
      success: "bg-emerald-400",
      warning: "bg-amber-400",
      destructive: "bg-red-400",
      glow: "bg-violet-400",
      gradient: "bg-violet-400",
      glass: "bg-zinc-300",
      neon: "bg-cyan-400",
      shimmer: "bg-zinc-400",
      soft: "bg-violet-400",
      info: "bg-blue-400",
      premium: "bg-amber-400",
      new: "bg-emerald-400",
      beta: "bg-indigo-400"
    };
    const colorOverride = {};
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
    const shimmerStyle = variant === "shimmer" ? {
      backgroundImage: "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.08) 50%, transparent 75%)",
      backgroundSize: "200% 100%",
      animation: "uixy-badge-shimmer 2s ease-in-out infinite"
    } : {};
    return /* @__PURE__ */ jsxs12(
      "span",
      {
        ref,
        className: cn(
          "inline-flex items-center font-medium border whitespace-nowrap transition-colors",
          pill ? "rounded-full" : "rounded-md",
          variants[variant],
          sizes[size],
          className
        ),
        style: { ...shimmerStyle, ...colorOverride, ...style },
        ...props,
        children: [
          dot && /* @__PURE__ */ jsx34(
            "span",
            {
              className: cn("w-1.5 h-1.5 rounded-full animate-pulse shrink-0", dotColor ? "" : dotColors[variant]),
              style: dotColor ? { backgroundColor: dotColor } : void 0
            }
          ),
          icon && /* @__PURE__ */ jsx34("span", { className: "shrink-0 [&>svg]:w-3 [&>svg]:h-3", children: icon }),
          children
        ]
      }
    );
  }
);
Badge.displayName = "Badge";

// src/components/Other/Tooltip.tsx
import { useState as useState10, useRef as useRef24, useEffect as useEffect30, useCallback as useCallback6 } from "react";
import { jsx as jsx35, jsxs as jsxs13 } from "react/jsx-runtime";
var tooltipStyleInjected = false;
var Tooltip = ({
  content,
  side = "top",
  variant = "default",
  delay = 300,
  arrow = true,
  color,
  children,
  className
}) => {
  const [state, setState] = useState10("hidden");
  const timerRef = useRef24();
  useEffect30(() => {
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
  const show = useCallback6(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setState("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setState("visible"));
      });
    }, delay);
  }, [delay]);
  const hide = useCallback6(() => {
    clearTimeout(timerRef.current);
    setState("leaving");
    timerRef.current = setTimeout(() => setState("hidden"), 120);
  }, []);
  useEffect30(() => () => clearTimeout(timerRef.current), []);
  const variants = {
    default: "bg-zinc-800 text-zinc-100 border border-zinc-700",
    dark: "bg-zinc-950 text-zinc-100 border border-zinc-800",
    light: "bg-zinc-100 text-zinc-900 border border-zinc-200",
    gradient: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white",
    glass: "bg-white/10 backdrop-blur-md text-zinc-100 border border-white/20",
    outlined: "bg-transparent text-zinc-300 border-2 border-zinc-500",
    neon: "bg-zinc-950 text-violet-300 border border-violet-500/50 shadow-[0_0_12px_rgba(139,92,246,0.3)]",
    success: "bg-emerald-950 text-emerald-200 border border-emerald-700/50",
    warning: "bg-amber-950 text-amber-200 border border-amber-700/50",
    error: "bg-red-950 text-red-200 border border-red-700/50"
  };
  const arrowBg = {
    default: "bg-zinc-800 border-zinc-700",
    dark: "bg-zinc-950 border-zinc-800",
    light: "bg-zinc-100 border-zinc-200",
    gradient: "bg-violet-600 border-violet-600",
    glass: "bg-white/10 border-white/20",
    outlined: "bg-zinc-950 border-zinc-500",
    neon: "bg-zinc-950 border-violet-500/50",
    success: "bg-emerald-950 border-emerald-700/50",
    warning: "bg-amber-950 border-amber-700/50",
    error: "bg-red-950 border-red-700/50"
  };
  const slideVars = {
    top: { "--uixy-tt-dy": "4px", "--uixy-tt-dx": "0" },
    bottom: { "--uixy-tt-dy": "-4px", "--uixy-tt-dx": "0" },
    left: { "--uixy-tt-dx": "4px", "--uixy-tt-dy": "0" },
    right: { "--uixy-tt-dx": "-4px", "--uixy-tt-dy": "0" }
  };
  const positionStyle = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 8 },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8 },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 8 },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 8 }
  };
  const arrowSide = {
    top: { bottom: -4, left: "50%", marginLeft: -4 },
    bottom: { top: -4, left: "50%", marginLeft: -4 },
    left: { right: -4, top: "50%", marginTop: -4 },
    right: { left: -4, top: "50%", marginTop: -4 }
  };
  const arrowBorderSide = {
    top: "border-b border-r",
    bottom: "border-t border-l",
    left: "border-t border-r",
    right: "border-b border-l"
  };
  if (state === "hidden") {
    return /* @__PURE__ */ jsx35("div", { className: "relative inline-flex", onMouseEnter: show, onMouseLeave: hide, onFocus: show, onBlur: hide, children });
  }
  return /* @__PURE__ */ jsxs13("div", { className: "relative inline-flex", onMouseEnter: show, onMouseLeave: hide, onFocus: show, onBlur: hide, children: [
    children,
    /* @__PURE__ */ jsxs13(
      "div",
      {
        className: cn(
          "uixy-tt absolute z-50 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shadow-lg",
          variants[variant],
          className
        ),
        style: {
          ...positionStyle[side],
          ...slideVars[side],
          ...color && variant === "gradient" ? { background: color, borderColor: "transparent" } : {},
          ...color && variant === "neon" ? { color, borderColor: `${color}80`, boxShadow: `0 0 12px ${color}50` } : {}
        },
        "data-state": state,
        role: "tooltip",
        children: [
          content,
          arrow && /* @__PURE__ */ jsx35(
            "span",
            {
              className: cn("absolute w-2 h-2 rotate-45", arrowBorderSide[side], arrowBg[variant]),
              style: arrowSide[side]
            }
          )
        ]
      }
    )
  ] });
};
Tooltip.displayName = "Tooltip";

// src/components/Other/Toggle.tsx
import { forwardRef as forwardRef3, useEffect as useEffect31 } from "react";
import { jsx as jsx36, jsxs as jsxs14 } from "react/jsx-runtime";
var toggleStyleInjected = false;
var Toggle = forwardRef3(
  ({ size = "md", variant = "default", color, label, className, checked, disabled, ...props }, ref) => {
    useEffect31(() => {
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
      lg: { trackW: 56, trackH: 30, thumb: 24, pad: 3 }
    };
    const s = sizes[size];
    const translatePx = s.trackW - s.thumb - s.pad * 2;
    const activeColor = color || "#8b5cf6";
    const trackStyles = { width: s.trackW, height: s.trackH };
    const thumbStyles = {
      width: s.thumb,
      height: s.thumb,
      transform: checked ? `translateX(${translatePx}px)` : "translateX(0px)"
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
    return /* @__PURE__ */ jsxs14("label", { className: cn("inline-flex items-center gap-2.5 cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed", className), children: [
      /* @__PURE__ */ jsxs14("div", { className: "relative", children: [
        /* @__PURE__ */ jsx36("input", { ref, type: "checkbox", className: "sr-only peer", checked, disabled, ...props }),
        /* @__PURE__ */ jsx36("div", { className: trackClasses, style: trackStyles, children: variant === "labeled" && /* @__PURE__ */ jsx36(
          "span",
          {
            className: "absolute inset-0 flex items-center text-white font-bold select-none",
            style: { fontSize: Math.round(s.thumb * 0.45), paddingLeft: s.pad + 3, paddingRight: s.pad + 3, justifyContent: checked ? "flex-start" : "flex-end" },
            children: checked ? "ON" : "OFF"
          }
        ) }),
        /* @__PURE__ */ jsx36("div", { className: thumbClasses, style: thumbStyles })
      ] }),
      label && /* @__PURE__ */ jsx36("span", { className: "text-sm text-zinc-300", children: label })
    ] });
  }
);
Toggle.displayName = "Toggle";

// src/components/Other/Separator.tsx
import { forwardRef as forwardRef4 } from "react";
import { jsx as jsx37, jsxs as jsxs15 } from "react/jsx-runtime";
var Separator = forwardRef4(
  ({ orientation = "horizontal", variant = "default", label, className, ...props }, ref) => {
    const isH = orientation === "horizontal";
    if (variant === "gradient") {
      return /* @__PURE__ */ jsx37(
        "div",
        {
          ref,
          role: "separator",
          className: cn(
            isH ? "w-full h-px" : "h-full w-px",
            className
          ),
          style: {
            background: isH ? "linear-gradient(to right, transparent, rgba(113,113,122,0.5), transparent)" : "linear-gradient(to bottom, transparent, rgba(113,113,122,0.5), transparent)"
          },
          ...props
        }
      );
    }
    const styles = {
      default: "border-solid",
      dashed: "border-dashed",
      dotted: "border-dotted"
    };
    if (label && isH) {
      return /* @__PURE__ */ jsxs15("div", { ref, role: "separator", className: cn("flex items-center gap-3", className), ...props, children: [
        /* @__PURE__ */ jsx37("div", { className: cn("flex-1 border-t border-zinc-800", styles[variant]) }),
        /* @__PURE__ */ jsx37("span", { className: "text-xs text-zinc-500 whitespace-nowrap", children: label }),
        /* @__PURE__ */ jsx37("div", { className: cn("flex-1 border-t border-zinc-800", styles[variant]) })
      ] });
    }
    return /* @__PURE__ */ jsx37(
      "div",
      {
        ref,
        role: "separator",
        className: cn(
          isH ? cn("w-full border-t border-zinc-800", styles[variant]) : cn("h-full border-l border-zinc-800", styles[variant]),
          className
        ),
        ...props
      }
    );
  }
);
Separator.displayName = "Separator";

// src/components/Other/Skeleton.tsx
import { useEffect as useEffect32 } from "react";
import { jsx as jsx38 } from "react/jsx-runtime";
var skeletonStyleInjected = false;
var Skeleton = ({
  variant = "rectangle",
  width,
  height,
  animation = "shimmer",
  className,
  ...props
}) => {
  useEffect32(() => {
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
  const shapes = {
    rectangle: "rounded-md",
    circle: "rounded-full",
    text: "rounded h-4"
  };
  const animStyles = {
    pulse: {},
    shimmer: {
      background: "linear-gradient(90deg, rgba(63,63,70,0.4) 25%, rgba(82,82,91,0.6) 50%, rgba(63,63,70,0.4) 75%)",
      backgroundSize: "400% 100%",
      animation: "uixy-skeleton-shimmer 1.5s ease-in-out infinite"
    },
    none: {}
  };
  return /* @__PURE__ */ jsx38(
    "div",
    {
      className: cn(
        shapes[variant],
        animation === "pulse" && "animate-pulse bg-zinc-800",
        animation === "none" && "bg-zinc-800",
        className
      ),
      style: {
        width: width != null ? width : variant === "circle" ? 40 : "100%",
        height: height != null ? height : variant === "circle" ? 40 : variant === "text" ? 16 : 20,
        ...animation === "shimmer" ? animStyles.shimmer : {}
      },
      ...props
    }
  );
};
Skeleton.displayName = "Skeleton";

// src/components/Other/Progress.tsx
import { forwardRef as forwardRef5, useEffect as useEffect33 } from "react";
import { jsx as jsx39, jsxs as jsxs16 } from "react/jsx-runtime";
var progressStyleInjected = false;
var Progress = forwardRef5(
  ({ value = 0, variant = "default", size = "md", showValue, color, className, ...props }, ref) => {
    useEffect33(() => {
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
    const sizes = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4"
    };
    const barBase = "h-full rounded-full transition-all duration-500 ease-out";
    const barStyles = {
      default: color || "#8b5cf6",
      gradient: "",
      striped: color || "#8b5cf6",
      glow: color || "#8b5cf6"
    };
    const barCss = {
      width: `${clamped}%`
    };
    if (variant === "gradient") {
      const c = color || "#8b5cf6";
      const h = c.replace("#", "");
      const r = parseInt(h.substring(0, 2), 16);
      const g = parseInt(h.substring(2, 4), 16);
      const b = parseInt(h.substring(4, 6), 16);
      const c2 = `rgb(${Math.max(0, r - 80)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 40)})`;
      const c3 = `rgb(${Math.max(0, r - 130)}, ${Math.min(255, g + 100)}, ${Math.min(255, b + 80)})`;
      barCss.background = `linear-gradient(90deg, ${c}, ${c2}, ${c3})`;
    } else if (variant === "striped") {
      barCss.backgroundColor = barStyles.striped;
      barCss.backgroundImage = "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)";
      barCss.backgroundSize = "1rem 1rem";
      barCss.animation = "uixy-progress-stripes 0.6s linear infinite";
    } else if (variant === "glow") {
      barCss.backgroundColor = barStyles.glow;
      barCss.boxShadow = `0 0 8px ${color || "#8b5cf6"}80, 0 0 20px ${color || "#8b5cf6"}40`;
    } else {
      barCss.backgroundColor = barStyles.default;
    }
    return /* @__PURE__ */ jsxs16("div", { ref, className: cn("relative w-full", className), ...props, children: [
      /* @__PURE__ */ jsx39("div", { className: cn("w-full rounded-full bg-zinc-800 overflow-hidden", sizes[size]), children: /* @__PURE__ */ jsx39("div", { className: barBase, style: barCss }) }),
      showValue && size === "lg" && /* @__PURE__ */ jsxs16("span", { className: "absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-white", children: [
        Math.round(clamped),
        "%"
      ] }),
      showValue && size !== "lg" && /* @__PURE__ */ jsxs16("span", { className: "text-[10px] text-zinc-400 mt-1 block text-right", children: [
        Math.round(clamped),
        "%"
      ] })
    ] });
  }
);
Progress.displayName = "Progress";

// src/components/Other/Avatar.tsx
import { forwardRef as forwardRef6, useState as useState11 } from "react";
import { jsx as jsx40, jsxs as jsxs17 } from "react/jsx-runtime";
var Avatar = forwardRef6(
  ({ src, alt, fallback, size = 40, shape = "circle", status, ring, ringColor, className, ...props }, ref) => {
    const [imgError, setImgError] = useState11(false);
    const statusColors = {
      online: "bg-emerald-500",
      offline: "bg-zinc-500",
      busy: "bg-red-500",
      away: "bg-amber-500"
    };
    const showFallback = !src || imgError;
    const dotSize = Math.max(10, Math.round(size * 0.28));
    const borderW = Math.max(2, Math.round(size * 0.06));
    const angle = 45 * (Math.PI / 180);
    const radius = size / 2;
    const dotX = radius + radius * Math.cos(angle) - dotSize / 2;
    const dotY = radius + radius * Math.sin(angle) - dotSize / 2;
    return /* @__PURE__ */ jsxs17(
      "div",
      {
        ref,
        className: cn("relative inline-flex shrink-0", className),
        style: { width: size, height: size },
        ...props,
        children: [
          /* @__PURE__ */ jsx40(
            "div",
            {
              className: cn(
                "flex items-center justify-center bg-zinc-800 overflow-hidden",
                shape === "circle" ? "rounded-full" : "rounded-lg",
                ring && "ring-2 ring-offset-2 ring-offset-zinc-950"
              ),
              style: {
                width: size,
                height: size,
                ...ring ? { "--tw-ring-color": ringColor || "#8b5cf6" } : {}
              },
              children: !showFallback ? /* @__PURE__ */ jsx40(
                "img",
                {
                  src,
                  alt: alt || "",
                  onError: () => setImgError(true),
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsx40("span", { className: "font-medium text-zinc-300 select-none", style: { fontSize: size * 0.38 }, children: fallback || "?" })
            }
          ),
          status && /* @__PURE__ */ jsx40(
            "span",
            {
              className: cn("absolute rounded-full", statusColors[status]),
              style: {
                width: dotSize,
                height: dotSize,
                left: shape === "circle" ? dotX : void 0,
                top: shape === "circle" ? dotY : void 0,
                bottom: shape !== "circle" ? -dotSize / 4 : void 0,
                right: shape !== "circle" ? -dotSize / 4 : void 0,
                border: `${borderW}px solid #09090b`,
                zIndex: 1
              }
            }
          )
        ]
      }
    );
  }
);
Avatar.displayName = "Avatar";

// src/components/Other/Marquee.tsx
import { useEffect as useEffect34 } from "react";
import { jsx as jsx41 } from "react/jsx-runtime";
var marqueeStyleInjected = false;
var Marquee = ({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  fade = true,
  repeat = 4,
  className
}) => {
  useEffect34(() => {
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
  return /* @__PURE__ */ jsx41(
    "div",
    {
      className: cn("overflow-hidden relative", className),
      style: fade ? {
        maskImage: `linear-gradient(${fadeDir}, transparent 0%, black 10%, black 90%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(${fadeDir}, transparent 0%, black 10%, black 90%, transparent 100%)`
      } : void 0,
      children: /* @__PURE__ */ jsx41(
        "div",
        {
          className: cn(
            isVertical ? "flex flex-col" : "flex",
            pauseOnHover && "hover:[animation-play-state:paused]"
          ),
          style: {
            animation: `${animName} ${speed}s linear infinite`,
            animationDirection: animDir
          },
          children: Array.from({ length: repeat }, (_, i) => /* @__PURE__ */ jsx41("div", { className: cn(isVertical ? "flex flex-col" : "flex", "shrink-0"), children }, i))
        }
      )
    }
  );
};
Marquee.displayName = "Marquee";
export {
  AuroraBackground,
  Avatar,
  Badge,
  BeamsBackground,
  BlurText,
  BokehBackground,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CounterText,
  DotPatternBackground,
  FlowFieldBackground,
  GeometricBackground,
  GlitchText,
  GradientMeshBackground,
  GradientText,
  GridBackground,
  HighlightText,
  Input,
  Label,
  Marquee,
  MatrixRainBackground,
  MediaText,
  MeteorBackground,
  NoiseBackground,
  OTPInput,
  ParticleBackground,
  PasswordInput,
  PixelBackground,
  Progress,
  RetroGridBackground,
  RippleBackground,
  SearchInput,
  Separator,
  ShimmerText,
  Skeleton,
  SparklesText,
  StarfieldBackground,
  Toggle,
  Tooltip,
  TypewriterText,
  WaveBackground,
  WaveText,
  cn
};
//# sourceMappingURL=index.mjs.map