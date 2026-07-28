/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { defaultColor, projects } from "../../constants";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ChevronsRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import ProjectModal from "./ProjectModal"; // Import the new ProjectModal component

const ProjectCards = ({ color = defaultColor }) => {
  const location = useLocation();
  const isRootRoute = location.pathname === "/";
  const displayedProjects = isRootRoute ? projects.slice(0, 6) : projects;

  // State for modal visibility and current project index
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const openModal = (index) => {
    setCurrentProjectIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextProject = () => {
    if (currentProjectIndex < displayedProjects.length - 1) {
      setCurrentProjectIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevProject = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentProject = displayedProjects[currentProjectIndex];

  return (
    <div className="px-5">
      <div className="title-text-style mb-6">Projects</div>
      <ProjectCardsContainer color={color}>
        {displayedProjects.map((project, index) => (
          <ProjectCard
            className="game-card"
            color={color}
            key={index}
            onClick={() => openModal(index)}
            initial={{ opacity: 0, y: 50, rotateX: -12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
          >
            {project.imageLink ? (
              <img
                className="h-[140px] object-cover rounded-t-lg"
                src={project.imageLink}
                alt={project.projectName}
              />
            ) : (
              <div className="h-[140px] rounded-t-lg bg-gray-800 flex items-center justify-center text-gray-500 text-xs">
                Preview coming soon
              </div>
            )}
            <h3>{project.projectName}</h3>
            <ul>
              {project.technologies.map((tech, techIndex) => (
                <li key={techIndex}>
                  <button className="technology-button game-btn">{tech}</button>
                </li>
              ))}
            </ul>
            <p title={project.projectDescription}>
              {project.projectDescription.length > 150
                ? `${project.projectDescription.slice(0, 150)}...`
                : project.projectDescription}
            </p>

            <div className="project-links">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub color={color ? color : defaultColor} size={23} />
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink color={color ? color : defaultColor} size={20} />
                </a>
              )}
            </div>
          </ProjectCard>
        ))}
      </ProjectCardsContainer>
      {isRootRoute && (
        <StyledLearnMoreButton className="game-btn" color={color} to="/projects">
          All Projects
          <ChevronsRight />
        </StyledLearnMoreButton>
      )}

      {/* Modal for image slider */}
      <ProjectModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        project={currentProject}
        color={color}
        nextProject={nextProject}
        prevProject={prevProject}
        isNextDisabled={currentProjectIndex === displayedProjects.length - 1}
        isPrevDisabled={currentProjectIndex === 0}
      />
    </div>
  );
};

export default ProjectCards;

const StyledLearnMoreButton = styled(Link)`
  margin-top: 20px;
  margin-left: 70%;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  width: fit-content;
  align-items: center;
  padding: 8px 16px;
  border-radius: 999px;
  background: ${({ color }) => (color ? color : defaultColor)};
  color: white;
  text-decoration: none;

  & > svg {
    margin-left: 5px;
  }
`;

const ProjectCardsContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 24px;
  perspective: 1000px;

  @media (min-width: 640px) {
    gap: 50px;
  }
`;

const ProjectCard = styled(motion.div)`
  gap: 5px;
  padding: 20px;
  border-radius: 14px;
  width: 100%;
  max-width: 380px;
  text-align: left;
  display: flex;
  flex-direction: column;
  height: fit-content;
  background: rgba(173, 216, 230, 0.2);
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  h3 {
    font-size: 20px;
    color: ${({ color }) => (color ? color : defaultColor)};
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: inline;
  }

  .technology-button {
    background: ${({ color }) => (color ? color : defaultColor)};
    color: white;
    font-weight: 600;
    padding: 5px 10px;
    margin: 2px;
    border-radius: 999px;
    border-bottom-width: 2px !important;
    cursor: pointer;
  }

  .project-links {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

`;
