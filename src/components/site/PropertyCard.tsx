import { Bath, BedDouble, MapPin, Square } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { formatINR, type Property, type PropertyStatus } from "@/types/property";

const statusVariant: Record<PropertyStatus, string> = {
  Available:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  Pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  Sold: "bg-muted text-muted-foreground border-border",
};

export function PropertyCard({ property: p, index = 0 }: { property: Property; index?: number }) {
  return (
    <Link
      to="/properties/$id"
      params={{ id: p.id }}
      className="group block"
      style={{ animationDelay: `${(index % 12) * 80}ms` }}
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
  );
}
