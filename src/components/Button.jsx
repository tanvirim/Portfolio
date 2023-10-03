/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styled from 'styled-components';
import { FaDownload } from 'react-icons/fa';
import { BiLogoUpwork } from 'react-icons/bi';
import { defaultColor } from '../constants';
const ButtonsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ResumeButton = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 10px 20px;
  background-color: ${({ color }) => (color ? color : defaultColor)};

  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.4s ease;

  &:hover {
    background-color: #0056b3;
  }

  svg {
    margin-right: 5px;
  }
`;

const HireMeButton = styled.a`
  display: flex;
  gap: 5px;
  text-decoration: none;
  padding: 10px 10px;
  background-color: ${({ color }) => (color ? color : defaultColor)};
  align-items: center;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1d9d48;
  }
`;

const ResumeAndHireButtons = ({ color = defaultColor }) => {
  const handleDownload = () => {};
  return (
    <ButtonsContainer color={color}>
      <HireMeButton color={color} href='https://www.upwork.com/tanvirmitul'>
        <BiLogoUpwork /> Hire Me
      </HireMeButton>
      <ResumeButton
        onClick={handleDownload}
        color={color}
        download='Tanvir Mitul-Resume'
        target='_blank'
        href='https://www.mediafire.com/file/gscglhvfmhfzpbx/Tanvir_Mitul_Resume_.pdf/file'
      >
        <FaDownload /> Resume
      </ResumeButton>
    </ButtonsContainer>
  );
};

export default ResumeAndHireButtons;
