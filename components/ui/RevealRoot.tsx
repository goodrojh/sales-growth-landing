"use client";
import { useEffect } from "react";

/**
 * Глобальные улучшения страницы:
 * 1) один IntersectionObserver на все элементы .reveal — вместо сотен анимационных компонентов;
 * 2) точная прокрутка по якорям: блоки с content-visibility меняют высоту во время скролла,
 *    поэтому после прокрутки позиция досчитывается повторно.
 */
export default function RevealRoot() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    let io: IntersectionObserver | null = null;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io!.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px" }
      );
      els.forEach((el) => io!.observe(el));
    }

    // Пока пользователь читает первый экран, по одной в простое браузера «прогреваем» секции ниже:
    // просчитываем их и декодируем картинки — при прокрутке не будет подтормаживаний.
    type IdleWin = Window & { requestIdleCallback?: (cb: (d: { timeRemaining: () => number }) => void, o?: { timeout: number }) => number };
    const idle = (cb: (d: { timeRemaining: () => number }) => void) =>
      (window as IdleWin).requestIdleCallback ? (window as IdleWin).requestIdleCallback!(cb, { timeout: 3000 }) : window.setTimeout(() => cb({ timeRemaining: () => 8 }), 200);
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(:first-child)"));
    let warmIdx = 0;
    let warmStopped = false;
    const warm = (d: { timeRemaining: () => number }) => {
      if (warmStopped) return;
      while (warmIdx < sections.length && d.timeRemaining() > 6) {
        const s = sections[warmIdx++];
        s.style.contentVisibility = "visible";
        s.querySelectorAll<HTMLImageElement>("img[loading=lazy]").forEach((img) => {
          img.loading = "eager";
          img.decode?.().catch(() => {});
        });
      }
      if (warmIdx < sections.length) idle(warm);
    };
    const startWarm = () => window.setTimeout(() => idle(warm), 1500);
    if (document.readyState === "complete") startWarm();
    else window.addEventListener("load", startWarm, { once: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const offset = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    let timers: number[] = [];

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      e.preventDefault();
      timers.forEach(clearTimeout);
      timers = [];
      if (!id) {
        window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
        history.replaceState(null, "", location.pathname);
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      // один раз просчитываем все секции: браузер запомнит их реальную высоту (contain-intrinsic-size: auto)
      const root = document.documentElement;
      if (!root.dataset.cvMeasured) {
        root.classList.add("cv-off");
        void document.body.offsetHeight;
        root.dataset.cvMeasured = "1";
        requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("cv-off")));
      }
      const go = (behavior: ScrollBehavior) => {
        const top = target.getBoundingClientRect().top + window.scrollY - offset();
        window.scrollTo({ top, behavior });
      };
      go(reduce ? "instant" : "smooth");
      history.replaceState(null, "", "#" + id);
      // когда прокрутка остановилась — досчитываем позицию (секции по пути могли изменить высоту)
      let last = -1;
      let still = 0;
      let tries = 0;
      const poll = () => {
        const y = window.scrollY;
        still = Math.abs(y - last) < 1 ? still + 1 : 0;
        last = y;
        if (still >= 2) {
          const delta = target.getBoundingClientRect().top - offset();
          if (Math.abs(delta) > 2 && tries < 3) {
            tries++;
            go("smooth");
            still = 0;
          } else return;
        }
        timers.push(window.setTimeout(poll, 90));
      };
      timers.push(window.setTimeout(poll, 150));
    };
    document.addEventListener("click", onClick);

    return () => {
      warmStopped = true;
      window.removeEventListener("load", startWarm);
      io?.disconnect();
      document.removeEventListener("click", onClick);
      timers.forEach(clearTimeout);
    };
  }, []);
  return null;
}
