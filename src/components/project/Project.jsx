/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styled from "styled-components";
import { defaultColor, projects } from "../../constants";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";

const ProjectCards = ({ color = defaultColor }) => {
  return (
    <div className="custom-shadow-border mb-10">
      <div className="title-text-style mb-6">Projects</div>
      <ProjectCardsContainer color={color}>
        {projects.map((project, index) => (
          <ProjectCard color={color} key={index}>
            <img
              className="h-[140px]  object-cover rounded-t-lg "
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
      <StyledLearnMoreButton color={color} to="/projects">
        All Projects
        <AiOutlineDoubleRight />
      </StyledLearnMoreButton>
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
  box-shadow: 0px 20px 30px rgba(0, 128, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.1);

  h3 {
    color: ${({ color }) => (color ? color : defaultColor)};
    font-size: 20px;
    margin-bottom: 5px;
    text-align: center;
  }

  p {
    margin-top: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap; /* Display technologies as a flex row */
  }

  li {
    margin-right: 10px;
  }

  .technology-button {
    background-color: ${({ color }) => (color ? color : defaultColor)};
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    font-size: 10px;
    margin-bottom: 5px;
  }

  .project-links {
    margin-top: 5px;
    margin-right: 10px;
    display: flex;

    a {
      margin-right: 20px; /* Add spacing between links */
      text-decoration: none;
      transition: transform 0.3s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }

  &:hover {
    transform: scale(1.025);
  }
`;
