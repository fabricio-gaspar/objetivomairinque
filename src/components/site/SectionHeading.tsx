export function SectionHeading({ eyebrow, title, subtitle, align = "center", size = "lg" }: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  size?: "lg" | "md";
}) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-[var(--gold)]/60" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-[var(--gold)]/60" />
        </div>
      )}
      <h2 className={`mt-4 font-bold text-balance text-primary ${size === "md" ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl lg:text-5xl"}`}>
        {title}
      </h2>
      <div className={`mt-4 flex items-center gap-2 ${isCenter ? "justify-center" : ""}`}>
        <span className="h-[2px] w-10 bg-[var(--gold)]" />
        <span className="h-[6px] w-[6px] rotate-45 bg-[var(--gold)]" />
        <span className="h-[2px] w-10 bg-[var(--gold)]" />
      </div>
      {subtitle && <p className="mt-5 text-base text-muted-foreground text-pretty md:text-lg">{subtitle}</p>}
    </div>
  );
}
