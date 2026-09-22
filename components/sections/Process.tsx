"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Megaphone, ListChecks, FileText, PhoneCall, Check, Star } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { asset } from "@/lib/config";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
};

function Chip({ icon: Icon, title, sub, active = false, delay = 0 }: { icon: React.ElementType; title: string; sub: string; active?: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={
        "relative rounded-[10px] flex items-center gap-2.5 overflow-hidden " +
        (active ? "bg-white px-3 py-2 shadow-2xl border border-amber/40" : "bg-white/50 backdrop-blur-md border border-white/50 px-2.5 py-1.5 shadow-lg")
      }
    >
      {active && (
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-amber/25 to-transparent -skew-x-12 pointer-events-none"
        />
      )}
      <div className={"rounded-[7px] flex items-center justify-center shrink-0 " + (active ? "w-8 h-8 bg-amber/15" : "w-6 h-6 bg-white/40")}>
        <Icon className={active ? "h-4 w-4 text-amber-deep" : "h-3 w-3 text-ink/70"} />
      </div>
      <div className="flex flex-col">
        <span className={"font-bold leading-none mb-1 text-ink " + (active ? "text-[12px]" : "text-[10px]")}>{title}</span>
        <span className={"text-muted leading-none " + (active ? "text-[10px]" : "text-[8px]")}>{sub}</span>
      </div>
    </motion.div>
  );
}

const steps = [
  {
    n: "01",
    img: "/media/vacancy.webp",
    title: "Упакуем вакансию",
    text: "Превратим вашу потребность в продающую вакансию — её откликаются сильные, а не случайные.",
    mock: (
      <div className="w-full bg-white/25 backdrop-blur-2xl rounded-[15px] border border-white/40 p-4 flex flex-col gap-2 shadow-2xl">
        <Chip icon={Megaphone} title="Профиль идеального кандидата" sub="компетенции · опыт · мотивация" delay={0.3} />
        <Chip icon={Star} title="Продающий оффер" sub="Цепляет сильных продавцов" active delay={0.4} />
        <Chip icon={Check} title="Размещение" sub="hh.ru · соцсети · база" delay={0.5} />
      </div>
    ),
  },
  {
    n: "02",
    img: "/media/screening.webp",
    title: "Скрининг по компетенциям",
    text: "Интервью и кейсы на реальные ситуации продаж. Отсекаем тех, кто хорошо говорит, но не закрывает сделки.",
    mock: (
      <div className="w-full bg-white/25 backdrop-blur-2xl rounded-[15px] border border-white/40 p-4 shadow-2xl">
        {[
          ["Выявление потребностей", 92],
          ["Работа с возражениями", 85],
          ["Закрытие сделки", 78],
        ].map(([l, v], i) => (
          <div key={l as string} className="mb-2 last:mb-0">
            <div className="flex justify-between text-[10px] font-bold text-white drop-shadow">
              <span>{l}</span>
              <span>{v}/100</span>
            </div>
            <div className="h-1.5 mt-1 rounded-full bg-white/30 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: v + "%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                className="h-full bg-amber rounded-full"
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
      <div className="w-full bg-white rounded-[12px] p-3.5 shadow-2xl border border-white">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber to-amber-deep" />
          <div>
            <div className="text-[11px] font-bold text-ink">Кандидат · РОП</div>
            <div className="text-[9px] text-muted">B2B, дистрибуция, 8 лет</div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {["План 118%", "Команда 12 чел.", "+40% маржа", "CRM внедрил"].map((t) => (
            <span key={t} className="text-[9px] font-bold text-ink bg-amber/15 rounded-md px-2 py-1">
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
      <div className="w-full bg-white/25 backdrop-blur-2xl rounded-[15px] border border-white/40 p-4 flex flex-col gap-2 shadow-2xl">
        <Chip icon={PhoneCall} title="Рекомендация №1" sub="Бывший коммерческий директор" active delay={0.3} />
        <Chip icon={FileText} title="Рекомендация №2" sub="Руководитель филиала" delay={0.45} />
      </div>
    ),
  },
];

export default function Process() {
  const { open } = useLead();
  return (
    <section id="process" className="w-full px-5 md:px-12 lg:px-16 py-20 md:py-28 bg-paper relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-amber/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-14 md:mb-20 flex flex-col items-center gap-4 relative z-10"
      >
        <span className="text-[12px] font-bold tracking-[0.18em] uppercase text-amber-deep">Как проходит подбор</span>
        <h2 className="font-display font-semibold text-[30px] sm:text-4xl md:text-[48px] text-center leading-[1.1] tracking-[-0.02em] max-w-3xl">
          4 шага от заявки до сильного продавца в&nbsp;команде
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-6 mb-16 max-w-7xl mx-auto relative z-10"
      >
        {steps.map((s) => (
          <motion.div key={s.n} variants={stepVariants} className="flex flex-col gap-5 group cursor-default">
            <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
              <img src={asset(s.img)} alt={s.title} className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-ink/25" />
              <div className="absolute inset-0 flex items-center justify-center p-6 md:p-7">{s.mock}</div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="inline-flex w-fit rounded-full text-amber-deep text-xs font-bold px-3 py-1 border border-amber-deep">Шаг {s.n}</span>
              <h3 className="font-display text-xl md:text-[22px] font-semibold leading-tight">{s.title}</h3>
              <p className="text-[15px] text-muted leading-relaxed">{s.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            open({
              title: "Покажем кандидатов уже на этой неделе",
              subtitle: "Оставьте контакты — уточним профиль вакансии и запустим поиск.",
              cta: "Запустить поиск",
              source: "process-start",
              preset: ["podbor"],
            })
          }
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-amber text-ink shadow-xl shadow-amber/30"
        >
          Запустить подбор
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            open({
              title: "Пришлём пример развёрнутого резюме",
              subtitle: "Посмотрите, в каком виде вы будете получать кандидатов, — отправим образец в мессенджер.",
              cta: "Получить пример",
              source: "process-sample",
              variant: "quick",
            })
          }
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-ink border border-line shadow-lg"
        >
          Пример резюме
        </motion.button>
      </motion.div>
    </section>
  );
}
