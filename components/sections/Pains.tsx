"use client";
import React from "react";
import { motion } from "framer-motion";
import { Flame, TrendingUp, Puzzle, CalendarClock, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset } from "@/lib/config";
import { SectionHeader, IconBox, btn } from "@/components/ui";

const pains = [
  {
    icon: Flame,
    title: "HR-менеджер перегружен",
    text: "Вакансии продавцов висят месяцами, а на собеседования приходят «не те».",
    fix: "Берём подбор продажников на себя",
  },
  {
    icon: TrendingUp,
    title: "Нужен экстенсивный рост продаж",
    text: "Рынок даёт шанс, а людей и системы под масштаб нет.",
    fix: "Усиливаем команду и ставим план на KPI",
  },
  {
    icon: Puzzle,
    title: "Нужен комплексный подход",
    text: "Вы понимаете, что персоналом группы продаж нужно управлять комплексно.",
    fix: "Связываем всё в одну систему",
  },
  {
    icon: CalendarClock,
    title: "HR в штат держать невыгодно",
    text: "Не планируете держать HR-специалистов в штате — нужна проектная услуга.",
    fix: "Работаем проектно, без найма в штат",
  },
];

export default function Pains() {
  const { open } = useLead();
  return (
    <section className="w-full py-20 md:py-28 bg-paper">
      <div className="container-x">
        <SectionHeader
          title="Когда мы особенно полезны"
          description="Если узнали себя хотя бы в одном пункте — ваш отдел продаж недополучает выручку прямо сейчас."
        />

        <div className="grid lg:grid-cols-12 gap-5 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[380px] lg:min-h-0"
          >
            <img src={asset("/media/hr-tired.webp")} alt="Перегруженный HR-менеджер вечером в офисе" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="font-display text-white text-[20px] md:text-[22px] leading-snug font-semibold max-w-sm">
                «Опять 40 откликов — и ни одного, кто реально умеет продавать»
              </p>
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
                className={btn.white + " mt-6"}
              >
                Это про нас — что делать? <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5 md:gap-6">
            {pains.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col h-full rounded-2xl bg-white border border-line p-6 md:p-7 hover:border-accent/40 hover:shadow-[0_12px_32px_rgba(13,21,38,0.06)] transition"
              >
                <IconBox icon={p.icon} />
                <h3 className="mt-6 font-display font-semibold text-[19px] leading-snug text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{p.text}</p>
                <div className="mt-auto pt-6">
                  <div className="pt-5 border-t border-line flex items-center gap-2.5 text-[14px] font-semibold text-ink">
                    <ArrowRight className="w-4 h-4 text-accent shrink-0" />
                    {p.fix}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
