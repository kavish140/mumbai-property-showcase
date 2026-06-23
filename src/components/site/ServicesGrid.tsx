import { Home, Building, TrendingUp, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  { icon: Home, title: "Residential Sales", desc: "Apartments, villas, and bungalows across Mumbai's most desirable neighborhoods." },
  { icon: Building, title: "Commercial Real Estate", desc: "Grade-A offices, retail frontage, and investment-ready commercial assets." },
  { icon: TrendingUp, title: "Investment Advisory", desc: "Strategic property investment guidance backed by our finance expertise." },
  { icon: Scale, title: "Legal & Finance Support", desc: "End-to-end title, loan, and contract support — soon a full legal practice." },
];

export function ServicesGrid() {
  return (
    <section id="services" className="bg-background py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">What we do</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">A complete property partner</h2>
          <p className="mt-4 text-muted-foreground">Three disciplines, one team. Built for buyers and investors who want clarity at every step.</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="group cursor-pointer border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <CardContent className="p-7">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-gradient-navy text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
