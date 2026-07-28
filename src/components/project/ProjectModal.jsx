/* eslint-disable react/prop-types */
import { Dialog, DialogContent } from "../ui/dialog";
import styled, { keyframes } from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { defaultColor } from "../../constants";

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
  const [loading, setLoading] = useState(true); // State to track image loading

  const handleImageChange = (newIndex) => {
    setTransitioning(true);
    setLoading(true); // Set loading to true when changing image
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
    setLoading(false); // Set loading to false when image is loaded
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onRequestClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] overflow-y-auto p-3 sm:p-5 bg-white dark:bg-gray-900 border-none text-base w-full max-w-[calc(100%-2rem)] sm:max-w-2xl lg:max-w-3xl rounded-[10px]"
      >
        <button
          className="absolute top-2 right-3 sm:top-0 sm:right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white text-4xl sm:text-6xl leading-none"
          onClick={onRequestClose}
        >
          &times;
        </button>

        <ModalContent>
          <h2 className="about-title-text-style mt-2 text-xl sm:text-2xl">{project.projectName}</h2>
          {project.images && project.images.length > 0 && (
            <ImageSlider>
              <ChevronLeft
                className="w-6 h-6 sm:w-8 sm:h-8 shrink-0"
                onClick={prevImage}
                style={{
                  cursor: currentImageIndex === 0 ? "not-allowed" : "pointer",
                  opacity: currentImageIndex === 0 ? 0.5 : 1,
                }}
              />
              {loading && <Loader />} {/* Show loader when loading is true */}
              <img
                src={project.images[currentImageIndex]}
                alt={project.projectName}
                onLoad={handleImageLoad} // Trigger when image has loaded
                className={`${transitioning ? "fade-out" : "fade-in"} rounded-lg`}
                style={{ display: loading ? "none" : "block" }} // Hide image until loaded
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
          )}
          <p className="text-sm sm:text-base">{project.projectDescription}</p>
          <ButtonContainer>
            <NavButton
              className="game-btn"
              color={color}
              onClick={prevProject}
              disabled={isPrevDisabled}
            >
              Previous Project
            </NavButton>
            <NavButton
              className="game-btn"
              color={color}
              onClick={nextProject}
              disabled={isNextDisabled}
            >
              Next Project
            </NavButton>
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
  max-width: 90%;
  margin: auto;
  color: var(--foreground);
  height: 100%;

  img {
    object-fit: cover;
    width: 80%;
    height: 80%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const ImageSlider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  img {
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

const NavButton = styled.button`
  padding: 10px 16px;
  background-color: ${({ disabled, color }) => (disabled ? "#6b7280" : color)};
  color: white;
  font-weight: bold;
  border-radius: 999px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 14px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  @media (min-width: 640px) {
    padding: 12px 24px;
    font-size: 16px;
  }
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
