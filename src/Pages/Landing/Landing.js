import React from 'react';
import styled from 'styled-components';
import Rule from "../../Components/Rule";
import background from "./background.png";
import headshot from "./headshot.jpg";
import Skills from './Skills';
import Projects from './Projects/Projects';
import Links from '../../Components/Links';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const Splash = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  margin: 0px;

  & h1 {
    margin: 0;
    margin-left: 5%;
    padding-top: 10%;
    text-align: left;
    font-size: 2em;
  }

  & h3 {
    margin: 0%;
    margin-left: 5%;
  }

  > * {
    margin-left: 5%;
  }
`

const AboutMe = styled.div`
  display: flex;
  margin-top: 5%;
  margin-left: 2%;
  margin-right: 2%;

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

const LinkGroup = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 10%;
`

const Link = styled.a`
    width: 30px;
    font-size: 1.5em;
    color: #333;
    &:link {
        color: white;
    }

`

const Landing = (props) => {
  return (
    <Splash>
      <br></br> {/* to avoid margin collapse */}
      <AboutMe>
        <img src={headshot}/>
        <div>
          <h1>Hey, I'm Ryan. <br/> I write code.</h1>
          <Rule width="100%"/>
          <h3>
            I work as a Software Engineer and Scrum Master at Optum.
            In my free time, I'm learning data science by competing in kaggle competitions, use my 3D printer, and build PCs.
            I like to listen to NPR podcasts like Planet Money, Throughline, and How I Built This. I've got two adorable dogs who are the stars of all my video calls.
            I strive for constant growth and adaptation.
          </h3>
        </div>
      </AboutMe>
      <h1>My Skills</h1>
      <Rule/>
      <Skills/>
      <Projects/>
      <h1>Contact Me</h1>
      <Rule/>
      <p style={{margin: "0px 10%"}}>Thanks for scrolling so far! Use the links below to send me an email, view my linkedin, or my github page.</p>
      <LinkGroup>
        <Link href="mailto:ryanmahan97@gmail.com"><FaEnvelope/></Link>
        <Link href="https://linkedin.com/in/ryan-mahan"><FaLinkedin/></Link>
        <Link href="https://github.com/ryanmahan"><FaGithub/></Link>
      </LinkGroup>
    </Splash>
  )
}

export default Landing;