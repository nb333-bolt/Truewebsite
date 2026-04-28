import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/assets/tru-logo.svg";

const links = [
  { label: "Overview", href: "#overview" },
  { label: "2025 Fund", href: "#fund-2025" },
  { label: "Recipients", href: "#recipients" },
  { label: "2024 Projects", href: "#projects-2024" },
  { label: "Strategy", href: "#strategy" },
];

export const Nav = () => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const blur = useTransform(scrollY, [0, 120], [0, 20]);

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `hsl(222 100% 22% / ${v * 0.85})`),
        backdropFilter: useTransform(blur, (b) => `saturate(180%) blur(${b}px)`),
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src={logo} alt="TRU — Transpennine Route Upgrade" className="h-7 w-auto" />
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] font-text text-primary-foreground/80 hover:text-primary-foreground transition-colors ease-apple"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#fund-2025"
          className="text-[13px] font-text px-4 py-1.5 rounded-full bg-primary-foreground text-primary hover:opacity-90 transition-opacity"
        >
          See recipients
        </a>
      </nav>
    </motion.header>
  );
};
