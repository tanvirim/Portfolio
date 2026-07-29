/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { MapPin, ChevronsRight, Download } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import profilePic from "../assets/profile.jpg";
import { defaultColor } from "../constants";
import SocialIcons from "./Socialicon";
import useTypewriter from "../Hooks/useTypewriter";
import usePrefersReducedMotion from "../Hooks/usePrefersReducedMotion";

const NAME_PLAIN = "Tanvir Imam ";
const NAME_ACCENT = "Mitul";
const TAGLINE = "Full Stack Engineer building reliable, production-ready web platforms";
const ROLE_LINE = "Software Engineer @ Dream71 Bangladesh Limited";
const DESCRIPTION =
  "I build and ship production systems end to end — Next.js/React frontends, Node.js/NestJS backends, and the Docker/Nginx infrastructure that runs them.";
const LOCATION_TEXT = "Dhaka, Bangladesh";
const CURRENTLY_TEXT = "Building Kagoj.ai, Jiggasha.ai & TAS";

const educationData = [
  {
    institution: "Rajshahi University of Engineering and Technology",
    degree: "B.Sc. in MSE",
    timeline: "2017 - 2023",
  },
  {
    institution: "BCIC College",
    degree: "Dept. of Science",
    timeline: "2012 - 2016",
  },
  {
    institution: "Kushtia Zilla School",
    degree: "Secondary School",
    timeline: "2009 - 2011",
  },
];

const hobbies = ["Coding", "Reading", "Traveling", "Photography"];

const workExperience = [
  {
    role: "Software Engineer",
    company: "Dream71 Bangladesh Limited",
    link: "https://dream71.com/",
    timeline: "2025 - Present",
  },
  {
    role: "Software Developer",
    company: "Seopage1",
    link: "https://www.facebook.com/seopage1.dhaka",
    timeline: "2024 - 2025",
  },
  {
    role: "Intern Web Developer",
    company: "Qubitech Solutions",
    link: "https://www.facebook.com/qubitechbd",
    timeline: "2023",
  },
];

const Dot = ({ color }) => (
  <span className="relative flex h-2 w-2 shrink-0">
    <span
      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
      style={{ backgroundColor: color }}
    />
    <span
      className="relative inline-flex h-2 w-2 rounded-full"
      style={{ backgroundColor: color }}
    />
  </span>
);

