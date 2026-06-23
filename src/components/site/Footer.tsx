import { Building2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-navy text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </span>
            <div className="font-display text-lg font-semibold">Mumbai Realty</div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Hand-picked Mumbai real estate, paired with sister-practice finance and legal expertise.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#services" className="hover:text-foreground">Services</a></li>
            <li><a href="#properties" className="hover:text-foreground">Properties</a></li>
            <li><a href="#youtube" className="hover:text-foreground">YouTube</a></li>
            <li><a href="#founder" className="hover:text-foreground">About</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>+91 99999 99999</li>
            <li>hello@mumbairealty.in</li>
            <li>BKC, Mumbai</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-wrap items-center justify-between gap-2 py-5 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Mumbai Realty. All rights reserved.</div>
          <div>RERA · Compliant</div>
        </div>
      </div>
    </footer>
  );
}
