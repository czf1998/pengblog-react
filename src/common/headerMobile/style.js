import styled from 'styled-components'

const height = "60px"

export const HeaderWrapper = styled.div`
        height: ${height};
        background: white;
        border-bottom: 1px solid #ebebeb;
    `

export const HeaderMainArea = styled.div`
        display: flex;
        justify-content: space-between;
        height: inherit;
        width: 100%;
    `

/*export const LogoWrapper = styled.div`
        height: inherit;
        width: 200px;
    `*/

export const Logo = styled.div`
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


