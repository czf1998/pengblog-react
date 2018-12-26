import styled from 'styled-components'

export const ArticleSummaryWrapper = styled.div`
        width: ${props => props.widthOfMainArea};
        height: 200px;
        position: relative;
    `

export const Title = styled.div`
        height: 30px;
        line-height: 30px; 
        background: pink;
        font-weight: bold;
    `
export const SummaryWrapper = styled.div`
        position: absolute;
        top: 45px;
        left: 30px;
        right: 30px;
        bottom: 15px;
        background: red;
    `




