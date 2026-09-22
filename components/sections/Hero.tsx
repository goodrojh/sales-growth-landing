"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset, site } from "@/lib/config";

const nav = [
  { label: "Услуги", href: "#services" },
  { label: "Как работаем", href: "#process" },
  { label: "Условия", href: "#terms" },
  { label: "Вопросы", href: "#faq" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={"inline-flex items-center gap-2 font-display font-semibold tracking-tight " + className}>
      <span className="relative w-7 h-7 rounded-lg bg-amber flex items-center justify-center shadow-[0_6px_20px_rgba(242,165,58,0.45)]">
        <ArrowUpRight className="w-4.5 h-4.5 text-ink stroke-[3]" />
      </span>
      <span className="text-[17px] leading-none">
        {site.brand}
        <span className="text-amber"> {site.brandSuffix}</span>
      </span>
    </span>
  );
}

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {v}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const { open } = useLead();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setSrc(asset(mobile ? "/media/hero-mobile.mp4" : "/media/hero-desktop.mp4"));
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.8;
  }, [src]);

  const heroLead = () =>
    open({
      title: "Бесплатный разбор вашего отдела продаж",
      subtitle: "30 минут с экспертом: где теряются деньги, кого не хватает в команде и как перестроить мотивацию.",
      cta: "Записаться на разбор",
      source: "hero",
      variant: "full",
      perks: ["Найдём 3 точки роста выручки", "Оценим состав и нагрузку команды", "Покажем пример KPI-калькулятора"],
    });

  return (
    <section className="min-h-[100svh] md:min-h-[108vh] flex flex-col bg-ink relative w-full overflow-hidden grain">
      {/* Poster + video */}
      <picture>
        <source media="(max-width: 767px)" srcSet={asset("/media/hero-mobile.webp")} />
        <img src={asset("/media/hero-desktop.webp")} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
      </picture>
      {src && (
        <video
          ref={videoRef}
          key={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/90 z-[1]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(11,17,32,0.55)_0%,transparent_65%)]" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 px-3 md:px-8 pt-3 md:pt-5"
      >
        <div
          className={
            "max-w-6xl mx-auto flex items-center justify-between p-[8px] md:p-[10px] rounded-full backdrop-blur-xl border transition-colors duration-500 " +
            (scrolled ? "bg-ink/80 border-white/10 shadow-2xl shadow-black/30" : "bg-white/5 border-white/10")
          }
        >
          <a href="#" className="flex-1 flex items-center pl-2 md:pl-3 text-white whitespace-nowrap">
            <Logo />
          </a>

          <div className="hidden xl:flex items-center gap-8">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-[15px] font-medium text-white/70 hover:text-white transition-colors relative group whitespace-nowrap">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-end gap-2 md:gap-3 whitespace-nowrap">
            <a href={site.phoneHref} className="hidden lg:inline-flex items-center gap-2 text-[15px] font-semibold text-white/85 hover:text-white transition-colors px-3 py-2">
              <Phone className="w-4 h-4 text-amber" />
              {site.phone}
            </a>
            <a href={site.phoneHref} aria-label="Позвонить" className="lg:hidden w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() =>
                open({
                  title: "Перезвоним и обсудим вашу задачу",
                  subtitle: "Оставьте номер — эксперт свяжется в течение 15 минут и задаст 3–4 вопроса о команде продаж.",
                  cta: "Жду звонка",
                  source: "nav",
                  variant: "quick",
                })
              }
              className="hidden sm:inline-flex rounded-full px-5 py-2.5 text-[15px] font-bold bg-amber text-ink hover:bg-amber-2 transition-all hover:scale-105 active:scale-95"
            >
              Обсудить задачу
            </button>
            <button onClick={() => setMenu(true)} aria-label="Меню" className="xl:hidden w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl xl:hidden flex flex-col px-6 pt-5 pb-8"
          >
            <div className="flex items-center justify-between text-white">
              <Logo />
              <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-2">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-3xl font-semibold text-white py-3 border-b border-white/10"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            <a href={site.phoneHref} className="text-center text-white text-xl font-semibold mb-4">
              {site.phone}
            </a>
            <button
              onClick={() => {
                setMenu(false);
                heroLead();
              }}
              className="h-14 rounded-full bg-amber text-ink font-bold"
            >
              Получить бесплатный разбор
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-5 md:px-6 pt-[120px] md:pt-[148px] pb-12 md:pb-16 z-10">
        <div className="flex flex-col items-center w-full">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-2 text-[12px] md:text-[13px] font-semibold text-white/85"
          >
            <span className="w-2 h-2 rounded-full bg-amber shadow-[0_0_12px_#f2a53a]" />
            Подбор · Обучение · KPI для отделов продаж
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-display text-center font-semibold text-[34px] sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-[-0.03em] text-white max-w-5xl mt-0 mb-5"
          >
            Отдел продаж, который
            <br className="hidden sm:block" /> приносит <span className="text-gradient-amber italic">в&nbsp;2&nbsp;раза</span> больше
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-center text-[15px] md:text-lg text-white/85 max-w-[600px] leading-relaxed mb-8"
          >
            Подберём сильных менеджеров и&nbsp;РОП, выстроим обучение и&nbsp;премирование по&nbsp;KPI. 20+ лет строим системы
            управления персоналом в&nbsp;продажах.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            <button
              onClick={heroLead}
              className="group w-full sm:w-auto whitespace-nowrap rounded-full pl-6 sm:pl-8 pr-2 py-2 text-[15px] sm:text-base font-bold bg-amber text-ink hover:bg-amber-2 transition-all shadow-[0_16px_48px_rgba(242,165,58,0.45)] hover:scale-[1.03] active:scale-95 flex items-center justify-between gap-4"
            >
              Получить бесплатный разбор
              <span className="w-11 h-11 rounded-full bg-ink text-amber flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </button>
            <a
              href="#calc"
              className="w-full sm:w-auto rounded-full px-7 py-4 text-base font-semibold bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all text-center"
            >
              Рассчитать стоимость
            </a>
          </motion.div>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-sm text-white/60">
            Бесплатно · Без обязательств · Ответим за 15 минут
          </motion.span>

          {/* Proof strip */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
            initial="hidden"
            animate="show"
            className="mt-12 md:mt-[64px] w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
          >
            {[
              { n: <Counter to={20} suffix="+" />, l: "лет в построении систем продаж" },
              { n: <Counter to={2} prefix="×" />, l: "рост выручки и маржинальной прибыли" },
              { n: <Counter to={70} prefix="+" suffix="%" />, l: "к эффективности персонала" },
              { n: "1", l: "бесплатная замена, если не прошёл испытательный" },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className={"px-4 md:px-6 py-5 md:py-6 text-left border-white/10 " + (i % 2 === 0 ? "border-r " : "md:border-r ") + (i < 2 ? "border-b md:border-b-0 " : "") + (i === 3 ? "md:border-r-0" : "")}
              >
                <div className="font-display text-[28px] md:text-[40px] font-semibold text-white leading-none">{s.n}</div>
                <div className="mt-2 text-[12px] md:text-[13px] text-white/60 leading-snug">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
