import { useEffect, useState } from "react";
import { SECTIONS } from "./data";

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  if (!open) return null;

  const results = SECTIONS.filter((s) => s.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[15vh]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-lg border border-[var(--hairline)] bg-popover shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Jump to section…"
          className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
        <div className="max-h-72 overflow-auto border-t border-[var(--hairline)]">
          {results.length === 0 && (
            <div className="px-4 py-6 text-center text-xs text-muted-foreground">No sections found</div>
          )}
          {results.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={onClose}
              className="block px-4 py-2.5 text-sm hover:bg-muted"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
