import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/tru-logo.svg";
import { Counter } from "./Counter";
import { RouteMap } from "./RouteMap";

const ease = [0.32, 0.72, 0, 1] as const;

const titleLine1 = ["Investing", "in", "the"];
const titleLine2 = ["places", "we", "pass", "through."];

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  // Parallax layers (back → front, slowest → fastest)
  const yAuroraBack = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yAuroraMid = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yAuroraFront = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] bg-hero text-primary-foreground overflow-hidden flex items-center pt-24 pb-20"
    >
      {/* Electric green aurora — parallax back */}
      <motion.div style={{ y: yAuroraBack }} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-electric/30 blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, 60, 0], y: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div style={{ y: yAuroraMid }} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full bg-primary-glow/40 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], x: [0, -80, 0], y: [0, 60, 0], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div style={{ y: yAuroraFront }} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-electric-soft/20 blur-3xl"
          animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Grid backdrop — parallax (slower than content) */}
      <motion.div
        style={{ scale, y: yGrid }}
        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(hsl(var(--electric))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--electric))_1px,transparent_1px)] [background-size:60px_60px] pointer-events-none"
      />

      {/* Subtle SVG noise texture overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />

      {/* Floating electric particles */}
      {[...Array(14)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-electric pointer-events-none"
          style={{
            width: i % 3 === 0 ? 4 : 2,
            height: i % 3 === 0 ? 4 : 2,
            left: `${(i * 7.3 + 5) % 95}%`,
            filter: "blur(0.5px)",
            boxShadow: "0 0 12px hsl(var(--electric)), 0 0 24px hsl(var(--electric) / 0.6)",
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 9 + (i % 5) * 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "linear",
          }}
        />
      ))}

      <motion.div style={{ y, opacity }} className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease }}
          className="flex justify-center mb-8"
        >
          <img src={logo} alt="TRU" className="h-9 w-auto opacity-90" />
        </motion.div>

        {/* Live electric badge */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-electric/40 bg-electric/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-electric opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric" />
            </span>
            <span className="text-[11px] font-text uppercase tracking-[0.25em] text-electric">
              The TRU Community Fund · 2025
            </span>
          </div>
        </motion.div>

        <h1 className="font-display text-center text-[clamp(2.5rem,7vw,6rem)] leading-[1.1] font-semibold">
          <span className="block text-wave pb-1">
            {titleLine1.map((w, i) => (
              <span key={i} className="inline-block mr-[0.25em]">
                {w}
              </span>
            ))}
          </span>
          <span className="block text-wave pb-2">
            {titleLine2.map((w, i) => (
              <span
                key={i}
                className={`inline-block mr-[0.25em] ${w === "places" ? "text-gradient-electric" : ""}`}
              >
                {w}
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease }}
          className="mt-7 max-w-2xl mx-auto text-center text-base md:text-lg font-text text-primary-foreground/75 leading-relaxed"
        >
          Calling local community groups, schools and charities to help shape the future of
          our spaces and places along the Transpennine route.
        </motion.p>

        {/* Animated route map */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease }}
          className="mt-12"
        >
          <RouteMap />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.a
            href="#fund-2025"
            whileHover={{ scale: 1.04, y: -2, boxShadow: "0 0 40px hsl(145 100% 60% / 0.6)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative px-7 py-3.5 rounded-full bg-electric text-accent-foreground font-text text-[15px] font-semibold shadow-electric overflow-hidden"
          >
            <span className="relative z-10">Discover the 2025 fund →</span>
            <span className="pointer-events-none absolute inset-0 animate-shimmer" />
          </motion.a>
          <motion.a
            href="#recipients"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="px-7 py-3.5 rounded-full glass-dark text-primary-foreground font-text text-[15px] font-medium border border-electric/30 hover:border-electric/60 transition-colors"
          >
            View recipients
          </motion.a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          style={{ y: yMid }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7, ease }}
          className="mt-16 grid grid-cols-3 gap-3 max-w-3xl mx-auto"
        >
          {[
            { v: 250, prefix: "£", suffix: "k", l: "Awarded in 2025" },
            { v: 35, suffix: "", l: "Local organisations" },
            { v: 70, suffix: "mi", l: "Manchester → York" },
          ].map((s) => (
            <motion.div
              key={s.l}
              whileHover={{ y: -6, borderColor: "hsl(145 100% 60% / 0.5)" }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="text-center px-3 py-5 rounded-2xl glass-dark border border-electric/15"
            >
              <Counter
                to={s.v}
                prefix={s.prefix || ""}
                suffix={s.suffix}
                className="font-display text-2xl md:text-4xl font-semibold text-gradient-electric block"
              />
              <div className="mt-1 text-[11px] md:text-sm font-text text-primary-foreground/60">{s.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
