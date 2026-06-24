import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { ServicesGrid } from "@/components/site/ServicesGrid";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [{ title: "Our Services | Mumbai Realty" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PublicLayout>
      <div className="pt-12">
        <ServicesGrid />
      </div>
    </PublicLayout>
  );
}
