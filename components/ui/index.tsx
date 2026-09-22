import React from "react";

/** Единый заголовок секции: заголовок слева, описание справа (на десктопе). */
export function SectionHeader({
  title,
  description,
  dark = false,
  action,
  className = "",
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  dark?: boolean;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"reveal " + ("grid md:grid-cols-12 gap-5 md:gap-8 items-start mb-10 md:mb-14 " + className)}>
      <h2
        className={
          "md:col-span-7 font-display font-semibold text-[30px] sm:text-[36px] md:text-[44px] leading-[1.08] tracking-[-0.025em] " +
          (dark ? "text-white" : "text-ink")
        }
      >
        {title}
      </h2>
      {(description || action) && (
        <div className="md:col-span-5 md:pt-2 flex flex-col gap-5 md:items-start">
          {description && <p className={"text-[16px] leading-relaxed " + (dark ? "text-white/60" : "text-muted")}>{description}</p>}
          {action}
        </div>
      )}
    </div>
  );
}

/** Строгая иконка: тонкая линия в светлой плашке с рамкой. */
export function IconBox({
  icon: Icon,
  dark = false,
  size = "md",
}: {
  icon: React.ElementType;
  dark?: boolean;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "w-9 h-9" : "w-11 h-11";
  const ic = size === "sm" ? "w-[18px] h-[18px]" : "w-5 h-5";
  return (
    <span
      className={
        box +
        " rounded-lg border flex items-center justify-center shrink-0 " +
        (dark ? "border-white/15 bg-white/[0.04] text-accent-soft" : "border-line bg-white text-accent")
      }
    >
      <Icon className={ic} strokeWidth={1.6} />
    </span>
  );
}

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap h-12 px-6 rounded-lg bg-accent text-white text-[15px] font-semibold hover:bg-accent-2 active:scale-[0.98] transition shadow-[0_8px_24px_rgba(47,91,234,0.28)]",
  dark: "inline-flex items-center justify-center gap-2 whitespace-nowrap h-12 px-6 rounded-lg bg-ink text-white text-[15px] font-semibold hover:bg-ink-3 active:scale-[0.98] transition",
  light:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap h-12 px-6 rounded-lg bg-white text-ink text-[15px] font-semibold border border-line hover:border-ink/30 active:scale-[0.98] transition",
  ghostDark:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap h-12 px-6 rounded-lg bg-white/10 text-white text-[15px] font-semibold border border-white/25 hover:bg-white/20 active:scale-[0.98] transition",
  white:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap h-12 px-6 rounded-lg bg-white text-ink text-[15px] font-semibold hover:bg-paper-2 active:scale-[0.98] transition",
};
