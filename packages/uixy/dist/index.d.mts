import React from 'react';
import { ClassValue } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "gradient" | "glow" | "soft";
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
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    inputSize?: "sm" | "md" | "lg";
    error?: boolean;
    /** Custom class for the wrapper */
    wrapperClassName?: string;
}
declare const PasswordInput: React.ForwardRefExoticComponent<PasswordInputProps & React.RefAttributes<HTMLInputElement>>;

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    inputSize?: "sm" | "md" | "lg";
    /** Callback when clear button is clicked */
    onClear?: () => void;
    /** Custom class for the wrapper */
    wrapperClassName?: string;
}
declare const SearchInput: React.ForwardRefExoticComponent<SearchInputProps & React.RefAttributes<HTMLInputElement>>;

interface OTPInputProps {
    /** Number of OTP digits */
    length?: number;
    /** Callback with the full OTP string */
    onComplete?: (otp: string) => void;
    /** Callback on value change */
    onChange?: (otp: string) => void;
    /** Size of each digit box */
    inputSize?: "sm" | "md" | "lg";
    /** Show error state */
    error?: boolean;
    /** Disable all inputs */
    disabled?: boolean;
    /** Custom class for each digit input */
    className?: string;
    /** Custom class for the wrapper */
    wrapperClassName?: string;
    /** Separator between groups (e.g. show dash after 3rd digit for 6-digit OTP) */
    separatorAfter?: number[];
}
declare const OTPInput: React.FC<OTPInputProps>;

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    size?: "sm" | "md" | "lg";
    required?: boolean;
}
declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;

interface TypewriterTextProps {
    /** Array of strings to type through */
    words: string[];
    /** Typing speed in ms per character */
    typeSpeed?: number;
    /** Deleting speed in ms per character */
    deleteSpeed?: number;
    /** Pause before deleting in ms */
    pauseDuration?: number;
    /** Loop the animation */
    loop?: boolean;
    /** Show blinking cursor */
    cursor?: boolean;
    /** Cursor character */
    cursorChar?: string;
    /** Custom class for the text */
    className?: string;
    /** Custom class for the cursor */
    cursorClassName?: string;
    /** HTML tag to render */
    as?: React.ElementType;
}
declare const TypewriterText: React.FC<TypewriterTextProps>;

interface GradientTextProps {
    children: React.ReactNode;
    /** Animate the gradient */
    animate?: boolean;
    /** Animation speed in seconds */
    speed?: number;
    /** Gradient colors — Tailwind from/via/to classes or custom style */
    colors?: string;
    /** HTML tag */
    as?: React.ElementType;
    className?: string;
}
declare const GradientText: React.FC<GradientTextProps>;

interface GlitchTextProps {
    children: string;
    /** Animation speed in seconds */
    speed?: number;
    /** Glitch intensity (1-10) */
    intensity?: number;
    /** HTML tag */
    as?: React.ElementType;
    className?: string;
}
declare const GlitchText: React.FC<GlitchTextProps>;

interface ShimmerTextProps {
    children: React.ReactNode;
    /** Animation speed in seconds */
    speed?: number;
    /** Shimmer color */
    shimmerColor?: string;
    /** Base text color */
    baseColor?: string;
    /** HTML tag */
    as?: React.ElementType;
    className?: string;
}
declare const ShimmerText: React.FC<ShimmerTextProps>;

interface WaveTextProps {
    children: string;
    /** Delay between each letter in ms */
    delay?: number;
    /** Animation duration in seconds */
    duration?: number;
    /** Wave height in px */
    height?: number;
    /** HTML tag */
    as?: React.ElementType;
    className?: string;
}
declare const WaveText: React.FC<WaveTextProps>;

interface BlurTextProps {
    children: string;
    /** Animate per word or per letter */
    mode?: "word" | "letter";
    /** Delay between each unit in ms */
    delay?: number;
    /** Animation duration in ms */
    duration?: number;
    /** Trigger on scroll into view */
    triggerOnView?: boolean;
    /** HTML tag */
    as?: React.ElementType;
    className?: string;
}
declare const BlurText: React.FC<BlurTextProps>;

interface CounterTextProps {
    /** Target number to count to */
    target: number;
    /** Starting number */
    from?: number;
    /** Duration of animation in ms */
    duration?: number;
    /** Decimal places */
    decimals?: number;
    /** Prefix (e.g. "$") */
    prefix?: string;
    /** Suffix (e.g. "%", "+") */
    suffix?: string;
    /** Separator for thousands */
    separator?: string;
    /** Trigger on scroll into view */
    triggerOnView?: boolean;
    /** HTML tag */
    as?: React.ElementType;
    className?: string;
}
declare const CounterText: React.FC<CounterTextProps>;

