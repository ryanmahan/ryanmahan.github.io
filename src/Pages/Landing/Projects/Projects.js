import React from 'react';
import redshift from 'pointless-redshift';
import styled from 'styled-components'
import { FaGithub, FaReact, FaNodeJs, FaNpm } from 'react-icons/fa';
import { DiMongodb } from 'react-icons/di';
import { IoLogoJavascript } from 'react-icons/io'
import StyledRule from '../../../Components/Rule'
import ProjectLinks from './ProjectLinks';


const enableRedshift = () => redshift(.8);

const IconRow = styled.h3`
  white-space: nowrap;
  * {
    margin: 0px 3%;
  }
`

const Project = styled.div`
  width: 90%;
  margin: 25px auto;

  h2 {
    margin: 0px;
    margin-left: 3%;
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
            icon: FaGithub,
            title: "React Github",
            url: "https://github.com/ryanmahan/ballotdropma",
        }, {
            icon: FaGithub,
            title: "API Github",
            url: "https://github.com/ryanmahan/ballotdropma-api",
        }]
    }, {
        name: "Pointless Redshift",
        tech: [<IoLogoJavascript/>],
        description: "A pointless NPM package that redshifts/blueshifts a webpage based on the user's scroll speed. I built this in an afternoon because I was curious about the NPM package publishing process.",
        links: [{
            icon: FaGithub,
            title: "Github",
            url: "https://github.com/ryanmahan/pointless-redshift",
        }, {
            icon: FaNpm,
            title: "NPM",
            url: "https://www.npmjs.com/package/pointless-redshift"
        }],
        actions: [<button onClick={enableRedshift}>Enable Redshift</button>]
    }
]

export default () => (
  <React.Fragment>
    <h1>My Projects</h1>
    <div>
      { projects.map((project, index) => (
        <Project>
          <ProjectHeader>
            <h2>{project.name}</h2>
            <IconRow>{project.tech}</IconRow>
          </ProjectHeader>
          <StyledRule/>
          <p>{project.description}</p>
          <p>{project.actions}</p>
          <ProjectLinks links={project.links}/>
        </Project>
        

      ))}
    </div>
  </React.Fragment>
    
);