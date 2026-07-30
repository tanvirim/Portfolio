/* eslint-disable react/prop-types */
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import IconCube from "./IconCube";
import { defaultColor } from "../constants";

const ThemeToggle = ({ color = defaultColor }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="transition-transform duration-200 hover:scale-110"
    >
      <IconCube
        icon={theme === "dark" ? Sun : Moon}
        color={color}
        size={20}
        label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        tooltipSide="bottom"
      />
    </button>
  );
};

export default ThemeToggle;
