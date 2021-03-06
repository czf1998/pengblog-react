import styled from 'styled-components'


export const ArticleItemMobileWrapper = styled.div`
        flex-grow: 1;
        position: relative;
        margin: 0.5rem 1rem;
        ${props => props.isDeleted ? 'text-decoration:line-through' : ''};
    `

export const ArticleLabelAndTitle = styled.div`
        line-height: 1.5;
        margin-right: 1rem;
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


