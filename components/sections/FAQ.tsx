"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, UserSearch, GraduationCap, FileSignature, Phone } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { site } from "@/lib/config";

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
      answer: "Проводим скрининг по компетенциям: интервью и кейсы на реальные ситуации продаж — выявление потребностей, работа с возражениями, закрытие сделки. Затем собираем отзывы с прошлых мест работы.",
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
  { id: "podbor", label: "Подбор", icon: UserSearch },
  { id: "system", label: "Обучение и KPI", icon: GraduationCap },
  { id: "terms", label: "Условия", icon: FileSignature },
];

export default function FAQ() {
  const { open } = useLead();
  const [activeTab, setActiveTab] = useState("podbor");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper py-20 md:py-[100px] px-5 md:px-[80px] font-sans scroll-mt-20">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-[30px] md:text-[46px] font-semibold text-ink leading-tight tracking-[-0.02em] mb-3">Частые вопросы</h2>
          <p className="text-[16px] text-muted">Коротко о том, что обычно спрашивают собственники и коммерческие директора</p>
        </div>

        <div className="flex justify-start sm:justify-center gap-1 border-b border-line mb-6 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOpenIndex(null);
              }}
              className={
                "inline-flex items-center gap-2 px-4 md:px-5 py-3 text-[15px] transition-all border-b-2 whitespace-nowrap " +
                (activeTab === tab.id ? "text-ink font-bold border-amber" : "text-muted font-medium border-transparent")
              }
            >
              <tab.icon className={"w-4 h-4 " + (activeTab === tab.id ? "text-amber-deep" : "")} />
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {faqData[activeTab].map((item, index) => (
            <div key={item.question} className="border-b border-line py-5">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between items-center gap-4 text-left">
                <span className="text-[16px] font-semibold text-ink">{item.question}</span>
                <span className={"w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition " + (openIndex === index ? "bg-amber text-ink" : "bg-ink/5 text-muted")}>
                  {openIndex === index ? <X size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pr-10 text-[15px] text-ink/70 leading-[1.7]">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-ink rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber/15 flex items-center justify-center">
              <Phone className="w-5 h-5 text-amber" />
            </div>
            <div>
              <p className="font-bold text-[16px] text-white">Не нашли свой вопрос?</p>
              <p className="text-[14px] text-white/55">Эксперт ответит лично — {site.hours}</p>
            </div>
          </div>
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
            className="w-full md:w-auto bg-amber text-ink rounded-full px-7 py-3.5 text-[15px] font-bold hover:bg-amber-2 transition"
          >
            Задать вопрос
          </button>
        </div>
      </div>
    </section>
  );
}
