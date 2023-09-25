/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { AiOutlineDoubleRight } from 'react-icons/ai'; // Import the icon

const StyledButton = styled.button`
  min-width: 300px;
  min-height: 60px;
  font-family: 'Nunito', sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  font-weight: 700;
  color: #313133;
  background: #4FD1C5;
  background: linear-gradient(90deg, rgba(129, 230, 217, 1) 0%, rgba(79, 209, 197, 1) 100%);
  border: none;
  border-radius: 1000px;
  box-shadow: 12px 12px 24px rgba(79, 209, 197, 0.64);
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 10px;
  overflow: hidden;
  display: flex; /* To align text and icon horizontally */
  align-items: center; /* To vertically center text and icon */
  justify-content: center; /* To horizontally center text and icon */
`

const ButtonText = styled.span`
  z-index: 1;
`;

const ButtonIcon = styled.span`
  margin-left: 8px; /* Adjust the spacing as needed */
`;

const ButtonRing = styled.div`
  content: '';
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 6px solid #00FFCB;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${(props) => (props.showRing ? 'ring 1.5s infinite' : 'none')};
`;

const Button = ({ name }) => {
  return (
    <StyledButton>
      <ButtonText>{name}</ButtonText>
      <ButtonIcon>
        <AiOutlineDoubleRight />
      </ButtonIcon>
      <ButtonRing showRing />
    </StyledButton>
  );
};

export default Button;
