import { useState, type FormEvent } from "react";
import { MessageCircle, Mail, Phone, Send, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLeads } from "@/hooks/use-leads";
import { useSettings } from "@/hooks/use-settings";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [busy, setBusy] = useState(false);
  const { addLead } = useLeads();
  const { getSetting } = useSettings();
  
  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email, and a short message.");
      return;
    }
    setBusy(true);
    try {
      await addLead({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
        interest: null,
      });
      toast.success("Thanks! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const phone = getSetting("phone", "+91 97571 90200");
  const email = getSetting("email", "ganatraj@gmail.com");
  const whatsapp = getSetting("whatsapp", "919757190200");
  const addr1 = getSetting("address_line1", "G-54, Saidham Shopping Plaza");
  const addr2 = getSetting("address_line2", "P.K. Road, Mulund West, Mumbai");
  const hours = getSetting("business_hours", "Mon–Sat, 10am–7pm IST");

  return (
    <section id="contact" className="relative overflow-hidden bg-muted/40 py-28">
      {/* bg decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.03]"
        style={{
          background: "radial-gradient(ellipse at 100% 50%, hsl(222 68% 40%), transparent 70%)",
        }}
      />
      <div className="container relative">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          {/* left — form */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Let's Talk
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Tell us what you're{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                looking for.
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Whether you're buying, selling, or weighing an investment, drop us a
              note and we'll respond within one business day.
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-9 space-y-5 rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Full name *
                  </label>
                  <Input
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Aarav Mehta"
                    className="h-11"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    className="h-11"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Phone (optional)
                </label>
                <Input
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="+91 98xxxxxxxx"
                  className="h-11"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  How can we help? *
                </label>
                <Textarea
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Looking for a 3BHK in Bandra under ₹6 Cr…"
                  className="resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={busy}
                className="w-full rounded-xl bg-gradient-navy font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60 sm:w-auto"
              >
                <Send className="mr-2 h-4 w-4" />
                {busy ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </div>

          {/* right — contact info */}
          <div className="flex flex-col gap-5">
            {/* whatsapp card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-navy p-7 text-primary-foreground shadow-card-hover">
              <div
                aria-hidden
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
                style={{ background: "hsl(38 95% 53%)" }}
              />
              <MessageCircle className="mb-4 h-9 w-9 text-accent" />
              <h3 className="font-display text-2xl font-bold">Chat on WhatsApp</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-primary-foreground/70">
                Fastest way to reach us. We reply within minutes during business
                hours.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 rounded-xl bg-[#25D366] font-semibold text-white hover:bg-[#1aad52]"
              >
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Open WhatsApp
                </a>
              </Button>
            </div>

            {/* contact details card */}
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <h3 className="font-display text-lg font-bold">Direct Contact</h3>
              <div className="mt-5 space-y-4">
                <a
                  href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-accent/30 hover:bg-muted/50"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-navy text-primary-foreground">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="font-semibold text-foreground">{phone}</div>
                  </div>
                </a>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-accent/30 hover:bg-muted/50"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-gold text-accent-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="font-semibold text-foreground">{email}</div>
                  </div>
                </a>
                <div className="flex items-start gap-4 rounded-xl border border-border p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                    <MapPin className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Office</div>
                    <div className="text-sm font-medium text-foreground leading-relaxed">
                      {addr1},<br />{addr2}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {hours}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatsappFab() {
  const { getSetting } = useSettings();
  const whatsapp = getSetting("whatsapp", "919757190200");
  
  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-15 w-15 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card-hover transition-all hover:scale-110 hover:shadow-glow-gold"
      style={{ height: "60px", width: "60px" }}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
