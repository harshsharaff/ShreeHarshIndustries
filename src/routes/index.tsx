import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import {
  Package,
  Factory,
  Truck,
  Leaf,
  ShieldCheck,
  Phone,
  Mail,
  Globe,
  MapPin,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import heroBoxes from "@/assets/hero-boxes.jpg";
import fluteTexture from "@/assets/flute-texture.jpg";
import factory from "@/assets/factory.jpg";
import boxRsc from "@/assets/box-rsc.jpg";
import boxCcf from "@/assets/box-ccf.jpg";
import boxPartitions from "@/assets/box-partitions.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      {
        name: "keywords",
        content:
          "corrugated boxes Tumkur, packaging manufacturer Karnataka, 5-ply boxes, Shree Harsh Packaging",
      },
    ],
  }),
});

const stats = [
  { value: "25+", label: "Years of craft" },
  { value: "3000T", label: "Monthly capacity" },
  { value: "5-Ply", label: "Automatic plant" },
  { value: "250 KVA", label: "Power backup" },
];

const products = [
  {
    title: "Regular Slotted Container",
    tag: "RSC",
    img: boxRsc,
    desc: "The industry-standard corrugated box built for safe storage and transport. Balanced flap geometry delivers strong stacking strength at an efficient cost.",
  },
  {
    title: "Corner Cut Folder",
    tag: "CCF",
    img: boxCcf,
    desc: "Single-piece corrugated folders with corner cuts. Ideal for wrapping flat or narrow products securely with minimal material.",
  },
  {
    title: "Partitions & Dividers",
    tag: "INSERTS",
    img: boxPartitions,
    desc: "Corrugated internal fittings that separate and cushion multiple items inside a single carton — engineered per SKU.",
  },
];

const industries = [
  "Garment Manufacturing",
  "Pharmaceuticals",
  "FMCG",
  "Textiles",
  "Engineering",
  "Fruits & Vegetables",
  "Beverages",
  "Processed Food",
  "Electronics",
  "Consumer Durables",
  "Chemicals",
  "Glass Industry",
];

const reasons = [
  {
    icon: Factory,
    title: "Integrated plant",
    body: "From corrugation to dispatch under one roof — no outsourced steps, no quality drift.",
  },
  {
    icon: ShieldCheck,
    title: "In-house testing",
    body: "GSM, BCT, ECT and moisture control checked on every batch before it ships.",
  },
  {
    icon: Truck,
    title: "Captive transport",
    body: "Our own fleet keeps deliveries on schedule across Karnataka and beyond.",
  },
  {
    icon: Leaf,
    title: "100% recyclable",
    body: "Kraft-based, fully recyclable material — packaging that returns to the loop.",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Products />
      <Industries />
      <WhyUs />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-primary">
            Shree Harsh
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground hidden sm:inline">
            Packaging
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#products" className="hover:text-foreground transition-colors">Products</a>
          <a href="#industries" className="hover:text-foreground transition-colors">Industries</a>
          <a href="#why" className="hover:text-foreground transition-colors">Why us</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <a
          href="tel:+919379421073"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground text-sm px-4 py-2 hover:bg-accent transition-colors"
        >
          <Phone className="w-3.5 h-3.5" /> 093794 21073
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen pt-16 flex items-center">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={heroBoxes}
          alt="Stacked corrugated boxes in warehouse"
          className="w-full h-full object-cover"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent"
          >
            <span className="w-8 h-px bg-accent" /> Tumkur · Karnataka
          </motion.p>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-balance">
            Precision packaging,{" "}
            <span className="italic text-accent">folded to fit</span> your product.
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Shree Harsh Packaging manufactures quality corrugated boxes on a fully automatic plant.
            Full satisfaction to our customer is our aim.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 hover:bg-accent transition-colors"
            >
              Our products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 hover:border-foreground/60 transition-colors"
            >
              Request a quote
            </a>
          </motion.div>
        </div>
      </div>

      {/* Interactive folding box */}
      <div className="hidden lg:block absolute right-10 bottom-24">
        <FoldingBox />
      </div>
    </section>
  );
}

function FoldingBox() {
  const [open, setOpen] = useState(true);
  return (
    <motion.button
      onClick={() => setOpen((o) => !o)}
      className="relative w-56 h-56"
      style={{ perspective: 800 }}
      aria-label="Fold and unfold a corrugated box"
    >
      <motion.div
        animate={{ rotateX: open ? 20 : 0, rotateY: open ? -25 : 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* base */}
        <div
          className="absolute inset-0 bg-kraft rounded-sm shadow-2xl"
          style={{ transform: "translateZ(-40px)" }}
        />
        {/* four flaps */}
        {[
          { side: "top", rot: open ? -100 : 0, origin: "bottom" },
          { side: "bottom", rot: open ? 100 : 0, origin: "top" },
          { side: "left", rot: open ? 100 : 0, origin: "right" },
          { side: "right", rot: open ? -100 : 0, origin: "left" },
        ].map((f, i) => (
          <motion.div
            key={i}
            className="absolute bg-kraft-deep/90 bg-flute"
            initial={false}
            animate={{
              rotateX: f.side === "top" || f.side === "bottom" ? f.rot : 0,
              rotateY: f.side === "left" || f.side === "right" ? f.rot : 0,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 12 }}
            style={{
              width: f.side === "left" || f.side === "right" ? "50%" : "100%",
              height: f.side === "top" || f.side === "bottom" ? "50%" : "100%",
              top: f.side === "top" ? 0 : f.side === "bottom" ? "50%" : 0,
              left: f.side === "left" ? 0 : f.side === "right" ? "50%" : 0,
              transformOrigin: f.origin,
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.15)",
            }}
          />
        ))}
      </motion.div>
      <span className="absolute -bottom-8 left-0 right-0 text-xs uppercase tracking-widest text-muted-foreground">
        {open ? "Click to fold" : "Click to open"}
      </span>
    </motion.button>
  );
}

