import { motion } from "framer-motion";

const ease = [0.32, 0.72, 0, 1] as const;

export const Strategy = () => {
  return (
    <section id="strategy" className="relative py-32 md:py-44 bg-background overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
        >
          <p className="text-[13px] font-text uppercase tracking-[0.25em] text-accent mb-4">
            TRU Sustainable Development Strategy
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] font-semibold text-foreground">
            A catalyst for regeneration
            <span className="text-muted-foreground"> — enhancing and protecting community spaces along the Transpennine line.</span>
          </h2>
          <p className="mt-8 font-text text-lg text-muted-foreground leading-relaxed max-w-3xl">
            The TRU Community Fund aligns with key objectives of our TRU Sustainable Development
            Strategy, <em>'Our Guiding Compass'</em>.
          </p>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="mt-20 relative p-10 md:p-16 rounded-[2rem] bg-card-soft shadow-soft hover:shadow-elevated transition-shadow duration-700 overflow-hidden"
        >
          {/* Animated gradient sweep */}
          <motion.div
            aria-hidden
            className="absolute inset-0 opacity-30 pointer-events-none"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            style={{
              background: "radial-gradient(circle at 20% 30%, hsl(var(--accent) / 0.15), transparent 50%), radial-gradient(circle at 80% 70%, hsl(var(--primary) / 0.12), transparent 50%)",
              backgroundSize: "200% 200%",
            }}
          />

          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            className="absolute -top-6 left-10 font-display text-[8rem] leading-none text-accent/20 select-none"
          >
            &ldquo;
          </motion.span>

          <p className="relative font-display text-2xl md:text-3xl font-medium leading-snug text-foreground">
            {"The TRU Community Fund is a fantastic opportunity for the organisations at the heart of our communities to leave a lasting impact on the people they serve. With over 20 organisations offered funding in 2024, we're delighted to bring back the scheme for its second year, and encourage as many local schools, charities and community groups as possible to apply."
              .split(" ")
              .map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0.15 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.015, ease }}
                  className="inline-block mr-[0.25em]"
                >
                  {w}
                </motion.span>
              ))}
          </p>

          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="relative mt-8 flex items-center gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-glow"
            />
            <div>
              <p className="font-text font-semibold text-foreground">Alex Peters</p>
              <p className="font-text text-sm text-muted-foreground">
                Interim Head of Sustainability and Social Value for TRU
              </p>
            </div>
          </motion.footer>
        </motion.blockquote>
      </div>
    </section>
  );
};
