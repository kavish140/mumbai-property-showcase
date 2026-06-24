import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PublicLayout } from "@/components/site/PublicLayout";
import { useProperties } from "@/hooks/use-properties";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [{ title: "Properties | Mumbai Realty" }],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const { properties, isLoading } = useProperties();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = properties.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q)
    );
  });

  return (
    <PublicLayout>
      <div className="min-h-screen bg-muted/40 py-24 pt-32">
        <div className="container">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold md:text-5xl">All Properties</h1>
              <p className="mt-4 max-w-xl text-base text-muted-foreground">
                Browse our complete catalog of premium residential and commercial properties.
              </p>
            </div>
            
            <div className="relative w-full max-w-xs md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, location, or type..."
                className="w-full bg-background pl-9 shadow-sm"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="py-20 text-center text-muted-foreground">Loading properties...</div>
          ) : filteredProperties.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
              <p className="text-lg font-medium">No listings found.</p>
              {searchQuery && <p className="mt-2 text-sm">Try adjusting your search query.</p>}
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
