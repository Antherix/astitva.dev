import { ArrowRight } from "lucide-react";
import { SECTIONS, type SectionId } from "./data";

interface Props {
  id: SectionId;
  index: number;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}

export function Section({ id, index, title, kicker, children }: Props) {
  const next = SECTIONS[index + 1];
  return (
    <section
      id={id}
      className="scroll-mt-20 flex min-h-[calc(100vh-3.5rem)] flex-col justify-center border-b border-[var(--hairline)] py-20"
    >
      <div className="mb-8 flex items-baseline justify-between">
        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {String(index + 1).padStart(2, "0")} · {kicker ?? title}
          </p>
          <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
        </div>
      </div>

      <div className="text-[15px] leading-relaxed text-foreground/90">{children}</div>

      {next && (
        <div className="mt-12 flex justify-end">
          <a
            href={`#${next.id}`}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
          >
            Next: {next.label}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      )}
    </section>
  );
}