function Marquee() {
  const items = ["Fully Automatic Plant", "5-Ply Corrugation", "Custom Die-Cut", "In-house Testing", "GSM · BCT · ECT", "Same-Day Dispatch"];
  return (
    <div className="border-y border-border bg-primary text-primary-foreground overflow-hidden">
      <motion.div
        className="flex gap-16 py-5 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="text-sm uppercase tracking-[0.25em] flex items-center gap-16">
            {t}
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-background p-8"
          >
            <div className="font-display text-5xl text-primary">{s.value}</div>
            <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">01 — Products</p>
          <h2 className="mt-4 text-4xl sm:text-5xl max-w-2xl text-balance">
            A complete range, engineered per SKU.
          </h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          Precision-cut corrugated packaging that protects, transports and presents your product
          with consistency and strength.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={p.tag} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ p, i }: { p: (typeof products)[number]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.15, duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl bg-card border border-border overflow-hidden flex flex-col"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <motion.img
          src={p.img}
          alt={p.title}
          loading="lazy"
          width={900}
          height={900}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08, rotate: -1 }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium">
            {p.tag}
          </span>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </div>
        <h3 className="mt-3 text-2xl">{p.title}</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
      </div>
    </motion.article>
  );
}

function Industries() {
  return (
    <section id="industries" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={fluteTexture} alt="" loading="lazy" width={1200} height={800} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-background/85" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">02 — Industries</p>
          <h2 className="mt-4 text-4xl sm:text-5xl text-balance">
            From cold-chain to e-commerce — structural integrity brands trust.
          </h2>
        </div>

        <ul className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-x-8">
          {industries.map((ind, i) => (
            <motion.li
              key={ind}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group flex items-center justify-between py-5 border-b border-border cursor-default"
            >
              <span className="text-lg group-hover:text-accent transition-colors">{ind}</span>
              <Package className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const imgY = useTransform(smooth, [0, 1], ["-10%", "10%"]);

  return (
    <section id="why" ref={ref} className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
      <motion.div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted" style={{}}>
        <motion.img
          src={factory}
          alt="Automated corrugated box plant"
          loading="lazy"
          width={1400}
          height={900}
          className="absolute inset-0 w-full h-[120%] object-cover"
          style={{ y: imgY }}
        />
      </motion.div>

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-accent">03 — Why Shree Harsh</p>
        <h2 className="mt-4 text-4xl sm:text-5xl text-balance">
          Full satisfaction to our customer is our aim.
        </h2>
        <div className="mt-10 space-y-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 group"
            >
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
  );
}

function CTA() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-primary text-primary-foreground">
      <motion.div
        className="absolute inset-0 bg-flute opacity-10"
        animate={{ backgroundPositionX: ["0px", "200px"] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      />
      <div className="max-w-5xl mx-auto px-6 text-center relative">
        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-balance">
          Ready to package it{" "}
          <span className="italic text-accent">right</span>?
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-primary-foreground/70">
          Talk to our team about custom corrugation solutions built for your scale, your SKU and
          your supply chain.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          <ContactRow icon={Phone} label="Harivats Sharaff (Babu)" value="+91 93794 21073" href="tel:+919379421073" />
          <ContactRow icon={Mail} label="Email" value="shrhrindustries@gmail.com" href="mailto:shrhrindustries@gmail.com" />
          <ContactRow icon={Globe} label="Website" value="corrugatedboxesind.com" href="https://www.corrugatedboxesind.com" />
          <ContactRow icon={MapPin} label="GSTIN" value="29AEUFS2060J1Z" />
        </div>

        <div className="mt-10 text-sm text-primary-foreground/60 max-w-xl mx-auto">
          Work Site: Plot No 672, Vasantha Narasapura Industrial Area, 2nd Phase Sub Layout, Tumkur — 572128
        </div>
      </div>
    </section>
  );
}

function ContactRow({
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
      className="flex items-center gap-4 rounded-xl border border-primary-foreground/15 p-4 hover:border-accent hover:bg-primary-foreground/5 transition-colors"
    >
      <Icon className="w-5 h-5 text-accent shrink-0" />
      <div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-primary-foreground/50">{label}</div>
        <div className="text-sm mt-0.5">{value}</div>
      </div>
    </Comp>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
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
