import styled from 'styled-components'

const height = "70px"

const iphone5Width = 320

export const HeaderWrapper = styled.div`
        z-index: ${props => props.zIndex ? props.zIndex : '1'};
        position: ${props => props.isMobile ? 'static' : 'sticky'};
        top: 0;
        height: ${height};
        background: ${props => props.backgroundColor ? props.backgroundColor : 'white'};
        border-bottom: solid 1px #f0f0f0;
    `

export const HeaderMainArea = styled.div`
        position: relative;
        display: flex;
        justify-content: space-between;
        height: inherit;
        width: 100%;
        padding-left: ${props => props.isMobile ? '0' : '1rem'};
        padding-right: ${props => props.isMobile ? '0' : '2rem'};
    `

export const MobileHeaderMainArea = styled(HeaderMainArea)`
        position: relative;
        padding: 0;
    `

export const NavItemWrapper = styled.div`
        display: flex;
        align-items: center;
        height: inherit;
        float: right;
    `

export const NavItem = styled.div`
        font-size: 1.2rem;
        display:flex;
        align-items: center;
        color: grey;
        margin: 0 1rem;
        ${props => props.cursorp ? 'cursor:pointer;':''}
        &:hover{
            ${props => props.cursorp ? 'color:black;':''}
        }
        @media(max-width:${iphone5Width}px){
            margin: 0 0.4rem;
        }
    `

export const SubmitButton = styled.div`
        display:flex;
        align-items: center;
        ${props => props.submitable ? '' : 'color: #EEEEEE;'};
        cursor: ${props => props.submitable ? 'pointer' : 'default'};
        &:hover{
            ${props => props.submitable ? 'color: black;' : ''};
        }
    `

export const Info = styled.div`
        height: auto;
        font-size: 1.2rem;
    `

export const MenuButtonWrapper = styled.div`
        padding-right: ${props => props.showMenuList ? '0':'1rem'};;
        color: ${props => props.showMenuList ? 'black':'grey'};
        transition: all 0.4s ease;
    `

export const Button = styled.span``

export const MenuListWrapper = styled.div`
        position: absolute;
        width: 100%;
        height: auto;
        pointer-events: ${props => props.showMenuList ? 'default' : 'none'};   
        top: calc(100% + 1px);
        left: 0;
        overflow: hidden;
        
    `

export const MenuList = styled.div`
        transform: translateY(${props => props.showMenuList ? '0%' : '-100%'});
        pointer-events: ${props => props.showMenuList ? 'default' : 'none'};
        visibility: ${props => props.showMenuList ? 'visible' : 'hidden'};
        background: white;
        width: 100%;
        transition: all 0.4s ease;
        border-bottom: solid 1px #f0f0f0;
        
    `

export const MenuItem = styled.div`
        color: grey;
        font-size: 1.2rem;
        height: 4rem;
        margin: 0 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: solid 1px #F0F0F0;
        &:hover{
            background: #F7F7F7;
        }
    `

export const Cover = styled.div`
        z-index: -1;
        position: fixed;
        height: 100%;
        width: 100%;
    `