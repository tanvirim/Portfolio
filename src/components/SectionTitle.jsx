/* eslint-disable react/prop-types */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useTypewriter from "../Hooks/useTypewriter";
import usePrefersReducedMotion from "../Hooks/usePrefersReducedMotion";
import { defaultColor } from "../constants";

// Section heading that only starts "typing" once scrolled into view (not on
// mount, like Hero's sequence — these sit further down the page) — title
// types first, then a short detail line types in under it. Wrapped in a
// fade/slide so there's a visibility effect on top of the writing motion,
// not just static text popping in.
const SectionTitle = ({
  title,
  subtitle,
  color = defaultColor,
  className = "",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const titleTyping = useTypewriter(title, {
    speed: 45,
    enabled: isInView,
    instant: prefersReducedMotion,
  });
  const subtitleTyping = useTypewriter(subtitle || "", {
    speed: 16,
    enabled: titleTyping.done,
    instant: prefersReducedMotion,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="title-text-style">
        {titleTyping.output}
        {isInView && !titleTyping.done && (
          <span
            className="inline-block w-[0.55em] h-[0.8em] ml-1 align-middle terminal-cursor"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        )}
      </div>

      <motion.div
        className="section-title-underline mx-auto mt-3"
        style={{ backgroundColor: color, boxShadow: `0 6px 16px -4px ${color}` }}
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: 56, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      />

      {subtitle && (
        <p className="subtitle-text-style mt-3 text-center text-xs sm:text-sm font-mono text-gray-600 dark:text-gray-300 min-h-[1.5em]">
          {titleTyping.done && (
            <>
              {subtitleTyping.output}
              {!subtitleTyping.done && (
                <span
                  className="inline-block w-[2px] h-3.5 ml-0.5 align-middle terminal-cursor"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
              )}
            </>
          )}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
