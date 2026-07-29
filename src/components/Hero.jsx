/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { MapPin, ChevronsRight, Download } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import profilePic from "../assets/profile.jpg";
import { defaultColor } from "../constants";
import SocialIcons from "./Socialicon";

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

  return (
    <div className="flex flex-col justify-center gap-4 py-2">
      <div className="flex items-center gap-4">
        <img
          src={profilePic}
          alt="Tanvir Imam Mitul"
          className="game-card w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 shadow-xl shrink-0"
          style={{ borderColor: color }}
        />
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
          <Dot color={color} />
          Open to new opportunities
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
        Tanvir Imam <span style={{ color }}>Mitul</span>
      </h1>

      <p className="text-lg text-gray-300">
        Full Stack Engineer building reliable, production-ready web platforms
      </p>

      <p className="text-sm text-gray-400">
        Software Engineer @{" "}
        <a
          href="https://dream71.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted underline-offset-2 hover:text-white"
        >
          Dream71 Bangladesh Limited
        </a>
      </p>

      <p className="max-w-md text-sm text-gray-400 leading-relaxed">
        I build and ship production systems end to end — Next.js/React
        frontends, Node.js/NestJS backends, and the Docker/Nginx
        infrastructure that runs them.
      </p>

      <p className="flex items-center gap-1.5 text-sm text-gray-400">
        <MapPin size={14} /> Dhaka, Bangladesh
      </p>

      <div className="flex flex-wrap items-center gap-4 mt-1">
        <SocialIcons color={color} />
      </div>

      <p className="flex items-center gap-2 text-xs text-gray-500 mt-2">
        <Dot color="#4ade80" />
        <span className="font-medium text-gray-300">Currently</span>{" "}
        Building Kagoj.ai, Jiggasha.ai &amp; TAS
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <button
          className="game-btn text-xs font-bold flex items-center gap-1 px-3.5 py-2 text-white rounded-full"
          style={{ backgroundColor: color }}
          onClick={openModal}
        >
          Learn More
          <ChevronsRight size={14} />
        </button>
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
                  platforms (Kagoj.ai, Jiggasha.ai, TAS) under the ICT
                  Division at Dream71 Bangladesh Limited, while owning
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
                <p className="text-gray-600 dark:text-gray-300">{hobbies.join(", ")}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <a
                href="/Tanvir_Mitul_Resume.pdf"
                download
                className="game-btn flex items-center px-4 py-2 text-white font-bold rounded-full"
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
