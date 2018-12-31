import styled from 'styled-components'

const height = "60px"

export const HeaderWrapper = styled.div`
        height: ${height};
        background: white;
        border-bottom: solid 2px ${props => props.backgroundColor};
    `

export const HeaderMainArea = styled.div`
        display: flex;
        justify-content: space-between;
        height: inherit;
        width: ${props => props.widthOfMainArea};
    `

/*export const LogoWrapper = styled.div`
        height: inherit;
        width: 200px;
    `*/

export const Logo = styled.div`
        padding: 0 20px;
        color: ${props => props.backgroundColor};
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


