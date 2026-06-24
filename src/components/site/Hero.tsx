import { ArrowRight, MapPin, Search, Star, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stats = [
  { value: "12+", label: "Years in Mumbai" },
  { value: "500+", label: "Properties Sold" },
  { value: "₹800Cr+", label: "Worth of Transactions" },
  { value: "98%", label: "Client Satisfaction" },
];

const trust = [
  { icon: Star, text: "Top-rated on Google" },
  { icon: Shield, text: "RERA Registered" },
  { icon: Award, text: "Award-winning Team" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      {/* background image overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          opacity: 0.12,
        }}
      />
      {/* decorative orbs */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full opacity-10 blur-3xl"
        style={{ background: "hsl(38 95% 53%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full opacity-8 blur-3xl"
        style={{ background: "hsl(222 68% 40%)" }}
      />

      <div className="container relative py-28 md:py-36 lg:py-44">
        {/* trust badge row */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/8 px-4 py-1.5 text-xs font-medium tracking-widest text-primary-foreground/80 backdrop-blur">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            Mumbai's Most Trusted Property Advisor
          </div>
          {trust.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="hidden items-center gap-1.5 text-xs text-primary-foreground/60 sm:inline-flex"
            >
              <Icon className="h-3.5 w-3.5 text-accent" />
              {text}
            </div>
          ))}
        </div>

        {/* headline */}
        <div className="max-w-4xl">
          <h1 className="font-display text-5xl font-bold leading-[1.02] md:text-6xl lg:text-7xl xl:text-8xl">
            Find Your Perfect{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Mumbai
              </span>
              <span
                className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-gold opacity-40"
                aria-hidden
              />
            </span>
            <br />
            Home.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-primary-foreground/70 md:text-xl">
            Hand-picked residences and commercial spaces across Mumbai's finest
            neighbourhoods — with in-house finance and legal advisory, all under
            one roof.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="h-13 animate-pulse-glow rounded-xl bg-gradient-gold px-8 text-base font-semibold text-accent-foreground shadow-glow-gold transition-all hover:scale-105 hover:opacity-90"
            >
              <Link to="/properties">
                Browse Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 rounded-xl border-primary-foreground/25 bg-primary-foreground/6 px-8 text-base font-semibold text-primary-foreground backdrop-blur hover:bg-primary-foreground/14 hover:text-primary-foreground"
            >
              <Link to="/contact">Talk to an Advisor</Link>
            </Button>
          </div>
        </div>

        {/* stats row */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-5 py-4 backdrop-blur">
              <div className="font-display text-3xl font-bold text-accent">{value}</div>
              <div className="mt-1 text-xs text-primary-foreground/60">{label}</div>
            </div>
          ))}
        </div>

        {/* search bar */}
        <div className="mt-10 rounded-2xl border border-primary-foreground/12 bg-background/97 p-5 text-foreground shadow-card-hover backdrop-blur md:p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Quick Property Search
          </p>
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Location
              </label>
              <Input placeholder="Bandra, Powai, Worli…" className="h-11" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Property type
              </label>
              <Select>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="land">Land / Plot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Budget
              </label>
              <Select>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Any budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Under ₹2 Cr</SelectItem>
                  <SelectItem value="2">₹2 – 5 Cr</SelectItem>
                  <SelectItem value="3">₹5 – 10 Cr</SelectItem>
                  <SelectItem value="4">₹10 Cr+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                asChild
                className="h-11 w-full rounded-lg bg-gradient-navy px-6 font-semibold text-primary-foreground hover:opacity-90 md:w-auto"
              >
                <Link to="/properties">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
