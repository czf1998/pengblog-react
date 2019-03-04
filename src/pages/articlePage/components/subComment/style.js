import styled from 'styled-components'

const widthOfMainArea = 750

export const SubCommentWrapper = styled.div`
        padding: 0.6rem 1rem;
        padding-left: 2rem;
        @media(max-width:${widthOfMainArea}px){
            padding: 0.6rem 1rem;
        }
    `

export const SubCommentAuthor = styled.span`
        font-size: 0.9rem;
    `

export const Content = styled.div`
        line-height: 1.5;
        font-size: 0.9rem;
    `

export const Meta = styled.div`
        font-size: 0.9rem;
        line-height: 1.5;
        text-align: right;
    `

export const ReplyButton = styled.span`
        color: grey;
        cursor: pointer;
        &:hover{
            color: black;
        }
    `

export const DeleteButton = styled.i`
        color: grey;
        cursor: pointer;
        &:hover{
            color: black;
        }
    `