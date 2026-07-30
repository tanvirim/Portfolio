/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { defaultColor, projects } from "../../constants";
import { TECH_ICON_META } from "../../constants/techIcons";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ChevronsRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import ProjectModal from "./ProjectModal"; // Import the new ProjectModal component
import SectionTitle from "../SectionTitle";
import IconCube from "../IconCube";
import { Button } from "../ui/button";
import { markImageLoaded } from "../../utils/loadedImageCache";

// Pointer-tracked 3D tilt for a project card — rotateX/rotateY follow the
// cursor's position within the card (a real tilt-card effect, not just a
// fixed hover pose), smoothed through a spring so it settles instead of
// snapping. Kept as its own component (rather than inline in the .map())
// because each card needs its own motion values — hooks can't live inside
// a callback passed to .map().
const TiltProjectCard = ({ color, index, onClick, children }) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [9, -9]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-9, 9]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <ProjectCard
      className="game-card"
      color={color}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
    >
      {children}
    </ProjectCard>
  );
};

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
      <SectionTitle
        title="Projects"
        subtitle="A selection of products and platforms I've designed, built, and shipped."
        color={color}
        className="mb-6"
      />

      <div
        className="game-card-subtle terminal-card"
        style={{ "--tile-accent": color }}
      >
        <div className="terminal-card-header">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
            projects.sh
          </span>
        </div>

        <div className="p-5 sm:p-8">
          <ProjectCardsContainer color={color}>
            {displayedProjects.map((project, index) => (
              <TiltProjectCard
                key={index}
                color={color}
                index={index}
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
              </TiltProjectCard>
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
        </div>
      </div>

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
  background: var(--card);
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