interface MediaTextProps {
    /** Text content */
    children: string;
    /** Image URL to fill the text */
    src?: string;
    /** Video URL to fill the text */
    videoSrc?: string;
    /** Background size for image mode */
    backgroundSize?: string;
    /** Background position for image mode */
    backgroundPosition?: string;
    /** Whether video should loop */
    loop?: boolean;
    /** Whether video should be muted */
    muted?: boolean;
    /** HTML tag for text */
    as?: React.ElementType;
    className?: string;
}
declare const MediaText: React.FC<MediaTextProps>;

interface SparklesTextProps {
    children: string;
    /** Color of sparkles */
    sparkleColor?: string;
    /** Number of sparkles visible at once */
    count?: number;
    /** Min size of sparkles in px */
    minSize?: number;
    /** Max size of sparkles in px */
    maxSize?: number;
    /** Speed — lower = faster new sparkles (ms) */
    speed?: number;
    /** HTML tag */
    as?: React.ElementType;
    className?: string;
}
declare const SparklesText: React.FC<SparklesTextProps>;

type HighlightVariant = "marker" | "underline" | "box" | "strikethrough" | "gradient" | "glow" | "bracket";
interface HighlightTextProps {
    children: string;
    /** Highlight style variant */
    variant?: HighlightVariant;
    /** Primary highlight color */
    color?: string;
    /** Second color (for gradient variant) */
    colorTo?: string;
    /** Animation duration in ms */
    duration?: number;
    /** Delay before animation starts in ms */
    delay?: number;
    /** Whether to trigger when scrolled into view */
    triggerOnView?: boolean;
    /** HTML tag */
    as?: React.ElementType;
    className?: string;
}
declare const HighlightText: React.FC<HighlightTextProps>;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "bordered" | "elevated" | "ghost" | "gradient" | "glass" | "spotlight" | "neon" | "tilt" | "animated-border" | "noise" | "lifted";
    /** Accent color for spotlight/neon/animated-border variants (hex) */
    color?: string;
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const CardHeader: React.ForwardRefExoticComponent<CardHeaderProps & React.RefAttributes<HTMLDivElement>>;
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
}
declare const CardTitle: React.ForwardRefExoticComponent<CardTitleProps & React.RefAttributes<HTMLHeadingElement>>;
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
}
declare const CardDescription: React.ForwardRefExoticComponent<CardDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const CardContent: React.ForwardRefExoticComponent<CardContentProps & React.RefAttributes<HTMLDivElement>>;
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const CardFooter: React.ForwardRefExoticComponent<CardFooterProps & React.RefAttributes<HTMLDivElement>>;

interface ParticleNode {
    /** Text label, emoji, or image URL */
    content: string;
    /** Type of content */
    type?: "text" | "emoji" | "image";
}
interface ParticleBackgroundProps {
    /** Array of items to display as floating particles */
    items: (string | ParticleNode)[];
    /** Max number of particles (auto-limited by screen size) */
    count?: number;
    /** Connection line distance threshold in px */
    connectionDistance?: number;
    /** Show arrowheads on connection lines */
    arrows?: boolean;
    /** Mouse interaction distance */
    mouseDistance?: number;
    /** Base color for text/lines as [r, g, b] */
    color?: [number, number, number];
    /** Particle movement speed multiplier */
    speed?: number;
    /** Base font size range [min, max] in px */
    fontSize?: [number, number];
    /** Image size in px (for image type nodes) */
    imageSize?: number;
    /** Line width */
    lineWidth?: number;
    /** Max particle opacity */
    maxOpacity?: number;
    /** CSS class for the canvas wrapper */
    className?: string;
}
declare const ParticleBackground: React.FC<ParticleBackgroundProps>;

interface AuroraBackgroundProps {
    /** Colors as CSS color strings */
    colors?: string[];
    /** Animation speed multiplier */
    speed?: number;
    /** Blur intensity in px */
    blur?: number;
    /** Opacity of the aurora layer (0-1) */
    opacity?: number;
    className?: string;
}
declare const AuroraBackground: React.FC<AuroraBackgroundProps>;

interface GridBackgroundProps {
    /** Grid variant */
    variant?: "grid" | "dots" | "cross";
    /** Grid cell size in px */
    size?: number;
    /** Grid line/dot color */
    color?: string;
    /** Grid line/dot opacity */
    opacity?: number;
    /** Animated radial mask that follows the mouse */
    followMouse?: boolean;
    /** Radial mask radius in px */
    maskRadius?: number;
    className?: string;
}
declare const GridBackground: React.FC<GridBackgroundProps>;

interface StarfieldBackgroundProps {
    /** Number of stars */
    count?: number;
    /** Star speed multiplier */
    speed?: number;
    /** Star color */
    color?: [number, number, number];
    /** Max star size */
    maxSize?: number;
    /** Enable warp speed effect */
    warp?: boolean;
    className?: string;
}
declare const StarfieldBackground: React.FC<StarfieldBackgroundProps>;

