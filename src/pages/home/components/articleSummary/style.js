import styled from 'styled-components'

export const ArticleSummaryWrapper = styled.div`
        width: ${props => props.widthOfMainArea}px;
        position: relative;
        background: white;
        border: 1px solid #ebebeb;
    `

export const Title = styled.div`
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
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        overflow: hidden;
        color: black;
        line-height:1.5;
        -webkit-line-clamp: ${props => props.withPreviewImage ? '3' : '2'};
    `

export const PreviewImage = styled.div`
        border-radius: 2px;
        position: absolute;
        top: 45px;
        bottom: 15px;
        right: 30px;
        width: 180px;
        background: url(${props => props.imageUrl}) no-repeat center center;
        background-size: cover;
    `



