import { useEffect, useState } from "react";

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

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
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
