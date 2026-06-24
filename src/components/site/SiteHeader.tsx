import { Link } from "@tanstack/react-router";
import { Building2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/properties", label: "Properties" },
  { href: "https://youtube.com/@mumbairealestate9595", label: "YouTube" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* glass effect bar */}
      <div className="border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-xl">
        <div className="container flex h-17 items-center justify-between py-0" style={{ height: "68px" }}>
          {/* logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-navy text-primary-foreground shadow-card transition-all group-hover:scale-105 group-hover:shadow-card-hover">
              <Building2 className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-[17px] font-bold tracking-tight text-foreground">
                Mumbai Realty
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Real Estate · Finance · Legal
              </div>
            </div>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) =>
              l.to ? (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 transition-all hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-muted font-semibold" }}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 transition-all hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </a>
              )
            )}
          </nav>

          {/* desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
              <Link to="/admin/properties">Admin</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-lg bg-gradient-gold px-5 font-semibold text-accent-foreground shadow-sm hover:opacity-90"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* mobile toggle */}
          <button
            className="grid h-10 w-10 place-items-center rounded-lg hover:bg-muted md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="absolute inset-x-0 top-full z-50 border-b border-border bg-background/95 px-4 pb-6 pt-4 shadow-card-hover backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l) =>
              l.to ? (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </a>
              )
            )}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              <Button
                asChild
                className="w-full rounded-lg bg-gradient-gold font-semibold text-accent-foreground"
              >
                <Link to="/contact" onClick={() => setMobileOpen(false)}>
                  Get in Touch
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
