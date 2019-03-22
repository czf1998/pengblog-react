import styled from 'styled-components'

const heightOfHeader = 70

export const HomeWrapper = styled.div`
        background: #f7f7f7;
        position: relative;
        min-height: ${window.innerHeight - 70}px;
    `
export const Gap = styled.div`
        height: ${props => props.gapHeight};
        width: 100%;
        @media(max-width:${props => props.widthOfMainArea}px){
            width:100%
        }
    `

export const LoadingWrapper = styled.div`
        position: ${props => props.isMobile ? 'fixed' : 'static'};
        width: 100%;
        height: 100%;
    `



export const LoadingSearchResult = styled.div`
        position: absolute;
        top: 70px;
        height: ${window.innerHeight - 140}px;
        left: 0;
        right: 0;
    `
