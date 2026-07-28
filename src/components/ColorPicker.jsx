/* eslint-disable react/prop-types */

import { useState } from "react";
import { Palette, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { defaultColor } from "../constants";

const PRESET_COLORS = [
  "#10b981", // emerald (default)
  "#1ce5ff", // cyan
  "#5153d6", // indigo
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#f59e0b", // amber
  "#ef4444", // red
  "#0ea5e9", // sky
];

const ColorPicker = ({ colorStateForHome }) => {
  const [color, setColor] = useState(defaultColor);

  const handleChange = (hex) => {
    setColor(hex);
    colorStateForHome(hex);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="Change accent color"
          className="game-btn-circle w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-white/10"
          style={{ backgroundColor: color }}
        >
          <Palette size={16} className="text-white drop-shadow" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        collisionPadding={16}
        className="w-56 max-w-[calc(100vw-2rem)] bg-popover text-popover-foreground border border-border"
      >
        <p className="text-xs text-muted-foreground mb-1 px-1">Accent color</p>
        <div className="grid grid-cols-4 gap-2 px-1">
          {PRESET_COLORS.map((preset) => (
            <button
              key={preset}
              aria-label={preset}
              onClick={() => handleChange(preset)}
              className="game-btn-circle w-9 h-9 rounded-full flex items-center justify-center border border-border"
              style={{ backgroundColor: preset }}
            >
              {preset === color && <Check size={16} className="text-white drop-shadow" />}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 px-1">
          <input
            type="color"
            value={color}
            onChange={(event) => handleChange(event.target.value)}
            className="w-9 h-9 rounded-full border border-border bg-transparent cursor-pointer p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none"
            aria-label="Custom color"
          />
          <span className="text-xs text-muted-foreground font-mono">{color}</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
