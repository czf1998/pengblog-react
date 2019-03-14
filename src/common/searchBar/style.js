import styled from 'styled-components'

const backgroundColor = '#F7F7F7'

const maxMobileWidth = 750

export const SearchBarWrapper = styled.div`
        width: 100%;
        position: relative;
        padding: 1rem 2rem;
        background: ${props => props.backgroundColor ? props.backgroundColor : 'white'};
        @media(max-width: ${maxMobileWidth}px){
            padding: 1rem 1rem;
        }
    `

export const Input = styled.input`
        -webkit-appearance:none;
        color:${props => props.fontColor ? props.fontColor : 'black'};
        width: 100%;
        height: 100%;
        background: ${props => props.backgroundColor ? props.backgroundColor : '#F7F7F7'};
        font-size: 1rem;
        outline: none;
        border-radius: 0.4rem;
        padding: ${props => props.isMobile ? '0.8rem' : '0.5rem'};
        padding-left: 1rem;
        border: solid 1px ${props => props.showWarn ? 'red' : backgroundColor};
        transition: all 0.4s ease;
         &:focus{
            background: white;
            border: solid 1px #E6E6E6;
            width: 100%;
         }
         &:focus::-webkit-input-placeholder{
            opacity:0;  
         }
         
    `

export const SubmitButton = styled.button`
        -webkit-appearance:none;
        padding: 0 0.6rem;
        outline: none;
        cursor: pointer;
        position: absolute;
        right: 2rem;
        color: white;
        height: calc(100% - 2rem);
        width: ${props => props.isFocus ? '2.4rem' : '3.8rem'};
        background: ${props => props.isFocus ? '#0084FF' : 'gray'};
        border: 1px solid ${props => props.isFocus ? '#0084FF' : 'gray'};
        border-radius: 0.4rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        transition: all 0.4s ease;
         &:hover{
            background: hsl(209, 100%, 45%);
            border: 1px solid #0084FF;
         }
          @media(max-width: ${maxMobileWidth}px){
            right: 1rem;
        }
    `

export const SearchTitle = styled.div`
        cursor: pointer;
        color: grey;
        font-size: 1.2rem;
        position: absolute;
        height: calc(100% - 2rem);
        right: 0rem;
        top: 1rem;
        width: calc(16% + 2rem);
        
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: ${props => props.isFocus ? '0' : '1'};
        transition: all 0.4s ease;
        &:hover{
            color: black;
        }
    `

