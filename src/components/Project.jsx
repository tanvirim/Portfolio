/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styled from "styled-components";
import { defaultColor, projects } from "../constants";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"; // Import icons from react-icons/fa

import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { AiOutlineDoubleRight } from "react-icons/ai";
const StyledLearnMoreButton = styled(Link)`
margin-top:20px;
margin-left:70%;
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
  gap: 10px;

  border-left: 5px dotted ${({ color }) => (color ? color : defaultColor)};
`;

const ProjectCard = styled.div`
  gap: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  width: 350px;
  background-color: #fff; /* Set your card background color */
  text-align: left; /* Align text to the left */
  transition: transform 0.2s;
  display: flex;
  flex-direction: column; /* Display technologies as a column */

  h2 {
    color: ${({ color }) => (color ? color : defaultColor)};
    font-size: 1.5rem;
    margin-bottom: 5px;
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
    /* Set button background color */
    color: #fff; /* Set button text color */
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    margin-bottom: 10px; /* Add spacing between buttons */
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
    transform: translateY(-5px);
  }

  /* Set background image */
  background-image: url(${(props) => props.imageLink});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProjectTitle = styled.h2`
text-transform:uppercase;
  border-bottom: 3px solid ${defaultColor};
  padding-bottom: 10px;
  width: 300px;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;
const ProjectCards = ({ color = defaultColor }) => {
  return (
    <>
      <ProjectTitle>Projects</ProjectTitle>
      <ProjectCardsContainer color={color}>
        {projects.map((project, index) => (
          <ProjectCard color={color} key={index} imageLink={project.imageLink}>
            <h2>{project.projectName}</h2>
            <ul>
              {project.technologies.map((tech, techIndex) => (
                <li key={techIndex}>
                  <button className="technology-button">{tech}</button>
                </li>
              ))}
            </ul>
            <p>{project.projectDescription}</p>
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
    </>
  );
};

export default ProjectCards;
