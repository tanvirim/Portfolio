/* eslint-disable react/prop-types */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import { defaultColor } from "../constants";
import { Link as ScrollLink } from "react-scroll";

const NAV_ITEMS = [
  { to: "skills", label: "SKILLS" },
  { to: "projects", label: "PROJECTS" },
  { to: "about", label: "ABOUT" },
  { to: "contact", label: "CONTACT" },
];

const Navbar = ({ color = defaultColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative bg-transparent">
      <div className="bg-transparent flex justify-between md:justify-start items-center md:gap-10">
        <button
          className="bg-transparent z-[99] cursor-pointer p-1.5 sm:p-2.5 md:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X size={26} className="nav-text-style" />
          ) : (
            <MenuIcon size={26} color={color} className="nav-text-style" />
          )}
        </button>

        <ul className="hidden md:flex bg-transparent list-none gap-5 p-2.5">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.to}
              className="text-xl font-bold cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.2]"
              style={{ color }}
            >
              <ScrollLink to={item.to} className="nav-text-style">
                {item.label}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="md:hidden absolute left-0 top-full mt-2 z-[9] flex flex-col items-center list-none w-48 rounded-lg overflow-hidden shadow-lg"
            style={{ backgroundColor: color }}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.to} className="w-full text-center">
                <ScrollLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-black font-bold cursor-pointer hover:brightness-90 transition-all"
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
