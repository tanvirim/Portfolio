/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { defaultColor, projects } from "../../constants";
import { TECH_ICON_META } from "../../constants/techIcons";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ChevronsRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectModal from "./ProjectModal"; // Import the new ProjectModal component
import SectionTitle from "../SectionTitle";
import IconCube from "../IconCube";
import TiltCard from "../TiltCard";
import { Button } from "../ui/button";
import { markImageLoaded } from "../../utils/loadedImageCache";

const ProjectCards = ({ color = defaultColor }) => {
  const location = useLocation();
  const isRootRoute = location.pathname === "/";
  const displayedProjects = isRootRoute ? projects.slice(0, 6) : projects;

  // Warm the browser cache for every gallery image up front, so flipping
  // through a project's images inside the modal is instant instead of
  // triggering a fresh network fetch (and the modal's loading spinner) per
  // image the first time it's shown.
  useEffect(() => {
    const urls = new Set();
    projects.forEach((project) => {
      if (project.imageLink) urls.add(project.imageLink);
      project.images?.forEach((url) => urls.add(url));
    });

    urls.forEach((url) => {
      const img = new Image();
      img.onload = () => markImageLoaded(url);
      img.src = url;
    });
  }, []);

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
      <SectionTitle
        title="Projects"
        subtitle="A selection of products and platforms I've designed, built, and shipped."
        color={color}
        className="mb-6"
      />

      <ProjectCardsContainer color={color}>
        {displayedProjects.map((project, index) => (
          <TiltCard
            as={ProjectCard}
            key={index}
            className="game-card"
            color={color}
            delay={index * 0.08}
            onClick={() => openModal(index)}
          >
            {project.imageLink ? (
              <img
                className="h-[140px] object-cover rounded-t-lg"
                src={project.imageLink}
                alt={project.projectName}
                onLoad={() => markImageLoaded(project.imageLink)}
              />
            ) : (
              <div
                className="h-[140px] rounded-t-lg project-image-fallback"
                style={{ "--fallback-accent": color || defaultColor }}
              />
            )}
            <h3>{project.projectName}</h3>
            <ul>
              {project.technologies.map((tech, techIndex) => {
                const meta = TECH_ICON_META[tech];
                return (
                  <li key={techIndex}>
                    {/* Icon-only, no pill/button background — a row of
                            text pills for every technology took up a lot of
                            card space; the bare icon (with a hover tooltip)
                            reads just as clearly at a glance. Any technology
                            still missing from TECH_ICON_META falls back to
                            a plain text badge. */}
                    {meta ? (
                      <IconCube
                        icon={meta.icon}
                        color={meta.color}
                        size={30}
                        label={tech}
                      />
                    ) : (
                      <span className="tech-fallback">{tech}</span>
                    )}
                  </li>
                );
              })}
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
                  <IconCube
                    icon={FaGithub}
                    color="#181717"
                    size={23}
                    label="View on GitHub"
                  />
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconCube
                    icon={ExternalLink}
                    color={color ? color : defaultColor}
                    size={20}
                    label="View live site"
                  />
                </a>
              )}
            </div>
          </TiltCard>
        ))}
      </ProjectCardsContainer>
      {isRootRoute && (
        <div className="flex justify-end mt-5">
          <Button
            asChild
            variant="game"
            size="game"
            color={color}
            className="text-xs gap-1.5"
          >
            <Link to="/projects">
              All Projects
              <ChevronsRight size={14} />
            </Link>
          </Button>
        </div>
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
  background: color-mix(in srgb, var(--card) 90%, transparent);
  border: 1px solid var(--border);
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.08);
  cursor: pointer;

  .dark & {
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.45);
  }

  h3 {
    font-size: 20px;
    color: ${({ color }) => (color ? color : defaultColor)};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 14px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px 20px;
  }

  li {
    display: inline-flex;
  }

  .project-links {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
`;
