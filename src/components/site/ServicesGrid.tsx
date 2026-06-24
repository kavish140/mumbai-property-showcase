import { Home, Building, TrendingUp, Scale, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Sales",
    desc: "Apartments, villas, and bungalows across Mumbai's most desirable neighbourhoods.",
    bullets: ["2BHK to 5BHK options", "Off-plan & ready to move", "Verified RERA listings"],
    gradient: "from-blue-600/15 to-blue-500/5",
    iconBg: "bg-gradient-navy",
  },
  {
    icon: Building,
    title: "Commercial Real Estate",
    desc: "Grade-A offices, retail frontage, and investment-grade commercial assets in prime zones.",
    bullets: ["IT parks & co-working hubs", "High-street retail", "Warehouse & logistics"],
    gradient: "from-amber-500/15 to-amber-400/5",
    iconBg: "bg-gradient-gold",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    desc: "Strategic property investment guidance rooted in 12+ years of Mumbai market intelligence.",
    bullets: ["ROI & yield projections", "Pre-launch access", "Portfolio diversification"],
    gradient: "from-emerald-600/15 to-emerald-500/5",
    iconBg: "bg-gradient-navy",
  },
  {
    icon: Scale,
    title: "Legal & Finance Support",
    desc: "End-to-end due diligence, loan assistance, and contract expertise — your deal is safe.",
    bullets: ["Title deed checks", "Home loan tie-ups", "SPA & agreement drafting"],
    gradient: "from-purple-600/15 to-purple-500/5",
    iconBg: "bg-gradient-gold",
  },
];

export function ServicesGrid() {
  return (
    <section id="services" className="relative overflow-hidden bg-background py-28">
      {/* subtle bg decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, hsl(222 68% 40%), transparent 60%), radial-gradient(ellipse at 80% 20%, hsl(38 95% 53%), transparent 50%)",
        }}
      />
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            What We Do
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            A complete property partner
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Three disciplines, one team. Built for buyers and investors who want
            clarity — and no surprises — at every step.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map(({ icon: Icon, title, desc, bullets, gradient, iconBg }) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${gradient} p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-card-hover`}
            >
              {/* number watermark */}
              <div className="absolute -right-3 -top-4 font-display text-8xl font-bold text-foreground/[0.03] select-none">
                {(services.indexOf({ icon: Icon, title, desc, bullets, gradient, iconBg } as typeof services[number]) + 1).toString().padStart(2, "0")}
              </div>
              <div
                className={`mb-6 grid h-13 w-13 place-items-center rounded-xl ${iconBg} text-primary-foreground shadow-card transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                style={{ height: "52px", width: "52px" }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold">{title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <ul className="mt-5 space-y-2">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
