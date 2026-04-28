import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden bg-hero text-primary-foreground">
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          background: "radial-gradient(circle at 30% 50%, hsl(95 70% 50% / 0.35), transparent 50%), radial-gradient(circle at 70% 50%, hsl(222 90% 38% / 0.5), transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          className="font-display text-[clamp(2.25rem,6vw,5rem)] leading-[0.98] font-semibold text-gradient-primary"
        >
          Have an idea for your community?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
          className="mt-6 max-w-2xl mx-auto font-text text-lg text-primary-foreground/75"
        >
          Whether it's restoring vibrant green areas, renovating community facilities, or
          enhancing local spaces, your proposals can make a real difference.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="https://thetrupgrade.co.uk/communityfund/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full bg-primary-foreground text-primary font-text text-[15px] font-medium hover:scale-[1.03] transition-transform ease-apple shadow-elevated"
          >
            Learn more about the fund
          </a>
          <a
            href="#recipients"
            className="px-7 py-3.5 rounded-full glass-dark text-primary-foreground font-text text-[15px] font-medium hover:bg-primary-foreground/10 transition-colors border border-primary-foreground/15"
          >
            See 2025 recipients
          </a>
        </motion.div>
      </div>
    </section>
  );
};
