const stops = [
  "Manchester",
  "Stalybridge",
  "Mossley",
  "Greenfield",
  "Marsden",
  "Slaithwaite",
  "Huddersfield",
  "Mirfield",
  "Dewsbury",
  "Batley",
  "Morley",
  "Leeds",
  "Cross Gates",
  "Garforth",
  "Micklefield",
  "South Milford",
  "Ulleskelf",
  "York",
];

export const Marquee = () => {
  return (
    <div className="relative overflow-hidden border-y border-primary-foreground/10 bg-surface-dark py-6" style={{ background: "hsl(var(--surface-dark))" }}>
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {[...stops, ...stops, ...stops, ...stops].map((s, i) => (
          <span key={i} className="font-display text-2xl md:text-3xl font-medium text-primary-foreground/30 flex items-center gap-12">
            {s}
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-glow/60" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[hsl(var(--surface-dark))] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[hsl(var(--surface-dark))] to-transparent" />
    </div>
  );
};
