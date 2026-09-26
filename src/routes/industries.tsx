import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site-chrome";
import { industries } from "@/lib/company";
import fluteTexture from "@/assets/flute-texture.jpg";

export const Route = createFileRoute("/industries")({
  component: IndustriesPage,
  head: () => ({
    meta: [
      { title: "Industries · Shree Harsh Industries" },
      {
        name: "description",
        content:
          "Corrugated packaging for garments, pharma, FMCG, electronics, glass, beverages and export cargo from Tumkur.",
      },
      { property: "og:title", content: "Industries · Shree Harsh Industries" },
      {
        property: "og:description",
        content: "Board grade and carton style matched to twelve manufacturing sectors.",
      },
    ],
  }),
});

function IndustriesPage() {
  const [open, setOpen] = useState<string | null>(industries[0].name);

  return (
    <SiteLayout>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={fluteTexture} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Industries we pack</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl text-balance max-w-3xl">
            Tell us the product. We specify the board.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Tap a sector for the carton styles we usually run. Then send sizes and we will confirm ply, print and lead time.
          </p>

          <ul className="mt-14 grid md:grid-cols-2 gap-4">
            {industries.map((ind, i) => {
              const isOpen = open === ind.name;
              return (
                <motion.li
                  key={ind.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : ind.name)}
                    className="w-full text-left rounded-2xl border border-border bg-background/90 p-6 hover:border-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-xl">{ind.name}</h2>
                      <span className="text-accent text-sm">{isOpen ? "−" : "+"}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{ind.need}</p>
                    {isOpen ? (
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{ind.products}</p>
                        <Link
                          to="/contact"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent"
                        >
                          Quote for {ind.name.split(" ")[0].toLowerCase()} <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    ) : null}
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
