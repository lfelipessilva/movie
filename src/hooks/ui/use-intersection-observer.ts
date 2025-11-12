import { useEffect, useRef } from "react";

interface UseIntersectionObserverParams {
  onIntersect: () => void;
  enabled?: boolean;
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  root,
  rootMargin,
  threshold,
}: UseIntersectionObserverParams) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = targetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        onIntersect();
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [enabled, onIntersect, root, rootMargin, threshold]);

  return targetRef;
}

