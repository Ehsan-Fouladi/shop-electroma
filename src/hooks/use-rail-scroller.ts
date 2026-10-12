"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface RailBounds {
  atStart: boolean;
  atEnd: boolean;
}

/**
 * Shared behaviour for every horizontal product rail:
 * — tracks whether the rail sits at either bound so controls can disable,
 * — steps by exactly one card (RTL aware) with smooth scrolling.
 */
export function useRailScroller<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [bounds, setBounds] = useState<RailBounds>({ atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const position = Math.abs(el.scrollLeft);
    setBounds({
      atStart: position <= 2,
      // `max <= 2` means the rail fits entirely — both controls stay disabled.
      atEnd: max <= 2 || position >= max - 2,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const step = useCallback((direction: "prev" | "next", cards = 1) => {
    const el = ref.current;
    if (!el) return;

    const card = el.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap || "16") || 16;
    const distance = ((card?.offsetWidth ?? el.clientWidth * 0.8) + gap) * cards;
    const isRtl = getComputedStyle(el).direction === "rtl";

    // In RTL the next cards live to the left, i.e. at a more negative scrollLeft.
    const sign = direction === "next" ? (isRtl ? -1 : 1) : isRtl ? 1 : -1;
    el.scrollBy({ left: sign * distance, behavior: "smooth" });
  }, []);

  return { ref, bounds, step, measure };
}
