import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Receipt } from "lucide-react";
import { SiteLayout } from "@/components/site-chrome";
import { QuoteForm } from "@/components/quote-form";
import { COMPANY } from "@/lib/company";

type ContactSearch = {
  product?: string;
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    product: typeof search.product === "string" ? search.product : undefined,
  }),
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Get a quote · Shree Harsh Industries" },
      {
        name: "description",
        content:
          "WhatsApp or email a corrugated box quote. Send L × W × H, ply and quantity. Plant in Tumkur, Karnataka.",
      },
      { property: "og:title", content: "Get a quote · Shree Harsh Industries" },
      {
        property: "og:description",
        content: "Send sizes and quantity. We reply with board grade, price and lead time.",
      },
    ],
  }),
});

function ContactPage() {
  const { product } = Route.useSearch();

  return (
    <SiteLayout>
      <section className="pt-32 pb-24 max-w-6xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Get a quote</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl text-balance max-w-3xl">
          Send the size. We send the rate.
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Fill the form — WhatsApp and email open with the message already written. Or call {COMPANY.contactName} on{" "}
          <a className="text-accent hover:underline" href={`tel:${COMPANY.phoneTel}`}>
            {COMPANY.phoneDisplay}
          </a>
          .
        </p>

        <div className="mt-12 grid lg:grid-cols-[1fr_280px] gap-10 items-start">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <QuoteForm defaultProductId={product} />
          </div>
          <div className="space-y-4">
            <Row icon={Phone} label={COMPANY.contactName} value={COMPANY.phoneDisplay} href={`tel:${COMPANY.phoneTel}`} />
            <Row icon={Mail} label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
            <Row icon={Receipt} label="GSTIN" value={COMPANY.gstin} />
            <Row icon={MapPin} label="Plant" value={`${COMPANY.addressLine}, ${COMPANY.city}`} />
          </div>
        </div>

        <div className="mt-12 rounded-2xl overflow-hidden border border-border h-[320px] bg-muted">
          <iframe
            title="Shree Harsh Industries plant map"
            src={COMPANY.mapsEmbed}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </SiteLayout>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const Comp = href ? "a" : "div";
  return (
    <Comp
      href={href}
      className="flex items-start gap-4 rounded-xl border border-border p-4 hover:border-accent hover:bg-accent/5 transition-colors"
    >
      <Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
      <div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
        <div className="text-sm mt-0.5">{value}</div>
      </div>
    </Comp>
  );
}
