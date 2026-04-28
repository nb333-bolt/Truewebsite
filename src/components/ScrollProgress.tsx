import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, hsl(var(--electric)) 0%, hsl(var(--electric-soft)) 50%, hsl(var(--electric)) 100%)",
        boxShadow:
          "0 0 10px hsl(var(--electric) / 0.9), 0 0 24px hsl(var(--electric) / 0.6)",
      }}
    />
  );
};
