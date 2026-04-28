import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import familyUnit from "@/assets/family-unit-trust.jpg";
import riseInUnity from "@/assets/rise-in-unity.jpg";
import lordDeramores from "@/assets/lord-deramores.jpg";

const ease = [0.32, 0.72, 0, 1] as const;

type Region = {
  name: string;
  items: string[];
  image?: string;
  caption?: string;
};

const regions: Region[] = [
  {
    name: "Manchester",
    image: familyUnit,
    caption: "Family Unit Trust, Manchester",
    items: [
      "Cede Foundation – conversion of a former church into welcoming community hubs.",
      "Key Changes – improvements to a portable recording studio, supporting mental health patients at North Manchester General Hospital.",
      "Family Unit Trust – refurbishment of an unused unit into a Family Support & Wellbeing Hub for families affected by cancer & illness.",
    ],
  },
  {
    name: "Trafford",
    items: [
      "Booth Centre – upgrades to decking, seating, roofing and accessibility at the Three Bees Community Café, supporting people experiencing homelessness and poverty.",
      "St Hugh of Lincoln RC Primary School – a new outdoor hub and improved surrounding areas for a Forest School programme.",
    ],
  },
  {
    name: "Stockport",
    items: [
      "Mode Rehabilitation – creation of an accessible outdoor space for veterans to support recovery and independence.",
    ],
  },
  {
    name: "Oldham",
    items: [
      "Local Food First CIC – transformation of a disused building into a Community Food Hub with a teaching kitchen.",
      "Bee Together Community Centre & Garden – expansion of a community food growing programme, including new planting beds and pollinator flowers.",
      "Dog Hill Scout & Community Campsite – a new outdoor cooking and learning space to encourage connection in nature.",
      "Pennine Mencap – a community garden project teaching gardening and cooking skills to adults with disabilities and autism.",
    ],
  },
  {
    name: "Tameside",
    items: [
      "Tameside Meals Seva Group – purchase of cooking equipment and materials for community cookery classes.",
      "Friends of Waterloo Park – purchase of solar-powered facilities to power a steel office container and expand educational & cookery activities.",
    ],
  },
  {
    name: "Bury",
    items: [
      "Creative Living Centre – regeneration of an old allotment into a community allotment and kitchen garden.",
    ],
  },
  {
    name: "High Peak",
    items: [
      "St Andrew's Junior School PTA – improvement of outdoor playground facilities for pupils.",
    ],
  },
  {
    name: "Bradford",
    items: [
      "Making Sedbergh Sustainable – an upgraded community space at Sedbergh Youth & Community Centre.",
      "A Place to Connect, Share and Thrive – a fully equipped community kitchen serving people experiencing homelessness & hardship in West Bowling.",
      "Northcliffe Environmental Enterprises Team – an accessible outdoor space for therapeutic gardening and wellbeing.",
    ],
  },
  {
    name: "Calderdale",
    items: [
      "Overgate Hospice – creation of a sustainable garden and outdoor therapy space for patients, carers & families.",
      "Everybody Arts – accessibility and sustainability improvements to a community arts building.",
    ],
  },
  {
    name: "Kirklees",
    image: riseInUnity,
    caption: "Rise in Unity CIC, Huddersfield",
    items: [
      "Globe Arts Education CIC – development of a sculpture trail guiding visitors to Globe Arts at Holme Mills.",
      "Friends of Helme School – new outdoor play, sensory equipment and pond improvements to support children's learning.",
      "Friends of Ravenshall – establishment of a community petting farm and café supporting young people with additional needs.",
      "Upper Batley High School – restoration of the sports hall and changing facilities for school and community use.",
      "Rise in Unity CIC – creation of a dining and social area for the Huddersfield youth club.",
    ],
  },
  {
    name: "Leeds",
    items: [
      "Junior Sports Hub – new toilets and an improved outdoor green space.",
      "Friends of Farsley Rehoboth Burial Ground – accessibility, re-wilding and sustainability improvements.",
      "United Hebrew Congregation – development of a sensory garden and raised growing bed.",
      "Summerfield Primary School – creation of a historical 'living timeline' allotment in the school grounds.",
    ],
  },
  {
    name: "North Yorkshire",
    items: [
      "Cawood Tennis Club – installation of energy-efficient LED floodlights.",
      "The Barn – a new kitchen for the Tadcaster youth and community centre.",
      "Monk Fryston School Cycle Shelter – covered cycle shelters to encourage active travel to the school.",
    ],
  },
  {
    name: "York",
    image: lordDeramores,
    caption: "Lord Deramore's School, York",
    items: [
      "Make Space York – multifunctional climbing and seating structures in Rowntree Park, as part of an initiative to make York's parks more inclusive for teenage girls.",
      "Haxby Ethel Ward Sports Courts – refurbishment of the playing fields into a multi-purpose community sports facility.",
      "Huntington Library – development of an accessible, sensory community garden.",
      "Lord Deramore's School OPAL – new storage and themed play areas to support inclusive play for children.",
    ],
  },
];

const RegionCard = ({ region, idx }: { region: Region; idx: number }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const scaleImg = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease }}
      className="group rounded-[2rem] bg-card-soft shadow-soft hover:shadow-elevated transition-all duration-700 ease-apple overflow-hidden relative"
    >
      {/* Animated border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-primary/20 blur-xl" />
      </div>

      <div className={`relative grid ${region.image ? "lg:grid-cols-2" : "grid-cols-1"} gap-0`}>
        <div className="p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="flex items-baseline gap-4 mb-6"
          >
            <span className="font-display text-sm text-accent font-medium tabular-nums">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-primary">{region.name}</h3>
          </motion.div>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
            className="space-y-4"
          >
            {region.items.map((item) => {
              const [name, ...rest] = item.split(" – ");
              return (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
                  }}
                  className="flex gap-3 font-text text-[15px] leading-relaxed"
                >
                  <motion.span
                    whileHover={{ scale: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"
                  />
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-medium">{name}</span>
                    {rest.length > 0 && <> – {rest.join(" – ")}</>}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
        {region.image && (
          <div className="relative overflow-hidden lg:min-h-[420px] min-h-[280px]">
            <motion.img
              src={region.image}
              alt={region.caption || region.name}
              loading="lazy"
              style={{ y: yImg, scale: scaleImg }}
              className="absolute inset-0 w-full h-full object-cover will-change-transform transition-transform duration-1000 ease-apple group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {region.caption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease }}
                className="absolute bottom-0 inset-x-0 p-6"
              >
                <p className="font-text text-sm text-white/90">{region.caption}</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export const Recipients = () => {
  return (
    <section id="recipients" className="relative py-32 md:py-44 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="max-w-3xl"
        >
          <p className="text-[13px] font-text uppercase tracking-[0.25em] text-accent mb-4">Recipients</p>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] font-semibold text-foreground">
            From Manchester to York.
            <span className="text-muted-foreground"> Thirty-five projects, one route.</span>
          </h2>
        </motion.div>

        <div className="mt-20 space-y-6">
          {regions.map((region, idx) => (
            <RegionCard key={region.name} region={region} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
