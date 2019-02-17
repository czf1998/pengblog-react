import styled from 'styled-components'

export const ArticleSummaryWrapper = styled.div`
        width: 100%;
        position: relative;
        background: white;
        border: 1px solid #ebebeb;
    `

export const Title = styled.div`
        font-size: 1.2rem;
        color: black;
        line-height: 2; 
        font-weight: bold;
    `

export const SummaryWrapper = styled.div`
        width: ${props => props.withPreviewImage ? '70%' : 'inherits'};
    `

export const ArticleInfoColumn = styled.div`
        line-height: 2;
    `

export const ArticleContent = styled.div`
        display: -webkit-box;
        /* autoprefixer: next */
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: black;
        line-height:1.5;
        -webkit-line-clamp: ${props => props.withPreviewImage ? '3' : '2'};
    `

export const PreviewImage = styled.div`
        border-radius: 2px;
        position: absolute;
        top: 3rem;
        bottom: 1rem;
        right: 2rem;
        width: 180px;
        background: url(${props => props.imageUrl}) no-repeat center center;
        background-size: cover;
    `



