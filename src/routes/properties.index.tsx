import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { FeaturedProperties } from "@/components/site/FeaturedProperties";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [{ title: "Properties | Mumbai Realty" }],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  return (
    <PublicLayout>
      <div className="pt-12">
        <FeaturedProperties />
      </div>
    </PublicLayout>
  );
}
