/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styled, { keyframes } from "styled-components";
import ContactForm from "./ContactForm";
import { defaultColor } from "../constants";

const Footer = ({ color = defaultColor }) => {
  return (
    <div className="custom-shadow-border mb-20 p-5">
      <div className="title-text-style">CONTACT</div>
      <FooterContainer color={color}>
        <ContactForm color={color} />
        <CopyrightText>
          &copy; Tanvir Mitul {new Date().getFullYear()}
        </CopyrightText>
        <GameLink
          href="https://tanvirim.github.io/simon-game"
          target="_blank"
          rel="noopener noreferrer"
        >
          Play Simon Game
        </GameLink>
      </FooterContainer>
    </div>
  );
};

export default Footer;
const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
  padding: 20px 0;
`;

const CopyrightText = styled.p`
  font-size: 14px;
`;

const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.35);
  }
  100% {
    transform: scale(1);
  }
`;

const GameLink = styled.a`
  margin-bottom: 20px;
  color: #007bff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  display: inline-block;
  transition: color 0.3s ease;
  animation: ${scaleAnimation} 2s alternate infinite ease-in-out;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #007bff;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease;
  }

  &:hover {
    color: #ff6b6b;
    &:before {
      visibility: visible;
      transform: scaleX(1);
    }
  }
`;
