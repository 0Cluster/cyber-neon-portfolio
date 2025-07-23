import "./globals.css";
import Hero from "./components/hero/Hero";
import Blank from "./components/hero/Blank";
import Navbar from "./components/navbar/Navbar";
import { HeroHighlight } from "./components/hero/HeroHighlight";
import { AvatarVisibilityProvider } from "./hooks/useAvatarVisibility";
import Skills from "./components/skills/skills";
import BinaryRain from "./components/skills/BinaryRain";
import  Projects from "./components/Projects/projects";
export default function Home() {
  return (
    <main className="bg-black dark">
      <AvatarVisibilityProvider>
        <Navbar />
        <HeroHighlight>
          <Hero />
        </HeroHighlight>
<BinaryRain>
  <section className="py-24 min-h-[500px]">
    <Skills />
  </section>
</BinaryRain>
        <Projects />
        <Blank />
      </AvatarVisibilityProvider>
    </main>
  );
}
