import React from "react";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";
import { LeadButton } from "@/components/lead/LeadButton";
import { type ServiceId } from "@/lib/config";
import { Img } from "@/components/ui/Img";
import { SectionHeader, IconBox, btn } from "@/components/ui";

const plans: { name: string; tagline: string; price: string; unit: string; isPopular: boolean; preset: ServiceId[]; features: string[] }[] = [
  {
    name: "Одна услуга",
    tagline: "Закрываем конкретную задачу",
    price: "Отдельно",
    unit: "подбор, обучение или KPI",
    isPopular: false,
    preset: [],
    features: ["Любая услуга на выбор", "Фиксированная цена до старта", "Проектный формат без найма в штат", "Отчёт по каждому этапу"],
  },
  {
    name: "Комплекс",
    tagline: "Подбор + обучение + KPI",
    price: "−10%",
    unit: "и больше на весь проект",
    isPopular: true,
    preset: ["complex"],
    features: ["Всё из «Одной услуги»", "Скидка от 10% на комплекс", "Единый план внедрения", "Люди, знания и мотивация в одной системе"],
  },
  {
    name: "Команда",
    tagline: "Нужно больше двух человек",
    price: "−10%",
    unit: "за каждого следующего",
    isPopular: false,
    preset: ["podbor"],
    features: ["Подбор 3+ специалистов", "Скидка 10% за каждого следующего", "Параллельный поиск", "Сборка команды под РОПа"],
  },
];

export default function Terms() {
  return (
    <section id="terms" className="w-full py-20 md:py-28 bg-paper-2">
      <div className="container-x">
        <SectionHeader title="Прозрачные условия" description="Берите одну услугу или всё сразу. Чем больше — тем выгоднее." />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {plans.map((plan, idx) => (
            <div key={plan.name} className={"reveal " + ("flex flex-col rounded-2xl p-7 md:p-8 border " +
                (plan.isPopular ? "bg-ink text-white border-ink" : "bg-white text-ink border-line"))} style={{ transitionDelay: (idx * 0.08) + "s" }}>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-[22px]">{plan.name}</h3>
                {plan.isPopular && <span className="text-[12px] font-semibold px-2.5 py-1 rounded-md bg-accent text-white">Выгодно</span>}
              </div>
              <p className={"text-[14px] mt-1 " + (plan.isPopular ? "text-white/60" : "text-muted")}>{plan.tagline}</p>

              <div className={"mt-8 pb-8 border-b " + (plan.isPopular ? "border-white/10" : "border-line")}>
                <div className="font-display font-semibold text-[44px] leading-none tracking-[-0.03em]">{plan.price}</div>
                <div className={"mt-2 text-[13px] " + (plan.isPopular ? "text-white/50" : "text-muted")}>{plan.unit}</div>
              </div>

              <ul className="py-7 flex flex-col gap-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px]">
                    <Check className={"w-4 h-4 mt-0.5 shrink-0 " + (plan.isPopular ? "text-accent-soft" : "text-accent")} strokeWidth={2.2} />
                    <span className={plan.isPopular ? "text-white/85" : "text-ink/85"}>{f}</span>
                  </li>
                ))}
              </ul>

              <LeadButton
                lead={{
                    title: "Рассчитаем стоимость: «" + plan.name + "»",
                    subtitle: "Назовём точную цену после короткого звонка — она фиксируется в договоре до старта работ.",
                    cta: "Получить расчёт",
                    source: "terms-" + idx,
                    preset: plan.preset,
                  }}
                className={(plan.isPopular ? btn.primary : btn.dark) + " mt-auto w-full"}
              >
                Рассчитать стоимость <ArrowRight className="w-4 h-4" />
              </LeadButton>
            </div>
          ))}
        </div>

        <div className="reveal mt-5 md:mt-6 relative rounded-2xl overflow-hidden">
          <Img name="stairs" alt="" ratio="16:9" className="absolute inset-0 w-full h-full object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-ink/80" />
          <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 text-white">
            <IconBox icon={ShieldCheck} dark />
            <div className="flex-1">
              <div className="font-display font-semibold text-[20px]">Гарантия замены</div>
              <p className="text-white/65 text-[15px] mt-1">Если специалист не прошёл испытательный срок — однократно подберём замену бесплатно.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
