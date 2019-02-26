import styled from 'styled-components'


export const ArticleItemMobileWrapper = styled.div`
        position: relative;
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: 0.8rem;
        padding-top: 0.8rem;
        padding-right: 2rem;
        border-top: solid 1px #f0f0f0; 
    `

export const ArticleLabelAndTitle = styled.div`
        line-height: 1.5;
    `

export const Label = styled.span`
        color: #00991F;
    `

export const Title = styled.span`
        cursor: pointer;
        color: #175199;
        &:hover{
            color: black;
        }
    `

export const ArticleAuthorAndReleaseTime = styled.div`
        color: grey;
        line-height: 1.5;
    `

export const Author = styled.span``

export const ReleaseTime = styled.span``

export const DeleteButtonWraper = styled.div`
        position: absolute;
        top: 0.8rem;
        bottom: 0;
        right: 0;
        width: 1rem;
        
        display: flex;
        justify-content: center;
        align-items: center;
    `

export const DeleteButton = styled.i`
        color: #CCCCCC;
        cursor: pointer;
        &:hover{
            color: black;
        }
    `


