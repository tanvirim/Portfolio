import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GitContributionsBar from "../components/GitContributions";
import Navbar from "../components/Navbar";
import TerminalIntro from "../components/TerminalIntro";
import Hero from "../components/Hero";
import HeroBubbles from "../components/HeroBubbles";
import HeroPattern from "../components/HeroPattern";
import ProjectCards from "../components/project/ProjectCards";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import { getDefaultColorForTheme } from "../constants";
import parseHexColor from "../utils/parseHexColor";
import usePrefersReducedMotion from "../Hooks/usePrefersReducedMotion";
import { useTheme } from "../context/ThemeContext";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary';

// The cursor ring/dot deliberately do NOT use the user-picked accent color
// (`color` below) — that color is used everywhere on the page for headings,
// badges, and icons (Skills, Projects), so a same-colored cursor visually
// disappears the moment it crosses any of that content. This matches
// --secondary-color in index.css, which is reserved for backdrop/glow use
// and never used for foreground text, so the ring stays visible everywhere.
const CURSOR_COLOR = "#5153d6";

const revealProps = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Home = () => {
  // Position tracking (outer wrappers) vs. visual state (inner ring/glow)
  // are deliberately split across separate refs/elements. The outer
  // wrappers get their transform written directly every animation frame —
  // no React state, no CSS transition — so they track the real pointer
  // position with zero lag, the way a native cursor does. Only the INNER
  // elements (scale on hover/click, the glow's decorative breathing) carry
  // a CSS transition, since those are deliberate, low-frequency state
  // changes, not per-frame position updates. Routing position through
  // React state + a `transition: left/top` (the previous approach) made
  // every mousemove both re-render the whole page AND ease toward a
  // constantly-moving target — a perpetual, never-catching-up chase that
  // reads as sticky/buffering.
  const cursorWrapRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorBgRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const wrap = cursorWrapRef.current;
    const ring = cursorRingRef.current;
    const bg = cursorBgRef.current;
    if (!wrap || !ring || !bg) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let rafId = null;

    const applyPosition = () => {
      const transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      wrap.style.transform = transform;
      bg.style.transform = transform;
      rafId = null;
    };

    const handleMouseMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      // Coalesce to one DOM write per frame even if mousemove fires more
      // often than that — keeps updates in lockstep with the compositor.
      if (rafId === null) {
        rafId = requestAnimationFrame(applyPosition);
      }
    };

    let clickTimeout;
    const handleMouseDown = () => {
      ring.classList.add("is-clicked");
      clearTimeout(clickTimeout);
      // Matches the .5s ripple animation in index.css — remove only once
      // it's had time to finish playing.
      clickTimeout = setTimeout(() => ring.classList.remove("is-clicked"), 500);
    };

    const handlePointerOver = (event) => {
      if (event.target.closest?.(INTERACTIVE_SELECTOR)) ring.classList.add("is-active");
    };

    const handlePointerOut = (event) => {
      if (event.target.closest?.(INTERACTIVE_SELECTOR)) ring.classList.remove("is-active");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(clickTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
    };
  }, [prefersReducedMotion]);

  const { theme } = useTheme();
  const [color, setColor] = useState(() => getDefaultColorForTheme(theme));
  // Tracks whether the user has ever picked a color themselves — until they
  // do, the accent should keep following the theme-based default (cyan in
  // dark mode, red in light mode) whenever they flip the theme toggle. Once
  // they pick one via ColorPicker, that choice sticks across theme changes.
  const [hasCustomColor, setHasCustomColor] = useState(false);
  const cursorColorRGBA = parseHexColor(CURSOR_COLOR, { r: 81, g: 83, b: 214 });

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
      {!prefersReducedMotion && (
        <>
          <div ref={cursorWrapRef} className="custom-cursor-icon">
            <div
              ref={cursorRingRef}
              className="custom-cursor-ring"
              style={{
                "--cursor-accent": CURSOR_COLOR,
                "--cursor-accent-rgb": `${cursorColorRGBA.r}, ${cursorColorRGBA.g}, ${cursorColorRGBA.b}`,
              }}
            />
          </div>
          <div ref={cursorBgRef} className="custom-cursor-bg">
            <div
              className="custom-cursor-bg-inner"
              style={{
                "--cursor-accent": CURSOR_COLOR,
                "--cursor-glow-accent": color,
              }}
            />
          </div>
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

      <HeroPattern color={color} />
      <HeroBubbles color={color} />

      <div className="flex flex-col px-4 sm:px-6 md:px-10 lg:px-20 max-w-screen-2xl mx-auto overflow-x-hidden pt-8">
        <div className="mb-6">
          <Navbar color={color} colorStateForHome={handleColorState} />
        </div>

        <section id="about" className="relative pb-16 order-1 lg:order-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-6">
            <Hero color={color} />
            <TerminalIntro color={color} />
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
