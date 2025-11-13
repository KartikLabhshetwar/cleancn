import * as fs from "fs";
import * as path from "path";

interface MigrationRule {
  name: string;
  pattern: RegExp;
  replacement: string | ((match: string, ...groups: string[]) => string);
}

const migrationRules: MigrationRule[] = [
  {
    name: "Basic Button with bg-blue",
    pattern: /<button\s+className="([^"]*bg-blue-\d+[^"]*)"\s*>/g,
    replacement: '<Button>',
  },
  {
    name: "Outlined Button with border",
    pattern: /<button\s+className="([^"]*border\s+border-[^"]+[^"]*)"\s*>/g,
    replacement: '<Button variant="outline">',
  },
  {
    name: "Ghost Button with hover:bg",
    pattern: /<button\s+className="([^"]*hover:bg-[^"]+[^"]*)"\s*>/g,
    replacement: '<Button variant="ghost">',
  },
  {
    name: "Input with border classes",
    pattern: /<input\s+type="([^"]*)"\s+className="([^"]*border[^"]*)"\s+placeholder="([^"]*)"\s*\/>/g,
    replacement: (match, type, classes, placeholder) => {
      return `<Input type="${type}" placeholder="${placeholder}" />`;
    },
  },
  {
    name: "Basic Card with border rounded",
    pattern: /<div\s+className="([^"]*border\s+rounded[^"]*)"\s*>/g,
    replacement: '<Card>',
  },
];

function applyMigrations(content: string): { content: string; changes: string[] } {
  let result = content;
  const changes: string[] = [];

  for (const rule of migrationRules) {
    const matches = content.match(rule.pattern);
    if (matches) {
      if (typeof rule.replacement === "function") {
        result = result.replace(rule.pattern, rule.replacement as any);
      } else {
        result = result.replace(rule.pattern, rule.replacement);
      }
      changes.push(`${rule.name}: ${matches.length} replacement(s)`);
    }
  }

  return { content: result, changes };
}

function addImportsIfNeeded(content: string, changes: string[]): string {
  const needsButton = changes.some((c) => c.includes("Button"));
  const needsInput = changes.some((c) => c.includes("Input"));
  const needsCard = changes.some((c) => c.includes("Card"));

  const imports: string[] = [];
  if (needsButton) imports.push("Button");
  if (needsInput) imports.push("Input");
  if (needsCard) imports.push("Card");

  if (imports.length === 0) return content;

  const importStatement = `import { ${imports.join(", ")} } from "@/components/ui/button";\n`;

  if (content.includes("import")) {
    return content.replace(/^(import.*\n)/m, `$1${importStatement}`);
  } else {
    return importStatement + content;
  }
}

function migrateFile(filePath: string, dryRun: boolean = true): void {
  const content = fs.readFileSync(filePath, "utf-8");
  const { content: migratedContent, changes } = applyMigrations(content);

  if (changes.length === 0) {
    console.log(`✓ ${filePath}: No changes needed`);
    return;
  }

  const finalContent = addImportsIfNeeded(migratedContent, changes);

  console.log(`\n📝 ${filePath}:`);
  changes.forEach((change) => console.log(`  - ${change}`));

  if (!dryRun) {
    fs.writeFileSync(filePath, finalContent, "utf-8");
    console.log(`  ✅ File updated`);
  } else {
    console.log(`  ℹ️  Dry run - no files modified`);
  }
}

function migrateDirectory(dirPath: string, dryRun: boolean = true): void {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !file.startsWith(".") && file !== "node_modules") {
      migrateDirectory(fullPath, dryRun);
    } else if (file.endsWith(".tsx") || file.endsWith(".jsx")) {
      try {
        migrateFile(fullPath, dryRun);
      } catch (error) {
        console.error(`❌ Error processing ${fullPath}:`, error);
      }
    }
  }
}

const args = process.argv.slice(2);
const dryRun = !args.includes("--write");
const targetPath = args.find((arg) => !arg.startsWith("--")) || "./app";

console.log("🚀 Cleancn Migration Script\n");
console.log(`Mode: ${dryRun ? "Dry Run" : "Write"}`);
console.log(`Target: ${targetPath}\n`);

if (fs.statSync(targetPath).isDirectory()) {
  migrateDirectory(targetPath, dryRun);
} else {
  migrateFile(targetPath, dryRun);
}

console.log("\n✨ Migration complete!");
if (dryRun) {
  console.log("\nTo apply changes, run with --write flag:");
  console.log(`  node scripts/migrate-example.ts ${targetPath} --write`);
}

