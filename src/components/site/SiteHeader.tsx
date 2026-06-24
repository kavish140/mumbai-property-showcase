import { Link } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/properties", label: "Properties" },
  { href: "https://youtube.com/@mumbairealestate9595", label: "YouTube" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-navy text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold text-foreground">Mumbai Realty</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Real Estate · Finance · Legal</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            l.to ? (
              <Link key={l.to} to={l.to} className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
                {l.label}
              </a>
            )
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/admin/properties">Admin</Link>
          </Button>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
