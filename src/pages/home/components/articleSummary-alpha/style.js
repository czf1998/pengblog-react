import styled from 'styled-components'

export const ArticleSummaryWrapper = styled.div`
        width: ${props => props.widthOfMainArea};
        height: 190px;
        position: relative;
         background: #fafafa;   
    `

export const Title = styled.div`
        height: 60px;
        line-height: 60px; 
        font-weight: bold;
        background: #eee;
        padding-left: 30px;
    `
export const SummaryWrapper = styled.div`
        position: absolute;
        top: 70px;
        bottom: 15px;
        left: 30px;
        
        right: ${props => props.withPreviewImage ? '220' : '30'}px;
    `

export const ArticleInfoColumn = styled.div`
        height: 30px;
        line-height: 30px;
       
    `

export const ArticleContent = styled.div`
        position: absolute;
        top: 30px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        line-height:26px;
    `

export const PreviewImage = styled.div`
        position: absolute;
        top: 70px;
        bottom: 15px;
        right: 30px;
        width: 170px;
        background: url(${props => props.imageUrl}) no-repeat center center;
        background-size: cover;
    `



