import React from "react";
import styled from 'styled-components';

const Skills = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-row-gap: 2em;
  grid-column-gap: 5%;
  margin: 2vh 5%;

  @media(max-width: 768px) {
    display: flex;
    flex-direction: column;
  };

  & h3 {
    margin-right: 5%;
    margin-left: 5%;
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

const bestAt = [
  <span>Web development using <b>React</b></span>,
  'Spring',
  'Express',
  'MongoDB', 
  'Python',
  <span>organizing <b>Agile</b> scrum teams</span>
]

const goodAt = [
  'Keras',
  'Tensorflow',
  'Sci-Kit learn',
  'Webpack',
  'git'
]

const interestedIn = [
  'Web design',
  'big data'
]

const SkillList = ({ list }) => list.map((item, index) => {
  let lineEnding = ", "
  if (list.length === index+2) lineEnding = ", and ";
  else if (list.length === index+1) lineEnding = "."
  if (typeof item === "string") {
    return <span><b>{item}</b>{lineEnding}</span>
  } else {
    return <span>{item}{lineEnding}</span>;
  }
});

export default () => (
  <Skills>
    <h3>I'm best at</h3><div><SkillList list={bestAt}/></div>
    <h3>I'm good at</h3><div><SkillList list={goodAt}/></div>
    <h3>I'm interested in </h3><div><SkillList list={interestedIn}/></div>
  </Skills>
);
