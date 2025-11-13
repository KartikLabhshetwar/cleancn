"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Nav, NavBrand, NavList, NavItem, NavLink } from "@/components/ui/nav";
import { themePresets } from "@/lib/theme-presets";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/lib/theme-provider";

export default function RecipesPage() {
  const { setTheme } = useTheme();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTryTheme = (presetId: string) => {
    const preset = themePresets.find((p) => p.id === presetId);
    if (preset) {
      setTheme(preset.theme);
      toast.success(`${preset.name} theme applied!`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav>
        <NavBrand href="/">Cleancn</NavBrand>
        <NavList>
          <NavItem>
            <NavLink href="/demo">Demo</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/demo/before-after">Before/After</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/recipes">Recipes</NavLink>
          </NavItem>
        </NavList>
      </Nav>

      <div className="px-6 py-12">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Prompt Recipes</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Copy these prompts or use them as inspiration for your own custom themes
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {themePresets.map((preset) => (
              <Card key={preset.id} className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle>{preset.name}</CardTitle>
                  <CardDescription>{preset.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <code className="text-sm text-foreground">{preset.prompt}</code>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleCopy(preset.prompt, preset.id)}
                    >
                      {copiedId === preset.id ? (
                        <Check className="mr-2 h-4 w-4" />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" />
                      )}
                      {copiedId === preset.id ? "Copied!" : "Copy"}
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleTryTheme(preset.id)}
                    >
                      Try Theme
                    </Button>
                  </div>

                  <div className="space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Radius:</span>
                      <span className="font-mono">{preset.theme.radius}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Border Weight:</span>
                      <span className="font-mono">{preset.theme.border.weight}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shadow:</span>
                      <span className="font-mono">
                        {preset.theme.shadow.strength === 0 ? "none" : "yes"}
                      </span>
                    </div>
                    {preset.theme.effects.glassAlpha > 0 && (
                      <div className="flex justify-between">
                        <span>Glass Effect:</span>
                        <span className="font-mono">
                          {Math.round(preset.theme.effects.glassAlpha * 100)}%
                        </span>
                      </div>
                    )}
                    {preset.theme.effects.glow > 0 && (
                      <div className="flex justify-between">
                        <span>Glow:</span>
                        <span className="font-mono">{preset.theme.effects.glow}px</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Tips for Creating Your Own Prompts</CardTitle>
              <CardDescription>
                Combine these keywords to create unique variations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">Spacing Keywords</h3>
                  <p className="text-sm text-muted-foreground">
                    airy, breathing, spacious, generous, compact, dense, tight
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Shape Keywords</h3>
                  <p className="text-sm text-muted-foreground">
                    round, rounded, pill, soft, curved, sharp, angular, crisp
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Border Keywords</h3>
                  <p className="text-sm text-muted-foreground">
                    chunky, brutal, thick, bold borders, thin, hairline, delicate
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Shadow Keywords</h3>
                  <p className="text-sm text-muted-foreground">
                    offset, poster, drop shadow, flat, glow, luminous
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Effect Keywords</h3>
                  <p className="text-sm text-muted-foreground">
                    glass, frosted, translucent, clay, soft 3d, neon, cyberpunk
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Style Keywords</h3>
                  <p className="text-sm text-muted-foreground">
                    muted, calm, vibrant, colorful, monochrome, bold, striking
                  </p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-background p-4">
                <h4 className="mb-2 font-semibold">Example Custom Prompts:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <code className="flex-1">"airy, round, glass, soft glow, vibrant"</code>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <code className="flex-1">"compact, sharp, neon, dark mode, high contrast"</code>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <code className="flex-1">"spacious, oversized text, monochrome, flat"</code>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <code className="flex-1">"brutal, chunky borders, offset shadows, bold"</code>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

