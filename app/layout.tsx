import type { Metadata, Viewport } from "next";
import { Inter_Tight, Inter } from "next/font/google";
import "./globals.css";
import { LeadProvider } from "@/components/lead/LeadProvider";
import RevealRoot from "@/components/ui/RevealRoot";

const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = "Вектор — повышение эффективности продаж: подбор, обучение, KPI";
const description =
  "Подбор менеджеров по продажам и РОП, система обучения и премирования (KPI) под ключ. 20+ лет опыта. Рост валовой выручки и маржи до 2 раз, эффективность персонала +70%.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", locale: "ru_RU" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0D1526",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Класс js ставится до отрисовки: анимации появления включаются только если JS работает */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <LeadProvider>{children}</LeadProvider>
        <RevealRoot />
      </body>
    </html>
  );
}
