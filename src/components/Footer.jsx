/* eslint-disable react/prop-types */
import { ExternalLink } from "lucide-react";
import ContactForm from "./ContactForm";
import { defaultColor } from "../constants";

const SHIPPED_PROJECTS = [
  { name: "Kagoj.ai", url: "https://kagoj.ai/" },
  { name: "Jiggasha.ai", url: "https://jiggasha.ai/" },
  { name: "TAS", url: "https://tas.bangla.gov.bd/" },
];

const Footer = ({ color = defaultColor }) => {
  return (
    <div className="px-5">
      <div className="title-text-style mb-6">CONTACT</div>

      <div className="max-w-md mx-auto w-full">
        <div
          className="game-card-subtle rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#0d1117]/70 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden"
          style={{ "--tile-accent": color }}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03]">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
              send_message.sh
            </span>
          </div>
          <div className="p-5">
            <ContactForm color={color} />
          </div>
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
            Things I&apos;ve shipped
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SHIPPED_PROJECTS.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--hover-color": color }}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3.5 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-[var(--hover-color)] hover:border-[var(--hover-color)] transition-colors"
              >
                {project.name}
                <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          &copy; Tanvir Mitul {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
