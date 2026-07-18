import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Side-view corrugated packaging line.
 * - Rollers spin, belt carries boxes.
 * - A hydraulic press descends onto boxes at the stamping station and marks them.
 * - Hover slows the belt; click gives a short speed boost.
 */
export function HeroConveyor() {
  const [hover, setHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rollerA = useRef<HTMLDivElement>(null);
  const rollerB = useRef<HTMLDivElement>(null);
  const rollerC = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLDivElement>(null);
  const pistonRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<Array<HTMLDivElement | null>>([]);
  const stamped = useRef<Set<number>>(new Set());
  const tRef = useRef(0);
  const rot = useRef(0);
  const pressY = useRef(0);
  const sparkA = useRef(0);
  const burstRef = useRef(0);

  const NUM = 5;
  const BOX_W = 130;
  const boxes = Array.from({ length: NUM }, (_, i) => i);
  const spacing = 220;
  const beltWidth = NUM * spacing;
  const STAMP_WINDOW = 30;


  useAnimationFrame((_, delta) => {
    if (burstRef.current > 0) burstRef.current = Math.max(0, burstRef.current - delta);
    const boost = burstRef.current > 0 ? 2.2 : 1;
    const speed = (hover ? 0.04 : 0.11) * boost;
    tRef.current = (tRef.current + delta * speed) % beltWidth;
    rot.current = (rot.current + delta * speed * 1.6) % 360;

    if (rollerA.current) rollerA.current.style.transform = `rotate(${rot.current}deg)`;
    if (rollerB.current) rollerB.current.style.transform = `rotate(${rot.current}deg)`;
    if (rollerC.current) rollerC.current.style.transform = `rotate(${rot.current}deg)`;

    // Compute STAMP_X so a box's CENTER aligns with the press center.
    // Belt viewport is inset-x-6 (24px each side). Press sits at container center.
    const cw = containerRef.current?.clientWidth ?? 0;
    const pressCenterInBelt = cw / 2 - 24; // relative to belt inner-left
    const STAMP_X = pressCenterInBelt - BOX_W / 2; // box left position when centered under press

    let pressTarget = 0;
    boxes.forEach((_, i) => {
      const el = boxRefs.current[i];
      if (!el) return;
      const raw = i * spacing - tRef.current;
      const x = ((raw % beltWidth) + beltWidth) % beltWidth;
      el.style.transform = `translate3d(${x}px, 0, 0)`;
      const dist = Math.abs(x - STAMP_X);
      if (dist < STAMP_WINDOW) {
        pressTarget = 1;
        if (dist < 6 && !stamped.current.has(i)) {
          stamped.current.add(i);
          el.dataset.stamped = "true";
          sparkA.current = 1;
        }
      }
      // Clear stamp once box has looped back near the start
      if (x < spacing * 0.3 && stamped.current.has(i)) {
        stamped.current.delete(i);
        el.dataset.stamped = "false";
      }
    });


    pressY.current += (pressTarget * 46 - pressY.current) * 0.32;
    if (pistonRef.current) pistonRef.current.style.transform = `translate3d(0, ${pressY.current}px, 0)`;
    if (pressRef.current) pressRef.current.style.transform = `translate3d(-50%, ${pressY.current}px, 0)`;

    sparkA.current = Math.max(0, sparkA.current - delta * 0.003);
    if (sparkRef.current) sparkRef.current.style.opacity = String(sparkA.current);
  });

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => { burstRef.current = 700; }}
      className="relative w-full mx-auto max-w-3xl h-[380px] sm:h-[440px] pb-8 cursor-pointer select-none"
      aria-label="Interactive corrugated packaging line"
    >
      {/* Ceiling / factory beam */}
      <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-foreground/70 to-foreground/40" />
      <div className="absolute inset-x-0 top-6 h-1 bg-foreground/80" />
      {/* Hanging bolts */}
      <div className="absolute top-6 left-8 w-1 h-3 bg-foreground/60" />
      <div className="absolute top-6 right-8 w-1 h-3 bg-foreground/60" />

      {/* Press gantry — vertical rails */}
      <div className="absolute left-1/2 -translate-x-[64px] top-6 w-1 h-24 bg-foreground/60" />
      <div className="absolute left-1/2 translate-x-[64px] top-6 w-1 h-24 bg-foreground/60" />

      {/* Hydraulic cylinder (fixed) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-6 w-10 h-14 rounded-b-sm bg-gradient-to-b from-foreground/80 to-foreground/50 border border-foreground/40">
        <div className="absolute inset-x-1 top-1 h-1 rounded bg-foreground/30" />
        <div className="absolute inset-x-1 top-3 h-1 rounded bg-foreground/30" />
        <div className="absolute -right-3 top-3 w-3 h-2 bg-foreground/60" />
        <div className="absolute -left-3 top-3 w-3 h-2 bg-foreground/60" />
      </div>

      {/* Piston rod (extends) */}
      <div ref={pistonRef} className="absolute left-1/2 -translate-x-1/2 top-20 w-3 h-10 bg-gradient-to-b from-foreground/40 to-foreground/70" style={{ willChange: "transform" }} />

      {/* Stamp head (moves with piston) */}
      <div
        ref={pressRef}
        className="absolute left-1/2 top-[118px] w-32 h-14 rounded-sm shadow-[0_8px_20px_-4px_oklch(0_0_0/0.5)] grid place-items-center border-b-4 border-foreground/70"
        style={{ willChange: "transform", background: "linear-gradient(180deg, oklch(0.45 0.08 35), oklch(0.32 0.06 30))" }}
      >
        {/* Warning stripes on top */}
        <div className="absolute inset-x-0 top-0 h-2 opacity-90"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, oklch(0.85 0.18 90) 0 6px, oklch(0.2 0 0) 6px 12px)" }} />
        <div className="text-[10px] font-black tracking-[0.15em] text-[oklch(0.95_0.02_80)] mt-1">
          PRESS · 5T
        </div>
      </div>

      {/* Spark/dust burst when stamping */}
      <div ref={sparkRef} className="absolute left-1/2 top-[178px] -translate-x-1/2 pointer-events-none opacity-0" style={{ willChange: "opacity" }}>
        <div className="relative w-24 h-4">
          <span className="absolute left-0 top-1 w-1.5 h-1.5 rounded-full bg-[oklch(0.9_0.12_75)]" />
          <span className="absolute left-4 top-2 w-1 h-1 rounded-full bg-[oklch(0.85_0.1_70)]" />
          <span className="absolute right-4 top-1 w-1 h-1 rounded-full bg-[oklch(0.85_0.1_70)]" />
          <span className="absolute right-0 top-2 w-1.5 h-1.5 rounded-full bg-[oklch(0.9_0.12_75)]" />
        </div>
      </div>

      {/* Station label */}
      <div className="absolute left-1/2 -translate-x-1/2 top-2 text-[9px] uppercase tracking-[0.3em] text-primary-foreground/90 font-bold">
        Stamping Station
      </div>

      {/* Belt viewport */}
      <div className="absolute inset-x-6 bottom-16 top-[195px] overflow-hidden">
        <div className="absolute inset-0">
          {boxes.map((_, i) => (
            <div
              key={i}
              ref={(el) => { boxRefs.current[i] = el; }}
              data-stamped="false"
              className="absolute bottom-2 left-0 will-change-transform"
              style={{ width: 130, height: 100 }}
            >
              <Box3D />
            </div>
          ))}
        </div>
      </div>

      {/* Belt surface */}
      <div className="absolute inset-x-6 bottom-14 h-3 rounded-sm bg-gradient-to-b from-foreground/30 to-foreground/70 shadow-inner" />
      <div className="absolute inset-x-6 bottom-11 h-1 bg-foreground/20"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, oklch(0 0 0/0.25) 0 8px, transparent 8px 16px)" }} />

      {/* Rollers */}
      <Roller className="left-2 bottom-6" innerRef={rollerA} />
      <Roller className="left-1/2 -translate-x-1/2 bottom-6" innerRef={rollerC} small />
      <Roller className="right-2 bottom-6" innerRef={rollerB} />

      {/* Base legs */}
      <div className="absolute left-6 bottom-0 w-2 h-8 bg-foreground/60" />
      <div className="absolute right-6 bottom-0 w-2 h-8 bg-foreground/60" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-foreground/40" />

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

