/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import brandImage from '../assets/brand.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { defaultColor } from '../constants';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const Navbar = ({ color = defaultColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo>
          {/* Use the scroll function to scroll to the top */}
          <a
            href='/'
            onClick={(e) => {
              e.preventDefault();
              scroll.scrollToTop();
            }}
          >
            <img width={50} src={brandImage} alt='Brand Logo' />
          </a>
        </Logo>
        <MobileButton onClick={toggleMenu}>
          {isOpen ? (
            <AiOutlineClose size='30px' color={color} />
          ) : (
            <GiHamburgerMenu size='30px' color={color} />
          )}
        </MobileButton>
        <Menu color={color} {...(isOpen && { isopen: true })}>
          <MenuItem color={color}>
            <ScrollLink to='projects'>PROJECTS</ScrollLink>
          </MenuItem>
          <MenuItem color={color}>
            <ScrollLink to='about'>ABOUT</ScrollLink>
          </MenuItem>
          <MenuItem color={color}>
            <ScrollLink to='contact'>CONTACT</ScrollLink>
          </MenuItem>
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
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 60px;
    right: ${({ isopen }) => (isopen ? '0' : '-100%')};
    width: 30%;
    transition: right 0.3s ease-in-out;
  }
`;

const MenuItem = styled.li`
  font-size: 20px;
  color: ${({ color }) => (color ? color : defaultColor)};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    color: white;
    background-color: ${({ color }) => (color ? color : defaultColor)};
    padding-top: 8px;
    text-align: center;
    height: 40px;
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
