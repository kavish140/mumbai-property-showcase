import { Building2, Landmark, Scale } from "lucide-react";

const disciplines = [
  { icon: Building2, label: "Real Estate", note: "12+ years across Mumbai" },
  { icon: Landmark, label: "Finance", note: "Sister practice since 2018" },
  { icon: Scale, label: "Legal & Law", note: "Launching soon" },
];

export function FounderProfile() {
  return (
    <section id="founder" className="bg-gradient-navy text-primary-foreground">
      <div className="container grid items-center gap-12 py-24 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-gold opacity-30 blur-2xl" />
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80"
            alt="Founder portrait"
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-card-hover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Meet the founder</p>
          <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            A multidisciplinary edge across <span className="bg-gradient-gold bg-clip-text text-transparent">property, capital, and law.</span>
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/75">
            Most brokers sell. We advise. Combining a decade of Mumbai real estate with an established finance practice — and a legal arm opening soon — clients get one team that sees the whole picture.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {disciplines.map(({ icon: Icon, label, note }) => (
              <div key={label} className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur">
                <Icon className="mb-3 h-5 w-5 text-accent" />
                <div className="font-display text-lg font-semibold">{label}</div>
                <div className="mt-1 text-sm text-primary-foreground/65">{note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
