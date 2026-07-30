import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GitContributionsBar from "../components/GitContributions";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroBubbles from "../components/HeroBubbles";
import HeroPattern from "../components/HeroPattern";
import ProjectCards from "../components/project/ProjectCards";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import { getDefaultColorForTheme } from "../constants";
import { useTheme } from "../context/ThemeContext";

const revealProps = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Home = () => {
  // Empty grid cell next to Hero (where the terminal panel used to sit) —
  // HeroBubbles reads its bounding box each frame and gathers the floating
  // icon cubes into a circle inside it instead of scattering them.
  const heroIconCircleRef = useRef(null);

  const { theme } = useTheme();
  const [color, setColor] = useState(() => getDefaultColorForTheme(theme));
  // Tracks whether the user has ever picked a color themselves — until they
  // do, the accent should keep following the theme-based default (cyan in
  // dark mode, red in light mode) whenever they flip the theme toggle. Once
  // they pick one via ColorPicker, that choice sticks across theme changes.
  const [hasCustomColor, setHasCustomColor] = useState(false);

  useEffect(() => {
    if (!hasCustomColor) {
      setColor(getDefaultColorForTheme(theme));
    }
  }, [theme, hasCustomColor]);

  // Keeps CSS-only elements (nav links, section titles — driven by
  // var(--primary-color) in index.css) in sync with the picked accent,
  // since those aren't wired up as React props.
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", color);
  }, [color]);

  const handleColorState = (newState) => {
    setHasCustomColor(true);
    setColor(newState);
  };

  return (
    <>
      {/* Ambient background wash — ties every section together instead of
          each one sitting in its own isolated box. */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.15] blur-[120px]"
          style={{ backgroundColor: color }}
        />
        <div
          className="absolute top-[60%] -right-40 w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[120px]"
          style={{ backgroundColor: "var(--secondary-color)" }}
        />
      </div>

      <HeroPattern color={color} />
      <HeroBubbles color={color} targetRef={heroIconCircleRef} />

      <div className="flex flex-col px-4 sm:px-6 md:px-10 lg:px-20 max-w-screen-2xl mx-auto overflow-x-hidden pt-8">
        <div className="mb-6">
          <Navbar color={color} colorStateForHome={handleColorState} />
        </div>

        <section id="about" className="relative pb-16 order-1 lg:order-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            <Hero color={color} />
            <div ref={heroIconCircleRef} className="hidden lg:block" aria-hidden="true" />
          </div>

          <div
            className="game-card-subtle terminal-card mt-8"
            style={{ "--tile-accent": color }}
          >
            <div className="terminal-card-header">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
                recent GitHub activity
              </span>
            </div>
            <div className="p-5">
              <GitContributionsBar color={color} />
            </div>
          </div>
        </section>

        <motion.div id="skills" className="section-flow order-4 lg:order-none" {...revealProps}>
          <Skills color={color} />
        </motion.div>

        <motion.div id="projects" className="section-flow order-5 lg:order-none" {...revealProps}>
          <ProjectCards color={color} />
        </motion.div>

        <motion.div id="contact" className="section-flow order-6 lg:order-none" {...revealProps}>
          <Footer color={color} />
        </motion.div>
      </div>
    </>
  );
};

export default Home;
