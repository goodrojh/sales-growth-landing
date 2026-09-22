/** Адаптивная картинка: на телефоне грузится версия 960px, на десктопе — 1920px. Серверный компонент. */
export function Img({
  name,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
  ratio = "4:3",
}: {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  ratio?: "4:3" | "16:9";
}) {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "") + "/media/" + name;
  return (
    <img
      src={base + "-960.webp"}
      srcSet={`${base}-960.webp 960w, ${base}.webp 1920w`}
      sizes={sizes}
      alt={alt}
      width={1920}
      height={ratio === "4:3" ? 1434 : 1072}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
