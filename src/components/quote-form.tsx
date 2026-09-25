import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { COMPANY, formatQuoteMessage, mailtoUrl, products, whatsappUrl } from "@/lib/company";
import { cn } from "@/lib/utils";

const fieldClass =
  "mt-1.5 flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";

type QuoteFormProps = {
  defaultProductId?: string;
  compact?: boolean;
  id?: string;
};

export function QuoteForm({ defaultProductId, compact = false, id = "quote" }: QuoteFormProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [productId, setProductId] = useState(defaultProductId ?? "rsc");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [ply, setPly] = useState("5 ply");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (defaultProductId) setProductId(defaultProductId);
  }, [defaultProductId]);

  const product = products.find((p) => p.id === productId) ?? products[0];

  const message = useMemo(
    () =>
      formatQuoteMessage({
        name: name.trim() || "—",
        company: company.trim(),
        phone: phone.trim() || "—",
        email: email.trim(),
        product: product.title,
        length,
        width,
        height,
        ply,
        quantity,
        notes: notes.trim(),
      }),
    [name, company, phone, email, product.title, length, width, height, ply, quantity, notes],
  );

  function validate() {
    if (!name.trim() || !phone.trim()) {
      setError("Add your name and phone so we can send the quote back.");
      return false;
    }
    setError("");
    return true;
  }

  function openWhatsApp() {
    if (!validate()) return;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  function openEmail() {
    if (!validate()) return;
    window.location.href = mailtoUrl(`Box quote — ${company.trim() || name.trim()}`, message);
  }

  return (
    <div id={id} className="scroll-mt-24">
      <div className={cn("grid gap-8", compact ? "" : "lg:grid-cols-[1fr_220px]")}>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            openWhatsApp();
          }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your name" required>
              <input className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </Field>
            <Field label="Company">
              <input className={fieldClass} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
            </Field>
            <Field label="Phone" required>
              <input className={fieldClass} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            </Field>
            <Field label="Email">
              <input className={fieldClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </Field>
            <Field label="Box type">
              <select className={fieldClass} value={productId} onChange={(e) => setProductId(e.target.value)}>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Ply">
              <select className={fieldClass} value={ply} onChange={(e) => setPly(e.target.value)}>
                <option>3 ply</option>
                <option>5 ply</option>
                <option>Not sure — specify for me</option>
              </select>
            </Field>
          </div>

          <div>
            <p className="text-sm font-medium">Inner size (mm)</p>
            <div className="mt-1.5 grid grid-cols-3 gap-3">
              <Dim label="L" value={length} onChange={setLength} />
              <Dim label="W" value={width} onChange={setWidth} />
              <Dim label="H" value={height} onChange={setHeight} />
            </div>
          </div>

          <Field label="Quantity">
            <input
              className={fieldClass}
              inputMode="numeric"
              placeholder="e.g. 5,000 / month"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Field>

          {!compact && (
            <Field label="Notes">
              <textarea
                className={cn(fieldClass, "h-24 py-2")}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Product inside the box, print, delivery city…"
              />
            </Field>
          )}

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 text-sm font-medium hover:brightness-95 transition"
            >
              <MessageCircle className="w-4 h-4" /> Send on WhatsApp
            </button>
            <button
              type="button"
              onClick={openEmail}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium hover:border-foreground/60 transition-colors"
            >
              <Mail className="w-4 h-4" /> Email the quote
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Opens WhatsApp or your mail app with the sizes filled in. We reply from {COMPANY.phoneDisplay}.
          </p>
        </form>

        {!compact && (
          <BoxPreview
            length={Number(length) || 300}
            width={Number(width) || 200}
            height={Number(height) || 150}
            ply={ply}
            label={product.tag}
          />
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      {required ? <span className="text-accent"> *</span> : null}
      {children}
    </label>
  );
}

function Dim({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="sr-only">{label} mm</span>
      <input
        className={fieldClass}
        inputMode="numeric"
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ""))}
      />
    </label>
  );
}

function BoxPreview({
  length,
  width,
  height,
  ply,
  label,
}: {
  length: number;
  width: number;
  height: number;
  ply: string;
  label: string;
}) {
  const max = Math.max(length, width, height, 1);
  const bw = 56 + (width / max) * 88;
  const bh = 48 + (height / max) * 72;
  const bd = 10 + (length / max) * 22;

  return (
    <aside className="rounded-2xl border border-border bg-secondary/60 p-5 flex flex-col items-center justify-center min-h-[240px]">
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-6">Live size</p>
      <div className="relative" style={{ width: bw + bd, height: bh + bd * 0.45 }}>
        <div
          className="absolute right-0 top-0 bg-gradient-to-l from-[oklch(0.58_0.09_55)] to-[oklch(0.5_0.09_55)]"
          style={{ width: bd, height: bh, transform: "skewY(-18deg)", transformOrigin: "top left" }}
        />
        <div
          className="absolute left-0 top-0 bg-gradient-to-b from-[oklch(0.86_0.06_72)] to-[oklch(0.74_0.08_68)]"
          style={{
            width: bw,
            height: bd * 0.55,
            transform: `skewX(-32deg) translate(${bd * 0.15}px, 0)`,
            transformOrigin: "bottom left",
          }}
        />
        <div
          className="absolute left-0 bottom-0 rounded-sm shadow-md grid place-items-center overflow-hidden"
          style={{
            width: bw,
            height: bh,
            background:
              "linear-gradient(180deg, oklch(0.78 0.08 70), oklch(0.62 0.09 60)), repeating-linear-gradient(90deg, transparent 0 8px, rgba(0,0,0,0.06) 8px 9px)",
          }}
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-[oklch(0.35_0.08_30)]">{label}</span>
        </div>
      </div>
      <p className="mt-6 text-xs text-center text-muted-foreground">
        {Math.round(length)} × {Math.round(width)} × {Math.round(height)} mm
        <br />
        {ply}
      </p>
    </aside>
  );
}
