import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { Nav, Footer } from "@/components/site-chrome";
import fluteTexture from "@/assets/flute-texture.jpg";

export const Route = createFileRoute("/industries")({
  component: IndustriesPage,
  head: () => ({
    meta: [
      { title: "Industries · Shree Harsh Packaging" },
      { name: "description", content: "From high speed e commerce fulfillment to specialized pharmaceutical cold chain packaging, we serve twelve core industries." },
      { property: "og:title", content: "Industries · Shree Harsh Packaging" },
      { property: "og:description", content: "From high speed e commerce fulfillment to specialized pharmaceutical cold chain packaging, we serve twelve core industries." },
    ],
  }),
});

const industries = [
  "Garment Manufacturing",
  "Pharmaceutical Industries",
  "FMCG",
  "Textiles",
  "Engineering Industries",
  "Fruits and Vegetables",
  "Beverages",
  "Processed Food",
  "Electronics",
  "Consumer Durables",
  "Chemicals",
  "Glass Industry",
];

function IndustriesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={fluteTexture} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Industries We Serve</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl text-balance max-w-3xl">Structural integrity brands trust across twelve sectors.</h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">From high speed e commerce fulfillment to specialized pharmaceutical cold chain packaging.</p>

          <ul className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-x-8">
            {industries.map((ind, i) => (
              <motion.li
                key={ind}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group flex items-center justify-between py-5 border-b border-border"
              >
                <span className="text-lg group-hover:text-accent transition-colors">{ind}</span>
                <Package className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all" />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
}
