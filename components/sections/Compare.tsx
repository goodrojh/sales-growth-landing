"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { SectionHeader, btn } from "@/components/ui";

type V = "yes" | "no" | "part";
const rows: { label: string; v: [V, V, V] }[] = [
  { label: "Специализация только на продажах", v: ["no", "part", "yes"] },
  { label: "Проверка навыков продаж на кейсах", v: ["part", "part", "yes"] },
  { label: "Отзывы с прошлых мест работы", v: ["part", "part", "yes"] },
  { label: "Обучение новичка после выхода", v: ["part", "no", "yes"] },
  { label: "Система премирования (KPI) и калькулятор", v: ["no", "no", "yes"] },
  { label: "Бесплатная замена кандидата", v: ["no", "part", "yes"] },
  { label: "Нет постоянных расходов на ФОТ", v: ["no", "yes", "yes"] },
  { label: "Скидка при подборе нескольких человек", v: ["no", "part", "yes"] },
];

function Mark({ v, hl }: { v: V; hl?: boolean }) {
  if (v === "yes") return <Check className={"w-5 h-5 mx-auto " + (hl ? "text-accent" : "text-ink/70")} strokeWidth={2.2} />;
  if (v === "part") return <Minus className="w-5 h-5 mx-auto text-muted/60" strokeWidth={1.8} />;
  return <X className="w-5 h-5 mx-auto text-red-500/70" strokeWidth={1.8} />;
}

export default function Compare() {
  const { open } = useLead();
  return (
    <section className="w-full py-20 md:py-28 bg-paper">
      <div className="container-x">
        <SectionHeader
          title="Почему не штатный HR и не обычное агентство"
          description="Честное сравнение — решайте сами."
          action={
            <button
              onClick={() =>
                open({
                  title: "Сравните на своей задаче",
                  subtitle: "Посчитаем, во что вам обходится вакансия сейчас и сколько будет стоить закрыть её с нами.",
                  cta: "Получить расчёт",
                  source: "compare",
                })
              }
              className={btn.dark}
            >
              Посчитать выгоду для моей компании
            </button>
          }
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-white border border-line overflow-hidden"
        >
          <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] text-[12px] sm:text-[14px] font-semibold border-b border-line">
            <div className="p-3 sm:p-5 text-muted">Критерий</div>
            <div className="p-3 sm:p-5 text-center text-muted">Штатный HR</div>
            <div className="p-3 sm:p-5 text-center text-muted">Агентство</div>
            <div className="p-3 sm:p-5 text-center bg-accent text-white">Мы</div>
          </div>
          {rows.map((r, i) => (
            <div key={r.label} className={"grid grid-cols-[1.6fr_repeat(3,1fr)] items-center " + (i < rows.length - 1 ? "border-b border-line" : "")}>
              <div className="p-3 sm:px-5 sm:py-4 text-[13px] sm:text-[15px] font-medium text-ink leading-snug">{r.label}</div>
              <div className="p-3 sm:py-4">
                <Mark v={r.v[0]} />
              </div>
              <div className="p-3 sm:py-4">
                <Mark v={r.v[1]} />
              </div>
              <div className="p-3 sm:py-4 bg-accent/[0.05] self-stretch flex items-center">
                <Mark v={r.v[2]} hl />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
