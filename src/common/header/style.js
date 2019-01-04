import styled from 'styled-components'

const height = "70px"

export const HeaderWrapper = styled.div`
        height: ${height};
        background: ${props => props.backgroundColor};
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
        height: 100%;
        padding: 0 20px;
        color: white;
    `

export const NavItemWrapper = styled.div`
        display: flex;
        height: inherit;
        float: right;
    `

export const NavItem = styled.div`
        color: #E6E6E6;
        line-height: ${height};
        padding: 0 20px;
        &:hover{
            color: white;
        }
    `


