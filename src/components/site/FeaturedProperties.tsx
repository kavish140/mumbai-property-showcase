import { Bath, BedDouble, MapPin, Square } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockProperties } from "@/data/mockProperties";
import { formatINR, type PropertyStatus } from "@/types/property";

const statusVariant: Record<PropertyStatus, string> = {
  Available: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  Pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  Sold: "bg-muted text-muted-foreground border-border",
};

export function FeaturedProperties() {
  const featured = mockProperties.slice(0, 6);
  return (
    <section id="properties" className="bg-muted/40 py-24">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Featured listings</p>
            <h2 className="font-display text-4xl font-semibold md:text-5xl">Live in Mumbai's best addresses</h2>
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View all properties
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Card
              key={p.id}
              className="group overflow-hidden border-border bg-card pt-0 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <Badge className={`absolute left-3 top-3 border ${statusVariant[p.status]}`}>{p.status}</Badge>
                <div className="absolute right-3 top-3 rounded-md bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
                  {p.type}
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold leading-tight">{p.title}</h3>
                  <div className="shrink-0 font-display text-lg font-semibold text-accent">{formatINR(p.price)}</div>
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {p.location}
                </div>
                <div className="mt-4 flex items-center gap-5 border-t border-border pt-4 text-sm text-muted-foreground">
                  {p.bedrooms > 0 && (
                    <span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4" />{p.bedrooms} bd</span>
                  )}
                  <span className="inline-flex items-center gap-1.5"><Bath className="h-4 w-4" />{p.bathrooms} ba</span>
                  <span className="inline-flex items-center gap-1.5"><Square className="h-4 w-4" />{p.areaSqft.toLocaleString()} sqft</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
