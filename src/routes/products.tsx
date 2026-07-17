import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav, Footer } from "@/components/site-chrome";
import boxRsc from "@/assets/box-rsc.jpg";
import boxCcf from "@/assets/box-ccf.jpg";
import boxPartitions from "@/assets/box-partitions.jpg";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Products · Shree Harsh Packaging" },
      { name: "description", content: "Corrugated boxes engineered per SKU: RSC, CCF, partitions, dividers, die-cut and custom cartons." },
      { property: "og:title", content: "Products · Shree Harsh Packaging" },
      { property: "og:description", content: "Corrugated boxes engineered per SKU: RSC, CCF, partitions, dividers, die-cut and custom cartons." },
    ],
  }),
});

const items = [
  { tag: "RSC", title: "Regular Slotted Container", img: boxRsc, desc: "The industry standard corrugated box for safe storage and transportation. Its simple flap structure gives strong stacking strength and cost efficient packaging for a wide range of products." },
  { tag: "CCF", title: "Corner Cut Folder", img: boxCcf, desc: "Single piece corrugated folders with corner cuts, ideal for wrapping flat or narrow products securely." },
  { tag: "INSERTS", title: "Partitions and Dividers", img: boxPartitions, desc: "Corrugated internal fittings used to separate and protect multiple items inside a single carton." },
  { tag: "DIE CUT", title: "Die Cut Cartons", img: boxRsc, desc: "Precision die cut shapes for retail packaging, promotional cartons and complex product profiles." },
  { tag: "5 PLY", title: "Heavy Duty 5 Ply Boxes", img: boxCcf, desc: "Extra rigid boxes for engineering goods, appliances and export cargo requiring maximum crush resistance." },
  { tag: "CUSTOM", title: "Custom Printed Cartons", img: boxPartitions, desc: "Flexo printed cartons with your brand identity, batch codes and handling marks." },
];

function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-16 max-w-7xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Our Products</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl text-balance max-w-3xl">A complete range of precision engineered corrugated packaging.</h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">Designed to protect, transport and present your products with consistency and strength.</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-border bg-card overflow-hidden group"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <motion.img src={p.img} alt={p.title} loading="lazy" width={900} height={700} className="w-full h-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} />
            </div>
            <div className="p-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-accent">{p.tag}</span>
              <h2 className="mt-2 text-2xl">{p.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          </motion.article>
        ))}
      </section>
      <Footer />
    </div>
  );
}
