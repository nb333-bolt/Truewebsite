import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const stations = [
  { name: "Manchester", x: 60, y: 110, major: true },
  { name: "Stalybridge", x: 165, y: 95 },
  { name: "Huddersfield", x: 320, y: 80, major: true },
  { name: "Dewsbury", x: 450, y: 95 },
  { name: "Leeds", x: 580, y: 75, major: true },
  { name: "Garforth", x: 720, y: 90 },
  { name: "York", x: 880, y: 70, major: true },
];

// Train animation timing — single source of truth
const TRAIN_DELAY = 2.5;
const TRAIN_DURATION = 7;

// Smooth path connecting the stations
const pathD =
  "M 60 110 Q 110 90, 165 95 T 320 80 Q 385 70, 450 95 T 580 75 Q 650 65, 720 90 T 880 70";

export const RouteMap = () => {
  // Auto-sync station reveal timing with the actual train path position.
  // We measure each station's progress along the SVG path (0..1) and
  // derive its delay from TRAIN_DELAY + progress * TRAIN_DURATION.
  // This stays accurate even if TRAIN_DURATION or the path itself changes.
  const measureRef = useRef<SVGPathElement | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const path = measureRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    if (!total) return;

    // Sample the path and find the closest point to each station
    const SAMPLES = 600;
    const samples: { x: number; y: number; len: number }[] = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const len = (i / SAMPLES) * total;
      const pt = path.getPointAtLength(len);
      samples.push({ x: pt.x, y: pt.y, len });
    }

    const next: Record<string, number> = {};
    for (const s of stations) {
      let bestLen = 0;
      let bestDist = Infinity;
      for (const p of samples) {
        const dx = p.x - s.x;
        const dy = p.y - s.y;
        const d = dx * dx + dy * dy;
        if (d < bestDist) {
          bestDist = d;
          bestLen = p.len;
        }
      }
      next[s.name] = bestLen / total;
    }
    setProgressMap(next);
  }, []);

  const stationDelay = useMemo(
    () => (name: string) => TRAIN_DELAY + (progressMap[name] ?? 0) * TRAIN_DURATION,
    [progressMap],
  );

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Caption above */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-electric animate-electric-pulse" />
          <span className="text-[11px] font-text uppercase tracking-[0.25em] text-electric">
            Live · Transpennine Route
          </span>
        </div>
        <span className="text-[11px] font-text uppercase tracking-[0.2em] text-primary-foreground/40">
          70 miles · 4 cities
        </span>
      </div>

      <div className="relative rounded-[2rem] glass-dark border border-electric/20 p-6 md:p-8 overflow-hidden shadow-electric">
        {/* Glow backdrop */}
        <motion.div
          className="absolute inset-0 opacity-50 pointer-events-none"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "radial-gradient(circle at 20% 50%, hsl(145 100% 50% / 0.18), transparent 40%), radial-gradient(circle at 80% 50%, hsl(222 90% 50% / 0.25), transparent 40%)",
            backgroundSize: "200% 200%",
          }}
        />

        <svg
          viewBox="0 0 940 220"
          className="relative w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="railGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(145 100% 60%)" />
              <stop offset="50%" stopColor="hsl(170 100% 55%)" />
              <stop offset="100%" stopColor="hsl(145 100% 60%)" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base rail (dim) */}
          <path
            d={pathD}
            fill="none"
            stroke="hsl(0 0% 100% / 0.1)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Animated drawn rail */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#railGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: [0.32, 0.72, 0, 1] }}
          />

          {/* Flowing energy dashes on top */}
          <path
            d={pathD}
            fill="none"
            stroke="hsl(145 100% 70%)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 24"
            className="animate-dash-flow"
            opacity="0.9"
            filter="url(#glow)"
          />

          {/* Hidden measurement path — used to derive station progress (auto-sync) */}
          <path ref={measureRef} d={pathD} fill="none" stroke="none" />

          {/* Stations — appear as the train passes through */}
          {stations.map((s, i) => {
            const delay = stationDelay(s.name);
            return (
              <g key={s.name}>
                {/* Burst flash when train arrives */}
                <motion.circle
                  cx={s.x}
                  cy={s.y}
                  r={s.major ? 10 : 6}
                  fill="none"
                  stroke="hsl(145 100% 70%)"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0.2 }}
                  whileInView={{ opacity: [0, 1, 0], scale: [0.2, 3.2, 4] }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                />
                {/* Continuous pulsing ring (after arrival) */}
                <motion.circle
                  cx={s.x}
                  cy={s.y}
                  r={s.major ? 10 : 6}
                  fill="none"
                  stroke="hsl(145 100% 60%)"
                  strokeWidth="1.5"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: [0, 0.7, 0], scale: [0.6, 2.2, 2.5] }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2.4,
                    delay: delay + 0.6,
                    repeat: Infinity,
                    repeatDelay: 0.6,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                />
                {/* Station dot — pops in as train arrives */}
                <motion.circle
                  cx={s.x}
                  cy={s.y}
                  r={s.major ? 7 : 4.5}
                  fill={s.major ? "hsl(145 100% 60%)" : "hsl(0 0% 100%)"}
                  filter={s.major ? "url(#strongGlow)" : "url(#glow)"}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: [0, 1.6, 1], opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay,
                    ease: [0.32, 0.72, 0, 1],
                    times: [0, 0.5, 1],
                  }}
                  style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                />
                {/* Inner core */}
                {s.major && (
                  <motion.circle
                    cx={s.x}
                    cy={s.y}
                    r="2.5"
                    fill="hsl(222 100% 18%)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: delay + 0.2 }}
                  />
                )}
                {/* Connector tick from station to label */}
                <motion.line
                  x1={s.x}
                  y1={s.y + (s.major ? 10 : 7)}
                  x2={s.x}
                  y2={s.y + (s.major ? 32 : 26)}
                  stroke="hsl(145 100% 60%)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.6"
                  initial={{ opacity: 0, pathLength: 0 }}
                  whileInView={{ opacity: 0.6, pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: delay + 0.1 }}
                />
                {/* Label — slides up after train passes */}
                <motion.text
                  x={s.x}
                  y={s.y + (s.major ? 50 : 42)}
                  textAnchor="middle"
                  fill="hsl(var(--electric))"
                  fontSize={s.major ? "16" : "13"}
                  fontWeight={s.major ? "700" : "600"}
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', Inter, sans-serif"
                  letterSpacing={s.major ? "0.6" : "0.4"}
                  filter="url(#strongGlow)"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: delay + 0.2, ease: [0.32, 0.72, 0, 1] }}
                  style={{ paintOrder: "stroke", stroke: "hsl(222 100% 8%)", strokeWidth: 4, strokeLinejoin: "round" }}
                >
                  {s.name}
                </motion.text>
              </g>
            );
          })}

          {/* Moving train */}
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            <motion.g
              animate={{
                offsetDistance: ["0%", "100%"],
              }}
              transition={{
                duration: TRAIN_DURATION,
                repeat: Infinity,
                ease: "easeInOut",
                delay: TRAIN_DELAY,
              }}
              style={{
                offsetPath: `path('${pathD}')`,
                offsetRotate: "auto",
              }}
            >
              {/* Train body */}
              <rect x="-14" y="-5" width="28" height="10" rx="3" fill="hsl(145 100% 60%)" filter="url(#strongGlow)" />
              <rect x="-12" y="-3" width="6" height="6" rx="1" fill="hsl(222 100% 18%)" />
              <rect x="-3" y="-3" width="6" height="6" rx="1" fill="hsl(222 100% 18%)" />
              <rect x="6" y="-3" width="5" height="6" rx="1" fill="hsl(222 100% 18%)" />
              {/* Headlight beam */}
              <ellipse cx="22" cy="0" rx="14" ry="3" fill="hsl(145 100% 70%)" opacity="0.45" />
            </motion.g>
          </motion.g>
        </svg>
      </div>
    </div>
  );
};
