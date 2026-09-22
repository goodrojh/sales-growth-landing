"use client";
import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { site } from "@/lib/config";
import { btn } from "@/components/ui";

export default function MobileCtaBar() {
  const { open } = useLead();
  const [show, setShow] = useState(false);
  useEffect(() => {
    let last = false;
    let ticking = false;
    const on = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const s = window.scrollY > window.innerHeight * 0.8;
        if (s !== last) {
          last = s;
          setShow(s);
        }
        ticking = false;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      aria-hidden={!show}
      className={"md:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ease-out " + (show ? "translate-y-0" : "translate-y-full") + " px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-ink border-t border-white/10"}
      inert={!show}
    >
          <div className="flex gap-2">
            <a href={site.phoneHref} className="w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center text-white shrink-0" aria-label="Позвонить">
              <Phone className="w-5 h-5" strokeWidth={1.8} />
            </a>
            <button
              onClick={() =>
                open({
                  title: "Обсудим вашу задачу",
                  subtitle: "Оставьте номер — перезвоним в течение 15 минут.",
                  cta: "Жду звонка",
                  source: "mobile-bar",
                  variant: "quick",
                })
              }
              className={btn.primary + " flex-1"}
            >
              Оставить заявку
            </button>
          </div>
        </div>
  );
}
