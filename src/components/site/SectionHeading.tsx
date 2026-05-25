export function SectionHeading({ eyebrow, title, subtitle, align = "center" }: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold text-balance md:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground text-pretty md:text-lg">{subtitle}</p>}
    </div>
  );
}
