import styled from 'styled-components'
import backgroundUrl from '../../image/background/timg.jpg'

export const HomeWrapper = styled.div`
        background: #f7f7f7;
    `
export const Gap = styled.div`
        height: ${props => props.gapHeight};
        width: ${props => props.widthOfMainArea}px;
        @media(max-width:${props => props.widthOfMainArea}px){
            width:100%
        }
    `

export const CustomBackground = styled.div`
        position:fixed;
        height: 100%;
        width: 100%;
        background: url(${backgroundUrl}) no-repeat center center;
        background-size: cover;
    `
