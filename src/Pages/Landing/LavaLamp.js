import React from 'react';
import styled, { keyframes } from 'styled-components';

const floatUp = keyframes`
  0% {
    transform: translate(0%);
  }
  100% {
    transform: translateY(-100vh);
  }
`

const blobs = keyframes`
  0%, 100% {
    border-radius: 45% 47% 43% 48%;
  },
  25% {
    border-radius: 43% 42% 48% 43%;
  }
  50% {
    border-radius: 49% 48% 45% 47%;
  }
`

const sway = keyframes`
  0%, 100% {
    transform: translateX(2vh);
  }
  50% {
    transform: translateX(-2vw)
`

const Blob = styled.div`
  position: absolute;
  background: rebeccapurple;
  bottom: 0;
  right: ${props => `${props.right}vw`};
  border-radius: 44%;
  width: 100px;
  height: 100px;
  animation: ${props => props.speed*5}s ${floatUp} ease-in-out infinite,
    ${props => props.speed}s ${blobs} linear infinite;
`

const Lamp = styled.div`
  filter: url('#goo');
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 100vh;
`

const SwayX = styled.div`
  animation: 10s ${sway} ease-in-out infinite;
  position: absolute;
  bottom: 0px;
`

const Top = styled.div`
  filter: url("goo");
  position: absolute;
  width: 100vw;
  height: 1vh;
  z-index: 1;
  background: rebeccapurple;
`

const getRandomInt = () => {
  return Math.floor(Math.random() * Math.floor(100)) - 50;
}

const getRandomFloat = (max) => {
  return Math.random() * Math.floor(3);
}

const blobMaker = () => (
  <SwayX><Blob right={getRandomInt()} speed={getRandomFloat()}/></SwayX> 
)

export default (props) => {

  const blobs = [];
  
  console.log(blobs)

  return (
    <>
      <Lamp>
        <Top/>
        {blobMaker()}
      </Lamp>
      
      <svg xmlns="http://yhjwww.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </>
  );
}