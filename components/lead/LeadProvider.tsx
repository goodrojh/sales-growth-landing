"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { ServiceId } from "@/lib/config";

const loadModal = () => import("./LeadModal");
const LeadModalHost = dynamic(loadModal, { ssr: false });

export interface LeadOptions {
  /** Заголовок окна — у каждой кнопки свой */
  title: string;
  subtitle?: string;
  /** Текст кнопки отправки */
  cta?: string;
  /** Откуда пришла заявка — уходит в CRM */
  source: string;
  /** quick — имя + телефон; full — полная анкета */
  variant?: "quick" | "full";
  /** Предвыбранные услуги */
  preset?: ServiceId[];
  /** Доп. контекст (роль, ответы квиза) — уходит вместе с заявкой */
  extra?: Record<string, string>;
  /** Что получит клиент — список-бонус в окне */
  perks?: string[];
}

interface Ctx {
  open: (o: LeadOptions) => void;
}

const LeadContext = createContext<Ctx>({ open: () => {} });
export const useLead = () => useContext(LeadContext);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<LeadOptions | null>(null);
  const [mounted, setMounted] = useState(false);
  const open = useCallback((o: LeadOptions) => {
    setMounted(true);
    setOpts(o);
  }, []);

  // Окно заявки подгружается в простое браузера после загрузки страницы (или при первом нажатии) —
  // не во время прокрутки, чтобы не создавать подтормаживаний.
  useEffect(() => {
    let done = false;
    const pre = () => {
      if (done) return;
      done = true;
      window.removeEventListener("pointerdown", pre);
      window.removeEventListener("keydown", pre);
      loadModal();
    };
    window.addEventListener("pointerdown", pre, { passive: true });
    window.addEventListener("keydown", pre);
    const idleLoad = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
      window.setTimeout(() => (w.requestIdleCallback ? w.requestIdleCallback(pre, { timeout: 4000 }) : pre()), 2500);
    };
    if (document.readyState === "complete") idleLoad();
    else window.addEventListener("load", idleLoad, { once: true });
    return () => {
      window.removeEventListener("pointerdown", pre);
      window.removeEventListener("keydown", pre);
      window.removeEventListener("load", idleLoad);
    };
  }, []);
  const close = useCallback(() => setOpts(null), []);

  useEffect(() => {
    if (!opts) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [opts, close]);

  return (
    <LeadContext.Provider value={{ open }}>
      {children}
      {mounted && <LeadModalHost opts={opts} onClose={close} />}
    </LeadContext.Provider>
  );
}
