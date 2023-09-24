/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styled from 'styled-components';
import ContactForm from './ContactForm';
import { defaultColor } from '../constants';

const FooterContainer = styled.footer`
 border-left: 5px dotted ${({ color }) => (color ? color : defaultColor)};
  
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:10px;
 
  background-color: transparent;
  text-align: center;
  padding: 20px 0;
`;

const CopyrightText = styled.p`
  font-size: 14px;
`;

const GameLink = styled.a`
margin-bottom:20px;
  color: #007bff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  display: inline-block;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }
`;

const Footer = ({color=defaultColor}) => {
  return (<>
  <FooterTitle>Contact</FooterTitle>
    <FooterContainer>
     <ContactForm/>
      <CopyrightText>&copy; Tanvir Mitul {new Date().getFullYear()}</CopyrightText>
      <GameLink href="https://tanvirim.github.io/simon-game" target="_blank" rel="noopener noreferrer">
        Play Simon Game
      </GameLink>
    </FooterContainer>
  </>
  );
};
const FooterTitle = styled.h2`
 margin-top:40px;
text-transform:uppercase;
  border-bottom: 3px solid ${defaultColor};
  padding-bottom: 10px;
  width: 300px;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;

`
export default Footer;
