"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hero, HeroTitle, HeroSubtitle, HeroActions } from "@/components/ui/hero";
import { Nav, NavBrand, NavList, NavItem, NavLink } from "@/components/ui/nav";
import { Footer, FooterContent, FooterSection, FooterTitle, FooterLink } from "@/components/ui/footer";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { PromptInput } from "@/components/prompt-input";
import Link from "next/link";

export default function DemoPage() {
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
          Apply professional design styles instantly. Choose from 18 modern presets or describe your own unique style.
        </HeroSubtitle>
        <HeroActions>
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            View Documentation
          </Button>
        </HeroActions>
      </Hero>

      <section className="bg-background px-6 py-24">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="grid gap-8 md:grid-cols-2">
            <PromptInput />
            <ThemeSwitcher />
          </div>

          <div className="space-y-8">
            <h2 className="text-center text-3xl font-bold">Component Showcase</h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Card Component</CardTitle>
                  <CardDescription>
                    A flexible card component that adapts to your theme
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This card uses theme tokens for colors, spacing, and border radius.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Input Fields</CardTitle>
                  <CardDescription>Form elements with theme styling</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Enter your name" />
                  <Input placeholder="Email address" type="email" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Multiple variants and sizes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Button>Primary</Button>
                    <Button variant="outline">Outline</Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      Secondary
                    </Button>
                    <Button variant="ghost" size="sm">
                      Ghost
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer>
        <FooterContent>
          <div className="grid gap-8 md:grid-cols-4">
            <FooterSection>
              <FooterTitle>Product</FooterTitle>
              <div className="space-y-2">
                <FooterLink href="/demo">Demo</FooterLink>
                <FooterLink href="/recipes">Recipes</FooterLink>
                <FooterLink href="/docs">Documentation</FooterLink>
              </div>
            </FooterSection>

            <FooterSection>
              <FooterTitle>Resources</FooterTitle>
              <div className="space-y-2">
                <FooterLink href="/guides">Guides</FooterLink>
                <FooterLink href="/examples">Examples</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
              </div>
            </FooterSection>

            <FooterSection>
              <FooterTitle>Company</FooterTitle>
              <div className="space-y-2">
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
                <FooterLink href="/careers">Careers</FooterLink>
              </div>
            </FooterSection>

            <FooterSection>
              <FooterTitle>Legal</FooterTitle>
              <div className="space-y-2">
                <FooterLink href="/privacy">Privacy</FooterLink>
                <FooterLink href="/terms">Terms</FooterLink>
                <FooterLink href="/license">License</FooterLink>
              </div>
            </FooterSection>
          </div>
        </FooterContent>
      </Footer>
    </div>
  );
}

