import { Building2, Landmark, Scale } from "lucide-react";

const disciplines = [
  { icon: Building2, label: "Real Estate", note: "12+ years across Mumbai" },
  { icon: Landmark, label: "Finance", note: "Sister practice since 2018" },
  { icon: Scale, label: "Legal & Law", note: "Launching soon" },
];

export function FounderProfile() {
  return (
    <section id="founder" className="bg-gradient-navy text-primary-foreground">
      <div className="container py-24">

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
