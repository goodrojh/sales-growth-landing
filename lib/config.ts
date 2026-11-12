// Контакты и настройки — замените на реальные данные компании
export const site = {
  brand: "Вектор",
  brandSuffix: "продаж",
  phone: "+7 (981) 174-61-46",
  phoneHref: "tel:+79811746146",
  telegram: "https://t.me/",
  whatsapp: "https://wa.me/79811746146",
  hours: "Пн–Пт, 9:00–19:00 (МСК)",
  // Приём заявок и писем: FormSubmit пересылает их на почту владельца.
  // Сам адрес на сайте не показывается. Можно переопределить NEXT_PUBLIC_FORM_ENDPOINT.
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "https://formsubmit.co/ajax/oksanapavlikova@yandex.ru",
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
