"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { UserSearch, Users, Target, Coins, Check, TrendingUp, BookOpen, ArrowRight } from "lucide-react";
import { useLead, type LeadOptions } from "@/components/lead/LeadProvider";
import { asset } from "@/lib/config";
import { SectionHeader, IconBox, btn } from "@/components/ui";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Num({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <div className={"flex items-center gap-3 text-[13px] font-semibold " + (dark ? "text-white/60" : "text-muted")}>
      <span className={dark ? "text-accent-soft" : "text-accent"}>{n}</span>
      <span className={"h-px w-6 " + (dark ? "bg-white/25" : "bg-line")} />
      {label}
    </div>
  );
}

export default function Services() {
  const { open } = useLead();
  const go = (o: LeadOptions) => () => open(o);

  return (
    <section id="services" className="w-full py-20 md:py-28 bg-ink relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-accent/15 rounded-full blur-[160px] -translate-y-1/2 pointer-events-none" />

      <div className="container-x relative z-10">
        <SectionHeader
          dark
          title={
            <>
              Люди. Знания. Мотивация.
              <br />
              <span className="text-accent-soft">Одна система</span>
            </>
          }
          description="Каждую услугу можно взять отдельно. Вместе они дают эффект, который не получить по частям, — и скидку от 10%."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {/* 01 — Подбор */}
          <motion.div variants={cardVariants} className="rounded-2xl border border-white/10 p-6 md:p-8 flex flex-col group relative overflow-hidden min-h-[560px]">
            <div className="absolute inset-0 z-0">
              <img src={asset("/media/interview.webp")} alt="Собеседование кандидата в менеджеры по продажам" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/40 to-ink/95" />
            </div>

            <div className="relative z-10">
              <Num n="01" label="Подбор" dark />
              <h3 className="font-display mt-5 text-[28px] md:text-[36px] font-semibold text-white leading-[1.1] tracking-[-0.02em]">
                Находим тех, кто продаёт, <span className="text-accent-soft">а не обещает</span>
              </h3>
              <p className="text-[15px] text-white/75 leading-relaxed max-w-[440px] mt-3">
                Менеджеры по продажам, руководители отделов продаж, коммерческие директора.
              </p>
              <button
                onClick={go({
                  title: "Подберём специалиста по продажам",
                  subtitle: "Опишите, кого ищете, — упакуем вакансию и пришлём первых кандидатов с развёрнутыми резюме.",
                  cta: "Начать подбор",
                  source: "service-podbor",
                  preset: ["podbor"],
                  perks: ["Продающая вакансия под вашу задачу", "Резюме с достижениями и отзывами", "Бесплатная замена, если не прошёл испытательный"],
                })}
                className={btn.primary + " mt-6"}
              >
                Заказать подбор <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-auto pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {[
                { icon: UserSearch, t: "Подбор по компетенциям", d: "Проверяем навыки продаж, а не умение писать резюме." },
                { icon: Users, t: "Отзывы о кандидатах", d: "Собираем рекомендации с прошлых мест работы." },
              ].map((x) => (
                <div key={x.t} className="flex flex-col gap-4 p-5 rounded-xl bg-ink/50 backdrop-blur-xl border border-white/10">
                  <IconBox icon={x.icon} dark size="sm" />
                  <div>
                    <div className="text-[15px] font-semibold text-white">{x.t}</div>
                    <p className="mt-1 text-[13px] text-white/60 leading-relaxed">{x.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 02 — Обучение */}
          <motion.div variants={cardVariants} className="bg-paper rounded-2xl p-6 md:p-8 flex flex-col overflow-hidden relative min-h-[560px]">
            <Num n="02" label="Обучение" />
            <div className="w-full flex-1 flex items-center justify-center pointer-events-none select-none py-8">
              <div className="w-full max-w-[340px] bg-white border border-line rounded-xl p-5 shadow-[0_24px_60px_rgba(13,21,38,0.08)]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[12px] font-semibold text-ink/60">Курс менеджера</span>
                  <BookOpen className="w-4 h-4 text-accent" strokeWidth={1.6} />
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Продукт и ассортимент", p: 100 },
                    { label: "Этапы сделки и скрипты", p: 80 },
                    { label: "Работа с возражениями", p: 55 },
                  ].map((item, i) => (
                    <div key={item.label} className="rounded-lg p-3 border border-line">
                      <div className="flex justify-between text-[12px] font-semibold text-ink/80">
                        <span>{item.label}</span>
                        <span className="text-accent">{item.p}%</span>
                      </div>
                      <div className="mt-2 h-1 rounded-full bg-paper-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: item.p + "%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.4 + i * 0.15 }}
                          className="h-full rounded-full bg-accent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg bg-ink px-4 py-3 flex items-center justify-between">
                  <span className="text-[12px] font-medium text-white/80">Тест: 18 из 20 верно</span>
                  <Check className="h-4 w-4 text-accent-soft" />
                </div>
              </div>
            </div>
            <h3 className="font-display text-[24px] font-semibold text-ink leading-tight tracking-[-0.02em]">Новичок продаёт с первого месяца</h3>
            <p className="text-[15px] text-muted leading-relaxed mt-2">
              Разработаем учебные материалы и тесты для оценки знаний, автоматизируем обучение — без отрыва РОПа от продаж.
            </p>
            <button
              onClick={go({
                title: "Выстроим систему обучения продавцов",
                subtitle: "Расскажите о продукте и команде — предложим структуру курса и формат автоматизации.",
                cta: "Обсудить обучение",
                source: "service-obuchenie",
                preset: ["obuchenie"],
              })}
              className={btn.dark + " mt-6 self-start"}
            >
              Выстроить обучение <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* 03 — KPI */}
          <motion.div variants={cardVariants} className="bg-paper rounded-2xl overflow-hidden flex flex-col">
            <div className="h-72 relative flex items-center justify-center overflow-hidden border-b border-line p-6 md:p-8 bg-paper-2">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 hidden sm:block"
              >
                <IconBox icon={Coins} />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 left-8 hidden sm:block"
              >
                <IconBox icon={Target} />
              </motion.div>

              <div className="relative z-10 w-full max-w-[260px] flex flex-col items-center">
                <div className="bg-white rounded-xl p-3.5 shadow-[0_16px_40px_rgba(13,21,38,0.08)] border border-line flex items-center gap-3 w-full mb-8 relative">
                  <IconBox icon={TrendingUp} size="sm" />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-semibold text-ink">План выполнен на 112%</span>
                    <span className="text-[11px] text-muted">Менеджер · март</span>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-8 bg-accent/40" />
                </div>
                <div className="grid grid-cols-2 gap-3 w-full relative">
                  <div className="absolute -top-4 left-1/4 right-1/4 h-px bg-accent/40" />
                  <div className="absolute -top-4 left-1/4 w-px h-4 bg-accent/40" />
                  <div className="absolute -top-4 right-1/4 w-px h-4 bg-accent/40" />
                  {["Маржа", "Новые клиенты"].map((t) => (
                    <div key={t} className="bg-white rounded-lg p-2.5 border border-line text-center text-[11px] font-semibold text-ink flex items-center justify-center gap-1.5">
                      <Check className="w-3 h-3 text-accent" /> {t}
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-accent text-white text-[12px] font-semibold py-2 px-4 rounded-md flex items-center gap-2">
                  Премия рассчитана: 68 400 ₽
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <Num n="03" label="Премирование (KPI)" />
              <h3 className="font-display text-[24px] font-semibold text-ink leading-tight tracking-[-0.02em] mt-4">Платите за результат, а не за присутствие</h3>
              <p className="text-[15px] text-muted leading-relaxed mt-2">
                Система премий, привязанная к целевым показателям бизнеса. Опишем её и разработаем калькулятор — каждый менеджер видит, сколько заработает.
              </p>
              <button
                onClick={go({
                  title: "Разработаем систему премирования",
                  subtitle: "Привяжем премию к выручке, марже и целям бизнеса. Получите описание системы и калькулятор.",
                  cta: "Обсудить KPI",
                  source: "service-kpi",
                  preset: ["kpi"],
                })}
                className={btn.dark + " mt-6 self-start"}
              >
                Разработать KPI <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* 04 — Комплекс */}
          <motion.div variants={cardVariants} className="rounded-2xl border border-white/10 overflow-hidden flex flex-col bg-ink-2 relative">
            <div className="h-72 relative flex flex-col border-b border-white/10 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-semibold text-white">Выручка отдела</div>
                  <div className="text-[12px] text-white/50">до и после внедрения</div>
                </div>
                <span className="font-display text-accent-soft text-[28px] font-semibold">×2</span>
              </div>
              <div className="flex-1 flex items-end gap-2 md:gap-3 mt-5">
                {[30, 34, 32, 38, 52, 64, 78, 92].map((h, i) => (
                  <div key={i} className="flex-1 h-full flex flex-col justify-end">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: h + "%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                      className={"w-full rounded-t-[3px] " + (i < 4 ? "bg-white/15" : "bg-accent")}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <Num n="04" label="Комплекс · скидка от 10%" dark />
              <h3 className="font-display text-[24px] font-semibold text-white leading-tight tracking-[-0.02em] mt-4">Подбор + обучение + KPI</h3>
              <p className="text-[15px] text-white/60 leading-relaxed mt-2">
                Сильные люди, которые быстро входят в работу и мотивированы на цели бизнеса. Именно так выручка и маржа растут в 2 раза.
              </p>
              <button
                onClick={go({
                  title: "Комплексная перезагрузка отдела продаж",
                  subtitle: "Подбор, обучение и KPI в одном проекте — со скидкой от 10%. Рассчитаем стоимость под вашу команду.",
                  cta: "Рассчитать комплекс",
                  source: "service-complex",
                  preset: ["complex"],
                  perks: ["Скидка от 10% на весь проект", "Единый план внедрения на 90 дней", "Один ответственный эксперт"],
                })}
                className={btn.primary + " mt-6 self-start"}
              >
                Хочу комплекс <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
