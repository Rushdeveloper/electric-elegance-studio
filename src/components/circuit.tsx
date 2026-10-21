import { useRef, useState, type ReactNode } from "react";
import {
  motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent, useInView, type MotionValue,
} from "motion/react";

/** Three-layer wire: base, scroll-revealed active line, and travelling pulse once energized. */
function Wire({ d, progress, color, energized, width = 2, delay = 0 }: {
  d: string; progress: MotionValue<number>; color: string; energized: boolean; width?: number; delay?: number;
}) {
  return (
    <>
      <path d={d} className="stroke-wire-base" strokeWidth={width} fill="none" vectorEffect="non-scaling-stroke" />
      <motion.path d={d} stroke={color} strokeWidth={width} fill="none" strokeLinecap="round"
        style={{ pathLength: progress }} vectorEffect="non-scaling-stroke" className="wire-glow" />
      {energized && (
        <path d={d} stroke="var(--wire-hot)" strokeWidth={width + 1} fill="none" strokeLinecap="round"
          pathLength={100} className="wire-pulse" style={{ animationDelay: `${delay}s` }} vectorEffect="non-scaling-stroke" />
      )}
    </>
  );
}

/** Scroll-linked junction: wires enter from left and right and meet in the centre. */
export function CircuitJunction({ label, size = "md", children }: { label?: string; size?: "md" | "lg"; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 55%"] });
  const p = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);
  const [on, setOn] = useState(!!reduce);
  useMotionValueEvent(p, "change", (v) => setOn(v > 0.97));

  const h = size === "lg" ? 220 : 140;
  const c = h / 2;
  const L = [
    `M0 ${c - 40} H260 L300 ${c - 10} H540 V${c} H588`,
    `M0 ${c - 24} H220 L262 ${c + 12} H520 V${c} H588`,
    `M0 ${c + 34} H180 V${c + 20} H420`,
  ];
  const R = [
    `M1200 ${c + 40} H940 L900 ${c + 10} H660 V${c} H612`,
    `M1200 ${c + 24} H980 L938 ${c - 12} H680 V${c} H612`,
    `M1200 ${c - 34} H1020 V${c - 20} H780`,
  ];

  return (
    <div ref={ref} aria-hidden={!children} className="relative mx-auto w-full max-w-6xl overflow-hidden" style={{ height: children ? undefined : h }}>
      <svg viewBox={`0 0 1200 ${h}`} preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
        {L.map((d, i) => <Wire key={d} d={d} progress={p} color="var(--primary)" energized={on} width={i === 2 ? 1 : 1.6} delay={i * 0.4} />)}
        {R.map((d, i) => <Wire key={d} d={d} progress={p} color="var(--accent)" energized={on} width={i === 2 ? 1 : 1.6} delay={i * 0.4 + 0.2} />)}
      </svg>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.span animate={{ scale: on ? 1 : 0.6, opacity: on ? 1 : 0.35 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`relative block size-4 rounded-full border-2 border-primary bg-background ${on ? "junction-on" : ""}`}>
          {on && <span className="junction-ring absolute inset-0 rounded-full border border-primary" />}
        </motion.span>
      </div>
      {label && (
        <motion.p animate={{ opacity: on ? 1 : 0.3 }} className="absolute left-1/2 top-[calc(50%+18px)] -translate-x-1/2 whitespace-nowrap font-display text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
          {label}
        </motion.p>
      )}
      {children && <div className="relative">{children}</div>}
    </div>
  );
}

/** Vertical bus that illuminates with scroll; used for the process timeline. */
export function useSectionProgress(offset: ["start end" | "start 80%", "end 60%" | "end center"] = ["start 80%", "end 60%"]) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const p = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);
  return { ref, p };
}

export function ProcessStep({ n, title, text, progress, at }: { n: number; title: string; text: string; progress: MotionValue<number>; at: number }) {
  const [on, setOn] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setOn(v >= at));
  return (
    <li className="relative pl-16 sm:pl-20">
      <span className={`absolute left-0 top-0 grid size-12 place-items-center rounded-full border-2 font-display text-sm font-extrabold transition-all duration-500 sm:size-14 ${on ? "border-primary bg-primary text-primary-foreground glow-primary" : "border-border bg-card text-muted-foreground"}`}>
        {String(n).padStart(2, "0")}
      </span>
      <div className={`card-volt p-5 transition-opacity duration-500 sm:p-6 ${on ? "opacity-100" : "opacity-60"}`}>
        <h3 className="text-lg font-bold sm:text-xl">{title}</h3>
        <p className="mt-1.5 text-muted-foreground">{text}</p>
      </div>
    </li>
  );
}

/** Staggered reveal wrapper. */
export function Reveal({ children, i = 0, className }: { children: ReactNode; i?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  return (
    <motion.div ref={ref} className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={seen || reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/** Horizontal bus line with drops into a card grid, drawn with scroll. */
export function GridBus({ drops, progress }: { drops: number; progress: MotionValue<number> }) {
  const xs = Array.from({ length: drops }, (_, i) => ((i + 0.5) / drops) * 1200);
  const [on, setOn] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setOn(v > 0.97));
  return (
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden className="pointer-events-none mb-2 hidden h-10 w-full lg:block">
      <Wire d="M0 8 H1200" progress={progress} color="var(--accent)" energized={on} width={1.4} />
      {xs.map((x, i) => <Wire key={x} d={`M${x} 8 V40`} progress={progress} color="var(--primary)" energized={on} width={1.4} delay={i * 0.25} />)}
    </svg>
  );
}
