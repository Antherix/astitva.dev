import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Mail, MapPin, Send, Linkedin, Github, Twitter, FileText, ExternalLink } from "lucide-react";
import { TopBar } from "./TopBar";
import { SkillChip } from "./SkillChip";
import { SideNav, MobileTabStrip } from "./SideNav";
import { Section } from "./Section";
import { SearchPalette } from "./SearchPalette";
import { Cursor } from "./Cursor";
import { PROFILE, PROJECTS, SKILLS, EXPERIENCE, EDUCATION, SECTIONS, type SectionId } from "./data";

export function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [musicOn, setMusicOn] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("intro");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // theme init + persist
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as "light" | "dark" | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (typeof window !== "undefined") localStorage.setItem("theme", theme);
  }, [theme]);

  // music
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.18;
    if (musicOn) audioRef.current.play().catch(() => setMusicOn(false));
    else audioRef.current.pause();
  }, [musicOn]);

  // ⌘K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // smooth scroll (Lenis) — slightly slower, eased
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // intercept anchor clicks for smooth in-page nav
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -56 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  // scroll-spy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id as SectionId);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    observers.push(obs);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Cursor />
      {/* bgm: Galt MacDermot — Coffee Cold (1966). all rights to the artist. */}
      <audio ref={audioRef} src="/music/coffee-cold.mp3" loop preload="none" />

      <TopBar
        onOpenSearch={() => setSearchOpen(true)}
        musicOn={musicOn}
        onToggleMusic={() => setMusicOn((v) => !v)}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />
      <MobileTabStrip active={active} />

      <div className="mx-auto flex w-full max-w-[1600px] px-6 lg:px-10">
        <SideNav active={active} />

        <main className="min-w-0 flex-1 md:pl-12">
          {/* Introduction */}
          <Section id="intro" index={0} title={PROFILE.name} kicker="Introduction">
            <p className="mb-2 font-display text-2xl text-muted-foreground">{PROFILE.tagline}</p>
            <p className="max-w-2xl text-base text-foreground/80">{PROFILE.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                <FileText className="h-4 w-4" />
                Get Resume
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-md border border-[var(--hairline)] px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                <Mail className="h-4 w-4" />
                Send Mail
              </a>
            </div>
          </Section>

          {/* About */}
          <Section id="about" index={1} title="About Me">
            <div className="grid gap-4 md:grid-cols-2">
              <p>
                I'm a first-year B.Tech CSE student at <span className="text-foreground">IIIT Sonipat</span>.
                I'm drawn to coding, IT, and creative problem-solving — the kind of work where you
                start with a blank file and end with something that runs.
              </p>
              <p>
                Currently focused on <span className="text-foreground">full-stack development</span>,
                <span className="text-foreground"> AI tools</span>, and contributing to open source.
                I learn by building in public and shipping small things often.
              </p>
            </div>
          </Section>

          {/* Projects */}
          <Section id="projects" index={2} title="Projects">
            <div className="grid gap-px overflow-hidden rounded-lg border border-[var(--hairline)] md:grid-cols-2">
              {PROJECTS.map((p) => (
                <article
                  key={p.title}
                  className="group bg-background p-5 outline outline-1 outline-[var(--hairline)] -outline-offset-[0.5px]"
                >
                  <div className="mb-2 flex items-baseline justify-between">
                    <h3 className="text-base font-medium">{p.title}</h3>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{p.period}</span>
                  </div>
                  <ul className="mb-4 space-y-1.5 text-sm text-muted-foreground">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-px w-3 shrink-0 bg-[var(--hairline)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-md border border-[var(--hairline)] px-2 py-0.5 text-[11px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section id="skills" index={3} title="Skills & Tools">
            <div className="space-y-8">
              {SKILLS.map((g) => (
                <div key={g.group}>
                  <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{g.group}</p>
                  <div className="flex flex-wrap gap-2.5">
                    {g.items.map((i) => (
                      <SkillChip key={i} name={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Experience */}
          <Section id="experience" index={4} title="Experience">
            <div className="space-y-8">
              {EXPERIENCE.map((e) => (
                <div key={e.role} className="grid gap-2 md:grid-cols-[200px_1fr]">
                  <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{e.period}</div>
                  <div>
                    <h3 className="text-base font-medium">
                      {e.role} <span className="text-muted-foreground">· {e.org}</span>
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-2 h-px w-3 shrink-0 bg-[var(--hairline)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section id="education" index={5} title="Education">
            <div className="space-y-6">
              {EDUCATION.map((e) => (
                <div key={e.school} className="grid gap-2 md:grid-cols-[200px_1fr]">
                  <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{e.period}</div>
                  <div>
                    <h3 className="text-base font-medium">{e.school}</h3>
                    <p className="text-sm text-muted-foreground">{e.degree}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{e.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Contact */}
          <Section id="contact" index={6} title="Contact">
            <ul className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              <ContactRow icon={<Mail className="h-4 w-4" />} label="Email" value={PROFILE.email} href={`mailto:${PROFILE.email}`} />
              <ContactEmailForm />
              <ContactRow icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" value="/astitvakushwaha" href={PROFILE.linkedin} external />
              <ContactRow icon={<Github className="h-4 w-4" />} label="GitHub" value={`@${PROFILE.githubUser}`} href={PROFILE.github} external />
              <ContactRow icon={<Twitter className="h-4 w-4" />} label="X / Twitter" value={PROFILE.twitterHandle} href={PROFILE.twitter} external />
              <ContactRow icon={<MapPin className="h-4 w-4" />} label="Location" value={PROFILE.location} />
            </ul>
          </Section>

          {/* Stats */}
          <Section id="stats" index={7} title="Stats">
            <p className="mb-6 max-w-xl text-sm text-muted-foreground">
              Live signal from GitHub — what I've been building lately.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <img
                alt="GitHub stats"
                className="w-full rounded-md border border-[var(--hairline)]"
                src={`https://github-readme-stats.vercel.app/api?username=${PROFILE.githubUser}&show_icons=true&hide_border=true&bg_color=00000000&title_color=8b5cf6&icon_color=8b5cf6&text_color=999999`}
              />
              <img
                alt="Top languages"
                className="w-full rounded-md border border-[var(--hairline)]"
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${PROFILE.githubUser}&layout=compact&hide_border=true&bg_color=00000000&title_color=8b5cf6&text_color=999999`}
              />
              <img
                alt="GitHub streak"
                className="w-full rounded-md border border-[var(--hairline)] md:col-span-2"
                src={`https://github-readme-streak-stats.herokuapp.com?user=${PROFILE.githubUser}&hide_border=true&background=00000000&stroke=8b5cf6&ring=8b5cf6&fire=8b5cf6&currStreakLabel=8b5cf6&sideLabels=999999&dates=999999&currStreakNum=ffffff&sideNums=ffffff`}
              />
              <a
                href={PROFILE.leetcode}
                target="_blank"
                rel="noreferrer"
                className="md:col-span-2 block overflow-hidden rounded-md border border-[var(--hairline)] transition-colors hover:bg-muted/30"
              >
                <img
                  alt={`LeetCode stats for ${PROFILE.leetcodeUser}`}
                  className="w-full"
                  src={`https://leetcard.jacoblin.cool/${PROFILE.leetcodeUser}?theme=dark&font=Inter&ext=heatmap&border=0`}
                />
              </a>
            </div>
          </Section>

          <footer className="py-10 text-center text-xs text-muted-foreground">
            <span title="♪ Coffee Cold — Galt MacDermot (1966)" aria-label="Coffee Cold by Galt MacDermot">©</span> {new Date().getFullYear()} {PROFILE.name} · Built with care.
          </footer>
        </main>
      </div>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

function ContactEmailForm() {
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = message.trim();
    if (!body) return;
    const name = senderName.trim();
    const subject = name
      ? `Portfolio message from ${name}`
      : `Portfolio message — ${PROFILE.name}`;
    const fullBody = name ? `${body}\n\n— ${name}` : body;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
  };

  return (
    <li>
      <div className="flex flex-col gap-3 px-1 py-4 sm:flex-row sm:items-start sm:gap-4">
        <span className="flex w-32 shrink-0 items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground sm:items-start sm:pt-2.5">
          <Send className="h-4 w-4 shrink-0" />
          Message
        </span>
        <form onSubmit={submit} className="min-w-0 flex-1 space-y-3">
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full rounded-md border border-[var(--hairline)] bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40"
          />
          <textarea
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message…"
            className="w-full resize-y rounded-md border border-[var(--hairline)] bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40"
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <Send className="h-4 w-4" />
              Open in email app
            </button>
            <p className="text-xs text-muted-foreground">
              Opens your mail client with this message — nothing is sent from the site itself.
            </p>
          </div>
        </form>
      </div>
    </li>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="flex w-32 items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="flex-1 text-sm">{value}</span>
      {href && external && <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />}
    </>
  );
  return (
    <li>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="flex items-center gap-4 px-1 py-3 transition-colors hover:bg-muted/50"
        >
          {inner}
        </a>
      ) : (
        <div className="flex items-center gap-4 px-1 py-3">{inner}</div>
      )}
    </li>
  );
}
