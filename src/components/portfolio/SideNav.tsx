import { SECTIONS, type SectionId } from "./data";
import { cn } from "@/lib/utils";

export function SideNav({ active }: { active: SectionId }) {
  return (
    <aside className="sticky top-12 hidden h-[calc(100vh-3rem)] w-56 shrink-0 border-r border-[var(--hairline)] py-10 pr-6 md:block">
      <p className="mb-4 px-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Sections
      </p>
      <nav className="flex flex-col">
        {SECTIONS.map((s, i) => {
          const isActive = s.id === active;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "group flex items-center justify-between rounded-md px-3 py-1.5 text-sm transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-block h-px transition-all",
                    isActive ? "w-6 bg-foreground" : "w-3 bg-[var(--hairline)] group-hover:w-5 group-hover:bg-muted-foreground",
                  )}
                />
                {s.label}
              </span>
              <span className="text-[10px] tabular-nums text-muted-foreground/70">
                {String(i + 1).padStart(2, "0")}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

export function MobileTabStrip({ active }: { active: SectionId }) {
  return (
    <div className="sticky top-12 z-30 flex gap-1 overflow-x-auto border-b border-[var(--hairline)] bg-background/90 px-3 py-2 backdrop-blur md:hidden">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={cn(
            "whitespace-nowrap rounded-md px-2.5 py-1 text-xs transition-colors",
            s.id === active ? "bg-muted text-foreground" : "text-muted-foreground",
          )}
        >
          {s.label}
        </a>
      ))}
    </div>
  );
}
