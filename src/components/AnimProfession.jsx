import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const rotateUp = keyframes`
  0% {
    transform: rotate(0deg) translateY(100%);
    opacity: 0;
  }
  50% {
    transform: rotate(360deg) translateY(0);
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) translateY(0);
    opacity: 1;
  }
`;

const TextContainer = styled.div`
  font-weight: bold;
  color: black;
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 24px;
`;

const WebText = styled.p`
  letter-spacing: 5px;
  margin-right: 10px;
`;

const DeveloperText = styled.p`
  letter-spacing: 5px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  span {
    display: inline-block;
    opacity: 0;
    animation: ${rotateUp} 0.8s forwards;
  }
`;

const AnimProfession = () => {
  const initialText = "&@$^*";
  const finalText = "Developer";
  const [text, setText] = useState(initialText);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < finalText.length) {
        const newText =
          text.substring(0, currentIndex) +
          finalText[currentIndex] +
          text.substring(currentIndex + 1);
        setText(newText);
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text, finalText]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(initialText);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [text, initialText]);

  return (
    <TextContainer>
      <WebText>Software</WebText>
      <DeveloperText>
        {text.split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </DeveloperText>
    </TextContainer>
  );
};

export default AnimProfession;
