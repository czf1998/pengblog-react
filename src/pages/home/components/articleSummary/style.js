import styled from 'styled-components'

export const ArticleSummaryWrapper = styled.div`
        width: ${props => props.widthOfMainArea};
        height: 170px;
        position: relative;
    `

export const Title = styled.div`
        height: 30px;
        line-height: 30px; 
        font-weight: bold;
    `
export const SummaryWrapper = styled.div`
        position: absolute;
        top: 45px;
        bottom: 15px;
        left: 30px;
        right: 220px;
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
        top: 45px;
        bottom: 15px;
        right: 30px;
        width: 170px;
        background: url("https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/77/image201812010404747.jpg?imageMogr2/thumbnail/200x/interlace/0|imageMogr2/gravity/center/crop/200x150") no-repeat center center;
        background-size: cover;
    `



