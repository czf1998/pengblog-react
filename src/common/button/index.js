import styled from 'styled-components'

export const Button = styled.button`
        ${props => props.width ? 'width:' + props.width + ';' : ''}
        font-size: ${props => props.fontSize ? props.fontSize : '1rem'};
        display: inline-block;
        margin: ${props => props.margin ? props.margin : "0"};
        border: 1px solid ${props => props.disabled ? '#CCCCCC' : (props.borderColor ? props.borderColor : "gray")};
        outline: none;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        padding: ${props => window.innerWidth < 750 ? '0.8rem' : '0.4rem'} 0.6rem;
        background-color: ${props => props.backgroundColor ? props.backgroundColor : "white"};
        filter:brightness(1);
        color: ${props => props.disabled ? '#CCCCCC' : (props.color ? props.color : "black")};
        border-radius: .25rem;
        position: relative;
        transition: all 0.2s ease;
        cursor: ${props => props.disabled ? 'default' : 'pointer'};
        ${props => props.disabled ? '' : `
             &:hover {
             filter:brightness(0.9);
            }
        `};
       
    `