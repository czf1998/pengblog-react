import styled from 'styled-components'

const height = "70px"

export const HeaderWrapper = styled.div`
        z-index: 1;
        position: sticky;
        top: 0;
        height: ${height};
        background: ${props => props.backgroundColor};
        border-bottom: solid 1px #f0f0f0;
    `

export const HeaderMainArea = styled.div`
        display: flex;
        justify-content: space-between;
        height: inherit;
        width: ${props => props.widthOfMainArea}px;
    `

/*export const LogoWrapper = styled.div`
        height: inherit;
        width: 200px;
    `*/

export const Logo = styled.div`
        height: 100%;
        padding: 0 20px;
    `

export const NavItemWrapper = styled.div`
        display: flex;
        height: inherit;
        float: right;
    `

export const NavItem = styled.div`
        color: grey;
        line-height: ${height};
        padding: 0 20px;
        &:hover{
            color: black;
        }
    `


