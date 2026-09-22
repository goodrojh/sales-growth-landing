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

  // Подгружаем окно заявки в фоне после загрузки страницы — первый клик открывает его мгновенно
  useEffect(() => {
    const pre = () => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
      if (idle) idle(() => loadModal());
      else setTimeout(loadModal, 1500);
    };
    if (document.readyState === "complete") pre();
    else window.addEventListener("load", pre, { once: true });
    return () => window.removeEventListener("load", pre);
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
