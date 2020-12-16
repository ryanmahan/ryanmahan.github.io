import React from 'react';
import styled from 'styled-components';
import Rule from "../../Components/Rule";
import background from "./background.png";

const Splash = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;

  & h1 {
    margin: 0;
    padding-top: 15%;
    margin-left: 5%;
    text-align: left;
    font-size: 2em;
  }

  & h3 {
    margin: 0% 5%;
  }

`

const Skills = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-row-gap: 2em;
  grid-column-gap: 5%;
  margin: 5vh 5%;

  @media(max-width: 768px) {
    display: flex;
    flex-direction: column;

    & span {
      margin: 10px 0px 10px 25px;
    }
  };

  & h3 {
    margin-right: 5%;
    text-align: left;
    display: block;
    white-space: nowrap;
    height: 100%;
    font-weight: bold;
  }

  & span {
    text-align: left;
  }
`

const StyledRule = styled(Rule)`
  width: 75%;
  margin: 0% 5%;
`

const Projects = styled.div`

`

const Landing = (props) => {

  return (
    <React.Fragment>
      <Splash>
        <h1>Hey, I'm Ryan. <br/> I write code.</h1>
        <StyledRule/>
        <h3>
          I work as a Software Engineer and Scrum Master at Optum.
          In my free time, I'm learning data science by competing in kaggle competitions, use my 3D printer, and build PCs.
          I like to listen to NPR podcasts like Planet Money, Throughline, How I Built This. I also listen to The Daily by The New York Times.
          Understanding, positivity, and constant growth are my tenants.
        </h3>
        <h1>My Skills</h1>
        <StyledRule/>
        <Skills>
          <h3>I'm best at</h3><span>Web development using <b>React</b>, <b>Spring</b>, <b>Express</b>, scripting with <b>Python</b>, and organizing <b>agile</b> scrum teams. </span>
          <h3>I'm good at</h3><span><b>Predicitive analytics</b> using <b>Keras</b>, <b>tensorflow</b>, and <b>scikit-learn</b>, and technologies like <b>Webpack</b>.</span>
          <h3>I'm interested in </h3><span><b>Web design</b>, <b>SOLID</b> principles, and <b>big data</b> enterprise architecture.</span>
        </Skills>
        <Projects>

        </Projects>
      </Splash>
    </React.Fragment>
  )
}

export default Landing;