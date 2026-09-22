import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";
import { LeadProvider } from "@/components/lead/LeadProvider";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Вектор — повышение эффективности продаж: подбор, обучение, KPI",
  description:
    "Подбор менеджеров по продажам и РОП, система обучения и премирования (KPI) под ключ. 20+ лет опыта. Рост выручки и маржи до 2 раз, эффективность персонала +70%.",
};

export const viewport: Viewport = {
  themeColor: "#0B1120",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} antialiased`}>
      <body>
        <LeadProvider>{children}</LeadProvider>
      </body>
    </html>
  );
}
