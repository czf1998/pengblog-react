import styled from 'styled-components'

export const ArticleSummaryWrapper = styled.div`
        width: ${props => props.widthOfMainArea};
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
        line-height: 2;
    `

export const ArticleContent = styled.div`
        line-height:1.5;
        -webkit-line-clamp: ${props => props.withPreviewImage ? '3' : '2'};
    `

export const PreviewImage = styled.div`
        position: absolute;
        top: 45px;
        bottom: 15px;
        right: 30px;
        width: 180px;
        background: url(${props => props.imageUrl}) no-repeat center center;
        background-size: cover;
    `



