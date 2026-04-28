import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import bikesBefore from "@/assets/bikes-before.jpg";
import bikesAfter from "@/assets/bikes-after.jpg";
import grow from "@/assets/grow-wakefield.jpg";
import placeBefore from "@/assets/place-before.jpg";
import placeAfter from "@/assets/place-after.jpg";
import milnsBefore from "@/assets/milnsbridge-before.jpg";
import milnsAfter from "@/assets/milnsbridge-after.jpg";

const ease = [0.32, 0.72, 0, 1] as const;

const gallery = [
  { src: bikesBefore, label: "Before — Your Trust", caption: "Refurbishment of a disused changing room into a cycle library, recycling space and Family Cycle Hub." },
  { src: bikesAfter, label: "After — Your Trust", caption: "The completed Family Cycle Hub, in collaboration with Your Trust." },
  { src: grow, label: "Grow Wakefield", caption: "Transformation of an overgrown plot into 14 community mini allotments for 'Edible Gardening' sessions." },
  { src: placeBefore, label: "Before — The Place", caption: "Creating a dedicated space for one-to-one mentoring and mental health support, with University of York." },
  { src: placeAfter, label: "After — The Place", caption: "The completed mentoring and wellbeing room, in collaboration with The Place (University of York)." },
  { src: milnsBefore, label: "Before — Milnsbridge Village Hall", caption: "Access improvements to steeply sloped and overgrown areas within the village hall grounds." },
  { src: milnsAfter, label: "After — Milnsbridge Village Hall", caption: "Improved, accessible grounds at Milnsbridge Village Hall." },
];

const Tile = ({ item, i }: { item: typeof gallery[number]; i: number }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.08, 1.2]);

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease }}
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl overflow-hidden bg-surface-dark-elevated"
      style={{ aspectRatio: "4 / 5" }}
    >
      <motion.img
        src={item.src}
        alt={item.label}
        loading="lazy"
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full object-cover will-change-transform transition-transform duration-[1.4s] ease-apple group-hover:scale-[1.3]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
      <motion.figcaption
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
        className="absolute bottom-0 inset-x-0 p-6"
      >
        <span className="inline-block text-[11px] font-text uppercase tracking-[0.2em] text-accent-glow mb-2">
          {item.label}
        </span>
        <p className="font-text text-sm text-white/90 leading-relaxed">{item.caption}</p>
      </motion.figcaption>
    </motion.figure>
  );
};

export const Projects2024 = () => {
  return (
    <section
      id="projects-2024"
      className="relative py-32 md:py-44 overflow-hidden"
      style={{ background: "hsl(var(--surface-dark))" }}
    >
      {/* Subtle ambient orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent-glow/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="max-w-3xl"
        >
          <p className="text-[13px] font-text uppercase tracking-[0.25em] text-accent-glow mb-4">
            TRU Community Fund 2024
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] font-semibold text-primary-foreground">
            Where it all began.
            <span className="text-primary-foreground/50"> A look back at the projects we supported in our first year.</span>
          </h2>
          <p className="mt-6 font-text text-lg text-primary-foreground/70 leading-relaxed">
            The TRU Community Fund was established in 2024 to give back to local communities, and we
            were pleased to support a wide range of charities, schools, and organisations in its first year.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((item, i) => (
            <Tile key={item.src} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
