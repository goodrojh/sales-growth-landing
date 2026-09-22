"use client";
import React, { useEffect, useState } from "react";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset, site } from "@/lib/config";
import { btn } from "@/components/ui";
import { Logo } from "@/components/ui/Logo";
import { useSmartVideo, fadeInVideo } from "@/components/ui/perf";

const nav = [
  { label: "Услуги", href: "#services" },
  { label: "Как работаем", href: "#process" },
  { label: "Условия", href: "#terms" },
  { label: "Вопросы", href: "#faq" },
];

function Stat({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  return (
    <>
      {prefix && <span className="text-accent-soft">{prefix}</span>}
      {value}
      {suffix && <span className="text-accent-soft">{suffix}</span>}
    </>
  );
}

const stats = [
  { value: <Stat value={20} suffix="+" />, title: "лет опыта", text: "в построении систем продаж" },
  { value: <Stat value={2} prefix="×" />, title: "рост валовой выручки", text: "и маржинальной прибыли" },
  { value: <Stat value={70} prefix="+" suffix="%" />, title: "эффективность", text: "персонала отдела продаж" },
  { value: <Stat value={1} />, title: "бесплатная замена", text: "если не прошёл испытательный срок" },
];

export default function Hero() {
  const { open } = useLead();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const video = useSmartVideo(() => asset(window.matchMedia("(max-width: 767px)").matches ? "/media/hero-mobile.mp4" : "/media/hero-desktop.mp4"), {
    deferUntilLoad: true,
  });

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
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menu]);

  const heroLead = () =>
    open({
      title: "Бесплатный разбор вашего отдела продаж",
      subtitle: "30 минут с экспертом: где теряются деньги, кого не хватает в команде и как перестроить мотивацию.",
      cta: "Записаться на разбор",
      source: "hero",
      variant: "full",
      perks: ["Найдём 3 точки роста выручки", "Оценим состав и нагрузку команды", "Покажем пример KPI-калькулятора"],
    });

  const quickLead = (source: string) =>
    open({
      title: "Оставьте заявку — перезвоним за 15 минут",
      subtitle: "Эксперт уточнит задачу и предложит следующий шаг. Ни к чему не обязывает.",
      cta: "Отправить заявку",
      source,
      variant: "quick",
    });

  return (
    <section className="min-h-[100svh] flex flex-col bg-ink relative w-full overflow-hidden">
      <picture>
        <source media="(max-width: 767px)" srcSet={asset("/media/hero-mobile-720.webp") + " 720w, " + asset("/media/hero-mobile.webp") + " 1080w"} sizes="100vw" />
        <source media="(min-width: 768px)" srcSet={asset("/media/hero-desktop-960.webp") + " 960w, " + asset("/media/hero-desktop.webp") + " 1920w"} sizes="100vw" />
        <img
          src={asset("/media/hero-desktop.webp")}
          alt=""
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1072}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
      {video.src && (
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
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-ink/95" />

      {/* Header */}
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
            <button onClick={() => quickLead("header")} className="hidden sm:inline-flex items-center h-10 px-5 rounded-lg bg-accent text-white text-[14px] font-semibold hover:bg-accent-2 transition-colors">
              Оставить заявку
            </button>
            <button onClick={() => setMenu(true)} aria-label="Открыть меню" aria-expanded={menu} className="lg:hidden w-11 h-11 rounded-lg bg-white text-ink flex items-center justify-center">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
            className={"fixed inset-0 z-[60] bg-ink lg:hidden flex flex-col transition-opacity duration-200 " + (menu ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none")}
            aria-hidden={!menu}
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
                  quickLead("mobile-menu");
                }}
                className={btn.primary + " h-14"}
              >
                Оставить заявку
              </button>
            </div>
          </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="container-x flex-1 flex flex-col items-center justify-center text-center pt-[112px] md:pt-[150px] pb-10 md:pb-12">
          <h1 className="font-display font-semibold text-[34px] min-[400px]:text-[38px] sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.05] tracking-[-0.035em] text-white max-w-5xl">
            Отдел продаж, который
            <br className="hidden sm:block" /> приносит <span className="text-accent-soft">в&nbsp;2&nbsp;раза</span> больше
          </h1>

          <p className="anim-rise d-2 mt-5 md:mt-6 text-[16px] md:text-lg text-white/80 max-w-[620px] leading-relaxed">
            Подберём сильных менеджеров и&nbsp;РОП, выстроим обучение и&nbsp;премирование по&nbsp;KPI. 20+ лет строим системы
            управления персоналом в&nbsp;продажах.
          </p>

          <div className="anim-rise d-3 mt-8 md:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button onClick={heroLead} className={btn.primary + " h-14 px-8 text-[16px]"}>
              Получить бесплатный разбор <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => quickLead("hero-secondary")} className={btn.ghostDark + " h-14 px-8 text-[16px]"}>
              Оставить заявку
            </button>
          </div>
          <span className="anim-rise d-4 mt-4 text-[13px] text-white/65">Бесплатно · Без обязательств · Ответим за 15 минут</span>
        </div>

        {/* Stats */}
        <div className="anim-rise d-4 border-t border-white/10 bg-ink/70">
          <div className="container-x grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.title}
                className={
                  "py-6 md:py-9 " +
                  (i % 2 === 1 ? "pl-5 md:pl-8 border-l border-white/10 " : "pr-5 md:pr-8 ") +
                  (i === 2 ? "lg:pl-8 lg:border-l " : "") +
                  (i > 1 ? "border-t border-white/10 lg:border-t-0" : "")
                }
              >
                <div className="font-display text-[40px] md:text-[56px] font-semibold text-white leading-none tracking-[-0.03em] tabular-nums">{s.value}</div>
                <div className="mt-3 md:mt-4 text-[14px] md:text-[15px] font-semibold text-white">{s.title}</div>
                <div className="mt-1 text-[13px] text-white/60 leading-snug">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
