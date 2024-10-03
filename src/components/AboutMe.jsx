/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import Modal from "react-modal";
import { AiOutlineDoubleRight, AiOutlineDownload } from "react-icons/ai";
import profilePic from "../assets/profile.jpg";
import styled from "styled-components";
import { defaultColor } from "../constants";

Modal.setAppElement("#root");

const AboutMe = ({ color = defaultColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic Data for AboutMe
  const educationData = [
    {
      institution: "Rajshahi University of Engineering and Technology",
      degree: "B.Sc. in MSE",
      timeline: "2017 - 2022",
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
      role: "Software Developer",
      company: "Seopage1",
      link: "https://www.facebook.com/seopage1.dhaka",
      timeline: "2024 - Present",
    },
    {
      role: "Jr. Software Developer",
      company: "Seopage1",
      link: "https://www.facebook.com/seopage1.dhaka",
      timeline: "2024 - 2024",
    },
    {
      role: "Intern",
      company: "Qubitech Solutions",
      link: "https://www.facebook.com/qubitechbd",
      timeline: "2023 - 2024",
    },
  ];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="custom-shadow-border mb-20 p-5">
      <div className="title-text-style text-white">ABOUT ME</div>
      <div className="relative p-10 mb-4 text-lg text-gray-200">
        <Text color={color}>
          As a <span>JavaScript</span> developer, I leverage a combination of{" "}
          <span>object-oriented</span> and <span>functional programming</span>{" "}
          to efficiently solve challenges. My enthusiasm for learning extends to
          embracing <span>new technology stacks</span>. Moreover, I excel as a{" "}
          <span>team player</span> and demonstrate strong{" "}
          <span>leadership skills</span>, effectively collaborating with
          colleagues to achieve our shared objectives.
        </Text>

        <button
          className="absolute left-2/3 mt-4 text-xs flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:scale-105 transition-transform"
          onClick={openModal}
        >
          Learn More
          <AiOutlineDoubleRight className="ml-2" />
        </button>

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="About Me Details"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
          className="relative bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4"
          style={{
            overlay: { zIndex: 998 },
            content: {
              zIndex: 999,
              maxHeight: "95vh",
              overflowY: "none",
            },
          }}
        >
          <button
            className="absolute top-0 right-4 text-gray-400 hover:text-white text-6xl"
            onClick={closeModal}
          >
            &times;
          </button>

          {/* Content that needs to scroll */}
          <div className="overflow-y-auto max-h-[90vh]">
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
                <h2 className="text-3xl font-bold mb-4 about-title-text-style ">
                  Introduction
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  I'm a passionate software developer with a focus on JavaScript
                  and modern web technologies. I love building efficient,
                  scalable, and user-friendly applications.
                </p>
              </div>
            </div>

            {/* Dynamic Work Experience */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2 about-title-text-style ">
                Work Experience
              </h3>
              <ul className="text-gray-300 list-disc ml-6">
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
                  <p className="text-gray-300" key={index}>
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
                <p className="text-gray-300">{hobbies.join(", ")}</p>
              </div>
            </div>

            {/* Resume Download */}
            <div className="mt-6 flex justify-center">
              <a
                href="/path-to-your-resume.pdf"
                download
                className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-transform"
              >
                Download Resume
                <AiOutlineDownload className="ml-2" />
              </a>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AboutMe;

const Text = styled.div`
  span {
    color: ${({ color }) => (color ? color : defaultColor)};
  }
`;
