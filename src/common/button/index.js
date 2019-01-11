import styled from 'styled-components'

export const Button = styled.button`
        display: inline-block;
        margin: ${props => props.margin ? props.margin : "0"};
        border: 1px solid ${props => props.borderColor ? props.borderColor : "gray"};
        outline: none;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        padding: 6px 12px;
        background-color: ${props => props.backgroundColor ? props.backgroundColor : "white"};
        filter:brightness(1);
        color: ${props => props.color ? props.color : "black"};
        border-radius: .25rem;
        position: relative;
        transition: all 0.2s ease;
        cursor: pointer;
        &:hover {
         filter:brightness(0.9);
        }
    `