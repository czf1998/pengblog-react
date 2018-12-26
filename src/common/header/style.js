import styled from 'styled-components'

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
    `

export const Logo = styled.div`
        height: 80%
        width: 100px;
        color: white;
    `


