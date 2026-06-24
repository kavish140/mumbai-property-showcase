import { ArrowRight, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-navy text-primary-foreground">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay",
        }}
      />
      <div className="container relative py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-xs font-medium tracking-wide text-primary-foreground/80 backdrop-blur">
            <MapPin className="h-3.5 w-3.5" />
            Trusted across Mumbai · 12+ years
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl">
            Find your place in{" "}
            <span className="bg-gradient-gold bg-clip-text text-transparent">Mumbai</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/75">
            Hand-picked homes, premium commercial spaces, and end-to-end advisory across real
            estate, finance, and law — all under one roof.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground shadow-card hover:bg-accent/90"
            >
              Browse Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Talk to an Advisor
            </Button>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-primary-foreground/10 bg-background/95 p-4 text-foreground shadow-card backdrop-blur md:p-6">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Location
              </label>
              <Input placeholder="Bandra, Powai, Worli…" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Property type
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Budget
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Under ₹2 Cr</SelectItem>
                  <SelectItem value="2">₹2–5 Cr</SelectItem>
                  <SelectItem value="3">₹5–10 Cr</SelectItem>
                  <SelectItem value="4">₹10 Cr+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="h-10 w-full bg-primary text-primary-foreground hover:bg-primary/90 md:w-auto">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
