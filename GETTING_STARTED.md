# Getting Started with Cleancn

Welcome to Cleancn! This guide will get you up and running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- Basic knowledge of Next.js and React

## Installation

```bash
# Clone or navigate to the project
cd cleancn

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Your First Theme

### Option 1: Try a Preset (Easiest)

Visit [http://localhost:3000/demo](http://localhost:3000/demo) and:

1. Select a preset from the dropdown (try "Neobrutalism")
2. Watch the page transform instantly
3. Explore other presets to see different styles

### Option 2: Use a Prompt

1. Visit [http://localhost:3000/demo](http://localhost:3000/demo)
2. In the prompt input, type: `"minimal, calm, muted, lots of whitespace"`
3. Click "Generate & Apply Theme"
4. See your custom theme applied!

### Option 3: Use in Your Code

```tsx
"use client";

import { useTheme } from "@/lib/theme-provider";
import { themePresets } from "@/lib/theme-presets";

export function MyComponent() {
  const { setTheme } = useTheme();

  const handleApplyTheme = () => {
    // Apply a preset
    const brutal = themePresets.find(p => p.id === "neobrutalism");
    if (brutal) setTheme(brutal.theme);
  };

  return (
    <button onClick={handleApplyTheme}>
      Make it Brutal! 💥
    </button>
  );
}
```

## 📚 Quick Tour

### 1. Homepage (`/`)
Your landing page with feature showcase. Great starting point to understand what Cleancn offers.

### 2. Demo Page (`/demo`)
Interactive playground where you can:
- Try all 18 presets
- Generate themes from prompts
- See live component examples
- Copy preset prompts

### 3. Before/After (`/demo/before-after`)
Compare how different themes transform the same components side-by-side.

### 4. Recipes (`/recipes`)
Browse all 18 preset prompts with:
- Detailed descriptions
- Token specifications
- Copy & Try buttons
- Keyword combinations guide

## 🎨 Understanding Themes

A theme in Cleancn consists of:

```typescript
{
  name: "my-theme",
  colors: { primary, surface, foreground, ... },
  radius: "sm" | "md" | "lg" | "xl",
  spacingScale: [4, 8, 12, 16, 24, 32, ...],
  typeScale: { base, h1, h2, h3, ... },
  border: { weight, style, contrast },
  shadow: { strength, blur, xOffset, yOffset },
  effects: { glassAlpha, glassBlur, glow, saturation },
  layout: { cardDensity, gridStyle, gapScale }
}
```

## 🔧 Customizing a Preset

Want to tweak a preset? Easy:

```tsx
import { themePresets } from "@/lib/theme-presets";
import { mergeThemes } from "@/lib/prompt-mapper";

const myTheme = mergeThemes(
  themePresets.find(p => p.id === "minimalism")!.theme,
  {
    colors: {
      primary: "oklch(0.6 0.25 262)", // Purple primary
    },
    radius: "xl", // More rounded
  }
);

setTheme(myTheme);
```

## 🎯 Prompt Tips

Combine keywords to create unique themes:

**Good Prompts:**
- ✅ `"airy, round, glass, soft glow, vibrant"`
- ✅ `"compact, sharp, neon, dark mode"`
- ✅ `"spacious, oversized text, monochrome, flat"`

**Not-So-Good:**
- ❌ `"blue"`  (too vague)
- ❌ `"nice looking"` (not specific)
- ❌ `"like Apple"` (brand names don't map well)

**Keyword Categories:**

| Category | Keywords |
|----------|----------|
| **Spacing** | airy, breathing, spacious, compact, dense, tight |
| **Shape** | round, pill, soft, sharp, angular, crisp |
| **Borders** | chunky, brutal, thick, thin, hairline |
| **Shadows** | offset, poster, flat, glow, luminous |
| **Effects** | glass, frosted, clay, neon, noir |
| **Style** | muted, vibrant, monochrome, bold, striking |

## 🧪 Try These Examples

```tsx
// Glassmorphic card design
parsePrompt("glass, frosted, round, soft glow, airy");

// Cyberpunk aesthetic
parsePrompt("neon, noir, glow, sharp, high contrast");

// Premium SaaS look
parsePrompt("subtle, clean, muted, professional");

// Magazine editorial
parsePrompt("spacious, oversized text, minimal, elegant");
```

## 🎓 Learn More

- **Recipes Page**: See all 18 presets with prompts
- **Migration Guide**: `docs/migration-guide.md`
- **Full Documentation**: `README.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`

## 🚀 Deploy Your Theme

Once you've created your perfect theme:

1. **Export it**:
```tsx
const myTheme = parsePrompt("your prompt here");
console.log(JSON.stringify(myTheme, null, 2));
// Copy this JSON
```

2. **Save it**:
```tsx
// lib/my-custom-theme.ts
export const myCustomTheme = { /* paste JSON */ };
```

3. **Use it**:
```tsx
import { myCustomTheme } from "@/lib/my-custom-theme";
setTheme(myCustomTheme);
```

## ❓ Common Questions

### How do I persist my theme across page reloads?
The `ThemeProvider` automatically saves to localStorage. It persists automatically!

### Can I use this in production?
Yes! All presets are production-ready and accessibility-tested.

### What if my theme has poor contrast?
Use the accessibility checker:
```tsx
import { checkThemeAccessibility } from "@/lib/a11y-checks";
const result = checkThemeAccessibility(myTheme);
```

### Can I create my own presets?
Absolutely! See `lib/theme-presets.ts` for examples. Add your preset to the array.

### Does this work with dark mode?
Yes! The `globals.css` includes dark mode variants. Themes adapt automatically.

## 🎉 You're Ready!

Start exploring:
1. Visit `/demo` and try different presets
2. Experiment with prompt keywords
3. Check the recipes page for inspiration
4. Build something amazing!

Need help? Check the full documentation in `README.md` or explore the code - it's well-commented!

Happy theming! 🎨

