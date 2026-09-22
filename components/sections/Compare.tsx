"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";

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
  if (v === "yes")
    return (
      <span className={"w-7 h-7 rounded-full flex items-center justify-center mx-auto " + (hl ? "bg-amber" : "bg-ink/10")}>
        <Check className="w-4 h-4 stroke-[3] text-ink" />
      </span>
    );
  if (v === "part")
    return (
      <span className="w-7 h-7 rounded-full bg-ink/5 flex items-center justify-center mx-auto">
        <Minus className="w-4 h-4 text-muted" />
      </span>
    );
  return (
    <span className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
      <X className="w-4 h-4 text-red-500/80" />
    </span>
  );
}

export default function Compare() {
  const { open } = useLead();
  return (
    <section className="w-full px-4 md:px-8 py-20 md:py-28 bg-paper">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-display text-[28px] sm:text-4xl md:text-[46px] font-semibold leading-[1.1] tracking-[-0.02em]">
            Почему не штатный HR <br className="hidden sm:block" />и не обычное агентство
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg">Честное сравнение — решайте сами.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[28px] bg-white border border-line overflow-hidden shadow-xl shadow-ink/5"
        >
          <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] text-[11px] sm:text-[13px] font-bold">
            <div className="p-3 sm:p-5" />
            <div className="p-3 sm:p-5 text-center text-muted">Штатный HR</div>
            <div className="p-3 sm:p-5 text-center text-muted">Агентство</div>
            <div className="p-3 sm:p-5 text-center bg-ink text-amber rounded-t-2xl">Мы</div>
          </div>
          {rows.map((r, i) => (
            <div key={r.label} className={"grid grid-cols-[1.5fr_repeat(3,1fr)] items-center " + (i % 2 ? "bg-paper/50" : "")}>
              <div className="p-3 sm:p-5 text-[12px] sm:text-[15px] font-medium text-ink leading-snug">{r.label}</div>
              <div className="p-3 sm:p-5">
                <Mark v={r.v[0]} />
              </div>
              <div className="p-3 sm:p-5">
                <Mark v={r.v[1]} />
              </div>
              <div className="p-3 sm:p-5 bg-ink/[0.03] h-full flex items-center">
                <Mark v={r.v[2]} hl />
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <button
            onClick={() =>
              open({
                title: "Сравните на своей задаче",
                subtitle: "Посчитаем, во что вам обходится вакансия сейчас и сколько будет стоить закрыть её с нами.",
                cta: "Получить расчёт",
                source: "compare",
              })
            }
            className="w-full sm:w-auto rounded-full px-8 py-4 bg-ink text-white font-bold hover:bg-ink-3 transition active:scale-95"
          >
            Посчитать выгоду для моей компании
          </button>
        </div>
      </div>
    </section>
  );
}
