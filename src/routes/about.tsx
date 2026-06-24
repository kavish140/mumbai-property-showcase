import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { FounderProfile } from "@/components/site/FounderProfile";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "About Us | Mumbai Realty" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PublicLayout>
      <div className="pt-24 pb-12 text-center">
        <h1 className="font-display text-4xl font-semibold md:text-5xl">About Mumbai Realty</h1>
      </div>
      <FounderProfile />
    </PublicLayout>
  );
}
