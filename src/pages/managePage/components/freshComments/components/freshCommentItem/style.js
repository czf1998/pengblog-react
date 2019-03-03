import styled from 'styled-components'



export const FreshCommentItemWrapper = styled.div`
        border: solid 1px #F0F0F0;
        border-radius: 0.4rem;
        padding: 0.5rem;
        padding-top: 0;
        cursor: pointer;
        color:grey;
        font-size:0.9rem;
        margin-bottom: 0.5rem;
        &:hover{
            color: black;
        }
    `

export const CommentSubject = styled.div`
        padding: 0.5rem;
        line-height: 1.5;
    `

export const Visitor = styled.span`
        
    `

export const Content = styled.span`
        
    `

export const HostArticle = styled.div`
        position: relative;
        border: none;
        border-radius: 0.4rem;
        background: #F0F0F0;
        padding: 0.5rem;
        line-height: 1.5;
        &:after{
            content: '';
            width: 0;
            height: 0;
            border: 7px solid transparent;
            border-bottom-color:#F0F0F0;
            position: absolute;
            left: 15px;
            top: -14px;
        }
    `

export const Label = styled.span``

export const Title = styled.span``