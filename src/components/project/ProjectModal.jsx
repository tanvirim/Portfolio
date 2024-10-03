/* eslint-disable react/prop-types */
import Modal from "react-modal"; // Make sure to install react-modal
import styled, { createGlobalStyle } from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

// Global styles for responsiveness
const GlobalStyle = createGlobalStyle`
  @media (max-width: 600px) {
    .modal {
      padding: 10px; /* Less padding on mobile */
    }
    h2 {
      font-size: 1.2rem; /* Responsive font size */
    }
    img {
      max-height: 300px; /* Limit image height on mobile */
    }
  }
`;

const ProjectModal = ({
  isOpen,
  onRequestClose,
  project,
  nextProject,
  prevProject,
  isNextDisabled,
  isPrevDisabled,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const handleImageChange = (newIndex) => {
    setTransitioning(true);
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

  return (
    <>
      <GlobalStyle />
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
        style={{
          overlay: { zIndex: 998, backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            zIndex: 999,
            maxHeight: "100vh",
            overflowY: "auto",
            padding: "10px",
            margin: "0 auto",
            backgroundColor: "rgb(17, 24, 39)",

            border: "none",
            width: "90%",
            borderRadius: "10px",
          },
        }}
      >
        <button
          className="absolute top-0 right-4 text-gray-400 hover:text-white text-6xl"
          onClick={onRequestClose}
        >
          &times;
        </button>

        <ModalContent>
          <h2 className="about-title-text-style mt-2">{project.projectName}</h2>
          <ImageSlider>
            <FaChevronLeft
              onClick={prevImage}
              style={{
                cursor: currentImageIndex === 0 ? "not-allowed" : "pointer",
                opacity: currentImageIndex === 0 ? 0.5 : 1,
                fontSize: "30px",
              }}
            />
            <img
              src={project.images[currentImageIndex]}
              alt={project.projectName}
              className={`${transitioning ? "fade-out" : "fade-in"} rounded-lg`}
            />
            <FaChevronRight
              onClick={nextImage}
              style={{
                cursor:
                  currentImageIndex === project.images.length - 1
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  currentImageIndex === project.images.length - 1 ? 0.5 : 1,
                fontSize: "30px",
              }}
            />
          </ImageSlider>
          <p>{project.projectDescription}</p>
          <ButtonContainer>
            <NavButton onClick={prevProject} disabled={isPrevDisabled}>
              Previous Project
            </NavButton>
            <NavButton onClick={nextProject} disabled={isNextDisabled}>
              Next Project
            </NavButton>
          </ButtonContainer>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectModal;

const ModalContent = styled.div`
  position: relative;
  text-align: center;
  max-width: 90%;
  margin: auto;
  color: white;
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
    font-size: 24px;
    color: white;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }

  svg:first-of-type {
    left: 20px;
  }

  svg:last-of-type {
    right: 20px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const NavButton = styled.button`
  margin: 0 10px;
  padding: 12px 20px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;
  font-size: 16px;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#5c6bc0")};
  }
`;
