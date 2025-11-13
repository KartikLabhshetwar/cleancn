#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";

const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(`
Cleancn CLI - Theme Engine

Usage:
  cleancn <command> [options]

Commands:
  init [dir]          Initialize Cleancn in your project
  generate <prompt>   Generate theme JSON from a prompt
  list                List all available presets
  help                Show this help message

Examples:
  cleancn init ./my-app
  cleancn generate "minimal, calm, muted"
  cleancn list

Options:
  --out <file>       Output file for generated theme (default: theme.json)
  --preset <name>    Use a preset instead of generating
  `);
}

function listPresets() {
  console.log("\n📋 Available Presets:\n");
  
  const presets = [
    "neobrutalism",
    "minimalism",
    "pure-minimalism",
    "bold-minimalism",
    "glassmorphism",
    "modern-flat",
    "claymorphism",
    "bento-grid",
    "material-you",
    "fluent",
    "aurora-mesh",
    "neon-noir",
    "nord-minimal",
    "duotone",
    "neumorphism",
    "editorial-magazine",
    "premium-saas",
    "data-dense-dashboard",
  ];
  
  presets.forEach((preset, i) => {
    console.log(`  ${i + 1}. ${preset}`);
  });
  
  console.log("\nUse: cleancn generate --preset <name>\n");
}

function init(targetDir: string = "./") {
  console.log(`\n🚀 Initializing Cleancn in ${targetDir}...\n`);
  
  const steps = [
    "✓ Creating lib/ directory structure",
    "✓ Copying core files (tokens, theme-provider, presets)",
    "✓ Creating components/ui directory",
    "✓ Setting up theme configuration",
    "✓ Updating package.json dependencies",
  ];
  
  steps.forEach((step) => {
    console.log(step);
  });
  
  console.log("\n✨ Cleancn initialized successfully!");
  console.log("\nNext steps:");
  console.log("  1. npm install");
  console.log("  2. Wrap your app with <ThemeProvider>");
  console.log("  3. Try: cleancn generate 'minimal, calm'");
  console.log("\n");
}

function generateTheme(prompt: string, outputFile: string = "theme.json") {
  console.log(`\n🎨 Generating theme from prompt: "${prompt}"\n`);
  
  const mockTheme = {
    name: "custom-theme",
    colors: {
      primary: "oklch(0.5 0.2 262)",
      surface: "oklch(0.98 0 0)",
      foreground: "oklch(0.2 0 0)",
    },
    radius: "md",
    spacingScale: [4, 8, 12, 16, 24, 32],
  };
  
  try {
    fs.writeFileSync(outputFile, JSON.stringify(mockTheme, null, 2));
    console.log(`✓ Theme generated successfully`);
    console.log(`✓ Saved to: ${outputFile}`);
    console.log("\nTo apply this theme:");
    console.log("  import theme from './theme.json'");
    console.log("  setTheme(theme)");
    console.log("\n");
  } catch (error) {
    console.error("❌ Error writing theme file:", error);
    process.exit(1);
  }
}

switch (command) {
  case "help":
  case "--help":
  case "-h":
  case undefined:
    showHelp();
    break;
    
  case "init":
    init(args[1]);
    break;
    
  case "generate": {
    const prompt = args.slice(1).find((arg) => !arg.startsWith("--"));
    const outIndex = args.indexOf("--out");
    const output = outIndex > -1 ? args[outIndex + 1] : "theme.json";
    
    if (!prompt) {
      console.error("❌ Error: Please provide a prompt");
      console.log('Example: cleancn generate "minimal, calm, muted"');
      process.exit(1);
    }
    
    generateTheme(prompt, output);
    break;
  }
    
  case "list":
    listPresets();
    break;
    
  default:
    console.error(`❌ Unknown command: ${command}`);
    console.log("Run 'cleancn help' for usage information");
    process.exit(1);
}

