"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { UserSearch, Users, GraduationCap, Target, Coins, BadgePercent, Check, TrendingUp, BookOpen, ArrowUpRight } from "lucide-react";
import { useLead, type LeadOptions } from "@/components/lead/LeadProvider";
import { asset } from "@/lib/config";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function CardCta({ label, onClick, dark = false }: { label: string; onClick: () => void; dark?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={
        "group/cta mt-5 inline-flex items-center gap-3 rounded-full pl-5 pr-1.5 py-1.5 text-[14px] font-bold transition active:scale-95 " +
        (dark ? "bg-white text-ink hover:bg-amber" : "bg-ink text-white hover:bg-ink-3")
      }
    >
      {label}
      <span className={"w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover/cta:rotate-45 " + (dark ? "bg-ink text-amber" : "bg-amber text-ink")}>
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </button>
  );
}

export default function Services() {
  const { open } = useLead();
  const go = (o: LeadOptions) => () => open(o);

  return (
    <section id="services" className="w-full px-4 md:px-6 py-20 md:py-[130px] bg-ink font-sans relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber/10 rounded-full blur-[140px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 mb-12 md:mb-16 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[12px] font-bold tracking-[0.18em] uppercase text-amber"
        >
          Три рычага роста
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[30px] sm:text-4xl md:text-5xl font-semibold text-white mt-4 mb-5 leading-[1.1] tracking-[-0.02em]"
        >
          Люди. Знания. Мотивация.
          <br />
          <span className="text-gradient-amber">Одна система</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-white/60 max-w-2xl mx-auto"
        >
          Каждую услугу можно взять отдельно. Вместе они дают эффект, который не получить по частям, — и скидку от 10%.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-7xl mx-auto relative z-10"
      >
        {/* Card 1 — Подбор */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-[32px] border border-white/10 p-5 md:p-6 flex flex-col gap-8 md:gap-10 group relative overflow-hidden min-h-[560px]"
        >
          <div className="absolute inset-0 z-0">
            <img src={asset("/media/interview.webp")} alt="Собеседование кандидата в менеджеры по продажам" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/30 to-ink/90" />
          </div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber text-ink text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1">
              01 · Подбор
            </span>
            <h3 className="font-display mt-4 text-[26px] md:text-4xl font-semibold text-white leading-[1.1] tracking-tight drop-shadow-lg">
              Находим тех, кто <br />
              <span className="italic text-amber">продаёт, а не обещает</span>
            </h3>
            <p className="text-[15px] text-white/85 leading-relaxed max-w-[460px] mt-3 drop-shadow-md">
              Менеджеры по продажам, руководители отделов продаж, коммерческие директора.
            </p>
            <CardCta
              dark
              label="Заказать подбор"
              onClick={go({
                title: "Подберём специалиста по продажам",
                subtitle: "Опишите, кого ищете, — упакуем вакансию и пришлём первых кандидатов с развёрнутыми резюме.",
                cta: "Начать подбор",
                source: "service-podbor",
                preset: ["podbor"],
                perks: ["Продающая вакансия под вашу задачу", "Резюме с достижениями и отзывами", "Бесплатная замена, если не прошёл испытательный"],
              })}
            />
          </div>

          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 relative z-10">
            {[
              { icon: UserSearch, t: "Скрининг по компетенциям", d: "Проверяем навыки продаж, а не умение писать резюме." },
              { icon: Users, t: "Отзывы о кандидатах", d: "Собираем рекомендации с прошлых мест работы." },
            ].map((x) => (
              <div key={x.t} className="flex flex-col gap-3 p-5 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all group/item shadow-xl">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transition-transform group-hover/item:scale-110">
                  <x.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-white">{x.t}</span>
                  <p className="text-[12px] text-white/70 leading-relaxed">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 2 — Обучение */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-paper rounded-[32px] border border-white/10 p-5 md:p-6 flex flex-col overflow-hidden relative min-h-[520px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber/15 via-paper to-paper-2" />
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-amber/25 rounded-full blur-[80px]" />

          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pointer-events-none select-none py-6">
            <div className="w-full max-w-[320px] bg-white/60 backdrop-blur-xl border border-white rounded-[24px] p-6 shadow-2xl shadow-amber/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-ink/60 uppercase tracking-wider">Курс менеджера</span>
                <BookOpen className="w-4 h-4 text-amber-deep" />
              </div>
              <div className="space-y-3">
                {[
                  { label: "Продукт и ассортимент", p: 100 },
                  { label: "Этапы сделки и скрипты", p: 80 },
                  { label: "Работа с возражениями", p: 55 },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-white rounded-xl p-3 border border-line shadow-sm"
                  >
                    <div className="flex justify-between text-[12px] font-semibold text-ink/80">
                      <span>{item.label}</span>
                      <span className="text-amber-deep">{item.p}%</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-paper-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.p + "%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.5 + i * 0.15 }}
                        className="h-full rounded-full bg-gradient-to-r from-amber to-amber-deep"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 bg-ink rounded-full p-2 pl-4 flex items-center gap-3 shadow-lg">
                <span className="text-[11px] font-semibold text-white/80 flex-1">Тест: 18 из 20 верно</span>
                <div className="w-7 h-7 rounded-full bg-amber flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-ink stroke-[3]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto relative z-10 pt-4">
            <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-amber-deep">02 · Обучение</span>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-ink mt-2">Новичок продаёт с первого месяца</h3>
            <p className="text-[15px] text-muted leading-relaxed mt-2">
              Разработаем учебные материалы и тесты для оценки знаний, автоматизируем обучение — без отрыва РОПа от продаж.
            </p>
            <CardCta
              label="Выстроить обучение"
              onClick={go({
                title: "Выстроим систему обучения продавцов",
                subtitle: "Расскажите о продукте и команде — предложим структуру курса и формат автоматизации.",
                cta: "Обсудить обучение",
                source: "service-obuchenie",
                preset: ["obuchenie"],
              })}
            />
          </div>
        </motion.div>

        {/* Card 3 — KPI */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-paper rounded-[32px] border border-white/10 overflow-hidden flex flex-col"
        >
          <div className="bg-paper-2 h-72 relative flex items-center justify-center overflow-hidden border-b border-line p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber/10 via-paper to-paper-2" />
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-6 md:right-10 w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-md border border-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center justify-center"
            >
              <Coins className="h-6 w-6 text-amber-deep" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 left-6 md:left-10 w-16 h-16 rounded-[20px] bg-white/50 backdrop-blur-md border border-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center justify-center"
            >
              <Target className="h-7 w-7 text-ink" />
            </motion.div>

            <div className="relative z-10 w-full max-w-[260px] flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-3.5 shadow-xl border border-line flex items-center gap-3 w-full mb-8 relative"
              >
                <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center shrink-0">
                  <TrendingUp className="h-5 w-5 text-amber" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-ink">План выполнен на 112%</span>
                  <span className="text-[10px] text-muted">Менеджер · март</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-8 bg-amber/60" />
              </motion.div>
              <div className="grid grid-cols-2 gap-3 w-full relative">
                <div className="absolute -top-4 left-1/4 right-1/4 h-px bg-amber/60" />
                <div className="absolute -top-4 left-1/4 w-px h-4 bg-amber/60" />
                <div className="absolute -top-4 right-1/4 w-px h-4 bg-amber/60" />
                {["Маржа ✓", "Новые клиенты ✓"].map((t, i) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="bg-white/80 backdrop-blur-md rounded-xl p-2.5 shadow-lg border border-white text-center text-[11px] font-bold text-ink"
                  >
                    {t}
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-6 bg-amber text-ink text-[11px] font-bold py-2 px-4 rounded-full shadow-lg shadow-amber/30 flex items-center gap-2"
              >
                <Check className="h-3 w-3 stroke-[3]" /> Премия рассчитана: 68 400 ₽
              </motion.div>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-amber-deep">03 · Премирование (KPI)</span>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-ink mt-2">Платите за результат, а не за присутствие</h3>
            <p className="text-[15px] text-muted leading-relaxed mt-2">
              Система премий, привязанная к целевым показателям бизнеса. Опишем её и разработаем калькулятор — каждый менеджер видит, сколько заработает.
            </p>
            <div className="mt-auto">
              <CardCta
                label="Разработать KPI"
                onClick={go({
                  title: "Разработаем систему премирования",
                  subtitle: "Привяжем премию к выручке, марже и целям бизнеса. Получите описание системы и калькулятор.",
                  cta: "Обсудить KPI",
                  source: "service-kpi",
                  preset: ["kpi"],
                })}
              />
            </div>
          </div>
        </motion.div>

        {/* Card 4 — Комплекс */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-[32px] border border-amber/40 overflow-hidden flex flex-col bg-gradient-to-b from-ink-3 to-ink-2 relative"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber/20 rounded-full blur-[90px]" />
          <div className="h-72 relative flex flex-col items-center justify-center border-b border-white/10 p-6 md:p-8">
            <div className="w-full h-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber/15 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-amber" />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-white">Выручка отдела</div>
                    <div className="text-[10px] text-white/50">до → после внедрения</div>
                  </div>
                </div>
                <span className="font-display text-amber text-xl font-semibold">×2</span>
              </div>
              <div className="flex-1 flex items-end gap-2 md:gap-3 px-1">
                {[30, 34, 32, 38, 52, 64, 78, 92].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/5 rounded-t-lg h-full flex flex-col justify-end">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: h + "%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                      className={"w-full rounded-t-lg " + (i < 4 ? "bg-white/25" : "bg-gradient-to-t from-amber-deep to-amber-2")}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col relative z-10">
            <span className="inline-flex w-fit items-center gap-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-ink bg-amber px-3 py-1 rounded-full">
              <BadgePercent className="w-3.5 h-3.5" /> Комплекс · скидка от 10%
            </span>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-white mt-3">Подбор + обучение + KPI</h3>
            <p className="text-[15px] text-white/60 leading-relaxed mt-2">
              Сильные люди, которые быстро входят в работу и мотивированы на цели бизнеса. Именно так выручка и маржа растут в 2 раза.
            </p>
            <div className="mt-auto">
              <CardCta
                dark
                label="Хочу комплекс"
                onClick={go({
                  title: "Комплексная перезагрузка отдела продаж",
                  subtitle: "Подбор, обучение и KPI в одном проекте — со скидкой от 10%. Рассчитаем стоимость под вашу команду.",
                  cta: "Рассчитать комплекс",
                  source: "service-complex",
                  preset: ["complex"],
                  perks: ["Скидка от 10% на весь проект", "Единый план внедрения на 90 дней", "Один ответственный эксперт"],
                })}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto mt-6 flex items-center justify-center gap-2 text-white/40 text-[13px] relative z-10">
        <GraduationCap className="w-4 h-4" /> Каждую услугу можно заказать отдельно
      </div>
    </section>
  );
}
