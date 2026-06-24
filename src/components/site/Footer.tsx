import { Building2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

const footerLinks = [
  {
    heading: "Explore",
    links: [
      { to: "/services", label: "Services" },
      { to: "/properties", label: "Properties" },
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Specialisations",
    links: [
      { label: "Residential Sales" },
      { label: "Commercial Leasing" },
      { label: "Investment Advisory" },
      { label: "Legal & Finance" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      {/* top accent strip */}
      <div className="h-1 w-full bg-gradient-gold" />

      <div className="container grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr]">
        {/* brand column */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-navy text-primary-foreground shadow-card">
              <Building2 className="h-5 w-5" />
            </span>
            <div className="font-display text-xl font-bold text-foreground">Mumbai Realty</div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Hand-picked Mumbai real estate, paired with sister-practice finance
            and legal expertise. Your complete property partner since 2012.
          </p>
          {/* badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["RERA Registered", "12+ Years", "500+ Deals"].map((b) => (
              <span
                key={b}
                className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {b}
              </span>
            ))}
          </div>
          {/* social */}
          <div className="mt-6">
            <a
              href="https://youtube.com/@mumbairealestate9595"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-card transition-colors hover:border-accent/40 hover:bg-muted"
            >
              <span className="grid h-5 w-5 place-items-center rounded bg-[#FF0000] text-white">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-2.74 12.81 12.81 0 0 0-9.82 0A4.83 4.83 0 0 1 2.41 6.69 28.15 28.15 0 0 0 2 12a28.15 28.15 0 0 0 .41 5.31 4.83 4.83 0 0 1 3.77 2.74 12.81 12.81 0 0 0 9.82 0 4.83 4.83 0 0 1 3.77-2.74A28.15 28.15 0 0 0 22 12a28.15 28.15 0 0 0-.41-5.31zM9.75 15V9l5.25 3-5.25 3z" />
                </svg>
              </span>
              YouTube Channel
            </a>
          </div>
        </div>

        {/* link columns */}
        {footerLinks.map(({ heading, links }) => (
          <div key={heading}>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
              {heading}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {links.map((l) =>
                "to" in l && l.to ? (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ) : (
                  <li key={l.label} className="text-muted-foreground">
                    {l.label}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* bottom bar */}
      <div className="border-t border-border">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Mumbai Realty. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>RERA · Compliant</span>
            <span>·</span>
            <span>G-54 Saidham Shopping Plaza, Mulund West</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
