import styled from 'styled-components'
import { Button } from '../../../../common'


const widthOfMainArea = 750


export const CommentEditorWrapper = styled.div`
        position: relative;
        width: ${widthOfMainArea}px;
        background: white;
        @media(max-width: ${widthOfMainArea}px) {
            width: 100%;
        }
    `

export const Title = styled.div`
        font-size: 1.3rem;
        font-weight: bold;
    `



export const TextArea = styled.textarea`
        font-family: Microsoft YaHei;
        font-size: 16px;
        line-height: 1.4;
        width: 100%;
        outline: none;
        padding: 0.5em;
        background: #f7f7f7;
        border: solid 1px #f7f7f7;
        border-radius: 3px;
        transition: all 0.2s ease;
         &:focus{
            box-shadow 1px 1px 3px #999999 inset;
            border: solid 1px #E6E6E6;
        }
     
    `
        


export const Name = styled.div`
        margin-bottom: 1rem;
    `

export const Content = styled.div`
        position: relative;
    `

export const EmojiButton = styled.div`
        font-size: 1.2rem;
        position: absolute;
        bottom: 1.2rem;
        right: 2.4em;
        &:hover{
            filter:brightness(0.8);
           
        }
    `

export const EmojiPickerWrapper = styled.div`
        z-index:1;
        position: absolute;
        top: -10%;
        right: 10%;
    `

export const VisitorInfo = styled.div`
        margin-bottom: 1rem;
        display:flex;
        @media(max-width:${widthOfMainArea}px){
           display:block;
        }
    `

export const SubmitButtonWrapper = styled.div`
        position: absolute;
        right: 2rem;
        bottom: 1rem;
        @media(max-width:${widthOfMainArea}px){
            padding: 0 1rem 1rem 1rem;
            width: 100%;
            position: static;
        }
    `

export const SubmitButton = styled(Button)`
        height: 2.2rem;
        width: 100%;
        @media(max-width:${widthOfMainArea}px){
             height: 3em;
        } 
    `

