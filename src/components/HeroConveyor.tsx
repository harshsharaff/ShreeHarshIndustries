import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Side-view corrugated packaging line.
 * - Rollers spin continuously.
 * - Boxes glide across the belt in a smooth loop.
 * - A circular certification stamp descends and marks each box as it passes.
 * - Hover slows the belt; click gives a short speed boost.
 */
export function HeroConveyor() {
  const [hover, setHover] = useState(false);
  const beltRef = useRef<HTMLDivElement>(null);
  const rollerA = useRef<HTMLDivElement>(null);
  const rollerB = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<Array<HTMLDivElement | null>>([]);
  const stamped = useRef<Set<number>>(new Set());
  const tRef = useRef(0);
  const rot = useRef(0);
  const stampY = useRef(0);
  const burstRef = useRef(0); // seconds of boost remaining

  const boxes = [0, 1, 2, 3, 4];
  const spacing = 220;
  const beltWidth = boxes.length * spacing;

  useAnimationFrame((_, delta) => {
    // delta in ms
    if (burstRef.current > 0) burstRef.current = Math.max(0, burstRef.current - delta);
    const boost = burstRef.current > 0 ? 2.2 : 1;
    const speed = (hover ? 0.04 : 0.11) * boost;
    tRef.current = (tRef.current + delta * speed) % beltWidth;
    rot.current = (rot.current + delta * speed * 1.6) % 360;

    if (rollerA.current) rollerA.current.style.transform = `rotate(${rot.current}deg)`;
    if (rollerB.current) rollerB.current.style.transform = `rotate(${rot.current}deg)`;

    let stampTarget = 0;
    const center = beltWidth / 2;
    boxes.forEach((_, i) => {
      const el = boxRefs.current[i];
      if (!el) return;
      const raw = i * spacing - tRef.current;
      const x = ((raw % beltWidth) + beltWidth) % beltWidth;
      el.style.transform = `translate3d(${x}px, 0, 0)`;
      const dist = Math.abs(x - center);
      if (dist < 40) {
        if (!stamped.current.has(i)) {
          stamped.current.add(i);
          el.dataset.stamped = "true";
        }
        stampTarget = 1;
      }
      // Reset stamp memory once the box has fully cycled past
      if (x > beltWidth - spacing * 0.5 && stamped.current.has(i)) {
        stamped.current.delete(i);
        el.dataset.stamped = "false";
      }
    });

    stampY.current += (stampTarget * 44 - stampY.current) * 0.35;
    if (stampRef.current) stampRef.current.style.transform = `translate3d(-50%, ${stampY.current}px, 0)`;
  });

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => { burstRef.current = 700; }}
      className="relative w-full mx-auto max-w-3xl h-[340px] sm:h-[400px] cursor-pointer select-none"
      aria-label="Interactive corrugated packaging line"
    >
      {/* Stamp press arm */}
      <div className="absolute left-1/2 top-2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <div className="w-1.5 h-14 bg-foreground/70" />
        <div
          ref={stampRef}
          className="w-24 h-24 rounded-full grid place-items-center shadow-[0_10px_30px_-6px_oklch(0_0_0/0.45)]"
          style={{ willChange: "transform", background: "oklch(0.35 0.05 40)" }}
        >
          <CertStamp />
        </div>
      </div>

      {/* Belt viewport */}
      <div className="absolute inset-x-6 bottom-16 top-36 overflow-hidden">
        <div ref={beltRef} className="absolute inset-0" style={{ willChange: "transform" }}>
          {boxes.map((_, i) => (
            <div
              key={i}
              ref={(el) => { boxRefs.current[i] = el; }}
              data-stamped="false"
              className="group absolute bottom-4 left-0 will-change-transform"
              style={{ width: 130, height: 110 }}
            >
              <Box3D />
            </div>
          ))}
        </div>
      </div>

      {/* Belt surface */}
      <div className="absolute inset-x-6 bottom-14 h-3 rounded-sm bg-gradient-to-b from-foreground/30 to-foreground/70 shadow-inner" />
      <div className="absolute inset-x-6 bottom-11 h-1 bg-foreground/20" />

      {/* Rollers */}
      <div className="absolute left-2 bottom-6 w-14 h-14 rounded-full bg-gradient-to-br from-foreground/80 to-foreground/40 border-2 border-foreground/60 grid place-items-center">
        <div ref={rollerA} className="w-10 h-10 rounded-full border-2 border-dashed border-primary-foreground/70" style={{ willChange: "transform" }} />
      </div>
      <div className="absolute right-2 bottom-6 w-14 h-14 rounded-full bg-gradient-to-br from-foreground/80 to-foreground/40 border-2 border-foreground/60 grid place-items-center">
        <div ref={rollerB} className="w-10 h-10 rounded-full border-2 border-dashed border-primary-foreground/70" style={{ willChange: "transform" }} />
      </div>

      <div className="absolute left-6 bottom-0 w-2 h-8 bg-foreground/60" />
      <div className="absolute right-6 bottom-0 w-2 h-8 bg-foreground/60" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-[-8px] left-0 right-0 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        Hover to slow · Click to boost
      </motion.div>
    </div>
  );
}

