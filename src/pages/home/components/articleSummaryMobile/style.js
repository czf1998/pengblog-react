import styled from 'styled-components'

const maxMobileWidth = 750

export const ArticleSummaryWrapper = styled.div`
        padding: 0.5rem 2rem;
        width: 100%;
        position: relative;
        background: ${props => props.isFocus ? '#EEEEEE' : 'white'};
        border: 1px solid #ebebeb;
        border-top: none;
        @media(max-width:${maxMobileWidth}px){
            padding: 0.5rem 1rem;
        }
        &:hover{
             background: ${props => props.isFocus ? '#EEEEEE' : '#F7F7F7'};
        }
    `

export const Title = styled.div`
        color: black;
        font-size: 1.2rem;
        line-height: 1.4; 
        font-weight: bold;
    `


export const ArticleInfoColumn = styled.div`
        display: flex;
        flex-wrap: wrap;
        line-height: 2;
        font-size: ${props => props.isMobile ? '1rem' : '0.8rem'};
    `

export const ArticleMultipleContent = styled.div`
        position: relative;
        padding: 0.4rem 0;
    `

export const ArticleContent = styled.div`
        font-size: ${props => props.isMobile ? '1rem' : '0.8rem'};
        width: ${props => props.withPreviewImage ? '62%' : '100%'};
        color: black;
        line-height:1.5;
    `


export const PreviewImage = styled.div`
        position: absolute;
        right: 0;
        top: 5%;
        height: 90%;
        width: 35%;
        background: url(${props => props.imageUrl}) no-repeat center center;
        background-size: cover;
    `



