import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Factory, ShieldCheck, Truck, Leaf, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site-chrome";
import { COMPANY, reasons, stats } from "@/lib/company";
import factory from "@/assets/factory.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About · Shree Harsh Industries" },
      {
        name: "description",
        content:
          "Shree Harsh Industries runs a fully automatic 5-ply corrugated plant in Vasantha Narasapura, Tumkur — testing GSM, BCT and ECT in-house.",
      },
      { property: "og:title", content: "About · Shree Harsh Industries" },
      {
        property: "og:description",
        content: "25 years of corrugated packaging from an integrated plant in Tumkur, Karnataka.",
      },
    ],
  }),
});

const icons = [Factory, ShieldCheck, Truck, Leaf];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="pt-32 pb-12 max-w-7xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">The plant</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl text-balance max-w-4xl">
          {COMPANY.name} makes corrugated boxes in Tumkur — not a trading desk.
        </h1>
        <p className="mt-6 max-w-3xl text-muted-foreground text-lg">
          We run a fully automatic 5-ply line at Vasantha Narasapura Industrial Area. Board is corrugated, converted and tested here, then moved on our own vehicles. Capacity is about 3,000 tonnes a month, with 250 KVA backup so the line does not wait on the grid.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
        {stats.map((s) => (
          <div key={s.label} className="bg-background p-6">
            <div className="font-display text-4xl text-primary">{s.value}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted"
        >
          <img src={factory} alt="Board coming off the corrugation line" className="w-full h-full object-cover" />
        </motion.div>
        <div>
          <h2 className="text-4xl sm:text-5xl text-balance">What stays in-house</h2>
          <div className="mt-10 space-y-6">
            {reasons.map((r, i) => {
              const Icon = icons[i];
              return (
                <div key={r.title} className="flex gap-5">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium font-sans">{r.title}</h3>
                    <p className="mt-1 text-muted-foreground">{r.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            GSTIN {COMPANY.gstin}
            <br />
            {COMPANY.addressLine}, {COMPANY.city}
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm hover:bg-accent transition-colors"
          >
            Request a plant quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
