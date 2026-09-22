import { site } from "@/lib/config";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={"inline-flex items-center gap-2.5 font-display tracking-tight " + className}>
      <span className="w-8 h-8 rounded-md bg-accent flex items-center justify-center" aria-hidden="true">
        <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15 L10 5 L16 15" />
          <path d="M7 11h6" />
        </svg>
      </span>
      <span className="text-[17px] leading-none font-bold">
        {site.brand}
        <span className="font-semibold opacity-60"> {site.brandSuffix}</span>
      </span>
    </span>
  );
}
