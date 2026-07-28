import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="game-btn-circle w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-black/10 dark:border-white/10 bg-white dark:bg-[#151b28] text-gray-700 dark:text-gray-200"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};

export default ThemeToggle;
