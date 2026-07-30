/* eslint-disable react/prop-types */
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import IconCube from "../IconCube";
import styled, { keyframes } from "styled-components";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { defaultColor } from "../../constants";
import { TECH_ICON_META } from "../../constants/techIcons";
import { isImageLoaded, markImageLoaded } from "../../utils/loadedImageCache";

const ProjectModal = ({
  isOpen,
  onRequestClose,
  project,
  nextProject,
  prevProject,
  isNextDisabled,
  isPrevDisabled,
  color = defaultColor,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const currentImageUrl = project.images?.[currentImageIndex];
  // Skip the fake "still loading" spinner for a URL the browser already
  // has cached (e.g. the project card's cover image, or a gallery image
  // you've already flipped past) instead of always starting at true.
  const [loading, setLoading] = useState(!isImageLoaded(currentImageUrl));

  // This modal is a single persistent instance whose `project` prop swaps
  // out (Prev/Next Project, or opening a different card) rather than
  // remounting — without this, the gallery would stay stuck on whatever
  // image index the previous project was showing.
  useEffect(() => {
    setCurrentImageIndex(0);
    setTransitioning(false);
    setLoading(!isImageLoaded(project.images?.[0]));
  }, [project]);

  const handleImageChange = (newIndex) => {
    if (newIndex === currentImageIndex) return;
    setTransitioning(true);
    setLoading(!isImageLoaded(project.images[newIndex]));
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setTransitioning(false);
    }, 500);
  };

  const nextImage = () => {
    if (currentImageIndex < project.images.length - 1) {
      handleImageChange(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      handleImageChange(currentImageIndex - 1);
    }
  };

  const handleImageLoad = () => {
    markImageLoaded(currentImageUrl);
    setLoading(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onRequestClose();
      }}
    >
      <DialogContent
        className="max-h-[90vh] overflow-y-auto p-4 sm:p-6 text-base w-full max-w-[calc(100%-2rem)] sm:max-w-2xl lg:max-w-3xl"
        style={{ "--modal-accent": color }}
      >
        <ModalContent>
          <h2 className="about-title-text-style text-xl sm:text-2xl pr-8">
            {project.projectName}
          </h2>

          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 mb-2">
              {project.technologies.map((tech, techIndex) => {
                const meta = TECH_ICON_META[tech];
                return meta ? (
                  <IconCube
                    key={techIndex}
                    icon={meta.icon}
                    color={meta.color}
                    size={28}
                    label={tech}
                  />
                ) : (
                  <span key={techIndex} className="tech-fallback">
                    {tech}
                  </span>
                );
              })}
            </div>
          )}

          {project.images && project.images.length > 0 && (
            <>
              <ImageFrame style={{ "--frame-accent": color }}>
                <ImageSlider>
                  <ChevronLeft
                    className="w-6 h-6 sm:w-8 sm:h-8 shrink-0"
                    onClick={prevImage}
                    style={{
                      cursor: currentImageIndex === 0 ? "not-allowed" : "pointer",
                      opacity: currentImageIndex === 0 ? 0.5 : 1,
                    }}
                  />
                  {loading && <Loader />}
                  <img
                    src={currentImageUrl}
                    alt={project.projectName}
                    onLoad={handleImageLoad}
                    className={`${transitioning ? "fade-out" : "fade-in"} rounded-lg`}
                    style={{ display: loading ? "none" : "block" }}
                  />
                  <ChevronRight
                    className="w-6 h-6 sm:w-8 sm:h-8 shrink-0"
                    onClick={nextImage}
                    style={{
                      cursor:
                        currentImageIndex === project.images.length - 1
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        currentImageIndex === project.images.length - 1 ? 0.5 : 1,
                    }}
                  />
                </ImageSlider>
              </ImageFrame>

              {project.images.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-3">
                  {project.images.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      type="button"
                      aria-label={`Show image ${dotIndex + 1}`}
                      onClick={() => handleImageChange(dotIndex)}
                      className="rounded-full transition-all duration-200"
                      style={{
                        width: dotIndex === currentImageIndex ? 20 : 8,
                        height: 8,
                        backgroundColor:
                          dotIndex === currentImageIndex ? color : "var(--border)",
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          <p className="text-sm sm:text-base mt-4">{project.projectDescription}</p>

          {(project.githubLink || project.liveLink) && (
            <div className="flex items-center justify-center gap-5 mt-4">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <IconCube icon={FaGithub} color="#181717" size={30} label="View on GitHub" />
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <IconCube
                    icon={ExternalLink}
                    color={color}
                    size={26}
                    label="View live site"
                  />
                </a>
              )}
            </div>
          )}

          <ButtonContainer>
            <Button
              type="button"
              variant="game"
              size="game"
              className="text-sm"
              color={color}
              onClick={prevProject}
              disabled={isPrevDisabled}
            >
              Previous Project
            </Button>
            <Button
              type="button"
              variant="game"
              size="game"
              className="text-sm"
              color={color}
              onClick={nextProject}
              disabled={isNextDisabled}
            >
              Next Project
            </Button>
          </ButtonContainer>
        </ModalContent>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;

const ModalContent = styled.div`
  position: relative;
  text-align: center;
  color: var(--foreground);
`;

const ImageFrame = styled.div`
  margin-top: 16px;
  padding: 8px;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--frame-accent) 35%, var(--border));
  background: color-mix(in srgb, var(--frame-accent) 6%, transparent);
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.35);
`;

const ImageSlider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: cover;
    width: 80%;
    max-height: 50vh;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
    transition: opacity 0.5s ease-in-out;
    opacity: 1;
    &.fade-out {
      opacity: 0;
    }
    &.fade-in {
      opacity: 1;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: var(--foreground);
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }

  svg:first-of-type {
    left: 4px;
  }

  svg:last-of-type {
    right: 4px;
  }

  @media (min-width: 640px) {
    svg:first-of-type {
      left: 20px;
    }

    svg:last-of-type {
      right: 20px;
    }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

// Loader animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 4px solid var(--border-soft);
  border-radius: 50%;
  border-top: 4px solid var(--foreground);
  width: 80px;
  height: 80px;
  animation: ${spin} 1s linear infinite;
`;
