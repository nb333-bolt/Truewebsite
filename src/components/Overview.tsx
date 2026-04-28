import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import missionCompass from "@/assets/mission-compass.jpg";

const ease = [0.32, 0.72, 0, 1] as const;

export const Overview = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const scaleImg = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  return (
    <section id="overview" className="relative py-32 md:py-44 bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="text-[13px] font-text uppercase tracking-[0.25em] text-accent mb-4"
        >
          Why we created the fund
        </motion.p>

        <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] font-semibold text-foreground">
          {"Billions are being invested to transform train travel across the Pennines."
            .split(" ")
            .map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.04, ease }}
                className="inline-block mr-[0.25em]"
              >
                {w}
              </motion.span>
            ))}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="text-muted-foreground"
          >
            {" "}
            A meaningful share goes back to the communities along the way.
          </motion.span>
        </h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
          }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          {[
            {
              h: "The Transpennine Route Upgrade",
              p: "While we deliver major railway upgrades across the 70-mile stretch between Manchester, Huddersfield, Leeds and York, we're committed to investing back into the fantastic communities we're working in.",
            },
            {
              h: "The TRU Community Fund",
              p: "Local community groups, schools and charities can apply for funding to improve local spaces and places — restoring green areas, renovating facilities, or enhancing the places that matter most.",
            },
          ].map((c) => (
            <motion.div
              key={c.h}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
              }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="group p-8 rounded-3xl bg-card-soft shadow-soft hover:shadow-elevated relative overflow-hidden"
            >
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/0 via-accent/0 to-primary/0 group-hover:from-accent/20 group-hover:to-primary/10 transition-all duration-700 -z-10" />
              <h3 className="font-display text-xl font-semibold text-primary mb-3">{c.h}</h3>
              <p className="font-text text-[15px] leading-relaxed text-muted-foreground">{c.p}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={imgRef}
          initial={{ opacity: 0, scale: 0.94, y: 60 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease }}
          className="mt-20 rounded-[2rem] overflow-hidden shadow-elevated relative group"
        >
          <motion.img
            style={{ y: yImg, scale: scaleImg }}
            src={missionCompass}
            alt="TRU Sustainable Development Strategy"
            className="w-full h-auto will-change-transform"
          />

          {/* Slow rotating glow ring centered on the compass */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] aspect-square rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, hsl(var(--electric) / 0) 0deg, hsl(var(--electric) / 0.45) 90deg, hsl(var(--electric) / 0) 180deg, hsl(var(--primary) / 0.35) 270deg, hsl(var(--electric) / 0) 360deg)",
              filter: "blur(18px)",
              mixBlendMode: "screen",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />

          {/* Counter-rotating subtle ring */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square rounded-full border border-electric/30"
            animate={{ rotate: -360, scale: [1, 1.06, 1] }}
            transition={{
              rotate: { duration: 24, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ boxShadow: "0 0 40px hsl(var(--electric) / 0.25) inset" }}
          />

          {/* Diagonal sheen sweep across the whole image */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, transparent 35%, hsl(var(--electric) / 0.18) 50%, transparent 65%)",
              backgroundSize: "220% 100%",
              mixBlendMode: "screen",
            }}
            animate={{ backgroundPosition: ["150% 0%", "-50% 0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
          />

          {/* Pulsing N / S / E / W direction pings */}
          {[
            { top: "8%", left: "50%" },
            { top: "92%", left: "50%" },
            { top: "50%", left: "8%" },
            { top: "50%", left: "92%" },
          ].map((pos, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={pos}
            >
              <span className="relative flex h-3 w-3">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-electric/70"
                  animate={{ scale: [1, 3], opacity: [0.7, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.4,
                  }}
                />
                <span
                  className="relative inline-flex h-3 w-3 rounded-full bg-electric"
                  style={{ boxShadow: "0 0 12px hsl(var(--electric)), 0 0 24px hsl(var(--electric) / 0.6)" }}
                />
              </span>
            </motion.span>
          ))}

          {/* Orbiting particles around the compass */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] aspect-square">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 14 + i * 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.6,
                }}
                style={{ transformOrigin: "50% 50%" }}
              >
                <span
                  className="absolute left-1/2 top-0 -translate-x-1/2 h-2 w-2 rounded-full bg-electric"
                  style={{
                    boxShadow:
                      "0 0 10px hsl(var(--electric)), 0 0 20px hsl(var(--electric) / 0.5)",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Subtle vignette for contrast against overlays */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 55%, hsl(var(--background) / 0.25) 100%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};
