import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { FeaturedProperties } from "@/components/site/FeaturedProperties";
import { YouTubeSection } from "@/components/site/YouTubeSection";
import { FounderProfile } from "@/components/site/FounderProfile";
import { ContactSection, WhatsappFab } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mumbai Realty — Premium Real Estate, Finance & Legal Advisory" },
      { name: "description", content: "Discover premium residential and commercial properties across Mumbai with end-to-end finance and legal advisory." },
      { property: "og:title", content: "Mumbai Realty — Premium Real Estate in Mumbai" },
      { property: "og:description", content: "Hand-picked Mumbai properties with finance and legal expertise under one roof." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <ServicesGrid />
        <FeaturedProperties />
        <YouTubeSection />
        <FounderProfile />
        <ContactSection />
      </main>
      <Footer />
      <WhatsappFab />
    </div>
  );
}
