import styled from 'styled-components'

export const HomeWrapper = styled.div`
        background: #f7f7f7;
    `
export const Gap = styled.div`
        height: ${props => props.gapHeight};
        width: 100%;
        @media(max-width:${props => props.widthOfMainArea}px){
            width:100%
        }
    `

export const LoadingWrapper = styled.div`
        position: fixed;
        width: 100%;
        height: 100%;
    `

