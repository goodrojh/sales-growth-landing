"use client";
import React, { useEffect, useRef, useState } from "react";

/** Добавляет класс is-visible, когда блок впервые попадает в зону видимости (для CSS-анимаций bar-x / bar-y). */
export function Reveal({ as: Tag = "div", className = "", children, ...rest }: { as?: React.ElementType; className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={className + (visible ? " is-visible" : "")} {...rest}>
      {children}
    </Tag>
  );
}

/** Экономное видео: грузится после загрузки страницы, играет только в зоне видимости, не грузится при экономии трафика. */
export function useSmartVideo(getSrc: () => string, opts: { deferUntilLoad?: boolean; rootMargin?: string; enabled?: boolean } = {}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (conn?.saveData || reduce || opts.enabled === false) return;

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (idle) idle(() => !cancelled && setSrc(getSrc()), { timeout: 1500 });
      else setTimeout(() => !cancelled && setSrc(getSrc()), 300);
    };
    if (!opts.deferUntilLoad || document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.enabled]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: opts.rootMargin ?? "0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src, opts.rootMargin]);

  return { ref, src };
}

/** Появление видео поверх постера без рывка. */
export function fadeInVideo(e: React.SyntheticEvent<HTMLVideoElement>) {
  e.currentTarget.style.opacity = "1";
}

/** Фоновое видео секции: грузится после загрузки страницы и играет только в зоне видимости. */
export function BgVideo({
  src,
  mobileSrc,
  rootMargin = "0px",
  lazy = false,
  className = "absolute inset-0 w-full h-full object-cover",
}: {
  src: string;
  mobileSrc?: string;
  rootMargin?: string;
  /** Грузить видео только когда блок приближается к экрану */
  lazy?: boolean;
  className?: string;
}) {
  const sentinel = useRef<HTMLSpanElement>(null);
  const [near, setNear] = useState(!lazy);
  useEffect(() => {
    if (!lazy || !sentinel.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setNear(true);
        io.disconnect();
      }
    }, { rootMargin: "600px 0px" });
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, [lazy]);
  const video = useSmartVideo(
    () => (process.env.NEXT_PUBLIC_BASE_PATH || "") + (mobileSrc && window.matchMedia("(max-width: 767px)").matches ? mobileSrc : src),
    { deferUntilLoad: true, rootMargin, enabled: near }
  );
  if (!video.src) return lazy ? <span ref={sentinel} className="absolute inset-0 pointer-events-none" aria-hidden="true" /> : null;
  return (
    <video
      ref={video.ref}
      src={video.src}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      onPlaying={fadeInVideo}
      style={{ opacity: 0, transition: "opacity .8s ease" }}
      className={className}
      aria-hidden="true"
    />
  );
}
