import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero, HeroTitle, HeroSubtitle, HeroActions } from "@/components/ui/hero";
import { Nav, NavBrand, NavList, NavItem, NavLink } from "@/components/ui/nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Palette, Zap } from "lucide-react";

export default function Home() {
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

      <Hero>
        <HeroTitle>Transform Your Site with a Single Prompt</HeroTitle>
        <HeroSubtitle>
          AI-powered theme engine that instantly restylesyour website. Choose from 18 professional design presets or create your own with natural language.
        </HeroSubtitle>
        <HeroActions>
          <Button size="lg" asChild>
            <Link href="/demo">Try Demo</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/recipes">View Recipes</Link>
          </Button>
        </HeroActions>
      </Hero>

      <section className="bg-muted/50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Sparkles className="mb-4 h-10 w-10 text-primary" />
                <CardTitle>Prompt-Powered Themes</CardTitle>
                <CardDescription>
                  Describe your design vision in plain English and watch it come to life instantly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No CSS knowledge required. Just type what you want: "minimal, calm, muted" or "neon, bold, cyberpunk"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Palette className="mb-4 h-10 w-10 text-primary" />
                <CardTitle>18 Professional Presets</CardTitle>
                <CardDescription>
                  Carefully crafted design styles from Neobrutalism to Glassmorphism
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Each preset is production-ready and follows modern design principles with accessibility in mind
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="mb-4 h-10 w-10 text-primary" />
                <CardTitle>Instant Application</CardTitle>
                <CardDescription>
                  See changes in real-time as you experiment with different styles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Live preview with before/after comparison. Export theme JSON for your projects
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Design?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Start with a preset or create your own unique theme
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/demo">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/recipes">Browse Recipes</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
