import styled from 'styled-components'
import { Input } from '../../../../common'


export const CommentEditorWrapper = styled.div`
        width: ${props => props.widthOfMainArea}px;
        background: white;
        @media(max-width: ${props => props.widthOfMainArea}px) {
            width: 100%;
        }
    `

export const Title = styled.div`
        font-size: 1.3rem;
        font-weight: bold;
    `

export const InputOfEditor = styled(Input)`
        width: 45%;
        background: #f7f7f7;
        font-size: 1rem;
        margin-bottom: 1rem;
        @media(max-width: ${props => props.widthOfMainArea}px) {
            width: 100%;
        }
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
            box-shadow: 0 0 8px #999999;
            border: solid 1px #E6E6E6;
        }
     
    `
        


export const Name = styled.div`
    `

export const Content = styled.div`
        position: relative;
    `

export const EmojiButton = styled.div`
        position: absolute;
        bottom: 1rem;
        right: 2.4em;
        &:active{
            filter:brightness(0.8);
        }
    `

export const EmojiPickerWrapper = styled.div`
        position: absolute;
        top: 100%;
        
        right: 2.4rem;
    `

export const VisitorInfo = styled.div`
        display: flex;
        flex-direction: column;
    `
