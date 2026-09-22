import React from "react";
import { Flame, TrendingUp, Puzzle, CalendarClock, ArrowRight } from "lucide-react";
import { LeadButton } from "@/components/lead/LeadButton";
import { Img } from "@/components/ui/Img";
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
  return (
    <section className="w-full py-20 md:py-28 bg-paper">
      <div className="container-x">
        <SectionHeader
          title="Когда мы особенно полезны"
          description="Если узнали себя хотя бы в одном пункте — ваш отдел продаж недополучает выручку прямо сейчас."
        />

        <div className="grid lg:grid-cols-12 gap-5 md:gap-6">
          <div className="reveal lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[380px] lg:min-h-0">
            <Img name="hr-tired" alt="Перегруженный HR-менеджер вечером в офисе" className="absolute inset-0 w-full h-full object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="font-display text-white text-[20px] md:text-[22px] leading-snug font-semibold max-w-sm">
                «Опять 40 откликов — и ни одного, кто реально умеет продавать»
              </p>
              <LeadButton
                lead={{
                    title: "Разберём именно вашу ситуацию",
                    subtitle: "Расскажите, что болит в отделе продаж, — предложим план на 90 дней и оценим бюджет.",
                    cta: "Получить план на 90 дней",
                    source: "pains",
                    variant: "full",
                  }}
                className={btn.white + " mt-6"}
              >
                Это про нас — что делать? <ArrowRight className="w-4 h-4" />
              </LeadButton>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0 grid sm:grid-cols-2 gap-5 md:gap-6">
            {pains.map((p, i) => (
              <div key={p.title} className="reveal flex flex-col h-full rounded-2xl bg-white border border-line p-6 md:p-7 hover:border-accent/40 hover:shadow-[0_12px_32px_rgba(13,21,38,0.06)] transition" style={{ transitionDelay: (i * 0.08) + "s" }}>
                <IconBox icon={p.icon} />
                <h3 className="mt-6 font-display font-semibold text-[19px] leading-snug text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{p.text}</p>
                <div className="mt-auto pt-6">
                  <div className="pt-5 border-t border-line flex items-center gap-2.5 text-[14px] font-semibold text-ink">
                    <ArrowRight className="w-4 h-4 text-accent shrink-0" />
                    {p.fix}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
