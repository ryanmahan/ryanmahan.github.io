import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
    0% {
        height: 0%;
    }
    100% {
        height: fit-content;
    }
`

const LinkDropdown = styled.div`
    border-radius: 0px 0px 10px 10px;
    border: 1px solid #333;
    border-top: 0;
    background: inherit;
    color: #333;
    overflow: hidden;
    position: absolute;
    top: 100%;
    right: 0px;
    visibility: hidden;
    width: 100%;
    max-height: 0%;

    a {
        height: 40px;
    }
    transition: max-height .5s linear;
`

const LinkButton = styled.button`
    border-radius: 5px;
    color: #333;
    background: transparent;
    border: 1px solid #333;
    position: relative;
    padding: 5px 20px;

    &:hover {
        border-radius: 5px 5px 0px 0px;
        ${LinkDropdown} {
            max-height: 500px;
            visibility: visible;
        }
        border-bottom: 0;
    }

    &:active, &:focus {
        outline: none;
        border-radius: 5px 5px 0px 0px;
    }
`

const LinkButtonText = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

// export default ({ links }) => {
//     return (
//         <LinkButton>
//             <LinkButtonText>Links <FaCaretDown/></LinkButtonText>
//             <LinkDropdown>
//                 {links.map(link => (
//                     <p><a target="_blank" href={link.url}>{link.icon} {link.title}</a></p>
//                 ))}
//             </LinkDropdown>
//         </LinkButton>
//     )
// }

const LinkGroup = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 5%;
`

const Link = styled.a`
    width: 30px;
    font-size: 1.5em;
    color: #333;
    &:link {
        color: white;
    }
`

export default ({ links }) => (
    <LinkGroup>
        {links.map(link => 
            <Link href={link.url} target="_blank">{link.icon}</Link>
        )}
    </LinkGroup>
)