import styled from 'styled-components'
import {Button} from "../../../../../../common/button";

const widthOfMainArea = 750

export const SubCommentEditorWrapper = styled.div`
        
    `

export const Content = styled.div`
        padding: 1rem;
    `

export const OperationColumn = styled.div`
        padding: 0 1rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    `

export const EmojiButton = styled.div`
         font-size: 1.2rem;
         margin-right: 1rem;
          &:hover{
            filter:brightness(0.8);
           
        }
    `


export const SubmitButtonWrapper = styled.div`
        @media(max-width:${widthOfMainArea}px){
            width: 100%;
            position: static;
            margin-bottom: 1rem;
        }
    `

export const SubmitButton = styled(Button)`
        font-size: 0.9rem;
        line-height: 1;
        height: 2rem;
        width: 100%;
        @media(max-width:${widthOfMainArea}px){
             height: 3em;
        } 
    `
