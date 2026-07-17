import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-primary">
          Shree Harsh <span className="text-accent">Packaging</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>Home</Link>
          <Link to="/products" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Products</Link>
          <Link to="/industries" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Industries</Link>
          <Link to="/about" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>About</Link>
          <Link to="/contact" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Contact</Link>
        </nav>
        <a
          href="tel:+919379421073"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground text-sm px-4 py-2 hover:bg-accent transition-colors"
        >
          <Phone className="w-3.5 h-3.5" /> 093794 21073
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10 bg-background">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
        <div>
          © {new Date().getFullYear()} Shree Harsh Packaging. Manufacturers of quality corrugated boxes.
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Tumkur, Karnataka
        </div>
      </div>
    </footer>
  );
}
