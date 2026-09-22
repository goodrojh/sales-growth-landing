"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Send, MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset, site, type ServiceId } from "@/lib/config";
import { Logo } from "./Hero";

export default function Footer() {
  const { open } = useLead();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const el = videoRef.current?.parentElement;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShowVideo(true), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const svc = (title: string, preset: ServiceId) => () =>
    open({ title, subtitle: "Оставьте контакты — перезвоним в течение 15 минут.", source: "footer-" + preset, preset: [preset] });

  return (
    <section className="w-full bg-paper">
      <div className="m-2 rounded-[24px] overflow-hidden relative min-h-[100svh] md:min-h-[820px] flex flex-col font-sans bg-ink">
        <img src={asset("/media/city.webp")} alt="" className="absolute inset-0 w-full h-full object-cover z-0" loading="lazy" />
        <video ref={videoRef} autoPlay muted loop playsInline preload="none" className="absolute inset-0 w-full h-full object-cover z-0">
          {showVideo && <source src={asset("/media/city.mp4")} type="video/mp4" />}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/80 z-[1]" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 md:px-20 pt-20 pb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[36px] sm:text-[56px] md:text-[76px] font-semibold text-white leading-[1.02] tracking-[-0.03em] max-w-5xl"
          >
            Сильный отдел продаж начинается <span className="text-gradient-amber italic">с&nbsp;одного звонка</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-10 w-full max-w-[560px] flex flex-col sm:flex-row gap-3"
          >
            <a
              href={site.phoneHref}
              className="flex-1 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center gap-3 text-white text-[17px] font-semibold hover:bg-white/25 transition"
            >
              <Phone className="w-5 h-5 text-amber" /> {site.phone}
            </a>
            <button
              onClick={() =>
                open({
                  title: "Перезвоним за 15 минут",
                  subtitle: "Обсудим задачу, ответим на вопросы и предложим следующий шаг. Ни к чему не обязывает.",
                  cta: "Жду звонка",
                  source: "footer-cta",
                  variant: "quick",
                })
              }
              className="h-16 px-8 bg-amber text-ink rounded-full text-[14px] font-bold tracking-[0.06em] uppercase hover:bg-amber-2 transition whitespace-nowrap"
            >
              Заказать звонок
            </button>
          </motion.div>
          <div className="mt-5 flex items-center gap-3">
            {[
              { href: site.telegram, icon: Send, label: "Telegram" },
              { href: site.whatsapp, icon: MessageCircle, label: "WhatsApp" },
              { href: "mailto:" + site.email, icon: Mail, label: "Почта" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white/10 transition">
                <s.icon className="w-4.5 h-4.5" />
              </a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[24px] mx-3 md:mx-5 mb-3 md:mb-5 p-6 md:p-10 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-10">
            <div className="md:w-[32%] text-white">
              <Logo />
              <p className="mt-4 text-white/60 text-[13px] leading-relaxed max-w-[300px]">
                Подбор, обучение и системы премирования для отделов продаж. 20+ лет опыта построения систем управления персоналом в продажах.
              </p>
            </div>
            <div className="grid grid-cols-2 md:flex gap-8 md:gap-14">
              <div>
                <h4 className="text-white text-[13px] font-semibold mb-4">Услуги</h4>
                <ul className="space-y-2.5">
                  <li><button onClick={svc("Подбор специалистов по продажам", "podbor")} className="text-white/60 text-[13px] hover:text-white transition text-left">Подбор специалистов</button></li>
                  <li><button onClick={svc("Система обучения продавцов", "obuchenie")} className="text-white/60 text-[13px] hover:text-white transition text-left">Система обучения</button></li>
                  <li><button onClick={svc("Система премирования (KPI)", "kpi")} className="text-white/60 text-[13px] hover:text-white transition text-left">Премирование (KPI)</button></li>
                  <li><button onClick={svc("Комплексная услуга", "complex")} className="text-white/60 text-[13px] hover:text-white transition text-left">Комплекс −10%</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-[13px] font-semibold mb-4">Разделы</h4>
                <ul className="space-y-2.5">
                  {[
                    ["Как работаем", "#process"],
                    ["Калькулятор KPI", "#calc"],
                    ["Условия", "#terms"],
                    ["Вопросы", "#faq"],
                  ].map(([l, h]) => (
                    <li key={h}>
                      <a href={h} className="text-white/60 text-[13px] hover:text-white transition">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="text-white text-[13px] font-semibold mb-4">Контакты</h4>
                <ul className="space-y-2.5 text-[13px]">
                  <li><a href={site.phoneHref} className="text-white/80 hover:text-white">{site.phone}</a></li>
                  <li><a href={"mailto:" + site.email} className="text-white/60 hover:text-white">{site.email}</a></li>
                  <li className="text-white/60">{site.hours}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-white/45 text-[12px]">
            <span>© {new Date().getFullYear()} {site.brand} {site.brandSuffix}. Все права защищены.</span>
            <a href="#" className="hover:text-white">Политика конфиденциальности</a>
          </div>
        </motion.div>
      </div>
    </section>
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
          className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-gradient-to-t from-ink/60 to-transparent"
        >
          <div className="flex gap-2 rounded-full bg-ink/90 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl">
            <a href={site.phoneHref} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0" aria-label="Позвонить">
              <Phone className="w-5 h-5" />
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
              className="flex-1 h-12 rounded-full bg-amber text-ink font-bold text-[15px] flex items-center justify-center gap-2"
            >
              Оставить заявку <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
