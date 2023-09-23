/* eslint-disable react/prop-types */
import styled from "styled-components"
import { defaultColor } from "../constants"



const Bar = ({color}) => {
  return (
    <Container color={color}>

    </Container>
  )
}
const Container = styled.div`
width:200px;
height:200px;
background-color: ${({color}) => (color ? color : defaultColor)};
transition: transform 0.3s ease; 

&:hover {
    
    
    transform: scale(1.1);
}

`
export default Bar