const Hero = ({ color = defaultColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Sequenced typing — name, then tagline, then role line — each one only
  // starts once the previous is done, so the intro reads like it's being
  // typed live instead of just fading in as static text. The rest of the
  // content (description, location, socials, status) fades/slides in once
  // the sequence finishes, so nothing just pops in as a static block either.
  const nameTyping = useTypewriter(NAME_PLAIN + NAME_ACCENT, {
    speed: 55,
    instant: prefersReducedMotion,
  });
  const taglineTyping = useTypewriter(TAGLINE, {
    speed: 18,
    enabled: nameTyping.done,
    instant: prefersReducedMotion,
  });
  const roleTyping = useTypewriter(ROLE_LINE, {
    speed: 18,
    enabled: taglineTyping.done,
    instant: prefersReducedMotion,
  });
  const descriptionTyping = useTypewriter(DESCRIPTION, {
    speed: 9,
    enabled: roleTyping.done,
    instant: prefersReducedMotion,
  });
  const locationTyping = useTypewriter(LOCATION_TEXT, {
    speed: 28,
    enabled: descriptionTyping.done,
    instant: prefersReducedMotion,
  });
  const currentlyTyping = useTypewriter(CURRENTLY_TEXT, {
    speed: 20,
    enabled: locationTyping.done,
    instant: prefersReducedMotion,
  });
  const showRest = prefersReducedMotion || currentlyTyping.done;

  const namePlainShown = nameTyping.output.slice(0, NAME_PLAIN.length);
  const nameAccentShown = nameTyping.output.slice(NAME_PLAIN.length);

  return (
    <div className="flex flex-col justify-center gap-4 py-2">
      <div className="flex items-center gap-4">
        <img
          src={profilePic}
          alt="Tanvir Imam Mitul"
          className="game-card w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 shadow-xl shrink-0"
          style={{ borderColor: color }}
        />
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
          <Dot color={color} />
          Writing code that makes a difference...
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white min-h-[1.2em] sm:min-h-[1.2em]">
        {namePlainShown}
        <span style={{ color }}>{nameAccentShown}</span>
        {!nameTyping.done && (
          <span
            className="inline-block w-[3px] h-8 sm:h-10 ml-1 align-middle terminal-cursor"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        )}
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 min-h-[1.75em]">
        {nameTyping.done && (
          <>
            {taglineTyping.output}
            {!taglineTyping.done && (
              <span
                className="inline-block w-[2px] h-5 ml-0.5 align-middle terminal-cursor"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 min-h-[1.5em]">
        {taglineTyping.done && !roleTyping.done && (
          <>
            {roleTyping.output}
            <span
              className="inline-block w-[2px] h-3.5 ml-0.5 align-middle terminal-cursor"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
          </>
        )}
        {roleTyping.done && (
          <>
            Software Engineer @{" "}
            <a
              href="https://dream71.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-2 hover:text-gray-900 dark:hover:text-white"
            >
              Dream71 Bangladesh Limited
            </a>
          </>
        )}
      </p>

      <p className="max-w-md text-sm text-gray-500 dark:text-gray-400 leading-relaxed min-h-[3.75em]">
        {roleTyping.done && (
          <>
            {descriptionTyping.output}
            {!descriptionTyping.done && (
              <span
                className="inline-block w-[2px] h-3.5 ml-0.5 align-middle terminal-cursor"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </p>

      <p className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 min-h-[1.5em]">
        {descriptionTyping.done && (
          <>
            <MapPin size={14} /> {locationTyping.output}
            {!locationTyping.done && (
              <span
                className="inline-block w-[2px] h-3.5 ml-0.5 align-middle terminal-cursor"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </p>

      <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 mt-2 min-h-[1.25em]">
        {locationTyping.done && (
          <>
            <Dot color="#4ade80" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Currently
            </span>{" "}
            {currentlyTyping.output}
            {!currentlyTyping.done && (
              <span
                className="inline-block w-[2px] h-3 ml-0.5 align-middle terminal-cursor"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </p>

      <div
        className={`flex flex-col gap-4 transition-all duration-700 ease-out ${
          showRest ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-wrap items-center gap-4 mt-1">
          <SocialIcons color={color} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="game-btn text-xs font-bold flex items-center gap-1 px-3.5 py-2 text-black rounded-full"
            style={{ backgroundColor: color }}
            onClick={openModal}
          >
            Learn More
            <ChevronsRight size={14} />
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-base p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[calc(100%-2rem)] sm:max-w-3xl"
          style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          <button
            className="absolute top-2 right-3 sm:top-0 sm:right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white text-4xl sm:text-6xl leading-none"
            onClick={closeModal}
          >
            &times;
          </button>

          <div className="overflow-y-auto max-h-[80vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-center items-center">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="rounded-full w-40 h-40 object-cover shadow-lg"
                />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 about-title-text-style ">
                  Introduction
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Full Stack Engineer with a DevOps focus — building and
                  shipping production systems end-to-end, currently leading
                  frontend architecture for large-scale AI-driven national
                  platforms (Kagoj.ai, Jiggasha.ai, TAS) under the ICT Division
                  at Dream71 Bangladesh Limited, while owning deployment, server
                  hardening, and infrastructure.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2 about-title-text-style ">
                Work Experience
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 list-disc ml-6">
                {workExperience.map((work, index) => (
                  <li key={index}>
                    <strong>{work.role}</strong> at{" "}
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {work.company}
                    </a>{" "}
                    ({work.timeline})
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2 about-title-text-style ">
                  Education
                </h3>
                {educationData.map((edu, index) => (
                  <p className="text-gray-600 dark:text-gray-300" key={index}>
                    <strong>{edu.institution}</strong>
                    <br />
                    {edu.degree} ({edu.timeline})
                  </p>
                ))}
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-2 about-title-text-style ">
                  Hobbies
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {hobbies.join(", ")}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <a
                href="/Tanvir_Mitul_Resume.pdf"
                download
                className="game-btn flex items-center px-4 py-2 text-black font-bold rounded-full"
                style={{ backgroundColor: color }}
              >
                Download Resume
                <Download className="ml-2" size={16} />
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Hero;