interface WaveBackgroundProps {
    /** Wave colors from top to bottom */
    colors?: string[];
    /** Number of wave layers */
    layers?: number;
    /** Animation speed multiplier */
    speed?: number;
    /** Wave amplitude in px */
    amplitude?: number;
    /** Wave frequency */
    frequency?: number;
    className?: string;
}
declare const WaveBackground: React.FC<WaveBackgroundProps>;

interface GradientMeshBackgroundProps {
    /** Array of 4 color stops */
    colors?: string[];
    /** Animation speed multiplier */
    speed?: number;
    /** Mesh intensity / contrast */
    intensity?: number;
    className?: string;
}
declare const GradientMeshBackground: React.FC<GradientMeshBackgroundProps>;

interface MatrixRainBackgroundProps {
    /** Characters to use */
    charset?: string;
    /** Column width in px */
    columnWidth?: number;
    /** Fall speed multiplier */
    speed?: number;
    /** Text color */
    color?: string;
    /** Font size in px */
    fontSize?: number;
    className?: string;
}
declare const MatrixRainBackground: React.FC<MatrixRainBackgroundProps>;

type BokehShape = "circle" | "hexagon" | "diamond" | "triangle" | "star" | "ring" | "mixed";
interface BokehBackgroundProps {
    /** Number of bokeh shapes */
    count?: number;
    /** Base colors */
    colors?: string[];
    /** Shape of bokeh elements */
    shape?: BokehShape;
    /** Animation speed multiplier */
    speed?: number;
    /** Min/max size in px */
    sizeRange?: [number, number];
    className?: string;
}
declare const BokehBackground: React.FC<BokehBackgroundProps>;

type PixelVariant = "rain" | "life" | "terrain" | "noise";
interface PixelBackgroundProps {
    /** Pixel art style */
    variant?: PixelVariant;
    /** Pixel size in px */
    pixelSize?: number;
    /** Base colors */
    colors?: string[];
    /** Animation speed multiplier */
    speed?: number;
    /** Pixel opacity */
    opacity?: number;
    className?: string;
}
declare const PixelBackground: React.FC<PixelBackgroundProps>;

interface RippleBackgroundProps {
    /** Number of ripple rings */
    count?: number;
    /** Base color */
    color?: string;
    /** Animation duration per ring in seconds */
    duration?: number;
    className?: string;
}
declare const RippleBackground: React.FC<RippleBackgroundProps>;

interface DotPatternBackgroundProps {
    /** Spacing between dots */
    spacing?: number;
    /** Dot radius */
    radius?: number;
    /** Dot color */
    color?: string;
    /** Enable glow animation — dots pulse randomly */
    glow?: boolean;
    /** Glow color (defaults to color) */
    glowColor?: string;
    /** Mouse proximity — dots grow near cursor */
    mouseReactive?: boolean;
    /** Mouse influence radius */
    mouseRadius?: number;
    className?: string;
}
declare const DotPatternBackground: React.FC<DotPatternBackgroundProps>;

interface RetroGridBackgroundProps {
    /** Grid cell size in px */
    cellSize?: number;
    /** Line color */
    lineColor?: string;
    /** Scroll speed multiplier */
    speed?: number;
    /** Show horizon glow */
    glow?: boolean;
    /** Number of vertical lines */
    verticalLines?: number;
    /** Number of horizontal lines */
    horizontalLines?: number;
    className?: string;
}
declare const RetroGridBackground: React.FC<RetroGridBackgroundProps>;

interface MeteorBackgroundProps {
    /** Number of meteors */
    count?: number;
    /** Meteor angle in degrees (215 = top-right to bottom-left) */
    angle?: number;
    /** Meteor color */
    color?: string;
    /** Tail length in px */
    tailLength?: number;
    /** Speed multiplier */
    speed?: number;
    className?: string;
}
declare const MeteorBackground: React.FC<MeteorBackgroundProps>;

interface BeamsBackgroundProps {
    /** Number of beams */
    count?: number;
    /** Beam colors */
    colors?: string[];
    /** Animation speed multiplier */
    speed?: number;
    /** Beam max opacity */
    opacity?: number;
    /** Beam width in px */
    beamWidth?: number;
    className?: string;
}
declare const BeamsBackground: React.FC<BeamsBackgroundProps>;

type NoiseVariant = "perlin" | "clouds" | "marble" | "electric";
interface NoiseBackgroundProps {
    variant?: NoiseVariant;
    colors?: string[];
    speed?: number;
    scale?: number;
    opacity?: number;
    className?: string;
}
declare const NoiseBackground: React.FC<NoiseBackgroundProps>;

