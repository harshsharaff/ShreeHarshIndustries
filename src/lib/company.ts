import boxRsc from "@/assets/box-rsc.jpg";
import boxCcf from "@/assets/box-ccf.jpg";
import boxPartitions from "@/assets/box-partitions.jpg";
import heroBoxes from "@/assets/hero-boxes.jpg";

export const COMPANY = {
  name: "Shree Harsh Industries",
  shortName: "Shree Harsh",
  tagline: "Corrugated boxes, made to your SKU.",
  description:
    "Fully automatic 5-ply corrugated box manufacturer in Tumkur. We cut, test and dispatch cartons for garments, pharma, FMCG, electronics and export cargo.",
  phoneDisplay: "+91 93794 21073",
  phoneTel: "+919379421073",
  phoneWhatsApp: "919379421073",
  email: "shrhrindustries@gmail.com",
  contactName: "Harivats Sharaff",
  gstin: "29AEUFS2060J1Z",
  siteUrl: "https://harshsharaff.github.io/ShreeHarshIndustries",
  addressLine: "Plot No 672, Vasantha Narasapura Industrial Area, 2nd Phase Sub Layout",
  city: "Tumkur 572128",
  state: "Karnataka",
  mapsQuery: "Plot No 672 Vasantha Narasapura Industrial Area Tumkur 572128",
  mapsEmbed:
    "https://maps.google.com/maps?q=Plot%20No%20672%20Vasantha%20Narasapura%20Industrial%20Area%20Tumkur%20572128&t=&z=14&ie=UTF8&iwloc=&output=embed",
} as const;

export const stats = [
  { value: "25+", label: "Years in packaging" },
  { value: "3000T", label: "Monthly capacity" },
  { value: "5 Ply", label: "Automatic plant" },
  { value: "250 KVA", label: "Power backup" },
] as const;

export const products = [
  {
    id: "rsc",
    tag: "RSC",
    title: "Regular Slotted Container",
    img: boxRsc,
    ply: ["3 ply", "5 ply"],
    uses: "General shipping, storage, e-commerce",
    desc: "The workhorse carton. Four flaps meet at the centre, giving strong stacking strength at a low unit cost. We make these to your inner dimensions in 3-ply or 5-ply kraft.",
    specs: ["Custom L × W × H", "3-ply or 5-ply", "Plain or flexo printed"],
  },
  {
    id: "ccf",
    tag: "CCF",
    title: "Corner Cut Folder",
    img: boxCcf,
    ply: ["3 ply"],
    uses: "Garments, textiles, frames, flat goods",
    desc: "A single-piece folder with corner cuts that wraps flat or narrow products without a second carton. Fast to pack on a table or line.",
    specs: ["One-piece wrap", "Corner-cut fold", "Ideal for apparel"],
  },
  {
    id: "inserts",
    tag: "INSERTS",
    title: "Partitions and Dividers",
    img: boxPartitions,
    ply: ["3 ply", "5 ply"],
    uses: "Bottles, glass, electronics, kits",
    desc: "Internal corrugated fittings that stop items knocking each other in transit. Cut to cell count and board grade for your pack.",
    specs: ["Custom cell count", "Die-cut or slotted", "Fits your outer carton"],
  },
  {
    id: "die-cut",
    tag: "DIE CUT",
    title: "Die Cut Cartons",
    img: boxCcf,
    ply: ["3 ply", "5 ply"],
    uses: "Retail packs, odd shapes, display",
    desc: "Precision dies for retail-ready packs, trays and profiles that an RSC cannot form. Send a drawing or a sample and we tool it.",
    specs: ["Custom profile", "Lock-bottom / auto-lock options", "Print-ready faces"],
  },
  {
    id: "5-ply",
    tag: "5 PLY",
    title: "Heavy Duty 5 Ply Boxes",
    img: boxRsc,
    ply: ["5 ply"],
    uses: "Engineering, appliances, export",
    desc: "Extra-rigid board for crush resistance on pallets, long haul and export. Specified by GSM, ECT and BCT for the load you actually ship.",
    specs: ["High ECT / BCT", "Export-ready", "Moisture checked"],
  },
  {
    id: "custom",
    tag: "PRINTED",
    title: "Custom Printed Cartons",
    img: heroBoxes,
    ply: ["3 ply", "5 ply"],
    uses: "Brand identity, handling marks, batch codes",
    desc: "Flexo print your logo, SKU, fragile marks and handling instructions so every carton is identifiable in the warehouse and on the truck.",
    specs: ["Flexo print", "1 to 3 colours typical", "Brand + handling marks"],
  },
] as const;

export type ProductId = (typeof products)[number]["id"];

export const featuredProductIds: ProductId[] = ["rsc", "inserts", "5-ply"];

