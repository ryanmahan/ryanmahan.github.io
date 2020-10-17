import React from 'react';
import styled from 'styled-components';
import { Card } from "../../Components/Card";
import LavaLamp from "./LavaLamp";

const Background = styled.div`
  background-color: #f0f2f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Landing = (props) => {

  return (
    <Background>
      <LavaLamp></LavaLamp>
      <div style={{ height: "80vh", width: "80%", margin: "auto"}}>
        <Card>
          <h1>Hey Im Ryan Mahan</h1>
          <p>This is some text about myself</p>
        </Card>
      </div>
      

    </Background>
  )
}

export default Landing;