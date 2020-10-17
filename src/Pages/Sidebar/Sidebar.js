import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHiking, faAddressCard, faCode } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Container = styled.div`
  position: fixed;
  background: #dedede;
  width: 5vw;
  height: 100vh;
  min-width: 60px;
  max-width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const InactiveIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 1.5em;
`

const ActiveIcon = styled(FontAwesomeIcon)`
  color: #9c47fc;
  font-size: 1.75em;
`

export default (props) => {

  

  return (
    <Container>
      <svg width="0" height="0">
        <linearGradient id="lgrad" x1="100%" y1="100%" x2="0%" y2="0%" >
          <stop offset="0%" style={{stopColor: "red"}}/>
          <stop offset="100%" style={{stopColor: "blue"}} />
        </linearGradient>
      </svg>
      <InactiveIcon icon={faUser}/>
      <ActiveIcon icon={faHiking}/>
      <InactiveIcon icon={faCode}/>
      <InactiveIcon icon={faGithub}/>
      <InactiveIcon icon={faAddressCard}/>
    </Container>
  )
}