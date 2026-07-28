/* eslint-disable react/prop-types */

import { Download } from "lucide-react";
import { BiLogoUpwork } from "react-icons/bi";
import { Button } from "./ui/button";
import { defaultColor } from "../constants";

const ResumeAndHireButtons = ({ color = defaultColor }) => {
  return (
    <div
      className="mt-3 flex items-center gap-3"
      style={{ "--btn-accent": color }}
    >
      <Button
        asChild
        className="game-btn bg-[var(--btn-accent)] gap-1 px-3 py-2 h-auto text-xs rounded-full font-bold text-white"
      >
        <a href="https://www.upwork.com/tanvirmitul" target="_blank" rel="noopener noreferrer">
          <BiLogoUpwork size={14} /> Hire Me
        </a>
      </Button>
      <Button
        asChild
        className="game-btn bg-[var(--btn-accent)] gap-1 px-3.5 py-2 h-auto text-xs rounded-full font-bold text-white"
      >
        <a
          download="Tanvir Mitul-Resume"
          target="_blank"
          rel="noopener noreferrer"
          href="/Tanvir_Mitul_Resume.pdf"
        >
          <Download size={14} /> Resume
        </a>
      </Button>
    </div>
  );
};

export default ResumeAndHireButtons;
