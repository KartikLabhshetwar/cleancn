export interface ComponentMapping {
  old: string;
  new: string;
  importPath: string;
}

export const componentMappings: ComponentMapping[] = [
  {
    old: "button",
    new: "Button",
    importPath: "@/components/ui/button",
  },
  {
    old: "input[type='text']",
    new: "Input",
    importPath: "@/components/ui/input",
  },
  {
    old: "input[type='email']",
    new: "Input",
    importPath: "@/components/ui/input",
  },
  {
    old: "textarea",
    new: "Textarea",
    importPath: "@/components/ui/textarea",
  },
  {
    old: "select",
    new: "Select",
    importPath: "@/components/ui/select",
  },
];

export const classNameMappings: Record<string, string> = {
  "bg-blue-500": "bg-primary",
  "bg-blue-600": "bg-primary",
  "bg-gray-100": "bg-muted",
  "bg-gray-200": "bg-muted",
  "text-gray-600": "text-muted-foreground",
  "text-gray-700": "text-muted-foreground",
  "text-gray-900": "text-foreground",
  "border-gray-300": "border-border",
  "border-gray-400": "border-border",
  "rounded-md": "rounded-[var(--radius)]",
  "rounded-lg": "rounded-[var(--radius-lg)]",
};

export function extractClassName(element: string): string | null {
  const match = element.match(/className="([^"]*)"/);
  return match ? match[1] : null;
}

export function shouldReplaceElement(element: string, mapping: ComponentMapping): boolean {
  const tag = element.match(/<(\w+)/)?.[1];
  if (!tag) return false;

  if (mapping.old.includes("[")) {
    const [baseTag, condition] = mapping.old.split("[");
    return tag === baseTag && element.includes(condition.replace("]", ""));
  }

  return tag === mapping.old;
}

export function generateImportStatement(components: string[], importPath: string): string {
  const uniqueComponents = [...new Set(components)];
  return `import { ${uniqueComponents.join(", ")} } from "${importPath}";`;
}

export function replaceClassNames(className: string): string {
  let result = className;
  
  for (const [oldClass, newClass] of Object.entries(classNameMappings)) {
    result = result.replace(new RegExp(oldClass, "g"), newClass);
  }
  
  return result;
}

export function detectButtonVariant(className: string): string | null {
  if (className.includes("border")) return "outline";
  if (className.includes("bg-transparent") || className.includes("hover:bg-")) return "ghost";
  if (className.includes("bg-gray") || className.includes("bg-secondary")) return "secondary";
  if (className.includes("bg-red") || className.includes("bg-destructive")) return "destructive";
  if (className.includes("text-") && className.includes("underline")) return "link";
  return null;
}

export function detectButtonSize(className: string): string | null {
  if (className.includes("text-xs") || className.includes("py-1")) return "sm";
  if (className.includes("text-lg") || className.includes("py-3")) return "lg";
  return null;
}

export function buildButtonProps(className: string): string {
  const variant = detectButtonVariant(className);
  const size = detectButtonSize(className);
  
  const props: string[] = [];
  if (variant) props.push(`variant="${variant}"`);
  if (size) props.push(`size="${size}"`);
  
  return props.length > 0 ? ` ${props.join(" ")}` : "";
}

export function extractProps(element: string): Record<string, string> {
  const props: Record<string, string> = {};
  
  const attrPattern = /(\w+)="([^"]*)"/g;
  let match;
  
  while ((match = attrPattern.exec(element)) !== null) {
    props[match[1]] = match[2];
  }
  
  return props;
}

export function preserveImportantProps(props: Record<string, string>): string[] {
  const important = ["id", "name", "placeholder", "value", "type", "disabled", "required"];
  
  return important
    .filter((key) => props[key])
    .map((key) => `${key}="${props[key]}"`);
}

