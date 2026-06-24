import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/hooks/use-properties";
import { PropertyCard } from "./PropertyCard";

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
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
