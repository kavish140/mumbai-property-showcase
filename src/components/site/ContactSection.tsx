import { useState, type FormEvent } from "react";
import { MessageCircle, Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email, and a short message.");
      return;
    }
    toast.success("Thanks! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <section id="contact" className="bg-muted/40 py-24">
      <div className="container grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Let's talk</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Tell us what you're looking for.</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">Whether you're buying, selling, or weighing an investment, we'll get back within one business day.</p>

          <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-card sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Full name</label>
              <Input value={form.name} onChange={set("name")} placeholder="Aarav Mehta" />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</label>
              <Input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Phone (optional)</label>
              <Input value={form.phone} onChange={set("phone")} placeholder="+91 98xxxxxxxx" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">How can we help?</label>
              <Textarea rows={5} value={form.message} onChange={set("message")} placeholder="Looking for a 3BHK in Bandra under ₹6 Cr…" />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
                <Send className="mr-2 h-4 w-4" /> Send message
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <Card className="border-border bg-gradient-navy text-primary-foreground shadow-card">
            <CardContent className="p-7">
              <MessageCircle className="mb-4 h-8 w-8 text-accent" />
              <h3 className="font-display text-2xl font-semibold">Chat on WhatsApp</h3>
              <p className="mt-2 text-sm text-primary-foreground/75">Fastest way to reach us. Reply within minutes during business hours.</p>
              <Button asChild size="lg" className="mt-5 bg-accent text-accent-foreground hover:bg-accent/90">
                <a href="https://wa.me/919757190200" target="_blank" rel="noreferrer">Open WhatsApp</a>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-border bg-card shadow-card">
            <CardContent className="space-y-3 p-7">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-accent" /> <span className="text-foreground">+91 97571 90200</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-accent" /> <span className="text-foreground">hello@mumbairealty.in</span>
              </div>
              <p className="pt-2 text-xs text-muted-foreground">Office: G-54 Saidham Shopping Plaza, P.K. Road, Mulund West, Mumbai — Mon to Sat, 10am–7pm</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export function WhatsappFab() {
  return (
    <a
      href="https://wa.me/919757190200"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card-hover transition-transform hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
