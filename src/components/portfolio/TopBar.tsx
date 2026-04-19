import { useEffect, useState } from "react";
import { Github, Linkedin, FileText, Search, Music, Pause, Sun, Moon } from "lucide-react";
import { PROFILE } from "./data";

interface Props {
  onOpenSearch: () => void;
  musicOn: boolean;
  onToggleMusic: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function TopBar({ onOpenSearch, musicOn, onToggleMusic, theme, onToggleTheme }: Props) {
  const now = useClock();
  const time = now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }) : "--:--:--";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--hairline)] bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between gap-4 px-6 text-sm lg:px-10">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-7">
          <a href="#intro" className="flex items-center gap-2 font-medium tracking-tight">
            <span className="text-muted-foreground">↗</span>
            <span>{PROFILE.handle}</span>
          </a>
          <nav className="hidden items-center gap-6 text-muted-foreground md:flex">
            <a href="#intro" className="text-foreground transition-colors">Home</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
              LinkedIn <span className="text-[10px]">↗</span>
            </a>
            <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
              Resume <span className="text-[10px]">↗</span>
            </a>
          </nav>
        </div>

        {/* Right: search, clock, icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="hidden items-center gap-3 rounded-md border border-[var(--hairline)] px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground sm:flex"
            aria-label="Search sections"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search sections...</span>
            <kbd className="rounded border border-[var(--hairline)] px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>

          <div className="hidden items-center gap-2 rounded-md border border-[var(--hairline)] px-2.5 py-1.5 text-xs text-muted-foreground sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_theme(colors.emerald.500)]" />
            <span className="tabular-nums text-foreground">{time}</span>
          </div>

          <IconBtn label="Music" onClick={onToggleMusic}>
            {musicOn ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
          </IconBtn>
          <IconBtn label="Theme" onClick={onToggleTheme}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </IconBtn>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function IconBtn({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  );
}

export { Linkedin, FileText };
