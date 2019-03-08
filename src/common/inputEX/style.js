import styled from 'styled-components'

const backgroundColor = '#f7f7f7'
const widthOfMainArea = 750

export const InputWrapper = styled.div`
        position: relative;
        width: ${props => props.width};
    `

export const Inputer = styled.input`
        color:${props => props.fontColor ? props.fontColor : 'black'};
        width: 100%;
        font-size: ${props => props.fontSize ? props.fontSize : '1rem;'};
        position: relative;
        background: none;
        outline: none;
        border: none;
        padding: ${props => props.padding ? props.padding : '0.5rem'};
        padding-left: 1rem;
        transition: all 0.2s ease;
        &::placeholder{
            opacity: ${props => props.isFocus ? '0' : '1'};
        }
        &:disabled{
            color: #CCCCCC;
        }
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
        -webkit-transition-delay: 99999s;
        -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
    }
`

export const Line = styled.div`
        position: relative;    
        width: 100%;
        height: 1px;
        border-bottom: solid 1px #F0F0F0;
    `
export const Color = styled.div`
        position: absolute;
        width: ${props => props.isFocus ? '100%' : '0'};
        height: 1px;
        border-bottom: solid 1px ${props => props.lineColor ? props.lineColor : 'rgb(51, 103, 214)'};
        transition: all 0.5s ease;
    `

export const InputIconWrapper = styled.div`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        padding-left: 0.8em;
        pointer-events: none;
    `

export const InputIcon = styled.div`
       color:${props => props.iconColor ? props.iconColor : '#BBBBBB'};
    `

export const WarnPopover = styled.div`
        position: absolute;
        bottom: calc(100% + 0.5rem);
        color: #BB0000;
        font-size: 0.8rem;
        padding: 0.6rem 1rem;
        background: ${backgroundColor};
        border: 1px solid rgba(0,0,0,.2);
        border-radius: .3rem;
        @media(min-width: ${widthOfMainArea}px){
            left: 0;
        }
        @media(max-width: ${widthOfMainArea}px){
            right: 0;
        }
    `

export const PopoverArrow = styled.div`
        position: absolute;
        overflow: hidden;
        left: 0.4rem;
        top: 100%;
        width: 2rem;
        height: 1rem;
        &:after{
            content: '';
            position: absolute;
            top: -60%;
            left: 0.6rem;
            box-sizing: border-box;
            width: 24px;
            height: 24px;
            margin: -12px;
            border: 1px solid rgba(0,0,0,.2);
            background: ${backgroundColor};
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
            pointer-events: auto;
        }
    `