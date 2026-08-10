import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-[13px] font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:bg-deep hover:shadow-lift",
        outline:
          "border border-border bg-card text-charcoal hover:-translate-y-0.5 hover:border-sage hover:bg-surface",
        light:
          "bg-pale text-deep hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--pale)_80%,var(--sage))]",
        onDark: "bg-pale text-deep hover:-translate-y-0.5 hover:bg-deep-foreground",
        ghostDark:
          "border border-sage/40 text-deep-foreground hover:-translate-y-0.5 hover:border-sage hover:bg-white/5",
        quiet: "text-vital underline-offset-4 hover:text-deep hover:underline",
      },
      size: {
        md: "min-h-11 px-5 text-[0.9375rem]",
        lg: "min-h-[52px] px-7 text-base",
        sm: "min-h-10 px-4 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonStyles>;

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & Variants) {
  return <button className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
