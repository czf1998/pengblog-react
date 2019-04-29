import styled from 'styled-components'

const heightOfHeader = 70


export const ThemeJumbotronWrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 100%;
    `

export const LogoAndSimpleDescription = styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
       
        background: white;
        height: ${props => props.heightOfBrowser - heightOfHeader}px;
    `

export const ThemeImage = styled.img`
        z-index: 2;
        max-width: 80%;
        width: 350px;
        margin: 2rem 1rem;
        transition: all 1s ease;
        opacity: ${props => props.themeImageReady ? '1' : '0'};
    `

export const ThemeBackground = styled.div`
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background:url(${props => props.backgroundImage}) no-repeat center;
        background-size: cover;
        transition: all 1s ease;
        opacity: ${props => props.backgroundImageReady ? '1' : '0'};
    `

export const LogoAndSimpleDescriptionFixer = styled.div` 
        max-width: 80%;
        width: 350px;
        display: flex;
        justify-content: center;
    `

export const LogoWrapper = styled.div`
        width: 100%;
        display: flex;
        align-items: flex-end;
        padding-bottom: 2rem;
    `

export const Gap = styled.div`
        width: 0;
        border-right: solid 1px grey;
        align-self: stretch;
    `
