// Контакты и настройки — замените на реальные данные компании
export const site = {
  brand: "Вектор",
  brandSuffix: "продаж",
  phone: "+7 (900) 000-00-00",
  phoneHref: "tel:+79000000000",
  email: "hello@vector-sales.ru",
  telegram: "https://t.me/",
  whatsapp: "https://wa.me/79000000000",
  hours: "Пн–Пт, 9:00–19:00 (МСК)",
  // URL для приёма заявок (Formspree, Telegram-бот, CRM webhook).
  // Пустая строка — заявка не отправляется, показывается только экран успеха.
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
};

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p: string) => base + p;

export const services = [
  { id: "podbor", label: "Услуга подбора" },
  { id: "obuchenie", label: "Построение системы обучения" },
  { id: "kpi", label: "Разработка системы премирования (KPI)" },
  { id: "complex", label: "Комплексная услуга (подбор + обучение + KPI)" },
] as const;

export type ServiceId = (typeof services)[number]["id"];