export const industries = [
  {
    name: "Garment Manufacturing",
    need: "Folders and cartons that pack apparel without crushing finishes.",
    products: "CCF, RSC, printed cartons",
  },
  {
    name: "Pharmaceuticals",
    need: "Clean kraft, consistent GSM and moisture control for regulated goods.",
    products: "RSC, partitions, printed",
  },
  {
    name: "FMCG",
    need: "High-volume RSC with stacking strength for warehouse and retail.",
    products: "RSC, 5-ply, printed",
  },
  {
    name: "Textiles",
    need: "Flat folders and bulk cartons for rolls, bolts and made-ups.",
    products: "CCF, RSC",
  },
  {
    name: "Engineering",
    need: "Heavy 5-ply and custom internals for metal parts and spares.",
    products: "5-ply, die-cut, partitions",
  },
  {
    name: "Fruits and Vegetables",
    need: "Produce cartons that ventilate and still stack in the cold chain.",
    products: "RSC, die-cut trays",
  },
  {
    name: "Beverages",
    need: "High BCT outers and bottle partitions for glass and PET.",
    products: "5-ply, partitions",
  },
  {
    name: "Processed Food",
    need: "Food-grade kraft cartons with print for SKU and handling.",
    products: "RSC, printed, partitions",
  },
  {
    name: "Electronics",
    need: "Dividers and close-fit cartons that stop abrasion in transit.",
    products: "Partitions, die-cut, RSC",
  },
  {
    name: "Consumer Durables",
    need: "Appliance-grade 5-ply with print and handling marks.",
    products: "5-ply, printed, inserts",
  },
  {
    name: "Chemicals",
    need: "Rigid outers for drums, tins and bag-in-box secondary packs.",
    products: "5-ply, RSC",
  },
  {
    name: "Glass Industry",
    need: "Cell partitions and high crush-strength cartons for bottles and ware.",
    products: "Partitions, 5-ply",
  },
] as const;

export const processSteps = [
  {
    n: "01",
    title: "Send sizes",
    body: "Inner L × W × H, ply, print and monthly quantity. A photo of your current box is enough to start.",
  },
  {
    n: "02",
    title: "Get a quote",
    body: "We come back with board grade, price and lead time. Samples on request for new SKUs.",
  },
  {
    n: "03",
    title: "We make and test",
    body: "Corrugation, conversion and GSM / BCT / ECT / moisture checks under one roof in Tumkur.",
  },
  {
    n: "04",
    title: "Dispatch",
    body: "Our own vehicles cover Karnataka. Running sizes can move the same day once approved.",
  },
] as const;

export const reasons = [
  {
    title: "Integrated plant",
    body: "Corrugation to dispatch in Tumkur. No outsourced conversion, so board grade stays consistent.",
  },
  {
    title: "In-house testing",
    body: "Every batch is checked for GSM, BCT, ECT and moisture before it leaves the floor.",
  },
  {
    title: "Captive transport",
    body: "Our fleet keeps deliveries on the date we promised across Karnataka and beyond.",
  },
  {
    title: "Recyclable kraft",
    body: "Kraft-based, fully recyclable cartons. Packaging that can go back into the loop.",
  },
] as const;

export const faqs = [
  {
    q: "What do you need for a quote?",
    a: "Inner length, width and height in mm, 3-ply or 5-ply, whether you need print, and how many boxes per month. If you are unsure of ply, tell us the product weight and we will specify the board.",
  },
  {
    q: "Do you make custom sizes?",
    a: "Yes. Almost every order is cut to the SKU. Send a sample or a dimension sheet and we will match it.",
  },
  {
    q: "Can you print our brand?",
    a: "Yes. Flexo print for logos, SKU names, fragile marks and handling instructions.",
  },
  {
    q: "Where do you deliver?",
    a: "From the Vasantha Narasapura plant in Tumkur. We run our own vehicles across Karnataka and dispatch further on request.",
  },
] as const;

export function whatsappUrl(text: string) {
  return `https://wa.me/${COMPANY.phoneWhatsApp}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(subject: string, body: string) {
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function formatQuoteMessage(input: {
  name: string;
  company: string;
  phone: string;
  email?: string;
  product: string;
  length: string;
  width: string;
  height: string;
  ply: string;
  quantity: string;
  notes?: string;
}) {
  return [
    `Hello ${COMPANY.name},`,
    "",
    "I would like a quote for corrugated boxes.",
    "",
    `Name: ${input.name}`,
    `Company: ${input.company || "Not given"}`,
    `Phone: ${input.phone}`,
    input.email ? `Email: ${input.email}` : null,
    `Product: ${input.product}`,
    `Size (mm): ${input.length || "?"} × ${input.width || "?"} × ${input.height || "?"} (L × W × H)`,
    `Ply: ${input.ply}`,
    `Quantity: ${input.quantity || "Not given"}`,
    input.notes ? `Notes: ${input.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
