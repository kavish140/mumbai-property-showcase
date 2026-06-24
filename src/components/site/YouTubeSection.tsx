import { Play, Youtube, Users, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos = [
  {
    title: "Inside a ₹14 Cr Bandra Penthouse Tour",
    views: "12K",
    duration: "18:42",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    tag: "Property Tour",
  },
  {
    title: "Powai vs Worli: Where to Buy in 2026?",
    views: "8.4K",
    duration: "24:15",
    img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    tag: "Market Analysis",
  },
  {
    title: "Mumbai Commercial Real Estate Explained",
    views: "5.1K",
    duration: "31:08",
    img: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&q=80",
    tag: "Commercial",
  },
  {
    title: "First-Time Buyer's Guide to Home Loans",
    views: "9.7K",
    duration: "22:30",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    tag: "Finance Tips",
  },
];

export function YouTubeSection() {
  return (
    <section id="youtube" className="relative overflow-hidden bg-background py-28">
      {/* bg accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-1/3 opacity-5"
        style={{
          background: "radial-gradient(ellipse at 0% 50%, hsl(38 95% 53%), transparent 70%)",
        }}
      />
      <div className="container relative">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              <Youtube className="h-4 w-4" />
              Mumbai Real Estate on YouTube
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Honest market breakdowns,{" "}
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                every week.
              </span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              No fluff, no sponsored bias — just raw analysis of Mumbai's hottest
              micro-markets, property tours, and financial deep-dives.
            </p>

            {/* channel stats */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 shadow-card">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-gold text-accent-foreground">
                  <Users className="h-4 w-4" />
                </span>
                <span className="text-sm">
                  <span className="font-bold text-foreground">255+</span>{" "}
                  <span className="text-muted-foreground">subscribers</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 shadow-card">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Growing fast</span>
              </div>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="rounded-xl bg-[#FF0000] px-7 font-semibold text-white shadow-card transition-all hover:scale-105 hover:bg-[#cc0000] hover:shadow-card-hover"
          >
            <a
              href="https://youtube.com/@mumbairealestate9595"
              target="_blank"
              rel="noreferrer"
            >
              <Youtube className="mr-2 h-5 w-5" />
              Subscribe on YouTube
            </a>
          </Button>
        </div>

        {/* video grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v) => (
            <a
              key={v.title}
              href="https://youtube.com/@mumbairealestate9595"
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-card-hover"
            >
              {/* thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={v.img}
                  alt={v.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* dark overlay */}
                <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
                {/* play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="grid h-13 w-13 place-items-center rounded-full bg-[#FF0000] text-white shadow-xl transition-all duration-300 group-hover:scale-115 group-hover:shadow-2xl" style={{ height: "52px", width: "52px" }}>
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                  </span>
                </div>
                {/* duration badge */}
                <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {v.duration}
                </div>
                {/* tag */}
                <div className="absolute left-2 top-2 rounded-md bg-accent/90 px-2 py-0.5 text-[10px] font-bold text-accent-foreground backdrop-blur">
                  {v.tag}
                </div>
              </div>
              {/* meta */}
              <div className="p-4">
                <h3 className="font-display text-sm font-bold leading-snug line-clamp-2 transition-colors group-hover:text-accent">
                  {v.title}
                </h3>
                <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  {v.views} views
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