/** Circular certification stamp used on the press head (inverted for readability). */
function CertStamp({ color = "oklch(0.95 0.02 80)" }: { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className="w-[88%] h-[88%]" aria-hidden>
      <defs>
        <path id="cs-top" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0" fill="none" />
        <path id="cs-bot" d="M 50,50 m -38,0 a 38,38 0 1,0 76,0" fill="none" />
      </defs>
      <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="2.2" />
      <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="1" />
      <text fill={color} fontFamily="serif" fontWeight="700" fontSize="9.5" letterSpacing="1.2">
        <textPath href="#cs-top" startOffset="50%" textAnchor="middle">SHREE HARSH PACKAGING</textPath>
      </text>
      <text fill={color} fontFamily="serif" fontWeight="700" fontSize="8" letterSpacing="1.6">
        <textPath href="#cs-bot" startOffset="50%" textAnchor="middle">TUMKUR · INDIA</textPath>
      </text>
      <line x1="20" y1="42" x2="80" y2="42" stroke={color} strokeWidth="0.8" />
      <line x1="20" y1="60" x2="80" y2="60" stroke={color} strokeWidth="0.8" />
      <text x="50" y="52" textAnchor="middle" fill={color} fontFamily="serif" fontWeight="800" fontSize="7.5" letterSpacing="0.6">
        BOX CERTIFICATE
      </text>
      <text x="50" y="58" textAnchor="middle" fill={color} fontFamily="serif" fontSize="4.2" letterSpacing="0.3">
        DOUBLE WALL · 5 PLY
      </text>
    </svg>
  );
}

function Box3D() {
  return (
    <div className="relative w-full h-full" style={{ perspective: 600 }}>
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateX(6deg) rotateY(-18deg)" }}>
        {/* Front */}
        <div
          className="absolute inset-0 rounded-[3px]"
          style={{
            background: "linear-gradient(180deg, oklch(0.78 0.08 70), oklch(0.62 0.09 60))",
            boxShadow: "inset 0 -12px 24px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(0,0,0,0.15)",
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 9px, rgba(0,0,0,0.06) 9px 10px)",
          }}
        >
          <div className="absolute inset-0 grid place-items-center opacity-0 [[data-stamped=true]_&]:opacity-100 transition-opacity duration-200">
            <div className="w-16 h-16">
              <CertStamp color="oklch(0.28 0.06 35)" />
            </div>
          </div>
        </div>
        {/* Top */}
        <div
          className="absolute inset-x-0 top-0 h-6 origin-top rounded-t-[3px]"
          style={{
            transform: "rotateX(75deg) translateZ(3px)",
            background: "linear-gradient(180deg, oklch(0.86 0.06 72), oklch(0.74 0.08 68))",
            boxShadow: "inset 0 0 12px rgba(0,0,0,0.15)",
          }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-[oklch(0.9_0.02_80/0.6)]" />
        </div>
        {/* Side */}
        <div
          className="absolute inset-y-0 right-0 w-4 origin-right rounded-r-[3px]"
          style={{
            transform: "rotateY(70deg) translateZ(2px)",
            background: "linear-gradient(180deg, oklch(0.6 0.09 58), oklch(0.48 0.09 55))",
          }}
        />
      </div>
    </div>
  );
}
