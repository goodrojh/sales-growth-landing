import React from "react";
import { ArrowRight } from "lucide-react";
import { LeadButton } from "@/components/lead/LeadButton";
import { type ServiceId } from "@/lib/config";
import { Img } from "@/components/ui/Img";
import { SectionHeader } from "@/components/ui";

const items: { image: string; tag: string; title: string; description: string; cta: string; preset: ServiceId }[] = [
  {
    image: "resumes",
    tag: "Подбор",
    title: "Продающая вакансия и шорт-лист кандидатов",
    description: "Развёрнутые резюме с достижениями, оценкой компетенций и отзывами с прошлых мест работы.",
    cta: "Получить шорт-лист",
    preset: "podbor",
  },
  {
    image: "training",
    tag: "Обучение",
    title: "Учебные материалы и тесты для команды",
    description: "Курс по продукту и продажам с тестами для оценки знаний — автоматизированный, без ручной рутины.",
    cta: "Обсудить курс",
    preset: "obuchenie",
  },
  {
    image: "kpi",
    tag: "KPI",
    title: "Положение о премировании и калькулятор",
    description: "Понятная система премий, привязанная к целям бизнеса, и калькулятор, где каждый видит свой доход.",
    cta: "Заказать систему KPI",
    preset: "kpi",
  },
];

export default function Deliverables() {
  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHeader title="Что остаётся у вас навсегда" description="Не консультации «на словах», а инструменты, которые работают и после завершения проекта." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((post, i) => (
            <LeadButton key={post.title} lead={{
                  title: post.title,
                  subtitle: "Оставьте контакты — расскажем, как это будет выглядеть для вашей компании, и назовём сроки.",
                  cta: post.cta,
                  source: "deliverable-" + post.preset,
                  preset: [post.preset],
                }} className="reveal group text-left bg-white border border-line rounded-2xl overflow-hidden flex flex-col transition hover:shadow-[0_16px_40px_rgba(13,21,38,0.08)]" style={{ transitionDelay: (i * 0.08) + "s" }}>
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Img name={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <span className="absolute top-4 left-4 text-[12px] font-semibold bg-white/95 text-ink rounded-md px-2.5 py-1">{post.tag}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-semibold text-[19px] text-ink leading-snug">{post.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{post.description}</p>
                <span className="mt-auto pt-6 text-[14px] font-semibold text-accent inline-flex items-center gap-2">
                  {post.cta} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </LeadButton>
          ))}
        </div>
      </div>
    </section>
  );
}
