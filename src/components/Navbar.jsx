/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/Navbar.js
import { useState } from "react";
import styled from "styled-components";
import brandImage from "../assets/brand.png";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = ({ color }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo href="/">
          <img width={50} src={brandImage} alt="Brand Logo" />
        </Logo>
        <MobileButton onClick={toggleMenu}>
          {isOpen ? (
            <CloseIcon boxSize={7} color={color} />
          ) : (
            <HamburgerIcon boxSize={7} color={color} />
          )}
        </MobileButton>
        <Menu isOpen={isOpen} color={color}>
          <MenuItem color={color}>PROJECTS</MenuItem>
          <MenuItem color={color}>ABOUT</MenuItem>
          <MenuItem color={color}>CONTACT</MenuItem>
        </Menu>
      </NavbarContent>
    </NavbarContainer>
  );
};
const NavbarContainer = styled.nav`

  background-color: transparent;
  
`;

const NavbarContent = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;

  img {
    background-color: transparent;
  }
`;

const Menu = styled.ul`
  background-color: transparent;
  z-index: 999;
  list-style: none;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 60px;
    right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};

    width: 40%;
    transition: right 0.3s ease-in-out;
  }
`;

const MenuItem = styled.li`
 
 color: ${({ color }) => (color ? color: "#03004b")};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
  @media (max-width: 768px) {
    color: ${({ color }) => (color ? color: "white")};
    background-color: #0a0937;
    padding-top:8px;
    text-align:center;
    height:40px;
    width: 100%;
    
  }
`;
const MobileButton = styled.button`
  background-color: transparent;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
export default Navbar;
