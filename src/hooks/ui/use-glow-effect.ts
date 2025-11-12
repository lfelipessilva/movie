import { useRef, useCallback } from "react";

export function useGlowEffect() {
  const glowElementRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!glowElementRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      if (glowElementRef.current) {
        glowElementRef.current.style.setProperty("--glow-x", `${percentX}%`);
        glowElementRef.current.style.setProperty("--glow-y", `${percentY}%`);
      }
    });
  }, []);

  const setGlowRef = useCallback((element: HTMLDivElement | null) => {
    glowElementRef.current = element;
    if (element) {
      element.style.setProperty("--glow-x", "50%");
      element.style.setProperty("--glow-y", "50%");
    }
  }, []);

  const glowStyle = {
    background: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(56,189,248,0.15), transparent 60%)`,
  };

  return { handleMove, glowStyle, setGlowRef };
}

