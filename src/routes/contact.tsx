import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import { Nav, Footer } from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact · Shree Harsh Packaging" },
      { name: "description", content: "Talk to our engineering team about customized corrugation solutions for your business scale." },
      { property: "og:title", content: "Contact · Shree Harsh Packaging" },
      { property: "og:description", content: "Talk to our engineering team about customized corrugation solutions for your business scale." },
    ],
  }),
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-24 max-w-5xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Get in touch</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl text-balance">Ready to automate your packaging supply chain?</h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">Get in touch with our team to discuss customized corrugation solutions for your business scale.</p>

        <div className="mt-14 grid sm:grid-cols-2 gap-4">
          <Row icon={Phone} label="Harivats Sharaff (Babu)" value="+91 93794 21073" href="tel:+919379421073" />
          <Row icon={Mail} label="Email" value="shrhrindustries@gmail.com" href="mailto:shrhrindustries@gmail.com" />
          <Row icon={Globe} label="Website" value="corrugatedboxesind.com" href="https://www.corrugatedboxesind.com" />
          <Row icon={MapPin} label="GSTIN" value="29AEUFS2060J1Z" />
        </div>

        <div className="mt-10 rounded-2xl border border-border p-6 bg-card">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Work Site</div>
          <div className="mt-2 text-lg">Plot No 672, Vasantha Narasapura Industrial Area, 2nd Phase Sub Layout, Tumkur 572128</div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Row({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) {
  const Comp = (href ? "a" : "div") as "a";
  return (
    <Comp href={href} className="flex items-center gap-4 rounded-xl border border-border p-4 hover:border-accent hover:bg-accent/5 transition-colors">
      <Icon className="w-5 h-5 text-accent shrink-0" />
      <div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
        <div className="text-sm mt-0.5">{value}</div>
      </div>
    </Comp>
  );
}
