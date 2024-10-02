/* eslint-disable react/prop-types */

import styled from "styled-components";
import { ChromePicker } from "react-color";
import { useState } from "react";
import { MdFormatColorFill } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { defaultColor } from "../constants";

const ColorPicker = ({ colorStateForHome }) => {
  const [color, setColor] = useState(defaultColor);
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (color) => {
    setColor(color.hex);
    colorStateForHome(color.hex);
  };

  return (
    <>
      <Container color={color}>
        <div className="icon-container">
          {!showPicker ? (
            <MdFormatColorFill
              size="30px"
              onClick={() => setShowPicker(!showPicker)}
            />
          ) : (
            <AiOutlineClose
              size="25px"
              onClick={() => setShowPicker(!showPicker)}
            />
          )}
        </div>

        <div className={`hidden-component ${showPicker ? "visible" : ""}`}>
          {showPicker && <ChromePicker color={color} onChange={handleChange} />}
        </div>
      </Container>
    </>
  );
};

export default ColorPicker;

const Container = styled.div`
  width: 90px;
  background-color: ${({ color }) => (color ? color : defaultColor)};
  border-radius: 5px;
  z-index: 99;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0;

  .hidden-component {
    display: none;
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);

    padding: 10px;
    box-shadow: 0 2px 4px rgba(46, 42, 42, 0.8);
  }

  .visible {
    display: block;
    z-index: 999;
  }
  .icon-container {
    transition: all 0.3s ease-in-out;
  }
  .icon-container:hover {
    transform: scale(1.3);
    cursor: pointer;
  }
`;
