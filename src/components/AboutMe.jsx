/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components"
import { defaultColor } from "../constants"


const AboutMe = ({color=defaultColor}) => {
  return (
    <Container color={color}>
      <h1>About Me</h1>
      <p>
      I'm Tanvir Imam Mitul, an Intern Web Developer at <span>Qubitech Solutions</span>. My primary expertise is in <span>React</span>, I also have practical experience with <span>Node.js , MongoDB </span> with some hands-on knowledge of <span>C , Python, SQL and PHP</span>. I've successfully completed various complex projects during my web development career. I have a strong passion for continuously expanding my knowledge, staying updated with emerging web technologies, and embracing new learning opportunities in the field.
      </p>
    </Container>
  )
}
const Container = styled.div`
padding:10px;
border-left: 5px dotted ${({color}) => (color ? color : defaultColor)};

h1{
    font-size:25px ;
    font-weight:bold;
    text-align:center;

}
p{
    
    line-height:25px ;
    text-align:justify;
    padding:10px;
}
span{
    color:${({color}) => (color ? color : defaultColor)};
    font-weight:bold;
}

  
`
export default AboutMe
