import { Link } from "@tanstack/react-router";
import { Menu, Phone, MessageCircle, FileText } from "lucide-react";
import { useState, type ReactNode } from "react";
import { COMPANY, whatsappUrl } from "@/lib/company";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const whatsappHello = whatsappUrl(
  `Hello ${COMPANY.name}, I would like to discuss corrugated boxes for my products.`,
);

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pb-20 md:pb-0">
      <Nav />
      {children}
      <Footer />
      <MobileDock />
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="font-display text-lg sm:text-xl font-semibold tracking-tight text-primary shrink-0">
          Shree Harsh <span className="text-accent">Industries</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-foreground transition-colors"
              activeOptions={"exact" in l ? { exact: true } : undefined}
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${COMPANY.phoneTel}`}
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-border text-sm px-3 py-2 hover:border-foreground/40 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> {COMPANY.phoneDisplay}
          </a>
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground text-sm px-4 py-2 hover:brightness-110 transition"
          >
            Get a quote
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,90vw)]">
              <SheetTitle className="font-display text-left">Shree Harsh Industries</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base text-muted-foreground hover:bg-secondary hover:text-foreground"
                    activeProps={{ className: "rounded-lg px-3 py-3 text-base bg-secondary text-foreground" }}
                    activeOptions={"exact" in l ? { exact: true } : undefined}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="mt-8 flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 text-sm"
              >
                <Phone className="w-4 h-4" /> Call {COMPANY.phoneDisplay}
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        <div>
          <div className="font-display text-lg text-primary">
            Shree Harsh <span className="text-accent">Industries</span>
          </div>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Corrugated boxes from a fully automatic plant in Tumkur. Cut to your SKU, tested, then dispatched.
          </p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Plant</div>
          <p className="mt-3 text-foreground leading-relaxed">
            {COMPANY.addressLine}
            <br />
            {COMPANY.city}, {COMPANY.state}
          </p>
          <p className="mt-2 text-muted-foreground">GSTIN {COMPANY.gstin}</p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Talk to us</div>
          <div className="mt-3 flex flex-col gap-2">
            <a className="hover:text-accent" href={`tel:${COMPANY.phoneTel}`}>
              {COMPANY.phoneDisplay}
            </a>
            <a className="hover:text-accent" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
            <a className="hover:text-accent" href={whatsappHello} target="_blank" rel="noreferrer">
              WhatsApp a quote
            </a>
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Site</div>
          <div className="mt-3 flex flex-col gap-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-accent">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground">
        <div>
          © {new Date().getFullYear()} {COMPANY.name}. Manufacturers of quality corrugated boxes.
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Tumkur, Karnataka
        </div>
      </div>
    </footer>
  );
}

function MobileDock() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3">
        <a href={`tel:${COMPANY.phoneTel}`} className="flex flex-col items-center gap-1 py-3 text-[11px]">
          <Phone className="w-4 h-4 text-accent" /> Call
        </a>
        <a
          href={whatsappHello}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-[11px] border-x border-border"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366]" /> WhatsApp
        </a>
        <Link to="/contact" className="flex flex-col items-center gap-1 py-3 text-[11px]">
          <FileText className="w-4 h-4 text-accent" /> Quote
        </Link>
      </div>
    </div>
  );
}
