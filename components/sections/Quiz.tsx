"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Gift } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import type { ServiceId } from "@/lib/config";

const questions: { q: string; key: string; options: { label: string; value: string }[] }[] = [
  {
    q: "Какая задача сейчас главная?",
    key: "task",
    options: [
      { label: "Найти продавцов / РОП", value: "podbor" },
      { label: "Научить команду продавать", value: "obuchenie" },
      { label: "Замотивировать на результат", value: "kpi" },
      { label: "Всё сразу — перезапустить отдел", value: "complex" },
    ],
  },
  {
    q: "Сколько человек в отделе продаж?",
    key: "team",
    options: [
      { label: "Пока никого", value: "0" },
      { label: "1–5", value: "1-5" },
      { label: "6–15", value: "6-15" },
      { label: "Больше 15", value: "15+" },
    ],
  },
  {
    q: "Сколько специалистов нужно подобрать?",
    key: "hires",
    options: [
      { label: "Не нужно", value: "0" },
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3 и больше", value: "3+" },
    ],
  },
  {
    q: "Когда хотите начать?",
    key: "when",
    options: [
      { label: "Срочно, на этой неделе", value: "сейчас" },
      { label: "В течение месяца", value: "месяц" },
      { label: "Присматриваюсь", value: "позже" },
    ],
  },
];

function discountOf(a: Record<string, string>) {
  let d = 0;
  if (a.task === "complex") d += 10;
  if (a.hires === "3+") d += 10;
  return d;
}

export default function Quiz() {
  const { open } = useLead();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const q = questions[step];
  const done = step >= questions.length;
  const discount = discountOf(answers);

  const pick = (v: string) => {
    setAnswers((a) => ({ ...a, [q.key]: v }));
    setStep((s) => s + 1);
  };

  const finish = () => {
    const labels = Object.fromEntries(
      questions.map((qq) => [qq.q, qq.options.find((o) => o.value === answers[qq.key])?.label ?? "—"])
    );
    open({
      title: discount ? `Ваша скидка — до ${discount}%. Куда отправить расчёт?` : "Расчёт готов. Куда отправить?",
      subtitle: "Эксперт позвонит, уточнит 2–3 детали и назовёт точную стоимость с учётом скидок.",
      cta: "Получить расчёт",
      source: "quiz",
      variant: "quick",
      preset: [answers.task as ServiceId],
      extra: labels,
    });
  };

  return (
    <section className="w-full px-4 md:px-8 py-20 md:py-28 bg-paper-2">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[12px] font-bold tracking-[0.18em] uppercase text-amber-deep">1 минута · 4 вопроса</span>
          <h2 className="font-display text-[28px] sm:text-4xl md:text-[46px] font-semibold leading-[1.1] tracking-[-0.02em] mt-3">
            Узнайте стоимость и&nbsp;свою скидку
          </h2>
        </div>

        <div className="rounded-[28px] bg-white border border-line shadow-xl shadow-ink/5 p-5 sm:p-8 md:p-10 min-h-[420px] flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-1.5 rounded-full bg-paper-2 overflow-hidden">
              <motion.div className="h-full bg-amber rounded-full" animate={{ width: (Math.min(step, questions.length) / questions.length) * 100 + "%" }} />
            </div>
            <span className="text-[13px] font-bold text-muted tabular-nums">
              {Math.min(step + 1, questions.length)}/{questions.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="flex-1">
                <h3 className="font-display text-xl md:text-2xl font-semibold">{q.q}</h3>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {q.options.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => pick(o.value)}
                      className={
                        "text-left rounded-2xl border px-5 py-4 text-[15px] font-semibold transition hover:border-amber hover:bg-amber/5 active:scale-[0.98] " +
                        (answers[q.key] === o.value ? "border-amber bg-amber/10" : "border-line")
                      }
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber flex items-center justify-center shadow-[0_12px_32px_rgba(242,165,58,0.4)]">
                  <Gift className="w-8 h-8 text-ink" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mt-6">
                  {discount ? (
                    <>
                      Вам доступна скидка <span className="text-amber-deep">до {discount}%</span>
                    </>
                  ) : (
                    "Готово! Подготовим расчёт"
                  )}
                </h3>
                <p className="text-muted mt-3 max-w-md">Оставьте телефон — назовём точную стоимость и сроки под вашу задачу.</p>
                <button onClick={finish} className="mt-7 w-full sm:w-auto rounded-full px-10 h-14 bg-ink text-white font-bold hover:bg-ink-3 transition active:scale-95">
                  Получить расчёт
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-muted disabled:opacity-0 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Назад
            </button>
            {!done && answers[q?.key] && (
              <button onClick={() => setStep((s) => s + 1)} className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink">
                Далее <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
