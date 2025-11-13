import { ThemeConfig } from "./tokens";

export interface ContrastResult {
  ratio: number;
  passes: {
    aa: boolean;
    aaa: boolean;
  };
  level: "fail" | "aa" | "aaa";
}

export interface A11yCheckResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  contrast: {
    bodyText: ContrastResult;
    largeText: ContrastResult;
  };
  performance: {
    blurIntensity: "low" | "medium" | "high";
    glowIntensity: "low" | "medium" | "high";
    warnings: string[];
  };
}

function parseOKLCH(color: string): { l: number; c: number; h: number } | null {
  const match = color.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)/);
  if (!match) return null;
  
  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
  };
}

function calculateLuminance(oklch: { l: number; c: number; h: number }): number {
  return oklch.l;
}

export function calculateContrastRatio(color1: string, color2: string): number {
  const c1 = parseOKLCH(color1);
  const c2 = parseOKLCH(color2);
  
  if (!c1 || !c2) {
    return 4.5;
  }
  
  const l1 = calculateLuminance(c1);
  const l2 = calculateLuminance(c2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

export function checkContrast(foreground: string, background: string): ContrastResult {
  const ratio = calculateContrastRatio(foreground, background);
  
  const passes = {
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
  };
  
  let level: "fail" | "aa" | "aaa" = "fail";
  if (passes.aaa) level = "aaa";
  else if (passes.aa) level = "aa";
  
  return { ratio, passes, level };
}

export function checkLargeTextContrast(foreground: string, background: string): ContrastResult {
  const ratio = calculateContrastRatio(foreground, background);
  
  const passes = {
    aa: ratio >= 3,
    aaa: ratio >= 4.5,
  };
  
  let level: "fail" | "aa" | "aaa" = "fail";
  if (passes.aaa) level = "aaa";
  else if (passes.aa) level = "aa";
  
  return { ratio, passes, level };
}

export function checkPerformance(theme: ThemeConfig): {
  blurIntensity: "low" | "medium" | "high";
  glowIntensity: "low" | "medium" | "high";
  warnings: string[];
} {
  const warnings: string[] = [];
  
  const blurValue = theme.effects.glassBlur;
  let blurIntensity: "low" | "medium" | "high" = "low";
  
  if (blurValue > 20) {
    blurIntensity = "high";
    warnings.push(`Glass blur (${blurValue}px) exceeds recommended maximum of 20px. May impact performance on low-end devices.`);
  } else if (blurValue > 12) {
    blurIntensity = "medium";
  }
  
  const glowValue = theme.effects.glow;
  let glowIntensity: "low" | "medium" | "high" = "low";
  
  if (glowValue > 20) {
    glowIntensity = "high";
    warnings.push(`Glow effect (${glowValue}px) exceeds recommended maximum of 20px. Consider reducing for better performance.`);
  } else if (glowValue > 12) {
    glowIntensity = "medium";
  }
  
  if (theme.shadow.blur > 40) {
    warnings.push(`Shadow blur (${theme.shadow.blur}px) is very high. Consider reducing for better performance.`);
  }
  
  if (theme.effects.glassAlpha > 0 && blurValue > 0) {
    warnings.push("Combining glass transparency with blur can be expensive. Test on target devices.");
  }
  
  return { blurIntensity, glowIntensity, warnings };
}

export function checkThemeAccessibility(theme: ThemeConfig): A11yCheckResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  const bodyTextContrast = checkContrast(
    theme.colors.foreground,
    theme.colors.surface
  );
  
  if (!bodyTextContrast.passes.aa) {
    errors.push(
      `Body text contrast ratio (${bodyTextContrast.ratio.toFixed(2)}:1) does not meet WCAG AA requirements (4.5:1). ` +
      `Adjust foreground or background colors.`
    );
  }
  
  const largeTextContrast = checkLargeTextContrast(
    theme.colors.foreground,
    theme.colors.surface
  );
  
  const primaryContrast = checkContrast(
    theme.colors.primaryForeground,
    theme.colors.primary
  );
  
  if (!primaryContrast.passes.aa) {
    errors.push(
      `Primary button contrast ratio (${primaryContrast.ratio.toFixed(2)}:1) does not meet WCAG AA requirements. ` +
      `Adjust primary or primary-foreground colors.`
    );
  }
  
  const mutedContrast = checkContrast(
    theme.colors.mutedForeground,
    theme.colors.surface
  );
  
  if (!mutedContrast.passes.aa) {
    warnings.push(
      `Muted text contrast ratio (${mutedContrast.ratio.toFixed(2)}:1) is below AA standards. ` +
      `Consider increasing contrast for secondary text.`
    );
  }
  
  if (theme.effects.glassAlpha > 0.7) {
    warnings.push(
      `High glass transparency (${Math.round(theme.effects.glassAlpha * 100)}%) may reduce text readability. ` +
      `Consider reducing transparency or ensuring sufficient contrast.`
    );
  }
  
  if (theme.border.weight < 0.5) {
    warnings.push(
      `Very thin borders (${theme.border.weight}px) may be difficult to see for users with low vision.`
    );
  }
  
  const performance = checkPerformance(theme);
  
  return {
    passed: errors.length === 0,
    errors,
    warnings: [...warnings, ...performance.warnings],
    contrast: {
      bodyText: bodyTextContrast,
      largeText: largeTextContrast,
    },
    performance,
  };
}

export function generateA11yReport(theme: ThemeConfig): string {
  const result = checkThemeAccessibility(theme);
  
  let report = `# Accessibility Report for "${theme.name}"\n\n`;
  
  report += `## Overall Status: ${result.passed ? "✅ PASSED" : "❌ FAILED"}\n\n`;
  
  report += `## Contrast Ratios\n\n`;
  report += `- **Body Text**: ${result.contrast.bodyText.ratio.toFixed(2)}:1 (${result.contrast.bodyText.level.toUpperCase()})\n`;
  report += `- **Large Text**: ${result.contrast.largeText.ratio.toFixed(2)}:1 (${result.contrast.largeText.level.toUpperCase()})\n\n`;
  
  if (result.errors.length > 0) {
    report += `## Errors (${result.errors.length})\n\n`;
    result.errors.forEach((error, i) => {
      report += `${i + 1}. ❌ ${error}\n`;
    });
    report += `\n`;
  }
  
  if (result.warnings.length > 0) {
    report += `## Warnings (${result.warnings.length})\n\n`;
    result.warnings.forEach((warning, i) => {
      report += `${i + 1}. ⚠️ ${warning}\n`;
    });
    report += `\n`;
  }
  
  report += `## Performance\n\n`;
  report += `- **Blur Intensity**: ${result.performance.blurIntensity.toUpperCase()}\n`;
  report += `- **Glow Intensity**: ${result.performance.glowIntensity.toUpperCase()}\n\n`;
  
  if (!result.passed) {
    report += `## Recommendations\n\n`;
    report += `1. Increase contrast between foreground and background colors\n`;
    report += `2. Test with color blindness simulators\n`;
    report += `3. Verify focus indicators are visible\n`;
    report += `4. Test keyboard navigation\n`;
  }
  
  return report;
}

export function capPerformanceIntensiveEffects(theme: ThemeConfig): ThemeConfig {
  return {
    ...theme,
    effects: {
      ...theme.effects,
      glassBlur: Math.min(theme.effects.glassBlur, 20),
      glow: Math.min(theme.effects.glow, 20),
    },
    shadow: {
      ...theme.shadow,
      blur: Math.min(theme.shadow.blur, 40),
    },
  };
}

