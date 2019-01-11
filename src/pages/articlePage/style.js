import styled from 'styled-components'

const gapLineColor = '#F7F7F7'

export const ArticlePageWrapper = styled.div`
        background: #f7f7f7;
    `

export const ArticleMainArea = styled.div`
        background: white;
        width: ${props => props.widthOfMainArea}px;
        @media(max-width:${props => props.widthOfMainArea}px){
            width: 100%;
        }
    `

export const ArticleTitle = styled.div`
        font-size: 36px;
        line-height: 1.5;
        font-weight: bold;
        margin-top: 20px;
    `

export const ArticleMeta = styled.div`
        
    `

export const ArticleContent = styled.div`
        padding-top: 0;
        font-size: 16px;
        line-height: 1.7;
        word-wrap:break-word;
    `

export const Gap = styled.div`
        height: ${props => props.gapHeight};
        width: ${props => props.widthOfMainArea}px;
    `

export const CommentTitle = styled.div`
        font-size: 1.3rem;
        font-weight: bold;
    `
