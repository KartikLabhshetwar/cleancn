"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Hero, HeroTitle, HeroSubtitle, HeroActions } from "@/components/ui/hero";
import { Nav, NavBrand, NavList, NavItem, NavLink } from "@/components/ui/nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { PromptInput } from "@/components/prompt-input";
import { themePresets } from "@/lib/theme-presets";
import { useTheme } from "@/lib/theme-provider";
import { Copy, Check, Sparkles, Palette, Zap, Code, AlertCircle, Info, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isGlassmorphism = theme.name === "glassmorphism";

  const handleTryTheme = (presetId: string) => {
    const preset = themePresets.find((p) => p.id === presetId);
    if (preset) {
      setTheme(preset.theme);
      toast.success(`${preset.name} theme applied!`);
    }
  };

  const handleCopyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div 
      className="min-h-screen bg-background relative"
      style={isGlassmorphism ? {
        background: "linear-gradient(135deg, oklch(0.95 0.05 30) 0%, oklch(0.92 0.08 40) 50%, oklch(0.90 0.10 50) 100%)",
      } : undefined}
    >
      <Nav>
        <NavBrand href="/">Cleancn</NavBrand>
        <NavList>
          <NavItem>
            <NavLink href="#themes">Themes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#components">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#prompts">Prompts</NavLink>
          </NavItem>
        </NavList>
      </Nav>

      <Hero>
        <HeroTitle className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Change Your Ugly AI Generated Site to Good and Beautiful Site in Just One Prompt Using Cleancn</HeroTitle>
        <HeroSubtitle>
          AI-powered theme engine that instantly restyles your website. Choose from 18 professional design presets or create your own with natural language. Works seamlessly with Cursor AI, Claude, and other AI coding assistants.
        </HeroSubtitle>
        <HeroActions>
          <Button size="lg" onClick={() => document.getElementById("themes")?.scrollIntoView({ behavior: "smooth" })}>
            Explore Themes
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById("prompts")?.scrollIntoView({ behavior: "smooth" })}>
            Try Prompts
          </Button>
        </HeroActions>
      </Hero>

      <section id="prompts" className="bg-muted/50 px-6 py-24">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold">Generate Themes from Prompts</h2>
            <p className="text-lg text-muted-foreground">
              Describe your design vision in plain English or use our detailed prompts with AI assistants
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <PromptInput />
            <ThemeSwitcher />
          </div>
        </div>
      </section>

      <section id="themes" className="px-6 py-24">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold">18 Professional Design Presets</h2>
            <p className="text-lg text-muted-foreground">
              Each preset includes detailed prompts optimized for AI coding assistants
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
                  <div className="rounded-md bg-muted p-4 max-h-32 overflow-hidden relative">
                    <code className="text-xs text-foreground line-clamp-6">
                      {preset.prompt.substring(0, 200)}...
                    </code>
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-muted to-transparent" />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyPrompt(preset.prompt, preset.id)}
                    >
                      {copiedId === preset.id ? (
                        <Check className="mr-2 h-4 w-4" />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" />
                      )}
                      {copiedId === preset.id ? "Copied!" : "Copy Prompt"}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleTryTheme(preset.id)}
                      className="flex-1"
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
        </div>
      </section>

      <section id="components" className="bg-muted/50 px-6 py-24">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold">Component Showcase</h2>
            <p className="text-lg text-muted-foreground">
              See how all components adapt to your selected theme in real-time
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Multiple variants and sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Inputs</CardTitle>
                <CardDescription>Input fields and textareas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Enter your name" />
                <Input placeholder="Email address" type="email" />
                <Textarea placeholder="Your message here..." rows={3} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges & Tags</CardTitle>
                <CardDescription>Status indicators and labels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>New</Badge>
                  <Badge variant="secondary">Featured</Badge>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alerts & Notifications</CardTitle>
                <CardDescription>Important messages and feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is an informational alert message.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Something went wrong. Please try again.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avatars</CardTitle>
                <CardDescription>User profile images and initials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>CD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>LG</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>XL</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Switches & Toggles</CardTitle>
                <CardDescription>On/off controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Enable notifications</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Dark mode</label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Auto-save</label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sliders</CardTitle>
                <CardDescription>Range and value selection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Volume</label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brightness</label>
                  <Slider defaultValue={[75]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Range</label>
                  <Slider defaultValue={[25, 75]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Checkboxes</CardTitle>
                <CardDescription>Multiple selection options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" defaultChecked />
                  <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Accept terms and conditions
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <label htmlFor="newsletter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Subscribe to newsletter
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="marketing" defaultChecked />
                  <label htmlFor="marketing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Receive marketing emails
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Radio Groups</CardTitle>
                <CardDescription>Single selection options</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <label htmlFor="option-one" className="text-sm font-medium leading-none cursor-pointer">
                      Option One
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <label htmlFor="option-two" className="text-sm font-medium leading-none cursor-pointer">
                      Option Two
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-three" id="option-three" />
                    <label htmlFor="option-three" className="text-sm font-medium leading-none cursor-pointer">
                      Option Three
                    </label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Dropdown</CardTitle>
                <CardDescription>Single selection from list</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option-1">Option 1</SelectItem>
                    <SelectItem value="option-2">Option 2</SelectItem>
                    <SelectItem value="option-3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tooltips</CardTitle>
                <CardDescription>Hover for additional information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Or me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Another tooltip with more text</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeleton Loaders</CardTitle>
                <CardDescription>Loading state placeholders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Text hierarchy and styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <h1 className="text-4xl font-bold">Heading 1</h1>
                <h2 className="text-3xl font-bold">Heading 2</h2>
                <h3 className="text-2xl font-bold">Heading 3</h3>
                <p className="text-base">
                  This is body text. The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-sm text-muted-foreground">
                  This is muted text for secondary information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nested Cards</CardTitle>
                <CardDescription>Cards within cards</CardDescription>
              </CardHeader>
              <CardContent>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Nested Card</CardTitle>
                    <CardDescription>This card is nested inside another card</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      All UI elements use the same design tokens for a cohesive look.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center">
            <h2 className="mb-4 text-4xl font-bold">How to Use with AI Assistants</h2>
            <p className="text-lg text-muted-foreground">
              Copy detailed prompts and use them with Cursor AI, Claude, or any AI coding assistant
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Code className="h-6 w-6" />
                </div>
                <CardTitle>Copy Prompt</CardTitle>
                <CardDescription>
                  Click "Copy Prompt" on any theme preset to get the complete styling instructions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="h-6 w-6" />
                </div>
                <CardTitle>Paste in AI Assistant</CardTitle>
                <CardDescription>
                  Open Cursor AI, Claude, or any AI coding assistant and paste the prompt
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle>Apply Theme</CardTitle>
                <CardDescription>
                  The AI will understand the complete design system and apply it to your components
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>Prompt Keywords</CardTitle>
              <CardDescription>
                Combine these keywords to create custom themes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h3 className="mb-2 font-semibold">Spacing</h3>
                  <p className="text-sm text-muted-foreground">
                    airy, breathing, spacious, generous, compact, dense, tight
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Shape</h3>
                  <p className="text-sm text-muted-foreground">
                    round, rounded, pill, soft, curved, sharp, angular, crisp
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Borders</h3>
                  <p className="text-sm text-muted-foreground">
                    chunky, brutal, thick, bold borders, thin, hairline, delicate
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Shadows</h3>
                  <p className="text-sm text-muted-foreground">
                    offset, poster, drop shadow, flat, glow, luminous
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Effects</h3>
                  <p className="text-sm text-muted-foreground">
                    glass, frosted, translucent, clay, soft 3d, neon, cyberpunk
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Style</h3>
                  <p className="text-sm text-muted-foreground">
                    muted, calm, vibrant, colorful, monochrome, bold, striking
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-muted/50 px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Design?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Start with a preset or create your own unique theme with natural language
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => document.getElementById("themes")?.scrollIntoView({ behavior: "smooth" })}>
              Browse Themes
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById("prompts")?.scrollIntoView({ behavior: "smooth" })}>
              Try Prompts
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
