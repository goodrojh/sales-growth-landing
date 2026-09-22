import React from "react";
import { ArrowRight } from "lucide-react";
import { LeadButton } from "@/components/lead/LeadButton";
import { asset } from "@/lib/config";
import { btn } from "@/components/ui";
import { BgVideo } from "@/components/ui/perf";
import SiteHeader from "./SiteHeader";

function Stat({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  return (
    <>
      {prefix && <span className="text-accent-soft">{prefix}</span>}
      {value}
      {suffix && <span className="text-accent-soft">{suffix}</span>}
    </>
  );
}

const stats = [
  { value: <Stat value={20} suffix="+" />, title: "лет опыта", text: "в построении систем продаж" },
  { value: <Stat value={2} prefix="×" />, title: "рост валовой выручки", text: "и маржинальной прибыли" },
  { value: <Stat value={70} prefix="+" suffix="%" />, title: "эффективность", text: "персонала отдела продаж" },
  { value: <Stat value={1} />, title: "бесплатная замена", text: "если не прошёл испытательный срок" },
];

export default function Hero() {
  return (
    <section className="min-h-[100svh] flex flex-col bg-ink relative w-full overflow-hidden">
      <picture>
        <source media="(max-width: 767px)" srcSet={asset("/media/hero-mobile-720.webp") + " 720w, " + asset("/media/hero-mobile.webp") + " 1080w"} sizes="100vw" />
        <source media="(min-width: 768px)" srcSet={asset("/media/hero-desktop-960.webp") + " 960w, " + asset("/media/hero-desktop.webp") + " 1920w"} sizes="100vw" />
        <img
          src={asset("/media/hero-desktop.webp")}
          alt=""
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1072}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
      <BgVideo src="/media/hero-desktop.mp4" mobileSrc="/media/hero-mobile.mp4" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-ink/95" />

      <SiteHeader />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="container-x flex-1 flex flex-col items-center justify-center text-center pt-[112px] md:pt-[150px] pb-10 md:pb-12">
          <h1 className="font-display font-semibold text-[34px] min-[400px]:text-[38px] sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.05] tracking-[-0.035em] text-white max-w-5xl">
            Отдел продаж, который
            <br className="hidden sm:block" /> приносит <span className="text-accent-soft">в&nbsp;2&nbsp;раза</span> больше
          </h1>

          <p className="anim-rise d-2 mt-5 md:mt-6 text-[16px] md:text-lg text-white/80 max-w-[620px] leading-relaxed">
            Подберём сильных менеджеров и&nbsp;РОП, выстроим обучение и&nbsp;премирование по&nbsp;KPI. 20+ лет строим системы
            управления персоналом в&nbsp;продажах.
          </p>

          <div className="anim-rise d-3 mt-8 md:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <LeadButton
              lead={{
                title: "Бесплатный разбор вашего отдела продаж",
                subtitle: "30 минут с экспертом: где теряются деньги, кого не хватает в команде и как перестроить мотивацию.",
                cta: "Записаться на разбор",
                source: "hero",
                variant: "full",
                perks: ["Найдём 3 точки роста выручки", "Оценим состав и нагрузку команды", "Покажем пример KPI-калькулятора"],
              }}
              className={btn.primary + " h-14 px-8 text-[16px]"}
            >
              Получить бесплатный разбор <ArrowRight className="w-4 h-4" />
            </LeadButton>
            <LeadButton
              lead={{
                title: "Оставьте заявку — перезвоним за 15 минут",
                subtitle: "Эксперт уточнит задачу и предложит следующий шаг. Ни к чему не обязывает.",
                cta: "Отправить заявку",
                source: "hero-secondary",
                variant: "quick",
              }}
              className={btn.ghostDark + " h-14 px-8 text-[16px]"}
            >
              Оставить заявку
            </LeadButton>
          </div>
          <span className="anim-rise d-4 mt-4 text-[13px] text-white/65">Бесплатно · Без обязательств · Ответим за 15 минут</span>
        </div>

        <div className="anim-rise d-4 border-t border-white/10 bg-ink/70">
          <div className="container-x grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.title}
                className={
                  "py-6 md:py-9 " +
                  (i % 2 === 1 ? "pl-5 md:pl-8 border-l border-white/10 " : "pr-5 md:pr-8 ") +
                  (i === 2 ? "lg:pl-8 lg:border-l " : "") +
                  (i > 1 ? "border-t border-white/10 lg:border-t-0" : "")
                }
              >
                <div className="font-display text-[40px] md:text-[56px] font-semibold text-white leading-none tracking-[-0.03em] tabular-nums">{s.value}</div>
                <div className="mt-3 md:mt-4 text-[14px] md:text-[15px] font-semibold text-white">{s.title}</div>
                <div className="mt-1 text-[13px] text-white/60 leading-snug">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
