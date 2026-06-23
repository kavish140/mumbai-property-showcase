import { Play, Youtube, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos = [
  { title: "Inside a ₹14 Cr Bandra Penthouse Tour", views: "12K", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
  { title: "Powai vs Worli: Where to Buy in 2026?", views: "8.4K", img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80" },
  { title: "Mumbai Commercial Real Estate Explained", views: "5.1K", img: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=80" },
  { title: "First-Time Buyer's Guide to Home Loans", views: "9.7K", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" },
];

export function YouTubeSection() {
  return (
    <section id="youtube" className="bg-background py-24">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
              <Youtube className="h-4 w-4" /> Mumbai Real Estate on YouTube
            </p>
            <h2 className="font-display text-4xl font-semibold md:text-5xl">Honest market breakdowns, every week.</h2>
            <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-card">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-gold text-accent-foreground">
                <Users className="h-4 w-4" />
              </span>
              <span><span className="font-semibold text-foreground">255+</span> <span className="text-muted-foreground">subscribers and growing</span></span>
            </div>
          </div>
          <Button size="lg" className="bg-gradient-gold text-accent-foreground shadow-card hover:opacity-90">
            <Youtube className="mr-2 h-5 w-5" /> Subscribe on YouTube
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v) => (
            <a
              key={v.title}
              href="#"
              className="group block overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={v.img} alt={v.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 grid place-items-center bg-background/30 transition-colors group-hover:bg-background/10">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-card transition-transform group-hover:scale-110">
                    <Play className="h-6 w-6 fill-current" />
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-semibold leading-snug line-clamp-2">{v.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{v.views} views</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
