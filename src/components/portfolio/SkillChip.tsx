// Brand-colored pill chips for Skills & Tools, inspired by the reference design.
// Uses Simple Icons CDN for crisp, on-brand SVG logos.

const ICON_MAP: Record<string, { slug: string; color: string; label?: string }> = {
  // Languages
  "C": { slug: "c", color: "A8B9CC" },
  "C++": { slug: "cplusplus", color: "00599C", label: "C++" },
  "Python": { slug: "python", color: "3776AB" },
  "JavaScript": { slug: "javascript", color: "F7DF1E" },
  "TypeScript": { slug: "typescript", color: "3178C6" },
  "SQL": { slug: "mysql", color: "4479A1" },
  "HTML": { slug: "html5", color: "E34F26" },
  "CSS": { slug: "css3", color: "1572B6" },
  // Frameworks / libs
  "React": { slug: "react", color: "61DAFB" },
  "TanStack": { slug: "reactquery", color: "FF4154" },
  "Tailwind": { slug: "tailwindcss", color: "06B6D4" },
  "Tailwind CSS": { slug: "tailwindcss", color: "06B6D4" },
  "Node.js": { slug: "nodedotjs", color: "5FA04E" },
  "Canvas": { slug: "html5", color: "E34F26" },
  "HTML/CSS": { slug: "html5", color: "E34F26" },
  // Databases
  "PostgreSQL": { slug: "postgresql", color: "4169E1" },
  // Tools
  "Git": { slug: "git", color: "F05032" },
  "GitHub": { slug: "github", color: "FFFFFF" },
  "Figma": { slug: "figma", color: "F24E1E" },
  "Canva": { slug: "canva", color: "00C4CC" },
  "VS Code": { slug: "vscodium", color: "2F80ED" },
};

export function SkillChip({ name }: { name: string }) {
  const meta = ICON_MAP[name];
  const iconUrl = meta
    ? `https://cdn.simpleicons.org/${meta.slug}/${meta.color}`
    : null;

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-medium text-zinc-900 shadow-sm ring-1 ring-black/5 dark:bg-white dark:text-zinc-900">
      {iconUrl ? (
        <img
          src={iconUrl}
          alt=""
          aria-hidden="true"
          className="h-4 w-4"
          loading="lazy"
        />
      ) : (
        <span className="h-4 w-4 rounded-sm bg-zinc-300" />
      )}
      <span>{meta?.label ?? name}</span>
    </span>
  );
}
