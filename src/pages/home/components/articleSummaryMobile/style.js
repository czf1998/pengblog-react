import styled from 'styled-components'

export const ArticleSummaryWrapper = styled.div`
        width: ${props => props.widthOfMainArea}px;
        position: relative;
        background: white;
        border: 1px solid #ebebeb;
    `

export const Title = styled.div`
        line-height: 2; 
        font-weight: bold;
    `

export const SummaryWrapper = styled.div`
        width: ${props => props.withPreviewImage ? '70%' : 'inherits'};
    `

export const ArticleInfoColumn = styled.div`
        display: flex;
        flex-wrap: wrap;
        line-height: 2;
    `

export const PreviewImage = styled.div`
        margin: 5px 0;
        height: 150px;
        background: url(${props => props.imageUrl}) no-repeat center center;
        background-size: cover;
    `

export const ArticleContent = styled.div`
        line-height:1.5;
        -webkit-line-clamp: 3;
    `



