"use client";
import React from "react";
import { motion } from "framer-motion";
import { useLead } from "@/components/lead/LeadProvider";
import { asset, type ServiceId } from "@/lib/config";

const items: { image: string; tag: string; title: string; description: string; cta: string; preset: ServiceId }[] = [
  {
    image: "/media/resumes.webp",
    tag: "Подбор",
    title: "Продающая вакансия и шорт-лист кандидатов",
    description: "Развёрнутые резюме с достижениями, оценкой компетенций и отзывами с прошлых мест работы.",
    cta: "Получить шорт-лист",
    preset: "podbor",
  },
  {
    image: "/media/training.webp",
    tag: "Обучение",
    title: "Учебные материалы и тесты для команды",
    description: "Курс по продукту и продажам с тестами для оценки знаний — автоматизированный, без ручной рутины.",
    cta: "Обсудить курс",
    preset: "obuchenie",
  },
  {
    image: "/media/kpi.webp",
    tag: "KPI",
    title: "Положение о премировании и калькулятор",
    description: "Понятная система премий, привязанная к целям бизнеса, и калькулятор, где каждый видит свой доход.",
    cta: "Заказать систему KPI",
    preset: "kpi",
  },
];

export default function Deliverables() {
  const { open } = useLead();
  return (
    <section className="bg-paper py-20 md:py-24 px-5 md:px-12 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <h2 className="font-display font-semibold text-[28px] md:text-[44px] text-ink leading-[1.15] tracking-[-0.02em] max-w-2xl">
            Что остаётся у вас <span className="italic text-amber-deep">навсегда</span>
          </h2>
          <p className="text-muted max-w-sm">Не консультации «на словах», а инструменты, которые работают и после завершения проекта.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((post) => (
            <motion.div
              key={post.title}
              whileHover={{ y: -3 }}
              className="bg-white border border-line rounded-[20px] p-4 md:p-5 flex flex-col transition-all duration-200 hover:shadow-[0_12px_40px_rgba(11,17,32,0.1)] group"
            >
              <div className="relative w-full h-[220px] md:h-[240px] rounded-[14px] overflow-hidden mb-5">
                <img src={asset(post.image)} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-amber text-ink rounded-full px-3 py-1">{post.tag}</span>
              </div>
              <h3 className="font-bold text-[18px] text-ink leading-[1.35] mb-2.5">{post.title}</h3>
              <p className="text-[14px] text-muted leading-[1.6] mb-5">{post.description}</p>
              <button
                onClick={() =>
                  open({
                    title: post.title,
                    subtitle: "Оставьте контакты — расскажем, как это будет выглядеть для вашей компании, и назовём сроки.",
                    cta: post.cta,
                    source: "deliverable-" + post.preset,
                    preset: [post.preset],
                  })
                }
                className="mt-auto text-[14px] font-bold text-ink inline-flex items-center gap-1.5 hover:text-amber-deep transition-colors w-fit"
              >
                {post.cta} <span className="text-[16px] leading-none">↳</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
