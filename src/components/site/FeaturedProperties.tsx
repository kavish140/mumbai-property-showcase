import { Bath, BedDouble, MapPin, Square, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/hooks/use-properties";
import { formatINR, type PropertyStatus } from "@/types/property";

const statusVariant: Record<PropertyStatus, string> = {
  Available:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  Pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  Sold: "bg-muted text-muted-foreground border-border",
};

export function FeaturedProperties() {
  const { properties } = useProperties();
  const featured = properties.slice(0, 6);

  return (
    <section id="properties" className="relative overflow-hidden bg-muted/40 py-28">
      {/* Section header */}
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Featured Listings
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Live in Mumbai's best addresses
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Carefully curated properties across premium micro-markets — each
              vetted, each verified.
            </p>
          </div>
          <Button
            asChild
            className="rounded-xl border-2 border-primary bg-transparent font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            variant="outline"
          >
            <Link to="/properties">
              View all properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {featured.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
            <p className="text-lg font-medium">No listings yet.</p>
            <p className="mt-2 text-sm">Add properties from the admin panel.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Link
                key={p.id}
                to="/properties/$id"
                params={{ id: p.id }}
                className="group block"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="h-full overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-400 hover:-translate-y-2 hover:border-accent/30 hover:shadow-card-hover">
                  {/* image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    {/* gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {/* badges */}
                    <Badge
                      className={`absolute left-3 top-3 border text-xs font-semibold shadow-sm ${statusVariant[p.status]}`}
                    >
                      {p.status}
                    </Badge>
                    <div className="absolute right-3 top-3 rounded-lg bg-background/90 px-2.5 py-1 text-xs font-bold text-foreground shadow-sm backdrop-blur">
                      {p.type}
                    </div>
                    {/* price on hover scrim */}
                    <div className="absolute bottom-3 left-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="font-display text-xl font-bold text-white drop-shadow-md">
                        {formatINR(p.price)}
                      </span>
                    </div>
                  </div>

                  {/* card content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-accent">
                        {p.title}
                      </h3>
                      <div className="shrink-0 font-display text-lg font-bold text-accent">
                        {formatINR(p.price)}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-accent/70" />
                      {p.location}
                    </div>
                    <div className="mt-4 flex items-center gap-5 border-t border-border pt-4 text-sm text-muted-foreground">
                      {p.bedrooms > 0 && (
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <BedDouble className="h-4 w-4" />
                          {p.bedrooms} bd
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Bath className="h-4 w-4" />
                        {p.bathrooms} ba
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Square className="h-4 w-4" />
                        {p.areaSqft.toLocaleString()} sqft
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
