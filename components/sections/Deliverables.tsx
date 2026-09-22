"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset, type ServiceId } from "@/lib/config";
import { SectionHeader } from "@/components/ui";

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
    <section className="bg-paper-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHeader title="Что остаётся у вас навсегда" description="Не консультации «на словах», а инструменты, которые работают и после завершения проекта." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((post, i) => (
            <motion.button
              key={post.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() =>
                open({
                  title: post.title,
                  subtitle: "Оставьте контакты — расскажем, как это будет выглядеть для вашей компании, и назовём сроки.",
                  cta: post.cta,
                  source: "deliverable-" + post.preset,
                  preset: [post.preset],
                })
              }
              className="group text-left bg-white border border-line rounded-2xl overflow-hidden flex flex-col transition hover:shadow-[0_16px_40px_rgba(13,21,38,0.08)]"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <img src={asset(post.image)} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <span className="absolute top-4 left-4 text-[12px] font-semibold bg-white/95 text-ink rounded-md px-2.5 py-1">{post.tag}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-semibold text-[19px] text-ink leading-snug">{post.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{post.description}</p>
                <span className="mt-auto pt-6 text-[14px] font-semibold text-accent inline-flex items-center gap-2">
                  {post.cta} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
