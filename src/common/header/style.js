import styled from 'styled-components'
import logoUrl from '../../image/logo_white.png'

export const HeaderWrapper = styled.div`
        height: ${props => props.height};
        background: ${props => props.backgroundColor};
    `

export const HeaderMainArea = styled.div`
        height: inherit;
        width: ${props => props.widthOfMainArea};
    `

export const LogoWrapper = styled.div`
        height: inherit;
        width: 200px;
        background: url(${logoUrl}) no-repeat center    ;
        background-size: contain;
    `


