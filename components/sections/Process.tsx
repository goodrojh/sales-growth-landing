"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Megaphone, FileText, PhoneCall, Check, Star, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset } from "@/lib/config";
import { SectionHeader, btn } from "@/components/ui";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};

function Chip({ icon: Icon, title, sub, active = false }: { icon: React.ElementType; title: string; sub: string; active?: boolean }) {
  return (
    <div
      className={
        "relative rounded-lg flex items-center gap-2.5 overflow-hidden px-3 py-2 border " +
        (active ? "bg-white border-accent/30 shadow-xl" : "bg-white/70 backdrop-blur-md border-white/60")
      }
    >
      {active && (
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-accent/10 to-transparent -skew-x-12 pointer-events-none"
        />
      )}
      <Icon className={"w-4 h-4 shrink-0 " + (active ? "text-accent" : "text-ink/60")} strokeWidth={1.6} />
      <div className="flex flex-col">
        <span className="text-[11px] font-semibold leading-none mb-1 text-ink">{title}</span>
        <span className="text-[10px] text-muted leading-none">{sub}</span>
      </div>
    </div>
  );
}

const steps = [
  {
    n: "01",
    img: "/media/vacancy.webp",
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
    img: "/media/screening.webp",
    title: "Скрининг по компетенциям",
    text: "Интервью и кейсы на реальные ситуации продаж. Отсекаем тех, кто хорошо говорит, но не закрывает сделки.",
    mock: (
      <div className="w-full bg-white/90 backdrop-blur-md rounded-lg border border-white p-3.5 shadow-xl">
        {[
          ["Выявление потребностей", 92],
          ["Работа с возражениями", 85],
          ["Закрытие сделки", 78],
        ].map(([l, v], i) => (
          <div key={l as string} className="mb-2.5 last:mb-0">
            <div className="flex justify-between text-[10px] font-semibold text-ink">
              <span>{l}</span>
              <span className="text-accent">{v}</span>
            </div>
            <div className="h-1 mt-1 rounded-full bg-paper-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: v + "%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                className="h-full bg-accent rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "03",
    img: "/media/resumes.webp",
    title: "Развёрнутое резюме",
    text: "Вы получаете не «простыню» из hh, а профиль кандидата с его достижениями в цифрах.",
    mock: (
      <div className="w-full bg-white rounded-lg p-3.5 shadow-xl border border-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-paper-2 border border-line" />
          <div>
            <div className="text-[11px] font-semibold text-ink">Кандидат · РОП</div>
            <div className="text-[10px] text-muted">B2B, дистрибуция, 8 лет</div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {["План 118%", "Команда 12 чел.", "+40% маржа", "Внедрил CRM"].map((t) => (
            <span key={t} className="text-[10px] font-semibold text-accent-deep bg-accent/8 border border-accent/15 rounded px-2 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    n: "04",
    img: "/media/references.webp",
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
  const { open } = useLead();
  return (
    <section id="process" className="w-full py-20 md:py-28 bg-paper">
      <div className="container-x">
        <SectionHeader
          title="4 шага от заявки до сильного продавца в команде"
          description="Прозрачный процесс: на каждом этапе вы видите результат и принимаете решение."
          action={
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full sm:w-auto">
              <button
                onClick={() =>
                  open({
                    title: "Покажем кандидатов уже на этой неделе",
                    subtitle: "Оставьте контакты — уточним профиль вакансии и запустим поиск.",
                    cta: "Запустить поиск",
                    source: "process-start",
                    preset: ["podbor"],
                  })
                }
                className={btn.primary}
              >
                Запустить подбор <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  open({
                    title: "Пришлём пример развёрнутого резюме",
                    subtitle: "Посмотрите, в каком виде вы будете получать кандидатов, — отправим образец в мессенджер.",
                    cta: "Получить пример",
                    source: "process-sample",
                    variant: "quick",
                  })
                }
                className={btn.light}
              >
                Пример резюме
              </button>
            </div>
          }
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10"
        >
          {steps.map((s) => (
            <motion.div key={s.n} variants={stepVariants} className="flex flex-col group">
              <div className="rounded-xl overflow-hidden relative aspect-[4/3] w-full">
                <img src={asset(s.img)} alt={s.title} className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-ink/35" />
                <div className="absolute inset-0 flex items-center justify-center p-6">{s.mock}</div>
              </div>
              <div className="mt-6 pt-5 border-t border-line">
                <span className="text-[13px] font-semibold text-accent">Шаг {s.n}</span>
                <h3 className="mt-2 font-display text-[20px] font-semibold leading-tight tracking-[-0.01em] text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
