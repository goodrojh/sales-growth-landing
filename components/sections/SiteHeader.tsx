"use client";
import React, { useEffect, useState } from "react";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { useLead, type LeadOptions } from "@/components/lead/LeadProvider";
import { site } from "@/lib/config";
import { btn } from "@/components/ui";
import { Logo } from "@/components/ui/Logo";

const nav = [
  { label: "Услуги", href: "#services" },
  { label: "Как работаем", href: "#process" },
  { label: "Условия", href: "#terms" },
  { label: "Вопросы", href: "#faq" },
];

const quick = (source: string): LeadOptions => ({
  title: "Оставьте заявку — перезвоним за 15 минут",
  subtitle: "Эксперт уточнит задачу и предложит следующий шаг. Ни к чему не обязывает.",
  cta: "Отправить заявку",
  source,
  variant: "quick",
});

export default function SiteHeader() {
  const { open } = useLead();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = false;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const s = window.scrollY > 24;
        if (s !== last) {
          last = s;
          setScrolled(s);
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <>
      <header
        className={
          "anim-fade-down fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 " +
          (scrolled ? "bg-ink/95 border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.25)]" : "bg-transparent border-white/10")
        }
      >
        <div className="container-x h-[64px] md:h-[76px] flex items-center justify-between gap-6">
          <a href="#" className="text-white shrink-0 h-11 inline-flex items-center">
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-9" aria-label="Основное меню">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="relative text-[15px] font-medium text-white/75 hover:text-white transition-colors py-2 group">
                {item.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-full bg-white origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-5">
            <a href={site.phoneHref} className="hidden lg:flex flex-col items-end leading-tight text-white">
              <span className="text-[15px] font-semibold">{site.phone}</span>
              <span className="text-[11px] text-white/60">{site.hours}</span>
            </a>
            <a href={site.phoneHref} aria-label={"Позвонить " + site.phone} className="lg:hidden w-11 h-11 rounded-lg border border-white/20 flex items-center justify-center text-white">
              <Phone className="w-[18px] h-[18px]" />
            </a>
            <button onClick={() => open(quick("header"))} className="hidden sm:inline-flex items-center h-10 px-5 rounded-lg bg-accent text-white text-[14px] font-semibold hover:bg-accent-2 transition-colors">
              Оставить заявку
            </button>
            <button onClick={() => setMenu(true)} aria-label="Открыть меню" aria-expanded={menu} className="lg:hidden w-11 h-11 rounded-lg bg-white text-ink flex items-center justify-center">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div
        className={"fixed inset-0 z-[60] bg-ink lg:hidden flex flex-col transition-opacity duration-200 " + (menu ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none")}
        aria-hidden={!menu}
        inert={!menu}
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
      >
        <div className="container-x h-[64px] flex items-center justify-between text-white border-b border-white/10">
          <Logo />
          <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="w-11 h-11 rounded-lg border border-white/20 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="container-x flex-1 flex flex-col justify-center" aria-label="Меню">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenu(false)}
              className="font-display text-[28px] font-semibold text-white py-4 border-b border-white/10 flex items-center justify-between"
            >
              {item.label}
              <ArrowRight className="w-5 h-5 text-white/40" />
            </a>
          ))}
        </nav>
        <div className="container-x pb-[max(32px,env(safe-area-inset-bottom))] flex flex-col gap-3">
          <a href={site.phoneHref} className={btn.ghostDark + " h-14"}>
            <Phone className="w-4 h-4" /> {site.phone}
          </a>
          <button
            onClick={() => {
              setMenu(false);
              open(quick("mobile-menu"));
            }}
            className={btn.primary + " h-14"}
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </>
  );
}
