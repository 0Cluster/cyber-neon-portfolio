import "./globals.css";
import Hero from "./components/hero/Hero";
import Blank from "./components/hero/Blank";
import Navbar from "./components/navbar/Navbar";
import { HeroHighlight } from "./components/hero/HeroHighlight";
import { AvatarVisibilityProvider } from "./hooks/useAvatarVisibility";

export default function Home() {
  return (
    <main className="bg-black dark">
      <AvatarVisibilityProvider>
        <Navbar />
        <HeroHighlight>
          <Hero />
        </HeroHighlight>
        <Blank />
      </AvatarVisibilityProvider>
    </main>
  );
}
