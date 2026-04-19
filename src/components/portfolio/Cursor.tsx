import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]",
      );
      setHover(isInteractive);
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("cursor-none-all");

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-all");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[var(--primary)] mix-blend-difference"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-[var(--primary)] mix-blend-difference transition-[width,height,opacity,background-color] duration-200 ease-out"
        style={{
          width: hover ? 44 : 28,
          height: hover ? 44 : 28,
          opacity: hover ? 0.9 : 0.55,
          backgroundColor: hover ? "color-mix(in oklab, var(--primary) 12%, transparent)" : "transparent",
          transform: "translate3d(-100px, -100px, 0)",
        }}
      />
    </>
  );
}
