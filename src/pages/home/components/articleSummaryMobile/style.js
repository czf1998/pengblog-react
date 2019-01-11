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

export const PreviewImage = styled.div`
        margin: 5px 0;
        height: 150px;
        background: url(${props => props.imageUrl}) no-repeat center center;
        background-size: cover;
    `

export const ArticleContent = styled.div`
        color: black;
        margin: 0.4rem 0;
        line-height:1.5;
        -webkit-line-clamp: 3;
    `



