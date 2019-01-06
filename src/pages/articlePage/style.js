import styled from 'styled-components'

const gapLineColor = '#E6E6E6'

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
        font-size: 16px;
        line-height: 1.7;
    `

export const Gap = styled.div`
        height: ${props => props.gapHeight};
        width: ${props => props.widthOfMainArea}px;
    `

export const CommentTitle = styled.div`
        font-size: 22px;
        font-weight: bold;
    `

export const GapLine = styled.div`
        height: 1px;
        margin: 0 30px;
        border-bottom: solid 1px ${gapLineColor};
    `
