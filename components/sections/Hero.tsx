"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset, site } from "@/lib/config";
import { btn } from "@/components/ui";

const nav = [
  { label: "Услуги", href: "#services" },
  { label: "Как работаем", href: "#process" },
  { label: "Условия", href: "#terms" },
  { label: "Вопросы", href: "#faq" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={"inline-flex items-center gap-2.5 font-display tracking-tight " + className}>
      <span className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
        <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15 L10 5 L16 15" />
          <path d="M7 11h6" />
        </svg>
      </span>
      <span className="text-[17px] leading-none font-bold">
        {site.brand}
        <span className="font-medium opacity-60"> {site.brandSuffix}</span>
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
      {prefix && <span className="text-accent-soft">{prefix}</span>}
      {v}
      {suffix && <span className="text-accent-soft">{suffix}</span>}
    </span>
  );
}

const stats = [
  { value: <Counter to={20} suffix="+" />, title: "лет опыта", text: "в построении систем продаж" },
  { value: <Counter to={2} prefix="×" />, title: "рост валовой выручки", text: "и маржинальной прибыли" },
  { value: <Counter to={70} prefix="+" suffix="%" />, title: "эффективность", text: "персонала отдела продаж" },
  { value: <Counter to={1} />, title: "бесплатная замена", text: "если не прошёл испытательный срок" },
];

export default function Hero() {
  const { open } = useLead();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setSrc(asset(mobile ? "/media/hero-mobile.mp4" : "/media/hero-desktop.mp4"));
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  const quickLead = (source: string) =>
    open({
      title: "Оставьте заявку — перезвоним за 15 минут",
      subtitle: "Эксперт уточнит задачу и предложит следующий шаг. Ни к чему не обязывает.",
      cta: "Отправить заявку",
      source,
      variant: "quick",
    });

  return (
    <section className="min-h-[100svh] flex flex-col bg-ink relative w-full overflow-hidden grain">
      <picture>
        <source media="(max-width: 767px)" srcSet={asset("/media/hero-mobile.webp")} />
        <img src={asset("/media/hero-desktop.webp")} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
      </picture>
      {src && (
        <video ref={videoRef} key={src} autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-ink/95 z-[1]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(13,21,38,0.55)_0%,transparent_65%)]" />

      {/* Header */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={
          "fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 " +
          (scrolled ? "bg-ink/90 backdrop-blur-xl border-white/10" : "bg-transparent border-white/10")
        }
      >
        <div className="container-x h-[68px] md:h-[76px] flex items-center justify-between gap-6">
          <a href="#" className="text-white shrink-0" aria-label={site.brand + " " + site.brandSuffix}>
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="relative text-[15px] font-medium text-white/70 hover:text-white transition-colors py-2 group">
                {item.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <a href={site.phoneHref} className="hidden lg:flex flex-col items-end leading-tight text-white">
              <span className="text-[15px] font-semibold">{site.phone}</span>
              <span className="text-[11px] text-white/50">{site.hours}</span>
            </a>
            <a href={site.phoneHref} aria-label="Позвонить" className="lg:hidden w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white">
              <Phone className="w-4 h-4" />
            </a>
            <button onClick={() => quickLead("header")} className="hidden sm:inline-flex items-center h-10 px-5 rounded-lg bg-accent text-white text-[14px] font-semibold hover:bg-accent-2 transition">
              Оставить заявку
            </button>
            <button onClick={() => setMenu(true)} aria-label="Меню" className="lg:hidden w-10 h-10 rounded-lg bg-white text-ink flex items-center justify-center">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-ink lg:hidden flex flex-col">
            <div className="container-x h-[68px] flex items-center justify-between text-white border-b border-white/10">
              <Logo />
              <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="container-x flex-1 flex flex-col justify-center">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-[28px] font-semibold text-white py-4 border-b border-white/10 flex items-center justify-between"
                >
                  {item.label}
                  <ArrowRight className="w-5 h-5 text-white/40" />
                </motion.a>
              ))}
            </div>
            <div className="container-x pb-8 flex flex-col gap-3">
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="container-x flex-1 flex flex-col items-center justify-center text-center pt-[120px] md:pt-[150px] pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-display font-semibold text-[36px] sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.04] tracking-[-0.035em] text-white max-w-5xl"
          >
            Отдел продаж, который
            <br className="hidden sm:block" /> приносит <span className="text-accent-soft">в&nbsp;2&nbsp;раза</span> больше
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-[16px] md:text-lg text-white/75 max-w-[620px] leading-relaxed"
          >
            Подберём сильных менеджеров и&nbsp;РОП, выстроим обучение и&nbsp;премирование по&nbsp;KPI. 20+ лет строим системы
            управления персоналом в&nbsp;продажах.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
          >
            <button onClick={heroLead} className={btn.primary + " h-14 px-8 text-[16px]"}>
              Получить бесплатный разбор <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => quickLead("hero-secondary")} className={btn.ghostDark + " h-14 px-8 text-[16px]"}>
              Оставить заявку
            </button>
          </motion.div>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-[13px] text-white/50">
            Бесплатно · Без обязательств · Ответим за 15 минут
          </motion.span>
        </div>

        {/* Stats */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
          initial="hidden"
          animate="show"
          className="border-t border-white/10 bg-ink/40 backdrop-blur-md"
        >
          <div className="container-x grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.title}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                className={
                  "py-6 md:py-9 " +
                  (i % 2 === 1 ? "pl-5 md:pl-8 border-l border-white/10 " : "pr-5 md:pr-8 ") +
                  (i === 2 ? "lg:pl-8 lg:border-l " : "") +
                  (i > 1 ? "border-t border-white/10 lg:border-t-0" : "")
                }
              >
                <div className="font-display text-[40px] md:text-[56px] font-semibold text-white leading-none tracking-[-0.03em] tabular-nums">{s.value}</div>
                <div className="mt-3 md:mt-4 text-[14px] md:text-[15px] font-semibold text-white">{s.title}</div>
                <div className="mt-1 text-[12px] md:text-[13px] text-white/50 leading-snug">{s.text}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
