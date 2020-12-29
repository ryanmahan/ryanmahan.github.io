import React from 'react';
import styled from 'styled-components';
import Landing from "./Pages/Landing"

const Footer = styled.footer`
  background: #f0f2f5;
  color: #333;
`

function App() {
  return (
    <div className="App">
      <Landing/>
    </div>
  );
}

export default App;
