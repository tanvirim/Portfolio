/* eslint-disable react/prop-types */

import { useState } from "react";
import { differenceInYears } from "date-fns";
import { MapPin, ChevronsRight, Download } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import profilePic from "../assets/profile.jpg";
import { defaultColor, shippedProjects } from "../constants";
import SocialIcons from "./Socialicon";
import useTypewriter from "../Hooks/useTypewriter";
import usePrefersReducedMotion from "../Hooks/usePrefersReducedMotion";
import renderLinkedText from "../utils/renderLinkedText";
import formatList from "../utils/formatList";

const NAME_PLAIN = "Tanvir Imam ";
const NAME_ACCENT = "Mitul";
// Career start (first internship, see workExperience below) — years of
// experience is computed from this instead of hardcoded, so it keeps
// ticking up on its own every year rather than needing a manual bump.
const EXPERIENCE_START = new Date(2023, 0, 1);
const experienceYears = Math.max(
  1,
  differenceInYears(new Date(), EXPERIENCE_START)
);
const TAGLINE = `Full Stack Engineer with ${experienceYears}+ years of experience building reliable, production-ready web platforms`;
const ROLE_LINE = "Software Engineer @ Dream71 Bangladesh Limited";
const DESCRIPTION =
  "I build and ship production systems end to end - Next.js/React frontends, Node.js/NestJS backends, and the Docker/Nginx infrastructure that runs them.";
const LOCATION_TEXT = "Dhaka, Bangladesh";
const CURRENTLY_TEXT = `Building ${formatList(shippedProjects.map((p) => p.name))}`;
const CURRENTLY_LINKS = shippedProjects.map(({ name, url }) => ({
  text: name,
  href: url,
}));

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

// Reserves the FINAL fully-typed content's real layout height up front,
// instead of guessing a min-height in em units per line — the guesses
// (min-h-[3.75em] etc., previously here) didn't match how many lines text
// actually wraps to at a given viewport width, so content below Hero
// (the GitHub contributions panel) visibly shifted down each time a typed
// line grew past its guessed height. `measure` renders the real final
// content invisibly (in normal flow, so it sets the parent's height);
// `children` — the actual animating output — is layered on top via
// `position: absolute`, matching that same reserved box exactly.
const Reveal = ({ as: As = "p", className = "", measure, children }) => (
  <As className={`relative ${className}`}>
    <span className="invisible" aria-hidden="true">
      {measure}
    </span>
    <span className="absolute inset-0">{children}</span>
  </As>
);

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

      <Reveal
        as="h1"
        className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white"
        measure={NAME_PLAIN + NAME_ACCENT}
      >
        {namePlainShown}
        <span style={{ color }}>{nameAccentShown}</span>
        {!nameTyping.done && (
          <span
            className="inline-block w-[3px] h-8 sm:h-10 ml-1 align-middle terminal-cursor"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        )}
      </Reveal>

      <Reveal className="text-lg text-gray-600 dark:text-gray-300" measure={TAGLINE}>
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
      </Reveal>

      <Reveal className="text-sm text-gray-500 dark:text-gray-400" measure={ROLE_LINE}>
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
      </Reveal>

      <Reveal
        className="max-w-md text-sm text-gray-500 dark:text-gray-400 leading-relaxed"
        measure={DESCRIPTION}
      >
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
      </Reveal>

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

      <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 mt-2 min-h-[2.25em]">
        {locationTyping.done && (
          <>
            <Dot color="#4ade80" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Currently
            </span>{" "}
            {currentlyTyping.done
              ? renderLinkedText(CURRENTLY_TEXT, CURRENTLY_LINKS)
              : currentlyTyping.output}
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
        className={`flex flex-col gap-4 transition-all duration-700 ease-out ${showRest ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
      >
        <div className="flex flex-wrap items-center gap-4 mt-1">
          <SocialIcons />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="game"
            size="game"
            className="text-xs gap-1 px-3.5 py-2"
            color={color}
            onClick={openModal}
          >
            Learn More
            <ChevronsRight size={14} />
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="text-base p-4 sm:p-6 w-full max-w-[calc(100%-2rem)] sm:max-w-3xl"
          style={{ maxHeight: "90vh", overflowY: "auto", "--modal-accent": color }}
        >
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
                  Full Stack Engineer with {experienceYears}+ years of
                  experience and a DevOps focus — building and shipping
                  production systems end-to-end, currently leading frontend
                  architecture for large-scale AI-driven national platforms (
                  {formatList(shippedProjects.map((p) => p.name))}) under the
                  ICT Division at Dream71 Bangladesh Limited, while owning
                  deployment, server hardening, and infrastructure.
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
              <Button asChild variant="game" size="game" color={color}>
                <a href="/Tanvir_Mitul_Resume.pdf" download>
                  Download Resume
                  <Download size={16} />
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Hero;
