import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import getContrastColor from "@/utils/getContrastColor"

// A 1px press-down nudge used by the flat variants on `:active`. Deliberately
// left OUT of the shared base classes (and instead appended per-variant
// below) so the "game" variant — which has its own much bigger press
// animation via .game-btn in index.css — doesn't end up fighting this
// utility for control of `transform` on `:active`.
const FLAT_PRESS = "active:not-aria-[haspopup]:translate-y-px";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: `bg-primary text-primary-foreground hover:bg-primary/80 ${FLAT_PRESS}`,
        outline: `border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 ${FLAT_PRESS}`,
        secondary: `bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground ${FLAT_PRESS}`,
        ghost: `hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 ${FLAT_PRESS}`,
        destructive: `bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40 ${FLAT_PRESS}`,
        link: `text-primary underline-offset-4 hover:underline ${FLAT_PRESS}`,
        // The site's "pressable 3D" look (see .game-btn in index.css) — a
        // glossy, chunky button with real depth on hover/press, plus a
        // diagonal shine sweep on hover, matching the 3D card/cube
        // aesthetic used everywhere else (Skills, HeroBubbles, project/
        // social icon cubes). .game-btn's gloss/shadow layers are
        // translucent black/white overlays, so the button itself reads
        // correctly over any background color in either theme. Text falls
        // back to the theme-aware `--foreground` token (light/dark
        // correct on its own) when no `color` prop is given below — pass
        // `color` (the button's own background, usually the live accent)
        // to get a properly contrast-computed text color instead.
        game: "game-btn rounded-full font-bold text-foreground border-0 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
        // Comfortable pill padding matching the site's existing game-btn
        // CTAs (Learn More, Send Email, All Projects, ...).
        game: "h-auto gap-1.5 px-6 py-2.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(function Button(
  {
    className,
    variant = "default",
    size = "default",
    asChild = false,
    color,
    style,
    ...props
  },
  ref
) {
  const Comp = asChild ? Slot.Root : "button"

  // `color` is the button's own background (usually the live accent color)
  // — passing it here (instead of hand-writing `style={{backgroundColor}}`
  // at every call site) also gets you a text color computed for contrast
  // against it, so light accent colors don't silently get invisible white
  // text and dark ones don't get invisible black text. Caller-provided
  // `style` still wins over both if it sets the same properties.
  const mergedStyle = color
    ? { backgroundColor: color, color: getContrastColor(color), ...style }
    : style;

  return (
    <Comp
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      style={mergedStyle}
      {...props} />
  );
});

export { Button, buttonVariants }
