"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Crown, Handshake, Building2, Headset, Store, Truck, FileSpreadsheet, Globe2, KeyRound } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";

const roles = [
  { icon: Handshake, name: "Менеджер по продажам B2B", d: "Длинные сделки, работа с ЛПР, тендеры" },
  { icon: Store, name: "Менеджер по продажам B2C", d: "Поток входящих, конверсия в оплату" },
  { icon: Crown, name: "Руководитель отдела продаж", d: "План, команда, контроль воронки" },
  { icon: Building2, name: "Коммерческий директор", d: "Стратегия продаж и маржинальность" },
  { icon: KeyRound, name: "Key Account Manager", d: "Ключевые клиенты и допродажи" },
  { icon: Briefcase, name: "Аккаунт-менеджер", d: "Удержание и развитие базы" },
  { icon: Truck, name: "Менеджер по работе с дилерами", d: "Дистрибуция и партнёрская сеть" },
  { icon: FileSpreadsheet, name: "Менеджер тендерного отдела", d: "Госзакупки и коммерческие тендеры" },
  { icon: Headset, name: "Менеджер по холодным продажам", d: "Исходящие звонки и назначение встреч" },
  { icon: Globe2, name: "Менеджер ВЭД-продаж", d: "Экспорт и международные контракты" },
];

export default function Roles() {
  const { open } = useLead();
  const all = [...roles, ...roles];
  return (
    <section className="bg-paper-2 py-20 md:py-24 font-sans overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-5 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="flex-1">
            <h2 className="font-display font-semibold text-[28px] md:text-[42px] text-ink mb-3 leading-tight tracking-[-0.02em]">
              Кого подбираем
            </h2>
            <p className="text-[15px] text-muted max-w-lg">
              Только продажи — поэтому знаем, чем сильный продавец отличается от того, кто хорошо проходит собеседования.
            </p>
          </div>
          <button
            onClick={() =>
              open({
                title: "Нужна другая роль в продажах?",
                subtitle: "Опишите позицию — скажем, как быстро закроем и сколько это будет стоить.",
                cta: "Обсудить вакансию",
                source: "roles-other",
                preset: ["podbor"],
              })
            }
            className="rounded-full px-6 py-3 text-sm font-bold text-ink bg-amber hover:bg-amber-2 transition-colors"
          >
            Нужна другая роль
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-paper-2 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-paper-2 to-transparent z-10 pointer-events-none" />
        <div className="flex w-max gap-4 animate-marquee pb-4 pl-4">
          {all.map((r, i) => (
            <motion.button
              key={r.name + i}
              whileHover={{ y: -4 }}
              onClick={() =>
                open({
                  title: "Подберём: " + r.name.toLowerCase(),
                  subtitle: "Оставьте контакты — уточним требования и запустим поиск.",
                  cta: "Начать подбор",
                  source: "role",
                  preset: ["podbor"],
                  extra: { role: r.name },
                })
              }
              className="w-[240px] md:w-[270px] text-left bg-white border border-line rounded-[18px] p-6 md:p-7 flex flex-col gap-3 transition-all duration-200 hover:shadow-[0_8px_28px_rgba(11,17,32,0.1)] hover:border-amber"
            >
              <div className="w-11 h-11 rounded-xl bg-ink flex items-center justify-center">
                <r.icon className="w-5 h-5 text-amber" />
              </div>
              <h3 className="font-bold text-[15px] text-ink leading-snug">{r.name}</h3>
              <p className="text-[13px] text-muted leading-[1.5]">{r.d}</p>
              <span className="mt-auto pt-2 text-[13px] font-bold text-amber-deep flex items-center gap-1">
                Подобрать <span className="text-[11px]">&#x2197;</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