function Roller({ className, innerRef, small }: { className: string; innerRef: React.RefObject<HTMLDivElement | null>; small?: boolean }) {
  const size = small ? "w-10 h-10" : "w-14 h-14";
  const inner = small ? "w-7 h-7" : "w-10 h-10";
  return (
    <div className={`absolute ${size} rounded-full bg-gradient-to-br from-foreground/80 to-foreground/40 border-2 border-foreground/60 grid place-items-center ${className}`}>
      <div ref={innerRef} className={`${inner} rounded-full border-2 border-dashed border-primary-foreground/70`} style={{ willChange: "transform" }} />
    </div>
  );
}

/** Simple round stamp mark: "SHREE HARSH" over "TUMKUR". */
function StampMark() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden>
      <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.35 0.14 25)" strokeWidth="3" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="oklch(0.35 0.14 25)" strokeWidth="1.2" />
      <text x="50" y="46" textAnchor="middle" fill="oklch(0.35 0.14 25)" fontFamily="serif" fontWeight="900" fontSize="13" letterSpacing="1">
        SHREE
      </text>
      <text x="50" y="60" textAnchor="middle" fill="oklch(0.35 0.14 25)" fontFamily="serif" fontWeight="900" fontSize="13" letterSpacing="1">
        HARSH
      </text>
      <text x="50" y="74" textAnchor="middle" fill="oklch(0.35 0.14 25)" fontFamily="serif" fontWeight="700" fontSize="7" letterSpacing="2">
        TUMKUR
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
          className="absolute inset-0 rounded-[3px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, oklch(0.78 0.08 70), oklch(0.62 0.09 60))",
            boxShadow: "inset 0 -12px 24px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(0,0,0,0.15)",
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 9px, rgba(0,0,0,0.06) 9px 10px)",
          }}
        >
          <div className="absolute inset-0 grid place-items-center opacity-0 [[data-stamped=true]_&]:opacity-100 transition-opacity duration-150">
            <div className="w-14 h-14 -rotate-6">
              <StampMark />
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
