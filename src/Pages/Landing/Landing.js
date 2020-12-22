import React from 'react';
import styled from 'styled-components';
import Rule from "../../Components/Rule";
import background from "./background.png";
import headshot from "./headshot.jpg";
import Skills from './Skills';
import Projects from './Projects/Projects';

const Splash = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;

  & h1 {
    margin: 0;
    padding-top: 10%;
    margin-left: 5%;
    text-align: left;
    font-size: 2em;
  }

  & h3 {
    margin: 0% 5%;
  }

`
const StyledRule = styled(Rule)`
  width: 75%;
  margin: 0% 5%;
`
const AboutMe = styled.div`
  display: flex;
  margin: 5%;
  margin-top: 15%;
  
  img {
    width: 45vw;
    height: auto;
  }

  @media(max-width: 767px) {
    img {
      width: 20%;
      height: 20%;
      clip-path: circle(38%);
    }
  }

`

const Landing = (props) => {

  return (
    <React.Fragment>
      <Splash>
        <br></br> {/* to avoid margin collapse */}
        <AboutMe>
          <img src={headshot}/>
          <div>
            <h1>Hey, I'm Ryan. <br/> I write code.</h1>
            <StyledRule/>
            <h3>
              I work as a Software Engineer and Scrum Master at Optum.
              In my free time, I'm learning data science by competing in kaggle competitions, use my 3D printer, and build PCs.
              I like to listen to NPR podcasts like Planet Money, Throughline, and How I Built This. I've got two adorable dogs who are the stars of all my video calls.
              Understanding, positivity, and constant growth are my tenants.
            </h3>
          </div>
        </AboutMe>
        <h1>My Skills</h1>
        <StyledRule/>
        <Skills/>
        <Projects/>
      </Splash>
    </React.Fragment>
  )
}

export default Landing;