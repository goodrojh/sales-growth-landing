"use client";
import React, { useState } from "react";
import { ArrowLeft, Check, Gift } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import type { ServiceId } from "@/lib/config";
import { btn } from "@/components/ui";

const questions: { q: string; key: string; options: { label: string; value: string }[] }[] = [
  {
    q: "Какая задача сейчас главная?",
    key: "task",
    options: [
      { label: "Найти продавцов / РОП", value: "podbor" },
      { label: "Научить команду продавать", value: "obuchenie" },
      { label: "Замотивировать на результат", value: "kpi" },
      { label: "Перезапустить отдел целиком", value: "complex" },
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
      { label: "На этой неделе", value: "сейчас" },
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
  const done = step >= questions.length;
  const q = questions[Math.min(step, questions.length - 1)];
  const discount = discountOf(answers);

  const pick = (v: string) => {
    setAnswers((a) => ({ ...a, [q.key]: v }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const finish = () => {
    const labels = Object.fromEntries(questions.map((qq) => [qq.q, qq.options.find((o) => o.value === answers[qq.key])?.label ?? "—"]));
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
    <section className="w-full py-20 md:py-28 bg-paper">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        <div className="lg:col-span-5 lg:pr-8 min-w-0">
          <h2 className="font-display text-[30px] sm:text-[36px] md:text-[44px] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
            Узнайте стоимость и свою скидку
          </h2>
          <p className="mt-5 text-muted text-[16px] leading-relaxed">
            Четыре вопроса — и мы подготовим расчёт под вашу задачу. Скидки считаются автоматически.
          </p>
          <ul className="mt-8 space-y-3 text-[15px] text-ink/80">
            {["−10% за комплекс услуг", "−10% за каждого специалиста после второго", "Цена фиксируется до старта"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-accent" strokeWidth={2.2} /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 min-w-0">
          <div className="rounded-2xl bg-white border border-line p-5 sm:p-7">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 grid grid-cols-4 gap-1.5">
                {questions.map((_, i) => (
                  <div key={i} className={"h-1 rounded-full transition-colors " + (i < step ? "bg-accent" : "bg-paper-2")} />
                ))}
              </div>
              <span className="text-[13px] font-medium text-muted tabular-nums">
                {Math.min(step + 1, questions.length)} / {questions.length}
              </span>
            </div>

                          {!done ? (
                <div key={step} className="anim-step">
                  <h3 className="font-display text-[20px] font-semibold text-ink">{q.q}</h3>
                  <div className="mt-5 grid sm:grid-cols-2 gap-2.5">
                    {q.options.map((o) => {
                      const on = answers[q.key] === o.value;
                      return (
                        <button
                          key={o.value}
                          onClick={() => pick(o.value)}
                          className={
                            "flex items-center gap-3 text-left rounded-lg border px-4 py-2.5 min-h-12 text-[14px] font-medium transition " +
                            (on ? "border-accent bg-accent/[0.06] text-ink" : "border-line text-ink/80 hover:border-ink/25")
                          }
                        >
                          <span className={"w-4 h-4 rounded-full border flex items-center justify-center shrink-0 " + (on ? "border-accent" : "border-ink/25")}>
                            {on && <span className="w-2 h-2 rounded-full bg-accent" />}
                          </span>
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div key="done" className="anim-step flex flex-col sm:flex-row sm:items-center gap-5">
                  <span className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Gift className="w-6 h-6" strokeWidth={1.6} />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-[20px] font-semibold text-ink">
                      {discount ? `Вам доступна скидка до ${discount}%` : "Готово! Подготовим расчёт"}
                    </h3>
                    <p className="text-muted text-[14px] mt-1">Оставьте телефон — назовём точную стоимость и сроки.</p>
                  </div>
                  <button onClick={finish} className={btn.primary}>
                    Получить расчёт
                  </button>
                </div>
              )}

            <div className="mt-6 pt-5 border-t border-line flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 h-10 -ml-1 px-1 text-[14px] font-medium text-muted hover:text-ink disabled:opacity-30 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Назад
              </button>
              <span className="text-[13px] text-muted">Займёт меньше минуты</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
