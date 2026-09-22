"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Send, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset, site, type ServiceId } from "@/lib/config";
import { btn } from "@/components/ui";
import { Logo } from "./Hero";

export default function Footer() {
  const { open } = useLead();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShowVideo(true), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const svc = (title: string, preset: ServiceId) => () =>
    open({ title, subtitle: "Оставьте контакты — перезвоним в течение 15 минут.", source: "footer-" + preset, preset: [preset] });

  const linkCls = "text-white/60 text-[14px] hover:text-white transition text-left";

  return (
    <footer className="w-full bg-ink">
      {/* CTA */}
      <div ref={wrapRef} className="relative overflow-hidden">
        <img src={asset("/media/city.webp")} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        {showVideo && (
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={asset("/media/city.mp4")} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink" />

        <div className="container-x relative z-10 py-24 md:py-36 grid lg:grid-cols-12 gap-10 items-end">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 font-display text-[36px] sm:text-[52px] md:text-[64px] font-semibold text-white leading-[1.02] tracking-[-0.035em]"
          >
            Сильный отдел продаж начинается <span className="text-accent-soft">с&nbsp;одного звонка</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 flex flex-col gap-3"
          >
            <button
              onClick={() =>
                open({
                  title: "Заполните анкету, мы свяжемся с вами",
                  subtitle: "Отметьте, какая помощь необходима, — подготовим предложение под вашу задачу.",
                  cta: "Отправить анкету",
                  source: "footer-anketa",
                  variant: "full",
                })
              }
              className={btn.primary + " h-14 w-full text-[16px]"}
            >
              Заполнить анкету <ArrowRight className="w-4 h-4" />
            </button>
            <a href={site.phoneHref} className={btn.ghostDark + " h-14 w-full text-[16px]"}>
              <Phone className="w-4 h-4" /> {site.phone}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="container-x py-12 md:py-16 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-5 text-white">
            <Logo />
            <p className="mt-5 text-white/55 text-[14px] leading-relaxed max-w-[340px]">
              Подбор, обучение и системы премирования для отделов продаж. 20+ лет опыта построения систем управления персоналом в продажах.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { href: site.telegram, icon: Send, label: "Telegram" },
                { href: site.whatsapp, icon: MessageCircle, label: "WhatsApp" },
                { href: "mailto:" + site.email, icon: Mail, label: "Почта" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition"
                >
                  <s.icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-white text-[14px] font-semibold mb-4">Услуги</h4>
            <ul className="space-y-3">
              <li><button onClick={svc("Подбор специалистов по продажам", "podbor")} className={linkCls}>Подбор</button></li>
              <li><button onClick={svc("Система обучения продавцов", "obuchenie")} className={linkCls}>Обучение</button></li>
              <li><button onClick={svc("Система премирования (KPI)", "kpi")} className={linkCls}>Премирование (KPI)</button></li>
              <li><button onClick={svc("Комплексная услуга", "complex")} className={linkCls}>Комплекс</button></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-white text-[14px] font-semibold mb-4">Разделы</h4>
            <ul className="space-y-3">
              {[
                ["Как работаем", "#process"],
                ["Калькулятор KPI", "#calc"],
                ["Условия", "#terms"],
                ["Вопросы", "#faq"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className={linkCls}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-3">
            <h4 className="text-white text-[14px] font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-[14px]">
              <li><a href={site.phoneHref} className="text-white hover:text-accent-soft transition font-semibold">{site.phone}</a></li>
              <li><a href={"mailto:" + site.email} className="text-white/60 hover:text-white transition">{site.email}</a></li>
              <li className="text-white/60">{site.hours}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-white/40 text-[13px] pb-20 md:pb-0">
          <span>© {new Date().getFullYear()} {site.brand} {site.brandSuffix}. Все права защищены.</span>
          <a href="#" className="hover:text-white transition">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}

export function MobileCtaBar() {
  const { open } = useLead();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="md:hidden fixed bottom-0 inset-x-0 z-40 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-ink/95 backdrop-blur-xl border-t border-white/10"
        >
          <div className="flex gap-2">
            <a href={site.phoneHref} className="w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center text-white shrink-0" aria-label="Позвонить">
              <Phone className="w-5 h-5" strokeWidth={1.8} />
            </a>
            <button
              onClick={() =>
                open({
                  title: "Обсудим вашу задачу",
                  subtitle: "Оставьте номер — перезвоним в течение 15 минут.",
                  cta: "Жду звонка",
                  source: "mobile-bar",
                  variant: "quick",
                })
              }
              className={btn.primary + " flex-1"}
            >
              Оставить заявку
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
