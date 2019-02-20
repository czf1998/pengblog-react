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
        display: flex;
        justify-content: space-between;
        height: inherit;
        width: 100%;
        padding-left: 1rem;
        padding-right: 2rem;
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
