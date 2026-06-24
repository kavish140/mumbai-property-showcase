import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: "Contact Us | Mumbai Realty" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PublicLayout>
      <div className="pt-12">
        <ContactSection />
      </div>
    </PublicLayout>
  );
}
