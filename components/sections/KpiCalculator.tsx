"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset } from "@/lib/config";
import { btn } from "@/components/ui";

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
      <div className="flex justify-between items-baseline gap-3 mb-3">
        <span className="text-[14px] text-white/65">{label}</span>
        <span className="font-display text-[18px] text-white font-semibold whitespace-nowrap tabular-nums">{fmt(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-accent w-full"
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
    <section id="calc" className="relative w-full py-20 md:py-28 bg-ink overflow-hidden grain">
      <img src={asset("/media/kpi.webp")} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/70" />

      <div className="container-x relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div className="lg:col-span-6 lg:pr-10">
          <h2 className="font-display text-[30px] sm:text-[36px] md:text-[44px] font-semibold text-white leading-[1.08] tracking-[-0.025em]">
            Премия, которую менеджер <span className="text-accent-soft">хочет</span> заработать
          </h2>
          <p className="mt-5 text-white/60 text-[16px] md:text-lg leading-relaxed">
            Это демо калькулятора премии. Для вашей компании мы подберём показатели, веса и пороги под цели бизнеса — и менеджеры
            перестанут спрашивать «а сколько я получу?».
          </p>
          <ul className="mt-8 border-t border-white/10">
            {["Премия растёт быстрее при перевыполнении плана", "Ниже 80% плана — премии нет: платите за результат", "Маржа в формуле — продавцы не демпингуют скидками"].map((t, i) => (
              <li key={t} className="flex gap-4 py-4 border-b border-white/10 text-[15px] text-white/80">
                <span className="text-accent-soft font-semibold tabular-nums">0{i + 1}</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/12 p-6 md:p-8"
        >
          <div className="space-y-7">
            <Slider label="Оклад" value={salary} min={30000} max={150000} step={5000} onChange={setSalary} fmt={rub} />
            <Slider label="Целевая премия (при 100% плана)" value={target} min={10000} max={150000} step={5000} onChange={setTarget} fmt={rub} />
            <Slider label="Выполнение плана по выручке" value={rev} min={50} max={150} step={1} onChange={setRev} fmt={(v) => v + "%"} />
            <Slider label="Выполнение плана по марже" value={margin} min={50} max={150} step={1} onChange={setMargin} fmt={(v) => v + "%"} />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <div className="text-[12px] text-white/50">Премия</div>
              <div className="font-display text-[22px] md:text-[26px] text-white font-semibold mt-1 tabular-nums">{rub(bonus)}</div>
              <div className="text-[11px] text-white/40 mt-1">
                k выручки {kRev.toFixed(2)} · k маржи {kMargin.toFixed(2)}
              </div>
            </div>
            <div className="rounded-xl bg-accent p-4">
              <div className="text-[12px] text-white/75">Доход за месяц</div>
              <div className="font-display text-[22px] md:text-[26px] text-white font-semibold mt-1 tabular-nums">{rub(total)}</div>
              <div className="text-[11px] text-white/70 mt-1">оклад + премия</div>
            </div>
          </div>

          <p className="mt-4 flex gap-2 text-[12px] text-white/40 leading-snug">
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
            className={btn.white + " mt-6 w-full h-14"}
          >
            Хочу такой для своей команды
          </button>
        </motion.div>
      </div>
    </section>
  );
}
