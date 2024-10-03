/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { defaultColor, projects } from "../../constants";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
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
    <div className="custom-shadow-border mb-14 pb-4">
      <div className="title-text-style mb-6">Projects</div>
      <ProjectCardsContainer color={color}>
        {displayedProjects.map((project, index) => (
          <ProjectCard
            color={color}
            key={index}
            onClick={() => openModal(index)}
          >
            <img
              className="h-[140px] object-cover rounded-t-lg"
              src={project.imageLink}
              alt={project.projectName}
            />
            <h3>{project.projectName}</h3>
            <ul>
              {project.technologies.map((tech, techIndex) => (
                <li key={techIndex}>
                  <button className="technology-button">{tech}</button>
                </li>
              ))}
            </ul>
            <p title={project.projectDescription}>
              {project.projectDescription.length > 150
                ? `${project.projectDescription.slice(0, 150)}...`
                : project.projectDescription}
            </p>

            <div className="project-links">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub color={color ? color : defaultColor} size={23} />
              </a>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaExternalLinkAlt
                  color={color ? color : defaultColor}
                  size={20}
                />
              </a>
            </div>
          </ProjectCard>
        ))}
      </ProjectCardsContainer>
      {isRootRoute && (
        <StyledLearnMoreButton color={color} to="/projects">
          All Projects
          <AiOutlineDoubleRight />
        </StyledLearnMoreButton>
      )}

      {/* Modal for image slider */}
      <ProjectModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        project={currentProject}
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
  display: flex;
  width: fit-content;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  background: ${({ color }) => (color ? color : defaultColor)};
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
    background-color: #3f51b5;
  }
  & > svg {
    margin-left: 5px;
  }
`;

const ProjectCardsContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const ProjectCard = styled.div`
  gap: 5px;
  padding: 20px;
  border-radius: 10px;
  width: 380px;
  text-align: left;
  transition: transform 0.2s;
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
    padding: 5px;
    margin: 2px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #3f51b5;
    }
  }

  .project-links {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }
`;
