"use client";
import React from "react";
import { motion } from "framer-motion";
import { Flame, TrendingUp, Puzzle, CalendarClock, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset } from "@/lib/config";

const pains = [
  {
    icon: Flame,
    title: "HR-менеджер перегружен",
    text: "Вакансии продавцов висят месяцами, а на собеседования приходят «не те».",
    fix: "Берём подбор продажников на себя целиком",
  },
  {
    icon: TrendingUp,
    title: "Нужен быстрый рост продаж",
    text: "Рынок даёт шанс, а людей и системы под масштаб нет.",
    fix: "Усиливаем команду и ставим план на KPI",
  },
  {
    icon: Puzzle,
    title: "Нужен комплексный подход",
    text: "Наём, обучение и мотивация живут отдельно и не дают результата.",
    fix: "Связываем подбор, обучение и премию в одну систему",
  },
  {
    icon: CalendarClock,
    title: "HR в штат держать невыгодно",
    text: "Задача проектная — платить постоянную зарплату за неё не хочется.",
    fix: "Работаем проектно: платите только за результат этапа",
  },
];

export default function Pains() {
  const { open } = useLead();
  return (
    <section className="w-full px-5 md:px-8 py-20 md:py-[120px] bg-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[32px] overflow-hidden aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] shadow-2xl shadow-ink/20"
        >
          <img src={asset("/media/hr-tired.webp")} alt="Перегруженный HR-менеджер вечером в офисе" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
          <div className="absolute left-5 right-5 bottom-5 md:left-8 md:right-8 md:bottom-8">
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 text-white">
              <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-amber">Знакомо?</div>
              <p className="mt-2 font-display text-lg md:text-xl leading-snug">
                «Опять 40 откликов — и ни одного, кто реально умеет продавать»
              </p>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-[30px] sm:text-4xl md:text-[46px] font-semibold leading-[1.1] tracking-[-0.02em]"
          >
            Когда мы <span className="italic text-amber-deep">особенно</span> полезны
          </motion.h2>
          <p className="mt-4 text-muted text-base md:text-lg max-w-xl">
            Если узнали себя хотя бы в одном пункте — ваш отдел продаж недополучает выручку прямо сейчас.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {pains.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative rounded-[24px] bg-white border border-line p-6 overflow-hidden hover:border-amber transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-ink text-amber flex items-center justify-center">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-bold text-[17px] leading-snug">{p.title}</h3>
                <p className="mt-2 text-[14px] text-muted leading-relaxed">{p.text}</p>
                <div className="mt-4 pt-4 border-t border-dashed border-line flex items-start gap-2 text-[13px] font-semibold text-ink">
                  <ArrowRight className="w-4 h-4 text-amber-deep shrink-0 mt-0.5" />
                  {p.fix}
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() =>
              open({
                title: "Разберём именно вашу ситуацию",
                subtitle: "Расскажите, что болит в отделе продаж, — предложим план на 90 дней и оценим бюджет.",
                cta: "Получить план на 90 дней",
                source: "pains",
                variant: "full",
              })
            }
            className="mt-8 w-full sm:w-auto rounded-full px-8 py-4 bg-ink text-white font-bold hover:bg-ink-3 transition active:scale-95"
          >
            Это про нас — что делать?
          </button>
        </div>
      </div>
    </section>
  );
}
