import styled from 'styled-components'
import { Button } from '../../../../common'

const milePostWidth = 800

const widthOfMainArea = 750


export const CommentEditorWrapper = styled.div`
        position: relative;
        width: 100%;
        background: white;
        @media(max-width: ${widthOfMainArea}px) {
            width: 100%;
        }
    `

export const SubCommentEditorWrapper = styled.div`
        position: relative;
        width: 100%;
        background: white;
    `

export const Title = styled.div`
        font-size: 1.3rem;
        font-weight: bold;
    `

export const Name = styled.div`
        margin-bottom: 1rem;
        @media(max-width: ${widthOfMainArea}px) {
            width: 100%;
        }
    `

export const Content = styled.div`
        margin-top: 1rem;
        position: relative;
    `

export const SubContent = styled.div`
        padding: 0 2rem;
        margin-top: 1rem;
        position: relative;
        @media(max-width:${milePostWidth}px){
            padding: 0 1rem;
        }
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

export const SubEmojiPickerWrapper = styled.div`
        z-index:1;
        position: absolute;
        top: -10%;
        right: 13%;
    `

export const VisitorInfo = styled.div`
        margin-bottom: 1rem;    
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;
        @media(max-width:${widthOfMainArea}px){
           display:block;
        }
    `

export const Space = styled.div`
        width: 2rem;
    `

export const CaptchaWrapper = styled.div`
        padding: 0 2rem;
        padding-right:8rem;
    `

export const SubVisitorInfo = styled(VisitorInfo)`
        padding: 0 2rem;
        margin-bottom: 0;
        justify-content: space-between;
         @media(max-width:${milePostWidth}px){
            padding: 0 1rem;
        }
    `

export const InputWrapper = styled.div`
        width: 47.5%;
        margin-bottom: 1rem;
        @media(max-width:${milePostWidth}px){
           width:100%;
        }
    `

export const SubmitButtonWrapper = styled.div`
        padding: 0 2rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: flex-end;
        width: 100%;
        @media(max-width:${widthOfMainArea}px){
            padding: 0 1rem 1rem 1rem;
            width: 100%;
            position: static;
        }
    `

export const SubSubmitButtonWrapper = styled.div`
        position: absolute;
        right: 2rem;
        width: 20%;
        bottom: 1rem;
        @media(max-width:${milePostWidth}px){
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
             width: 100%;
        } 
    `

