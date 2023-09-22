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

`
export default Bar
