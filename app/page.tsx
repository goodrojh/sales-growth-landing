"use client";
import Hero from "@/components/sections/Hero";
import Pains from "@/components/sections/Pains";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Roles from "@/components/sections/Roles";
import KpiCalculator from "@/components/sections/KpiCalculator";
import Compare from "@/components/sections/Compare";
import Terms from "@/components/sections/Terms";
import Quiz from "@/components/sections/Quiz";
import Deliverables from "@/components/sections/Deliverables";
import FAQ from "@/components/sections/FAQ";
import Footer, { MobileCtaBar } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Pains />
      <Services />
      <Process />
      <Roles />
      <KpiCalculator />
      <Compare />
      <Terms />
      <Quiz />
      <Deliverables />
      <FAQ />
      <Footer />
      <MobileCtaBar />
    </main>
  );
}
