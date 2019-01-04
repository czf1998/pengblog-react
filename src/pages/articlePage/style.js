import styled from 'styled-components'



export const ArticlePageWrapper = styled.div`
        background: #f7f7f7;
    `

export const ArticleMainArea = styled.div`
        background: white;
        width: ${props => props.widthOfMainArea};
        @media(max-width:${props => props.widthOfMainArea}){
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
        width: ${props => props.widthOfMainArea};
    `
