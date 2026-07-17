import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

/**
 * A side-view corrugated packaging line.
 * - Rollers spin continuously.
 * - Boxes glide across the belt in a smooth loop.
 * - A stamp press descends and stamps SHP onto each box as it passes.
 * - Hover slows the belt; click sends a burst of speed.
 * Pure CSS transforms + rAF, no layout thrash.
 */
export function HeroConveyor() {
  const [hover, setHover] = useState(false);
  const [burst, setBurst] = useState(0);
  const beltRef = useRef<HTMLDivElement>(null);
  const rollerA = useRef<HTMLDivElement>(null);
  const rollerB = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<Array<HTMLDivElement | null>>([]);
  const stamped = useRef<Set<number>>(new Set());
  const tRef = useRef(0);
  const rot = useRef(0);
  const stampY = useRef(0);

  const boxes = [0, 1, 2, 3, 4];
  const spacing = 220;
  const beltWidth = boxes.length * spacing;

  useAnimationFrame((_, delta) => {
    const boost = burst > 0 ? 2.2 : 1;
    if (burst > 0) setTimeout(() => setBurst((b) => Math.max(0, b - 1)), 600);
    const speed = (hover ? 0.04 : 0.11) * boost;
    tRef.current = (tRef.current + delta * speed) % beltWidth;
    rot.current = (rot.current + delta * speed * 1.6) % 360;

    if (rollerA.current) rollerA.current.style.transform = `rotate(${rot.current}deg)`;
    if (rollerB.current) rollerB.current.style.transform = `rotate(${rot.current}deg)`;

    let stampTarget = 0;
    boxes.forEach((_, i) => {
      const el = boxRefs.current[i];
      if (!el) return;
      const raw = i * spacing - tRef.current;
      const x = ((raw % beltWidth) + beltWidth) % beltWidth;
      el.style.transform = `translate3d(${x}px, 0, 0)`;
      // Stamp zone: center of belt
      const center = beltWidth / 2;
      const dist = Math.abs(x - center);
      if (dist < 30 && !stamped.current.has(i)) {
        stamped.current.add(i);
        el.dataset.stamped = "true";
        stampTarget = 1;
      }
      if (x < 20) {
        stamped.current.delete(i);
        el.dataset.stamped = "false";
      }
    });

    // Simple stamp bob toward target
    stampY.current += (stampTarget * 46 - stampY.current) * 0.35;
    if (stampRef.current) stampRef.current.style.transform = `translate3d(-50%, ${stampY.current}px, 0)`;
  });

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setBurst((b) => b + 1)}
      className="relative w-full mx-auto max-w-3xl h-[320px] sm:h-[380px] cursor-pointer select-none"
      aria-label="Interactive corrugated packaging line"
    >
      {/* Stamp press */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <div className="w-1.5 h-16 bg-foreground/70" />
        <div ref={stampRef} className="w-24 h-16 rounded-md bg-primary text-primary-foreground grid place-items-center shadow-[0_10px_30px_-6px_oklch(0_0_0/0.4)] font-display text-sm tracking-[0.3em]" style={{ willChange: "transform" }}>
          SHP
        </div>
      </div>

      {/* Belt viewport */}
      <div className="absolute inset-x-6 bottom-16 top-32 overflow-hidden">
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

      {/* Legs */}
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
          <div className="absolute inset-0 grid place-items-center opacity-0 [[data-stamped=true]_&]:opacity-100 transition-opacity duration-150">
            <div className="font-display text-[13px] tracking-[0.3em] text-primary/80 px-2 py-1 border border-primary/50 rounded-sm bg-background/40">
              SHP
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
