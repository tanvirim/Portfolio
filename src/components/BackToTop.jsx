import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

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
      className="fixed bottom-24 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-110 hover:bg-black/80"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default BackToTop;
