import * as React from "react";
import { cn } from "@/lib/utils";

const Hero = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        "flex min-h-[60vh] flex-col items-center justify-center gap-8 bg-background px-6 py-24 text-center",
        className
      )}
      {...props}
    />
  )
);
Hero.displayName = "Hero";

const HeroTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "text-[var(--font-size-h1)] font-bold leading-tight tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
HeroTitle.displayName = "HeroTitle";

const HeroSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "max-w-2xl text-lg text-muted-foreground",
      className
    )}
    {...props}
  />
));
HeroSubtitle.displayName = "HeroSubtitle";

const HeroActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-wrap items-center justify-center gap-4", className)}
    {...props}
  />
));
HeroActions.displayName = "HeroActions";

export { Hero, HeroTitle, HeroSubtitle, HeroActions };

