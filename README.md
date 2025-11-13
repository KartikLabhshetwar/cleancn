# Cleancn - Theme Engine

Transform your website with a single prompt. Apply professional design styles instantly with AI-powered theme generation.

## Features

- 🎨 **18 Professional Presets** - From Neobrutalism to Glassmorphism
- ✨ **Prompt-Powered Themes** - Describe your vision in natural language
- ⚡ **Instant Application** - See changes in real-time
- ♿ **Accessibility First** - WCAG AA compliant color contrast
- 🎯 **Performance Optimized** - Smart caps on intensive effects
- 🔧 **Fully Customizable** - Extend presets or create from scratch

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the homepage.

## Usage

### Try the Demo

Visit `/demo` to:
- Test theme presets
- Generate themes from prompts
- See before/after comparisons
- Copy preset prompts

### Apply a Theme

```tsx
"use client";

import { useTheme } from "@/lib/theme-provider";
import { themePresets } from "@/lib/theme-presets";

export function MyComponent() {
  const { setTheme } = useTheme();

  const applyTheme = () => {
    const preset = themePresets.find((p) => p.id === "neobrutalism");
    if (preset) setTheme(preset.theme);
  };

  return <button onClick={applyTheme}>Apply Neobrutalism</button>;
}
```

### Generate from Prompt

```tsx
import { parsePrompt } from "@/lib/prompt-mapper";
import { useTheme } from "@/lib/theme-provider";

const { setTheme } = useTheme();
const theme = parsePrompt("minimal, calm, muted, lots of whitespace");
setTheme(theme);
```

## Available Presets

1. **Neobrutalism** - Bold, raw design with chunky borders
2. **Minimalism** - Clean and calm with whitespace
3. **Pure Minimalism** - Extreme simplicity, monochrome
4. **Bold Minimalism** - Oversized typography, high contrast
5. **Glassmorphism** - Frosted glass with soft glow
6. **Modern Flat** - Clean flat design, crisp edges
7. **Claymorphism** - Soft 3D clay-like elements
8. **Bento Grid** - Modular card layout
9. **Material You** - Dynamic tonal palettes
10. **Fluent Design** - Microsoft's acrylic surfaces
11. **Aurora Mesh** - Soft gradient mesh backgrounds
12. **Neon Noir** - Dark cyberpunk with neon accents
13. **Nord Minimal** - Cool desaturated palette
14. **Duotone** - Two-color system, bold contrast
15. **Neumorphism** - Soft raised cards (use cautiously)
16. **Editorial Magazine** - Magazine-style layout
17. **Premium SaaS** - Professional SaaS aesthetic
18. **Data-Dense Dashboard** - Compact, information-dense

## Prompt Keywords

Combine these keywords to create custom themes:

- **Spacing**: airy, breathing, spacious, compact, dense
- **Shape**: round, pill, soft, sharp, angular
- **Borders**: chunky, brutal, thin, hairline
- **Shadows**: offset, poster, flat, glow
- **Effects**: glass, frosted, clay, neon
- **Style**: muted, vibrant, monochrome, bold

## Project Structure

```
cleancn/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── demo/                    # Demo pages
│   │   ├── page.tsx            # Theme playground
│   │   └── before-after/       # Comparison view
│   ├── recipes/                 # Prompt recipes
│   └── api/                     # Theme generation API
├── components/
│   ├── ui/                      # UI components
│   ├── theme-switcher.tsx      # Theme selector
│   └── prompt-input.tsx        # Prompt interface
├── lib/
│   ├── tokens.ts               # Theme types & defaults
│   ├── theme-provider.tsx      # React context
│   ├── theme-presets.ts        # 18 style presets
│   ├── prompt-mapper.ts        # Prompt parser
│   ├── a11y-checks.ts          # Accessibility utilities
│   └── codemod-helpers.ts      # Migration tools
├── scripts/
│   └── migrate-example.ts      # Codemod script
└── docs/
    └── migration-guide.md      # Migration docs
```

## Migration

See [Migration Guide](./docs/migration-guide.md) for detailed instructions.

Quick migration:

```bash
# Dry run (no changes)
node scripts/migrate-example.ts ./app

# Apply changes
node scripts/migrate-example.ts ./app --write
```

## Accessibility

All presets aim for WCAG AA compliance. Check your theme:

```tsx
import { checkThemeAccessibility } from "@/lib/a11y-checks";

const result = checkThemeAccessibility(myTheme);
console.log(result.passed); // true/false
console.log(result.errors); // List of errors
```

## Performance

Themes with glass/glow effects are capped at safe defaults:

- Glass blur: max 20px
- Glow: max 20px
- Shadow blur: max 40px

Override with caution and test on target devices.

## API

### POST /api/generate-theme

Generate theme from prompt:

```bash
curl -X POST http://localhost:3000/api/generate-theme \
  -H "Content-Type: application/json" \
  -d '{"prompt": "minimal, calm, muted"}'
```

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add your preset/feature
4. Test accessibility (contrast ratios)
5. Submit a pull request

## License

MIT License - see [LICENSE](./LICENSE) for details

## Support

- 📖 Documentation: Check `/recipes` for examples
- 🐛 Issues: Open a GitHub issue
- 💬 Discussions: GitHub Discussions
