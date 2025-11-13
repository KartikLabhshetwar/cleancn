"use client";

import { useState } from "react";
import { useTheme } from "@/lib/theme-provider";
import { themePresets } from "@/lib/theme-presets";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [selectedPreset, setSelectedPreset] = useState<string>("default");

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = themePresets.find((p) => p.id === presetId);
    if (preset) {
      setTheme(preset.theme);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Theme Switcher</CardTitle>
        <CardDescription>
          Select a design preset to see it applied instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Design Style</label>
          <Select value={selectedPreset} onValueChange={handlePresetChange}>
            <SelectTrigger>
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
        </div>
        <div className="text-sm text-muted-foreground">
          {themePresets.find((p) => p.id === selectedPreset)?.description}
        </div>
      </CardContent>
    </Card>
  );
}

