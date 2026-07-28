/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { ChevronsRight, Download } from "lucide-react";
import profilePic from "../assets/profile.jpg";
import styled from "styled-components";
import { defaultColor } from "../constants";
import SocialIcons from "./Socialicon";
import ResumeAndHireButtons from "./Button2";

const AboutMe = ({ color = defaultColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic Data for AboutMe
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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="px-5">
      <div className="hidden lg:block title-text-style text-white mb-6">ABOUT ME</div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src={profilePic}
          alt="Tanvir Imam Mitul"
          className="game-card w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 shadow-xl shrink-0"
          style={{ borderColor: color }}
        />

        <Text
          color={color}
          className="relative flex-1 w-full text-lg text-gray-700 dark:text-gray-200"
        >
          I'm a <span>Full Stack Engineer</span> with a{" "}
          <span>DevOps focus</span>, building and shipping production
          systems end-to-end — from <span>Next.js/React</span> frontends
          and <span>Node.js/NestJS</span> backends, down to the VPS,{" "}
          <span>Docker</span> containers, and <span>Nginx</span> configs
          that actually run them in production. I'm a graduate of RUET.
          Currently at Dream71 Bangladesh Limited, I lead frontend
          architecture for large-scale AI-driven national platforms under
          the ICT Division, while owning deployment, server hardening, and
          infrastructure for several of them.
        </Text>
      </div>

      {/* Connect / CTA row — social links first, then actions */}
      <div className="flex flex-col items-center gap-5 mt-10">
        <SocialIcons color={color} />
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 w-full">
          <ResumeAndHireButtons color={color} />
          <button
            className="game-btn text-xs font-bold flex items-center gap-1 px-3.5 py-2 text-white rounded-full sm:ml-auto"
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

            {/* Content that needs to scroll */}
            <div className="overflow-y-auto max-h-[80vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Profile Image */}
                <div className="flex justify-center items-center">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="rounded-full w-40 h-40 object-cover shadow-lg"
                  />
                </div>

                {/* Introduction */}
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

              {/* Dynamic Work Experience */}
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

              {/* Dynamic Education Section */}
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

                {/* Dynamic Hobbies */}
                <div>
                  <h3 className="text-2xl font-semibold mb-2 about-title-text-style ">
                    Hobbies
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{hobbies.join(", ")}</p>
                </div>
              </div>

              {/* Resume Download */}
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

export default AboutMe;

const Text = styled.div`
  span {
    color: ${({ color }) => (color ? color : defaultColor)};
  }
`;
