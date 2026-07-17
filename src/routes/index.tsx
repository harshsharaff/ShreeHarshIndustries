import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
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
import fluteTexture from "@/assets/flute-texture.jpg";
import factory from "@/assets/factory.jpg";
import boxRsc from "@/assets/box-rsc.jpg";
import boxCcf from "@/assets/box-ccf.jpg";
import boxPartitions from "@/assets/box-partitions.jpg";
import { Nav, Footer } from "@/components/site-chrome";
import { HeroConveyor } from "@/components/HeroConveyor";

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
  { value: "25+", label: "Years of experience" },
  { value: "3000T", label: "Monthly capacity" },
  { value: "5 Ply", label: "Automatic plant" },
  { value: "250 KVA", label: "Power backup" },
];

const products = [
  {
    title: "Regular Slotted Container",
    tag: "RSC",
    img: boxRsc,
    desc: "The industry standard corrugated box designed for safe storage and transportation. Its simple flap structure provides strong stacking strength and cost efficient packaging for a wide range of products.",
  },
  {
    title: "Corner Cut Folder",
    tag: "CCF",
    img: boxCcf,
    desc: "Single piece corrugated folders with corner cuts, ideal for wrapping flat or narrow products securely.",
  },
  {
    title: "Partitions and Dividers",
    tag: "INSERTS",
    img: boxPartitions,
    desc: "Corrugated internal fittings used to separate and protect multiple items inside a single carton.",
  },
];

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

const reasons = [
  {
    icon: Factory,
    title: "Integrated plant",
    body: "From corrugation to dispatch under one roof. No outsourced steps, no quality drift.",
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
    title: "100 percent recyclable",
    body: "Kraft based, fully recyclable material. Packaging that returns to the loop.",
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

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen pt-16 flex items-center overflow-hidden bg-gradient-to-b from-secondary via-background to-background"
    >
      <div className="absolute inset-0 bg-flute opacity-[0.08] -z-10" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-accent/10 blur-3xl -z-10" />

      <motion.div
        style={{ y: textY }}
        className="relative max-w-6xl mx-auto px-6 py-20 text-center flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent"
        >
          <span className="w-8 h-px bg-accent" /> Tumkur, Karnataka <span className="w-8 h-px bg-accent" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.9] text-balance max-w-4xl"
        >
          Precision packaging, <span className="italic text-accent">engineered</span> for scale.
        </motion.h1>

        <div className="my-8 w-full">
          <HeroConveyor />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-2 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 hover:bg-accent transition-colors"
          >
            Our Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 hover:border-foreground/60 transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = ["Fully Automatic Plant", "5 Ply Corrugation", "Custom Die Cut", "In-house Testing", "GSM · BCT · ECT", "Same Day Dispatch"];
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
          <p className="text-xs uppercase tracking-[0.3em] text-accent">01 Products</p>
          <h2 className="mt-4 text-4xl sm:text-5xl max-w-2xl text-balance">
            A complete range, engineered per SKU.
          </h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          Precision cut corrugated packaging that protects, transports and presents your product
          with consistency and strength.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={p.tag} p={p} i={i} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to="/products" className="inline-flex items-center gap-2 text-accent hover:underline">
          View all products <ArrowRight className="w-4 h-4" />
        </Link>
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
          <p className="text-xs uppercase tracking-[0.3em] text-accent">02 Industries</p>
          <h2 className="mt-4 text-4xl sm:text-5xl text-balance">
            From cold chain to e commerce, structural integrity brands trust.
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
      <motion.div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
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
        <p className="text-xs uppercase tracking-[0.3em] text-accent">03 Why Shree Harsh</p>
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
          Work Site: Plot No 672, Vasantha Narasapura Industrial Area, 2nd Phase Sub Layout, Tumkur 572128
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
