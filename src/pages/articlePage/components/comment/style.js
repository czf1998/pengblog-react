import styled from 'styled-components'

export const CommentWrapper = styled.div`
        width: ${props => props.widthOfMainArea}px;
        @media(max-width: ${props => props.widthOfMainArea}px) {
            width: 100%;
        }
    `

export const Visitor = styled.div`
        font-weight: bold;
        margin-bottom: 15px;
    `

export const Content = styled.div`
        line-height: 1.5;
        margin-left: 10px;
        margin-bottom: 15px;
    `

export const Meta = styled.div`
        text-align: right;
    `
