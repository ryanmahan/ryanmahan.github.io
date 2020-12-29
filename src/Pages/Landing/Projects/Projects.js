import React from 'react';
import redshift from 'pointless-redshift';
import styled from 'styled-components'
import { FaGithub, FaReact, FaNodeJs, FaNpm, FaVuejs, FaJs, FaHtml5, FaCss3, FaPython } from 'react-icons/fa';
import { DiMongodb } from 'react-icons/di';
import { SiKeras, SiTensorflow } from 'react-icons/si'
import { IoLogoJavascript } from 'react-icons/io'
import Rule from '../../../Components/Rule'
import ProjectLinks from '../../../Components/Links';


const enableRedshift = () => redshift(.8);

const IconRow = styled.h3`
  white-space: nowrap;
  * {
    margin: 0px 3%;
  }
`

const Project = styled.div`
  width: 90%;
  margin-top: 25px;

  &::not(:last-child) {
    margin-bottom: 25px;
  }

  h2 {
    margin: 0px;
  }
  p {
    margin: 1% 5%;
  }
` 

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const projects = [{
        name: "BallotDropMA",
        tech: [<FaReact/>, <FaNodeJs/>, <DiMongodb/>],
        description: "A website built to help MA residents find their closest ballot drop box. I scraped the Secretary of State's website to get the data, then hosted it in a MongoDB Atlas instance. The backend is something I'm particularly proud of, generic controllers and services work by dependency injection of the Mongoose Model. The API and Webapp were hosted on Azure from September to December 2020.",
        links: [{
            icon: <FaGithub/>,
            title: "Frontend",
            url: "https://github.com/ryanmahan/ballotdropma",
        }, {
            icon: <FaGithub/>,
            title: "API",
            url: "https://github.com/ryanmahan/ballotdropma-api",
        }]
    }, {
      name: "WTFUMass",
      tech: [<FaVuejs/>, <FaNodeJs/>, <DiMongodb/>],
      description: "A 311-like site that students at UMass Amherst could suggest and vote on priorities for the student goverment to work on.",
      links: [{
          icon: <FaGithub/>,
          title: "Source",
          url: "https://github.com/ryanmahan/wtfumass",
      }],
    }, {
      name: "ARG!",
      tech: [<FaJs/>, <FaHtml5/>, <FaCss3/>],
      description: "A game created for researchers to measure impulsive aggression. Researchers can program the games computer to play in certain ways, and force the user to lose or win.",
      links: [{
          icon: <FaGithub/>,
          title: "Source",
          url: "https://github.com/ryanmahan/arg-psych",
      }],
    }, {
      name: "Kaggle",
      tech: [<FaPython/>, <SiKeras/>, <SiTensorflow/>],
      description: "A repository containing my attempts on Kaggle.com. I use these as a way to build and practice machine learning skills.",
      links: [{
          icon: <FaGithub/>,
          title: "Source",
          url: "https://github.com/ryanmahan/wtfumass",
      }],
    }, {
        name: "Pointless Redshift",
        tech: [<IoLogoJavascript/>],
        description: "A pointless NPM package that redshifts/blueshifts a webpage based on the user's scroll speed. I built this in an afternoon because I was curious about the NPM package publishing process.",
        links: [{
            icon: <FaGithub/>,
            title: "Source",
            url: "https://github.com/ryanmahan/pointless-redshift",
        }, {
            icon: <FaNpm/>,
            title: "NPM Page",
            url: "https://www.npmjs.com/package/pointless-redshift"
        }],
        actions: [<button onClick={enableRedshift}>Enable Redshift</button>]
    }
]

export default () => (
  <React.Fragment>
    <h1>My Projects</h1>
    <Rule/>
    <div>
      { projects.map((project, index) => (
        <Project>
          <ProjectHeader>
            <h2>{project.name}</h2>
            <IconRow>{project.tech}</IconRow>
          </ProjectHeader>
          <Rule width="100%"/>
          <p>{project.description}</p>
          <p>{project.actions}</p>
          <ProjectLinks links={project.links}/>
        </Project>
        

      ))}
    </div>
  </React.Fragment>
    
);