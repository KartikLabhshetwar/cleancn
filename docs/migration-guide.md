# Migration Guide

## Overview

This guide helps you integrate Cleancn themes into your existing Next.js + Tailwind CSS project.

## Prerequisites

- Next.js 14+ (App Router)
- Tailwind CSS 4+
- TypeScript

## Installation Steps

### 1. Install Dependencies

```bash
npm install class-variance-authority clsx tailwind-merge sonner
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-select
npm install lucide-react
```

### 2. Copy Core Files

Copy these files from the Cleancn repository to your project:

```
lib/
  ├── tokens.ts
  ├── theme-provider.tsx
  ├── theme-presets.ts
  ├── prompt-mapper.ts
  └── utils.ts

components/ui/
  ├── button.tsx
  ├── input.tsx
  ├── textarea.tsx
  ├── card.tsx
  ├── select.tsx
  ├── modal.tsx
  ├── toast.tsx
  ├── nav.tsx
  ├── hero.tsx
  └── footer.tsx
```

### 3. Update Your Layout

Wrap your app with the `ThemeProvider`:

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 4. Update globals.css

Ensure your `globals.css` includes theme variable mappings:

```css
@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  /* ... other color mappings */
  --radius-lg: var(--radius);
}

:root {
  --radius: 0.5rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... other theme variables */
}
```

## Using Themes

### Apply a Preset Theme

```tsx
"use client";

import { useTheme } from "@/lib/theme-provider";
import { themePresets } from "@/lib/theme-presets";

export function MyComponent() {
  const { setTheme } = useTheme();

  const applyNeobrutalism = () => {
    const preset = themePresets.find((p) => p.id === "neobrutalism");
    if (preset) {
      setTheme(preset.theme);
    }
  };

  return <button onClick={applyNeobrutalism}>Apply Neobrutalism</button>;
}
```

### Generate Theme from Prompt

```tsx
"use client";

import { useTheme } from "@/lib/theme-provider";
import { parsePrompt } from "@/lib/prompt-mapper";

export function PromptThemeGenerator() {
  const { setTheme } = useTheme();

  const generateTheme = (prompt: string) => {
    const theme = parsePrompt(prompt);
    setTheme(theme);
  };

  return (
    <button onClick={() => generateTheme("minimal, calm, muted")}>
      Apply Custom Theme
    </button>
  );
}
```

## Migration Strategies

### Strategy 1: Gradual Migration

Replace components one at a time, starting with the most visible:

1. **Hero sections** - High visibility, immediate impact
2. **CTAs and buttons** - Users notice these first
3. **Forms** - Input, textarea, select components
4. **Cards and containers** - Layout components
5. **Navigation** - After testing other components

### Strategy 2: Parallel Implementation

Run old and new themes side-by-side:

1. Create a feature flag for theme switching
2. Implement new components with `_v2` suffix
3. A/B test with users
4. Gradually migrate traffic to new theme
5. Remove old components once validated

### Strategy 3: Full Replacement

For new projects or complete redesigns:

1. Install all Cleancn components
2. Replace all existing UI components
3. Test thoroughly in staging
4. Deploy with a single release

## Component Replacement Guide

### Buttons

**Before:**
```tsx
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>
```

**After:**
```tsx
<Button>Click me</Button>
<Button variant="outline">Outlined</Button>
<Button variant="ghost">Ghost</Button>
```

### Inputs

**Before:**
```tsx
<input
  type="text"
  className="border border-gray-300 rounded px-3 py-2"
  placeholder="Enter text"
/>
```

**After:**
```tsx
<Input placeholder="Enter text" />
```

### Cards

**Before:**
```tsx
<div className="border rounded-lg p-6 shadow">
  <h3 className="text-lg font-bold">Title</h3>
  <p className="text-gray-600">Description</p>
</div>
```

**After:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

## Customization

### Extend a Preset

```tsx
import { themePresets } from "@/lib/theme-presets";
import { mergeThemes } from "@/lib/prompt-mapper";

const customTheme = mergeThemes(
  themePresets.find((p) => p.id === "minimalism")!.theme,
  {
    colors: {
      primary: "oklch(0.5 0.2 262)",
    },
    radius: "xl",
  }
);

setTheme(customTheme);
```

### Create Custom Preset

```tsx
import { ThemeConfig } from "@/lib/tokens";

const myCustomTheme: ThemeConfig = {
  name: "my-custom-theme",
  colors: {
    // Define your colors
  },
  radius: "md",
  spacingScale: [4, 8, 12, 16, 24, 32, 48, 64],
  // ... other config
};
```

## Performance Considerations

### CSS Variable Overhead

Theme switching via CSS variables is performant, but consider:

- **Initial load**: Variables are applied synchronously on mount
- **Switching**: Theme changes trigger style recalculation
- **Storage**: Themes are persisted to localStorage

### Optimization Tips

1. **Debounce theme changes** during rapid switching
2. **Memoize theme contexts** to prevent unnecessary rerenders
3. **Lazy load** theme presets if you have many
4. **Use SSR carefully** - themes load client-side to respect user preferences

### Glassmorphism & Effects

Glass effects (`backdrop-filter: blur`) can impact performance:

- Limit blur radius to ≤20px
- Reduce number of glass elements on mobile
- Use `prefers-reduced-motion` media query
- Consider fallback styles for low-end devices

## Accessibility

### Contrast Requirements

All Cleancn presets aim for WCAG AA compliance, but verify:

```tsx
// Check contrast ratios in your theme
import { ThemeConfig } from "@/lib/tokens";

// Use tools like Lighthouse or axe DevTools
// to audit your pages after applying themes
```

### Focus Indicators

All components include visible focus states:

```css
focus-visible:ring-[3px] focus-visible:ring-ring/50
```

Ensure these aren't overridden in your custom styles.

### Keyboard Navigation

Test all interactive elements with keyboard:

- Tab through all focusable elements
- Enter/Space to activate buttons
- Escape to close modals/dropdowns
- Arrow keys for select/radio groups

## Troubleshooting

### Theme Not Applying

1. **Check ThemeProvider** is wrapping your app
2. **Verify localStorage** isn't blocked
3. **Inspect CSS variables** in DevTools
4. **Clear cache** and hard reload

### Color Inconsistencies

1. **Check oklch support** in target browsers
2. **Use color space fallbacks** for older browsers
3. **Verify variable naming** matches Tailwind config

### TypeScript Errors

1. **Update @types** packages
2. **Check path aliases** in tsconfig.json
3. **Restart TypeScript server** in your IDE

## Example Migration Script

For bulk component replacement, use this helper:

```ts
// scripts/migrate-components.ts
import * as fs from "fs";
import * as path from "path";

function replaceButtonSyntax(content: string): string {
  // Replace basic button classes with Button component
  return content
    .replace(
      /<button className="([^"]*bg-blue[^"]*)"/g,
      '<Button'
    )
    .replace(
      /<button className="([^"]*border[^"]*)"/g,
      '<Button variant="outline"'
    );
}

// Usage: node scripts/migrate-components.ts
```

## Support

For issues or questions:

- GitHub Issues: https://github.com/yourusername/cleancn/issues
- Documentation: https://cleancn.dev/docs
- Examples: https://cleancn.dev/examples

## Next Steps

1. ✅ Install dependencies
2. ✅ Copy core files
3. ✅ Update layout with ThemeProvider
4. ✅ Test theme switching
5. ✅ Migrate first component
6. ✅ Run accessibility audit
7. ✅ Deploy to staging
8. ✅ Gather feedback
9. ✅ Complete migration

