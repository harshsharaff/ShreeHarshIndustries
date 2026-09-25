import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import {
  Factory,
  Truck,
  Leaf,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  Quote,
  Hammer,
  PackageCheck,
} from "lucide-react";
import factory from "@/assets/factory.jpg";
import fluteTexture from "@/assets/flute-texture.jpg";
import { SiteLayout } from "@/components/site-chrome";
import { HeroConveyor } from "@/components/HeroConveyor";
import { QuoteForm } from "@/components/quote-form";
import {
  COMPANY,
  faqs,
  featuredProductIds,
  industries,
  processSteps,
  products,
  reasons,
  stats,
} from "@/lib/company";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      {
        name: "keywords",
        content:
          "corrugated boxes Tumkur, Shree Harsh Industries, 5-ply boxes, packaging manufacturer Karnataka, custom cartons",
      },
    ],
  }),
});

const reasonIcons = [Factory, ShieldCheck, Truck, Leaf];
const stepIcons = [ClipboardList, Quote, Hammer, PackageCheck];

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Marquee />
      <Stats />
      <Products />
      <HowItWorks />
      <Industries />
      <WhyUs />
      <QuoteBand />
      <Faq />
    </SiteLayout>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] pt-16 flex items-center overflow-hidden bg-gradient-to-b from-secondary via-background to-background"
    >
      <div className="absolute inset-0 bg-flute opacity-[0.08] -z-10" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-accent/10 blur-3xl -z-10" />

      <motion.div
        style={{ y: textY }}
        className="relative max-w-6xl mx-auto px-6 py-16 text-center flex flex-col items-center"
      >
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent"
        >
          <span className="w-8 h-px bg-accent" /> Tumkur, Karnataka <span className="w-8 h-px bg-accent" />
        </motion.p>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.95] text-balance max-w-4xl"
        >
          Corrugated boxes, cut to your SKU — from a 5-ply plant in Tumkur.
        </motion.h1>

        <p className="mt-5 max-w-2xl text-muted-foreground text-base sm:text-lg">
          Tell us L × W × H, ply and quantity. {COMPANY.shortName} quotes, tests GSM / BCT / ECT, and dispatches on our own vehicles.
        </p>

        <div className="my-8 w-full">
          <HeroConveyor />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 hover:bg-accent transition-colors"
          >
            Request a quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 hover:border-foreground/60 transition-colors"
          >
            See box types
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const reduced = usePrefersReducedMotion();
  const items = [
    "Fully automatic plant",
    "5-ply corrugation",
    "Custom die cut",
    "In-house GSM · BCT · ECT",
    "Same-day dispatch on running sizes",
    "Captive transport",
  ];
  return (
    <div className="border-y border-border bg-primary text-primary-foreground overflow-hidden">
      <motion.div
        className="flex gap-16 py-5 whitespace-nowrap"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
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
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-background p-8"
          >
            <div className="font-display text-5xl text-primary">{s.value}</div>
            <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Products() {
  const featured = featuredProductIds.map((id) => products.find((p) => p.id === id)!);
  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">01 What you can order</p>
          <h2 className="mt-4 text-4xl sm:text-5xl max-w-2xl text-balance">Boxes, folders and internals — priced to your size.</h2>
        </div>
        <p className="max-w-md text-muted-foreground">
          Every carton is cut to inner dimensions. Pick a style, send sizes, get a WhatsApp quote.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="group rounded-2xl bg-card border border-border overflow-hidden flex flex-col"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <motion.img
                src={p.img}
                alt={p.title}
                loading="lazy"
                width={900}
                height={700}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium">{p.tag}</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="mt-3 text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
              <Link
                to="/contact"
                search={{ product: p.id }}
                className="mt-5 inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                Quote this box <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to="/products" className="inline-flex items-center gap-2 text-accent hover:underline">
          All box types <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">02 How an order works</p>
      <h2 className="mt-4 text-4xl sm:text-5xl max-w-2xl text-balance">From a size sheet to a truck in four steps.</h2>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {processSteps.map((s, i) => {
          const Icon = stepIcons[i];
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border p-6 bg-card"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent">{s.n}</span>
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={fluteTexture} alt="" loading="lazy" width={1200} height={800} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-background/85" />
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">03 Who we pack for</p>
          <h2 className="mt-4 text-4xl sm:text-5xl text-balance">Twelve sectors. One plant. Board grade matched to the load.</h2>
        </div>
        <ul className="mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {industries.map((ind, i) => (
            <motion.li
              key={ind.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="rounded-xl border border-border bg-background/80 p-5"
            >
              <div className="font-medium">{ind.name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{ind.need}</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-accent">{ind.products}</p>
            </motion.li>
          ))}
        </ul>
        <div className="mt-10">
          <Link to="/industries" className="inline-flex items-center gap-2 text-accent hover:underline">
            Industry notes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const imgY = useTransform(smooth, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section id="why" ref={ref} className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
      <motion.div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
        <motion.img
          src={factory}
          alt="Corrugated board line at the Tumkur plant"
          loading="lazy"
          width={1400}
          height={900}
          className="absolute inset-0 w-full h-[120%] object-cover"
          style={{ y: imgY }}
        />
      </motion.div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-accent">04 Why this plant</p>
        <h2 className="mt-4 text-4xl sm:text-5xl text-balance">Specified, tested and shipped from one floor.</h2>
        <div className="mt-10 space-y-6">
          {reasons.map((r, i) => {
            const Icon = reasonIcons[i];
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-5 group"
              >
                <div className="shrink-0 w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center group-hover:bg-accent transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium font-sans">{r.title}</h3>
                  <p className="mt-1 text-muted-foreground">{r.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function QuoteBand() {
  return (
    <section className="relative py-24 overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-flute opacity-10" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <h2 className="font-display text-4xl sm:text-6xl text-balance text-center">
          Send sizes. We send a <span className="italic text-accent">price</span>.
        </h2>
        <p className="mt-5 max-w-xl mx-auto text-center text-primary-foreground/70">
          WhatsApp or email — both open with your dimensions already filled in. No account, no portal.
        </p>
        <div className="mt-12 rounded-2xl bg-background text-foreground p-6 sm:p-8">
          <QuoteForm compact />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<string | undefined>(faqs[0].q);
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Questions</p>
      <h2 className="mt-4 text-4xl">Before you call</h2>
      <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="mt-8">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
