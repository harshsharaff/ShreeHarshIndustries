import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Factory, ShieldCheck, Truck, Leaf } from "lucide-react";
import { Nav, Footer } from "@/components/site-chrome";
import factory from "@/assets/factory.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About · Shree Harsh Packaging" },
      { name: "description", content: "25 years of precision packaging craft. Integrated corrugation, testing and dispatch from a fully automatic plant in Tumkur." },
      { property: "og:title", content: "About · Shree Harsh Packaging" },
      { property: "og:description", content: "25 years of precision packaging craft. Integrated corrugation, testing and dispatch from a fully automatic plant in Tumkur." },
    ],
  }),
});

const reasons = [
  { icon: Factory, title: "Integrated plant", body: "From corrugation to dispatch under one roof. No outsourced steps, no quality drift." },
  { icon: ShieldCheck, title: "In-house testing", body: "GSM, BCT, ECT and moisture control checked on every batch before it ships." },
  { icon: Truck, title: "Captive transport", body: "Our own fleet keeps deliveries on schedule across Karnataka and beyond." },
  { icon: Leaf, title: "100 percent recyclable", body: "Kraft based, fully recyclable material. Packaging that returns to the loop." },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-16 max-w-7xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">About Us</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl text-balance max-w-4xl">Precision packaging, engineered for scale.</h1>
        <p className="mt-6 max-w-3xl text-muted-foreground text-lg">Shree Harsh Packaging is a fully automated 5 ply corrugated solutions manufacturer based in Tumkur, Karnataka. For over 25 years we have bridged the gap between heavy duty engineering and sustainable design, delivering 3000 tons of precision packaging every month to leading Indian brands.</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
          <img src={factory} alt="Automated corrugated box plant" className="w-full h-full object-cover" />
        </motion.div>
        <div>
          <h2 className="text-4xl sm:text-5xl text-balance">Why Shree Harsh</h2>
          <div className="mt-10 space-y-6">
            {reasons.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-5 group">
                <div className="shrink-0 w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center group-hover:bg-accent transition-colors">
                  <r.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium font-sans">{r.title}</h3>
                  <p className="mt-1 text-muted-foreground">{r.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
