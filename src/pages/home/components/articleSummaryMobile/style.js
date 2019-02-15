import styled from 'styled-components'

export const ArticleSummaryWrapper = styled.div`
        width: 100%;
        position: relative;
        background: white;
        border: 1px solid #ebebeb;
    `

export const Title = styled.div`
        color: black;
        font-size: 1.2rem;
        line-height: 1.6; 
        font-weight: bold;
    `


export const ArticleInfoColumn = styled.div`
        display: flex;
        flex-wrap: wrap;
        line-height: 2;
    `

export const ArticleMultipleContent = styled.div`
        position: relative;
        padding: 0.4rem 0;
    `

export const ArticleContent = styled.div`
        width: ${props => props.withPreviewImage ? '62%' : '100%'};
        color: black;
        line-height:1.5;
        -webkit-line-clamp: 3;
    `


export const PreviewImage = styled.div`
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 35%;
        background: url(${props => props.imageUrl}) no-repeat center center;
        background-size: cover;
    `



