import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import IconCube from "./IconCube";
import { defaultColor } from "../constants";

const SHOW_AFTER_PX = 400;

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-50 transition-transform duration-300 hover:scale-110"
    >
      <IconCube icon={ArrowUp} color={defaultColor} size={32} label="Back to top" />
    </button>
  );
};

export default BackToTop;
