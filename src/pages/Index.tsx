import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Overview } from "@/components/Overview";
import { Fund2025 } from "@/components/Fund2025";
import { Recipients } from "@/components/Recipients";
import { Projects2024 } from "@/components/Projects2024";
import { Strategy } from "@/components/Strategy";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <Overview />
      <Fund2025 />
      <Recipients />
      <Projects2024 />
      <Strategy />
      <CTA />
      <Footer />
      <Chatbot />
    </main>
  );
};

export default Index;
