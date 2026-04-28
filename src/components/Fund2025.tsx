import { motion } from "framer-motion";
import { Counter } from "./Counter";
import { Magnetic } from "./Magnetic";

const ease = [0.32, 0.72, 0, 1] as const;

export const Fund2025 = () => {
  return (
    <section
      id="fund-2025"
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: "hsl(var(--surface-tinted))" }}
    >
      {/* Soft animated background blobs */}
      <motion.div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="text-center"
        >
          <p className="text-[13px] font-text uppercase tracking-[0.25em] text-accent mb-4">
            TRU Community Fund 2025
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] font-semibold text-foreground max-w-4xl mx-auto">
            <span className="text-gradient-accent inline-block">
              <Counter to={250} prefix="£" suffix=",000" />
            </span>{" "}
            awarded.
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="text-foreground inline-block"
            >
              <Counter to={35} /> organisations.
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="text-muted-foreground inline-block"
            >
              One shared route.
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-8 max-w-2xl mx-auto font-text text-lg text-muted-foreground leading-relaxed"
          >
            We're pleased to announce that a total of £250,000 in grants has been awarded across
            35 local organisations along the Transpennine route as part of our 2025 funding round.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { v: 13, l: "Local authorities" },
            { v: 35, l: "Funded projects" },
            { v: 250, prefix: "£", suffix: "k", l: "Total grants" },
            { v: 2, suffix: "nd", l: "Year of the fund" },
          ].map((s) => (
            <motion.div
              key={s.l}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
              }}
            >
              <Magnetic className="p-8 rounded-3xl bg-background shadow-soft text-center hover:shadow-elevated transition-shadow duration-700">
                <Counter
                  to={s.v}
                  prefix={s.prefix || ""}
                  suffix={s.suffix || ""}
                  className="font-display text-4xl md:text-5xl font-semibold text-primary block"
                />
                <div className="mt-2 text-sm font-text text-muted-foreground">{s.l}</div>
              </Magnetic>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
