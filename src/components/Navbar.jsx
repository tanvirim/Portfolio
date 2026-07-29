/* eslint-disable react/prop-types */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import { defaultColor } from "../constants";
import { Link as ScrollLink } from "react-scroll";
import ThemeToggle from "./ThemeToggle";
import ColorPicker from "./ColorPicker";

const NAV_ITEMS = [
  { to: "skills", label: "./skills" },
  { to: "projects", label: "./projects" },
  { to: "about", label: "./about" },
  { to: "contact", label: "./contact" },
];

// Typed once on mount via .terminal-typewriter (index.css) — the same
// one-shot "code is being written" reveal used elsewhere in the hero.
const NAV_STATUS = "full-stack-engineer";

const Navbar = ({ color = defaultColor, colorStateForHome }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="relative w-full">
      <div
        className="terminal-card flex items-center justify-between gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
        style={{ "--tile-accent": color }}
      >
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 min-w-0 shrink cursor-pointer hover:brightness-125 transition-all"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
            style={{ backgroundColor: color }}
          />
          <span className="font-semibold shrink-0" style={{ color }}>
            tanvir
          </span>
          <span className="shrink-0">@nav:~$</span>
          <span
            className="hidden sm:inline-block whitespace-nowrap overflow-hidden terminal-typewriter"
            style={{
              "--typewriter-width": `${NAV_STATUS.length}ch`,
              "--typewriter-duration": "1.3s",
              "--typewriter-delay": "0.3s",
            }}
          >
            {NAV_STATUS}
          </span>
          <span
            className="inline-block w-1 h-3 terminal-cursor shrink-0"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        </button>

        <ul className="hidden md:flex list-none gap-4 lg:gap-5 shrink-0">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.to}
              className="text-xs lg:text-sm font-mono font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.08]"
              style={{ color }}
            >
              <ScrollLink to={item.to} className="nav-text-style">
                {item.label}
              </ScrollLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <ThemeToggle />
          <ColorPicker color={color} colorStateForHome={colorStateForHome} />
          <button
            className="z-[99] cursor-pointer p-1 shrink-0 md:hidden"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X size={18} style={{ color }} />
            ) : (
              <MenuIcon size={18} style={{ color }} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="terminal-card md:hidden absolute left-0 top-full mt-2 z-[9] flex flex-col items-center list-none w-44 rounded-xl overflow-hidden"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.to} className="w-full text-center">
                <ScrollLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block py-2.5 text-sm font-mono font-semibold cursor-pointer hover:brightness-90 transition-all"
                  style={{ color }}
                >
                  {item.label}
                </ScrollLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
