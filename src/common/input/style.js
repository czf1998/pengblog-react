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
        position: relative;
        background: ${props => props.backgroundColor ? props.backgroundColor : '#F7F7F7'};
        font-size: ${props => props.fontSize ? props.fontSize + 'px' : '1rem'};
        outline: none;
        padding: ${props => props.padding ? props.padding : '0.5rem'}   ;
        padding-left: 2rem;
        border: solid 1px ${props => props.showWarn ? 'red' : backgroundColor};
        border-radius: 0.4rem;
        transition: all 0.2s ease;
        ${props => props.disableFocusStyle ? '' : `
         &:focus{
            box-shadow: 1px 1px 2px #999999 inset;
            border: solid 1px #E6E6E6;
         }
        `}
    
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