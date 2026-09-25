import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site-chrome";
import { products, type ProductId } from "@/lib/company";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Products · Shree Harsh Industries" },
      {
        name: "description",
        content:
          "Order RSC, CCF, partitions, die-cut, 5-ply and printed corrugated cartons from our Tumkur plant. Quote by size, ply and quantity.",
      },
      { property: "og:title", content: "Products · Shree Harsh Industries" },
      {
        property: "og:description",
        content: "Corrugated boxes cut to your SKU: RSC, CCF, partitions, die-cut, 5-ply and flexo print.",
      },
    ],
  }),
});

const filters = [
  { id: "all", label: "All" },
  { id: "3 ply", label: "3 ply" },
  { id: "5 ply", label: "5 ply" },
] as const;

function ProductsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const list = products.filter((p) => filter === "all" || p.ply.some((grade) => grade === filter));

  return (
    <SiteLayout>
      <section className="pt-32 pb-10 max-w-7xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Our products</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl text-balance max-w-3xl">
          Pick a carton style. We cut it to millimetres.
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Filter by ply, open a style, then send L × W × H on WhatsApp. If you are between grades, tell us the packed weight and we will specify the board.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                filter === f.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-foreground/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((p, i) => (
          <motion.article
            key={p.id}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={p.img} alt={p.title} loading="lazy" width={900} height={700} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.25em] text-accent">{p.tag}</span>
              <h2 className="mt-2 text-2xl">{p.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <p className="mt-4 text-sm">
                <span className="text-muted-foreground">Typical use: </span>
                {p.uses}
              </p>
              <ul className="mt-3 text-sm text-muted-foreground space-y-1">
                {p.specs.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
              <Link
                to="/contact"
                search={{ product: p.id as ProductId }}
                className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-primary text-primary-foreground text-sm px-4 py-2 hover:bg-accent transition-colors"
              >
                Quote this <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </section>
    </SiteLayout>
  );
}
