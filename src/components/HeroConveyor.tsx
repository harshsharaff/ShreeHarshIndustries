import { Link } from "@tanstack/react-router";
import { useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Ply = 3 | 5;

const W = 800;
const H = 340;
const BELT_Y = 262;
const SPAWN_X = 70;
const FOLD_START = 190;
const FOLD_END = 390;
const PRESS_X = 520;
const DROP_X = 664;
const SPACING = 175;
const COUNT = 4;
const LOOP = SPACING * COUNT;
const BOX_W = 96;
const BOX_H = 72;
const FLAP = 44;
const DEPTH = 18;
const LIFT = 0.55;
const BASE_SPEED = 0.085;
const PRESS_TRAVEL = 34;
const STACK_MAX = 5;
const PALLET_X = 712;
const PALLET_Y = 300;
const STACK_W = 60;
const STACK_H = 36;

const INK = "oklch(0.24 0.08 265)";
const STEEL = "oklch(0.36 0.03 265)";
const STEEL_LIGHT = "oklch(0.6 0.02 265)";
const CREAM = "oklch(0.97 0.01 80)";
const VERMILION = "oklch(0.62 0.20 32)";
const STAMP = "oklch(0.42 0.16 28)";
const TAPE = "oklch(0.94 0.03 85 / 0.8)";

const PALETTE: Record<Ply, { front: string; light: string; side: string; edge: string }> = {
  3: {
    front: "oklch(0.8 0.075 72)",
    light: "oklch(0.88 0.055 74)",
    side: "oklch(0.64 0.085 60)",
    edge: "oklch(0.52 0.085 56)",
  },
  5: {
    front: "oklch(0.72 0.085 64)",
    light: "oklch(0.82 0.07 68)",
    side: "oklch(0.56 0.09 55)",
    edge: "oklch(0.44 0.085 50)",
  },
};

type Sim = {
  t: number;
  prev: number[];
  press: number;
  spark: number;
  packed: number;
  stack: number;
  pending: number;
  dispatch: number;
  dropAt: number;
  inspect: number;
  inspectUntil: number;
  now: number;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => v * v * (3 - 2 * v);

function itemX(t: number, i: number) {
  return SPAWN_X + ((((t + i * SPACING) % LOOP) + LOOP) % LOOP);
}

function geometry(cx: number) {
  const p = clamp01((cx - FOLD_START) / (FOLD_END - FOLD_START));
  const rise = ease(clamp01(p / 0.55));
  const closeL = ease(clamp01((p - 0.4) / 0.4));
  const closeR = ease(clamp01((p - 0.55) / 0.45));
  const h = 6 + (BOX_H - 6) * rise;
  const d = DEPTH * rise;
  return {
    rise,
    closeL,
    closeR,
    h,
    d,
    lift: d * LIFT,
    top: BELT_Y - h,
    x0: cx - BOX_W / 2,
    x1: cx + BOX_W / 2,
  };
}

/**
 * Side view of a corrugated box line: reel → corrugator → folder → stamp & tape → pallet.
 * Everything a carton shows is derived from its x position on the belt.
 */
export function HeroConveyor() {
  const reduced = usePrefersReducedMotion();
  const [ply, setPly] = useState<Ply>(5);
  const [speed, setSpeed] = useState(1);
  const [, setFrame] = useState(0);
  const sim = useRef<Sim>({
    t: 0,
    prev: [],
    press: 0,
    spark: 0,
    packed: 0,
    stack: 2,
    pending: 0,
    dispatch: 0,
    dropAt: -1e9,
    inspect: -1,
    inspectUntil: 0,
    now: 0,
  });

  useEffect(() => {
    if (reduced) setSpeed(0);
  }, [reduced]);

  useAnimationFrame((time, delta) => {
    const s = sim.current;
    s.now = time;
    const dt = Math.min(delta, 48);
    const before = s.t;
    s.t += dt * BASE_SPEED * speed;

    let pressTarget = 0;
    for (let i = 0; i < COUNT; i++) {
      const x = itemX(s.t, i);
      const prev = s.prev[i] ?? x;
      if (prev < PRESS_X && x >= PRESS_X) s.spark = 1;
      if (prev < DROP_X && x >= DROP_X) {
        s.packed += 1;
        s.dropAt = time;
        if (s.dispatch > 0) s.pending += 1;
        else s.stack += 1;
        if (s.stack >= STACK_MAX && s.dispatch === 0) s.dispatch = 0.001;
      }
      if (Math.abs(x - PRESS_X) < 24) pressTarget = 1;
      s.prev[i] = x;
    }

    const pressBefore = s.press;
    s.press += (pressTarget - s.press) * Math.min(1, dt * 0.02);
    s.spark = Math.max(0, s.spark - dt * 0.004);

    if (s.dispatch > 0) {
      s.dispatch += dt / 1100;
      if (s.dispatch >= 1) {
        s.dispatch = 0;
        s.stack = Math.min(STACK_MAX - 1, s.pending);
        s.pending = 0;
      }
    }
    if (s.inspect >= 0 && time > s.inspectUntil) s.inspect = -1;

    const busy =
      s.t !== before ||
      Math.abs(s.press - pressBefore) > 0.001 ||
      s.spark > 0 ||
      s.dispatch > 0 ||
      time - s.dropAt < 300 ||
      s.inspect >= 0;
    if (busy) setFrame((f) => (f + 1) % 1_000_000);
  });

  function inspect(i: number) {
    const s = sim.current;
    s.inspect = i;
    s.inspectUntil = s.now + 2200;
    setFrame((f) => (f + 1) % 1_000_000);
  }

  const s = sim.current;
  const pal = PALETTE[ply];
  const pressOffset = s.press * PRESS_TRAVEL;
  const spin = s.t * 1.4;
  const stackShift = ease(clamp01(s.dispatch)) * 110;
  const stackFade = 1 - clamp01((s.dispatch - 0.5) * 2);
  const dropAge = clamp01((s.now - s.dropAt) / 260);
  const inspectX = s.inspect >= 0 ? itemX(s.t, s.inspect) : -1;

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label="Animated corrugated box line: paper reel, corrugator, folder, stamp and tape press, pallet"
      >
        <defs>
          <pattern id="sh-flute" width="6" height="10" patternUnits="userSpaceOnUse">
            <rect width="1" height="10" fill="rgba(0,0,0,0.07)" />
          </pattern>
          <pattern id="sh-hazard" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="6" height="12" fill="oklch(0.85 0.17 90)" />
            <rect x="6" width="6" height="12" fill="oklch(0.22 0.02 265)" />
          </pattern>
          <linearGradient id="sh-press" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="oklch(0.5 0.12 32)" />
            <stop offset="1" stopColor="oklch(0.34 0.09 30)" />
          </linearGradient>
        </defs>

        <StationLabel x={87}>Corrugate</StationLabel>
        <StationLabel x={290}>Fold</StationLabel>
        <StationLabel x={752}>Pallet</StationLabel>

        <rect x={0} y={14} width={W} height={10} fill={STEEL} />
        <line x1={0} x2={W} y1={330} y2={330} stroke="oklch(0.88 0.02 75)" strokeWidth={2} />

        {/* Paper reel feeding the corrugator */}
        <line x1={62} y1={130} x2={62} y2={150} stroke={STEEL} strokeWidth={6} />
        <line x1={84} y1={114} x2={132} y2={154} stroke={pal.light} strokeWidth={3} />
        <g transform={`rotate(${spin * 2} 62 104)`}>
          <circle cx={62} cy={104} r={26} fill={pal.light} stroke={pal.edge} strokeWidth={1.5} />
          <circle cx={62} cy={104} r={19} fill="none" stroke={pal.side} strokeWidth={1} />
          <circle cx={62} cy={104} r={12} fill="none" stroke={pal.side} strokeWidth={1} />
          <line x1={62} y1={80} x2={62} y2={92} stroke={pal.edge} strokeWidth={1.5} />
          <circle cx={62} cy={104} r={6} fill={STEEL} />
        </g>

        {/* Folder rails and hangers */}
        <line x1={FOLD_START + 12} y1={24} x2={FOLD_START + 12} y2={152} stroke={STEEL_LIGHT} strokeWidth={3} />
        <line x1={FOLD_END - 12} y1={24} x2={FOLD_END - 12} y2={181} stroke={STEEL_LIGHT} strokeWidth={3} />

        {/* Belt */}
        <rect x={24} y={BELT_Y + 12} width={680} height={4} fill={STEEL} />
        {Array.from({ length: 10 }, (_, i) => 60 + i * 70).map((rx) => (
          <g key={rx} transform={`rotate(${spin * 4} ${rx} ${BELT_Y + 26})`}>
            <circle cx={rx} cy={BELT_Y + 26} r={10} fill={STEEL} />
            <line x1={rx - 7} x2={rx + 7} y1={BELT_Y + 26} y2={BELT_Y + 26} stroke={STEEL_LIGHT} strokeWidth={2} />
          </g>
        ))}
        <rect x={44} y={BELT_Y + 12} width={8} height={56} fill={STEEL} />
        <rect x={676} y={BELT_Y + 12} width={8} height={56} fill={STEEL} />
        <rect x={24} y={BELT_Y} width={680} height={12} rx={3} fill={INK} />
        <line
          x1={24}
          x2={704}
          y1={BELT_Y + 4}
          y2={BELT_Y + 4}
          stroke="oklch(1 0 0 / 0.22)"
          strokeWidth={2}
          strokeDasharray="10 10"
          strokeDashoffset={-(s.t % 20)}
        />

        {/* Pallet */}
        <line x1={704} y1={BELT_Y + 2} x2={718} y2={PALLET_Y - 2} stroke={STEEL_LIGHT} strokeWidth={4} strokeLinecap="round" />
        <rect x={PALLET_X} y={PALLET_Y} width={84} height={8} fill="oklch(0.62 0.07 60)" />
        {[4, 38, 72].map((bx) => (
          <rect key={bx} x={PALLET_X + bx} y={PALLET_Y + 8} width={8} height={22} fill="oklch(0.55 0.07 58)" />
        ))}
        <g transform={`translate(${stackShift} 0)`} opacity={stackFade}>
          {Array.from({ length: s.stack }, (_, k) => {
            const isTop = k === s.stack - 1;
            const drop = isTop && s.dispatch === 0 ? (1 - ease(dropAge)) * 40 : 0;
            return (
              <StackBox
                key={k}
                x={PALLET_X + 8}
                y={PALLET_Y - (k + 1) * STACK_H - drop}
                ply={ply}
                lid={isTop}
              />
            );
          })}
        </g>
        {s.dispatch > 0 ? (
          <text x={752} y={96} textAnchor="middle" fontSize={13} fontWeight={700} letterSpacing={2} fill={VERMILION}>
            DISPATCHED
          </text>
        ) : null}

        {/* Cartons */}
        {Array.from({ length: COUNT }, (_, i) => {
          const x = itemX(s.t, i);
          if (x >= DROP_X) return null;
          return (
            <Carton key={i} cx={x} ply={ply} inspected={s.inspect === i} onInspect={() => inspect(i)} />
          );
        })}

        {/* Folder plough rail sits in front of the flaps */}
        <line x1={FOLD_START} y1={150} x2={FOLD_END} y2={182} stroke={STEEL_LIGHT} strokeWidth={5} strokeLinecap="round" />

        {/* Corrugator housing covers new sheets until they exit */}
        <rect x={24} y={150} width={128} height={112} rx={6} fill={STEEL} />
        <rect x={40} y={164} width={96} height={44} rx={4} fill="oklch(0.2 0.03 265)" />
        <Gear cx={66} cy={186} angle={spin * 3} color={pal.side} />
        <Gear cx={110} cy={186} angle={-spin * 3} color={pal.side} />
        <text x={88} y={228} textAnchor="middle" fontSize={10} letterSpacing={2} fill={CREAM} className="max-sm:hidden">
          CORRUGATOR
        </text>
        <rect x={52} y={226} width={72} height={26} rx={13} fill={VERMILION} className="sm:hidden" />
        <rect x={58} y={236} width={60} height={18} rx={9} fill={VERMILION} className="max-sm:hidden" />
        <text
          x={88}
          y={249}
          textAnchor="middle"
          fontSize={10}
          fontWeight={700}
          fill={CREAM}
          className="max-sm:text-[18px]"
        >
          {ply} PLY
        </text>

        {/* Stamp & tape press */}
        <rect x={PRESS_X - 70} y={24} width={6} height={176} fill={STEEL} />
        <rect x={PRESS_X + 64} y={24} width={6} height={176} fill={STEEL} />
        <rect x={PRESS_X - 16} y={24} width={32} height={56} rx={3} fill={STEEL} />
        <rect x={PRESS_X - 12} y={36} width={24} height={3} fill={STEEL_LIGHT} />
        <rect x={PRESS_X - 12} y={46} width={24} height={3} fill={STEEL_LIGHT} />
        <rect x={PRESS_X - 5} y={80} width={10} height={30 + pressOffset} fill={STEEL_LIGHT} />
        <g transform={`translate(0 ${pressOffset})`}>
          <rect x={PRESS_X - 58} y={110} width={116} height={36} rx={4} fill="url(#sh-press)" />
          <rect x={PRESS_X - 58} y={110} width={116} height={7} fill="url(#sh-hazard)" />
          <text
            x={PRESS_X}
            y={137}
            textAnchor="middle"
            fontSize={11}
            fontWeight={700}
            letterSpacing={2}
            fill={CREAM}
            className="max-sm:text-[15px] max-sm:tracking-[0px]"
          >
            STAMP · TAPE
          </text>
        </g>
        {s.spark > 0 ? (
          <g opacity={s.spark}>
            {[-1, 1].map((dir) =>
              [0, 1, 2].map((k) => (
                <circle
                  key={`${dir}-${k}`}
                  cx={PRESS_X + dir * (54 + (1 - s.spark) * (10 + k * 8))}
                  cy={182 - k * 6 - (1 - s.spark) * 6}
                  r={2.2 - k * 0.5}
                  fill="oklch(0.88 0.13 80)"
                />
              )),
            )}
          </g>
        ) : null}

        {inspectX >= 0 && inspectX < DROP_X ? <QcTag cx={inspectX} ply={ply} /> : null}
      </svg>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm">
        <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background/80 pl-1 pr-3 py-1">
          <div role="radiogroup" aria-label="Board grade" className="inline-flex">
            {([3, 5] as const).map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={ply === n}
                onClick={() => setPly(n)}
                className={`rounded-full px-3 py-1 transition-colors ${
                  ply === n ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n} ply
              </button>
            ))}
          </div>
          <BoardSection ply={ply} offset={s.t * 0.25} />
        </div>

        <label className="inline-flex items-center gap-2 text-muted-foreground">
          Line speed
          <input
            type="range"
            min={0}
            max={2}
            step={0.1}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-28 accent-accent"
            aria-valuetext={speed === 0 ? "Stopped" : `${speed.toFixed(1)} times`}
          />
          <span className="w-10 tabular-nums text-foreground">{speed === 0 ? "Stop" : `${speed.toFixed(1)}×`}</span>
        </label>

        <div className="text-muted-foreground">
          Packed <span className="tabular-nums font-medium text-foreground">{s.packed}</span>
        </div>

        <Link
          to="/contact"
          search={{ ply }}
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          Quote {ply}-ply boxes <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Tap a carton to QC-check it</p>
    </div>
  );
}

function StationLabel({ x, children }: { x: number; children: string }) {
  return (
    <text
      x={x}
      y={52}
      textAnchor="middle"
      fontSize={13}
      letterSpacing={3}
      fill="oklch(0.45 0.03 265)"
      className="max-sm:text-[24px] max-sm:tracking-[1px]"
      style={{ textTransform: "uppercase" }}
    >
      {children}
    </text>
  );
}

function Gear({ cx, cy, angle, color }: { cx: number; cy: number; angle: number; color: string }) {
  return (
    <g transform={`rotate(${angle} ${cx} ${cy})`}>
      <circle cx={cx} cy={cy} r={15} fill="none" stroke={color} strokeWidth={6} strokeDasharray="4 3.2" />
      <circle cx={cx} cy={cy} r={5} fill={STEEL_LIGHT} />
    </g>
  );
}

function Carton({
  cx,
  ply,
  inspected,
  onInspect,
}: {
  cx: number;
  ply: Ply;
  inspected: boolean;
  onInspect: () => void;
}) {
  const pal = PALETTE[ply];
  const g = geometry(cx);
  const stamped = cx >= PRESS_X;
  const aL = Math.PI * (1 - g.closeL);
  const aR = Math.PI * (1 - g.closeR);
  const lid = clamp01((Math.min(g.closeL, g.closeR) - 0.85) / 0.15);
  const stampY = g.top + g.h * 0.6;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label="QC-check this carton"
      onClick={onInspect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onInspect();
        }
      }}
      className="cursor-pointer outline-none"
    >
      {g.d > 0.5 ? (
        <polygon
          points={`${g.x1},${g.top} ${g.x1 + g.d},${g.top - g.lift} ${g.x1 + g.d},${BELT_Y - g.lift} ${g.x1},${BELT_Y}`}
          fill={pal.side}
        />
      ) : null}
      <rect
        x={g.x0}
        y={g.top}
        width={BOX_W}
        height={g.h}
        fill={pal.front}
        stroke={pal.edge}
        strokeWidth={ply === 5 ? 1.6 : 1}
      />
      <rect x={g.x0} y={g.top} width={BOX_W} height={g.h} fill="url(#sh-flute)" />
      {lid > 0 ? (
        <polygon
          points={`${g.x0},${g.top} ${g.x1},${g.top} ${g.x1 + g.d},${g.top - g.lift} ${g.x0 + g.d},${g.top - g.lift}`}
          fill={pal.light}
          stroke={pal.edge}
          strokeWidth={0.8}
          opacity={lid}
        />
      ) : null}
      {lid < 1 ? (
        <g opacity={1 - lid} stroke={pal.edge} strokeWidth={4} strokeLinecap="round">
          <line x1={g.x0} y1={g.top} x2={g.x0 + Math.cos(aL) * FLAP} y2={g.top - Math.sin(aL) * FLAP} />
          <line x1={g.x1} y1={g.top} x2={g.x1 - Math.cos(aR) * FLAP} y2={g.top - Math.sin(aR) * FLAP} />
        </g>
      ) : null}
      {stamped ? (
        <>
          <polygon
            points={`${cx - 6},${g.top} ${cx + 6},${g.top} ${cx + 6 + g.d},${g.top - g.lift} ${cx - 6 + g.d},${g.top - g.lift}`}
            fill={TAPE}
          />
          <rect x={cx - 6} y={g.top} width={12} height={14} fill={TAPE} />
          <g transform={`rotate(-8 ${cx} ${stampY})`} fill="none" stroke={STAMP}>
            <circle cx={cx} cy={stampY} r={17} strokeWidth={2} />
            <circle cx={cx} cy={stampY} r={13} strokeWidth={0.8} />
            <text x={cx} y={stampY - 1} textAnchor="middle" fontSize={7.5} fontWeight={800} fill={STAMP} stroke="none">
              SHREE
            </text>
            <text x={cx} y={stampY + 7} textAnchor="middle" fontSize={7.5} fontWeight={800} fill={STAMP} stroke="none">
              HARSH
            </text>
          </g>
        </>
      ) : null}
      {inspected ? (
        <rect
          x={g.x0 - 6}
          y={g.top - g.lift - 6}
          width={BOX_W + g.d + 12}
          height={g.h + g.lift + 12}
          rx={6}
          fill="none"
          stroke={VERMILION}
          strokeWidth={2}
          strokeDasharray="6 4"
        />
      ) : null}
    </g>
  );
}

function StackBox({ x, y, ply, lid }: { x: number; y: number; ply: Ply; lid: boolean }) {
  const pal = PALETTE[ply];
  const d = 10;
  const lift = d * LIFT;
  return (
    <g>
      <polygon
        points={`${x + STACK_W},${y} ${x + STACK_W + d},${y - lift} ${x + STACK_W + d},${y + STACK_H - lift} ${x + STACK_W},${y + STACK_H}`}
        fill={pal.side}
      />
      <rect x={x} y={y} width={STACK_W} height={STACK_H} fill={pal.front} stroke={pal.edge} strokeWidth={1} />
      <rect x={x + STACK_W / 2 - 4} y={y} width={8} height={9} fill={TAPE} />
      <circle cx={x + STACK_W / 2} cy={y + STACK_H * 0.62} r={7} fill="none" stroke={STAMP} strokeWidth={1.4} />
      {lid ? (
        <polygon
          points={`${x},${y} ${x + STACK_W},${y} ${x + STACK_W + d},${y - lift} ${x + d},${y - lift}`}
          fill={pal.light}
          stroke={pal.edge}
          strokeWidth={0.8}
        />
      ) : null}
    </g>
  );
}

function QcTag({ cx, ply }: { cx: number; ply: Ply }) {
  const g = geometry(cx);
  const underPress = Math.abs(cx - PRESS_X) < 110;
  const y = underPress ? BELT_Y + 20 : g.top - g.lift - 56;
  return (
    <g pointerEvents="none">
      <rect x={cx - 68} y={y} width={136} height={40} rx={8} fill={INK} />
      {underPress ? (
        <polygon points={`${cx - 6},${y} ${cx + 6},${y} ${cx},${y - 7}`} fill={INK} />
      ) : (
        <polygon points={`${cx - 6},${y + 40} ${cx + 6},${y + 40} ${cx},${y + 47}`} fill={INK} />
      )}
      <text x={cx} y={y + 17} textAnchor="middle" fontSize={12} fontWeight={700} fill="oklch(0.82 0.16 150)">
        QC PASS ✓
      </text>
      <text x={cx} y={y + 32} textAnchor="middle" fontSize={10} fill={CREAM}>
        {`GSM · BCT · ECT · ${ply} ply`}
      </text>
    </g>
  );
}

function BoardSection({ ply, offset }: { ply: Ply; offset: number }) {
  const pal = PALETTE[ply];
  const flutes = ply === 5 ? [[3, 11], [11, 19]] : [[5, 15]];
  const liners = ply === 5 ? [3, 11, 19] : [5, 15];
  return (
    <svg viewBox="0 0 72 22" className="h-5 w-16" aria-hidden>
      <g transform={`translate(${-(offset % 8)} 0)`}>
        {flutes.map(([a, b]) => (
          <path key={a} d={wave(a + 0.8, b - 0.8)} fill="none" stroke={pal.side} strokeWidth={1.3} />
        ))}
      </g>
      {liners.map((y) => (
        <line key={y} x1={0} x2={72} y1={y} y2={y} stroke={pal.edge} strokeWidth={1.8} />
      ))}
    </svg>
  );
}

function wave(yt: number, yb: number) {
  let d = `M-8,${yb}`;
  for (let x = -8; x < 88; x += 8) {
    d += ` C${x + 2},${yb} ${x + 2},${yt} ${x + 4},${yt} C${x + 6},${yt} ${x + 6},${yb} ${x + 8},${yb}`;
  }
  return d;
}
