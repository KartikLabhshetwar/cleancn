import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => {
    const glassBlur = typeof window !== "undefined" 
      ? getComputedStyle(document.documentElement).getPropertyValue("--glass-blur")?.trim() || "0px"
      : "0px";
    const glassAlpha = typeof window !== "undefined"
      ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--glass-alpha")?.trim() || "0")
      : 0;
    
    const hasGlassEffect = glassAlpha > 0 && glassBlur !== "0px";
    const blurValue = hasGlassEffect ? glassBlur : undefined;
    
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-(--radius-lg) border-(length:--border-weight) border-border bg-card text-card-foreground",
          className
        )}
        style={{
          boxShadow: "var(--card-shadow, 0 1px 3px 0 rgb(0 0 0 / 0.1))",
          ...(blurValue && {
            backdropFilter: `blur(${blurValue}) saturate(180%)`,
            WebkitBackdropFilter: `blur(${blurValue}) saturate(180%)`,
          }),
          ...style,
        } as React.CSSProperties}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
