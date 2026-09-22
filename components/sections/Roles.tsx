import React from "react";
import { Briefcase, Crown, Handshake, Building2, Headset, Store, Truck, FileSpreadsheet, Globe2, KeyRound, ArrowUpRight } from "lucide-react";
import { LeadButton } from "@/components/lead/LeadButton";
import { SectionHeader, IconBox, btn } from "@/components/ui";

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
  return (
    <section className="bg-paper-2 py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          title="Кого подбираем"
          description="Только продажи — поэтому знаем, чем сильный продавец отличается от того, кто хорошо проходит собеседования."
          action={
            <LeadButton
              lead={{
                  title: "Нужна другая роль в продажах?",
                  subtitle: "Опишите позицию — скажем, как быстро закроем и сколько это будет стоить.",
                  cta: "Обсудить вакансию",
                  source: "roles-other",
                  preset: ["podbor"],
                }}
              className={btn.dark}
            >
              Нужна другая роль
            </LeadButton>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {roles.map((r, i) => (
            <LeadButton key={r.name} lead={{
                  title: "Подберём: " + r.name.toLowerCase(),
                  subtitle: "Оставьте контакты — уточним требования и запустим поиск.",
                  cta: "Начать подбор",
                  source: "role",
                  preset: ["podbor"],
                  extra: { role: r.name },
                }} className="reveal group text-left bg-white border border-line rounded-xl p-5 flex flex-col h-full transition hover:border-accent/40 hover:shadow-[0_12px_32px_rgba(13,21,38,0.07)]" style={{ transitionDelay: ((i % 5) * 0.06) + "s" }}>
              <div className="flex items-start justify-between">
                <IconBox icon={r.icon} size="sm" />
                <ArrowUpRight className="w-4 h-4 text-muted/60 transition group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h3 className="mt-5 font-semibold text-[15px] text-ink leading-snug">{r.name}</h3>
              <p className="mt-1.5 text-[13px] text-muted leading-[1.5]">{r.d}</p>
            </LeadButton>
          ))}
        </div>
      </div>
    </section>
  );
}
