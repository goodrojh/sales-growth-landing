"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Phone } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { site } from "@/lib/config";
import { IconBox, btn } from "@/components/ui";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<string, FAQItem[]> = {
  podbor: [
    {
      question: "Каких специалистов вы подбираете?",
      answer: "Только продажи: менеджеров по продажам (B2B и B2C), руководителей отделов продаж и коммерческих директоров. Узкая специализация позволяет нам точно оценивать навыки продаж, а не общие «soft skills».",
    },
    {
      question: "Как вы проверяете, что кандидат действительно умеет продавать?",
      answer: "Проводим подбор по компетенциям: интервью и кейсы на реальные ситуации продаж — выявление потребностей, работа с возражениями, закрытие сделки. Затем собираем отзывы с прошлых мест работы.",
    },
    {
      question: "В каком виде я получу кандидатов?",
      answer: "Развёрнутое резюме: опыт, достижения в цифрах (выполнение плана, рост продаж, размер команды), результаты оценки компетенций и отзывы бывших руководителей. Вы тратите время только на финальные встречи.",
    },
    {
      question: "Что если сотрудник не пройдёт испытательный срок?",
      answer: "Однократно подберём замену бесплатно.",
    },
  ],
  system: [
    {
      question: "Что входит в построение системы обучения?",
      answer: "Помогаем разработать учебные материалы и тестовые вопросы для оценки знаний, а затем автоматизируем процесс обучения — новички проходят курс сами, а руководитель видит результаты.",
    },
    {
      question: "Как устроена система премирования?",
      answer: "Разрабатываем систему премий, привязанную к целевым показателям бизнеса: выручке, марже, новым клиентам и другим. Описываем её понятным языком для сотрудников и делаем калькулятор расчёта премии.",
    },
    {
      question: "У нас уже есть KPI, но они не работают. Поможете?",
      answer: "Да. Разберём текущую схему, найдём, почему она не мотивирует, и перестроим её под цели компании.",
    },
  ],
  terms: [
    {
      question: "Можно заказать только одну услугу?",
      answer: "Да. Каждую услугу можно приобрести отдельно или комплексно — как удобно вашему бизнесу.",
    },
    {
      question: "Какие есть скидки?",
      answer: "При комплексном подходе (подбор + обучение + KPI) — скидка от 10%. При подборе более 2 специалистов — скидка 10% за каждого последующего кандидата.",
    },
    {
      question: "Нужно ли брать HR-специалиста в штат?",
      answer: "Нет. Мы работаем проектно — это выгодно, если вы не планируете держать HR-специалистов в штате на постоянной основе или ваш HR-менеджер перегружен.",
    },
    {
      question: "Сколько стоят услуги?",
      answer: "Стоимость зависит от задачи, количества вакансий и объёма работ. Назовём точную цену после короткого звонка и зафиксируем её до старта.",
    },
  ],
};

const tabs = [
  { id: "podbor", label: "Подбор" },
  { id: "system", label: "Обучение и KPI" },
  { id: "terms", label: "Условия" },
];

export default function FAQ() {
  const { open } = useLead();
  const [activeTab, setActiveTab] = useState("podbor");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper py-20 md:py-28">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-8">
        <div className="lg:col-span-4 lg:pr-6">
          <h2 className="font-display text-[30px] sm:text-[36px] md:text-[44px] font-semibold text-ink leading-[1.08] tracking-[-0.025em]">Частые вопросы</h2>
          <p className="mt-5 text-[16px] text-muted leading-relaxed">Коротко о том, что обычно спрашивают собственники и коммерческие директора.</p>

          <div className="mt-8 rounded-2xl bg-white border border-line p-6">
            <IconBox icon={Phone} />
            <p className="mt-5 font-semibold text-[16px] text-ink">Не нашли свой вопрос?</p>
            <p className="mt-1 text-[14px] text-muted">Эксперт ответит лично — {site.hours}</p>
            <button
              onClick={() =>
                open({
                  title: "Задайте вопрос эксперту",
                  subtitle: "Перезвоним и ответим на любые вопросы о подборе, обучении и KPI.",
                  cta: "Задать вопрос",
                  source: "faq",
                  variant: "quick",
                })
              }
              className={btn.dark + " mt-5 w-full"}
            >
              Задать вопрос
            </button>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="inline-flex p-1 rounded-lg bg-paper-2 border border-line mb-4 max-w-full overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setOpenIndex(null);
                }}
                className={
                  "px-4 md:px-5 h-10 rounded-md text-[14px] font-medium whitespace-nowrap transition " +
                  (activeTab === tab.id ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink")
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="border-t border-line">
            {faqData[activeTab].map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.question} className="border-b border-line">
                  <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full flex justify-between items-center gap-6 text-left py-5 md:py-6">
                    <span className="text-[16px] md:text-[17px] font-semibold text-ink">{item.question}</span>
                    <span className={"w-8 h-8 rounded-md border flex items-center justify-center shrink-0 transition " + (isOpen ? "border-accent text-accent" : "border-line text-muted")}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-14 text-[15px] text-ink/70 leading-[1.7]">{item.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
