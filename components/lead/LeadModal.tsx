"use client";
import React, { useState } from "react";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { X, Check, Phone, ShieldCheck, Clock, Loader2 } from "lucide-react";
import { services, site, type ServiceId } from "@/lib/config";
import type { LeadOptions } from "./LeadProvider";

/** Загружается отдельно (динамический импорт) — framer-motion не попадает в стартовый бандл. */
export default function LeadModalHost({ opts, onClose }: { opts: LeadOptions | null; onClose: () => void }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>{opts && <LeadModal key={opts.source + opts.title} opts={opts} onClose={onClose} />}</AnimatePresence>
    </LazyMotion>
  );
}

function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

function LeadModal({ opts, onClose }: { opts: LeadOptions; onClose: () => void }) {
  const variant = opts.variant ?? "full";
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [picked, setPicked] = useState<ServiceId[]>(opts.preset ?? []);

  const toggle = (id: ServiceId) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 11) {
      setError("Проверьте номер телефона");
      return;
    }
    if (!fd.get("consent")) {
      setError("Нужно согласие на обработку данных");
      return;
    }
    setError("");
    setState("sending");
    const payload = {
      source: opts.source,
      company: fd.get("company") || "",
      name: fd.get("name") || "",
      position: fd.get("position") || "",
      phone,
      email: fd.get("email") || "",
      services: picked.map((id) => services.find((s) => s.id === id)?.label).join(", "),
      ...opts.extra,
    };
    try {
      if (site.formEndpoint) {
        await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setState("done");
    } catch {
      setState("idle");
      setError("Не удалось отправить. Позвоните нам: " + site.phone);
    }
  }

  const field =
    "w-full h-12 rounded-lg bg-white border border-line px-4 text-[16px] text-ink placeholder:text-muted/70 outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition";

  return (
    <m.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={opts.title}
    >
      <div className="absolute inset-0 bg-ink/80" onClick={onClose} />
      <m.div
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative w-full sm:max-w-[560px] max-h-[94dvh] overflow-y-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl"
      >
        <div className="sm:hidden mx-auto mt-3 h-1.5 w-12 rounded-full bg-ink/15" />
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 w-10 h-10 rounded-lg border border-line hover:bg-paper flex items-center justify-center transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {state === "done" ? (
          <div className="px-6 sm:px-10 py-14 text-center">
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="mx-auto w-16 h-16 rounded-xl bg-accent flex items-center justify-center"
            >
              <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
            </m.div>
            <h3 className="font-display text-2xl font-semibold mt-6">Заявка у нас</h3>
            <p className="text-muted mt-3 max-w-sm mx-auto leading-relaxed">
              Перезвоним в течение 15 минут в рабочее время ({site.hours}). Хотите быстрее — позвоните сами.
            </p>
            <a
              href={site.phoneHref}
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-ink text-white px-6 h-12 font-semibold hover:bg-ink-3 transition"
            >
              <Phone className="w-4 h-4" /> {site.phone}
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="px-6 sm:px-10 pt-6 sm:pt-10 pb-8" noValidate>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Ответим за 15 минут
            </span>
            <h3 className="font-display text-[22px] sm:text-[26px] leading-[1.15] font-semibold mt-3 pr-10">{opts.title}</h3>
            {opts.subtitle && <p className="text-muted mt-3 text-[15px] leading-relaxed">{opts.subtitle}</p>}

            {opts.perks && (
              <ul className="mt-5 grid gap-2">
                {opts.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[14px] text-ink/80">
                    <span className="mt-0.5 w-5 h-5 rounded bg-accent/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-accent stroke-[3]" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 grid gap-3">
              {variant === "full" && (
                <input name="company" placeholder="Наименование организации" className={field} autoComplete="organization" />
              )}
              <div className={variant === "full" ? "grid sm:grid-cols-2 gap-3" : "grid gap-3"}>
                <input name="name" placeholder="Ф.И.О." className={field} autoComplete="name" required />
                {variant === "full" && <input name="position" placeholder="Должность" className={field} autoComplete="organization-title" />}
              </div>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                onFocus={() => !phone && setPhone("+7")}
                className={field}
                autoComplete="tel"
                required
              />
              {variant === "full" && <input name="email" type="email" placeholder="Электронная почта" className={field} autoComplete="email" />}
            </div>

            {variant === "full" && (
              <fieldset className="mt-5">
                <legend className="text-[13px] font-semibold text-ink/70 mb-2.5">Отметьте, какая помощь необходима</legend>
                <div className="grid sm:grid-cols-2 gap-2">
                  {services.map((s) => {
                    const on = picked.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggle(s.id)}
                        aria-pressed={on}
                        className={
                          "flex items-center gap-2.5 text-left rounded-lg border px-3.5 py-3 text-[13px] font-medium transition " +
                          (on ? "border-accent bg-accent/[0.06] text-ink" : "border-line bg-white text-ink/70 hover:border-ink/25")
                        }
                      >
                        <span
                          className={
                            "w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition " +
                            (on ? "bg-accent border-accent" : "border-ink/20")
                          }
                        >
                          {on && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </span>
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <label className="mt-5 flex items-start gap-3 text-[12px] text-muted leading-snug cursor-pointer">
              <input type="checkbox" name="consent" defaultChecked className="mt-0.5 w-4 h-4 accent-[#2f5bea]" />
              Согласен на обработку персональных данных в соответствии с 152-ФЗ
            </label>

            {error && <p className="mt-3 text-[13px] text-red-600 font-medium">{error}</p>}

            <button
              type="submit"
              disabled={state === "sending"}
              className="mt-5 w-full h-14 rounded-lg bg-accent text-white font-semibold text-[15px] hover:bg-accent-2 active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {state === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : opts.cta ?? "Отправить заявку"}
            </button>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Без спама и рассылок
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {site.hours}
              </span>
            </div>
          </form>
        )}
      </m.div>
    </m.div>
  );
}
