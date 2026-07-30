import { useEffect, useState } from "react";

// A single character per tick reads as a natural typewriter for short
// strings, but scales linearly with length — a long paragraph at the same
// per-character `speed` just takes proportionally longer, which is what was
// reading as "very slow" for text-heavy callers. Capping the total number of
// ticks and advancing multiple characters per tick once text is longer than
// this keeps the per-character feel for short text while bounding how long
// any one string can possibly take to finish.
const MAX_TICKS = 60;

// Types `text` out character by character via real React state (not the
// CSS width-reveal trick used elsewhere) so it works for wrapped, multi-line
// text too. `enabled` lets callers chain several of these — the next line
// only starts once the previous one's `done` flips true. `instant` (e.g.
// prefers-reduced-motion) skips straight to the full text with no timers.
function useTypewriter(text, { speed = 30, startDelay = 0, enabled = true, instant = false } = {}) {
  const [output, setOutput] = useState(instant ? text : "");
  const [done, setDone] = useState(instant);

  useEffect(() => {
    if (instant) {
      setOutput(text);
      setDone(true);
      return;
    }
    if (!enabled) return;

    setOutput("");
    setDone(false);
    let i = 0;
    let intervalId;
    const charsPerTick = Math.max(1, Math.ceil(text.length / MAX_TICKS));

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i += charsPerTick;
        setOutput(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, enabled, instant]);

  return { output, done };
}

export default useTypewriter;
