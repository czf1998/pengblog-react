import styled from 'styled-components'

const heightOfHeader = 70

const widthOfMainArea = 800

const maxMobileWidth = 750

export const ArticlePageWrapper = styled.div`
        width: 100%;
        //background: #f7f7f7;
    `

export const ArticlePageFixer = styled.div`
        width: 100%;
        @media(max-width:${maxMobileWidth}px){
            width: 100%;
        }
    `

export const ArticleMainArea = styled.div`
        background: white;
        width: 100%;
        @media(max-width:${props => props.widthOfMainArea}px){
            width: 100%;
        }
    `

export const ArticleTitleImage = styled.img`
        width: 100%;
        object-fit: cover;
        height: ${props => props.titleImageSize.get('height') * widthOfMainArea / props.titleImageSize.get('width')}px;
        max-height: 320px;
        @media(min-width:1600px){
            max-height: 400px;
        }
    `
export const ArticleTitle = styled.div`
        font-size: 36px;
        line-height: 1.5;
        font-weight: bold;
    `

export const ArticleMeta = styled.div`
        
    `

export const ArticleContent = styled.div`
        padding-top: 0;
        font-size: 16px;
        line-height: 1.7;
        word-wrap:break-word;
    `

export const CommentTitle = styled.div`
        font-size: 1.3rem;
        font-weight: bold;
    `

export const LoadingWrapper = styled.div`
        position: static;
        width: 100%;
        height: ${window.innerHeight - heightOfHeader}px;
    `
