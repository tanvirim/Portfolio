import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ColorPicker from "../components/ColorPicker";
import ThemeToggle from "../components/ThemeToggle";
import GitContributionsBar from "../components/GitContributions";
import Navbar from "../components/Navbar";
import TerminalIntro from "../components/TerminalIntro";
import Hero from "../components/Hero";
import ProjectCards from "../components/project/ProjectCards";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import { defaultColor } from "../constants";
import parseHexColor from "../utils/parseHexColor";
import usePrefersReducedMotion from "../Hooks/usePrefersReducedMotion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary';

const revealProps = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Track the mouse position, click pulses, and hover state over anything
  // clickable — the custom cursor reacts to all three (see .is-clicked /
  // .is-active in index.css). Skipped entirely when the user prefers
  // reduced motion, since the whole feature is a motion effect.
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleMouseClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300);
    };

    const handlePointerOver = (event) => {
      if (event.target.closest?.(INTERACTIVE_SELECTOR)) setIsHoveringInteractive(true);
    };

    const handlePointerOut = (event) => {
      if (event.target.closest?.(INTERACTIVE_SELECTOR)) setIsHoveringInteractive(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseClick);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseClick);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
    };
  }, [prefersReducedMotion]);

  const [color, setColor] = useState(defaultColor);
  const cursorColorRGBA = parseHexColor(color, { r: 16, g: 185, b: 129 });

  // Keeps CSS-only elements (nav links, section titles — driven by
  // var(--primary-color) in index.css) in sync with the picked accent,
  // since those aren't wired up as React props.
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", color);
  }, [color]);

  const handleColorState = (newState) => {
    setColor(newState);
  };

  return (
    <>
      {!prefersReducedMotion && (
        <>
          <div
            className={`custom-cursor-icon ${isClicked ? "is-clicked" : ""} ${
              isHoveringInteractive ? "is-active" : ""
            }`}
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              "--cursor-accent": color,
              "--cursor-accent-rgb": `${cursorColorRGBA.r}, ${cursorColorRGBA.g}, ${cursorColorRGBA.b}`,
            }}
          />
          <div
            className="custom-cursor-bg"
            style={{
              left: `${mousePosition.x - 100}px`,
              top: `${mousePosition.y - 100}px`,
              "--cursor-accent": color,
            }}
          />
        </>
      )}

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

      <div className="flex flex-col px-4 sm:px-6 md:px-10 lg:px-20 max-w-screen-2xl mx-auto overflow-x-hidden">
        <div className="flex justify-between items-start gap-4 mb-6 pt-8">
          <div className="flex-1 min-w-0">
            <Navbar color={color} />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ColorPicker colorStateForHome={handleColorState} />
          </div>
        </div>

        <section id="about" className="relative pb-16 order-1 lg:order-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-6">
            <Hero color={color} />
            <TerminalIntro color={color} />
          </div>

          <div
            className="game-card-subtle mt-8 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0d1117] shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] p-5"
            style={{ "--tile-accent": color }}
          >
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-black/10 dark:border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
                recent GitHub activity
              </span>
            </div>
            <GitContributionsBar color={color} />
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
