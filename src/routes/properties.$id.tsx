import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { useEffect, useState } from "react";
import { getProperty } from "@/lib/supabase";
import type { Property } from "@/types/property";
import { Bath, BedDouble, MapPin, Square, ArrowLeft } from "lucide-react";
import { formatINR } from "@/types/property";

export const Route = createFileRoute("/properties/$id")({
  component: PropertyDetailPage,
});

function PropertyDetailPage() {
  const { id } = Route.useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperty(id).then(p => {
      setProperty(p);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="py-24 text-center text-muted-foreground animate-pulse">Loading property details...</div>
      </PublicLayout>
    );
  }

  if (!property) {
    return (
      <PublicLayout>
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold">Property not found.</h1>
          <Link to="/properties" className="mt-4 inline-block text-accent hover:underline">
            ← Back to all properties
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="container py-24">
        <Link to="/properties" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to properties
        </Link>
        
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <img src={property.imageUrl} alt={property.title} className="w-full rounded-2xl object-cover aspect-[4/3] shadow-card" />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">{property.status} • {property.type}</p>
            <h1 className="font-display text-3xl font-semibold md:text-4xl leading-tight">{property.title}</h1>
            <div className="mt-4 text-2xl font-semibold text-accent">{formatINR(property.price)}</div>
            <div className="mt-4 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" /> {property.location}
            </div>
            
            <div className="mt-8 flex items-center gap-6 border-y border-border py-6 text-sm text-muted-foreground">
              {property.bedrooms > 0 && (
                <span className="flex flex-col gap-1 items-center">
                  <BedDouble className="h-6 w-6 text-foreground" />
                  <span>{property.bedrooms} beds</span>
                </span>
              )}
              <span className="flex flex-col gap-1 items-center">
                <Bath className="h-6 w-6 text-foreground" />
                <span>{property.bathrooms} baths</span>
              </span>
              <span className="flex flex-col gap-1 items-center">
                <Square className="h-6 w-6 text-foreground" />
                <span>{property.areaSqft.toLocaleString()} sqft</span>
              </span>
            </div>
            
            <div className="mt-8 prose prose-neutral dark:prose-invert">
              <h3>About this property</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
