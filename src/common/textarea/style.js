import styled from 'styled-components'

const backgroundColor = '#f7f7f7'

export const TextareaWrapper = styled.div`
        position: relative;
    `

export const Textarear = styled.textarea`
        position: relative;
        font-family: Microsoft YaHei;
        font-size: 16px;
        line-height: 1.4;
        width: 100%;
        outline: none;
        padding: 0.5em;
        background: #f7f7f7;
        border: solid 1px ${props => props.showWarn ? 'red' : backgroundColor};
        border-radius: 3px;
        transition: all 0.2s ease;
         &:focus{
            box-shadow 1px 1px 3px #999999 inset;
            border: solid 1px #E6E6E6;
        }
     
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
        right: 0;
    `

export const PopoverArrow = styled.div`
        position: absolute;
        overflow: hidden;
        right: 0.4rem;
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