type GeometricVariant = "triangles" | "hexgrid" | "voronoi" | "circles";
interface GeometricBackgroundProps {
    variant?: GeometricVariant;
    colors?: string[];
    speed?: number;
    cellSize?: number;
    opacity?: number;
    className?: string;
}
declare const GeometricBackground: React.FC<GeometricBackgroundProps>;

type FlowVariant = "wind" | "magnetic" | "curl" | "spiral";
interface FlowFieldBackgroundProps {
    variant?: FlowVariant;
    colors?: string[];
    speed?: number;
    particleCount?: number;
    trailLength?: number;
    opacity?: number;
    className?: string;
}
declare const FlowFieldBackground: React.FC<FlowFieldBackgroundProps>;

type BadgeVariant = "default" | "secondary" | "outline" | "success" | "warning" | "destructive" | "glow" | "gradient" | "glass" | "neon" | "shimmer" | "soft" | "info" | "premium" | "new" | "beta";
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
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
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;

type TooltipVariant = "default" | "dark" | "light" | "gradient" | "glass" | "outlined" | "neon" | "success" | "warning" | "error";
interface TooltipProps {
    content: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    variant?: TooltipVariant;
    delay?: number;
    arrow?: boolean;
    /** Accent color for gradient/neon variants (hex) */
    color?: string;
    children: React.ReactNode;
    className?: string;
}
declare const Tooltip: React.FC<TooltipProps>;

type ToggleVariant = "default" | "ios" | "material" | "outline" | "glow" | "pill" | "slim" | "labeled";
interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    size?: "sm" | "md" | "lg";
    variant?: ToggleVariant;
    color?: string;
    label?: string;
}
declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLInputElement>>;

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Orientation */
    orientation?: "horizontal" | "vertical";
    /** Visual style */
    variant?: "default" | "dashed" | "dotted" | "gradient";
    /** Label in the middle */
    label?: string;
}
declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Shape variant */
    variant?: "rectangle" | "circle" | "text";
    /** Width (CSS value) */
    width?: string | number;
    /** Height (CSS value) */
    height?: string | number;
    /** Animation style */
    animation?: "pulse" | "shimmer" | "none";
}
declare const Skeleton: React.FC<SkeletonProps>;

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
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
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: number;
    shape?: "circle" | "square";
    status?: "online" | "offline" | "busy" | "away";
    ring?: boolean;
    ringColor?: string;
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;

interface MarqueeProps {
    children: React.ReactNode;
    /** Speed in seconds for one full cycle */
    speed?: number;
    /** Direction */
    direction?: "left" | "right" | "up" | "down";
    /** Pause on hover */
    pauseOnHover?: boolean;
    /** Fade edges */
    fade?: boolean;
    /** Number of copies (higher = smoother for short content) */
    repeat?: number;
    className?: string;
}
declare const Marquee: React.FC<MarqueeProps>;

declare function cn(...inputs: ClassValue[]): string;

export { AuroraBackground, type AuroraBackgroundProps, Avatar, type AvatarProps, Badge, type BadgeProps, BeamsBackground, type BeamsBackgroundProps, BlurText, type BlurTextProps, BokehBackground, type BokehBackgroundProps, type BokehShape, Button, type ButtonProps, Card, CardContent, type CardContentProps, CardDescription, type CardDescriptionProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, type CardProps, CardTitle, type CardTitleProps, CounterText, type CounterTextProps, DotPatternBackground, type DotPatternBackgroundProps, FlowFieldBackground, type FlowFieldBackgroundProps, type FlowVariant, GeometricBackground, type GeometricBackgroundProps, type GeometricVariant, GlitchText, type GlitchTextProps, GradientMeshBackground, type GradientMeshBackgroundProps, GradientText, type GradientTextProps, GridBackground, type GridBackgroundProps, HighlightText, type HighlightTextProps, Input, type InputProps, Label, type LabelProps, Marquee, type MarqueeProps, MatrixRainBackground, type MatrixRainBackgroundProps, MediaText, type MediaTextProps, MeteorBackground, type MeteorBackgroundProps, NoiseBackground, type NoiseBackgroundProps, type NoiseVariant, OTPInput, type OTPInputProps, ParticleBackground, type ParticleBackgroundProps, type ParticleNode, PasswordInput, type PasswordInputProps, PixelBackground, type PixelBackgroundProps, type PixelVariant, Progress, type ProgressProps, RetroGridBackground, type RetroGridBackgroundProps, RippleBackground, type RippleBackgroundProps, SearchInput, type SearchInputProps, Separator, type SeparatorProps, ShimmerText, type ShimmerTextProps, Skeleton, type SkeletonProps, SparklesText, type SparklesTextProps, StarfieldBackground, type StarfieldBackgroundProps, Toggle, type ToggleProps, Tooltip, type TooltipProps, TypewriterText, type TypewriterTextProps, WaveBackground, type WaveBackgroundProps, WaveText, type WaveTextProps, cn };
