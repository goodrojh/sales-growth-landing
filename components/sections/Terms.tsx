"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset, type ServiceId } from "@/lib/config";

const plans: { name: string; tagline: string; price: string; unit: string; isPopular: boolean; preset: ServiceId[]; features: string[] }[] = [
  {
    name: "Одна услуга",
    tagline: "Закрываем конкретную задачу.",
    price: "Отдельно",
    unit: "подбор / обучение / KPI",
    isPopular: false,
    preset: [],
    features: ["Любая услуга на выбор", "Фиксированная цена до старта", "Проектный формат без найма в штат", "Отчёт по каждому этапу"],
  },
  {
    name: "Комплекс",
    tagline: "Подбор + обучение + KPI.",
    price: "−10%",
    unit: "и больше на весь проект",
    isPopular: true,
    preset: ["complex"],
    features: ["Всё из «Одной услуги»", "Скидка от 10% на комплекс", "Единый план внедрения", "Люди, знания и мотивация в одной системе"],
  },
  {
    name: "Команда",
    tagline: "Нужно больше двух человек.",
    price: "−10%",
    unit: "за каждого следующего",
    isPopular: false,
    preset: ["podbor"],
    features: ["Подбор 3+ специалистов", "Скидка 10% за каждого следующего", "Параллельный поиск", "Сборка команды под РОПа"],
  },
];

function DotGridIcon() {
  return (
    <div className="grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-current" />
      ))}
    </div>
  );
}

export default function Terms() {
  const { open } = useLead();
  return (
    <section id="terms" className="w-full py-20 md:py-24 bg-paper overflow-hidden relative scroll-mt-20">
      <div className="text-center px-6 mb-10 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-display font-semibold text-[30px] sm:text-4xl md:text-[48px] text-ink leading-[1.08] tracking-[-0.02em]"
        >
          Прозрачные условия
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 text-sm md:text-base text-muted"
        >
          Берите одну услугу или всё сразу. Чем больше — тем выгоднее.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mx-3 md:mx-10 xl:mx-auto max-w-[1300px] relative rounded-[24px] shadow-2xl shadow-ink/20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img src={asset("/media/stairs.webp")} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-ink/30" />
        </div>

        <div className="relative z-10 bg-white/55 backdrop-blur-xl m-3 md:m-[40px] rounded-[16px] overflow-hidden border border-white/40">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-ink/10">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }}
                className={"flex flex-col px-6 md:px-8 py-8 md:py-10 " + (plan.isPopular ? "bg-white/50" : "")}
              >
                <div className="pb-7 border-b border-ink/10">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-semibold text-2xl text-ink">{plan.name}</h3>
                    {plan.isPopular && (
                      <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold tracking-[0.12em] uppercase bg-amber text-ink rounded-full">Выгодно</span>
                    )}
                  </div>
                  <p className="text-sm text-ink/80 mt-1">{plan.tagline}</p>
                  <div className="mt-7 flex flex-wrap items-baseline gap-2">
                    <span className="font-display font-semibold text-4xl md:text-5xl text-ink leading-none">{plan.price}</span>
                    <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-ink/60">{plan.unit}</span>
                  </div>
                  <button
                    onClick={() =>
                      open({
                        title: "Рассчитаем стоимость: «" + plan.name + "»",
                        subtitle: "Назовём точную цену после короткого звонка — она фиксируется в договоре до старта работ.",
                        cta: "Получить расчёт",
                        source: "terms-" + idx,
                        preset: plan.preset,
                      })
                    }
                    className={
                      "mt-6 w-full flex items-center justify-between rounded-full p-1.5 group transition-colors " +
                      (plan.isPopular ? "bg-amber text-ink hover:bg-amber-2" : "bg-ink text-white hover:bg-ink-3")
                    }
                  >
                    <span className="flex-1 px-5 py-3 text-sm font-bold text-left">Рассчитать стоимость</span>
                    <span className={"w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 " + (plan.isPopular ? "bg-ink text-amber" : "bg-amber text-ink")}>
                      <DotGridIcon />
                    </span>
                  </button>
                </div>
                <div className="pt-7 flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-sm bg-ink/5 border border-ink/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-ink stroke-[2.5]" />
                      </div>
                      <span className="text-[12px] font-semibold tracking-[0.04em] uppercase text-ink">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-3 md:mx-[40px] mb-3 md:mb-[40px] -mt-0 rounded-[16px] bg-ink/85 backdrop-blur-xl border border-white/10 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 text-white">
          <div className="w-12 h-12 rounded-2xl bg-amber flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-ink" />
          </div>
          <div className="flex-1">
            <div className="font-display font-semibold text-lg">Гарантия замены</div>
            <p className="text-white/65 text-[14px] mt-1">
              Если специалист не прошёл испытательный срок — однократно подберём замену бесплатно.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
