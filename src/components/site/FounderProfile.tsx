import { Building2, Landmark, Scale, Quote, Trophy, Clock } from "lucide-react";

const disciplines = [
  {
    icon: Building2,
    label: "Real Estate",
    note: "12+ years across Mumbai",
    color: "text-blue-500",
  },
  {
    icon: Landmark,
    label: "Finance",
    note: "Sister practice since 2018",
    color: "text-amber-400",
  },
  {
    icon: Scale,
    label: "Legal & Law",
    note: "Launching soon",
    color: "text-purple-400",
  },
];

const milestones = [
  { icon: Trophy, value: "500+", label: "Deals Closed" },
  { icon: Clock, value: "12 yrs", label: "Market Expertise" },
];

export function FounderProfile() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden bg-gradient-navy text-primary-foreground"
    >
      {/* decorative mesh */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full opacity-10 blur-3xl"
        style={{ background: "hsl(38 95% 53%)" }}
      />

      <div className="container relative py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_420px]">
          {/* text block */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Meet the Founder
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              A multidisciplinary edge across{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                property, capital &amp; law.
              </span>
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-primary-foreground/70">
              Most brokers simply sell. We advise. By combining a decade of deep
              Mumbai real estate experience with an established finance practice —
              and a legal arm opening soon — our clients gain one trusted team
              that sees the whole picture, negotiates the best terms, and
              protects your interests at every stage.
            </p>

            {/* quote */}
            <div className="mt-9 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur">
              <Quote className="mb-3 h-6 w-6 text-accent opacity-80" />
              <p className="text-base italic leading-relaxed text-primary-foreground/80">
                "Every transaction we do is built on transparency. You will always
                know the full picture — the opportunity, the risk, and the right
                move for you."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-gold" />
                <div>
                  <div className="font-display font-semibold text-primary-foreground">
                    Rajesh Ganatra
                  </div>
                  <div className="text-xs text-primary-foreground/60">
                    Founder, Mumbai Realty
                  </div>
                </div>
              </div>
            </div>

            {/* milestone row */}
            <div className="mt-8 flex flex-wrap gap-5">
              {milestones.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-5 py-3.5 backdrop-blur"
                >
                  <Icon className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-display text-2xl font-bold text-accent">
                      {value}
                    </div>
                    <div className="text-xs text-primary-foreground/60">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* disciplines card */}
          <div className="space-y-4">
            {disciplines.map(({ icon: Icon, label, note, color }) => (
              <div
                key={label}
                className="flex items-center gap-5 rounded-2xl border border-primary-foreground/12 bg-primary-foreground/6 p-6 backdrop-blur transition-all duration-300 hover:border-accent/30 hover:bg-primary-foreground/10"
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-primary-foreground/10">
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <div>
                  <div className="font-display text-xl font-bold">{label}</div>
                  <div className="mt-1 text-sm text-primary-foreground/60">{note}</div>
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-accent/20 bg-accent/10 p-5 text-center">
              <p className="text-sm font-medium text-primary-foreground/80">
                One team. Three disciplines. Zero compromises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
