"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Nav, NavBrand, NavList, NavItem, NavLink } from "@/components/ui/nav";
import { useTheme } from "@/lib/theme-provider";
import { defaultTheme } from "@/lib/tokens";
import { themePresets } from "@/lib/theme-presets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BeforeAfterPage() {
  const { theme, setTheme } = useTheme();
  const [showSplit, setShowSplit] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState<string>("neobrutalism");

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = themePresets.find((p) => p.id === presetId);
    if (preset) {
      setTheme(preset.theme);
    }
  };

  const handleReset = () => {
    setTheme(defaultTheme);
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
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Before & After Comparison</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              See how different themes transform the same components
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Select value={selectedPreset} onValueChange={handlePresetChange}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                {themePresets.map((preset) => (
                  <SelectItem key={preset.id} value={preset.id}>
                    {preset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleReset} variant="outline">
              Reset to Default
            </Button>
            <Button onClick={() => setShowSplit(!showSplit)} variant="outline">
              {showSplit ? "Hide Split" : "Show Split"}
            </Button>
          </div>

          <div className="rounded-lg border border-border bg-card p-8">
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-semibold">Current Theme: {theme.name}</h2>
                <p className="text-muted-foreground">
                  {themePresets.find((p) => p.id === selectedPreset)?.description || "Default theme"}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sample Card</CardTitle>
                    <CardDescription>
                      This is how cards look with the current theme
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input placeholder="john@example.com" type="email" />
                    </div>
                    <div className="flex gap-2">
                      <Button>Submit</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Button Variants</CardTitle>
                    <CardDescription>Different button styles</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Button className="w-full">Primary Button</Button>
                      <Button variant="secondary" className="w-full">
                        Secondary Button
                      </Button>
                      <Button variant="outline" className="w-full">
                        Outline Button
                      </Button>
                      <Button variant="ghost" className="w-full">
                        Ghost Button
                      </Button>
                      <Button variant="destructive" className="w-full">
                        Destructive Button
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Typography Showcase</CardTitle>
                  <CardDescription>How text scales with the theme</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h1 className="text-[var(--font-size-h1)] font-bold">
                    Heading 1 - Large Display
                  </h1>
                  <h2 className="text-[var(--font-size-h2)] font-bold">
                    Heading 2 - Section Title
                  </h2>
                  <h3 className="text-[var(--font-size-h3)] font-semibold">
                    Heading 3 - Subsection
                  </h3>
                  <p className="text-base">
                    This is regular body text that shows how paragraphs will look with the
                    selected theme. The spacing, size, and color all adapt to the theme tokens.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This is smaller, muted text often used for descriptions and secondary information.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

