import React from "react";
import { Megaphone, FileText, PhoneCall, Check, Star, ArrowRight } from "lucide-react";
import { LeadButton } from "@/components/lead/LeadButton";
import { Reveal } from "@/components/ui/perf";
import { Img } from "@/components/ui/Img";
import { SectionHeader, btn } from "@/components/ui";


function Chip({ icon: Icon, title, sub, active = false }: { icon: React.ElementType; title: string; sub: string; active?: boolean }) {
  return (
    <div
      className={
        "relative rounded-lg flex items-center gap-2.5 overflow-hidden px-3 py-2 border " +
        (active ? "bg-white border-accent/30 shadow-xl" : "bg-white/90 border-white/60")
      }
    >
      {active && (
        <div className="anim-scan absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-accent/10 to-transparent pointer-events-none" />
      )}
      <Icon className={"w-4 h-4 shrink-0 " + (active ? "text-accent" : "text-ink/60")} strokeWidth={1.6} />
      <div className="flex flex-col">
        <span className="text-[11px] font-semibold leading-none mb-1 text-ink">{title}</span>
        <span className="text-[11px] text-muted leading-none">{sub}</span>
      </div>
    </div>
  );
}

const steps = [
  {
    n: "01",
    img: "vacancy",
    title: "Упакуем вакансию",
    text: "Превратим вашу потребность в продающую вакансию — на неё откликаются сильные, а не случайные.",
    mock: (
      <div className="w-full flex flex-col gap-2">
        <Chip icon={Megaphone} title="Профиль кандидата" sub="компетенции · опыт · мотивация" />
        <Chip icon={Star} title="Продающий оффер" sub="Цепляет сильных продавцов" active />
        <Chip icon={Check} title="Размещение" sub="hh.ru · соцсети · база" />
      </div>
    ),
  },
  {
    n: "02",
    img: "screening",
    title: "Скрининг по компетенциям",
    text: "Интервью и кейсы на реальные ситуации продаж. Отсекаем тех, кто хорошо говорит, но не закрывает сделки.",
    mock: (
      <Reveal className="w-full bg-white/95 rounded-lg border border-white p-3.5 shadow-xl">
        {[
          ["Выявление потребностей", 92],
          ["Работа с возражениями", 85],
          ["Закрытие сделки", 78],
        ].map(([l, v], i) => (
          <div key={l as string} className="mb-2.5 last:mb-0">
            <div className="flex justify-between text-[11px] font-semibold text-ink">
              <span>{l}</span>
              <span className="text-accent">{v}</span>
            </div>
            <div className="h-1 mt-1 rounded-full bg-paper-2 overflow-hidden">
              <div className="bar-x h-full bg-accent rounded-full" style={{ ["--s" as string]: (v as number) / 100, transitionDelay: 0.2 + i * 0.15 + "s" } as React.CSSProperties} />
            </div>
          </div>
        ))}
      </Reveal>
    ),
  },
  {
    n: "03",
    img: "resumes",
    title: "Развёрнутое резюме",
    text: "Вы получаете не «простыню» из hh, а профиль кандидата с его достижениями в цифрах.",
    mock: (
      <div className="w-full bg-white rounded-lg p-3.5 shadow-xl border border-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-paper-2 border border-line" />
          <div>
            <div className="text-[11px] font-semibold text-ink">Кандидат · РОП</div>
            <div className="text-[11px] text-muted">B2B, дистрибуция, 8 лет</div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {["План 118%", "Команда 12 чел.", "+40% маржа", "Внедрил CRM"].map((t) => (
            <span key={t} className="text-[11px] font-semibold text-accent-deep bg-accent/8 border border-accent/15 rounded px-2 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    n: "04",
    img: "references",
    title: "Соберём отзывы",
    text: "Созвонимся с прошлыми руководителями. Вы узнаете о кандидате то, что не скажут на собеседовании.",
    mock: (
      <div className="w-full flex flex-col gap-2">
        <Chip icon={PhoneCall} title="Рекомендация №1" sub="Бывший коммерческий директор" active />
        <Chip icon={FileText} title="Рекомендация №2" sub="Руководитель филиала" />
      </div>
    ),
  },
];

export default function Process() {
  return (
    <section id="process" className="w-full py-20 md:py-28 bg-paper">
      <div className="container-x">
        <SectionHeader
          title="4 шага от заявки до сильного продавца в команде"
          description="Прозрачный процесс: на каждом этапе вы видите результат и принимаете решение."
          action={
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full sm:w-auto">
              <LeadButton
                lead={{
                    title: "Покажем кандидатов уже на этой неделе",
                    subtitle: "Оставьте контакты — уточним профиль вакансии и запустим поиск.",
                    cta: "Запустить поиск",
                    source: "process-start",
                    preset: ["podbor"],
                  }}
                className={btn.primary}
              >
                Запустить подбор <ArrowRight className="w-4 h-4" />
              </LeadButton>
              <LeadButton
                lead={{
                    title: "Пришлём пример развёрнутого резюме",
                    subtitle: "Посмотрите, в каком виде вы будете получать кандидатов, — отправим образец в мессенджер.",
                    cta: "Получить пример",
                    source: "process-sample",
                    variant: "quick",
                  }}
                className={btn.light}
              >
                Пример резюме
              </LeadButton>
            </div>
          }
        />

        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10">
          {steps.map((s) => (
            <div key={s.n} className="reveal flex flex-col group">
              <div className="rounded-xl overflow-hidden relative aspect-[4/3] w-full">
                <Img name={s.img} alt={s.title} className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-ink/35" />
                <div className="absolute inset-0 flex items-center justify-center p-6">{s.mock}</div>
              </div>
              <div className="mt-6 pt-5 border-t border-line">
                <span className="text-[13px] font-semibold text-accent">Шаг {s.n}</span>
                <h3 className="mt-2 font-display text-[20px] font-semibold leading-tight tracking-[-0.01em] text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
