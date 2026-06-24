import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { Hero } from "@/components/site/Hero";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { FeaturedProperties } from "@/components/site/FeaturedProperties";
import { YouTubeSection } from "@/components/site/YouTubeSection";
import { FounderProfile } from "@/components/site/FounderProfile";
import { ContactSection } from "@/components/site/ContactSection";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mumbai Realty — Premium Real Estate, Finance & Legal Advisory" },
      {
        name: "description",
        content:
          "Discover premium residential and commercial properties across Mumbai with end-to-end finance and legal advisory.",
      },
      { property: "og:title", content: "Mumbai Realty — Premium Real Estate in Mumbai" },
      {
        property: "og:description",
        content: "Hand-picked Mumbai properties with finance and legal expertise under one roof.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <PublicLayout>
      <Hero />
      <ServicesGrid />
      <FeaturedProperties />
      <YouTubeSection />
      <FounderProfile />
      <ContactSection />
    </PublicLayout>
  );
}
