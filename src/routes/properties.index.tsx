import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { useProperties } from "@/hooks/use-properties";
import { PropertyCard } from "@/components/site/PropertyCard";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [{ title: "Properties | Mumbai Realty" }],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const { properties, isLoading } = useProperties();

  return (
    <PublicLayout>
      <div className="min-h-screen bg-muted/40 py-24 pt-32">
        <div className="container">
          <div className="mb-12">
            <h1 className="font-display text-4xl font-bold md:text-5xl">All Properties</h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Browse our complete catalog of premium residential and commercial properties.
            </p>
          </div>

          {isLoading ? (
            <div className="py-20 text-center text-muted-foreground">Loading properties...</div>
          ) : properties.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
              <p className="text-lg font-medium">No listings yet.</p>
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
