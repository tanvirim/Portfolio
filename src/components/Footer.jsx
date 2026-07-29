/* eslint-disable react/prop-types */
import { ExternalLink } from "lucide-react";
import ContactForm from "./ContactForm";
import SectionTitle from "./SectionTitle";
import { defaultColor, shippedProjects } from "../constants";

const Footer = ({ color = defaultColor }) => {
  return (
    <div className="px-5">
      <SectionTitle
        title="CONTACT"
        subtitle="Have a project in mind? I'd love to hear about it."
        color={color}
        className="mb-6"
      />

      <div className="max-w-md mx-auto w-full">
        <div
          className="game-card-subtle terminal-card"
          style={{ "--tile-accent": color }}
        >
          <div className="terminal-card-header">
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
            {shippedProjects.map((project) => (
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
