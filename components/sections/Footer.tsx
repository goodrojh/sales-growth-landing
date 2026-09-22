import { Phone, Send, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { LeadButton } from "@/components/lead/LeadButton";
import { site } from "@/lib/config";
import { btn } from "@/components/ui";
import { BgVideo } from "@/components/ui/perf";
import { Img } from "@/components/ui/Img";
import { Logo } from "@/components/ui/Logo";

export default function Footer() {

  const linkCls = "inline-flex items-center min-h-10 text-white/70 text-[14px] hover:text-white transition text-left";

  return (
    <footer className="w-full bg-ink">
      {/* CTA */}
      <div className="relative overflow-hidden">
        <Img name="city" alt="" ratio="16:9" className="absolute inset-0 w-full h-full object-cover" sizes="100vw" />
        <BgVideo src="/media/city.mp4" rootMargin="200px" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink" />

        <div className="container-x relative z-10 py-24 md:py-36 grid lg:grid-cols-12 gap-10 items-end">
          <h2
            className="reveal lg:col-span-8 font-display text-[36px] sm:text-[52px] md:text-[64px] font-semibold text-white leading-[1.02] tracking-[-0.035em]"
          >
            Сильный отдел продаж начинается <span className="text-accent-soft">с&nbsp;одного звонка</span>
          </h2>

          <div
            style={{ transitionDelay: "0.15s" }}
            className="reveal lg:col-span-4 flex flex-col gap-3"
          >
            <LeadButton
              lead={{
                  title: "Заполните анкету, мы свяжемся с вами",
                  subtitle: "Отметьте, какая помощь необходима, — подготовим предложение под вашу задачу.",
                  cta: "Отправить анкету",
                  source: "footer-anketa",
                  variant: "full",
                }}
              className={btn.primary + " h-14 w-full text-[16px]"}
            >
              Заполнить анкету <ArrowRight className="w-4 h-4" />
            </LeadButton>
            <a href={site.phoneHref} className={btn.ghostDark + " h-14 w-full text-[16px]"}>
              <Phone className="w-4 h-4" /> {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="container-x py-12 md:py-16 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-5 text-white">
            <Logo />
            <p className="mt-5 text-white/55 text-[14px] leading-relaxed max-w-[340px]">
              Подбор, обучение и системы премирования для отделов продаж. 20+ лет опыта построения систем управления персоналом в продажах.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { href: site.telegram, icon: Send, label: "Telegram" },
                { href: site.whatsapp, icon: MessageCircle, label: "WhatsApp" },
                { href: "mailto:" + site.email, icon: Mail, label: "Почта" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition"
                >
                  <s.icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-white text-[14px] font-semibold mb-4">Услуги</h3>
            <ul className="space-y-0.5">
              <li><LeadButton lead={{ title: "Подбор специалистов по продажам", subtitle: "Оставьте контакты — перезвоним в течение 15 минут.", source: "footer-podbor", preset: ["podbor"] }} className={linkCls}>Подбор</LeadButton></li>
              <li><LeadButton lead={{ title: "Система обучения продавцов", subtitle: "Оставьте контакты — перезвоним в течение 15 минут.", source: "footer-obuchenie", preset: ["obuchenie"] }} className={linkCls}>Обучение</LeadButton></li>
              <li><LeadButton lead={{ title: "Система премирования (KPI)", subtitle: "Оставьте контакты — перезвоним в течение 15 минут.", source: "footer-kpi", preset: ["kpi"] }} className={linkCls}>Премирование (KPI)</LeadButton></li>
              <li><LeadButton lead={{ title: "Комплексная услуга", subtitle: "Оставьте контакты — перезвоним в течение 15 минут.", source: "footer-complex", preset: ["complex"] }} className={linkCls}>Комплекс</LeadButton></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-white text-[14px] font-semibold mb-4">Разделы</h3>
            <ul className="space-y-0.5">
              {[
                ["Как работаем", "#process"],
                ["Калькулятор KPI", "#calc"],
                ["Условия", "#terms"],
                ["Вопросы", "#faq"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className={linkCls}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-3">
            <h3 className="text-white text-[14px] font-semibold mb-4">Контакты</h3>
            <ul className="space-y-0.5 text-[14px]">
              <li><a href={site.phoneHref} className="inline-flex items-center min-h-10 text-white hover:text-accent-soft transition font-semibold">{site.phone}</a></li>
              <li><a href={"mailto:" + site.email} className="inline-flex items-center min-h-10 text-white/70 hover:text-white transition">{site.email}</a></li>
              <li className="min-h-10 flex items-center text-white/70">{site.hours}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-white/60 text-[13px] pb-20 md:pb-0">
          <span>© {new Date().getFullYear()} {site.brand} {site.brandSuffix}. Все права защищены.</span>
          <a href="#" className="inline-flex items-center min-h-10 hover:text-white transition">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
