"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Info } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset } from "@/lib/config";

const rub = (n: number) => Math.round(n).toLocaleString("ru-RU") + " ₽";

function coef(p: number) {
  if (p < 80) return 0;
  if (p <= 100) return 0.5 + ((p - 80) / 20) * 0.5;
  return Math.min(1.5, 1 + ((p - 100) / 100) * 2.5);
}

function Slider({ label, value, min, max, step, onChange, fmt }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; fmt: (v: number) => string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-[14px] text-white/70">{label}</span>
        <span className="font-display text-lg text-white font-semibold whitespace-nowrap pl-3">{fmt(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-amber w-full"
        style={{ ["--val" as string]: pct + "%" } as React.CSSProperties}
      />
    </label>
  );
}

export default function KpiCalculator() {
  const { open } = useLead();
  const [salary, setSalary] = useState(60000);
  const [target, setTarget] = useState(50000);
  const [rev, setRev] = useState(105);
  const [margin, setMargin] = useState(95);

  const { bonus, total, kRev, kMargin } = useMemo(() => {
    const kRev = coef(rev);
    const kMargin = coef(margin);
    const bonus = target * (0.6 * kRev + 0.4 * kMargin);
    return { bonus, total: salary + bonus, kRev, kMargin };
  }, [salary, target, rev, margin]);

  return (
    <section id="calc" className="relative w-full px-4 md:px-8 py-20 md:py-28 bg-ink overflow-hidden scroll-mt-20 grain">
      <img src={asset("/media/kpi.webp")} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.18em] uppercase text-amber">
            <Calculator className="w-4 h-4" /> Попробуйте сами
          </span>
          <h2 className="font-display text-[30px] sm:text-4xl md:text-[46px] font-semibold text-white leading-[1.1] tracking-[-0.02em] mt-4">
            Премия, которую менеджер <span className="text-gradient-amber italic">хочет</span> заработать
          </h2>
          <p className="mt-5 text-white/65 text-base md:text-lg leading-relaxed max-w-lg">
            Это демо калькулятора премии. Для вашей компании мы подберём показатели, веса и пороги под цели бизнеса — и менеджеры
            перестанут спрашивать «а сколько я получу?».
          </p>
          <ul className="mt-6 space-y-2.5 text-[14px] text-white/75">
            {["Премия растёт быстрее при перевыполнении плана", "Ниже 80% плана — премии нет: платите за результат", "Маржа в формуле — продавцы не демпингуют скидками"].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[28px] bg-white/[0.06] backdrop-blur-2xl border border-white/15 p-6 md:p-8 shadow-2xl"
        >
          <div className="space-y-6">
            <Slider label="Оклад" value={salary} min={30000} max={150000} step={5000} onChange={setSalary} fmt={rub} />
            <Slider label="Целевая премия (при 100% плана)" value={target} min={10000} max={150000} step={5000} onChange={setTarget} fmt={rub} />
            <Slider label="Выполнение плана по выручке" value={rev} min={50} max={150} step={1} onChange={setRev} fmt={(v) => v + "%"} />
            <Slider label="Выполнение плана по марже" value={margin} min={50} max={150} step={1} onChange={setMargin} fmt={(v) => v + "%"} />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="text-[12px] text-white/55">Премия</div>
              <motion.div key={Math.round(bonus)} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-display text-xl md:text-2xl text-amber font-semibold mt-1">
                {rub(bonus)}
              </motion.div>
              <div className="text-[11px] text-white/40 mt-1">
                k выручки {kRev.toFixed(2)} · k маржи {kMargin.toFixed(2)}
              </div>
            </div>
            <div className="rounded-2xl bg-amber p-4">
              <div className="text-[12px] text-ink/70">Доход за месяц</div>
              <motion.div key={Math.round(total)} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-display text-xl md:text-2xl text-ink font-semibold mt-1">
                {rub(total)}
              </motion.div>
              <div className="text-[11px] text-ink/60 mt-1">оклад + премия</div>
            </div>
          </div>

          <p className="mt-4 flex gap-2 text-[11px] text-white/40 leading-snug">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" /> Демонстрационная формула: 60% — выручка, 40% — маржа, порог 80%, ускорение после 100%.
          </p>

          <button
            onClick={() =>
              open({
                title: "Разработаем такой калькулятор для вашей команды",
                subtitle: "С вашими показателями, весами и порогами. Плюс — описание системы премирования для сотрудников.",
                cta: "Хочу систему KPI",
                source: "kpi-calculator",
                preset: ["kpi"],
                extra: { calc: `оклад ${salary}, цель ${target}, выручка ${rev}%, маржа ${margin}%` },
              })
            }
            className="mt-6 w-full h-14 rounded-full bg-white text-ink font-bold hover:bg-amber transition active:scale-[0.98]"
          >
            Хочу такой для своей команды
          </button>
        </motion.div>
      </div>
    </section>
  );
}
