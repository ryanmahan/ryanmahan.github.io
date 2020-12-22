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
    background: white;
    color: #333;
    overflow: hidden;
    position: absolute;
    top: 100%;
    left: 0;
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
    background: white;
    border: none;
    position: relative;
    padding: 5px 20px;

    &:hover {
        border-radius: 5px 5px 0px 0px;
        ${LinkDropdown} {
            max-height: 500px;
            visibility: visible;
        }
    }

    &:active, &:focus {
        border: none;
        outline: none;
        border-radius: 5px 5px 0px 0px;
    }
`

const LinkButtonText = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export default ({ links }) => {
    return (
        <LinkButton>
            <LinkButtonText>Links <FaCaretDown/></LinkButtonText>
            <LinkDropdown>
                {links.map(link => (
                    <a target="_blank" href={link.url}>{link.icon} {link.title}</a>
                ))}
            </LinkDropdown>
        </LinkButton>
    )
}