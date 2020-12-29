import styled from 'styled-components';

export default styled.hr`
    border: none;
    border-top: 2px double #333;
    height: 5px;
    overflow: visible;
    width: ${props => props.width || "75vw"};
`